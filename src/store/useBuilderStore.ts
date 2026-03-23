import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UIElement, ViewMode, PreviewSize, ElementProps } from '../types'


function addToTree(tree: UIElement[], el: UIElement, parentId: string | null): UIElement[] {
  if (!parentId) return [...tree, el]
  return tree.map(n =>
    n.id === parentId
      ? { ...n, children: [...n.children, el] }
      : { ...n, children: addToTree(n.children, el, parentId) }
  )
}

function removeFromTree(tree: UIElement[], id: string): UIElement[] {
  return tree
    .filter(n => n.id !== id)
    .map(n => ({ ...n, children: removeFromTree(n.children, id) }))
}

function updateInTree(tree: UIElement[], id: string, props: Partial<ElementProps>): UIElement[] {
  return tree.map(n =>
    n.id === id
      ? { ...n, props: { ...n.props, ...props } }
      : { ...n, children: updateInTree(n.children, id, props) }
  )
}

function findInTree(tree: UIElement[], id: string): UIElement | null {
  for (const n of tree) {
    if (n.id === id) return n
    const found = findInTree(n.children, id)
    if (found) return found
  }
  return null
}


const MAX_HISTORY = 50

function push(stack: UIElement[][], tree: UIElement[]): UIElement[][] {
  return [tree, ...stack].slice(0, MAX_HISTORY)
}

function commit(
  state: Store,
  nextTree: UIElement[],
  extra?: Partial<Store>
): Partial<Store> {
  return {
    tree:   nextTree,
    past:   push(state.past, state.tree),
    future: [],
    ...extra,
  }
}


interface Store {
  tree:        UIElement[]
  selectedId:  string | null
  viewMode:    ViewMode
  previewSize: PreviewSize
  isDark:      boolean
  past:        UIElement[][]
  future:      UIElement[][]

  addElement:    (el: UIElement, parentId?: string | null) => void
  removeElement: (id: string) => void
  updateElement: (id: string, props: Partial<ElementProps>) => void
  selectElement: (id: string | null) => void
  getSelected:   () => UIElement | null
  setViewMode:   (m: ViewMode) => void
  setPreviewSize:(s: PreviewSize) => void
  toggleDark:    () => void
  clearCanvas:   () => void
  undo:          () => void
  redo:          () => void
}


export const useBuilderStore = create<Store>()(
  persist(
    (set, get) => ({
      tree:        [],
      selectedId:  null,
      viewMode:    'split',
      previewSize: 'desktop',
      isDark:      false,
      past:        [],
      future:      [],

      addElement: (el, parentId = null) =>
        set(s => commit(s, addToTree(s.tree, el, parentId), { selectedId: el.id })),

      removeElement: (id) =>
        set(s => commit(s, removeFromTree(s.tree, id), {
          selectedId: s.selectedId === id ? null : s.selectedId,
        })),

      updateElement: (id, props) =>
        set(s => commit(s, updateInTree(s.tree, id, props))),

      clearCanvas: () =>
        set(s => commit(s, [], { selectedId: null })),


      undo: () => set(s => {
        if (!s.past.length) return s
        const [prev, ...rest] = s.past
        return {
          tree:   prev,
          past:   rest,
          future: push(s.future, s.tree),
          selectedId: null,
        }
      }),

      redo: () => set(s => {
        if (!s.future.length) return s
        const [next, ...rest] = s.future
        return {
          tree:   next,
          future: rest,
          past:   push(s.past, s.tree),
          selectedId: null,
        }
      }),

      selectElement: (id) => set({ selectedId: id }),

      getSelected: () => {
        const { tree, selectedId } = get()
        return selectedId ? findInTree(tree, selectedId) : null
      },

      setViewMode:    (viewMode)    => set({ viewMode }),
      setPreviewSize: (previewSize) => set({ previewSize }),
      toggleDark:     ()            => set(s => ({ isDark: !s.isDark })),
    }),
    {
      name:       'codecanvas',
      partialize: s => ({ isDark: s.isDark }),
    }
  )
)