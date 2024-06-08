import { baseApi } from "../api/baseApi";

const staffApi = baseApi.injectEndpoints({
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getAllStaffs: builder.query({
      query: ({ searchValue = "", pageValue = "", limitValue } = {}) => {
        let queryString = `/staffs/get-all?search=${searchValue}`;
        if (pageValue) {
          queryString += `&page=${pageValue}`;
        }
        if (limitValue) {
          queryString += `&limit=${limitValue}`;
        }
        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["Staff"],
    }),
    addStaff: builder.mutation({
      query: (data) => ({
        url: "/staffs/create-staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: builder.mutation({
      query: (ids) => ({
        url: `/staffs/delete-staff`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetAllStaffsQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
} = staffApi;
