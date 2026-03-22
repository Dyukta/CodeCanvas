import type { ElementType } from '../types'

let counter = 0

export const generateId = (type: ElementType): string => {
  const time = Date.now().toString(36)
  const count = (counter++).toString(36)
  const rand = Math.random().toString(36).slice(2, 6)

  return `${type}-${time}-${count}-${rand}`
}