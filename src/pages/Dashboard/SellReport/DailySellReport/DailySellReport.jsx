import { useParams } from "react-router-dom";

const DailySellReport = () => {
  const params = useParams()
  console.log(params);
  return (
    <div>
      <h1>Daily sell report</h1>
    </div>
  );
};

export default DailySellReport;
