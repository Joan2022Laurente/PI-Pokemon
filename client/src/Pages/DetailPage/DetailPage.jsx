import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPokemonDetails,
  deletePokemon,
} from "../../Redux/actions/pokemonsActions";
import { useSelector, useDispatch } from "react-redux";
import "./detailPage.css";

export const DetailPage = () => {
  const { pokemonId } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemons.pokemonDetail);
  const [containsLetters, setContainsLetters] = useState(false);

  const handleDelete = () => {
    dispatch(deletePokemon(pokemonId));
  };

  useEffect(() => {
    const hasLetters = /[a-zA-Z]/.test(pokemonId);
    setContainsLetters(hasLetters);
    try {
      dispatch(fetchPokemonDetails(pokemonId));
    } catch (error) {
      console.log(error);
    }
  }, [pokemonId]);

  if (!pokemon || pokemon.types === undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="detailPage">
        <div className="container">
          <div className="data">
            <div className="box">
              <p className="nombre">Nombre: {pokemon.name}</p>
              <p>ID: {pokemon.id}</p>
              <p>Types: {pokemon.types.join(", ")}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>HP: {pokemon.hp}</p>
              <p>Attack: {pokemon.attack}</p>
              <p>Defense: {pokemon.defense}</p>
              <p>Speed: {pokemon.speed}</p>
            </div>
          </div>
          <div className="image">
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        </div>
        <div className="info">
          {containsLetters ? (
            <>
              <p>Origen: Base de datos local</p>
              <button onClick={handleDelete}>Borrar Pokémon</button>
            </>
          ) : (
            <>
              <p>Origen: API </p>
            </>
          )}
        </div>
      </div>
    );
  }
};
