interface ColorItemType {
  name: string
  value: string[]
  color: string
}

export function ColorList(props: {
  colors: ColorItemType[]
  className?: string
}) {
  const { colors, className = '' } = props

  return (
    <ul className={['p-1'].concat(className).join(' ')}>
      {colors.map((item, index) => (
        <ColorItem colorItem={item} key={index} />
      ))}
    </ul>
  )
}

function ColorItem(props: { colorItem: ColorItemType }) {
  const { colorItem } = props

  function onClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        /* clipboard successfully set */
        console.log('已复制')
      },
      () => {
        /* clipboard write failed */
        console.log('复制失败')
      }
    )
  }

  return (
    <li className="itmes-center group flex w-full rounded-md p-1.5 hover:bg-slate-100">
      <div className="flex flex-1 flex-col">
        <span className="pb-2 text-base text-gray-800 group-hover:text-gray-700">
          {colorItem.name}
        </span>
        {colorItem.value.map((valueItem, i) => (
          <div
            key={i}
            className="group/color flex flex-1 cursor-pointer items-center justify-between rounded-sm p-1.5 hover:bg-slate-200"
            onClick={(_) => onClipboard(valueItem)}
          >
            <span className="text-base text-gray-900 group-hover/color:text-gray-950">
              {valueItem}
            </span>
            <span className="text-xs leading-6 text-slate-600 opacity-0 group-hover/color:opacity-100">
              点击复制
            </span>
          </div>
        ))}
      </div>
    </li>
  )
}
