import { getColorByColorObjArr, getTiny } from '@/utils'

import { Panel } from './panel'

const panel = new Panel()

window.addEventListener(
  'mouseup',
  (e) => {
    const raw = window.getSelection()?.toString().trim()

    const x = e.pageX
    const y = e.pageY

    if (raw) {
      if (panel.container) panel.hide()
      const color = getTiny(raw)
      if (color.isValid) {
        chrome.storage.sync.get((items) => {
          const result = getColorByColorObjArr(
            color.toHexString(),
            items.colors
          )
          if (result.length > 0) {
            panel.show({
              result,
              pos: { x, y },
            })
          }
        })
      }
    }
  },
  true
)
