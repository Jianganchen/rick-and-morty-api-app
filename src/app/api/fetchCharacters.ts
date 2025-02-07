export interface Character {
  name: string;
  image: string;
}

export interface APIresponse {
  results: Character[];
}

export const fetchCharacters = async (page: number): Promise<Character[]> => {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    const data: APIresponse = await res.json();

    const characters = data.results.map(({ name, image }) => ({ name, image }));
    return characters;
  } catch (error) {
    console.log(error);
    return [];
  }
};
