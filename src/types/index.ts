export type ElementType =
  | 'container'
  | 'divider'
  | 'heading'
  | 'text'
  | 'button'
  | 'input'
  | 'image'

export type ViewMode = 'visual' | 'split' | 'code'
export type PreviewSize = 'mobile' | 'tablet' | 'desktop'

export interface ElementProps {
  className?: string
  text?: string
  placeholder?: string
  src?: string
  alt?: string
  level?: 'h1' | 'h2' | 'h3' | 'h4'
  direction?: 'column' | 'row'
}

export interface UIElement {
  id: string
  type: ElementType
  props: ElementProps
  children: UIElement[]
}
