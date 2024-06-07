import Member from "../../../../components/Member/Member";
import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { useGetAllMembersQuery } from "../../../../redux/features/member/memberApi";

const MaintainMembers = () => {
  const { data: members } = useGetAllMembersQuery({
    searchValue: "",
    spentValue: "",
    discountValue: "",
    pageValue: "",
    limitValue: "",
  });

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
