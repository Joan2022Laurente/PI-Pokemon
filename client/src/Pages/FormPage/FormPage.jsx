import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes } from "../../Redux/actions/typesActions";
import { createPokemon } from "../../Redux/actions/pokemonsActions";


import "./formPage.css";

export const FormPage = () => {
  const typesPokemons = useSelector((state) => state.types.types);

  const dispatch = useDispatch();



  const [formData, setFormData] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const initialFormData = {
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (formData.types.length < 2) {
        setFormData({
          ...formData,
          types: [...formData.types, value],
        });
      }
    } else {
      setFormData({
        ...formData,
        types: formData.types.filter((type) => type !== value),
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPokemon(formData));
      setFormData(initialFormData);
    } catch (error) {
      alert(error)
    }
  };

  const getData = async () => {
    try {
      await dispatch(getTypes());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="formPage">
      <h2>Create a New Pokémon</h2>
      <form onSubmit={handleSubmit}>
        <div className="box">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="box">
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="box">
          HP:
          <input
            type="number"
            name="hp"
            value={formData.hp}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="box">
          Attack:
          <input
            type="number"
            name="attack"
            value={formData.attack}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="box">
          Defense:
          <input
            type="number"
            name="defense"
            value={formData.defense}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="box">
          Speed:
          <input
            type="number"
            name="speed"
            value={formData.speed}
            onChange={handleInputChange}
          />
        </div>

        <div className="box">
          Height:
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
          />
        </div>

        <div className="box">
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </div>

        <div className="box">
          Types:
          <div className="boxChecks">
            {typesPokemons.length === 0
              ? "Cargando"
              : typesPokemons.map((type) => (
                  <div key={type.name} className="input">
                    <input
                      type="checkbox"
                      name="types"
                      value={type.name}
                      checked={formData.types.includes(type.name)}
                      onChange={handleTypeChange}
                    />
                    {type.name}
                  </div>
                ))}
          </div>
        </div>

        <button type="submit" className="crearPokemon">
          Create Pokémon
        </button>
      </form>
    </div>
  );
};
