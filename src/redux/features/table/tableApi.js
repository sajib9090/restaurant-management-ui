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
    //   addCategory: builder.mutation({
    //     query: (data) => ({
    //       url: "/categories/create-category",
    //       method: "POST",
    //       body: data,
    //     }),
    //     invalidatesTags: ["Category"],
    //   }),
  }),
});

export const { useGetAllTablesQuery } = tableApi;
