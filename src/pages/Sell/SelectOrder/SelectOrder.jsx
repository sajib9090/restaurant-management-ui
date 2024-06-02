import { useParams } from "react-router-dom";

const SelectOrder = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1>Select order</h1>
    </div>
  );
};

export default SelectOrder;
