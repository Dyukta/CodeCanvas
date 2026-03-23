import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MousePointerClick,
  Code2,
  Layers,
  Eye,
  SlidersHorizontal,
  Monitor,
  Smartphone,
  Tablet,
  LayoutGrid,
} from 'lucide-react'
import { useInView } from '../hooks/useInView'
import BuilderPreview from '../components/BuilderPreview'

const IC = '#4F6EF7'
const IS = 1.8

const FEATURES = [
  { Icon: () => <MousePointerClick size={22} color={IC} strokeWidth={IS} />, title: 'Drag & Drop', desc: 'Visually compose layouts by dragging components onto a live canvas.' },
  { Icon: () => <Code2 size={22} color={IC} strokeWidth={IS} />, title: 'Real-Time Code', desc: 'Watch clean React + Tailwind code generate as you build.' },
  { Icon: () => <Layers size={22} color={IC} strokeWidth={IS} />, title: 'Component Library', desc: 'Start with essential building blocks — containers, buttons, inputs, text.' },
  { Icon: () => <Eye size={22} color={IC} strokeWidth={IS} />, title: 'Live Preview', desc: 'Toggle between visual, code, and split views instantly.' },
  { Icon: () => <SlidersHorizontal size={22} color={IC} strokeWidth={IS} />, title: 'Property Editing', desc: 'Fine-tune styles, text, colors, and layout through a clean property panel.' },
  { Icon: () => <Monitor size={22} color={IC} strokeWidth={IS} />, title: 'Responsive Preview', desc: 'Preview your design across desktop, tablet, and mobile breakpoints.' },
]

const STEPS = [
  { n: '01', title: 'Pick a component', desc: 'Choose from the component library on the left panel.' },
  { n: '02', title: 'Drop it on canvas', desc: 'Place it on the visual canvas to start building your layout.' },
  { n: '03', title: 'Customize properties', desc: 'Edit text, colors, padding, and layout in the property panel.' },
  { n: '04', title: 'Copy the code', desc: 'Grab the generated React + Tailwind code and use it in your project.' },
]

const BUILT_FOR = [
  { Icon: () => <Monitor size={28} color={IC} strokeWidth={1.6} />, title: 'Rapid Prototyping', desc: 'Quickly mock up layouts before writing production code.' },
  { Icon: () => <Smartphone size={28} color={IC} strokeWidth={1.6} />, title: 'Learning React', desc: 'Understand component structure and Tailwind classes visually.' },
  { Icon: () => <Tablet size={28} color={IC} strokeWidth={1.6} />, title: 'Design Handoff', desc: 'Bridge the gap between design mockups and code implementation.' },
]

const sectionHeading = {
  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  color: '#0F172A',
  textAlign: 'center' as const,
  marginBottom: 10,
}

const sectionSub = {
  fontSize: 16,
  color: '#6B7280',
  textAlign: 'center' as const,
  marginBottom: 48,
}

export default function HomePage() {
  const navigate = useNavigate()

  const featRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const builtRef = useRef<HTMLDivElement>(null)

  const featIn = useInView(featRef)
  const stepsIn = useInView(stepsRef)
  const builtIn = useInView(builtRef)

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#ffffff', color: '#111827', overflowX: 'hidden' }}>
      <header style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutGrid size={15} color="#3B5BDB" />
            </div>
            <span style={{ fontWeight: 600, fontSize: 15 }}>CodeCanvas</span>
          </a>

          <button onClick={() => navigate('/builder')}>
            Open Builder →
          </button>
        </div>
      </header>

      <section style={{ padding: '72px 28px 64px', textAlign: 'center' }}>
        <h1>Build interfaces. See the code.</h1>

        <button onClick={() => navigate('/builder')}>
          Start Building →
        </button>

        <div style={{ maxWidth: 860, margin: '56px auto 0' }}>
          <BuilderPreview />
        </div>
      </section>

      <section id="features" style={{ background: '#F9FAFB', padding: '80px 28px' }}>
        <div ref={featRef} style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={sectionHeading}>Everything you need</h2>
          <p style={sectionSub}>Simple tools, powerful output.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ opacity: featIn ? 1 : 0.6 }}>
                <f.Icon />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 28px' }}>
        <div ref={stepsRef} style={{ maxWidth: 740, margin: '0 auto' }}>
          <h2 style={sectionHeading}>How it works</h2>

          {STEPS.map((s) => (
            <div key={s.n} style={{ opacity: stepsIn ? 1 : 0.6 }}>
              <div>{s.n}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 28px' }}>
        <div ref={builtRef} style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={sectionHeading}>Built for</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {BUILT_FOR.map((b) => (
              <div key={b.title} style={{ opacity: builtIn ? 1 : 0.6 }}>
                <b.Icon />
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}