import {
  createElement,
  ElementType,
  forwardRef,
  HTMLAttributes,
  ReactElement,
} from 'react'
import { Nilable } from 'tsdef'
import { IfElse } from './IfElse'

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children: Nilable<string>
}

export const HTML = forwardRef<HTMLElement, Props>(function Html(
  { children, as: element = 'div', ...props }: Props,
  ref,
): ReactElement {
  return (
    <IfElse condition={children}>
      {(html) =>
        createElement(
          element,
          {
            ref,
            ...props,
            dangerouslySetInnerHTML: {
              __html: html.replace(/<p><\/p>/, ''),
            },
          },
          null,
        )
      }
    </IfElse>
  )
})
