import { baseApi } from "../api/baseApi";

const menuItemApi = baseApi.injectEndpoints({
  tagTypes: ["MenuItem"],
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: () => ({
        url: `/menu-items/get-all`,
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
    //   deleteTable: builder.mutation({
    //     query: (ids) => ({
    //       url: `/tables/delete-table`,
    //       method: "DELETE",
    //       body: ids,
    //     }),
    //     invalidatesTags: ["Table"],
    //   }),
    //   updateTable: builder.mutation({
    //     query: ({ id, ...data }) => ({
    //       url: `/tables/update-table/${id}`,
    //       method: "PATCH",
    //       body: data,
    //     }),
    //     invalidatesTags: ["Table"],
    //   }),
  }),
});

export const {
  useGetAllMenuItemsQuery,
  useAddMenuItemMutation,
  // useDeleteTableMutation,
  // useUpdateTableMutation,
} = menuItemApi;
