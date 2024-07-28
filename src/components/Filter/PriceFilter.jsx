/* eslint-disable react/prop-types */
import { CiFilter } from "react-icons/ci";

const PriceFilter = ({ value, onChange, placeholder }) => {
  return (
    <div className="selectOp flex items-center">
      <CiFilter className="h-6 w-6 mr-2" />
      <select
        value={value}
        onChange={onChange}
        name=""
        id=""
        className="rounded px-2"
      >
        <option value="" selected disabled>
          {placeholder}
        </option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>
    </div>
  );
};

export default PriceFilter;
