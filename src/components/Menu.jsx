import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const menu = [
  { name: 'Carbonara Trap', desc: 'Uovo, guanciale, pecorino, pepe nero' },
  { name: 'Bruschetta al pomodoro', desc: 'Pane abbrustolito, pomodoro, basilico' },
  { name: 'Tiramisù in barattolo', desc: 'Mascarpone, caffè, cacao amaro' },
];

export default function Menu() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current.children, { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, scrollTrigger: { trigger: ref.current } });
  }, []);

  return (
    <section style={{ padding: '4rem 2rem', backgroundColor: '#fff' }}>
      <h2>Menu</h2>
      <div ref={ref}>
        {menu.map((item, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}