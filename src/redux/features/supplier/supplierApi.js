import { baseApi } from "../api/baseApi";

const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSuppliers: builder.query({
      query: ({ pageValue, limitValue, searchValue } = {}) => {
        let url = "/suppliers/get-all";
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
      providesTags: ["Supplier"],
    }),
    addSupplier: builder.mutation({
      query: (data) => ({
        url: "/suppliers/add-supplier",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Supplier"],
    }),
    // deleteTable: builder.mutation({
    //   query: (ids) => ({
    //     url: `/tables/delete-table`,
    //     method: "DELETE",
    //     body: ids,
    //   }),
    //   invalidatesTags: ["Table"],
    // }),
    // updateTable: builder.mutation({
    //   query: ({ id, ...data }) => ({
    //     url: `/tables/update-table/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Table"],
    // }),
  }),
});

export const {
  useGetAllSuppliersQuery,
  useAddSupplierMutation,
  //   useDeleteTableMutation,
  //   useUpdateTableMutation,
} = supplierApi;
