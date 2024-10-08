/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface BasePokemonCardProps {
  id: number;
  name: string;
  types: string[];
  isEncountered: boolean;
  isCaught: boolean;
}

type InteractivePokemonCardProps = BasePokemonCardProps & {
  interactive: boolean;
  onRemoveEncountered: () => void;
  onRemoveCaught: () => void;
};

interface NonInteractivePokemonCardProps extends BasePokemonCardProps {
  interactive?: false;
  onRemoveEncountered?: () => void;
  onRemoveCaught?: () => void;
}

type PokemonCardProps = InteractivePokemonCardProps | NonInteractivePokemonCardProps;

const PokemonCard = (props: PokemonCardProps) => {
  const { id, name, types, isEncountered, isCaught, interactive, onRemoveEncountered, onRemoveCaught } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {name}
          {!interactive && (
            <div className="flex space-x-1">
              {isEncountered && (
                <span className="mr-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Encountered
                </span>
              )}
              {isCaught && (
                <span className="mr-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Caught
                </span>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          className="mx-auto h-32 w-32"
        />
        <div className="mt-2 space-y-1">
          <div className="flex flex-wrap gap-1">
            {types.map((type) => (
              <span
                key={type}
                className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
              >
                {type}
              </span>
            ))}
          </div>
          {interactive && (
            <div className="mt-2 flex space-x-2">
              {isEncountered && (
                <span className="flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Encountered
                  <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0" onClick={onRemoveEncountered}>
                    <X className="h-3 w-3" />
                  </Button>
                </span>
              )}
              {isCaught && (
                <span className="flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Caught
                  <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0" onClick={onRemoveCaught}>
                    <X className="h-3 w-3" />
                  </Button>
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
