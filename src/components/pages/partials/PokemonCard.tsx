/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PokemonCardProps {
    pokemon: {
        id: number;
        name: string;
        types: string[];
    };
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{pokemon.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                    className="w-32 h-32 mx-auto"
                />
                <div className="mt-2">
                    {pokemon.types.map(type => (
                        <span key={type} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            {type}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default PokemonCard;