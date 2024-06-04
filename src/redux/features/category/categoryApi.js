import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: `/categories/get-all`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    //   deleteTable: builder.mutation({
    //     query: (ids) => ({
    //       url: `/tables/delete-table`,
    //       method: "DELETE",
    //       body: ids,
    //     }),
    //     invalidatesTags: ["Table"],
    //   }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/categories/update-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
