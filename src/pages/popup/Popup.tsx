import { useCallback, useState } from 'react'
import { Button } from '@/components'
import { getTiny, getColorByColorObjArr } from '@/utils'

interface ColorItem {
  name: string
  value: string
  color?: string
}

export function Popup() {
  const [colors, setColors] = useState<ColorItem[]>([])
  const [inputColor, setInputColor] = useState('')

  const onCheck = useCallback(() => {
    const color = getTiny(inputColor)
    if (color.isValid) {
      chrome.storage.sync.get((items) => {
        console.log(items.colors)
        const result = getColorByColorObjArr(color.toHexString(), items.colors)
        setColors(result)
      })
    }
  }, [inputColor])

  function onSetting() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('options.html'))
    }
  }

  function onClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        /* clipboard successfully set */
        console.log('已复制')
      },
      () => {
        /* clipboard write failed */
        console.log('复制失败')
      }
    )
  }

  return (
    <section className="min-h-[200px] w-[350px] rounded-sm text-slate-900">
      <header className="flex items-center justify-between bg-slate-700 p-4">
        <div className="flex items-center space-x-3">
          <img
            src="../../img/icon_128.png"
            className="h-[24px] w-[24px] object-cover"
            alt="logo"
          />
          <h1 className="text-xl text-white">ThemeColorPicker</h1>
        </div>
        <div className="">
          <img
            src="../../img/setting.svg"
            className="h-[24px] w-[24px] cursor-pointer text-gray-200"
            alt="setting"
            onClick={onSetting}
          />
          {/* <img src='../../img/viwer.svg' className="w-[24px] h-[24px] cursor-pointer text-gray-200" onClick={onSetting} /> */}
        </div>
      </header>
      <main className="space-y-3 p-5">
        <div className="flex w-full items-center justify-center space-x-4">
          <input
            autoComplete="off"
            value={inputColor}
            onChange={(e) => setInputColor(e.target.value)}
            className="flex-1 rounded-md bg-slate-300 p-3 text-gray-800"
            placeholder="请输入主题名称"
          />
          <Button onClick={onCheck}>查找</Button>
        </div>
        <div className="flex flex-row items-center space-x-5">
          {colors[0]?.color && (
            <div
              className="h-[40px] w-[100px] rounded-md"
              style={{ background: colors[0]?.color }}
            />
          )}
          <ul className="flex-1 p-1">
            {colors.map((item, index) => (
              <li
                key={index}
                className="itmes-center group flex w-full cursor-pointer rounded-md px-3 py-2 hover:bg-slate-100"
                onClick={(_) => onClipboard(item.value)}
              >
                <div className="flex flex-1 items-center space-x-2">
                  <span className="text-base text-gray-800 group-hover:text-gray-700">
                    {item.name}
                  </span>
                  <span className="text-base text-gray-900 group-hover:text-gray-950">
                    {item.value}
                  </span>
                </div>
                <span className="text-xs leading-6 text-slate-600 opacity-0 group-hover:opacity-100">
                  复制
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </section>
  )
}
