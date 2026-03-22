import type { ElementType } from '../types'

export interface ComponentDef {
  type: ElementType
  label: string
  icon: string
  category: Category
  defaults: Record<string, any>
}

export type Category = 'layout' | 'typography' | 'form' | 'media'

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'layout', label: 'Layout' },
  { key: 'typography', label: 'Typography' },
  { key: 'form', label: 'Form' },
  { key: 'media', label: 'Media' },
]

export const COMPONENTS: ComponentDef[] = [
  {
    type: 'container',
    label: 'Container',
    icon: 'container',
    category: 'layout',
    defaults: { direction: 'column', className: 'flex flex-col gap-4 p-4' },
  },
  {
    type: 'divider',
    label: 'Divider',
    icon: 'divider',
    category: 'layout',
    defaults: { className: 'border-t border-gray-200 my-2' },
  },
  {
    type: 'heading',
    label: 'Heading',
    icon: 'heading',
    category: 'typography',
    defaults: { text: 'Heading', level: 'h2', className: 'text-2xl font-bold' },
  },
  {
    type: 'text',
    label: 'Text',
    icon: 'text',
    category: 'typography',
    defaults: { text: 'Text', className: 'text-base text-gray-600' },
  },
  {
    type: 'button',
    label: 'Button',
    icon: 'button',
    category: 'form',
    defaults: { text: 'Click me', className: 'px-4 py-2 bg-blue-500 text-white rounded-md' },
  },
  {
    type: 'input',
    label: 'Input',
    icon: 'input',
    category: 'form',
    defaults: { placeholder: 'Enter text...', className: 'border px-3 py-2 rounded-md w-full' },
  },
  {
    type: 'image',
    label: 'Image',
    icon: 'image',
    category: 'media',
    defaults: { src: 'https://placehold.co/400x200', alt: 'Image', className: 'w-full rounded-md' },
  },
]