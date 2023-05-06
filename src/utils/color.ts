import { TinyColor } from "@ctrl/tinycolor"

export function getTiny(color: string): TinyColor {
    return new TinyColor(color)
}

export function getColorHexString(color: string): string {
    return getTiny(color).toHexString()
}
