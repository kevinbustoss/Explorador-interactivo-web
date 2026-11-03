const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharacters({ page = 1, name = '', status = '' } = {}) {
  const params = new URLSearchParams();
  if (page) params.append('page', page);
  if (name) params.append('name', name);
  if (status) params.append('status', status);

  const response = await fetch(`${BASE_URL}/character/?${params.toString()}`);
  if (response.status === 404) return { results: [], info: { pages: 0 } };
  return await response.json();
}

export async function fetchEpisodes({ page = 1 } = {}) {
  const response = await fetch(`${BASE_URL}/episode?page=${page}`);
  if (!response.ok) return { results: [], info: { pages: 0 } };
  return await response.json();
}