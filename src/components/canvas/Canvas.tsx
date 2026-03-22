import { useDroppable } from '@dnd-kit/core'
import { Plus } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'
import { generateId } from '../../utils/idGenerator'
import CanvasElement from './CanvasElement'
import type { PreviewSize } from '../../types'

interface Props {
  dark: boolean
}

const WIDTH: Record<PreviewSize, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
}

export default function Canvas({ dark }: Props) {
  const tree = useBuilderStore((s) => s.tree)
  const previewSize = useBuilderStore((s) => s.previewSize)
  const selectElement = useBuilderStore((s) => s.selectElement)
  const addElement = useBuilderStore((s) => s.addElement)

  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-root',
    data: { parentId: null },
  })

  const empty = tree.length === 0

  const addContainer = () =>
    addElement({
      id: generateId('container'),
      type: 'container',
      props: {
        className: 'flex flex-col gap-4 p-4',
        direction: 'column',
      },
      children: [],
    })

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        padding: '24px 16px',
        background: dark ? '#0A0F1E' : '#F8FAFC',
      }}
      onClick={() => selectElement(null)}
    >
      <div
        ref={setNodeRef}
        style={{
          width: WIDTH[previewSize],
          maxWidth: '100%',
          minHeight: 500,
          background: dark ? '#0F172A' : '#fff',
          border: `1.5px solid ${
            isOver ? '#3B5BDB' : dark ? '#1E293B' : '#E2E8F0'
          }`,
          borderRadius: 10,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {empty ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 420,
              gap: 12,
            }}
          >
            <Plus size={22} />

            <p style={{ fontSize: 14 }}>
              Empty canvas
            </p>

            <button onClick={addContainer}>
              + Add container
            </button>
          </div>
        ) : (
          tree.map((el) => (
            <CanvasElement key={el.id} element={el} dark={dark} />
          ))
        )}
      </div>
    </div>
  )
}