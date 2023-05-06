import React from "react"
import { createRoot } from "react-dom/client"
import { Popup } from './Popup'

import "@public/css/common.css"

const container = document.getElementById("theme-color-picker")

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
)
