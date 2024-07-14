import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../auth/authSlice";

// const baseUrl = "https://restaurant-management-backend-tau.vercel.app/api/v2";
// const baseUrl =
("https://restaurant-management-backend-mrse.onrender.com/api/v2");
// const baseUrl = "http://localhost:8000/api/v2";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 423) {
    api.dispatch(logout());
  }
  if (result?.error?.status === 401) {
    const res = await fetch(`${baseUrl}/users/auth-manage-token`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res?.json();
    if (data?.accessToken) {
      //getting user
      const user = api.getState().auth.user;
      api.dispatch(
        setUser({
          user,
          token: data?.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "Category",
    "Member",
    "MenuItem",
    "SoldInvoice",
    "Staff",
    "Table",
    "User",
    "Brand",
    "Plan",
    // "Bkash",
  ],
  endpoints: () => ({}),
});
