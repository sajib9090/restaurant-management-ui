import { baseApi } from "../api/baseApi";

const menuItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: ({
        searchValue,
        pageValue,
        limitValue,
        categoryValue,
        priceFilterValue,
      } = {}) => {
        let url = "/menu-items/get-all";
        const params = new URLSearchParams();

        if (searchValue) params.append("search", searchValue);
        if (pageValue) params.append("page", pageValue);
        if (limitValue) params.append("limit", limitValue);
        if (categoryValue) params.append("category", categoryValue);
        if (priceFilterValue) params.append("price", priceFilterValue);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return {
          url,
          method: "GET",
        };
      },
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
