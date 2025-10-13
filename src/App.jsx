import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import VeniVidiEdi from './components/VeniVidiEdi'
import './styles/main.css'

export default function App() {
  const appRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      appRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
  }, [])

  return (
    <div ref={appRef} style={{ opacity: 0 }}>
      <VeniVidiEdi />
    </div>
  )
}
