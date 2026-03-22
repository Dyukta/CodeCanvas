import { useBuilderStore } from '../../store/useBuilderStore'
import ComponentPanel from '../builder/ComponentPanel'
import Canvas from '../canvas/Canvas'
import CodePanel from '../codegen/CodePanel'
import PropertyPanel from '../panels/PropertyPanel'

interface Props { dark: boolean }

export default function PanelLayout({ dark }: Props) {
  const { viewMode } = useBuilderStore()

  const border = dark ? '#1E293B' : '#F3F4F6'
  const bg = dark ? '#0F172A' : '#ffffff'
  const textMut = dark ? '#64748B' : '#9CA3AF'

  const showCanvas = viewMode !== 'code'
  const showCode = viewMode !== 'visual'

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      {/* LEFT */}
      <ComponentPanel dark={dark} />

      {/* CENTER */}
      {showCanvas && (
        <div style={{ flex: 1, display: 'flex', minWidth: 0 }}>
          <Canvas dark={dark} />
        </div>
      )}

      {/* RIGHT */}
      {showCode && (
        <div
          style={{
            width: viewMode === 'code' ? '100%' : 340,
            borderLeft: `1px solid ${border}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <CodePanel />
          </div>

          {viewMode === 'split' && (
            <div
              style={{
                height: 300,
                borderTop: `1px solid ${border}`,
                background: bg,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ padding: '10px 16px', borderBottom: `1px solid ${border}` }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: textMut }}>
                  Properties
                </span>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }}>
                <PropertyPanel dark={dark} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* VISUAL MODE ONLY */}
      {viewMode === 'visual' && (
        <div
          style={{
            width: 260,
            borderLeft: `1px solid ${border}`,
            background: bg,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ padding: '10px 16px', borderBottom: `1px solid ${border}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: textMut }}>
              Properties
            </span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <PropertyPanel dark={dark} />
          </div>
        </div>
      )}

    </div>
  )
}