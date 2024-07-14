import { useLocation } from "react-router-dom";
import LocationPath from "../../components/LocationPath/LocationPath";
import TitleComponent from "../../components/TitleComponent/TitleComponent";

const ReportBugs = () => {
  const location = useLocation()
  return (
    <div>
       <TitleComponent title={LocationPath(location)} />
      <h1>Report Bugs</h1>
    </div>
  );
};

export default ReportBugs;
