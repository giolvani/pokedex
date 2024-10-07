import React, { createContext, useContext, useState, useEffect } from 'react';

interface PokemonContextType {
  encounteredPokemon: number[];
  caughtPokemon: number[];
  markAsEncountered: (id: number) => void;
  markAsCaught: (id: number) => void;
  removeEncountered: (id: number) => void;
  removeCaught: (id: number) => void;
  isEncountered: (id: number) => boolean;
  isCaught: (id: number) => boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [encounteredPokemon, setEncounteredPokemon] = useState<number[]>([]);
  const [caughtPokemon, setCaughtPokemon] = useState<number[]>([]);

  useEffect(() => {
    const storedEncountered = JSON.parse(localStorage.getItem('encounteredPokemon') || '[]');
    const storedCaught = JSON.parse(localStorage.getItem('caughtPokemon') || '[]');
    setEncounteredPokemon(storedEncountered);
    setCaughtPokemon(storedCaught);
  }, []);

  const markAsEncountered = (id: number) => {
    if (!encounteredPokemon.includes(id)) {
      const updatedList = [...encounteredPokemon, id];
      setEncounteredPokemon(updatedList);
      localStorage.setItem('encounteredPokemon', JSON.stringify(updatedList));
    }
  };

  const markAsCaught = (id: number) => {
    if (!caughtPokemon.includes(id)) {
      const updatedList = [...caughtPokemon, id];
      setCaughtPokemon(updatedList);
      localStorage.setItem('caughtPokemon', JSON.stringify(updatedList));
    }
  };

  const removeEncountered = (id: number) => {
    const updatedList = encounteredPokemon.filter((pokemonId) => pokemonId !== id);
    setEncounteredPokemon(updatedList);
    localStorage.setItem('encounteredPokemon', JSON.stringify(updatedList));
  };

  const removeCaught = (id: number) => {
    const updatedList = caughtPokemon.filter((pokemonId) => pokemonId !== id);
    setCaughtPokemon(updatedList);
    localStorage.setItem('caughtPokemon', JSON.stringify(updatedList));
  };

  const isEncountered = (id: number) => {
    return encounteredPokemon.includes(id);
  };

  const isCaught = (id: number) => {
    return caughtPokemon.includes(id);
  };

  return (
    <PokemonContext.Provider
      value={{
        encounteredPokemon,
        caughtPokemon,
        markAsEncountered,
        markAsCaught,
        removeEncountered,
        removeCaught,
        isEncountered,
        isCaught
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};
