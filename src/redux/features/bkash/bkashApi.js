// import { baseApi } from "../api/baseApi";

// const bkashApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // getAllPlans: builder.query({
//     //   query: () => {
//     //     return {
//     //       url: "/plans/get-all",
//     //       method: "GET",
//     //     };
//     //   },
//     //   providesTags: ["Plan"],
//     // }),
//     // getSinglePlan: builder.query({
//     //   query: (id) => {
//     //     return {
//     //       url: `/plans/get/${id}`,
//     //       method: "GET",
//     //     };
//     //   },
//     //   providesTags: ["Plan"],
//     // }),
//     createPayment: builder.mutation({
//       query: (data) => ({
//         url: "/bkash/payment/create",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Bkash"],
//     }),
//     // deleteStaff: builder.mutation({
//     //   query: (ids) => ({
//     //     url: `/staffs/delete-staff`,
//     //     method: "DELETE",
//     //     body: ids,
//     //   }),
//     //   invalidatesTags: ["Staff"],
//     // }),
//   }),
// });

// export const {
//   //   useGetAllPlansQuery,
//   //   useGetSinglePlanQuery,
//   useCreatePaymentMutation,
//   //   useDeleteStaffMutation,
// } = bkashApi;
