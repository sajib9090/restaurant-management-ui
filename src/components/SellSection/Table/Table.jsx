/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import tableIcon from "../../../assets/image/table/8508747_eating_placesrestaurant_table_restaurant_food_icon.png";
import { Link } from "react-router-dom";
import { selectedStaffs } from "../../../redux/features/OrderLog/orderLogSlice";
import LiveTimeCounter from "../../LiveTimeCounter/LiveTimeCounter";

// bg-gradient-to-r from-red-300 to-pink-300

const Table = ({ link, title, tableSlug }) => {
  const orderStaff = useSelector(selectedStaffs);
  const orderedTable = orderStaff?.map((table) => table?.table);

  const getInsideInformation = (data, field) => {
    if (data) {
      const findData = orderStaff?.find((item) => item?.table === data);
      const info = findData ? findData[field] : "";
      return info;
    }
    return "";
  };

  return (
    <Link
      to={link}
      className={`h-[200px] border border-gray-200 rounded-full shadow-xl flex flex-col justify-center items-center cursor-pointer transition-all hover:bg-blue-100 ${
        orderedTable?.includes(tableSlug)
          ? "bg-gradient-to-r from-[#ffdd1a86] to-[#ff730076]"
          : ""
      }`}
    >
      <div className="h-10 w-10 mb-2">
        <img src={tableIcon} alt="table" />
      </div>
      <h1 className="text-sm font-bold capitalize text-black">{title}</h1>
      <div className="text-sm text-gray-600 mt-1">
        {getInsideInformation(tableSlug, "staffName") && (
          <p className="capitalize text-center">
            Pending by-{" "}
            <span className="text-purple-900 font-bold text-xs">
              {getInsideInformation(tableSlug, "staffName")}
            </span>
          </p>
        )}
        {getInsideInformation(tableSlug, "createdAt") && (
          <div className="text-center text-[10px] text-red-900 font-normal">
            <LiveTimeCounter
              startTime={getInsideInformation(tableSlug, "createdAt")}
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default Table;
