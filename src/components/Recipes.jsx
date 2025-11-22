import { useEffect } from 'react'

export default function Recipes({ navigate }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Rețete — Veni Vidi Edi'
  }, [])

  const books = [
    { id: 'r1', title: 'Ricette Pizza', desc: 'Impasti, condimenti e trucchi per una pizza perfetta.' },
    { id: 'r2', title: 'Dolci Italiani', desc: 'Tiramisù, cannoli e altre bontà della tradizione.' },
    { id: 'r3', title: 'Antipasti e Contorni', desc: 'Stuzzichini e contorni facili e veloci.' },
    { id: 'r4', title: 'Pasta e Sugo', desc: 'Salse classiche e moderne per ogni tipo di pasta.' }
  ]

  return (
    <div className="min-h-screen bg-[#F7F7F8] text-zinc-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#EF9651]">Rețete</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-white border rounded shadow"
          >
            ← Torna alla home
          </button>
        </div>

        <p className="mb-6 text-gray-700">Benvenuti nella nostra raccolta di ricettari: clicca su un ricettario per visualizzarne i dettagli.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(b => (
            <article key={b.id} className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
              <div className="font-semibold text-lg">{b.title}</div>
              <div className="text-sm text-gray-600 mt-2">{b.desc}</div>
              <div className="mt-4 flex items-center gap-3">
                <a href={`#recipe-${b.id}`} className="inline-block px-4 py-2 bg-amber-500 text-white rounded-md">Apri</a>
                <button className="px-3 py-1 border rounded text-sm" onClick={() => alert('Anteprima ricetta non disponibile in questa demo')}>Anteprima</button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-sm text-gray-600">Se vuoi, posso aggiungere pagine dettagliate per ogni ricettario o permettere il download in PDF. Vuoi che proceda?</div>
      </div>
    </div>
  )
}
