import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPokemons,
  applyPokemonFilters,
} from "../../Redux/actions/pokemonsActions";
import { getTypes } from "../../Redux/actions/typesActions";
import "./homePage.css";
import { Filtros } from "./Filtros";

import { Link } from "react-router-dom";
export const HomePage = () => {
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const typesPokemons = useSelector((state) => state.types.types);
  const filterPokemons = useSelector((state) => state.pokemons.filterPokemons);

  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    source: null,
    tipo: null,
    orderByAtack: null,
    orderByAlphabet: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleFiltersChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const applyFilters = () => {
    dispatch(applyPokemonFilters(filters));
  };

  const getData = async () => {
    try {
      await dispatch(getPokemons());
    } catch (error) {
      console.log(error);
    }
    try {
      await dispatch(getTypes());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let itemsToDisplay = Object.values(filters).every((value) => value === null)
    ? pokemons.slice(indexOfFirstItem, indexOfLastItem)
    : filterPokemons.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (Object.values(filters).every((value) => value === null)
      ? pokemons.length
      : filterPokemons.length) / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="homePage">
      <div className="cabezeraHome">
        <img
          src="https://i0.wp.com/imagensemoldes.com.br/wp-content/uploads/2020/04/Pok%C3%A9mon-Logo-PNG.png?fit=1600%2C1200&ssl=1"
          alt=""
        />
      </div>

      <Filtros
        handleFiltersChange={handleFiltersChange}
        applyFilters={applyFilters}
        filters={filters}
        typesPokemons={typesPokemons}
      />

      <div className="listaPokemones">
        {itemsToDisplay.length === 0
          ? "vacio"
          : itemsToDisplay.map((pokemon) => (
              <div className="cardPokemon" key={pokemon.id}>
                <div className="left">
                  <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <div className="right">
                  <div className="data">
                    <p>Nombre: {pokemon.name} </p>
                    <p>Ataque: {pokemon.attack} </p>
                    <p>Tipo: {pokemon.types.join(", ")}</p>
                    <Link to={`/detalle/${pokemon.id}`}>
                      <button>Detalles</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
