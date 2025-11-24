
//Questa pagina e il contenuto della pagina html in se


import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { SITE } from '../config/site'
import aPortafolioImg from '../assets/img/a_portafolgio.png'
import ruotaImg from '../assets/img/ruota_di_carro.png'
import spritzImg from '../assets/img/spritz.png'
import tiramisuImg from '../assets/img/tiramisu.png'
import pizzaPImg from '../assets/img/pizzaP.jpg'
import stesuraImg from '../assets/img/stesura.png'

// Veni Vidi Edi - Single-file React component
// Tailwind CSS assumed in project

export default function VeniVidiEdi({ navigate }) {
  const heroRef = useRef(null)
  const menuRef = useRef(null)
  const aboutRef = useRef(null)
  const tlRef = useRef()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [drawerActive, setDrawerActive] = useState(false)

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

  // control drawer animation lifecycle when showMobileMenu toggles
  useEffect(() => {
    if (showMobileMenu) {
      setDrawerVisible(true)
      // activate next tick so transition can run
      const id = setTimeout(() => setDrawerActive(true), 20)
      return () => clearTimeout(id)
    }

    // hide: deactivate first then remove from DOM after transition
    setDrawerActive(false)
    const id = setTimeout(() => setDrawerVisible(false), 320)
    return () => clearTimeout(id)
  }, [showMobileMenu])

  // Sample menu data (replace with real data / API later)
  const menu = [
    {
      id: 1,
      name: 'Pizza a portafoglio',
      img: aPortafolioImg,
      desc: "Pizza napoletană clasică, pliată 'portofel', cu roșii, mozzarella și busuioc proaspăt.",
      price: 'RON 15'
    },
    {
      id: 2,
      name: 'Pizza a ruota di carro',
      img: ruotaImg,
      desc: 'Pizza tradițională napoletană, subțire și mare, cu margine pufoasă și ingrediente autentice.',
      price: 'RON 22'
    },
    {
      id: 3,
      name: 'Spritz',
      img: spritzImg,
      desc: 'Cocktail italian cu Aperol, prosecco și puțină apă minerală, servit cu o felie de portocală.',
      price: 'RON 17'
    },
    {
      id: 4,
      name: "Tiramisù",
      img: tiramisuImg,
      desc: 'Desert cremos cu pișcoturi, cafea espresso și cremă de mascarpone facut de noi.',
      price: 'RON 20'
    }
  ];

  // Locations - single location as requested
  const locations = [
    {
      id: 1,
      city: 'Budăi',
      address: 'E583 1-7, Budăi 707366, județ Iași',
      hours: '11:00 - 20:00'
    }
  ]

  // WhatsApp contact number (international format without +)
  const waNumber = '40750438655'

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

        <div className="hidden md:flex items-center gap-4 text-sm">
          <a href="#menu" className="inline-flex items-center justify-center w-28 px-4 py-2 bg-amber-500 text-white rounded-full shadow-sm hover:shadow-md transition">Menu</a>
          <a href="/recipes" onClick={(e) => { e.preventDefault(); navigate?.('/recipes') }} className="inline-flex items-center justify-center w-28 px-4 py-2 bg-amber-500 text-white rounded-full shadow-sm hover:shadow-md transition">Rețete</a>
          <a href="#about" className="inline-flex items-center justify-center w-28 px-4 py-2 bg-amber-500 text-white rounded-full shadow-sm hover:shadow-md transition">Cine suntem</a>
          <a href="#locations" className="inline-flex items-center justify-center w-32 px-4 py-2 bg-amber-500 text-white rounded-full shadow-sm hover:shadow-md transition">Locaţie</a>
          <a href="#contact" className="inline-flex items-center justify-center w-32 px-4 py-2 bg-amber-500 text-white rounded-full shadow-sm hover:shadow-md transition">Contactaţi-ne</a>
        </div>
      </nav>

      {/* Mobile menu (small screens) */}
      {/* Sliding drawer for mobile menu */}
      {drawerVisible && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setShowMobileMenu(false)}
            aria-hidden
          />

          <aside
            className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white via-amber-50 to-white z-50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${drawerActive ? 'translate-x-0' : 'translate-x-full'}`}
            role="dialog"
            aria-modal="true"
          >
            {/* Header minimalista */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-white shadow-md">VVE</div>
                <div>
                  <div className="font-bold text-lg text-[#EF9651]">Meniu</div>
                  <div className="text-xs text-zinc-400">Navigare rapidă</div>
                </div>
              </div>

              <button aria-label="Chiudi menu" className="p-2 rounded-full text-zinc-400 hover:bg-amber-100 hover:text-amber-700 transition" onClick={() => setShowMobileMenu(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Spacer per spingere i pulsanti verso il basso */}
            <div className="flex-1" />

            {/* Navigation buttons - posizionati più in basso per essere raggiungibili col pollice */}
            <nav className="px-6 pb-8 space-y-4">
              <a href="#menu" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"> 
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /></svg>
                <span className="font-semibold text-lg">Menu</span>
              </a>

              <a href="/recipes" onClick={(e) => { e.preventDefault(); setShowMobileMenu(false); navigate?.('/recipes') }} className="flex items-center gap-4 px-5 py-4 bg-white text-zinc-900 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all border border-amber-100">
                <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                <span className="font-semibold">Rețete</span>
              </a>

              <a href="#about" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-4 px-5 py-4 bg-white text-zinc-900 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all border border-amber-100">
                <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l9 4.5v9L12 22 3 15.5v-9L12 2z" /></svg>
                <span className="font-semibold">Cine suntem</span>
              </a>

              <a href="#locations" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-4 px-5 py-4 bg-white text-zinc-900 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all border border-amber-100">
                <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z" /></svg>
                <span className="font-semibold">Locație</span>
              </a>

              <a href="#contact" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-4 px-5 py-4 bg-white text-zinc-900 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all border border-amber-100">
                <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 8V7a2 2 0 00-2-2h-3" /></svg>
                <span className="font-semibold">Contact</span>
              </a>
            </nav>

            {/* Footer social - più compatto */}
            <div className="px-6 pb-6 pt-4 border-t border-amber-100/50">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-zinc-400 font-medium">Urmați-ne</div>
                <div className="flex items-center gap-2">
                  <a href="https://www.instagram.com/_veni_vidi_edi_/" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md hover:shadow-lg transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://wa.me/40750438655" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-md hover:shadow-lg transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}



      {/* HERO */}
      <header ref={heroRef} className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="stagger text-4xl md:text-5xl font-extrabold leading-tight text-zinc-900">Timpul unei cafele, gustul unei pauze</h1>
          <p className="stagger mt-4 text-xl text-zinc-900 ">Din inima Italiei pe străzile României. Fiecare rețetă spune o poveste de acasă, de timp și de gust adevărat.</p>

          <div className="stagger mt-6 flex gap-3">
            <a href="#menu" className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-lg shadow">Descoperiți meniul</a>
            <a href="#locations" className="inline-block px-6 py-3 border border-amber-300 rounded-lg text-amber-700">Unde suntem</a>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-zinc-900">
            <div className="stagger">
              <div className="font-semibold">Ingrediente</div>
              <div>Selectate în Italia</div>
            </div>
            <div className="stagger">
              <div className="font-semibold">Rețete</div>
              <div>Tradiție artizanală</div>
            </div>
            <div className="stagger">
              <div className="font-semibold">Făcut manual</div>
              <div>În fiecare zi</div>
            </div>
            <div className="stagger">
              <div className="font-semibold">Sustenabilitate</div>
              <div>Cu atenție</div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg">
          {/* Visuale mockup del food truck */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <div className="p-6">
              <img src={pizzaPImg} alt="Veni Vidi Edi food truck" className="w-full h-56 object-cover rounded-md" />
              <div className="mt-4">
                <div className="font-semibold text-lg">Pizza zilei</div>
                <div className="text-sm text-black mt-2">Vino și încearcă pizza zilei, gata în doar 90 de secunde.</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MENU */}
      <section id="menu" ref={menuRef} className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-[#EF9651]">Meniu - aromă italiană</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menu.map(item => (
            <article key={item.id} className="card bg-white rounded-xl p-4 shadow hover:shadow-md transition">
              <div className="h-36 rounded-md overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-36 object-cover" />
              </div>
              <h3 className="mt-3 font-semibold">{item.name}</h3>
              
              <p className="mt-1 text-sm text-black">{item.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-medium text-[#EF9651]">{item.price}</div>
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Bună, vă rog să pregătiți ${item.name} pentru ora XX:XX.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Comandă ${item.name} via WhatsApp`}
                  className="px-3 py-1 border rounded-full text-sm border-[#EF9651] text-[#EF9651] hover:bg-[#EF9651] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#EF9651]/30"
                >
                  Comanda
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>



      {/* ABOUT */}
      <section id="about" ref={aboutRef} className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#EF9651]">Cine suntem</h2>

            <p className="mt-4 text-black">
              Veni Vidi Edi este o realitate nouă, născută din pasiunea mea pentru bucătăria italiană 
              și din dorința de a aduce, pas cu pas, adevăratele arome ale Italiei aici în România.
            </p>

            <p className="mt-4 text-black">
              Am început cu cel mai iconic preparat: pizza, făcută cu ingrediente autentice și atent selectate.
            </p>

            <p className="mt-4 text-black">
              Diferența mea stă în <strong>transparență</strong>: folosesc produse clare, de calitate și ușor de recunoscut, 
              iar rețetele — actuale și viitoare — vor fi întotdeauna publice, pentru că cred că împărtășirea face mâncarea și mai adevărată.
            </p>

            <p className="mt-4 text-black">
              Colaborez și cu brandul <strong>Cafenescu</strong>, care împărtășește aceeași misiune: să ofere gustul Italiei, dar într-o ceașcă. 
              Împreună lucrăm pentru a crea o experiență simplă, autentică și 100% italiană.
            </p>

            <p className="mt-4 italic text-black">
              Promisiunea mea: <em>nu mă judeca după succese, ci după eșecuri — puține, pentru că în fiecare zi învăț, mă perfecționez și cresc.</em>
            </p>

            <ul className="mt-4 text-sm text-black space-y-2">
              <li>👨‍🍳 Bucătari italieni cu experiență</li>
              <li>🧀 Brânzeturi și mezeluri importate</li>
              <li>🌿 Ingrediente proaspete și de sezon</li>
            </ul>

            <div className="mt-6">
              <a href="#contact" className="inline-block px-5 py-3 bg-white border rounded shadow">Lucrează cu noi</a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow p-6">
              <img src={stesuraImg} alt="chef" className="w-full h-60 object-cover rounded-md" />
              <div className="mt-4">
                <div className="font-semibold">Abordarea noastră</div>
                <div className="text-sm text-black mt-2">Un amestec de tehnică italiană și căldură locală. Mai mult decât mâncare: o experiență.</div>
              </div>
            </div>

            {/* Small 'Dove trovarci' card moved here */}
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="font-semibold">Unde să ne găsești</div>
              <div className="text-sm text-black mt-2">{locations[0].city} — {locations[0].address}</div>
              <div className="text-sm mt-1">Orari: {locations[0].hours}</div>
              <a href={`https://www.google.com/maps/search/${encodeURIComponent(locations[0].address)}`} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline">Apri in Google Maps</a>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-[#EF9651]">Hartă</h2>
        {/* Location cards moved into the About column; keep map below */}

        <div className="mt-8 bg-white rounded-lg overflow-hidden shadow">
          {/* Map centered on the single location */}
          <iframe
            title="mappa"
            src={
              SITE?.mapEmbed ||
              `https://www.google.com/maps?q=${encodeURIComponent(locations[0].address)}&output=embed`
            }
            className="w-full h-72 border-0"
          />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-[#EF9651]">Contactați-ne</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form className="bg-white rounded-xl p-6 shadow space-y-4">
            <input className="w-full p-3 border rounded" placeholder="Nume" />
            <input className="w-full p-3 border rounded" placeholder="Email" />
            <textarea className="w-full p-3 border rounded" placeholder="Mesaj" rows={4} />
            <div className="flex items-center gap-3">
              <button type="button" className="px-5 py-3 bg-amber-500 text-white rounded">Trimite</button>
              <div className="text-sm text-black">Vom răspunde în cel mai scurt timp.</div>
            </div>
          </form>

          <div className="bg-white rounded-xl p-6 shadow">
            <div className="font-semibold">Informații rapide</div>
            <div className="mt-2 text-sm text-black">Telefon: +40 750 438 655</div>
            <div className="mt-1 text-sm text-black">Email: hello@venividiedi.ro</div>

              <div className="mt-4">
                <div className="font-semibold">Rețele sociale</div>
                <div className="mt-2 flex gap-3 items-center">
                  <a href="https://www.instagram.com/_veni_vidi_edi_/" target="_blank" rel="noreferrer" className="text-sm underline text-[#C13584]">Instagram</a>
                  <a href="#" target="_blank" rel="noreferrer" className="text-sm underline text-[#1877F2]">Facebook</a>
                  <a
                    href="https://wa.me/40750438655"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Apri chat WhatsApp"
                    className="text-sm underline text-emerald-600"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 py-6">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-black">
          <div>© {new Date().getFullYear()} Veni Vidi Edi — Dolce far niente</div>
          <div>Made with ❤️ in Romania</div>
        </div>
      </footer>
    </div>
  )
}
