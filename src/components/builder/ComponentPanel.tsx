import { useBuilderStore } from '../../store/useBuilderStore'
import { COMPONENTS, CATEGORIES } from '../../constants/components'
import { generateId } from '../../utils/idGenerator'
import DraggableItem from './DraggableItem'
import type { ElementType } from '../../types'

interface Props {
  dark: boolean
}

export default function ComponentPanel({ dark }: Props) {
  const addElement = useBuilderStore((s) => s.addElement)

  const add = (type: ElementType) => {
    const def = COMPONENTS.find((c) => c.type === type)
    if (!def) return

    addElement({
      id: generateId(type),
      type,
      props: { ...def.defaults },
      children: [],
    })
  }

  const border = dark ? '#1E293B' : '#F3F4F6'
  const textMut = dark ? '#64748B' : '#9CA3AF'

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: `1px solid ${border}`,
        background: dark ? '#0F172A' : '#ffffff',
        overflowY: 'auto',
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: textMut,
          padding: '14px 20px 6px',
          margin: 0,
        }}
      >
        Components
      </p>

      {CATEGORIES.map((cat) => {
        const items = COMPONENTS.filter((c) => c.category === cat.key)

        return (
          <div key={cat.key}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: textMut,
                padding: '10px 20px 4px',
                margin: 0,
              }}
            >
              {cat.label}
            </p>

            {items.map((comp) => (
              <DraggableItem
                key={comp.type}
                type={comp.type}
                label={comp.label}
                dark={dark}
                onClick={() => add(comp.type)}
              />
            ))}
          </div>
        )
      })}
    </aside>
  )
}