import { useEffect, useState } from 'react'

export default function Recipes({ navigate }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Rețete — Veni Vidi Edi'
  }, [])

  const [modalOpen, setModalOpen] = useState(false)
  const [activeRecipe, setActiveRecipe] = useState(null)

  // Download the active recipe as a simple HTML file (printable)
  const downloadRecipe = (r) => {
    if (!r) return
    const titleSafe = r.title.replace(/[^a-z0-9_\-]/gi, '_')
    const now = new Date().toISOString().slice(0,19).replace(/[:T]/g, '-')
    const filename = `${titleSafe}-${now}.html`

    const ingredientsHtml = (r.ingredients || []).map(i => `<li>${i}</li>`).join('')
    const stepsHtml = (r.steps || []).map(s => `<li>${s}</li>`).join('')

    const doc = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${r.title} - Rețetă</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;margin:24px;color:#111}
    .badge{display:inline-block;padding:6px 10px;background:#EF9651;color:#fff;border-radius:999px;font-weight:600}
    h1{margin:8px 0 4px}
    ul,ol{margin:6px 0 18px 18px}
    .meta{color:#555;font-size:0.9rem}
    .container{max-width:720px;margin:0 auto}
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">Rețetă</div>
    <h1>${r.title}</h1>
    <div class="meta">Generată la: ${new Date().toLocaleString()}</div>
    <p style="margin-top:12px">${r.desc || ''}</p>

    <h3>Ingrediente</h3>
    <ul>${ingredientsHtml}</ul>

    <h3>Pași</h3>
    <ol>${stepsHtml}</ol>

    <hr />
    <p class="meta">Veni Vidi Edi — Dolce far niente</p>
  </div>
</body>
</html>`

    const blob = new Blob([doc], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }

  const books = [
    {
      id: 'r1',
      title: 'Aluat pentru pizza',
      desc: 'Rețete pentru aluat, tehnici de frământare și fermentare, plus secrete pentru o crustă crocantă.',
      ingredients: ['500g făină tip 00', '320ml apă rece', '10g sare', '2g drojdie uscată'],
      steps: [
        'Amestecă făina cu drojdia, adaugă apa treptat și frământă 8-10 minute.',
        'Lasă la dospit 24h la frigider pentru aromă (bulk fermentation).',
        'Împarte în bile, întinde subțire și coace la temperatură înaltă.'
      ]
    },
    {
      id: 'r2',
      title: 'Tiramisù',
      desc: 'Desert clasic cu pișcoturi, espresso și cremă de mascarpone — pași, variante și sfaturi pentru servire.',
      ingredients: ['250g mascarpone', '3 ouă proaspete', '100g zahăr', '200ml espresso', 'pișcoturi'],
      steps: [
        'Separă gălbenușurile de albușuri; bate gălbenușurile cu zahărul și încorporează mascarpone.',
        'Bate albușurile spumă și încorporează ușor în cremă.',
        'Înmoaie pișcoturile în espresso și montează straturi: pișcoturi + cremă. Răcește minim 4 ore.'
      ]
    },
    {
      id: 'r3',
      title: 'Spritz',
      desc: 'Ghid pentru Spritz: proporții Aperol/Prosecco, variații și sugestii de prezentare.',
      ingredients: ['90ml Prosecco', '60ml Aperol', '30ml apă minerală', 'felie de portocală'],
      steps: [
        'Umple un pahar cu gheață.',
        'Adaugă Aperol, Prosecco și un splash de apă minerală.',
        'Amestecă ușor și decorează cu felie de portocală.'
      ]
    }
  ]

  return (
    <div
      className="min-h-screen text-zinc-900 antialiased pb-24"
      style={{ background: 'linear-gradient(to right, #008c45 0%, transparent 3%, transparent 97%, #cd212a 100%), #EFEFEF' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center font-bold">VVE</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#EF9651] font-fleur">Veni Vidi Edi</h1>
              <div className="text-sm md:text-lg text-black italic">Rețete</div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-white border rounded shadow"
          >
            ← Întoarce-te Înapoi
          </button>
        </div>

        <p className="mb-6 text-gray-700">Bine ați venit în colecția noastră de cărți de bucate: faceți clic pe o carte de bucate pentru a-i vedea detaliile.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(b => (
            <article key={b.id} className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
              <div className="font-semibold text-lg">{b.title}</div>
              <div className="text-sm text-gray-600 mt-2">{b.desc}</div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => { setActiveRecipe(b); setModalOpen(true) }}
                  className="inline-block px-4 py-2 bg-amber-500 text-white rounded-md"
                  aria-label={`Apri ${b.title}`}
                >
                  Deschide
                </button>
              </div>
            </article>
          ))}
        </div>

        {modalOpen && activeRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} aria-hidden />

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="relative rounded-xl shadow-2xl w-11/12 max-w-2xl p-6"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><rect width='20' height='20' fill='%23EF9651'/><rect x='20' y='20' width='20' height='20' fill='%23EF9651'/></svg>")`,
                backgroundSize: '40px 40px',
                backgroundRepeat: 'repeat'
              }}
            >
              <div className="absolute -top-4 left-6 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-[#EF9651] shadow">Rețetă</div>

              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-[#EF9651]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h18v4H3zM6 7v13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <h3 id="modal-title" className="text-2xl font-bold">{activeRecipe.title}</h3>
                  </div>
                  <button onClick={() => setModalOpen(false)} className="text-zinc-600 p-2 rounded hover:bg-zinc-100">✕</button>
                </div>

                <p className="mt-3 text-sm text-gray-700">{activeRecipe.desc}</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold">Ingrediente</div>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                      {activeRecipe.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold">Pași</div>
                    <ol className="mt-2 list-decimal list-inside text-sm text-gray-700 space-y-2">
                      {activeRecipe.steps.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-600">Vrei să comanzi? Folosește butonul Comanda din pagina principală.</div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-white border rounded shadow">Închide</button>
                    <button onClick={() => downloadRecipe(activeRecipe)} className="px-4 py-2 bg-amber-500 text-white rounded">Salvează</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm py-4 border-t border-amber-100 z-40">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-black">
            <div>© {new Date().getFullYear()} Veni Vidi Edi — Dolce far niente</div>
            <div>Made with ❤️ in Romania</div>
          </div>
        </footer>
      </div>
    </div>
  )
}
