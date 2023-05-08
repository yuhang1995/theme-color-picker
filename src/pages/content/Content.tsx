import ClickAwayListener from 'react-click-away-listener'
import { ColorList } from '@/components'

export type ColorItem = {
  name: string
  color: string
  value: string[]
}

interface ContentProps {
  colors: ColorItem[]
  onClose: () => void
}

export function Content(props: ContentProps) {
  const { colors = [], onClose } = props

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
          <ColorList colors={colors} />
        </main>
      </div>
    </ClickAwayListener>
  )
}
