import { baseApi } from "../api/baseApi";

const soldInvoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSellAlsoDateFilter: builder.query({
      query: ({
        pageValue,
        limitValue,
        date,
        start_date,
        end_date,
        month,
      } = {}) => {
        let url = "/sold-invoices/get-sold-invoices";
        const params = new URLSearchParams();

        if (pageValue) params.append("page", pageValue);
        if (limitValue) params.append("limit", limitValue);
        if (date) params.append("date", date);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (month) params.append("month", month);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return {
          url,
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
