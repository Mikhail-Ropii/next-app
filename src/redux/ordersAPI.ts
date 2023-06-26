import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersAPI = createApi({
  reducerPath: "ordersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["orders"],

  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),

    getOrdersByUser: builder.query({
      query: ({ email, phone }) => ({
        url: "/orders",
        params: { email, phone },
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrdersByUserQuery,
  useLazyGetOrdersByUserQuery,
} = ordersAPI;
