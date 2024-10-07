export interface Pokemon {
  id: number;
  name: string;
  url: string;
  types: string[];
  image: string;
  isEncountered?: boolean;
  isCaught?: boolean;
}

export interface PokemonListItem {
  count: number;
  next: string;
  previous: string;
  results: Pick<Pokemon, 'name' | 'url'>[];
}
