import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopsAPI = createApi({
  reducerPath: "shopsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["shops"],

  endpoints: (builder) => ({
    getShopsList: builder.query({
      query: () => ({
        url: "/shops",
        method: "GET",
      }),
      providesTags: ["shops"],
    }),

    getProductsByShopId: builder.query({
      query: (id) => ({
        url: `/shops/${id}`,
        method: "GET",
      }),
      providesTags: ["shops"],
    }),
  }),
});

export const { useGetShopsListQuery, useLazyGetProductsByShopIdQuery } =
  shopsAPI;
