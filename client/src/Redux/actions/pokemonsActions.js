import axios from "axios";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/pokemons?limit=60");
      dispatch({
        type: "GET_POKEMONS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const applyPokemonFilters = (filters) => {
  return {
    type: "APPLY_POKEMON_FILTERS",
    payload: filters,
  };
};

export const searchPokemon = (query) => {
  return async (dispatch) => {
    let pokemonFound;
    try {
      if (typeof query === "string") {
        const nombre = query.toLowerCase();
        pokemonFound = await axios.get(
          `http://localhost:3001/pokemons/forName?nameQ=${nombre}`
        );
      } else if (typeof query === "number") {
        pokemonFound = await axios.get(
          `http://localhost:3001/pokemons/forId/${query}`
        );
      }

      dispatch({
        type: "SEARCH_POKEMON",
        payload: pokemonFound.data,
      });
    } catch (error) {
      alert("No se encontro el pokemon");
    }
  };
};

export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/pokemons/create",
        pokemon
      );

      alert("pokemon creado correctamente");
    } catch (error) {
      return error;
    }
  };
};

export const deletePokemon = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`http://localhost:3001/pokemons/${id}`);
    } catch (error) {
      console.log("Ocurrio un error");
    }
  };
};
