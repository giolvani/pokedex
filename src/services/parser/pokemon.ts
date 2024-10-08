import { Pokemon, PokemonEntity } from '@/types/Pokemon';

export const pokemonParser = (pokemonData: any, description?: string): Pokemon => {
  const pokemon = {
    id: pokemonData.id,
    name: pokemonData.name,
    types: pokemonData.types.map((type: { type: { name: string } }) => type.type.name),
    height: pokemonData.height,
    weight: pokemonData.weight,
    images: [
      pokemonData.sprites.front_default,
      pokemonData.sprites.back_default,
      pokemonData.sprites.front_shiny,
      pokemonData.sprites.back_shiny
    ],
    mainImage: pokemonData.sprites.front_default,
    abilities: pokemonData.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
    description: description || '',
    stats: pokemonData.stats.map((stat: { base_stat: number; stat: { name: string } }) => ({
      name: stat.stat.name,
      value: stat.base_stat
    }))
  };

  return new PokemonEntity(pokemon);
};
