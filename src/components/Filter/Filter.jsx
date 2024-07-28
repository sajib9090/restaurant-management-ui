/* eslint-disable react/prop-types */
import { CiFilter } from "react-icons/ci";

const Filter = ({ value, onChange, loading, data, placeholder }) => {
  return (
    <div className="selectOp flex items-center">
      <CiFilter className="h-6 w-6 mr-2" />
      <select
        value={value}
        onChange={onChange}
        name=""
        id=""
        className="rounded px-2"
        disabled={loading}
      >
        <option value="" selected disabled>
          {loading ? "Please wait..." : placeholder}
        </option>
        {data}
      </select>
    </div>
  );
};

export default Filter;
