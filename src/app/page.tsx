"use client";

import { useEffect, useState } from "react";
import { fetchCharacters, Character } from "./api/fetchCharacters";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data: Character[] = await fetchCharacters(1);
        setCharacters(data);
      } catch (error) {}
    };

    getCharacters();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Rick and Morty Characters
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters &&
          characters.map((val, index) => (
            <div key={index} className="shadow-lg rounded-lg p-4 text-center">
              <img src={val.image} alt={val.name} />
              <h3 className="text-lg font-semibold mt-2">{val.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
