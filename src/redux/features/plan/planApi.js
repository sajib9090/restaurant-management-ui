import { baseApi } from "../api/baseApi";

const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlans: builder.query({
      query: () => {
        return {
          url: "/plans/get-all",
          method: "GET",
        };
      },
      providesTags: ["Plan"],
    }),
    getSinglePlan: builder.query({
      query: (id) => {
        return {
          url: `/plans/get/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Plan"],
    }),
    addPlan: builder.mutation({
      query: (data) => ({
        url: "/plans/create-plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Plan"],
    }),
    purchasePlan: builder.mutation({
      query: (data) => ({
        url: "/plans/purchase-plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Plan", "Brand"],
    }),
    // deleteStaff: builder.mutation({
    //   query: (ids) => ({
    //     url: `/staffs/delete-staff`,
    //     method: "DELETE",
    //     body: ids,
    //   }),
    //   invalidatesTags: ["Staff"],
    // }),
  }),
});

export const {
  useGetAllPlansQuery,
  useGetSinglePlanQuery,
  useAddPlanMutation,
  usePurchasePlanMutation,
  //   useDeleteStaffMutation,
} = planApi;
