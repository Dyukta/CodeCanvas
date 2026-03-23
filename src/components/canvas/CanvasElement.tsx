import React from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Trash2 } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'
import type { UIElement, ElementType } from '../../types'

interface Props {
  element: UIElement
  dark: boolean
}

const BLOCK_TYPES: ElementType[] = ['container', 'input', 'image', 'divider']

const HEADING_SIZES: Record<string, number> = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
}

export default function CanvasElement({ element, dark }: Props) {
  const selectedId = useBuilderStore(s => s.selectedId)
  const selectElement = useBuilderStore(s => s.selectElement)
  const removeElement = useBuilderStore(s => s.removeElement)

  const selected = selectedId === element.id
  const { props = {}, children = [] } = element
  const cls = props.className || ''

  const { setNodeRef: dragRef, listeners, attributes, isDragging } =
    useDraggable({
      id: `move::${element.id}`,
      data: { elementId: element.id },
    })

  const { setNodeRef: dropRef, isOver } = useDroppable({
    id: `drop::${element.id}`,
    data: { parentId: element.id },
  })

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  const borderColor =
    selected ? '#3B5BDB' : isOver ? '#60A5FA' : dark ? '#334155' : '#E5E7EB'

  const renderHeading = () => {
    const level = (props.level || 'h2') as 'h1' | 'h2' | 'h3' | 'h4'

    const style = cls
      ? undefined
      : {
          fontSize: HEADING_SIZES[level],
          fontWeight: 700,
          margin: 0,
          color: dark ? '#F1F5F9' : '#0F172A',
        }

    switch (level) {
      case 'h1':
        return <h1 className={cls || undefined} style={style}>{props.text || 'Heading'}</h1>
      case 'h3':
        return <h3 className={cls || undefined} style={style}>{props.text || 'Heading'}</h3>
      case 'h4':
        return <h4 className={cls || undefined} style={style}>{props.text || 'Heading'}</h4>
      default:
        return <h2 className={cls || undefined} style={style}>{props.text || 'Heading'}</h2>
    }
  }

  const renderBody = () => {
    switch (element.type) {
      case 'container':
        return (
          <div
            ref={dropRef}
            className={cls || undefined}
            style={
              cls
                ? { minHeight: 48, width: '100%' }
                : {
                    display: 'flex',
                    flexDirection:
                      props.direction === 'row' ? 'row' : 'column',
                    gap: 8,
                    minHeight: 48,
                    width: '100%',
                  }
            }
          >
            {children.length === 0
              ? <span style={{ fontSize: 12, opacity: 0.6 }}>Container</span>
              : children.map((c: UIElement) => (
                  <CanvasElement key={c.id} element={c} dark={dark} />
                ))}
          </div>
        )

      case 'divider':
        return (
          <hr
            className={cls || undefined}
            style={
              cls
                ? undefined
                : {
                    border: 'none',
                    borderTop: `1px solid ${
                      dark ? '#334155' : '#E5E7EB'
                    }`,
                    width: '100%',
                  }
            }
          />
        )

      case 'heading':
        return renderHeading()

      case 'text':
        return (
          <p
            className={cls || undefined}
            style={
              cls
                ? undefined
                : {
                    fontSize: 14,
                    margin: 0,
                    lineHeight: 1.6,
                    color: dark ? '#94A3B8' : '#6B7280',
                  }
            }
          >
            {props.text || 'Text'}
          </p>
        )

      case 'button':
        return (
          <button
            className={cls || undefined}
            style={{
              padding: '8px 16px',
              background: '#3B5BDB',
              color: '#fff',
              border: 0,
              borderRadius: 6,
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
            placeholder={props.placeholder || ''}
            className={cls || undefined}
            style={
              cls
                ? undefined
                : {
                    width: '100%',
                    padding: '8px 12px',
                    border: `1px solid ${
                      dark ? '#334155' : '#D1D5DB'
                    }`,
                    borderRadius: 6,
                    background: dark ? '#1E293B' : '#F9FAFB',
                  }
            }
          />
        )

      case 'image':
        return (
          <img
            src={props.src || 'https://placehold.co/400x200'}
            alt={props.alt || ''}
            className={cls || undefined}
            style={cls ? undefined : { width: '100%', borderRadius: 6 }}
          />
        )
    }
  }

  return (
    <div
      ref={dragRef}
      onClick={e => {
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
            fontWeight: 600,
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
          onClick={e => {
            stop(e)
            removeElement(element.id)
          }}
          style={{
            position: 'absolute',
            top: -11,
            right: -11,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#EF4444',
            border: 0,
            color: '#fff',
          }}
        >
          <Trash2 size={10} />
        </button>
      )}
    </div>
  )
}