/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CustomModal from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";
import CurrencyFormatter from "../../Currencyformatter/CurrencyFormatter";
import { DeleteFilled } from "@ant-design/icons";
import { PiBagFill } from "react-icons/pi";
import {
  decreaseMenuItemQuantity,
  increaseMenuItemQuantity,
  removeSingleMenuItem,
} from "../../../redux/features/OrderLog/orderLogSlice";
import PrimaryInvoiceFooter from "../PrimaryInvoice/PrimaryInvoiceFooter";
import PrimaryError from "../../PrimaryError/PrimaryError";

const DisplayOrderInvoice = ({
  tableWiseOrderQuantity,
  tableWiseOrder,
  table_name,
  selectedStaff,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector(currentUser);
  const dispatch = useDispatch();

  const categories = tableWiseOrder?.map((item) => item?.category);
  const uniqueCategories = [...new Set(categories)];

  const handleRemoveCartItem = (item) => {
    dispatch(removeSingleMenuItem(item));
  };

  const handleIncreaseItemQuantity = (item) => {
    dispatch(increaseMenuItemQuantity(item));
  };

  const handleDecreaseItemQuantity = (item) => {
    dispatch(decreaseMenuItemQuantity(item));
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="py-2 px-2 bg-gradient-to-r from-gray-400 to-indigo-500 text-lg font-semibold rounded-md flex sticky top-6 z-50"
      >
        Check Invoice{" "}
        <p className="ml-2 px-2 bg-blue-300 rounded-full">
          {tableWiseOrderQuantity}
        </p>
      </button>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        width={"750px"}
      >
        <div className="bg-gray-50 rounded-lg">
          <div className="text-center mb-6 capitalize">
            <h2 className="text-3xl font-bold text-indigo-600">
              {user?.brand?.brand_name}
            </h2>
            <p className="font-medium text-lg text-gray-700">{table_name}</p>
          </div>
          {tableWiseOrder?.length > 0 ? (
            <div className="p-4 bg-white rounded-lg">
              <div className="text-base font-semibold text-gray-800 mb-4 flex items-center justify-between">
                <p>
                  Served by: <span className="capitalize">{selectedStaff}</span>
                </p>
                <p>Total item-{tableWiseOrder?.length}</p>
              </div>

              <div className="mb-6">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-indigo-100 border-b text-left text-indigo-800">
                        Item
                      </th>
                      <th className="py-2 px-4 bg-indigo-100 border-b text-center w-[15%] text-indigo-800">
                        Quantity
                      </th>
                      <th className="py-2 px-4 bg-indigo-100 border-b text-right w-[13%] text-indigo-800">
                        Price
                      </th>
                      <th className="py-2 px-4 bg-indigo-100 border-b text-center w-[5%]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueCategories
                      ?.sort((a, b) => a?.localeCompare(b))
                      .map((category, categoryIndex) => (
                        <React.Fragment key={categoryIndex}>
                          <tr className="bg-gray-100 border-b border-gray-200 md:border-none block md:table-row">
                            <td
                              className="py-3 px-4 capitalize font-bold"
                              colSpan="4"
                            >
                              {category}
                            </td>
                          </tr>

                          {tableWiseOrder
                            ?.filter((item) => item?.category === category)
                            ?.sort((a, b) =>
                              a?.item_name?.localeCompare(b?.item_name)
                            )
                            .map((item) => (
                              <tr
                                key={item?._id}
                                className={`border-b ${
                                  item?.discount ? "" : "bg-[#f991e936]"
                                }`}
                              >
                                <td className="py-3 px-4 capitalize">
                                  {item?.item_name}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  <div className="flex items-center justify-center">
                                    <button
                                      onClick={() =>
                                        handleDecreaseItemQuantity(item)
                                      }
                                      className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                      -
                                    </button>
                                    <span className="mx-2">
                                      {item?.item_quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleIncreaseItemQuantity(item)
                                      }
                                      className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="py-2 px-4 text-right">
                                  <CurrencyFormatter
                                    value={
                                      item?.item_price * item?.item_quantity
                                    }
                                  />
                                </td>
                                <td
                                  onClick={() => handleRemoveCartItem(item)}
                                  className="py-2 px-4 text-center text-xl text-red-600 cursor-pointer"
                                >
                                  <DeleteFilled />
                                </td>
                              </tr>
                            ))}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>

              <button className="w-[120px] py-2 mb-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded shadow transition duration-200 flex items-center justify-center">
                Remove All <PiBagFill className="ml-2 h-5 w-5 text-gray-200" />
              </button>

              <PrimaryInvoiceFooter
                tableWiseOrder={tableWiseOrder}
                selectedStaff={selectedStaff}
                table_name={table_name}
              />
            </div>
          ) : (
            <div className="my-6">
              <PrimaryError message="Oops! No data found." />
            </div>
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default DisplayOrderInvoice;
