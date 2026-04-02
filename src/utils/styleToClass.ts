import type { UIStyles } from '../types'

export function stylesToClass(styles?: UIStyles, className?: string) {
  if (!styles) return className || ''

  const result: string[] = []


  Object.values({
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
    textColor: styles.textColor,
    background: styles.background,
    rounded: styles.rounded,
    shadow: styles.shadow,
    width: styles.width,
    height: styles.height,
    opacity: styles.opacity,
    cursor: styles.cursor,
    overflow: styles.overflow,
  }).forEach(v => v && result.push(v))


  Object.values({
    padding: styles.padding,
    margin: styles.margin,
    border: styles.border,
    layout: styles.layout,
    animation: styles.animation,
  }).forEach(arr => arr?.forEach(v => result.push(v)))

  if (className) result.push(className)

  return result.join(' ')
}