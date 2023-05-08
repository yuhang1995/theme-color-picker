import { getColorHexString } from './color'

interface ColorTheme {
  name: string
  color: string
}

type ColorThemes = Array<ColorTheme>

interface ResultColorItem {
  name: string
  value: string[]
  color: string
}

export function findKeyByValue(value: string, obj: ColorTheme): string[] {
  const entries = Object.entries(obj)
  const result: string[] = []

  for (const [key, val] of entries) {
    if (typeof val === 'string') {
      if (getColorHexString(val) === getColorHexString(value)) {
        result.push(key)
      }
    } else {
      const nestedResult = findKeyByValue(value, val)
      if (nestedResult.length > 0) {
        result.push(...nestedResult.map((nestedKey) => `${key}.${nestedKey}`))
      }
    }
  }
  return result
}

export function getColorByColorObjArr(
  color: string,
  colorObjArr: ColorThemes
): ResultColorItem[] {
  const result: ResultColorItem[] = []

  for (const colorObj of colorObjArr) {
    const value = findKeyByValue(color, JSON.parse(colorObj.color))
    if (value.length > 0) {
      result.push({
        name: colorObj.name,
        color,
        value,
      })
    }
  }

  return result
}
