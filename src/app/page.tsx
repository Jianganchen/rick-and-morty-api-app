import { Suspense } from "react";
import Pagination from "./pagination";
import CharacterList from "./characterList";

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Rick and Morty Characters
      </h1>
      <Suspense
        key={currentPage}
        fallback={<div className="text-center">Loading...</div>}
      >
        <CharacterList currentPage={currentPage} />
      </Suspense>

      {/* Pagination */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination />
      </div>
    </div>
  );
}
