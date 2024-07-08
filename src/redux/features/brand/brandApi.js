import { baseApi } from "../api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateBrandLogo: builder.mutation({
      query: ({ brandLogo }) => {
        const formData = new FormData();
        formData.append("brandLogo", brandLogo);

        return {
          url: `/brands/update-brand-logo`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Brand", "User"],
    }),
    updateBrandInfo: builder.mutation({
      query: (data) => ({
        url: `/brands/update-info`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Brand", "User"],
    }),
    getCurrentBrandInfo: builder.query({
      query: () => ({
        url: `/brands/current-brand`,
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetCurrentBrandInfoQuery,
  useUpdateBrandLogoMutation,
  useUpdateBrandInfoMutation,
} = brandApi;
