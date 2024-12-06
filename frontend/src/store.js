import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";

console.log("Middleware from apiSlice:", apiSlice.middleware);

const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
console.log("Store State on Initialization:", store.getState());

export default store;
