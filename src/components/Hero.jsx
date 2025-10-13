import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SITE } from '../config/site'

export default function Hero() {
  const title = useRef(null)
  useEffect(() => {
    gsap.fromTo(title.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
  }, [])
  return (
    <section className="hero-italian">
      <h1 ref={title} className="hero-title">{SITE.name}</h1>
      <p className="hero-slogan">{SITE.slogan}</p>
      <a href={`https://wa.me/${SITE.phone}`} className="hero-btn" target="_blank" rel="noopener noreferrer">
        Ordina su WhatsApp
      </a>
      <div className="hero-flag"></div>
    </section>
  )
}
