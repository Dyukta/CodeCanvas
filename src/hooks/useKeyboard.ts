import { useEffect } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'

export function useKeyboard() {
  const selectedId = useBuilderStore(s => s.selectedId)
  const removeElement = useBuilderStore(s => s.removeElement)
  const selectElement = useBuilderStore(s => s.selectElement)

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)

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
  }, [selectedId, removeElement, selectElement])
}