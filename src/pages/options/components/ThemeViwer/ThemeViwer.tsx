import { useEffect, useState } from "react";

interface Color {
    name: string;
    color: Color | string;
}

export function ThemeViwer() {
    const [colors, setColors] = useState<Array<Color | undefined>>([])

    useEffect(() => {
        chrome.storage.sync.get(
            (items) => {
                console.log('storege value --->', items)
                setColors(items.colors || [])
            }
        );
    }, []);

    if (colors.length > 0) {
        return (
            <div className="space-y-10">
                {colors.map((item, index) => (
                    <div key={index} className="space-y-6">
                        <details>
                            <summary className="cursor-pointer">
                                <h1 className="text-2xl text-white font-medium">{item?.name}</h1>
                            </summary>
                            <div className="space-y-6">
                                {
                                    Object.entries(JSON.parse(item?.color as string)).map(
                                        (color, i) => (
                                            <div key={i} className="flex items-center space-x-4">
                                                <h2 className="w-[100px] text-lg text-slate-100">{color[0]}</h2>
                                                <div>{typeof color[1] === 'string' ? <ColorItem color={color[1]} /> : <ColorList colors={Object.entries(color[1] as Object)} className="flex items-center space-x-2" />}</div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </details>
                    </div>
                ))}
            </div>
        )
    }

    return <p className="text-lg text-slate-100 font-medium">暂无可预览主题，请先添加主题</p>
};

interface ColorListProps {
    colors: [string, string][];
    className?: string;
}

function ColorList(props: ColorListProps) {
    const { colors, className } = props

    return (
        <div className={className}>
            {
                colors.map((color, index) => (
                    <div key={index} className="flex flex-col justify-center items-center space-y-1">
                        <h2>{color[0]}</h2>
                        <div>{typeof color[1] === 'string' ? <ColorItem color={color[1]} /> : <ColorList colors={color[1]} />}</div>
                    </div>
                ))
            }
        </div>
    )
}

function ColorItem(props: { color: string }) {
    const { color } = props

    return (
        <div className="flex flex-col items-center justify-center space-y-1">
            <div className="w-[50px] h-[40px] rounded" style={{ background: color }}></div>
            <span>{color}</span>
        </div>
    )
}