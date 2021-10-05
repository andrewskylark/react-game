import { createSlice } from "@reduxjs/toolkit";
export const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        data: {},
    },
    reducers: {
        fetchUser: () => ({
            isLoading: true
        }),//initial state, loading true
        updateUser: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),//getting user
        removeUser: () => ({
            // ...state,
            isLoading: false,
            data: {},
        }),
    }
})
export const { fetchUser, updateUser, removeUser } = slice.actions;
export const getUserUpdateAsync = () => async (dispatch) => {
    const idToken = localStorage.getItem('idToken');

    if (idToken) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                idToken,
            })
        }
        const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB5F8VIr6hcBgKoQAN6yWJ-c145EiJmZdA', requestOptions).then(res => res.json());

        if (responce.hasOwnProperty('error')) {
            localStorage.removeItem('idToken');
            dispatch(removeUser());
        } else {
            dispatch(updateUser(responce.users[0]));
            console.log(responce.users[0])
        }
    } else {
        dispatch(removeUser());
    }
}
export const getUserAsync = () => async (dispatch) => {
    dispatch(fetchUser());//to know dispatch is set
    dispatch(getUserUpdateAsync());
}

export const selectUserLoading = state => state.user.isLoading;
export const selectUserData = state => state.user.data;
export const selectUserLocalID = state => state.user.data?.localId;
export default slice.reducer;