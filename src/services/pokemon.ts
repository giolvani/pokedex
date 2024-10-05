const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemons = async (limit: number = 100) => {
  const response = await fetch(`${API_URL}?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

export const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};
