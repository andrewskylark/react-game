import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice ({
    name: 'chosenPokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchChosenPokemons: state => ({
            ...state,
            isLoading: true
        }),//initial state, loading true
        fetchChosenPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),//getting pokemons
        fetchChosenPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),//on error
    }
})

export const {fetchChosenPokemons, fetchChosenPokemonsResolve, fetchChosenPokemonsReject} = slice.actions;
export const getChosenPokemonsAsync = (data) => async (dispatch) => {
    dispatch(fetchChosenPokemons());//to know dispatch is set
    dispatch(fetchChosenPokemonsResolve(data));
}
export const selectChosenPokemonsLoading = state => state.chosenPokemons.isLoading;
export const selectChosenPokemonsData = state => state.chosenPokemons.data;
export default slice.reducer;