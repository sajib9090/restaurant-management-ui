/* eslint-disable react/prop-types */
import CurrencyFormatter from "../Currencyformatter/CurrencyFormatter";
import { MdDelete, MdEditSquare } from "react-icons/md";

const MenuList = ({ item, i }) => {
  return (
    <div className="flex justify-between items-center mt-4 pb-2 px-2 border-b border-gray-300 cursor-pointer">
      <div className="flex font-bold text-black text-sm">
        <div>
          <p className="">{i + 1}.</p>
        </div>
        <div>
          <p className="capitalize">{item?.item_name}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <button
            className="hover:bg-opacity-70 text-[14px] px-1 py-0.5 text-black rounded-md
            "
          >
            <CurrencyFormatter value={item?.item_price} />
          </button>
        </div>
        <div className="ml-3">
          <p className="text-xs">Discount</p>
          {item?.discount ? (
            <button className="bg-green-600 w-[30px] text-white rounded ml-2">
              On
            </button>
          ) : (
            <button className="bg-red-600 w-[30px] text-white rounded ml-2">
              Off
            </button>
          )}
        </div>
        <div className="ml-2 flex items-center space-x-4">
          <MdEditSquare
            title="Edit"
            className="h-5 w-5 text-blue-600 cursor-pointer"
          />
          <MdDelete
            title="Delete"
            className="h-6 w-6 text-red-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuList;
