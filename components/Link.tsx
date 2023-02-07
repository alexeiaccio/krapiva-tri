import { LinkProps, default as NextLink } from 'next/link'
import React, { AnchorHTMLAttributes } from 'react'

type Url = LinkProps['href']
type HasHttp<S> = S extends string
  ? S extends `http${infer A}`
    ? A
    : false
  : false
export type Props<Href extends Url = Url> = HasHttp<Href> extends string
  ? {
      children: JSX.Element
      href: Href
    } & AnchorHTMLAttributes<HTMLAnchorElement>
  : { children: JSX.Element; href: Href } & Omit<LinkProps, 'href'>

export function Link<Href extends Url = Url>({
  children,
  href,
  ...props
}: Props<Href>) {
  if (
    (typeof href === 'string' && href.includes('http')) ||
    href.toString().includes('http')
  ) {
    return (
      <children.type
        key={children.key}
        {...children.props}
        {...props}
        href={href}
        target="_blank"
        rel="noreferrer"
      />
    )
  }

  return (
    <NextLink href={href} {...props} passHref>
      {children}
    </NextLink>
  )
}
