import type { ReactElement } from 'react'
import { Nilable } from 'tsdef'

type Props<T extends any> = {
  condition: T
  children: (pred: NonNullable<Props<T>['condition']>) => ReactElement
  fallback?: Nilable<ReactElement>
}

export function IfElse<T extends any>({
  condition,
  children,
  fallback = null,
}: Props<T>) {
  return condition ? children(condition as NonNullable<T>) : fallback
}
