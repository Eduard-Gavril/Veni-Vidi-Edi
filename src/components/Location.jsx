import { SITE } from '../config/site';

export default function Location() {
  return (
    <section style={{ padding: '4rem 2rem' }}>
      <h2>Dove trovarci</h2>
      <p>{SITE.location.city} – {SITE.location.schedule}</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.123456789!2d23.6!3d46.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQ2JzEyLjAiTiAyM8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sro!4v1234567890"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      />
    </section>
  );
}