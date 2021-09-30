import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice ({
    name: 'player2Cards',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPlayer2Cards: state => ({
            ...state,
            isLoading: true
        }),//initial state, loading true
        fetchPlayer2CardsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),//getting pokemons
        fetchPlayer2CardsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),//on error
    }
})

export const {fetchPlayer2Cards, fetchPlayer2CardsResolve, fetchPlayer2CardsReject} = slice.actions;
export const getPlayer2CardsAsync = (data) => async (dispatch) => {
    dispatch(fetchPlayer2Cards());//to know dispatch is set
    dispatch(fetchPlayer2CardsResolve(data));
}
export const selectPlayer2CardsLoading = state => state.player2Cards.isLoading;
export const selectPlayer2CardsData = state => state.player2Cards.data;
export default slice.reducer;