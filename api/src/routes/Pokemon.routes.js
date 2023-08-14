const { Router } = require("express");
const {
  getPokemonsFromAPI,
  getPokeName,
  getPokeId,
  createPokemon,
  deletePokemon
} = require("../controllers/pokemonController.js");

const router = Router();

router.get("/", getPokemonsFromAPI);
router.get("/forName", getPokeName);
router.get("/forId/:id", getPokeId);
router.post("/create", createPokemon);
router.delete("/delete/:id", deletePokemon);
module.exports = router;
