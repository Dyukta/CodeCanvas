export default function BuilderPreview() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 860,
        margin: '0 auto',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow:
          '0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08)',
        border: '1px solid #E5E7EB',
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}preview.svg`}
        alt="CodeCanvas builder preview"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}