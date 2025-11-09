import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import VeniVidiEdi from './components/VeniVidiEdi'
import './styles/main.css'


export default function App() {
  const appRef = useRef(null)

  useEffect(() => {
    try {
      gsap.fromTo(
        appRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out' }
      )
      console.log('GSAP animation completed')
    } catch (e) {
      // If GSAP fails for any reason, ensure the app is visible
      if (appRef.current) appRef.current.style.opacity = '1'
      console.warn('GSAP animation failed, falling back to visible state', e)
    }
  }, [])

  return (
    <div ref={appRef}>
      <VeniVidiEdi />
    </div>
  )
}
