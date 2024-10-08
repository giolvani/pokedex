import PokemonDetails from '@/components/pages/PokemonDetails';

export default function Page({ params }: { params: { id: string } }) {
  return <PokemonDetails id={params.id} />;
}
