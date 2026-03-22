import {
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon,
  Trash2,
  Undo2,
  Redo2,
  Eye,
  Columns2,
  Code2,
  LayoutGrid,
} from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'
import type { ViewMode, PreviewSize } from '../../types'

interface Props {
  dark: boolean
}

const VIEW_MODES = [
  { mode: 'visual', icon: <Eye size={14} />, label: 'Visual' },
  { mode: 'split', icon: <Columns2 size={14} />, label: 'Split' },
  { mode: 'code', icon: <Code2 size={14} />, label: 'Code' },
] as const

const PREVIEW = [
  { size: 'mobile', icon: <Smartphone size={15} /> },
  { size: 'tablet', icon: <Tablet size={15} /> },
  { size: 'desktop', icon: <Monitor size={15} /> },
] as const

export default function Toolbar({ dark }: Props) {
  const viewMode = useBuilderStore((s) => s.viewMode)
  const setViewMode = useBuilderStore((s) => s.setViewMode)
  const previewSize = useBuilderStore((s) => s.previewSize)
  const setPreviewSize = useBuilderStore((s) => s.setPreviewSize)
  const toggleDark = useBuilderStore((s) => s.toggleDark)
  const clearCanvas = useBuilderStore((s) => s.clearCanvas)

  const bg = dark ? '#0F172A' : '#ffffff'
  const border = dark ? '#1E293B' : '#F3F4F6'
  const textPri = dark ? '#F1F5F9' : '#111827'
  const textMut = dark ? '#64748B' : '#9CA3AF'

  const Btn = ({
    onClick,
    children,
    active,
  }: {
    onClick: () => void
    children: React.ReactNode
    active?: boolean
  }) => (
    <button
      onClick={onClick}
      style={{
        background: active ? (dark ? '#1E293B' : '#EEF2FF') : 'none',
        border: 'none',
        padding: 6,
        borderRadius: 6,
        cursor: 'pointer',
        color: active ? '#3B5BDB' : textMut,
      }}
    >
      {children}
    </button>
  )

  return (
    <header
      style={{
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: `1px solid ${border}`,
        background: bg,
      }}
    >
      {/* left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <LayoutGrid size={14} color="#3B5BDB" />
          <span style={{ fontWeight: 700, fontSize: 14, color: textPri }}>
            CodeCanvas
          </span>
        </div>

        <Btn onClick={() => {}}>
          <Undo2 size={15} />
        </Btn>
        <Btn onClick={() => {}}>
          <Redo2 size={15} />
        </Btn>
      </div>

      {/* center */}
      <div style={{ display: 'flex', gap: 4 }}>
        {VIEW_MODES.map(({ mode, icon }) => (
          <Btn
            key={mode}
            onClick={() => setViewMode(mode as ViewMode)}
            active={viewMode === mode}
          >
            {icon}
          </Btn>
        ))}
      </div>

      {/* right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {PREVIEW.map(({ size, icon }) => (
          <Btn
            key={size}
            onClick={() => setPreviewSize(size as PreviewSize)}
            active={previewSize === size}
          >
            {icon}
          </Btn>
        ))}

        <Btn onClick={toggleDark}>
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </Btn>

        <Btn onClick={clearCanvas}>
          <Trash2 size={15} />
        </Btn>
      </div>
    </header>
  )
}