import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../service/firebase";

export const slice = createSlice ({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            isLoading: true
        }),//initial state, loading true
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),//getting pokemons
        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),//on error
    }
})

export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject} = slice.actions;
export const getPokemonsAsync = () => async (dispatch) => {
    dispatch(fetchPokemons());//to know dispatch is set
    const data = await FirebaseClass.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data));
}
export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;
export default slice.reducer;