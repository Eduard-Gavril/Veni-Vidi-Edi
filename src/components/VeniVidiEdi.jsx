import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { SITE } from '../config/site'

// Veni Vidi Edi - Single-file React component
// Tailwind CSS assumed in project

export default function VeniVidiEdi() {
  const heroRef = useRef(null)
  const menuRef = useRef(null)
  const aboutRef = useRef(null)
  const tlRef = useRef()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    // Simple entrance animation using GSAP
    tlRef.current = gsap.timeline()
    tlRef.current
      .from(heroRef.current.querySelectorAll('.stagger'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
      .from(menuRef.current.querySelectorAll('.card'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out'
      }, '-=0.4')
  }, [])

  // Sample menu data (replace with real data / API later)
  const menu = [
    { id: 1, name: 'Arancini classici', desc: 'Riso, ragù, piselli, parmigiano', price: 'RON 18' },
    { id: 2, name: 'Panino al prosciutto', desc: 'Pane artigianale, prosciutto crudo, rucola', price: 'RON 24' },
    { id: 3, name: 'Gelato alla stracciatella', desc: 'Gelato artigianale, cioccolato fondente', price: 'RON 14' },
    { id: 4, name: 'Focaccia ligure', desc: 'Olio extravergine, rosmarino', price: 'RON 12' }
  ]

  // Locations - example for Romania (replace coordinates with real ones)
  const locations = [
    { id: 1, city: 'Iași', address: 'Piața Unirii 3, Iași', hours: '11:00 - 20:00' },
    { id: 2, city: 'București', address: 'Calea Victoriei 45, București', hours: '12:00 - 22:00' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-gray-900 antialiased">
      {/* NAV */}
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center font-bold">VVE</div>
          <div>
            <h1 className="text-5xl font-extrabold text-terracotta">Veni Vidi Edi</h1>
<p className="text-xl text-crema italic">Dolce far niente</p>
          </div>
        </div>
        {/* mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label="Apri menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
            onClick={() => setShowMobileMenu(v => !v)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#menu" className="hover:underline">Menu</a>
          <a href="#about" className="hover:underline">Chi siamo</a>
          <a href="#locations" className="hover:underline">Località</a>
          <a href="#contact" className="hover:underline">Contatti</a>
        </div>
      </nav>

      {/* Mobile menu (small screens) */}
      {showMobileMenu && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-white shadow-sm">
          <a href="#menu" onClick={() => setShowMobileMenu(false)} className="block py-2 text-gray-800 font-medium">Menu</a>
          <a href="#about" onClick={() => setShowMobileMenu(false)} className="block py-2 text-gray-800 font-medium">Chi siamo</a>
          <a href="#locations" onClick={() => setShowMobileMenu(false)} className="block py-2 text-gray-800 font-medium">Località</a>
          <a href="#contact" onClick={() => setShowMobileMenu(false)} className="block py-2 text-gray-800 font-medium">Contatti</a>
        </div>
      )}

      {/* HERO */}
      <header ref={heroRef} className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="stagger text-4xl md:text-5xl font-extrabold leading-tight">Veni Vidi Edi</h1>
          <p className="stagger mt-4 text-xl text-gray-700">Dolce far niente — portiamo il vero sapore italiano nelle strade della Romania.</p>

          <div className="stagger mt-6 flex gap-3">
            <a href="#menu" className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-lg shadow">Scopri il Menu</a>
            <a href="#locations" className="inline-block px-6 py-3 border border-amber-300 rounded-lg text-amber-700">Dove siamo</a>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="stagger">
              <div className="font-semibold">Ingredienti</div>
              <div>Selezionati in Italia</div>
            </div>
            <div className="stagger">
              <div className="font-semibold">Ricette</div>
              <div>Tradizione artigianale</div>
            </div>
            <div className="stagger">
              <div className="font-semibold">Fatto a mano</div>
              <div>Ogni giorno</div>
            </div>
            <div className="stagger">
              <div className="font-semibold">Sostenibilità</div>
              <div>Con attenzione</div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg">
          {/* Visuale mockup del food truck */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <div className="p-6">
              <img src="/assets/foodtruck-hero.jpg" alt="Veni Vidi Edi food truck" className="w-full h-56 object-cover" />
              <div className="mt-4">
                <div className="font-semibold text-lg">Menu del giorno</div>
                <div className="text-sm text-gray-600 mt-2">Piatti italiani preparati al momento — vieni a provarli.</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MENU */}
      <section id="menu" ref={menuRef} className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Menu — assaggia l'Italia</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menu.map(item => (
            <article key={item.id} className="card bg-white rounded-xl p-4 shadow hover:shadow-md transition">
              <div className="h-36 bg-amber-50 rounded-md flex items-center justify-center text-2xl font-semibold">{item.name.split(' ')[0]}</div>
              <h3 className="mt-3 font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-medium">{item.price}</div>
                <button className="px-3 py-1 border rounded text-sm">Ordina</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef} className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold">Chi siamo</h2>
            <p className="mt-4 text-gray-700">Veni Vidi Edi nasce dall'amore per la cucina italiana e dalla voglia di condividere momenti lenti e gustosi. Siamo un food truck che gira per le città della Romania portando ricette tradizionali reinterpretate con ingredienti selezionati.</p>

            <ul className="mt-4 text-sm text-gray-600 space-y-2">
              <li>👨‍🍳 Cuochi italiani con esperienza</li>
              <li>🧀 Formaggi e salumi importati</li>
              <li>🌿 Ingredienti freschi e stagionali</li>
            </ul>

            <div className="mt-6">
              <a href="#contact" className="inline-block px-5 py-3 bg-white border rounded shadow">Lavora con noi</a>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow p-6">
              <img src="/assets/chef.jpg" alt="chef" className="w-full h-60 object-cover rounded-md" />
              <div className="mt-4">
                <div className="font-semibold">Il nostro approccio</div>
                <div className="text-sm text-gray-600 mt-2">Un mix di tecnica italiana e calore locale. Più che cibo: esperienza.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Dove trovarci</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {locations.map(loc => (
            <div key={loc.id} className="bg-white rounded-xl p-4 shadow flex flex-col">
              <div className="font-semibold">{loc.city}</div>
              <div className="text-sm text-gray-600">{loc.address}</div>
              <div className="mt-2 text-sm">Orari: {loc.hours}</div>
              <a href={`https://www.google.com/maps/search/${encodeURIComponent(loc.address)}`} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm underline">Apri in Maps</a>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg overflow-hidden shadow">
          <iframe title="mappa" src={SITE?.mapEmbed || 'https://www.google.com/maps/embed?pb='} className="w-full h-72 border-0" />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Contattaci</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form className="bg-white rounded-xl p-6 shadow space-y-4">
            <input className="w-full p-3 border rounded" placeholder="Nome" />
            <input className="w-full p-3 border rounded" placeholder="Email" />
            <textarea className="w-full p-3 border rounded" placeholder="Messaggio" rows={4} />
            <div className="flex items-center gap-3">
              <button type="button" className="px-5 py-3 bg-amber-500 text-white rounded">Invia</button>
              <div className="text-sm text-gray-500">Risponderemo al più presto.</div>
            </div>
          </form>

          <div className="bg-white rounded-xl p-6 shadow">
            <div className="font-semibold">Info rapida</div>
            <div className="mt-2 text-sm text-gray-600">Telefono: +40 7xx xxx xxx</div>
            <div className="mt-1 text-sm text-gray-600">Email: hello@venividiedi.ro</div>

            <div className="mt-4">
              <div className="font-semibold">Social</div>
              <div className="mt-2 flex gap-3">
                <a href="#" className="text-sm underline">Instagram</a>
                <a href="#" className="text-sm underline">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <div>© {new Date().getFullYear()} Veni Vidi Edi — Dolce far niente</div>
          <div>Made with ❤️ in Romania</div>
        </div>
      </footer>
    </div>
  )
}
