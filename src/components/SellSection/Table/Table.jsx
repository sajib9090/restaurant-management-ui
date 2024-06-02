/* eslint-disable react/prop-types */
import tableIcon from "../../../../public/image/table/8508747_eating_placesrestaurant_table_restaurant_food_icon.png";
import { Link } from "react-router-dom";

// bg-gradient-to-r from-red-300 to-pink-300

const Table = ({ link, title }) => {
  return (
    <Link
      to={link}
      className="h-[200px] border border-gray-200 rounded-full shadow-xl flex flex-col justify-center items-center cursor-pointer hover:bg-gradient-to-r hover:from-[#603f83be] hover:to-[#c7d3d4d3] bg-gradient-to-r from-white to-gray-200 transition-all hover:text-white"
    >
      <div className="h-12 w-12 mb-2">
        <img src={tableIcon} alt="table" />
      </div>
      <h1 className="text-lg font-bold uppercase">{title}</h1>
      <div className="text-sm text-gray-600 mt-1">
        <p className="capitalize text-center">
          Pending by-{" "}
          <span className="text-purple-900 font-extrabold">Elon Musk</span>
        </p>
        <div className="text-center text-xs text-red-900 font-normal">
          {/* <LiveTimeCounter/> */}
        </div>
      </div>
    </Link>
  );
};

export default Table;
