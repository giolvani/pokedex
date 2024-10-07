'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePokemon } from '@/context/PokemonContext';

interface PokemonDetails {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: { name: string; value: number }[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  species: {
    flavor_text: string;
  };
}

export default function PokemonDetails({ id }: { id: number }) {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { markAsEncountered, markAsCaught, removeEncountered, removeCaught, isEncountered, isCaught } = usePokemon();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        setPokemon({
          id: data.id,
          name: data.name,
          types: data.types.map((type: { type: { name: string } }) => type.type.name),
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
          stats: data.stats.map((stat: { base_stat: number; stat: { name: string } }) => ({
            name: stat.stat.name,
            value: stat.base_stat
          })),
          sprites: {
            front_default: data.sprites.front_default,
            back_default: data.sprites.back_default,
            front_shiny: data.sprites.front_shiny,
            back_shiny: data.sprites.back_shiny
          },
          species: {
            flavor_text:
              speciesData.flavor_text_entries.find(
                (entry: { language: { name: string } }) => entry.language.name === 'en'
              )?.flavor_text || 'No description available.'
          }
        });
      } catch (err) {
        setError('Failed to fetch Pokemon details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemonDetails();
    }
  }, [id]);

  const handleEncountered = () => {
    if (isEncountered(Number(id))) {
      removeEncountered(Number(id));
    } else {
      markAsEncountered(Number(id));
    }
  };

  const handleCaptured = () => {
    if (isCaught(Number(id))) {
      removeCaught(Number(id));
    } else {
      markAsCaught(Number(id));
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !pokemon) {
    return <div className="text-center text-red-500">{error || 'Pokemon not found'}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/pokedex" className="mb-4 inline-block text-blue-500 hover:underline">
        &larr; Back to Pokemon List
      </Link>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{pokemon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <img
                src={pokemon.sprites.front_default}
                alt={`${pokemon.name} front view`}
                className="mx-auto h-48 w-48"
              />
              <div className="mt-4 text-center">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-center space-x-2">
                <Button onClick={() => handleEncountered()} variant="default">
                  {isEncountered(Number(id)) ? 'Remove from Encountered' : 'Mark as Encountered'}
                </Button>
                <Button onClick={() => handleCaptured()} variant="default">
                  {isCaught(Number(id)) ? 'Remove from Caught' : 'Mark as Caught'}
                </Button>
              </div>
            </div>
            <div>
              <p className="mb-2 text-lg">{pokemon.species.flavor_text}</p>
              <p>
                <strong>Height:</strong> {pokemon.height / 10} m
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </p>
              <h3 className="mb-2 mt-4 font-bold">Abilities:</h3>
              <ul className="list-inside list-disc">
                {pokemon.abilities.map((ability) => (
                  <li key={ability}>{ability}</li>
                ))}
              </ul>
              <h3 className="mb-2 mt-4 font-bold">Stats:</h3>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.name} className="flex items-center">
                    <span className="w-40 font-semibold">{stat.name}:</span>
                    <div className="h-2.5 flex-1 rounded-full bg-gray-200">
                      <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: `${(stat.value / 255) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 min-w-10">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
