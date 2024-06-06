import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: `/categories/get-all`,
        method: "GET",
      }),
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
