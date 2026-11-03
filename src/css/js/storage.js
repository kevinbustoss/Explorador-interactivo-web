const FAVKEY = 'rick_morty_favs_v1';

export function getFavorites() {
  const data = localStorage.getItem(FAVKEY);
  return data ? JSON.parse(data) : [];
}

export function isFavorite(id) {
  const favs = getFavorites();
  return favs.some(fav => fav.id === id);
}

export function toggleFavorite(character) {
  let favs = getFavorites();
  const exists = favs.some(fav => fav.id === character.id);
  
  if (exists) {
    favs = favs.filter(fav => fav.id !== character.id);
  } else {
    favs.push(character);
  }
  
  localStorage.setItem(FAVKEY, JSON.stringify(favs));
  return !exists;
}