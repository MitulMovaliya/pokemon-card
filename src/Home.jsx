import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

async function App() {
  const [allPokeData, setAllPokeData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0";

  const getAllPokemon = async () => {
    setLoading(true);

    const res = await fetch(url);
    const { results } = await res.json();
    setAllPokeData(results);
    setLoading(false);
  };

  // const pokemonList = async () => {
  //   for (const pokemon of allPokeData) {
  //     const response = await fetch(pokemon.url);
  //     const data = await response.json();

  //     const pokemonData = {
  //       name: data.name,
  //       image: data.sprites.other.dream_world.front_default,
  //       type: data.types.map((t) => t.type.name),
  //       weight: data.weight,
  //       height: data.height,
  //       stats: data.stats
  //         .filter((s) =>
  //           ["hp", "attack", "defense", "speed"].includes(s.stat.name)
  //         )
  //         .map((s) => ({
  //           name: s.stat.name,
  //           amount: s.base_stat,
  //         })),
  //       abilities: data.abilities
  //         .filter((a) => !a.is_hidden) // Only keep abilities where is_hidden is false
  //         .map((a) => a.ability.name),
  //     };
  //     setPokemonData((prev) => [...prev, pokemonData]);
  //   }
  // };

  // useEffect(() => {
  //   getAllPokemon();
  // }, []);

  // useEffect(() => {
  //   pokemonList();
  // }, [allPokeData]);

  // console.log(pokemonData);

  // if (loading) return <h1>Loading</h1>;

  return (
    <>
      <div className="grid md:grid-cols-4 justify-center items-center m-auto w-fit gap-5">
        {/* {pokemonData.map((pokemon, index) => (
          <div key={index}>
            <PokemonCard pokemon={pokemon} />{" "}
          </div>
        ))} */}
        hey
      </div>
    </>
  );
}

export default App;
