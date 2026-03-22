import type { UIElement } from '../types'

export function findInTree(tree: UIElement[], id: string): UIElement | null {
  for (const n of tree) {
    if (n.id === id) return n
    const found = findInTree(n.children, id)
    if (found) return found
  }
  return null
}

export function getSelected(tree: UIElement[], id: string | null) {
  if (!id) return null
  return findInTree(tree, id)
}
