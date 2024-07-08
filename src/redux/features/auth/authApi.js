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

export const { useLoginMutation, useRegisterMutation, useLogoutUserMutation } =
  authApi;
