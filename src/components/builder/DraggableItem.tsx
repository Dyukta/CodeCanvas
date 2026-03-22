import { useDraggable } from '@dnd-kit/core'
import {
  Square,
  Minus,
  Heading,
  AlignLeft,
  MousePointerClick,
  TextCursorInput,
  Image as ImageIcon,
} from 'lucide-react'
import type { ElementType } from '../../types'
import type { ReactNode } from 'react'

const ICONS: Record<ElementType, ReactNode> = {
  container: <Square size={14} />,
  divider: <Minus size={14} />,
  heading: <Heading size={14} />,
  text: <AlignLeft size={14} />,
  button: <MousePointerClick size={14} />,
  input: <TextCursorInput size={14} />,
  image: <ImageIcon size={14} />,
}

interface Props {
  type: ElementType
  label: string
  dark: boolean
  onClick: () => void
}

export default function DraggableItem({ type, label, dark, onClick }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new::${type}`,
    data: { type, isNew: true },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '7px 10px',
        borderRadius: 6,
        cursor: 'grab',
        fontSize: 13,
        color: dark ? '#CBD5E1' : '#374151',
        opacity: isDragging ? 0.4 : 1,
        userSelect: 'none',
        transition: 'background 0.1s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = dark ? '#1E293B' : '#F3F4F6'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <span style={{ color: dark ? '#64748B' : '#9CA3AF', display: 'flex' }}>
        {ICONS[type]}
      </span>
      {label}
    </div>
  )
}