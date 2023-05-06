import ClickAwayListener from 'react-click-away-listener';

export type ColorItem = {
    name: string,
    color: string,
    value: string
}

interface ContentProps {
    colors?: ColorItem[],
    onClose: () => void
}

export function Content(props: ContentProps) {
    const { colors = [], onClose } = props

    function onClipboard(text: string) {
        navigator.clipboard.writeText(text).then(function () {
            /* clipboard successfully set */
            console.log("已复制")
            onClose?.()
        }, function () {
            /* clipboard write failed */
            console.log("复制失败")
        });
    }

    return (
        <ClickAwayListener onClickAway={onClose}>
            <div className="shadow-md border border-slate-100 min-w-[200px] overflow-hidden rounded-lg z-[1000] bg-white absolute -translate-x-1/2 translate-y-4">
                <header className="flex items-center bg-gray-100 p-3 text-base text-gray-800 relative">
                    <span>当前主题值</span>
                    {colors?.[0]?.color && <span className='inline-block w-[16px] h-[16px] rounded-sm ml-2' style={{ background: colors?.[0]?.color }}></span>}
                    <span className=" absolute right-3 top-3 cursor-pointer" onClick={onClose}>X</span>
                </header>
                <main>
                    <ul className='p-1'>
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
                </main>
            </div>
        </ClickAwayListener>
    )
}
