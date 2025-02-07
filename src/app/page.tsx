"use client";

import { useEffect, useState } from "react";
import { fetchCharacters, Character } from "./api/fetchCharacters";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const totalPages = 42;

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data: Character[] = await fetchCharacters(page);
        setCharacters(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCharacters();
  }, [page]);

  const handlePrev = () => {
    setPage((currentPage) => currentPage - 1);
  };
  const handleNext = () => {
    setPage((currentPage) => currentPage + 1);
  };

  if (isLoading) return <div>Loading...</div>;

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

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          prev
        </button>
        <div>page {page} </div>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          next
        </button>
      </div>
    </div>
  );
}
