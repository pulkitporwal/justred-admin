import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;
			console.log(action.payload)
			state.error = null;
		},
		logout: (state) => {
			state.currentUser = null;
			state.error = null;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { setUser, logout, setError } = userSlice.actions;
export default userSlice.reducer;
