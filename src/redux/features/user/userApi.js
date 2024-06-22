import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ pageValue, limitValue, searchValue } = {}) => {
        let url = "/users/find-users";
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
      providesTags: ["User"],
    }),
    updateUserAvatar: builder.mutation({
      query: ({ id, avatar }) => {
        const formData = new FormData();
        formData.append("avatar", avatar);

        return {
          url: `/users/update-avatar/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    removeUserAvatar: builder.mutation({
      query: ({ id }) => ({
        url: `/users/remove-avatar/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: `/users/find-current-user`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // getSingleUserById: builder.query({
    //   query: ({ user_id = "" }) => ({
    //     url: `/users/find-user/${user_id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Users"],
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
  useGetCurrentUserQuery,
  //   useAddSoldInvoiceMutation,
  //   useGetSingleInvoiceByIdQuery,
  //   useDeleteMenuItemMutation,
  //   useUpdateMenuItemMutation,
  useUpdateUserAvatarMutation,
  useRemoveUserAvatarMutation,
} = userApi;
