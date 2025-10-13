fetch('data.json')
  .then(r=>r.json())
  .then(items=>{
    const grid=document.getElementById('menu-grid');
    items.forEach(p=>{
      const card=document.createElement('div');
      card.className='card';
      card.innerHTML=`
        <div class="card-inner">
          <div class="front">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="price">${p.price} lei</div>
          </div>
          <div class="back">
            <p>🍕</p>
            <p>Ordina su WhatsApp e ricevi in 10 min</p>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  });

// chiudi loader quando l'immagine hero è pronta
const img=document.getElementById('hero-img');
img.decode().then(()=>document.getElementById('loader').remove());