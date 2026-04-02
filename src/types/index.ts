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
  [key: string]: any
}

export interface UIElement {
  id: string
  type: ElementType
  props: ElementProps
  children: UIElement[]
}
export interface UIStyles {
  fontSize?: string
  fontWeight?: string
  textColor?: string
  background?: string
  rounded?: string
  shadow?: string
  width?: string
  height?: string
  opacity?: string
  cursor?: string
  overflow?: string

  padding?: string[]
  margin?: string[]
  border?: string[]
  layout?: string[]
  animation?: string[]
}