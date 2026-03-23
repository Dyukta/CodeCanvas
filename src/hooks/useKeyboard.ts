import { useEffect } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'

export function useKeyboard() {
  const selectedId    = useBuilderStore(s => s.selectedId)
  const removeElement = useBuilderStore(s => s.removeElement)
  const selectElement = useBuilderStore(s => s.selectElement)
  const undo          = useBuilderStore(s => s.undo)
  const redo          = useBuilderStore(s => s.redo)

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const tag    = (e.target as HTMLElement).tagName
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)
      const ctrl   = e.ctrlKey || e.metaKey

      if (ctrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
        return
      }

      if (ctrl && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
        return
      }

      if (!typing && selectedId && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault()
        removeElement(selectedId)
      }


      if (e.key === 'Escape') {
        selectElement(null)
      }
    }

    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [selectedId, removeElement, selectElement, undo, redo])
}