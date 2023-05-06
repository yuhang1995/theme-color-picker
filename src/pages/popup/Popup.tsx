import { useState } from "react";
import { Button } from '@/components'
import { getTiny, getColorByColorObjArr } from '@/utils'

interface ColorItem {
    name: string;
    value: string;
    color?: string;
}

export function Popup() {
    const [colors, setColors] = useState<ColorItem[]>([])
    const [inputColor, setInputColor] = useState('')

    function onCheck() {
        const color = getTiny(inputColor)
        if (color.isValid) {
            chrome.storage.sync.get(
                (items) => {
                    console.log(items.colors)
                    const result = getColorByColorObjArr(color.toHexString(), items.colors)
                    setColors(result)
                })
        }
    }

    function onSetting() {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    }


    function onClipboard(text: string) {
        navigator.clipboard.writeText(text).then(function () {
            /* clipboard successfully set */
            console.log("已复制")
        }, function () {
            /* clipboard write failed */
            console.log("复制失败")
        });
    }


    return (
        <section className="w-[350px] min-h-[200px] text-slate-900 rounded-sm">
            <header className="flex items-center justify-between bg-slate-700 p-4">
                <div className="flex items-center space-x-3">
                    <img src="../../img/icon_128.png" className="w-[24px] h-[24px] object-cover" />
                    <h1 className="text-xl text-white">ThemeColorPicker</h1>
                </div>
                <div className="">
                    <img src='../../img/setting.svg' className="w-[24px] h-[24px] cursor-pointer text-gray-200" onClick={onSetting} />
                    {/* <img src='../../img/viwer.svg' className="w-[24px] h-[24px] cursor-pointer text-gray-200" onClick={onSetting} /> */}
                </div>
            </header>
            <main className="p-5 space-y-3">
                <div className="w-full flex items-center justify-center space-x-4">
                    <input autoComplete="off" value={inputColor} onChange={e => setInputColor(e.target.value)} className="flex-1 bg-slate-300 text-gray-800 rounded-md p-3" placeholder='请输入主题名称' />
                    <Button onClick={onCheck}>查找</Button>
                </div>
                <div className="flex flex-row items-center space-x-5">
                    {colors[0]?.color && <div className="w-[100px] h-[40px] rounded-md" style={{ background: colors[0]?.color }}></div>}
                    <ul className='p-1 flex-1'>
                        {colors.map((item, index) => {
                            return (
                                <li key={index} className="flex itmes-center w-full px-3 py-2 group hover:bg-slate-100 cursor-pointer rounded-md" onClick={_ => onClipboard(item.value)}>
                                    <div className='flex items-center flex-1 space-x-2'>
                                        <span className="text-base text-gray-800 group-hover:text-gray-700">{item.name}</span>
                                        <span className="text-base text-gray-900 group-hover:text-gray-950">{item.value}</span>
                                    </div>
                                    <span className='opacity-0 group-hover:opacity-100 text-xs text-slate-600 leading-6'>复制</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </main>
        </section>
    )
}