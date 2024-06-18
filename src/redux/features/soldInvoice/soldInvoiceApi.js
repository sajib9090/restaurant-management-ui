import { baseApi } from "../api/baseApi";

const soldInvoiceApi = baseApi.injectEndpoints({
  tagTypes: ["SoldInvoice"],
  endpoints: (builder) => ({
    getAllSellAlsoDateFilter: builder.query({
      query: ({
        pageValue = "",
        limitValue,
        date = "",
        start_date = "",
        end_date = "",
        month = "",
      } = {}) => {
        let queryString = `/sold-invoices/get-sold-invoices?page=${pageValue}`;

        if (limitValue) {
          queryString += `&limit=${limitValue}`;
        }

        if (date) {
          queryString += `&date=${date}`;
        }
        if (start_date && end_date) {
          queryString += `&start_date=${start_date}&end_date=${end_date}`;
        }
        if (month) {
          queryString += `&month=${month}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["SoldInvoice"],
    }),

    getSingleInvoiceById: builder.query({
      query: ({ invoice_id = "" }) => ({
        url: `/sold-invoices/get-sold-invoice/${invoice_id}`,
        method: "GET",
      }),
      providesTags: ["SoldInvoice"],
    }),
    addSoldInvoice: builder.mutation({
      query: (data) => ({
        url: "/sold-invoices/add-sold-invoice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SoldInvoice", "Member"],
    }),
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
  useGetAllSellAlsoDateFilterQuery,
  useAddSoldInvoiceMutation,
  useGetSingleInvoiceByIdQuery,
  //   useDeleteMenuItemMutation,
  //   useUpdateMenuItemMutation,
} = soldInvoiceApi;
