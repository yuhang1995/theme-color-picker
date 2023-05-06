import React from 'react'
import { createRoot } from 'react-dom/client'
import { Content, ColorItem } from './Content'

export type PosTypes = {
  x: number
  y: number
}

export class Panel {
  rootId: string

  container: HTMLElement | undefined | null

  constructor(props?: { rootId: string }) {
    this.rootId = props?.rootId || 'theme-color-picker-content'
  }

  createContainer(pos: PosTypes) {
    const container: HTMLElement = document.createElement('div')

    container.id = this.rootId

    container.style.position = 'absolute'
    container.style.top = `${pos.y}px`
    container.style.left = `${pos.x}px`

    document.body.appendChild(container)

    return container
  }

  show({ pos, result }: { pos: PosTypes; result: ColorItem[] }) {
    this.hide()

    const container = this.createContainer(pos)

    this.container = container

    const rootDom = document.getElementById(this.rootId) as HTMLElement

    const root = createRoot(rootDom)

    root.render(
      <React.StrictMode>
        <Content {...{ colors: result, onClose: this.hide.bind(this) }} />
      </React.StrictMode>
    )
  }

  hide() {
    const containers = document.getElementById('theme-color-picker-content')
    if (containers) document.body.removeChild(containers)
    this.container = null
  }
}
