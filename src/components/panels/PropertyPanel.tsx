import { useBuilderStore } from '../../store/useBuilderStore'

interface Props { dark: boolean }

export default function PropertyPanel({ dark }: Props) {
  const el = useBuilderStore(s => s.getSelected())
  const updateElement = useBuilderStore(s => s.updateElement)
  const removeElement = useBuilderStore(s => s.removeElement)

  const textMut = dark ? '#64748B' : '#9CA3AF'
  const textPri = dark ? '#F1F5F9' : '#111827'
  const inputBg = dark ? '#1E293B' : '#F9FAFB'
  const inputBorder = dark ? '#334155' : '#E5E7EB'

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '7px 10px',
    fontSize: 13,
    background: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: 6,
    color: textPri,
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  }

  const Label = ({ children }: { children: React.ReactNode }) => (
    <p style={{
      fontSize: 11,
      fontWeight: 700,
      color: textMut,
      textTransform: 'uppercase',
      margin: '0 0 6px',
    }}>
      {children}
    </p>
  )

  if (!el) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: textMut,
        fontSize: 13,
      }}>
        Select an element
      </div>
    )
  }

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

      <span style={{
        fontSize: 11,
        fontWeight: 600,
        background: dark ? '#1E293B' : '#EEF2FF',
        color: '#3B5BDB',
        padding: '3px 8px',
        borderRadius: 4,
        alignSelf: 'flex-start',
      }}>
        {el.type}
      </span>

      {['heading', 'text', 'button'].includes(el.type) && (
        <div>
          <Label>Text</Label>
          <input
            value={el.props.text ?? ''}
            onChange={e => updateElement(el.id, { text: e.target.value })}
            style={inputStyle}
          />
        </div>
      )}


      <div>
        <Label>ClassName</Label>
        <textarea
          value={el.props.className ?? ''}
          onChange={e => updateElement(el.id, { className: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          rows={3}
        />
      </div>


      {el.type === 'heading' && (
        <div>
          <Label>Level</Label>
          <input
            value={el.props.level ?? 'h2'}
            onChange={e => updateElement(el.id, { level: e.target.value as any })}
            style={inputStyle}
          />
        </div>
      )}

      {el.type === 'input' && (
        <div>
          <Label>Placeholder</Label>
          <input
            value={el.props.placeholder ?? ''}
            onChange={e => updateElement(el.id, { placeholder: e.target.value })}
            style={inputStyle}
          />
        </div>
      )}

      {el.type === 'image' && (
        <>
          <div>
            <Label>Src</Label>
            <input
              value={el.props.src ?? ''}
              onChange={e => updateElement(el.id, { src: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <Label>Alt</Label>
            <input
              value={el.props.alt ?? ''}
              onChange={e => updateElement(el.id, { alt: e.target.value })}
              style={inputStyle}
            />
          </div>
        </>
      )}

      {el.type === 'container' && (
        <div>
          <Label>Direction</Label>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['column', 'row'] as const).map(dir => {
              const active = (el.props.direction ?? 'column') === dir
              return (
                <button
                  key={dir}
                  onClick={() => updateElement(el.id, { direction: dir })}
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    borderRadius: 6,
                    border: `1px solid ${active ? '#3B5BDB' : inputBorder}`,
                    background: active ? '#EEF2FF' : inputBg,
                    color: active ? '#3B5BDB' : textMut,
                    cursor: 'pointer',
                  }}
                >
                  {dir}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => removeElement(el.id)}
        style={{
          marginTop: 6,
          color: '#EF4444',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        Delete Element
      </button>

    </div>
  )
}