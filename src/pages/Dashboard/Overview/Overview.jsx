import { useLocation } from "react-router-dom";
import LocationPath from "../../../components/LocationPath/LocationPath";
import TitleComponent from "../../../components/TitleComponent/TitleComponent";

const Overview = () => {
  const location = useLocation();
  return (
    <div>
      <TitleComponent title={LocationPath(location)} />
      <h1>Overview upcoming...</h1>
    </div>
  );
};

export default Overview;
