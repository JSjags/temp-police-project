import { CASES } from "./constants";
import apiSlice from "./api/apiSlice";

export const casesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get division route
    getCases: builder.query({
      query: () => ({
        url: CASES,
        method: "GET",
      }),
      providesTags: ["Cases"],
    }),
  }),
});

export const { useGetCasesQuery } = casesApiSlice;
