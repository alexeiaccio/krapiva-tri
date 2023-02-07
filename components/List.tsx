import type { ReactElement } from 'react'
import type { Nilable } from 'tsdef'

type Props<DataType> = {
  data: Nilable<DataType[]>
  children: (item: DataType, idx: number) => ReactElement
}

export function List<DataType>({ data, children }: Props<DataType>) {
  return data ? (
    <>
      {data.filter(Boolean).map((item, idx) => {
        return children(item, idx)
      })}
    </>
  ) : null
}
