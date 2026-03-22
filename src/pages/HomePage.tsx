import React, { useRef } from 'react'
import {MousePointerClick,Code2,Layers,Eye,SlidersHorizontal,Monitor,Smartphone,Tablet,Settings2,LayoutGrid,} from 'lucide-react'
import { useInView } from '../hooks/useInView'
import BuilderPreview from '../components/BuilderPreview'


const IC = '#4F6EF7'
const IS = 1.8

type IconFC = React.FC

interface FeatureItem  { Icon: IconFC; title: string; desc: string }
interface StepItem     { n: string;    title: string; desc: string }
interface BuiltForItem { Icon: IconFC; title: string; desc: string }

const FEATURES: FeatureItem[] = [
  { Icon: () => <MousePointerClick size={22} color={IC} strokeWidth={IS} />, title: 'Drag & Drop',        desc: 'Visually compose layouts by dragging components onto a live canvas.'          },
  { Icon: () => <Code2             size={22} color={IC} strokeWidth={IS} />, title: 'Real-Time Code',     desc: 'Watch clean React + Tailwind code generate as you build.'                    },
  { Icon: () => <Layers            size={22} color={IC} strokeWidth={IS} />, title: 'Component Library',  desc: 'Start with essential building blocks — containers, buttons, inputs, text.'   },
  { Icon: () => <Eye               size={22} color={IC} strokeWidth={IS} />, title: 'Live Preview',       desc: 'Toggle between visual, code, and split views instantly.'                     },
  { Icon: () => <SlidersHorizontal size={22} color={IC} strokeWidth={IS} />, title: 'Property Editing',   desc: 'Fine-tune styles, text, colors, and layout through a clean property panel.' },
  { Icon: () => <Monitor           size={22} color={IC} strokeWidth={IS} />, title: 'Responsive Preview', desc: 'Preview your design across desktop, tablet, and mobile breakpoints.'         },
]

const STEPS: StepItem[] = [
  { n: '01', title: 'Pick a component',     desc: 'Choose from the component library on the left panel.'               },
  { n: '02', title: 'Drop it on canvas',    desc: 'Place it on the visual canvas to start building your layout.'       },
  { n: '03', title: 'Customize properties', desc: 'Edit text, colors, padding, and layout in the property panel.'     },
  { n: '04', title: 'Copy the code',        desc: 'Grab the generated React + Tailwind code and use it in your project.' },
]

const BUILT_FOR: BuiltForItem[] = [
  { Icon: () => <Monitor    size={28} color={IC} strokeWidth={1.6} />, title: 'Rapid Prototyping', desc: 'Quickly mock up layouts before writing production code.'        },
  { Icon: () => <Smartphone size={28} color={IC} strokeWidth={1.6} />, title: 'Learning React',    desc: 'Understand component structure and Tailwind classes visually.'  },
  { Icon: () => <Tablet     size={28} color={IC} strokeWidth={1.6} />, title: 'Design Handoff',    desc: 'Bridge the gap between design mockups and code implementation.' },
]

const sectionHeading: React.CSSProperties = {
  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  color: '#0F172A',
  textAlign: 'center',
  marginBottom: 10,
}

const sectionSub: React.CSSProperties = {
  fontSize: 16,
  color: '#6B7280',
  textAlign: 'center',
  marginBottom: 48,
}

export default function HomePage() {
  const featRef  = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const builtRef = useRef<HTMLDivElement>(null)

  const featIn  = useInView(featRef)
  const stepsIn = useInView(stepsRef)
  const builtIn = useInView(builtRef)

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#ffffff', color: '#111827', overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a0 { animation: fadeUp 0.55s ease 0.00s both; }
        .a1 { animation: fadeUp 0.55s ease 0.12s both; }
        .a2 { animation: fadeUp 0.55s ease 0.22s both; }
        .a3 { animation: fadeUp 0.55s ease 0.32s both; }
        .a4 { animation: fadeUp 0.55s ease 0.44s both; }

    
        .fc {
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 28px 24px 24px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s ease;
        }
        .fc.in    { opacity: 1; transform: translateY(0); }
        .fc:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }

   
        .sc {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 22px 24px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .sc.in { opacity: 1; transform: translateY(0); }

        .bc {
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 44px 28px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s ease;
        }
        .bc.in    { opacity: 1; transform: translateY(0); }
        .bc:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }

    
        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 13px 28px; font-size: 15px; font-weight: 500;
          font-family: 'Inter', sans-serif;
          color: #ffffff; background: #3B5BDB;
          border: none; border-radius: 8px; cursor: pointer;
          text-decoration: none; white-space: nowrap;
          transition: background 0.15s, transform 0.15s;
        }
        .btn-primary:hover { background: #3451C7; transform: translateY(-1px); }

        .btn-ghost {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 13px 24px; font-size: 15px; font-weight: 500;
          font-family: 'Inter', sans-serif;
          color: #374151; background: #F9FAFB;
          border: 1px solid #E5E7EB; border-radius: 8px;
          cursor: pointer; text-decoration: none; white-space: nowrap;
          transition: background 0.15s;
        }
        .btn-ghost:hover { background: #F3F4F6; }

        .btn-nav {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 8px 18px; font-size: 14px; font-weight: 500;
          font-family: 'Inter', sans-serif;
          color: #ffffff; background: #3B5BDB;
          border: none; border-radius: 8px; cursor: pointer;
          text-decoration: none; white-space: nowrap;
          transition: background 0.15s;
        }
        .btn-nav:hover { background: #3451C7; }

        @media (max-width: 900px) {
          .feat-grid  { grid-template-columns: 1fr 1fr !important; }
          .built-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .feat-grid  { grid-template-columns: 1fr !important; }
          .built-grid { grid-template-columns: 1fr !important; }
          .hero-btns  { flex-direction: column !important; align-items: center !important; }
        }
      `}</style>

      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#ffffff', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutGrid size={15} color="#3B5BDB" strokeWidth={2} />
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, color: '#111827', letterSpacing: '-0.01em' }}>
              CodeCanvas
            </span>
          </a>

       <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <a href="/builder" className="btn-nav">Open Builder  → </a>
      </div>
        </div>
      </header>

    
      <section style={{ padding: '72px 28px 64px', textAlign: 'center', background: '#ffffff' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>


          <div className="a0" style={{ marginBottom: 28, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#6B7280', border: '1px solid #E5E7EB', borderRadius: 20, padding: '5px 14px', background: '#ffffff' }}>
            <Settings2 size={13} strokeWidth={2} />
            Visual UI Builder for React &amp; Tailwind
          </div>

          <h1 className="a1" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 22 }}>
            <span style={{ color: '#0F172A', display: 'block' }}>Build interfaces.</span>
            <span style={{ color: '#3B5BDB', display: 'block' }}>See the code.</span>
          </h1>

          <p className="a2" style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px' }}>
            A minimal, developer focused tool to visually compose React layouts
            and instantly get clean Tailwind CSS code.
          </p>

          <div className="a3 hero-btns" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/builder" className="btn-primary">Start Building →</a>
            <a href="#features" className="btn-ghost">Learn More</a>
          </div>
        </div>

        <div className="a4" style={{ maxWidth: 860, margin: '56px auto 0' }}>
          <BuilderPreview />
        </div>
      </section>

    
      <section id="features" style={{ background: '#F9FAFB', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6', padding: '80px 28px' }}>
        <div ref={featRef} style={{ maxWidth: 1100, margin: '0 auto' }}>

          <h2 style={sectionHeading}>Everything you need to build visually</h2>
          <p style={sectionSub}>Simple tools, powerful output.</p>

          <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`fc${featIn ? ' in' : ''}`}
                style={{ transitionDelay: featIn ? `${i * 0.07}s` : '0s' }}
              >
                <div style={{ marginBottom: 16 }}><f.Icon /></div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section style={{ background: '#ffffff', borderBottom: '1px solid #F3F4F6', padding: '80px 28px' }}>
        <div ref={stepsRef} style={{ maxWidth: 740, margin: '0 auto' }}>

          <h2 style={sectionHeading}>How it works</h2>
          <p style={sectionSub}>Four steps to go from idea to code.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`sc${stepsIn ? ' in' : ''}`}
                style={{ transitionDelay: stepsIn ? `${i * 0.09}s` : '0s' }}
              >
                <span style={{ fontSize: 22, fontWeight: 700, color: '#9dc3fb', minWidth: 40, lineHeight: 1.3, paddingTop: 2, fontFamily: 'monospace', flexShrink: 0 }}>
                  {s.n}
                </span>
                <div>
                  <h3 style={{ fontSize: 15.5, fontWeight: 600, color: '#111827', marginBottom: 5 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section style={{ background: '#ffffff', padding: '80px 28px' }}>
        <div ref={builtRef} style={{ maxWidth: 1100, margin: '0 auto' }}>

          <h2 style={{ ...sectionHeading, marginBottom: 48 }}>Built for</h2>

          <div className="built-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {BUILT_FOR.map((b, i) => (
              <div
                key={b.title}
                className={`bc${builtIn ? ' in' : ''}`}
                style={{ transitionDelay: builtIn ? `${i * 0.1}s` : '0s' }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 14, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <b.Icon />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 8 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, maxWidth: 240 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  
      <footer style={{ borderTop: '1px solid #F3F4F6', background: '#ffffff', padding: '20px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutGrid size={13} color="#3B5BDB" strokeWidth={2} />
            </div>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>CodeCanvas</span>
          </a>
          <p style={{ fontSize: 13.5, color: '#9CA3AF' }}>Built for developers who learn by building.</p>
        </div>
      </footer>

    </div>
  )
}
