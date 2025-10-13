const specials = [
  { name: "Pizza Margherita", price: "€8", descr: "Pomodoro San Marzano, mozzarella fior di latte, basilico fresco" },
  { name: "Arancini Siciliani", price: "€4", descr: "Riso con ragù, piselli e panatura croccante" },
  { name: "Cannolo Siciliano", price: "€3", descr: "Cialda croccante, ricotta di pecora, gocce di cioccolato" },
  { name: "Espresso", price: "€2", descr: "Caffè italiano autentico, aroma intenso" }
];

export default function Menu() {
  return (
    <section className="menu-section" id="menu">
      <h2>I nostri classici</h2>
      <ul className="menu-list">
        {specials.map((item, idx) => (
          <li key={idx} className="menu-item">
            <div>
              <span className="menu-name">{item.name}</span>
              <span className="menu-price">{item.price}</span>
            </div>
            <p className="menu-descr">{item.descr}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
