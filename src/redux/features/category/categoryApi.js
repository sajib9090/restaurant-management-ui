import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({ pageValue, limitValue, searchValue } = {}) => {
        let url = "/categories/get-all";
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
      providesTags: ["Category", "MenuItem"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category", "MenuItem"],
    }),
    deleteCategory: builder.mutation({
      query: (ids) => ({
        url: `/categories/delete-category`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["Category", "MenuItem"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/categories/update-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category", "MenuItem"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
