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
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: `/users/update-user-info`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    fetchCurrentUser: builder.mutation({
      query: () => ({
        url: `/users/find-current-user`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    addUserForMaintainBrand: builder.mutation({
      query: (data) => ({
        url: `/users/auth-create-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    changeOwnPassword: builder.mutation({
      query: (data) => ({
        url: `/users/change-own-password`,
        method: "PATCH",
        body: data,
      }),
    }),
    changeInfoByAuthority: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/change-user-credentials-by-authority/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserInfoMutation,
  useFetchCurrentUserMutation,
  useAddUserForMaintainBrandMutation,
  useDeleteUserMutation,
  useChangeOwnPasswordMutation,
  useChangeInfoByAuthorityMutation,
} = userApi;
