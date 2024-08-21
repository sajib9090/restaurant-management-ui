import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/auth-user-login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),
    }),
    verifyUser: builder.mutation({
      query: (data) => ({
        url: `/users/verify/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    regenerateOTP: builder.mutation({
      query: (id) => ({
        url: `/users/regenerate-otp/${id}`,
        method: "POST",
      }),
    }),
    logoutUser: builder.mutation({
      query: (data) => ({
        url: "/users/auth-user-logout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "User",
        "Brand",
        "Category",
        "Member",
        "MenuItem",
        "SoldInvoice",
        "Staff",
        "Table",
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyUserMutation,
  useRegenerateOTPMutation,
  useLogoutUserMutation,
} = authApi;
