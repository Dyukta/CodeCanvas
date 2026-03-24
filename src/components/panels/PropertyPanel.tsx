import { useMemo } from 'react'
import { useBuilderStore } from '../../store/useBuilderStore'

interface Props {
  dark: boolean
}

type GroupMap = Record<string, string[]>

const EXCLUSIVE_GROUPS: GroupMap = {
  'Font Size': ['text-sm','text-base','text-lg','text-xl','text-2xl','text-3xl','text-4xl'],
  'Font Weight': ['font-normal','font-medium','font-semibold','font-bold','font-extrabold'],
  'Text Color': ['text-white','text-gray-900','text-gray-500','text-red-500','text-blue-500','text-green-500','text-yellow-500','text-purple-500'],
  Background: ['bg-white','bg-gray-100','bg-gray-900','bg-blue-500','bg-red-500','bg-green-500','bg-yellow-400','bg-purple-500'],
  Rounded: ['rounded-none','rounded','rounded-md','rounded-lg','rounded-xl','rounded-2xl','rounded-full'],
  Shadow: ['shadow-none','shadow-sm','shadow','shadow-md','shadow-lg','shadow-xl'],
  Width: ['w-full','w-auto','w-1/2','w-1/3','w-1/4','w-64','w-48','w-32'],
  Height: ['h-auto','h-full','h-8','h-12','h-16','h-24','h-32','h-48'],
  Opacity: ['opacity-25','opacity-50','opacity-75','opacity-100'],
  Cursor: ['cursor-pointer','cursor-default','cursor-not-allowed'],
  Overflow: ['overflow-hidden','overflow-auto','overflow-scroll','overflow-visible'],
}

const ADDITIVE_GROUPS: GroupMap = {
  Padding: ['p-1','p-2','p-4','p-6','p-8','px-4','py-2','px-6','py-3'],
  Margin: ['m-0','m-2','m-4','mx-auto','mt-4','mb-4'],
  Border: ['border','border-2','border-4','border-gray-300','border-blue-500','border-red-500'],
  Layout: ['flex','flex-row','flex-col','flex-wrap','items-center','items-start','justify-center','justify-between','justify-start','gap-2','gap-4','gap-6'],
  Animation: ['animate-spin','animate-ping','animate-pulse','animate-bounce'],
}

const ALL_GROUPS: GroupMap = { ...EXCLUSIVE_GROUPS, ...ADDITIVE_GROUPS }

export default function PropertyPanel({ dark }: Props) {
  const el = useBuilderStore(s => s.getSelected())
  const update = useBuilderStore(s => s.updateElement)
  const remove = useBuilderStore(s => s.removeElement)

  if (!el) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontSize: 13,
        color: dark ? '#64748B' : '#9CA3AF'
      }}>
        Select an element
      </div>
    )
  }

  const classList = useMemo<string[]>(
    () => (el.props.className ?? '').split(' ').filter(Boolean),
    [el.props.className]
  )

  const hasClass = (cls: string) => classList.includes(cls)

  const toggleClass = (cls: string, group: string) => {
    const isExclusive = group in EXCLUSIVE_GROUPS
    const groupItems = EXCLUSIVE_GROUPS[group] ?? []

    let next: string[]

    if (isExclusive) {
      const filtered = classList.filter((c: string) => !groupItems.includes(c))
      next = hasClass(cls) ? filtered : [...filtered, cls]
    } else {
      next = hasClass(cls)
        ? classList.filter((c: string) => c !== cls)
        : [...classList, cls]
    }

    update(el.id, { className: next.join(' ') })
  }

  const setProp = (key: string, value: string) => {
    update(el.id, { [key]: value })
  }

  const textMut = dark ? '#64748B' : '#9CA3AF'
  const textPri = dark ? '#F1F5F9' : '#111827'
  const inputBg = dark ? '#1E293B' : '#F9FAFB'
  const border  = dark ? '#334155' : '#E5E7EB'

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '7px 10px',
    fontSize: 13,
    background: inputBg,
    border: `1px solid ${border}`,
    borderRadius: 6,
    color: textPri,
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

      <span style={{
        fontSize: 11,
        fontWeight: 600,
        color: textPri
      }}>
        {el.type}
      </span>

      {['heading','text','button'].includes(el.type) && (
        <div>
          <input
            value={el.props.text ?? ''}
            onChange={e => setProp('text', e.target.value)}
            style={inputStyle}
          />
        </div>
      )}

      <div>
        <textarea
          value={el.props.className ?? ''}
          onChange={e => setProp('className', e.target.value)}
          rows={3}
          style={inputStyle}
        />
      </div>

      {Object.entries(ALL_GROUPS).map(([label, chips]) => {
        const exclusive = label in EXCLUSIVE_GROUPS

        return (
          <div key={label}>
            <div style={{ fontSize: 11, color: textMut, marginBottom: 4 }}>
              {label} ({exclusive ? 'single' : 'multi'})
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {chips.map((chip: string) => {
                const active = hasClass(chip)

                return (
                  <button
                    key={chip}
                    onClick={() => toggleClass(chip, label)}
                    style={{
                      padding: '3px 8px',
                      fontSize: 11,
                      borderRadius: 5,
                      border: `1px solid ${active ? '#3B5BDB' : border}`,
                      background: active ? '#EEF2FF' : inputBg,
                      color: active ? '#3B5BDB' : textMut,
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    {chip}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      <button
        onClick={() => remove(el.id)}
        style={{
          color: '#EF4444',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 13,
          textAlign: 'left'
        }}
      >
        Delete Element
      </button>
    </div>
  )
}