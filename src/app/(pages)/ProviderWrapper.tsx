'use client';

import { ReactElement } from 'react';
import { PokemonProvider } from '@/context/PokemonContext';

export default function ProviderWrapper({ children }: { children: ReactElement }) {
  return <PokemonProvider>{children}</PokemonProvider>;
}
