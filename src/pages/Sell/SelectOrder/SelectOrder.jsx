import { useParams } from "react-router-dom";

const SelectOrder = () => {
  const { name } = useParams();
  console.log(name);
  return (
    <div>
      <h1>Select order</h1>
    </div>
  );
};

export default SelectOrder;
