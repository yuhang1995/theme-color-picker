import React from "react"
import { createRoot } from "react-dom/client"
import { Options } from "./Options"

import "@public/css/common.css"

const container = document.getElementById("theme-color-picker")

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>
)
