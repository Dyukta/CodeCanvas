import { useState, useRef, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'
import { generateCode } from '../../utils/codeGenerator'
import CodeBlock from './CodeBlock'

export default function CodePanel() {
  const tree = useBuilderStore((s) => s.tree)
  const code = generateCode(tree)

  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      console.warn('Clipboard failed')
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0D1117',
        overflow: 'hidden',
      }}
    >

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: '1px solid #1E293B',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#475569',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Generated Code
        </span>

        <button
          onClick={copy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: copied ? '#34D399' : '#64748B',
            fontSize: 12,
            padding: '3px 6px',
            borderRadius: 5,
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied && 'Copied!'}
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <CodeBlock code={code} />
      </div>
    </div>
  )
}