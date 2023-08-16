const initialState = {
  pokemons: [],
  filterPokemons: [],
  filters: {
    source: null,
    tipo: null,
    orderByAtack: null,
    orderByAlphabet: null,
  },
  pokemonDetail: {},
};

export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        filterPokemons: [...action.payload],
      };

    case "APPLY_POKEMON_FILTERS":
      const { source, tipo, orderByAtack, orderByAlphabet } = action.payload;
      // Filtrar por fuente
      let filteredPokemonsBySource = state.pokemons;
      if (source) {
        filteredPokemonsBySource =
          source === "API"
            ? state.pokemons.filter((pokemon) => typeof pokemon.id === "number")
            : state.pokemons.filter(
                (pokemon) => typeof pokemon.id === "string"
              );
      }

      // Filtrar por tipo
      let filteredPokemonsByType = filteredPokemonsBySource;
      if (tipo) {
        filteredPokemonsByType = filteredPokemonsBySource.filter((pokemon) =>
          pokemon.types.includes(tipo)
        );
      }

      // Ordenar por ataque
      let orderedPokemonsByAttack = filteredPokemonsByType;
      if (orderByAtack === "asc") {
        orderedPokemonsByAttack = filteredPokemonsByType
          .slice()
          .sort((a, b) => a.attack - b.attack);
      } else if (orderByAtack === "desc") {
        orderedPokemonsByAttack = filteredPokemonsByType
          .slice()
          .sort((a, b) => b.attack - a.attack);
      }

      // Ordenar alfabéticamente
      let orderedPokemonsByAlphabet = orderedPokemonsByAttack;
      if (orderByAlphabet === "asc") {
        orderedPokemonsByAlphabet = orderedPokemonsByAttack
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      } else if (orderByAlphabet === "desc") {
        orderedPokemonsByAlphabet = orderedPokemonsByAttack
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...state,
        filterPokemons: orderedPokemonsByAlphabet,
        filters: {
          source,
          tipo,
          orderByAtack,
          orderByAlphabet,
        },
      };

    case "SEARCH_POKEMON":
      return {
        ...state,
        pokemons: [action.payload],
      };

    case "GET_DETAIL":
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    default:
      return state;
  }
};
