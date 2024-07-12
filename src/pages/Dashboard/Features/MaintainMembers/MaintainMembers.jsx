import AccessError from "../../../../components/AccessError/AccessError";
import Member from "../../../../components/Member/Member";
import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { useGetAllMembersQuery } from "../../../../redux/features/member/memberApi";

const MaintainMembers = () => {
  const { data: members, error } = useGetAllMembersQuery({
    searchValue: "",
    spentValue: "",
    discountValue: "",
    pageValue: "",
    limitValue: "",
  });

  const allError = error;
  if (allError) {
    return (
      <AccessError
        errorMessage={allError?.data?.message || allError?.message}
      />
    );
  }

  return (
    <div>
      <StatisticsCard
        bg="bg-gray-200"
        title="Total Members"
        value={members?.data_found}
      />
      <Member />
    </div>
  );
};

export default MaintainMembers;
