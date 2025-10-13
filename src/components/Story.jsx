import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Story() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
  }, []);

  return (
    <section ref={ref} style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>La nostra storia</h2>
      <p>
        Siamo partiti dall’Italia con un sogno: portare il gusto del <em>dolce far niente</em> in ogni angolo della Romania.
        Dal 2022, il nostro food truck gira le piazze di Cluj, raccontando storie di sapori semplici ma autentici.
      </p>
    </section>
  );
}