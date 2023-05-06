import { useEffect } from 'react'
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
} from 'react-hook-form'
import type { UseFieldArrayRemove, FieldArrayWithId } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from '@/components'

type Color<T extends string = string> = {
  [key in T]: string | Color<T>
}

type ColorItemType<T extends string = string> = {
  name: string
  color: Color<T> | string
}

// type Colors<T extends string = string> = ColorItem<T>[];
type Colors<T extends string = string> = Array<ColorItemType<T>>

const schema = yup
  .object()
  .shape({
    colors: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required('请输入主题名称'),
          color: yup.string().test({
            name: 'color',
            message: '格式错误，请先使用在线JSON解析工具格式化处理',
            test: (value) => {
              try {
                const parseValue = JSON.parse(value as string)
                if (
                  typeof parseValue === 'object' &&
                  !Array.isArray(parseValue)
                ) {
                  return true
                }
                return false
              } catch (error) {
                return false
              }
            },
          }),
        })
      )
      .required(),
  })
  .required()

type FormData = {
  colors: Colors
}

export function AddTheme() {
  const form = useForm<FormData>({
    defaultValues: {
      colors: [
        {
          name: '',
          color: '',
        },
      ],
    },
    resolver: yupResolver(schema),
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'colors',
  })

  const onSubmit = (data: FormData) => {
    console.log('submit data ---->', data)
    chrome.storage.sync.set({ colors: data.colors })
  }

  useEffect(() => {
    chrome.storage.sync.get((items) => {
      console.log('storege value --->', items)
      form.setValue('colors', items.colors)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Button onClick={(_) => append({ name: '', color: '' })}>
            增加新项目
          </Button>
          {fields.map((field, index) => (
            <ColorItem
              key={field.id}
              field={field}
              index={index}
              onRemove={(_) => remove(index)}
            />
          ))}
          {fields.length > 0 && (
            <div className="w-full">
              <Button type="submit">保存</Button>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

interface ColorItemPropsType {
  field: FieldArrayWithId<
    {
      colors: Colors
    },
    'colors',
    'id'
  >
  index: number
  onRemove: UseFieldArrayRemove
}

function ColorItem(props: ColorItemPropsType) {
  const { field, index, onRemove } = props
  const { register, formState } = useFormContext<{ colors: Colors }>()

  return (
    <div key={field.id} className="space-y-6">
      <Button onClick={(_) => onRemove()}>删除该项目</Button>
      <div className="flex flex-col space-y-4">
        <label htmlFor={`${field.id}.name`} className="cursor-pointer text-lg">
          主题名称
        </label>
        <input
          autoComplete="off"
          {...register(`colors.${index}.name`)}
          id={`${field.id}.name`}
          className="w-[300px] rounded-md bg-slate-300 px-3 py-2 text-gray-800"
          placeholder="请输入主题名称"
        />
        {formState.errors.colors &&
          formState.errors.colors[index]?.name?.message && (
            <p className="text-red-500">请输入正确的主题名称</p>
          )}
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-end space-x-1">
          <label
            htmlFor={`${field.id}.color`}
            className="cursor-pointer text-lg"
          >
            添加主题
          </label>
        </div>
        <textarea
          {...register(`colors.${index}.color`, { required: true })}
          id={`${field.id}.color`}
          className="min-h-[300px] w-[500px] rounded-md bg-slate-300 px-3 py-2 text-gray-800"
          placeholder="请输入JSON格式数据"
        />
        {formState.errors.colors &&
          formState.errors.colors[index]?.color?.message && (
            <p className="text-red-500">
              <span>
                请输入JSON格式数据，如出现格式错误，请先使用在线JSON解析工具格式化处理
              </span>
              <a
                className="underline"
                href="https://jsonformatter.curiousconcept.com"
                target="__blank"
              >
                (例如这个)
              </a>
            </p>
          )}
      </div>
    </div>
  )
}
