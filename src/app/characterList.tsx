import { fetchCharacters } from "./api/fetchCharacters";

const CharacterList = async ({ currentPage }: { currentPage: number }) => {
  const characters = await fetchCharacters(currentPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {characters?.map((val, index) => (
        <div key={index} className="shadow-lg rounded-lg p-4 text-center">
          <img src={val.image} alt={val.name} />
          <h3 className="text-lg font-semibold mt-2">{val.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
