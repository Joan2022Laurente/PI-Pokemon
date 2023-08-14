import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detailPage.css"
import axios from "axios";

export const DetailPage = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/pokemons/forId/${pokemonId}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detailPage">
      <div className="container">
        <div className="data">
          <p>Name: {pokemon.name}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>
            Types:
            {pokemon.types.map((t) => (
              <p>{t.name}</p>
            ))}
          </p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
        </div>
        <div className="image">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      </div>
    </div>
  );
};
