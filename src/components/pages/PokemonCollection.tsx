'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import PokemonCard from './partials/PokemonCard';
import { usePokemon } from '@/context/PokemonContext';
import { fetchData } from '@/services/pokemon';
import { Pokemon } from '@/types/Pokemon';
import { Loading } from './partials/Loading';
import { pokemonParser } from '@/services/parser/pokemon';

export default function PokemonCollection() {
  const [myPokemon, setMyPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const { isEncountered, isCaught, removeEncountered, removeCaught, encounteredPokemon, caughtPokemon } = usePokemon();

  useEffect(() => {
    const fetchMyPokemon = async () => {
      try {
        setLoading(true);
        const allMyPokemonIds = Array.from(new Set([...encounteredPokemon, ...caughtPokemon]));

        const pokemonDetails = await Promise.all(
          allMyPokemonIds.map(async (id: number) => {
            const data = await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`, pokemonParser);
            return { ...data, isEncountered: isEncountered(data.id), isCaught: isCaught(data.id) };
          })
        );

        setMyPokemon(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
      } catch (err) {
        setError('Failed to fetch your Pokemon');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPokemon();
  }, [encounteredPokemon, caughtPokemon]);

  useEffect(() => {
    const filtered = myPokemon.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter === 'all' || (filter === 'encountered' && p.isEncountered) || (filter === 'caught' && p.isCaught))
    );
    setFilteredPokemon(filtered);
  }, [search, filter, myPokemon]);

  const handleRemovePokemon = (id: number, type: 'encountered' | 'caught') => {
    if (type === 'encountered') {
      removeEncountered(id);
    } else {
      removeCaught(id);
    }
    setMyPokemon((prevPokemon) => prevPokemon.filter((p) => p.id !== id));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">My Pokémons</h1>
      <Link href="/" className="mb-4 inline-block text-blue-500 hover:underline">
        &larr; Back to Pokémon List
      </Link>
      <div className="mb-4 space-y-4">
        <Input
          placeholder="Search your Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Pokémon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="encountered">Encountered</SelectItem>
            <SelectItem value="caught">Caught</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPokemon.map((p) => (
          <PokemonCard
            key={p.id}
            interactive={true}
            id={p.id}
            name={p.name}
            types={p.types}
            isEncountered={p.isEncountered ?? false}
            isCaught={p.isCaught ?? false}
            onRemoveEncountered={() => handleRemovePokemon(p.id, 'encountered')}
            onRemoveCaught={() => handleRemovePokemon(p.id, 'caught')}
          />
        ))}
      </div>
      {filteredPokemon.length === 0 && (
        <p className="mt-4 text-center text-gray-500">No Pokémon found. Go catch some!</p>
      )}
    </div>
  );
}
