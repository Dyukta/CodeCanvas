import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {MousePointerClick, Code2, Layers, Eye,SlidersHorizontal, Monitor, Smartphone,Tablet, LayoutGrid} from 'lucide-react'
import { useInView } from '../hooks/useInView'
import BuilderPreview from '../components/BuilderPreview'


const IC = '#4F6EF7'
const IS = 1.8

const FEATURES = [
  { Icon: () => <MousePointerClick size={22} color={IC} strokeWidth={IS} />, title: 'Drag & Drop',        desc: 'Visually compose layouts by dragging components onto a live canvas.'          },
  { Icon: () => <Code2             size={22} color={IC} strokeWidth={IS} />, title: 'Real-Time Code',     desc: 'Watch clean React + Tailwind code generate as you build.'                    },
  { Icon: () => <Layers            size={22} color={IC} strokeWidth={IS} />, title: 'Component Library',  desc: 'Start with essential building blocks — containers, buttons, inputs, text.'   },
  { Icon: () => <Eye               size={22} color={IC} strokeWidth={IS} />, title: 'Live Preview',       desc: 'Toggle between visual, code, and split views instantly.'                     },
  { Icon: () => <SlidersHorizontal size={22} color={IC} strokeWidth={IS} />, title: 'Property Editing',   desc: 'Fine-tune styles, text, colors, and layout through a clean property panel.' },
  { Icon: () => <Monitor           size={22} color={IC} strokeWidth={IS} />, title: 'Responsive Preview', desc: 'Preview your design across desktop, tablet, and mobile breakpoints.'         },
]

const STEPS = [
  { n: '01', title: 'Pick a component',     desc: 'Choose from the component library on the left panel.'               },
  { n: '02', title: 'Drop it on canvas',    desc: 'Place it on the visual canvas to start building your layout.'       },
  { n: '03', title: 'Customize properties', desc: 'Edit text, colors, padding, and layout in the property panel.'     },
  { n: '04', title: 'Copy the code',        desc: 'Grab the generated React + Tailwind code and use it in your project.' },
]

const BUILT_FOR = [
  { Icon: () => <Monitor    size={28} color={IC} strokeWidth={1.6} />, title: 'Rapid Prototyping', desc: 'Quickly mock up layouts before writing production code.'        },
  { Icon: () => <Smartphone size={28} color={IC} strokeWidth={1.6} />, title: 'Learning React',    desc: 'Understand component structure and Tailwind classes visually.'  },
  { Icon: () => <Tablet     size={28} color={IC} strokeWidth={1.6} />, title: 'Design Handoff',    desc: 'Bridge the gap between design mockups and code implementation.' },
]


export default function HomePage() {
  const navigate = useNavigate()

  const featRef  = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const builtRef = useRef<HTMLDivElement>(null)

  const featIn  = useInView(featRef)
  const stepsIn = useInView(stepsRef)
  const builtIn = useInView(builtRef)

  const sectionHeading: React.CSSProperties = {
    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    fontWeight: 700, letterSpacing: '-0.03em',
    color: '#0F172A', textAlign: 'center', marginBottom: 10,
  }
  const sectionSub: React.CSSProperties = {
    fontSize: 16, color: '#6B7280',
    textAlign: 'center', marginBottom: 48,
  }
  const cardBase: React.CSSProperties = {
    background: '#ffffff', border: '1px solid #E5E7EB',
    borderRadius: 12, padding: '28px 24px 24px',
    transition: 'box-shadow 0.2s',
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#ffffff', color: '#111827', overflowX: 'hidden' }}>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a0 { animation: fadeUp 0.55s ease 0.00s both; }
        .a1 { animation: fadeUp 0.55s ease 0.12s both; }
        .a2 { animation: fadeUp 0.55s ease 0.22s both; }
        .a3 { animation: fadeUp 0.55s ease 0.32s both; }
        .a4 { animation: fadeUp 0.55s ease 0.44s both; }

        .fc { opacity: 0; transform: translateY(12px); transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s; }
        .fc.in { opacity: 1; transform: translateY(0); }
        .fc:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07) !important; }

        .sc { opacity: 0; transform: translateY(10px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .sc.in { opacity: 1; transform: translateY(0); }

        .bc { opacity: 0; transform: translateY(12px); transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s; }
        .bc.in { opacity: 1; transform: translateY(0); }
        .bc:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07) !important; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 11px 24px; font-size: 14px; font-weight: 500;
          color: #fff; background: #3B5BDB; border: none; border-radius: 8px;
          cursor: pointer; font-family: Inter, sans-serif;
          transition: background 0.15s, transform 0.15s;
        }
        .btn-primary:hover { background: #3451C7; transform: translateY(-1px); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 11px 20px; font-size: 14px; font-weight: 500;
          color: #374151; background: #F9FAFB;
          border: 1px solid #E5E7EB; border-radius: 8px;
          cursor: pointer; font-family: Inter, sans-serif;
          transition: background 0.15s;
        }
        .btn-ghost:hover { background: #F3F4F6; }

        .nav-btn {
          display: inline-flex; align-items: center;
          padding: 7px 16px; font-size: 13px; font-weight: 500;
          color: #fff; background: #3B5BDB; border: none; border-radius: 8px;
          cursor: pointer; font-family: Inter, sans-serif;
          transition: background 0.15s;
        }
        .nav-btn:hover { background: #3451C7; }

        @media (max-width: 900px) {
          .feat-grid  { grid-template-columns: 1fr 1fr !important; }
          .built-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .feat-grid  { grid-template-columns: 1fr !important; }
          .built-grid { grid-template-columns: 1fr !important; }
          .hero-btns  { flex-direction: column; align-items: center; }
        }
      `}</style>


      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutGrid size={15} color="#3B5BDB" strokeWidth={2} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#111827', letterSpacing: '-0.01em' }}>CodeCanvas</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="nav-btn" onClick={() => navigate('/builder')}>
              Open Builder
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: '80px 28px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

          {/* badge */}
          <div className="a0" style={{ marginBottom: 24 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280', border: '1px solid #E5E7EB', borderRadius: 20, padding: '4px 14px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B5BDB', display: 'inline-block' }} />
              Visual UI Builder for React &amp; Tailwind
            </span>
          </div>

          {/* headline */}
          <h1 className="a1" style={{ fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 20 }}>
            <span style={{ color: '#0F172A', display: 'block' }}>Build interfaces.</span>
            <span style={{ color: '#3B5BDB', display: 'block' }}>See the code.</span>
          </h1>

          {/* subtitle */}
          <p className="a2" style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 32px' }}>
            A minimal, developer-focused tool to visually compose React layouts
            and instantly get clean Tailwind CSS code.
          </p>

          {/* CTAs */}
          <div className="a3 hero-btns" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('/builder')}>
              Start Building →
            </button>
            <a href="#features" className="btn-ghost">
              Learn More
            </a>
          </div>
        </div>

        {/* builder preview */}
        <div className="a4" style={{ maxWidth: 860, margin: '52px auto 0' }}>
          <BuilderPreview />
        </div>
      </section>

      {/*FEATURES */}
      <section id="features" style={{ background: '#F9FAFB', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6', padding: '80px 28px' }}>
        <div ref={featRef} style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={sectionHeading}>Everything you need to build visually</h2>
          <p style={sectionSub}>Simple tools, powerful output.</p>

          <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`fc${featIn ? ' in' : ''}`}
                style={{ ...cardBase, transitionDelay: featIn ? `${i * 0.07}s` : '0s' }}
              >
                <div style={{ marginBottom: 14 }}><f.Icon /></div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 7 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 28px', borderBottom: '1px solid #F3F4F6' }}>
        <div ref={stepsRef} style={{ maxWidth: 740, margin: '0 auto' }}>
          <h2 style={sectionHeading}>How it works</h2>
          <p style={sectionSub}>Four steps to go from idea to code.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`sc${stepsIn ? ' in' : ''}`}
                style={{
                  transitionDelay: stepsIn ? `${i * 0.09}s` : '0s',
                  display: 'flex', alignItems: 'flex-start', gap: 20,
                  background: '#fff', border: '1px solid #E5E7EB',
                  borderRadius: 12, padding: '20px 24px',
                }}
              >
                <span style={{ fontSize: 22, fontWeight: 700, color: '#D1D5DB', minWidth: 40, lineHeight: 1.3, fontFamily: 'monospace', flexShrink: 0 }}>
                  {s.n}
                </span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 5 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR  */}
      <section style={{ padding: '80px 28px' }}>
        <div ref={builtRef} style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ ...sectionHeading, marginBottom: 48 }}>Built for</h2>

          <div className="built-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {BUILT_FOR.map((b, i) => (
              <div
                key={b.title}
                className={`bc${builtIn ? ' in' : ''}`}
                style={{
                  transitionDelay: builtIn ? `${i * 0.1}s` : '0s',
                  ...cardBase,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', padding: '40px 28px 32px',
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 14, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <b.Icon />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 8 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, margin: 0, maxWidth: 240 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER  */}
      <footer style={{ borderTop: '1px solid #F3F4F6', padding: '20px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutGrid size={13} color="#3B5BDB" strokeWidth={2} />
            </div>
            <span style={{ fontWeight: 600, fontSize: 13.5, color: '#111827' }}>CodeCanvas</span>
          </a>
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>Built for developers who learn by building.</p>
        </div>
      </footer>

    </div>
  )
}