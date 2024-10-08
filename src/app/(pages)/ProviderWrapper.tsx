'use client';

import { PokemonProvider } from '@/context/PokemonContext';
import { ReactElement } from 'react';

export default function ProviderWrapper({ children }: { children: ReactElement }) {
  return <PokemonProvider>{children}</PokemonProvider>;
}
