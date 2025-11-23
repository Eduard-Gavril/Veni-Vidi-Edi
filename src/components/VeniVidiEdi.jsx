
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
            className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white to-amber-50 z-50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${drawerActive ? 'translate-x-0' : 'translate-x-full'}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 flex items-center justify-between border-b border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700">VVE</div>
                <div>
                  <div className="font-semibold">Meniu</div>
                  <div className="text-xs text-zinc-500">Explorați selecția noastră</div>
                </div>
              </div>

              <button aria-label="Chiudi menu" className="p-2 rounded-md text-zinc-900 hover:bg-zinc-100" onClick={() => setShowMobileMenu(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <nav className="p-4 space-y-3">
              <a href="#menu" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 bg-amber-500 text-white rounded-full shadow-sm hover:scale-[1.02] transition"> 
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3" strokeWidth="2" /></svg>
                <span className="flex-1 text-center">Menu</span>
              </a>

              <a href="/recipes" onClick={(e) => { e.preventDefault(); setShowMobileMenu(false); navigate?.('/recipes') }} className="flex items-center gap-3 px-4 py-3 bg-white text-zinc-900 rounded-lg shadow-sm hover:shadow-md transition">
                <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" /></svg>
                <span className="flex-1">Rețete</span>
              </a>

              <a href="#about" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 bg-white text-zinc-900 rounded-lg shadow-sm hover:shadow-md transition">
                <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l9 4.5v9L12 22 3 15.5v-9L12 2z" strokeWidth="1.5" /></svg>
                <span className="flex-1">Cine suntem</span>
              </a>

              <a href="#locations" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 bg-white text-zinc-900 rounded-lg shadow-sm hover:shadow-md transition">
                <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z" strokeWidth="1.5" /></svg>
                <span className="flex-1">Unde să ne găsești</span>
              </a>

              <a href="#contact" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 bg-white text-zinc-900 rounded-lg shadow-sm hover:shadow-md transition">
                <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 8V7a2 2 0 00-2-2h-3" strokeWidth="1.5" /></svg>
                <span className="flex-1">Contactați-ne</span>
              </a>
            </nav>

            <div className="mt-auto p-4 border-t border-amber-100">
              <div className="mb-3 text-sm">Urmați-ne</div>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/_veni_vidi_edi_/" target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-white shadow-sm text-[#C13584]">IG</a>
                <a href="#" className="px-3 py-2 rounded-md bg-white shadow-sm text-[#1877F2]">FB</a>
                <a href="https://wa.me/40750438655" target="_blank" rel="noreferrer" className="ml-auto px-4 py-2 bg-emerald-600 text-white rounded-full shadow">WhatsApp</a>
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
