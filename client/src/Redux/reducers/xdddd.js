let initialState = {
  pokemons: [],
  filterPokemons: [],
  filters: {
    source: null,
    color: null,
    orderBy: null,
    orderDirection: null,
  },
};

export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        filterPokemons: [...action.payload],
      };

    case "ORDENAR_TIPO":
      const { payload: type } = action;

      const filteredByType = state.pokemons.filter((pokemon) =>
        pokemon.types.includes(type)
      );

      return {
        ...state,
        filterPokemons: [...filteredByType],
      };

    case "FILTRO_SOURCE":
      const { payload: src } = action; // puede ser "API" o "DB"

      let filteredPokemonsBySource;

      if (src === "API") {
        filteredPokemonsBySource = state.pokemons.filter(
          (pokemon) => typeof pokemon.id === "number"
        );
      } else if (src === "DB") {
        filteredPokemonsBySource = state.pokemons.filter(
          (pokemon) => typeof pokemon.id === "string"
        );
      }

      return {
        ...state,
        filterPokemons: filteredPokemonsBySource,
      };
    case "ORDENAR_ATAQUE":
      // Lógica para ordenar por ataque
      return state;

    case "ORDENAR_ALFABETO":
      // Lógica para ordenar alfabéticamente
      return state;

    default:
      return state;
  }
};
