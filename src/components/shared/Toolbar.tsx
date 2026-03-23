import { Monitor, Tablet, Smartphone, Sun, Moon, Trash2, Undo2, Redo2, Eye, Columns2, Code2, LayoutGrid } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'
import type { ViewMode, PreviewSize } from '../../types'

interface Props { dark: boolean }

const VIEW_MODES = [
  { mode: 'visual', icon: <Eye size={14} />,      label: 'Visual' },
  { mode: 'split',  icon: <Columns2 size={14} />, label: 'Split'  },
  { mode: 'code',   icon: <Code2 size={14} />,    label: 'Code'   },
] as const

const PREVIEW = [
  { size: 'mobile',  icon: <Smartphone size={15} /> },
  { size: 'tablet',  icon: <Tablet size={15} />     },
  { size: 'desktop', icon: <Monitor size={15} />    },
] as const

export default function Toolbar({ dark }: Props) {
  const viewMode     = useBuilderStore(s => s.viewMode)
  const setViewMode  = useBuilderStore(s => s.setViewMode)
  const previewSize  = useBuilderStore(s => s.previewSize)
  const setPreviewSize = useBuilderStore(s => s.setPreviewSize)
  const toggleDark   = useBuilderStore(s => s.toggleDark)
  const clearCanvas  = useBuilderStore(s => s.clearCanvas)
  const undo         = useBuilderStore(s => s.undo)
  const redo         = useBuilderStore(s => s.redo)
  const past         = useBuilderStore(s => s.past)
  const future       = useBuilderStore(s => s.future)

  const canUndo = past.length > 0
  const canRedo = future.length > 0

  const bg      = dark ? '#0F172A' : '#ffffff'
  const border  = dark ? '#1E293B' : '#F3F4F6'
  const textPri = dark ? '#F1F5F9' : '#111827'
  const textMut = dark ? '#64748B' : '#9CA3AF'

  const Btn = ({
    onClick,
    children,
    active,
    disabled,
    title,
  }: {
    onClick: () => void
    children: React.ReactNode
    active?:   boolean
    disabled?: boolean
    title?:    string
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        background:  active ? (dark ? '#1E293B' : '#EEF2FF') : 'none',
        border:      'none',
        padding:     6,
        borderRadius:6,
        cursor:      disabled ? 'not-allowed' : 'pointer',
        color:       active ? '#3B5BDB' : disabled ? (dark ? '#334155' : '#D1D5DB') : textMut,
        display:     'flex',
        alignItems:  'center',
        opacity:     disabled ? 0.5 : 1,
        transition:  'color 0.15s, opacity 0.15s',
      }}
    >
      {children}
    </button>
  )

  return (
    <header style={{
      height: 52, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 16px',
      borderBottom: `1px solid ${border}`, background: bg,
      flexShrink: 0,
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutGrid size={14} color="#3B5BDB" strokeWidth={2} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: textPri, letterSpacing: '-0.01em' }}>
            CodeCanvas
          </span>
        </a>

        <div style={{ width: 1, height: 20, background: border, margin: '0 4px' }} />

        <Btn onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">
          <Undo2 size={15} />
        </Btn>
        <Btn onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)">
          <Redo2 size={15} />
        </Btn>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: dark ? '#1E293B' : '#F3F4F6', borderRadius: 8, padding: 3 }}>
        {VIEW_MODES.map(({ mode, icon, label }) => {
          const active = viewMode === mode
          return (
            <button
              key={mode}
              onClick={() => setViewMode(mode as ViewMode)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', fontSize: 13,
                fontWeight: active ? 600 : 400,
                borderRadius: 6, border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                background: active ? (dark ? '#0F172A' : '#ffffff') : 'transparent',
                color:      active ? textPri : textMut,
                boxShadow:  active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {icon} {label}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {PREVIEW.map(({ size, icon }) => (
          <Btn
            key={size}
            onClick={() => setPreviewSize(size as PreviewSize)}
            active={previewSize === size}
            title={size}
          >
            {icon}
          </Btn>
        ))}

        <div style={{ width: 1, height: 20, background: border, margin: '0 4px' }} />

        <Btn onClick={toggleDark} title="Toggle dark mode">
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </Btn>
        <Btn onClick={clearCanvas} title="Clear canvas">
          <Trash2 size={15} />
        </Btn>
      </div>
    </header>
  )
}