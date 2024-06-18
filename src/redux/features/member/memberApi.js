import { baseApi } from "../api/baseApi";

const memberApi = baseApi.injectEndpoints({
  tagTypes: ["Member"],
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: ({
        searchValue,
        spentValue,
        discountValue,
        pageValue,
        limitValue,
      }) => {
        let url = "/members/get-all";
        const params = new URLSearchParams();

        if (searchValue) params.append("search", searchValue);
        if (spentValue) params.append("spent", spentValue);
        if (discountValue) params.append("discount", discountValue);
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
      providesTags: ["Member"],
    }),
    getSingleMemberByMobile: builder.query({
      query: ({ mobile = "" }) => ({
        url: `/members/member/${mobile}`,
        method: "GET",
      }),
      providesTags: ["Member"],
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
    updateMember: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/members/update-member/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Member"],
    }),
  }),
});

export const {
  useGetAllMembersQuery,
  useGetSingleMemberByMobileQuery,
  useAddMemberMutation,
  useDeleteMemberMutation,
  useUpdateMemberMutation,
} = memberApi;
