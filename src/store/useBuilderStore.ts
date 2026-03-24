import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UIElement, ViewMode, PreviewSize, ElementProps } from '../types'

type Tree = UIElement[]

const MAX_HISTORY = 50

const push = (stack: Tree[], tree: Tree): Tree[] =>
  [tree, ...stack].slice(0, MAX_HISTORY)

const addToTree = (tree: Tree, el: UIElement, parentId: string | null): Tree => {
  if (!parentId) return [...tree, el]

  return tree.map(n =>
    n.id === parentId
      ? { ...n, children: [...n.children, el] }
      : { ...n, children: addToTree(n.children, el, parentId) }
  )
}

const removeFromTree = (tree: Tree, id: string): Tree =>
  tree
    .filter(n => n.id !== id)
    .map(n => ({ ...n, children: removeFromTree(n.children, id) }))

const updateInTree = (tree: Tree, id: string, props: Partial<ElementProps>): Tree =>
  tree.map(n =>
    n.id === id
      ? { ...n, props: { ...n.props, ...props } }
      : { ...n, children: updateInTree(n.children, id, props) }
  )

const findInTree = (tree: Tree, id: string): UIElement | null => {
  for (const n of tree) {
    if (n.id === id) return n
    const found = findInTree(n.children, id)
    if (found) return found
  }
  return null
}

interface Store {
  tree: Tree
  selectedId: string | null
  viewMode: ViewMode
  previewSize: PreviewSize
  isDark: boolean
  past: Tree[]
  future: Tree[]

  addElement: (el: UIElement, parentId?: string | null) => void
  removeElement: (id: string) => void
  updateElement: (id: string, props: Partial<ElementProps>) => void
  selectElement: (id: string | null) => void
  getSelected: () => UIElement | null
  setViewMode: (v: ViewMode) => void
  setPreviewSize: (p: PreviewSize) => void
  toggleDark: () => void
  clearCanvas: () => void
  undo: () => void
  redo: () => void
}

export const useBuilderStore = create<Store>()(
  persist(
    (set, get) => ({
      tree: [],
      selectedId: null,
      viewMode: 'split',
      previewSize: 'desktop',
      isDark: false,
      past: [],
      future: [],

      addElement: (el, parentId = null) =>
        set((s: Store) => ({
          tree: addToTree(s.tree, el, parentId),
          past: push(s.past, s.tree),
          future: [],
          selectedId: el.id,
        })),

      removeElement: (id) =>
        set((s: Store) => ({
          tree: removeFromTree(s.tree, id),
          past: push(s.past, s.tree),
          future: [],
          selectedId: s.selectedId === id ? null : s.selectedId,
        })),

      updateElement: (id, props) =>
        set((s: Store) => ({
          tree: updateInTree(s.tree, id, props),
          past: push(s.past, s.tree),
          future: [],
        })),

      clearCanvas: () =>
        set((s: Store) => ({
          tree: [],
          past: push(s.past, s.tree),
          future: [],
          selectedId: null,
        })),

      undo: () =>
        set((s: Store) => {
          if (!s.past.length) return s
          const [prev, ...rest] = s.past
          return {
            ...s,
            tree: prev,
            past: rest,
            future: push(s.future, s.tree),
            selectedId: null,
          }
        }),

      redo: () =>
        set((s: Store) => {
          if (!s.future.length) return s
          const [next, ...rest] = s.future
          return {
            ...s,
            tree: next,
            future: rest,
            past: push(s.past, s.tree),
            selectedId: null,
          }
        }),

      selectElement: (id) => set({ selectedId: id }),

      getSelected: () => {
        const { tree, selectedId } = get()
        return selectedId ? findInTree(tree, selectedId) : null
      },

      setViewMode: (v) => set({ viewMode: v }),
      setPreviewSize: (p) => set({ previewSize: p }),
      toggleDark: () => set((s: Store) => ({ isDark: !s.isDark })),
    }),
    {
      name: 'codecanvas',
      partialize: s => ({ isDark: s.isDark }),
    }
  )
)