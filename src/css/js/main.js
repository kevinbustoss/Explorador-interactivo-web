import { fetchCharacters, fetchEpisodes } from './api.js';
import { renderCards, renderModal } from './ui.js';
import { getFavorites, toggleFavorite } from './storage.js';

const state = {
  currentTab: 'characters', 
  page: 1,
  name: '',
  status: '',
  totalPages: 1
};

const cardsContainer = document.getElementById('cards-container');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const searchInput = document.getElementById('search-input');
const statusFilter = document.getElementById('status-filter');
const searchBtn = document.getElementById('search-btn');
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');
const pageIndicator = document.getElementById('page-indicator');
const sectionTitle = document.getElementById('section-title');

const navCharacters = document.getElementById('nav-characters');
const navEpisodes = document.getElementById('nav-episodes');
const navFavorites = document.getElementById('nav-favorites');

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

async function loadData() {
  loadingState.classList.remove('hidden');
  errorState.classList.add('hidden');
  cardsContainer.innerHTML = '';

  try {
    if (state.currentTab === 'favorites') {
      const favs = getFavorites();
      loadingState.classList.add('hidden');
      sectionTitle.textContent = 'ESPECÍMENES FAVORITOS';
      if (favs.length === 0) {
        errorState.textContent = 'No tienes personajes favoritos guardados en el multiverso.';
        errorState.classList.remove('hidden');
      } else {
        renderCards(favs, cardsContainer, handleFavoriteClick, handleCardClick, 'characters');
      }
      pageIndicator.textContent = 'Favoritos';
      prevPageBtn.disabled = true;
      nextPageBtn.disabled = true;
      return;
    }

    if (state.currentTab === 'episodes') {
      sectionTitle.textContent = 'EPISODIOS DEL MULTIVERSO';
      const data = await fetchEpisodes({ page: state.page });
      loadingState.classList.add('hidden');
      state.totalPages = data.info.pages || 1;
      renderCards(data.results, cardsContainer, null, null, 'episodes');
      updatePagination();
      return;
    }

    sectionTitle.textContent = 'RESULTADOS DE ESPECÍMENES';
    const data = await fetchCharacters({
      page: state.page,
      name: state.name,
      status: state.status
    });

    loadingState.classList.add('hidden');
    state.totalPages = data.info.pages || 1;

    if (!data.results || data.results.length === 0) {
      errorState.textContent = 'No se encontraron entidades con esos parámetros.';
      errorState.classList.remove('hidden');
    } else {
      renderCards(data.results, cardsContainer, handleFavoriteClick, handleCardClick, 'characters');
    }

    updatePagination();
  } catch (error) {
    loadingState.classList.add('hidden');
    errorState.classList.remove('hidden');
  }
}

function handleFavoriteClick(character) {
  toggleFavorite(character);
  loadData();
}

function handleCardClick(character) {
  renderModal(character, modalContent, closeModal);
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function updatePagination() {
  pageIndicator.textContent = `Página ${state.page} de ${state.totalPages}`;
  prevPageBtn.disabled = state.page <= 1;
  nextPageBtn.disabled = state.page >= state.totalPages;
}

// Eventos de Pestañas
navCharacters.addEventListener('click', () => {
  state.currentTab = 'characters';
  state.page = 1;
  setActiveNav(navCharacters);
  loadData();
});

navEpisodes.addEventListener('click', () => {
  state.currentTab = 'episodes';
  state.page = 1;
  setActiveNav(navEpisodes);
  loadData();
});

navFavorites.addEventListener('click', () => {
  state.currentTab = 'favorites';
  setActiveNav(navFavorites);
  loadData();
});

function setActiveNav(activeBtn) {
  [navCharacters, navEpisodes, navFavorites].forEach(btn => {
    btn.className = 'text-space-accent/70 hover:text-space-neon pb-1 transition';
  });
  activeBtn.className = 'text-space-neon border-b-2 border-space-neon pb-1 transition font-semibold';
}

searchBtn.addEventListener('click', () => {
  state.name = searchInput.value.trim();
  state.status = statusFilter.value;
  state.page = 1;
  loadData();
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    state.name = searchInput.value.trim();
    state.status = statusFilter.value;
    state.page = 1;
    loadData();
  }
});

prevPageBtn.addEventListener('click', () => {
  if (state.page > 1) {
    state.page--;
    loadData();
  }
});

nextPageBtn.addEventListener('click', () => {
  if (state.page < state.totalPages) {
    state.page++;
    loadData();
  }
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

loadData();