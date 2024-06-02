/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const DownBar = ({ dark }) => {
  return (
    <div
      className={`h-[34px] flex items-center justify-center text-[#808489] text-[12px] px-2 ${
        dark ? "bg-[#1d242e]" : "bg-gray-200"
      }`}
    >
      <Link to="https://www.facebook.com/sajib.hossain.9803" target="_blank">
        Developed by Sajib &copy;{new Date().getFullYear()}{" "}
        <span className="ml-2">v2.1</span>
      </Link>
    </div>
  );
};

export default DownBar;
