import { SITE } from '../config/site';

export default function Contact() {
  return (
    <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h2>Contattaci</h2>
      <p>Instagram: <a href={SITE.socials.instagram}>@venividiedi</a></p>
      <p>Facebook: <a href={SITE.socials.facebook}>Veni Vidi Edi</a></p>
    </section>
  );
}