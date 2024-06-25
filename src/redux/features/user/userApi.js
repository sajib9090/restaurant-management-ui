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
    fetchCurrentUser: builder.mutation({
      query: () => ({
        url: `/users/find-current-user`,
        method: "POST",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserAvatarMutation,
  useFetchCurrentUserMutation,
} = userApi;
