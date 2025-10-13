import { SITE } from '../config/site'

export default function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <p>Seguici su <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></p>
      <p>Oppure scrivici su WhatsApp: <a href={`https://wa.me/${SITE.phone}`}>{SITE.phone}</a></p>
      <p>&copy; {new Date().getFullYear()} {SITE.name}</p>
    </footer>
  )
}
