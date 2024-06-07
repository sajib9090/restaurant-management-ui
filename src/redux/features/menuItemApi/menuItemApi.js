import { baseApi } from "../api/baseApi";

const menuItemApi = baseApi.injectEndpoints({
  tagTypes: ["MenuItem"],
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: ({ searchValue = "", categoryValue = "", priceFilterValue }) => ({
        url: `/menu-items/get-all?search=${searchValue}&category=${categoryValue}&price=${priceFilterValue}`,
        method: "GET",
      }),
      providesTags: ["MenuItem"],
    }),
    addMenuItem: builder.mutation({
      query: (data) => ({
        url: "/menu-items/create-menu-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MenuItem"],
    }),
    deleteMenuItem: builder.mutation({
      query: (ids) => ({
        url: `/menu-items/delete-menu-item`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["MenuItem"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/menu-items/update-menu-item/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["MenuItem"],
    }),
  }),
});

export const {
  useGetAllMenuItemsQuery,
  useAddMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
} = menuItemApi;
