import { Pokemon, PokemonListItem } from '@/types/Pokemon';

export const fetchPokemons = async (url: string): Promise<PokemonListItem> => {
  const response = await fetch(url);
  const { count, next, previous, results } = await response.json();
  return { count, next, previous, results } as PokemonListItem;
};

export const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    types: data.types.map((type: { type: { name: string } }) => type.type.name),
    image: data.sprites.front_default
    // images: [data.sprites.front_default, data.sprites.back_default, data.sprites.front_shiny, data.sprites.back_shiny]
  } as Pokemon;
};
