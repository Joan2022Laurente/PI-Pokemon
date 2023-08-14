const axios = require("axios");
const { Type } = require("../db.js");

const getPokemonTypes = async (req, res) => {
  try {
    // Obtener todos los tipos de pokémon desde la API
    const apiResponse = await axios.get("https://pokeapi.co/api/v2/type");
    const apiTypes = apiResponse.data.results.map((type) => ({
      name: type.name,
      url: type.url,
    }));

    // Obtener todos los tipos de pokémon desde la base de datos
    const dbTypes = await Type.findAll();

    // Verificar si los tipos de la API están en la base de datos
    const missingTypes = apiTypes.filter(
      (apiType) => !dbTypes.some((dbType) => dbType.name === apiType.name)
    );

    // Si faltan tipos en la base de datos, agregarlos utilizando Type.create()
    if (missingTypes.length > 0) {
      await Promise.all(missingTypes.map((type) => Type.create(type)));
    }

    // Obtener todos los tipos de pokémon desde la base de datos (actualizados)
    const updatedDbTypes = await Type.findAll();

    res.json(updatedDbTypes); // Retornar los tipos obtenidos desde la API o la base de datos
  } catch (error) {
    console.error("Error al obtener los tipos de pokémon:", error.message);
    res.status(500).json({ error: "Error al obtener los tipos de pokémon" });
  }
};


module.exports = {
  getPokemonTypes,
};
