import { useState, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'

import { useBuilderStore } from '../store/useBuilderStore'
import { generateId } from '../utils/idGenerator'
import { COMPONENTS } from '../constants/components'
import { useKeyboard } from '../hooks/useKeyboard'

import Toolbar from '../components/shared/Toolbar'
import PanelLayout from '../components/layout/PanelLayout'

import type { UIElement } from '../types'

export default function BuilderPage() {

  const addElement = useBuilderStore(s => s.addElement)
  const dark = useBuilderStore(s => s.isDark)

  useKeyboard()

  const [dragLabel, setDragLabel] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  )

  const onDragStart = useCallback((e: DragStartEvent) => {
    const data = e.active.data.current
    if (!data?.isNew) return

    const comp = COMPONENTS.find(c => c.type === data.type)
    setDragLabel(comp?.label ?? data.type)
  }, [])

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      setDragLabel(null)

      const { active, over } = e
      const data = active.data.current

      if (!over || !data?.isNew) return

      const def = COMPONENTS.find(c => c.type === data.type)
      if (!def) return

      const el: UIElement = {
        id: generateId(def.type),
        type: def.type,
        props: { ...def.defaults },
        children: [],
      }

      const parentId = over.data.current?.parentId ?? null
      addElement(el, parentId)
    },
    [addElement]
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          fontFamily: 'Inter, sans-serif',
          background: dark ? '#0F172A' : '#ffffff',
          color: dark ? '#F1F5F9' : '#111827',
        }}
      >
        <Toolbar dark={dark} />
        <PanelLayout dark={dark} />
      </div>

      <DragOverlay dropAnimation={null}>
        {dragLabel && (
          <div
            style={{
              padding: '6px 14px',
              background: '#3B5BDB',
              color: '#fff',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 4px 14px rgba(59,91,219,0.4)',
              cursor: 'grabbing',
              whiteSpace: 'nowrap',
            }}
          >
            {dragLabel}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}