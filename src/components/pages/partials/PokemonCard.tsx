/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    types: string[];
    encountered: boolean;
    caught: boolean;
  };
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {pokemon.name}
          <div className="flex space-x-1">
            {pokemon.encountered && (
              <span className="mr-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                Encountered
              </span>
            )}
            {pokemon.caught && (
              <span className="mr-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Caught
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          className="mx-auto h-32 w-32"
        />
        <div className="mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {type}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
