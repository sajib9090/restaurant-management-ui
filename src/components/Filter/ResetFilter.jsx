/* eslint-disable react/prop-types */
import { CiFilter } from "react-icons/ci";

const ResetFilter = ({ onClick }) => {
  return (
    <div className="mt-2 flex items-center justify-end absolute -bottom-7 right-0">
      <button
        onClick={onClick}
        className="flex items-center justify-center text-red-600 underline"
        title="reset filter"
      >
        <CiFilter className="h-6 w-6 mr-1" /> Reset filter
      </button>
    </div>
  );
};

export default ResetFilter;
