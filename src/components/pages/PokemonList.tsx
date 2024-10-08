'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PokemonCard from './partials/PokemonCard';
import { Loader2 } from 'lucide-react';
import { Pokemon, PokemonListItem } from '@/types/Pokemon';
import SearchBar from './partials/SearchBar';
import { fetchPokemons, fetchPokemonDetails } from '@/services/pokemon';
import Link from 'next/link';
import { usePokemon } from '@/context/PokemonContext';

export default function PokemonList() {
  const [isReady, setIsReady] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pokemonList, setPokemonList] = useState<PokemonListItem>({} as PokemonListItem);
  const { isEncountered, isCaught } = usePokemon();

  const fetchPokemon = async (url: string) => {
    try {
      setLoading(true);
      const fetchData = await fetchPokemons(url);
      setPokemonList(fetchData);

      const pokemonWithDetails = await Promise.all(
        fetchData.results.map(async (pokemon: { url: string }) => {
          const data = await fetchPokemonDetails(pokemon.url);
          return { ...data, isEncountered: isEncountered(data.id), isCaught: isCaught(data.id) };
        })
      );
      setPokemons(pokemonWithDetails);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch Pokemon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsReady(true);
  }, [isEncountered, isCaught]);

  useEffect(() => {
    if (isReady) {
      fetchPokemon(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`);
    }
  }, [isReady]);

  const types = Array.from(new Set(pokemons.flatMap((p) => p.types)));

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
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pokedex</h1>
        <Link href="/trainer/collection" className="text-blue-500 hover:underline">
          My Pokémons
        </Link>
      </div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        types={types}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {pokemons.map((p) => (
          <Link href={`/pokemon/${p.id}`} key={p.id}>
            <PokemonCard
              id={p.id}
              name={p.name}
              types={p.types}
              isEncountered={p.isEncountered ?? false}
              isCaught={p.isCaught ?? false}
            />
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <Button onClick={() => fetchPokemon(pokemonList.previous)} disabled={!pokemonList.previous}>
          Previous
        </Button>
        <Button onClick={() => fetchPokemon(pokemonList.next)} disabled={!pokemonList.next}>
          Next
        </Button>
      </div>
    </div>
  );
}
