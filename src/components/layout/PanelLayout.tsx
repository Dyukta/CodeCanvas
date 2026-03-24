import { useBuilderStore } from '../../store/useBuilderStore'
import ComponentPanel from '../builder/ComponentPanel'
import Canvas         from '../canvas/Canvas'
import CodePanel      from '../codegen/CodePanel'
import PropertyPanel  from '../panels/PropertyPanel'

interface Props { dark: boolean }

export default function PanelLayout({ dark }: Props) {
  const { viewMode } = useBuilderStore()

  const border  = dark ? '#1E293B' : '#F3F4F6'
  const bg      = dark ? '#0F172A' : '#ffffff'
  const textMut = dark ? '#64748B' : '#9CA3AF'

  const showCanvas = viewMode !== 'code'
  const showCode   = viewMode !== 'visual'

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      <ComponentPanel dark={dark} />

      {showCanvas && (
        <div style={{ flex: 1, display: 'flex', minWidth: 0, overflow: 'hidden' }}>
          <Canvas dark={dark} />
        </div>
      )}

      {showCode && (
        <div style={{
          width:       viewMode === 'code' ? 'calc(100% - 220px - 260px)' : 340,
          borderLeft:  `1px solid ${border}`,
          display:     'flex',
          flexDirection: 'column',
          overflow:    'hidden',
          flexShrink:  0,
        }}>
          <CodePanel />
        </div>
      )}


      <div style={{
        width:       260,
        flexShrink:  0,
        borderLeft:  `1px solid ${border}`,
        background:  bg,
        display:     'flex',
        flexDirection: 'column',
        overflow:    'hidden',
      }}>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: textMut, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Properties
          </span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <PropertyPanel dark={dark} />
        </div>
      </div>

    </div>
  )
}