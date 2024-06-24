import { baseApi } from "../api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllUser: builder.query({
    //   query: ({ pageValue, limitValue, searchValue } = {}) => {
    //     let url = "/users/find-users";
    //     const params = new URLSearchParams();

    //     if (searchValue) params.append("search", searchValue);
    //     if (limitValue) params.append("limit", limitValue);
    //     if (pageValue) params.append("page", pageValue);

    //     if (params.toString()) {
    //       url += `?${params.toString()}`;
    //     }

    //     return {
    //       url,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["User"],
    // }),
    updateBrandLogo: builder.mutation({
      query: ({brandLogo }) => {
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
      query: (data ) => ({
        url: `/brands/update-info`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Brand", "User"],
    }),
  }),
});

export const {
  //   useGetAllUserQuery,
  useUpdateBrandLogoMutation,
  useUpdateBrandInfoMutation,
} = brandApi;
