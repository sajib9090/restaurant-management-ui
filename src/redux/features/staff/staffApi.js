import { baseApi } from "../api/baseApi";

const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStaffs: builder.query({
      query: ({ searchValue, pageValue, limitValue } = {}) => {
        let url = "/staffs/get-all";
        const params = new URLSearchParams();

        if (searchValue) params.append("search", searchValue);
        if (pageValue) params.append("page", pageValue);
        if (limitValue) params.append("limit", limitValue);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return {
          url,
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
