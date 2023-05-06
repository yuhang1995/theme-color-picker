import ClickAwayListener from 'react-click-away-listener'

export type ColorItem = {
  name: string
  color: string
  value: string
}

interface ContentProps {
  colors: ColorItem[]
  onClose: () => void
}

export function Content(props: ContentProps) {
  const { colors = [], onClose } = props

  function onClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        /* clipboard successfully set */
        console.log('已复制')
        onClose?.()
      },
      () => {
        /* clipboard write failed */
        console.log('复制失败')
      }
    )
  }

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div className="absolute z-[1000] min-w-[200px] -translate-x-1/2 translate-y-4 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-md">
        <header className="relative flex items-center bg-gray-100 p-3 text-base text-gray-800">
          <span>当前主题值</span>
          {colors?.[0]?.color && (
            <span
              className="ml-2 inline-block h-[16px] w-[16px] rounded-sm"
              style={{ background: colors?.[0]?.color }}
            />
          )}
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={onClose}
          >
            X
          </span>
        </header>
        <main>
          <ul className="p-1">
            {colors.map((item, index) => (
              <li
                key={`${index}-${item.value}`}
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
                <span className="text-xs leading-6 text-slate-600 opacity-0 group-hover:opacity-100 ">
                  复制
                </span>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </ClickAwayListener>
  )
}
