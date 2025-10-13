import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SITE } from '../config/site'

export default function Hero() {
  const titleRef = useRef(null)
  const sloganRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    ).fromTo(
      sloganRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
  }, [])

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-amber-50 to-white">
      <h1
        ref={titleRef}
        className="text-5xl md:text-6xl font-extrabold text-amber-700 tracking-tight"
      >
        {SITE.name}
      </h1>
      <p
        ref={sloganRef}
        className="mt-4 text-xl italic text-gray-700"
      >
        {SITE.slogan}
      </p>
    </section>
  )
}
