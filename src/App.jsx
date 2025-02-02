import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import AnimatedCursor from "react-animated-cursor";

export default function App() {
  const [allPokeData, setAllPokeData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 50;
  const totalPokemon = 649;

  const getAllPokemon = async () => {
    const storedData = localStorage.getItem("pokemonData");
    if (storedData) {
      setAllPokeData(JSON.parse(storedData));
    } else {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=649&offset=0"
      );
      const { results } = await res.json();
      setAllPokeData(results);
      localStorage.setItem("pokemonData", JSON.stringify(results));
    }
    setLoading(false);
  };

  const pokemonList = async () => {
    setLoading(true);
    const dataChunk = allPokeData.slice(page * limit, (page + 1) * limit);
    const pokemonListData = await Promise.all(
      dataChunk.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return {
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          type: data.types.map((t) => t.type.name),
          weight: data.weight,
          height: data.height,
          stats: data.stats
            .filter((s) =>
              ["hp", "attack", "defense", "speed"].includes(s.stat.name)
            )
            .map((s) => ({
              name: s.stat.name,
              amount: s.base_stat,
            })),
          abilities: data.abilities
            .filter((a) => !a.is_hidden)
            .map((a) => a.ability.name),
        };
      })
    );
    setPokemonData(pokemonListData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getAllPokemon();
  }, []);

  useEffect(() => {
    if (allPokeData.length > 0) {
      pokemonList();
    }
  }, [page, allPokeData]);

  const year = new Date().getFullYear();

  return (
    <div className="bg-gradient-to-br from-blue-950 to bg-blue-800 pt-2 min-h-screen scroll-">
      <AnimatedCursor
        innerSize={5}
        outerSize={25}
        innerScale={1}
        outerScale={1.5}
        outerAlpha={0}
        innerStyle={{
          backgroundColor: "#000",
        }}
        outerStyle={{
          border: "2px solid #000",
        }}
      />
      {/* <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-80 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin overflow-hidden">
            <img
              src="image.png"
              alt="Loading..."
              className="w-full h-20 object-contain"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="prevent-select flex justify-center gap-6 text-lg mt-4 mb-6">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className={`cursor-pointer px-4 py-1 text-white rounded-lg transition-colors duration-300 ${
                page > 0 ? "bg-blue-500" : "bg-red-400 !cursor-not-allowed"
              }`}
              disabled={page === 0}
            >
              Prev
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className={`cursor-pointer px-4 py-1 text-white rounded-lg ${
                (page + 1) * limit < totalPokemon
                  ? "bg-blue-500"
                  : "bg-red-400 !cursor-not-allowed"
              }`}
              disabled={(page + 1) * limit >= totalPokemon}
            >
              Next
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center m-auto w-fit gap-5">
            {pokemonData.length > 0 ? (
              pokemonData.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
              ))
            ) : (
              <p className="text-white text-center col-span-full">
                No Pokémon found
              </p>
            )}
          </div>
          <section className="sticky bg-blue-950 mt-4">
            <div className="text-white text-center py-5">
              <div>Made by Mitul</div>
              <div className="text-gray-300">
                © {year} Mitul. All rights reserved.
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
