import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import VeniVidiEdi from './components/VeniVidiEdi'
import Recipes from './components/Recipes'
import './styles/main.css'


export default function App() {
  const appRef = useRef(null)
  const [route, setRoute] = useState(window.location.pathname || '/')

  useEffect(() => {
    try {
      gsap.fromTo(
        appRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
    } catch (e) {
      if (appRef.current) appRef.current.style.opacity = '1'
      console.warn('GSAP animation failed, falling back to visible state', e)
    }

    const onPop = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to)
      setRoute(to)
    }
  }

  return (
    <div ref={appRef}>
      {route === '/' && <VeniVidiEdi navigate={navigate} />}
      {route.startsWith('/recipes') && <Recipes navigate={navigate} />}
    </div>
  )
}
