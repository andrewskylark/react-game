import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from './pokemons'
import chosenPokemonsReducer from "./chosenPokemons";
import player2CardsReducer from "./player2Cards";

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        chosenPokemons: chosenPokemonsReducer,
        player2Cards: player2CardsReducer,
    }
})