import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import userReducer from "./userSlice.js";
import statusSlice from "./statusSlice.js";

const rootReducers = combineReducers({
	user: userReducer,
    status: statusSlice
});
const persistConfig = {
	key: "persist-root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);


