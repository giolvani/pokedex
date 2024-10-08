export const pokemonDescriptionParser = (data: any): string => {
  return (
    data.flavor_text_entries.find((entry: { language: { name: string } }) => entry.language.name === 'en')
      ?.flavor_text || 'No description available.'
  );
};
