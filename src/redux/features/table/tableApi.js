import { baseApi } from "../api/baseApi";

const tableApi = baseApi.injectEndpoints({
  tagTypes: ["Table"],
  endpoints: (builder) => ({
    getAllTables: builder.query({
      query: () => ({
        url: "/tables/get-all",
        method: "GET",
      }),
      providesTags: ["Table"],
    }),
    addTable: builder.mutation({
      query: (data) => ({
        url: "/tables/create-table",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Table"],
    }),
  }),
});

export const { useGetAllTablesQuery, useAddTableMutation } = tableApi;
