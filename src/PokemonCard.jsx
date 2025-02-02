import React from "react";

export default function PokemonCard({ pokemon }) {
  return (
    <div className="flex flex-col items-center bg-red-500 w-80 p-4 rounded-lg shadow-lg">
      {/* Image Section */}
      <div className="w-full bg-gradient-to-tl from-blue-400 to-blue-600 rounded-lg p-2">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-48 object-contain"
        />
      </div>

      <h1 className="text-3xl font-bold my-4 capitalize text-white">
        {pokemon.name}
      </h1>

      <div className="bg-blue-600 text-white py-1 px-4 rounded-full mb-4">
        {pokemon.type.join(" · ")}
      </div>

      <div className="flex gap-6 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-200">Weight</p>
          <p className="text-white font-bold">{pokemon.weight}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-200">Height</p>
          <p className="text-white font-bold">{pokemon.height}</p>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-2 mb-4">
        {pokemon.stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-90 p-2 rounded flex justify-between"
          >
            <span className="capitalize text-gray-600">{stat.name}</span>
            <span className="font-bold text-red-600">{stat.amount}</span>
          </div>
        ))}
      </div>

      {/* Abilities */}
      <div className="w-full text-center bg-green-600 text-white py-2 rounded-lg">
        <p className="text-sm font-semibold">Abilities</p>
        <p className="capitalize">{pokemon.abilities.join(", ")}</p>
      </div>
    </div>
  );
}
