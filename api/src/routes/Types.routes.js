const { Router } = require("express");
const { getPokemonTypes } = require("../controllers/typesController");

const router = Router();

router.get("/", getPokemonTypes);

module.exports = router;