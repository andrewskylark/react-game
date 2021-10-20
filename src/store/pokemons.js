import { createSlice } from "@reduxjs/toolkit";
import { selectUserLocalID } from "./user";

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
export const getPokemonsAsync = () => async (dispatch, getState) => {
    const localId = selectUserLocalID(getState());
    const idToken = localStorage.getItem('idToken');
    dispatch(fetchPokemons());//to know dispatch is set
    
    const data = await fetch(`https://react-game-1c6e1-default-rtdb.firebaseio.com/${localId}/pokemons.json?auth=${idToken}`).then(res => res.json());
    dispatch(fetchPokemonsResolve(data));
}
export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;
export default slice.reducer;