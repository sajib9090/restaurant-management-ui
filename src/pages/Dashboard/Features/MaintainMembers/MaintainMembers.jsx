import { useLocation } from "react-router-dom";
import LocationPath from "../../../../components/LocationPath/LocationPath";
import Member from "../../../../components/Member/Member";
import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import TitleComponent from "../../../../components/TitleComponent/TitleComponent";
import { useState } from "react";

const MaintainMembers = () => {
  const location = useLocation();
  const [totalMember, setTotalMember] = useState(0);
  return (
    <div>
      <TitleComponent
        title={`${LocationPath(location)}-(${totalMember || 0})`}
      />

      <StatisticsCard
        bg="bg-gray-200"
        title="Total Members"
        value={totalMember}
      />

      <Member setTotalMember={setTotalMember} />
    </div>
  );
};

export default MaintainMembers;
