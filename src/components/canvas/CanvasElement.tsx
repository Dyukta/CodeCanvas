import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Trash2 } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'
import type { UIElement, ElementType } from '../../types'

interface Props {
  element: UIElement
  dark: boolean
}

const HEADING_SIZES: Record<string, number> = {
  h1: 28,
  h2: 22,
  h3: 18,
  h4: 15,
  h5: 13,
  h6: 12,
}

const BLOCK_TYPES: ElementType[] = ['container', 'input', 'image', 'divider']

export default function CanvasElement({ element, dark }: Props) {
  const selectedId = useBuilderStore((s) => s.selectedId)
  const selectElement = useBuilderStore((s) => s.selectElement)
  const removeElement = useBuilderStore((s) => s.removeElement)

  const selected = selectedId === element.id

  const { setNodeRef: dragRef, listeners, attributes, isDragging } = useDraggable({
    id: `move::${element.id}`,
    data: { elementId: element.id, isNew: false },
  })

  const { setNodeRef: dropRef, isOver } = useDroppable({
    id: `drop::${element.id}`,
    data: { parentId: element.id },
  })

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  const borderColor = selected
    ? '#3B5BDB'
    : isOver
    ? '#60A5FA'
    : dark
    ? '#334155'
    : '#E5E7EB'

  const renderBody = () => {
    const { type, props, children } = element

    switch (type) {
      case 'container':
        return (
          <div
            ref={dropRef}
            style={{
              display: 'flex',
              flexDirection: props.direction === 'row' ? 'row' : 'column',
              gap: 8,
              minHeight: 48,
              width: '100%',
            }}
          >
            {children.length === 0 ? (
              <span
                style={{
                  fontSize: 12,
                  color: dark ? '#475569' : '#9CA3AF',
                  margin: 'auto',
                }}
              >
                Container
              </span>
            ) : (
              children.map((c) => (
                <CanvasElement key={c.id} element={c} dark={dark} />
              ))
            )}
          </div>
        )

      case 'divider':
        return (
          <hr
            style={{
              border: 'none',
              borderTop: `1px solid ${dark ? '#334155' : '#E5E7EB'}`,
              width: '100%',
              margin: '4px 0',
            }}
          />
        )

      case 'heading': {
        const Tag = (props.level || 'h2') as keyof HTMLElementTagNameMap
        return (
          <Tag
            style={{
              fontSize: HEADING_SIZES[props.level || 'h2'],
              fontWeight: 700,
              color: dark ? '#F1F5F9' : '#0F172A',
              margin: 0,
            }}
          >
            {props.text || 'Heading'}
          </Tag>
        )
      }

      case 'text':
        return (
          <p
            style={{
              fontSize: 14,
              color: dark ? '#94A3B8' : '#6B7280',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {props.text || 'Text'}
          </p>
        )

      case 'button':
        return (
          <button
            style={{
              padding: '8px 16px',
              background: '#3B5BDB',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              pointerEvents: 'none',
            }}
          >
            {props.text || 'Click me'}
          </button>
        )

      case 'input':
        return (
          <input
            readOnly
            placeholder={props.placeholder || 'Enter text...'}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${dark ? '#334155' : '#D1D5DB'}`,
              borderRadius: 6,
              fontSize: 14,
              background: dark ? '#1E293B' : '#F9FAFB',
            }}
          />
        )

      case 'image':
        return (
          <img
            src={props.src || 'https://placehold.co/400x200'}
            alt={props.alt || 'Image'}
            style={{
              width: '100%',
              borderRadius: 6,
              display: 'block',
            }}
          />
        )

      default:
        return null
    }
  }

  return (
    <div
      ref={dragRef}
      onClick={(e) => {
        stop(e)
        selectElement(element.id)
      }}
      style={{
        position: 'relative',
        border: `1.5px solid ${borderColor}`,
        borderRadius: 8,
        padding: element.type === 'container' ? 12 : 8,
        background: dark ? '#0F172A' : '#fff',
        opacity: isDragging ? 0.3 : 1,
        cursor: 'pointer',
        width: BLOCK_TYPES.includes(element.type) ? '100%' : 'auto',
      }}
      {...(selected ? listeners : {})}
      {...(selected ? attributes : {})}
    >
      {selected && (
        <span
          style={{
            position: 'absolute',
            top: -1,
            left: -1,
            background: '#3B5BDB',
            color: '#fff',
            fontSize: 10,
            padding: '1px 6px',
            borderRadius: '6px 0 6px 0',
          }}
        >
          {element.type}
        </span>
      )}

      {renderBody()}

      {selected && (
        <button
          onClick={(e) => {
            stop(e)
            removeElement(element.id)
          }}
          style={{
            position: 'absolute',
            top: -11,
            right: -11,
            width: 20,
            height: 20,
            background: '#EF4444',
            border: 'none',
            borderRadius: '50%',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <Trash2 size={10} />
        </button>
      )}
    </div>
  )
}