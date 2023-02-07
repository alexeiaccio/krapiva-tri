import { cva, cx, VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'
import { Divider } from './Divider'
import { IfElse } from './IfElse'
import { List } from './List'

const slider = cva('col-span-full grid', {
  variants: {
    mode: {
      carousel: [
        'grid-cols-[inherit] p-4 md:p-8',
        'overflow-x-auto overscroll-x-contain',
        'snap-x-mandatory scrollbar',
        'bg-white dark:bg-black',
      ],
      grid: 'gap-px grid-cols-[1fr,minmax(0,112ch),1fr]',
    },
  },
  defaultVariants: {
    mode: 'carousel',
  },
})

const ul = cva('', {
  variants: {
    mode: {
      carousel: 'col-[2] flex gap-2 md:gap-4',
      grid: [
        'grid gap-x-4 gap-y-8 grid-cols-1',
        'p-4 md:grid-cols-2',
        'bg-white dark:bg-black',
      ],
    },
  },
  defaultVariants: {
    mode: 'carousel',
  },
})

export const li = cva('', {
  variants: {
    mode: {
      carousel: 'flex-shrink-0 w-[90%] md:w-2/3 snap-align-center',
      grid: '',
    },
    flex: {
      default: '',
      grow: 'flex-grow',
    },
  },
  defaultVariants: {
    mode: 'carousel',
    flex: 'default',
  },
})

export type SliderVariants = VariantProps<typeof slider>

type SliderProps<DataType> = {
  data: DataType[]
  children: (item: DataType) => ReactNode
  lastItem?: ReactNode
  className?: string
} & SliderVariants

export function Slider<DataType>({
  data,
  className,
  children,
  lastItem,
  mode,
}: SliderProps<DataType>) {
  return (
    <div className={slider({ mode, class: className })}>
      <IfElse condition={mode === 'grid'}>{() => <Divider />}</IfElse>
      <ul className={ul({ mode })}>
        <IfElse
          condition={data.length}
          fallback={
            <li className={li({ mode, flex: 'grow' })}>
              <div
                className={cx('w-full bg-slate-100 animate-pulse dark:bg-slate-900', 'pb-[62.218%]')}
              />
            </li>
          }
        >
          {() => (
            <>
              <List data={data}>
                {(item, idx) => (
                  <li
                    // @ts-expect-error
                    key={item?.id || `carousel-item-${idx}`}
                    className={li({
                      mode,
                      flex: data.length > 1 ? 'grow' : 'default',
                    })}
                  >
                    {children(item)}
                  </li>
                )}
              </List>
              <IfElse condition={lastItem}>
                {() => (
                  <li
                    className={li({
                      mode,
                      flex: data.length > 1 ? 'grow' : 'default',
                    })}
                  >
                    {lastItem}
                  </li>
                )}
              </IfElse>
              <IfElse condition={mode !== 'grid'}>
                {() => (
                  <li className="flex-grow flex-shrink-0 block w-2 h-2 md:w-4" />
                )}
              </IfElse>
            </>
          )}
        </IfElse>
      </ul>
      <IfElse condition={mode === 'grid'}>{() => <Divider />}</IfElse>
    </div>
  )
}
