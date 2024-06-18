import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ pageValue = "", limitValue } = {}) => {
        let queryString = `/users/find-users?page=${pageValue}`;

        if (limitValue) {
          queryString += `&limit=${limitValue}`;
        }
        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),

    // getSingleInvoiceById: builder.query({
    //   query: ({ invoice_id = "" }) => ({
    //     url: `/sold-invoices/get-sold-invoice/${invoice_id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["SoldInvoice"],
    // }),
    // addSoldInvoice: builder.mutation({
    //   query: (data) => ({
    //     url: "/sold-invoices/add-sold-invoice",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["SoldInvoice", "Member"],
    // }),
    // deleteMenuItem: builder.mutation({
    //   query: (ids) => ({
    //     url: `/menu-items/delete-menu-item`,
    //     method: "DELETE",
    //     body: ids,
    //   }),
    //   invalidatesTags: ["MenuItem"],
    // }),
    // updateMenuItem: builder.mutation({
    //   query: ({ id, ...data }) => ({
    //     url: `/menu-items/update-menu-item/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["MenuItem"],
    // }),
  }),
});

export const {
  useGetAllUserQuery,
  //   useAddSoldInvoiceMutation,
  //   useGetSingleInvoiceByIdQuery,
  //   useDeleteMenuItemMutation,
  //   useUpdateMenuItemMutation,
} = userApi;
