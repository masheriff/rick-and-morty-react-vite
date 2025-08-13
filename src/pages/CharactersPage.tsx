import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCharacters } from "@/services/characters";
import type { Character, CharacterFilters as CharacterFiltersType, CharactersResponse } from "@/types/character";
import { CharacterFilters } from "@/components/characters/CharacterFilters";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { CharacterPagination } from "@/components/characters/CharacterPagination";

export function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<CharactersResponse["info"] | null>(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<CharacterFiltersType>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setLoading(true);
    getCharacters({ page, ...filters })
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .finally(() => setLoading(false));
  }, [page, filters]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || (info && newPage > info.pages)) return;
    setSearchParams({ page: String(newPage) });
  };

  const handleFiltersChange = (newFilters: CharacterFiltersType) => {
    setFilters(newFilters);
    setSearchParams({ page: "1" }); // reset to first page when filters change
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Characters</h1>

      <CharacterFilters filters={filters} onChange={handleFiltersChange} />

      {loading && <p>Loading...</p>}

      {!loading && characters.length === 0 && <p>No characters found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char) => (
          <div key={char.id} onClick={() => navigate(`/character/${char.id}`)} className="cursor-pointer">
            <CharacterCard character={char} />
          </div>
        ))}
      </div>

      {info && (
        <div className="mt-6">
          <CharacterPagination
            currentPage={page}
            totalPages={info.pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
