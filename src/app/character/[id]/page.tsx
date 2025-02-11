import { notFound } from "next/navigation";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
}

const fetchCharacter = async (id: number): Promise<Character | null> => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching character:", error);
    return null;
  }
};

const CharacterPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  const character = await fetchCharacter(Number(id));

  if (!character) return notFound();

  return (
    <div className="container mx-auto p-5 text-center">
      <h1 className="text-4xl font-bold">{character.name}</h1>
      <img
        src={character.image}
        alt={character.name}
        className="w-60 h-60 rounded-lg mx-auto my-4"
      />

      <div className=" shadow-md rounded-lg p-5 max-w-lg mx-auto">
        <p>
          <strong>Status:</strong> {character.status}
        </p>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        {character.type && (
          <p>
            <strong>Type:</strong> {character.type}
          </p>
        )}
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Origin:</strong> {character.origin.name}
        </p>
        <p>
          <strong>Last Location:</strong> {character.location.name}
        </p>
      </div>

      <a
        href="/"
        className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Back to Home
      </a>
    </div>
  );
};

export default CharacterPage;
