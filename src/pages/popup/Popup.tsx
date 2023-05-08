import { useCallback, useState } from 'react'
import { Button, ColorList } from '@/components'
import { getTiny, getColorByColorObjArr } from '@/utils'

interface ColorItem {
  name: string
  value: string[]
  color: string
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

  function onSetting(query?: string) {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('options'))
    }
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
        <div className="flex space-x-2">
          <img
            src="../../img/setting.svg"
            className="h-[24px] w-[24px] cursor-pointer text-gray-200"
            alt="设置"
            onClick={(_) => onSetting()}
          />
          {/* <img
            src="../../img/viwer.svg"
            className="h-[24px] w-[24px] cursor-pointer text-gray-200"
            onClick={(_) => onSetting('?tab=viwer')}
            alt="预览"
          /> */}
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
          <ColorList colors={colors} className="flex-1" />
        </div>
      </main>
    </section>
  )
}
