"use client";

import { useEffect, useState } from "react";
import { fetchCharacters, Character } from "./api/fetchCharacters";
import { useSearchParams, usePathname } from "next/navigation";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalPages = 42;

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data: Character[] = await fetchCharacters(currentPage);
        setCharacters(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCharacters();
  }, [currentPage]);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

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
      <div className="mt-5 flex w-full justify-center">
        <div className="inline-flex">
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />

          <div className="flex -space-x-px px-4 py-2">
            Page {currentPage} of {totalPages}
          </div>
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </div>
      </div>
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
