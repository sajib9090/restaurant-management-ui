import { baseApi } from "../api/baseApi";

const tableApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTables: builder.query({
      query: ({ pageValue, limitValue, searchValue } = {}) => {
        let url = "/tables/get-all";
        const params = new URLSearchParams();

        if (searchValue) params.append("search", searchValue);
        if (limitValue) params.append("limit", limitValue);
        if (pageValue) params.append("page", pageValue);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return {
          url,
          method: "GET",
        };
      },
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
    deleteTable: builder.mutation({
      query: (ids) => ({
        url: `/tables/delete-table`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["Table"],
    }),
    updateTable: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/tables/update-table/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Table"],
    }),
  }),
});

export const {
  useGetAllTablesQuery,
  useAddTableMutation,
  useDeleteTableMutation,
  useUpdateTableMutation,
} = tableApi;
