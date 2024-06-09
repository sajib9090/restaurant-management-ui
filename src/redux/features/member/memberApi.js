import { baseApi } from "../api/baseApi";

const memberApi = baseApi.injectEndpoints({
  tagTypes: ["Member"],
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: ({
        searchValue = "",
        spentValue = "",
        discountValue = "",
        pageValue = "",
        limitValue = "",
      }) => ({
        url: `/members/get-all?limit=${limitValue}&page=${pageValue}&spent=${spentValue}&discount=${discountValue}&search=${searchValue}`,
        method: "GET",
      }),
      providesTags: ["Member"],
    }),
    getSingleMemberByMobile: builder.query({
      query: ({ mobile = "" }) => ({
        url: `/members/member/${mobile}`,
        method: "GET",
      }),
    }),
    addMember: builder.mutation({
      query: (data) => ({
        url: "/members/create-member",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Member"],
    }),
    deleteMember: builder.mutation({
      query: (ids) => ({
        url: `/members/delete-member`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["Member"],
    }),
    // updateMenuItem: builder.mutation({
    //   query: ({ id, ...data }) => ({
    //     url: `/menu-items/update-menu-item/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["MenuItem"],
    // }),
  }),
});

export const {
  useGetAllMembersQuery,
  useGetSingleMemberByMobileQuery,
  useAddMemberMutation,
  useDeleteMemberMutation,
  //   useUpdateMenuItemMutation,
} = memberApi;
