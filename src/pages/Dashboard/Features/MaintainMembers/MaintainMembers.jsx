import { useLocation } from "react-router-dom";
import LocationPath from "../../../../components/LocationPath/LocationPath";
import Member from "../../../../components/Member/Member";
import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import TitleComponent from "../../../../components/TitleComponent/TitleComponent";
import { useGetAllMembersQuery } from "../../../../redux/features/member/memberApi";

const MaintainMembers = () => {
  const location = useLocation();
  const { data: members } = useGetAllMembersQuery({
    searchValue: "",
    spentValue: "",
    discountValue: "",
    pageValue: "",
    limitValue: "",
  });



  return (
    <div>
      <TitleComponent
        title={`${LocationPath(location)}-(${members?.data_found || 0})`}
      />

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
