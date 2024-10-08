import { Pokemon } from './Pokemon';

export interface PokemonPaginatedList {
  count: number;
  next: string;
  previous: string;
  results: (Pick<Pokemon, 'name'> & { url: string })[];
}
