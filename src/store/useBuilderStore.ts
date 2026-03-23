import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UIElement, ViewMode, PreviewSize, ElementProps } from '../types'


function addToTree(tree: UIElement[], el: UIElement, parentId: string | null): UIElement[] {
  if (!parentId) return [...tree, el]

  return tree.map(node =>
    node.id === parentId
      ? { ...node, children: [...node.children, el] }
      : { ...node, children: addToTree(node.children, el, parentId) }
  )
}

function removeFromTree(tree: UIElement[], id: string): UIElement[] {
  return tree
    .filter(node => node.id !== id)
    .map(node => ({ ...node, children: removeFromTree(node.children, id) }))
}

function updateInTree(tree: UIElement[], id: string, props: Partial<ElementProps>): UIElement[] {
  return tree.map(node =>
    node.id === id
      ? { ...node, props: { ...node.props, ...props } }
      : { ...node, children: updateInTree(node.children, id, props) }
  )
}

function findInTree(tree: UIElement[], id: string): UIElement | null {
  for (const node of tree) {
    if (node.id === id) return node
    const found = findInTree(node.children, id)
    if (found) return found
  }
  return null
}


interface Store {
  tree: UIElement[]
  selectedId: string | null
  viewMode: ViewMode
  previewSize: PreviewSize
  isDark: boolean

  addElement: (el: UIElement, parentId?: string | null) => void
  removeElement: (id: string) => void
  updateElement: (id: string, props: Partial<ElementProps>) => void

  selectElement: (id: string | null) => void
  getSelected: () => UIElement | null

  setViewMode: (m: ViewMode) => void
  setPreviewSize: (s: PreviewSize) => void
  toggleDark: () => void
  clearCanvas: () => void
}

export const useBuilderStore = create<Store>()(
  persist(
    (set, get) => ({
      tree: [],
      selectedId: null,
      viewMode: 'split',
      previewSize: 'desktop',
      isDark: false,

      addElement: (el, parentId = null) =>
        set(state => ({
          tree: addToTree(state.tree, el, parentId),
          selectedId: el.id,
        })),

      removeElement: (id) =>
        set(state => ({
          tree: removeFromTree(state.tree, id),
          selectedId: state.selectedId === id ? null : state.selectedId,
        })),

      updateElement: (id, props) =>
        set(state => ({
          tree: updateInTree(state.tree, id, props),
        })),

      selectElement: (id) => set({ selectedId: id }),

      getSelected: () => {
        const { tree, selectedId } = get()
        return selectedId ? findInTree(tree, selectedId) : null
      },

      setViewMode: (viewMode) => set({ viewMode }),
      setPreviewSize: (previewSize) => set({ previewSize }),

      toggleDark: () => set(s => ({ isDark: !s.isDark })),

      clearCanvas: () => set({ tree: [], selectedId: null }),
    }),
    {
      name: 'codecanvas',
      partialize: (s) => ({ isDark: s.isDark }),
    }
  )
)