import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SITE } from '../config/site'

export default function Hero() {
  const title = useRef(null)

  useEffect(() => {
    gsap.fromTo(title.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
  }, [])

  return (
    <section style={{ height: '100vh', display: 'grid', placeContent: 'center', textAlign: 'center' }}>
      <h1 ref={title} style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--wine)' }}>
        {SITE.name}
      </h1>
      <p style={{ fontSize: '1.5rem' }}>{SITE.slogan}</p>
      <a href={`https://wa.me/${SITE.phone}`} className="btn">Ordina su WhatsApp</a>
    </section>
  )
}