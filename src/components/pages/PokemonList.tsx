'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PokemonCard from './partials/PokemonCard';

import { Loader2 } from 'lucide-react';
import { Pokemon } from '@/types/Pokemon';
import SearchBar from './partials/SearchBar';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const pokemonPerPage = 21;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
        const data = await response.json();
        const pokemonWithDetails = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }, index: number) => {
            const detailResponse = await fetch(pokemon.url);
            const detailData = await detailResponse.json();
            return {
              name: pokemon.name,
              url: pokemon.url,
              id: index + 1,
              types: detailData.types.map((type: { type: { name: string } }) => type.type.name)
            };
          })
        );
        setPokemons(pokemonWithDetails);
        setFilteredPokemon(pokemonWithDetails);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch Pokemon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemons.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) && (typeFilter === 'all' || p.types.includes(typeFilter))
    );
    setFilteredPokemon(filtered);
    setPage(1);
  }, [search, typeFilter, pokemons]);

  const types = Array.from(new Set(pokemons.flatMap((p) => p.types)));

  const paginatedPokemon = filteredPokemon.slice((page - 1) * pokemonPerPage, page * pokemonPerPage);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Pokémon List</h1>
      <SearchBar
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        types={types}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {paginatedPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)} disabled={page * pokemonPerPage >= filteredPokemon.length}>
          Next
        </Button>
      </div>
    </div>
  );
}
