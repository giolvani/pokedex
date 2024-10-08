import { PokemonPaginatedList } from '@/types/PokemonPaginatedList';

export const listParser = (data: any): PokemonPaginatedList => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results
  };
};
