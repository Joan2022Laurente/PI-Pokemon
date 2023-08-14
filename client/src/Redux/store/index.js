import { createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import { typesReducer } from "../reducers/typesReducer";
import { pokemonReducer } from "../reducers/pokemonsReducer";

const rootReducer = combineReducers({
  types: typesReducer,
  pokemons: pokemonReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
