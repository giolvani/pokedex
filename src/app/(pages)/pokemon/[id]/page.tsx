export default function Page({ params }: { params: { id: string } }) {
  return <div>Pokemon {params.id}</div>;
}
