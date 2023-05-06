import {
    getColorByColorObjArr,
    getTiny,
} from "@/utils"

import { Panel } from "./panel"

let panel = new Panel()

window.addEventListener(
    "mouseup",
    (e) => {
        let raw = window.getSelection()?.toString().trim()

        let x = e.pageX
        let y = e.pageY

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
