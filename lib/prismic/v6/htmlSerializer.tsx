import type { LinkResolverFunction } from '@prismicio/helpers'
import * as prismicH from '@prismicio/helpers'
import type { Nullable } from 'tsdef'
import { makePath, translite } from '../makePath'
import { tp } from '../tp'

export const linkResolver: LinkResolverFunction = (doc: any) => {
  if (doc.type === 'articles') {
    return `/publikacii/${makePath(doc.title, doc.releasedate)}`
  }

  return `/${translite(doc.title)}`
}

export const htmlSerializer = (ctx?: {
  references: Record<
    number,
    {
      id: string
      anchor: string
      text: Nullable<string>
    }
  >
}): prismicH.HTMLMapSerializer => ({
  heading1: ({ children }) => {
    return `<h1>${tp.execute(children.trim())}</h1>`
  },
  heading2: ({ children }) => {
    return `<h2>${tp.execute(children.trim())}</h2>`
  },
  heading3: ({ children }) => {
    return `<h3>${tp.execute(children.trim())}</h3>`
  },
  heading4: ({ children }) => {
    return `<h4>${tp.execute(children.trim())}</h4>`
  },
  heading5: ({ children }) => {
    return `<h5>${tp.execute(children.trim())}</h5>`
  },
  heading6: ({ children }) => {
    return `<h6>${tp.execute(children.trim())}</h6>`
  },
  paragraph: ({ children, node }) => {
    return `<p>${tp.execute(children.trim())}</p>`
  },
  preformatted: ({ children }) => {
    return `<pre>${children}</pre>`
  },
  strong: ({ children }) => {
    return `<strong>${children}</strong>`
  },
  em: ({ children }) => {
    return `<em>${children}</em>`
  },
  listItem: ({ children }) => {
    return `<li>${children}</li>`
  },
  oListItem: ({ children }) => {
    return `<li>${children}</li>`
  },
  list: ({ children }) => {
    return `<ul>${children}</ul>`
  },
  oList: ({ children }) => {
    return `<ol>${children}</ol>`
  },
  image: ({ node }) => {
    const linkUrl = node.linkTo
      ? prismicH.asLink(node.linkTo, linkResolver)
      : null
    const linkTarget =
      node.linkTo && node.linkTo.link_type === 'Web'
        ? `target="${node.linkTo.target}" rel="noopener"`
        : ''
    const wrapperClassList = ['block-img']
    const img = `<img src="${node.url}" alt="${node.alt || ''}" copyright="${
      node.copyright || ''
    }">`
    return `
        <figure class="${wrapperClassList.join(' ')}">
          ${linkUrl ? `<a ${linkTarget} href="${linkUrl}">${img}</a>` : img}
        </figure>
      `
  },
  embed: ({ node }) => {
    return `
<div data-oembed="${node.oembed.embed_url}"
  data-oembed-type="${node.oembed.type}"
  data-oembed-provider="${node.oembed.provider_name}"
  class="grid place-stretch"
>
  ${node.oembed.html}
</div>
      `.trim()
  },
  hyperlink: ({ node, children, text }) => {
    // eslint-disable-next-line
    const target =
      node.data.link_type === 'Web'
        ? `target="${node.data.target}" rel="noopener noreferrer"`
        : ''

    if ((node.data as any).type === 'reference') {
      const reference = ctx?.references[children]
      if (!reference) return `<span>${children}</span>`
      return `
<input
  class="reference-input peer"
  type="checkbox"
  id="reference-${children}"
  name="reference"
  value="${children}"
/>
<label
  class="reference-label"
  for="reference-${children}"
>
  ${children}
</label>
<label
  class="reference-overlay"
  for="reference-${children}"
>
  <span class="reference-popover">
    <span class="reference-anchor">${reference.anchor.trim()}</span>
    ${reference.text
      .replace('<p>', '<span class="reference-text">')
      .replace('</p>', '</span>')}
  </span>
</label>
      `.trim()
    } else if (node.data.link_type === 'Document') {
      return `<a class="link" ${target} href="/${node.data.slug}">${children}</a>`
    }
    return `<a class="link" ${target} href="${node.data.url}">${children}</a>`
  },
  label: ({ children, node }) => {
    const label = node.data.label ? ` class="${node.data.label}"` : ''
    return `<span ${label}>${children}</span>`
  },
  span: ({ node }) => {
    return node.text ? node.text.replace(/\n/g, '<br />') : ''
  },
})
