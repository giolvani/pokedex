export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: PokemonStats[];
  images: string[];
  mainImage: string;
  description: string;
  isEncountered?: boolean;
  isCaught?: boolean;
}

export interface PokemonStats {
  name: string;
  value: number;
}

export class PokemonEntity implements Pokemon {
  id!: number;
  name!: string;
  url!: string;
  types!: string[];
  height!: number;
  weight!: number;
  abilities!: string[];
  stats!: PokemonStats[];
  images!: string[];
  mainImage: string;
  description!: string;
  isEncountered?: boolean | undefined;
  isCaught?: boolean | undefined;

  constructor(pokemon: Pokemon) {
    Object.assign(this, pokemon);
    this.mainImage = this.images[0];
  }
}
