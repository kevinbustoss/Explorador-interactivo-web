import { isFavorite } from './storage.js';

export function renderCards(items, container, onFavoriteClick, onCardClick, type = 'characters') {
  container.innerHTML = '';
  
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'bg-space-card border border-space-border/30 rounded-xl overflow-hidden hover:border-space-neon/60 transition duration-300 shadow-md flex flex-col group cursor-pointer';

    if (type === 'characters') {
      const isFav = isFavorite(item.id);
      const statusColor = item.status === 'Alive' ? 'bg-green-500' : item.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500';

      card.innerHTML = `
        <div class="relative overflow-hidden w-full h-52 bg-space-dark">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy">
          <button data-id="${item.id}" class="fav-btn absolute top-2 right-2 bg-space-dark/80 hover:bg-space-dark border border-space-neon text-xl w-9 h-9 rounded-full flex items-center justify-center transition shadow-neon-glow">
            ${isFav ? '★' : '☆'}
          </button>
        </div>
        <div class="p-4 flex flex-col flex-grow justify-between gap-2">
          <div>
            <h3 class="font-bold text-lg text-white group-hover:text-space-neon transition line-clamp-1">${item.name}</h3>
            <div class="flex items-center gap-2 mt-1 text-xs">
              <span class="w-2 h-2 rounded-full ${statusColor}"></span>
              <span class="capitalize text-space-accent">${item.status} - ${item.species}</span>
            </div>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (!e.target.closest('.fav-btn')) onCardClick(item);
      });

      const favBtn = card.querySelector('.fav-btn');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onFavoriteClick(item);
      });
    } else {
      
      card.innerHTML = `
        <div class="p-6 flex flex-col gap-3 justify-between h-full bg-space-card/80">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-space-portal bg-space-portal/10 px-2 py-1 rounded border border-space-portal/30">${item.episode}</span>
            <span class="text-xs text-space-accent/60">${item.air_date}</span>
          </div>
          <h3 class="text-base font-bold text-white group-hover:text-space-neon transition">${item.name}</h3>
        </div>
      `;
    }

    container.appendChild(card);
  });
}

export function renderModal(char, container, onCloseClick) {
  const statusColor = char.status === 'Alive' ? 'bg-green-500' : char.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500';
  
  container.innerHTML = `
    <div class="relative w-full h-56 bg-space-dark">
      <img src="${char.image}" alt="${char.name}" class="w-full h-full object-cover">
    </div>
    <div class="p-6 flex flex-col gap-4">
      <div>
        <h2 class="text-2xl font-bold text-white">${char.name}</h2>
        <div class="flex items-center gap-2 mt-1 text-sm">
          <span class="w-2.5 h-2.5 rounded-full ${statusColor}"></span>
          <span class="capitalize text-space-accent">${char.status} - ${char.species}</span>
        </div>
      </div>
      
      <div class="w-full text-left bg-space-dark/80 p-4 rounded-xl border border-space-border/30 text-sm space-y-2">
        <p class="flex justify-between"><strong class="text-space-neon">Género:</strong> <span class="text-white">${char.gender}</span></p>
        <p class="flex justify-between"><strong class="text-space-neon">Origen:</strong> <span class="text-white truncate max-w-[200px]">${char.origin.name}</span></p>
        <p class="flex justify-between"><strong class="text-space-neon">Ubicación:</strong> <span class="text-white truncate max-w-[200px]">${char.location.name}</span></p>
        <p class="flex justify-between"><strong class="text-space-neon">Episodios:</strong> <span class="text-white">${char.episode.length}</span></p>
      </div>

      <button id="modal-close-btn" class="w-full mt-2 bg-space-dark hover:bg-space-border/20 border border-space-neon text-space-neon font-medium py-2.5 rounded-xl transition text-sm shadow-neon-glow">
        Cerrar
      </button>
    </div>
  `;

  const closeBtn = container.querySelector('#modal-close-btn');
  closeBtn.addEventListener('click', onCloseClick);
}
