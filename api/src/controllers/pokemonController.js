const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

const formatPokemonData = (pokemonData) => {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.sprites.other.dream_world.front_default,
    types: pokemonData.types.map((elem) => elem.type.name),
    hp: pokemonData.stats[0].base_stat,
    attack: pokemonData.stats[1].base_stat,
    defense: pokemonData.stats[2].base_stat,
    speed: pokemonData.stats[5].base_stat,
    height: pokemonData.height,
    weight: pokemonData.weight,
  };
};

const getPokemonsFromAPI = async (req, res) => {
  try {
    const { page = 1, limit = 60 } = req.query;
    const offset = (page - 1) * limit;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

    // Obtener lista de nombres y URLs de los pokemones desde la API
    const apiResponse = await axios.get(apiUrl);
    const apiPokemons = apiResponse.data.results;

    // Obtener información detallada de cada pokemón desde la API
    const detailedPokemons = await Promise.all(
      apiPokemons.map(async (apiPokemon) => {
        const pokemonResponse = await axios.get(apiPokemon.url);
        return formatPokemonData(pokemonResponse.data);
      })
    );

    // Obtener lista de pokemones desde la base de datos
    const dbPokemons = await getPokemonsFromDB();

    // Combinar datos de la API y de la base de datos
    const allPokemons = [...detailedPokemons, ...dbPokemons];

    res.status(200).json(allPokemons);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error al obtener los datos de los pokemones" });
  }
};

const getPokemonsFromDB = async () => {
  const pokemonsDB = await Pokemon.findAll({
    include: Type,
  });
  const filteredPokemons = pokemonsDB.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    hp: pokemon.life,
    attack: pokemon.attack,
    defense: pokemon.defense,
    speed: pokemon.speed,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((type) => type.name),
  }));

  return filteredPokemons;
};

const getPokeName = async (req, res) => {
  try {
    const { nameQ } = req.query;

    // Buscar el Pokémon en la base de datos por el nombre
    const pokemonFromDB = await Pokemon.findOne({
      where: {
        name: nameQ,
      },
      include: [Type],
    });
    if (pokemonFromDB) {
      const pokemon = {
        id: pokemonFromDB.id,
        name: pokemonFromDB.name,
        types: pokemonFromDB.types.map((type) => type.name),
        height: pokemonFromDB.height,
        weight: pokemonFromDB.weight,
        image: pokemonFromDB.image,
        life: pokemonFromDB.hp,
        attack: pokemonFromDB.attack,
        defense: pokemonFromDB.defense,
        speed: pokemonFromDB.speed,
      };
      res.json(pokemon);
    } else {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nameQ}`
      );
      const { id, name, types, height, weight, sprites, stats } = response.data;
      // Si el Pokémon no está en la base de datos, utilizar los datos de la API
      const pokemon = {
        id,
        name,
        types: types.map((type) => type.type.name),
        height,
        weight,
        image: sprites.other.dream_world.front_default,
        hp: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        speed: stats[5].base_stat,
      };
      res.json(pokemon);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getPokeId = async (req, res) => {
  try {
    const { id } = req.params;
    // Verificar si el id contiene letras
    const containsLetters = /[a-zA-Z]/.test(id);

    let pokemon;

    if (containsLetters) {
      // Buscar el Pokémon en la base de datos
      pokemon = await Pokemon.findOne({
        where: {
          id: id,
        },
        include: [Type],
      });
      if (!pokemon) {
        throw new Error("Pokémon no encontrado");
      }
    } else {
      // Obtener datos del pokemón desde la API según el id numérico
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokeData = response.data;
      pokemon = {
        id: pokeData.id,
        name: pokeData.name,
        types: pokeData.types.map((type) => type.type.name),
        height: pokeData.height,
        weight: pokeData.weight,
        image: pokeData.sprites.other.dream_world.front_default,
        hp: pokeData.stats[0].base_stat,
        attack: pokeData.stats[1].base_stat,
        defense: pokeData.stats[2].base_stat,
        speed: pokeData.stats[5].base_stat,
      };
    }
    res.json(pokemon);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const createPokemon = async (req, res) => {
  try {
    const { name, types, height, weight, image, hp, attack, defense, speed } =
      req.body;

    // 1. Crear el pokemon en la base de datos
    const newPokemon = await Pokemon.create({
      name,
      height,
      weight,
      image,
      life: hp,
      attack,
      defense,
      speed,
    });

    // 2. Obtener o crear (findOrCreate) los tipos desde la base de datos
    const typeDbPromises = types.map((typeName) =>
      Type.findOrCreate({ where: { name: typeName } })
    );
    const typeDbResults = await Promise.all(typeDbPromises);
    const typeDbInstances = typeDbResults.map((result) => result[0]);

    // 3. Asociar los tipos al Pokémon utilizando el método setTypes()
    await newPokemon.setTypes(typeDbInstances);

    res.json(newPokemon);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const containsLetters = /[a-zA-Z]/.test(id);
    if (containsLetters) {
      // Borrar pokemon de la base de datos
      const deletedCount = await Pokemon.destroy({
        where: {
          id: id,
        },
      });

      if (deletedCount === 0) {
        throw new Error("Pokémon no encontrado");
      }
      res.status(204).send(); // Devolver respuesta exitosa sin contenido
    } else {
      res
        .status(400)
        .send({ error: "No se puede borrar un Pokémon de la API externa" });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = {
  getPokemonsFromAPI,
  getPokeName,
  getPokeId,
  createPokemon,
  getPokemonsFromDB,
  deletePokemon,
};
