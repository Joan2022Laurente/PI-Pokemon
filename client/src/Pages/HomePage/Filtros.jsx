import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchPokemon,
  getPokemons,
} from "../../Redux/actions/pokemonsActions";
export const Filtros = ({
  handleFiltersChange,
  applyFilters,
  filters,
  typesPokemons,
}) => {
  const [search, setsearch] = useState("");

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchPokemon(search));
  };

  const reset = () => {
    setsearch("");
    dispatch(getPokemons());
  };

  return (
    <div className="filtrosOrdenComponent">
      <h3>Filtrar y ordenar</h3>
      <div className="filterr">
        <p className="filtroNombre">Fuente</p>
        <select
          value={filters.source || ""}
          onChange={(e) => handleFiltersChange("source", e.target.value)}
        >
          <option value="">Todos</option>
          <option value="API">API</option>
          <option value="DB">DB</option>
        </select>
      </div>
      <div className="filterr">
        <p className="filtroNombre">Tipo</p>
        <select
          value={filters.tipo || ""}
          onChange={(e) => handleFiltersChange("tipo", e.target.value)}
        >
          <option value="">Todos</option>
          {typesPokemons.length === 0
            ? "cargando"
            : typesPokemons.map((type) => (
                <option value={type.name} key={type.name}>
                  {type.name}
                </option>
              ))}
        </select>
      </div>
      <div className="filterr">
        <p className="filtroNombre">Orden por Ataque</p>
        <select
          value={filters.orderByAtack || ""}
          onChange={(e) => handleFiltersChange("orderByAtack", e.target.value)}
        >
          <option value="">Sin orden</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>
      <div className="filterr">
        <p className="filtroNombre">Orden Alfabetico</p>
        <select
          value={filters.orderByAlphabet || ""}
          onChange={(e) =>
            handleFiltersChange("orderByAlphabet", e.target.value)
          }
        >
          <option value="">Sin orden</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <button onClick={applyFilters}>Apply Filters</button>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Buscar por id o por nombre"
          onChange={(e) => setsearch(e.target.value)}
          value={search}
        />
        {search.length > 0 ? <button onClick={reset}className="btn-reset" >X</button> : ""}
        <button onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
};
