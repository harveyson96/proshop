import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: 'POST',
        body: data
      }),
    }),
    
  }),
});
export const { postLoginMutation } =
usersApiSlice;
