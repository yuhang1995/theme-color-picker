import React from "react"
import { usePanelContext } from '../../context'

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
    const { children } = props

    return (
        <section>
            <main className="w-full min-h-screen bg-slate-700 text-gray-200">
                <div className="min-w-[1000px] mx-auto flex justify-center p-10 space-x-16">
                    <Aside />
                    <div className="py-10">
                        <MainContainer>
                            {children}
                        </MainContainer>
                    </div>
                </div>
            </main>
        </section>
    )
}

function Aside() {
    const { setPanel, panel } = usePanelContext()

    return (
        <aside className="space-y-10">
            <div className="space-y-16">
                <div className="flex items-center space-x-3">
                    <img src="../img/icon_128.png" className="w-[24px] h-[24px] object-cover" />
                    <h1 className="text-2xl text-white">ThemeColorPicker</h1>
                </div>
                <div className="text-xl text-slate-300">设置</div>
            </div>
            <ul className="space-y-4">
                <li className={`text-lg text-slate-200 p-4 rounded hover:text-white cursor-pointer ${panel === 'add' ? '!bg-slate-500 !text-white' : ''}`} onClick={_ => setPanel?.('add')}>添加主题</li>
                <li className={`text-lg text-slate-200 p-4 rounded hover:text-white cursor-pointer ${panel === 'viwer' ? '!bg-slate-500 !text-white' : ''}`} onClick={_ => setPanel?.('viwer')}>主题预览</li>
            </ul>
        </aside>
    )
}


interface MainContainerProps {
    children: React.ReactNode;
}

function MainContainer(props: MainContainerProps) {
    const { children } = props
    const { panel } = usePanelContext()

    return (
        <div className="min-w-[750px] space-y-10">
            <div className="text-center text-2xl text-slate-200 font-medium">{panel === 'add' ? '添加主题' : '主题预览'}</div>
            {children}
        </div>
    )
}

interface DisplayProps extends React.HTMLProps<HTMLDivElement> { }

export function Display(props: DisplayProps) {
    return (
        <div {...props}></div>
    )
}