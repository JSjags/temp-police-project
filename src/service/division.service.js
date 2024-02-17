import { DIVISION_LIST } from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get division route
    getDivision: builder.query({
      query: () => ({
        url: DIVISION_LIST,
        method: "GET",
      }),
      providesTags: ["Division"],
    }),
  }),
});

export const { useGetDivisionQuery } = userApiSlice;
