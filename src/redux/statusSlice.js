import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
};

const statusSlice = createSlice({
	name: "status",
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		stopLoading: (state) => {
			state.loading = false;
		},
		setError: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
});

export const { startLoading, stopLoading, setError, clearError } =
	statusSlice.actions;
export default statusSlice.reducer;
