import type { UIElement } from '../types'

const indent = (n: number) => '  '.repeat(n)

function toJSX(el: UIElement, depth: number): string {
  const pad = indent(depth)
  const next = indent(depth + 1)

  const cls = el.props.className ?? ''

  switch (el.type) {
    case 'container': {
      const direction = el.props.direction === 'row' ? 'row' : 'col'
      const defaultCls = `flex flex-${direction} gap-4 p-4`
      const className = cls || defaultCls

      const children = el.children.length
        ? el.children.map(c => toJSX(c, depth + 1)).join('\n')
        : `${next}{/* empty */}`

      return `${pad}<div className="${className}">
${children}
${pad}</div>`
    }

    case 'divider': {
      const className = cls || 'border-t border-gray-200 my-2'
      return `${pad}<hr className="${className}" />`
    }

    case 'heading': {
      const tag = el.props.level ?? 'h2'
      const text = el.props.text ?? 'Heading'
      const className = cls || 'text-2xl font-bold'

      return `${pad}<${tag} className="${className}">${text}</${tag}>`
    }

    case 'text': {
      const text = el.props.text ?? 'Text'
      const className = cls || 'text-base text-gray-600'

      return `${pad}<p className="${className}">${text}</p>`
    }

    case 'button': {
      const text = el.props.text ?? 'Click me'
      const className = cls || 'px-4 py-2 bg-blue-500 text-white rounded-md'

      return `${pad}<button className="${className}">${text}</button>`
    }

    case 'input': {
      const placeholder = el.props.placeholder ?? 'Enter text...'
      const className = cls || 'border rounded-md px-3 py-2 w-full'

      return `${pad}<input className="${className}" placeholder="${placeholder}" />`
    }

    case 'image': {
      const src = el.props.src ?? 'https://placehold.co/400x200'
      const alt = el.props.alt ?? 'Image'
      const className = cls || 'w-full rounded-md'

      return `${pad}<img src="${src}" alt="${alt}" className="${className}" />`
    }

    default:
      return `${pad}<div />`
  }
}

export function generateCode(tree: UIElement[]): string {
  const body = tree.length
    ? tree.map(el => toJSX(el, 2)).join('\n')
    : `${indent(2)}{/* Drop components here */}`

  return `export default function Component() {
  return (
${indent(2)}<div className="p-4">
${body}
${indent(2)}</div>
  )
}`
}