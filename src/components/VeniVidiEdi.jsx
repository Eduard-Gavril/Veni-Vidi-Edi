
//Questa pagina e il contenuto della pagina html in se


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
    // Robust entrance animation using GSAP: guard refs and fallback to
    // force-visible state if animation fails.
    const run = () => {
      try {
        const heroNodes = heroRef.current?.querySelectorAll('.stagger') || []
        const cardNodes = menuRef.current?.querySelectorAll('.card') || []

        // start from a clean visible state
        heroNodes.forEach(n => (n.style.opacity = '1'))
        cardNodes.forEach(n => (n.style.opacity = '1'))

        tlRef.current = gsap.timeline()
        if (heroNodes.length) {
          tlRef.current.from(heroNodes, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
          })
        }

        if (cardNodes.length) {
          tlRef.current.from(cardNodes, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out'
          }, '-=0.4')
        }
      } catch (err) {
        // Ensure elements are visible if GSAP fails
        // eslint-disable-next-line no-console
        console.warn('GSAP animation error, forcing elements visible', err)
        try {
          const staggers = heroRef.current?.querySelectorAll('.stagger') || []
          const cards = menuRef.current?.querySelectorAll('.card') || []
          ;[...staggers, ...cards].forEach(el => {
            if (el && el.style) {
              el.style.opacity = '1'
              el.style.transform = ''
            }
          })
        } catch (e) {
          // ignore
        }
      }
    }

    run()
    // small retry in case elements mount slightly after
    const t = setTimeout(run, 250)
    return () => clearTimeout(t)
  }, [])

  // Sample menu data (replace with real data / API later)
  const menu = [
    {
      id: 1,
      name: 'Pizza a portafoglio',
      desc: 'Classica pizza napoletana piegata a portafoglio, con pomodoro, mozzarella e basilico fresco.',
      price: 'RON 15'
    },
    {
      id: 2,
      name: 'Pizza a ruota di carro',
      desc: 'Pizza tradizionale napoletana, sottile e grande, con bordo morbido e condimenti genuini.',
      price: 'RON 22'
    },
    {
      id: 3,
      name: 'Spritz',
      desc: 'Cocktail italiano con Aperol, prosecco e una spruzzata di soda, servito con fetta d’arancia.',
      price: 'RON 17'
    },
    {
      id: 4,
      name: "Tiramisù",
      desc: 'Dessert al cucchiaio con savoiardi, caffè espresso e crema al mascarpone.',
      price: 'RON 20'
    }
  ];

  // Locations - example for Romania (replace coordinates with real ones)
  const locations = [
    { id: 1, city: 'Iași', address: 'Piața Unirii 3, Iași', hours: '11:00 - 20:00' },
    { id: 2, city: 'București', address: 'Calea Victoriei 45, București', hours: '12:00 - 22:00' }
  ]

  return (
  <div 
    className="min-h-screen text-zinc-900 antialiased" 
    style={{ 
      background: 'linear-gradient(to right, #008c45 0%, transparent 3%, transparent 97%, #cd212a 100%), #EFEFEF' 
    }}
  >
  {/* NAV */}
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center font-bold">VVE</div>
          <div>
            <h1 className="text-5xl font-extrabold text-[#EF9651] font-fleur">
              Veni Vidi Edi
            </h1>
          <p className="text-xl text-black italic ">L'arte del dolce far niente</p>
          </div>
        </div>
        {/* mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label="Apri menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
            onClick={() => setShowMobileMenu(v => !v)}
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm text-zinc-900">
          <a href="#menu" className="inline-flex items-center justify-center w-32 px-4 py-2 bg-white/90 text-zinc-900 rounded-full shadow-sm hover:shadow-md transition">Menu</a>
          <a href="#about" className="inline-flex items-center justify-center w-32 px-4 py-2 bg-white/90 text-zinc-900 rounded-full shadow-sm hover:shadow-md transition">Chi siamo</a>
          <a href="#locations" className="inline-flex items-center justify-center w-32 px-4 py-2 bg-white/90 text-zinc-900 rounded-full shadow-sm hover:shadow-md transition">Località</a>
          <a href="#contact" className="inline-flex items-center justify-center w-32 px-4 py-2 bg-white/90 text-zinc-900 rounded-full shadow-sm hover:shadow-md transition">Contatti</a>
        </div>
      </nav>

      {/* Mobile menu (small screens) */}
      {showMobileMenu && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-sm">
          <a href="#menu" onClick={() => setShowMobileMenu(false)} className="block w-full text-center px-4 py-2 bg-white text-zinc-900 rounded-full shadow-sm">Menu</a>
          <a href="#about" onClick={() => setShowMobileMenu(false)} className="block w-full text-center px-4 py-2 bg-white text-zinc-900 rounded-full shadow-sm">Chi siamo</a>
          <a href="#locations" onClick={() => setShowMobileMenu(false)} className="block w-full text-center px-4 py-2 bg-white text-zinc-900 rounded-full shadow-sm">Località</a>
          <a href="#contact" onClick={() => setShowMobileMenu(false)} className="block w-full text-center px-4 py-2 bg-white text-zinc-900 rounded-full shadow-sm">Contatti</a>
        </div>
      )}

      {/* HERO */}
      <header ref={heroRef} className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="stagger text-4xl md:text-5xl font-extrabold leading-tight text-zinc-900">Il tempo di un caffè, il gusto di una pausa</h1>
          <p className="stagger mt-4 text-xl text-zinc-900 ">Dal cuore dell’Italia alle strade di Romania.
Ogni ricetta racconta una storia di casa, di tempo e di gusto vero.</p>

          <div className="stagger mt-6 flex gap-3">
            <a href="#menu" className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-lg shadow">Scopri il Menu</a>
            <a href="#locations" className="inline-block px-6 py-3 border border-amber-300 rounded-lg text-amber-700">Dove siamo</a>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-zinc-900">
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
              <img src="src\assets\img\pizzaP.jpg" alt="Veni Vidi Edi food truck" className="w-full h-56 object-cover" />
              <div className="mt-4">
                <div className="font-semibold text-lg">Menu del giorno</div>
                <div className="text-sm text-black mt-2">Piatti italiani preparati al momento — vieni a provarli.</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MENU */}
      <section id="menu" ref={menuRef} className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-[#EF9651]">Menu — assaggia l'Italia</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menu.map(item => (
            <article key={item.id} className="card bg-white rounded-xl p-4 shadow hover:shadow-md transition">
              <div className="h-36 bg-amber-50 rounded-md flex items-center justify-center text-2xl font-semibold">{item.name.split(' ')[0]}</div>
              <h3 className="mt-3 font-semibold">{item.name}</h3>
              
              <p className="mt-1 text-sm text-black">{item.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-medium text-[#EF9651]">{item.price}</div>
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
            <h2 className="text-2xl font-bold text-[#EF9651]">Chi siamo</h2>
            <p className="mt-4 text-black">Veni Vidi Edi nasce dall'amore per la cucina italiana e dalla voglia di condividere momenti lenti e gustosi. Siamo un food truck che gira per le città della Romania portando ricette tradizionali reinterpretate con ingredienti selezionati.</p>

            <ul className="mt-4 text-sm text-black space-y-2">
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
              <img src="src\assets\img\chef_hands.jpg" alt="chef" className="w-full h-60 object-cover rounded-md" />
              <div className="mt-4">
                <div className="font-semibold">Il nostro approccio</div>
                <div className="text-sm text-black mt-2">Un mix di tecnica italiana e calore locale. Più che cibo: esperienza.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-[#EF9651]">Dove trovarci</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {locations.map(loc => (
            <div key={loc.id} className="bg-white rounded-xl p-4 shadow flex flex-col">
              <div className="font-semibold">{loc.city}</div>
              <div className="text-sm text-black">{loc.address}</div>
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
        <h2 className="text-2xl font-bold mb-6 text-[#EF9651]">Contattaci</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form className="bg-white rounded-xl p-6 shadow space-y-4">
            <input className="w-full p-3 border rounded" placeholder="Nome" />
            <input className="w-full p-3 border rounded" placeholder="Email" />
            <textarea className="w-full p-3 border rounded" placeholder="Messaggio" rows={4} />
            <div className="flex items-center gap-3">
              <button type="button" className="px-5 py-3 bg-amber-500 text-white rounded">Invia</button>
              <div className="text-sm text-black">Risponderemo al più presto.</div>
            </div>
          </form>

          <div className="bg-white rounded-xl p-6 shadow">
            <div className="font-semibold">Info rapida</div>
            <div className="mt-2 text-sm text-black">Telefono: +40 750 438 655</div>
            <div className="mt-1 text-sm text-black">Email: hello@venividiedi.ro</div>

            <div className="mt-4">
              <div className="font-semibold">Social</div>
              <div className="mt-2 flex gap-3">
                <a href="https://www.instagram.com/_veni_vidi_edi_/" className="text-sm underline">Instagram</a>
                <a href="#" className="text-sm underline">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t mt-12 py-6">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-black">
          <div>© {new Date().getFullYear()} Veni Vidi Edi — Dolce far niente</div>
          <div>Made with ❤️ in Romania</div>
        </div>
      </footer>
    </div>
  )
}
