import React, { useRef } from 'react'
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
  Settings2,
  LayoutGrid,
} from 'lucide-react'

import { useInView } from '../hooks/useInView'
import BuilderPreview from '../components/BuilderPreview'

const IC = '#4F6EF7'
const IS = 1.8

type IconFC = React.FC

interface FeatureItem {
  Icon: IconFC
  title: string
  desc: string
}

interface StepItem {
  n: string
  title: string
  desc: string
}

interface BuiltForItem {
  Icon: IconFC
  title: string
  desc: string
}

const FEATURES: FeatureItem[] = [
  { Icon: () => <MousePointerClick size={22} color={IC} strokeWidth={IS} />, title: 'Drag & Drop', desc: 'Visually compose layouts by dragging components.' },
  { Icon: () => <Code2 size={22} color={IC} strokeWidth={IS} />, title: 'Real-Time Code', desc: 'Live React + Tailwind output.' },
  { Icon: () => <Layers size={22} color={IC} strokeWidth={IS} />, title: 'Component Library', desc: 'Prebuilt UI blocks.' },
  { Icon: () => <Eye size={22} color={IC} strokeWidth={IS} />, title: 'Live Preview', desc: 'Instant visual feedback.' },
  { Icon: () => <SlidersHorizontal size={22} color={IC} strokeWidth={IS} />, title: 'Property Editing', desc: 'Fine-tune styles easily.' },
  { Icon: () => <Monitor size={22} color={IC} strokeWidth={IS} />, title: 'Responsive Preview', desc: 'Desktop/tablet/mobile views.' },
]

const STEPS: StepItem[] = [
  { n: '01', title: 'Pick component', desc: 'Select from library.' },
  { n: '02', title: 'Drop on canvas', desc: 'Place visually.' },
  { n: '03', title: 'Customize', desc: 'Edit properties.' },
  { n: '04', title: 'Copy code', desc: 'Use in project.' },
]

const BUILT_FOR: BuiltForItem[] = [
  { Icon: () => <Monitor size={28} color={IC} />, title: 'Rapid Prototyping', desc: 'Build fast UI mockups.' },
  { Icon: () => <Smartphone size={28} color={IC} />, title: 'Learning React', desc: 'Understand components visually.' },
  { Icon: () => <Tablet size={28} color={IC} />, title: 'Design Handoff', desc: 'Bridge design and code.' },
]

export default function HomePage() {
  const navigate = useNavigate()

  const featRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const builtRef = useRef<HTMLDivElement>(null)

  const featActive = useInView(featRef)
  const stepsActive = useInView(stepsRef)
  const builtActive = useInView(builtRef)

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LayoutGrid size={16} />
          <span>CodeCanvas</span>
        </div>

        <button onClick={() => navigate('/builder')}>
          Open Builder →
        </button>
      </header>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: 60 }}>
        <div>
          <Settings2 size={14} /> Visual Builder
        </div>

        <h1>Build interfaces. See code.</h1>

        <button onClick={() => navigate('/builder')}>
          Start Building →
        </button>
      </section>

      {/* FEATURES */}
      <section ref={featRef}>
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={featActive ? 'in' : ''}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <f.Icon />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* STEPS */}
      <section ref={stepsRef}>
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className={stepsActive ? 'in' : ''}
            style={{ transitionDelay: `${i * 0.09}s` }}
          >
            <strong>{s.n}</strong>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </section>

      {/* BUILT FOR */}
      <section ref={builtRef}>
        {BUILT_FOR.map((b, i) => (
          <div
            key={b.title}
            className={builtActive ? 'in' : ''}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <b.Icon />
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </section>

      {/* PREVIEW */}
      <BuilderPreview />
    </div>
  )
}