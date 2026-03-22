interface Props { code: string }

function highlight(raw: string): string {
  const esc = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return esc
    .replace(/(".*?")/g, '<span style="color:#34D399">$1</span>')
    .replace(/\b(export|default|function|return|const|let)\b/g, '<span style="color:#93C5FD">$1</span>')
    .replace(/(className)/g, '<span style="color:#A78BFA">$1</span>')
    .replace(/(&lt;\/?)([\w]+)/g, '<span style="color:#64748B">$1</span><span style="color:#F87171">$2</span>')
    .replace(/(\/\*.*?\*\/)/g, '<span style="color:#475569;font-style:italic">$1</span>')
}

export default function CodeBlock({ code }: Props) {
  return (
    <pre
      style={{
        margin: 0,
        padding: 16,
        fontFamily: '"Fira Code", monospace',
        fontSize: 12.5,
        lineHeight: 1.8,
        color: '#E2E8F0',
        overflow: 'auto',
        whiteSpace: 'pre',
      }}
      dangerouslySetInnerHTML={{ __html: highlight(code) }}
    />
  )
}