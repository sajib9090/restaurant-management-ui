/* eslint-disable react/prop-types */
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import React, { useState } from "react";
import CurrencyFormatter from "../Currencyformatter/CurrencyFormatter";
import { CiFilter } from "react-icons/ci";
import {
  useDeleteMenuItemMutation,
  useGetAllMenuItemsQuery,
  useUpdateMenuItemMutation,
} from "../../redux/features/menuItemApi/menuItemApi";
import StatisticsCard from "../StatisticsCard/StatisticsCard";
import MenuItemTableHead from "./MenuItemTableHead";
import PrimaryError from "../PrimaryError/PrimaryError";
import {toast } from "sonner";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";
import CustomModal from "../Modal/Modal";
import { Popconfirm } from "antd";

const MenuCategory = ({ categoriesData }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [priceFilterValue, setPriceFilterValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEditItem, setSelectedEditItem] = useState({});
  const [editedItemName, setEditedItemName] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedDiscount, setEditedDiscount] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const {
    data: menuItems,
    isLoading: menuItemLoading,
    error: menuItemError,
  } = useGetAllMenuItemsQuery({ searchValue, categoryValue, priceFilterValue });

  const categories = menuItems?.data?.map((item) => item?.category);
  const uniqueCategories = [...new Set(categories)];

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    setCheckedItems((prev) => {
      if (checked) {
        return [...prev, item];
      } else {
        return prev.filter((i) => i !== item);
      }
    });
  };
  const [deleteMenuItem, { isLoading: deleteLoading }] =
    useDeleteMenuItemMutation();

  const handleDelete = async () => {
    const data = {
      ids: checkedItems,
    };

    try {
      const res = await deleteMenuItem(data).unwrap();
      if (res) {
        toast.success(`${checkedItems?.length} -Menu item has been deleted`);
        setCheckedItems([]);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const [updateMenuItem, { isLoading: updateLoading }] =
    useUpdateMenuItemMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      item_name: editedItemName,
      category: editedCategory,
      discount: editedDiscount,
      item_price: editedPrice,
    };
    try {
      const res = await updateMenuItem({
        id: selectedEditItem?._id,
        ...data,
      }).unwrap();
      if (res) {
        toast.success("Menu item has been updated");
        setCheckedItems([]);
        setIsModalOpen(false);
      }
    } catch (error) {
      setErrorMessage(error?.data?.message);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <StatisticsCard
          bg="bg-gray-200"
          title="Total Menu Items"
          value={menuItems?.data_found ? menuItems?.data_found : "0"}
        />
      </div>
      <div className="flex items-center justify-between mt-4 mb-10">
        <div className="search">
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCategoryValue("");
              setPriceFilterValue("");
            }}
            className="rounded"
            type="search"
            placeholder="Search..."
          />
        </div>

        {checkedItems?.length > 0 && (
          <Popconfirm
            title="Delete Staff"
            description="Are you sure you want to delete the selected staff?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
          >
            <button
              disabled={deleteLoading}
              className="h-[40px] w-[220px] border border-gray-300 text-red-500 text-lg rounded flex items-center justify-center gap-2 text-left"
            >
              {deleteLoading ? (
                <>
                  Deleting ...
                  <PrimaryLoading />
                </>
              ) : (
                <>
                  <DeleteFilled />
                  Delete Selected-({checkedItems?.length})
                </>
              )}
            </button>
          </Popconfirm>
        )}

        <div className="relative">
          <div className="space-y-2">
            <div className="selectOp flex items-center">
              <CiFilter className="h-6 w-6 mr-2" />
              <select
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                name=""
                id=""
                className="rounded px-2"
              >
                <option value="" selected disabled>
                  Filter with Category
                </option>
                {categoriesData?.data?.map((ui) => (
                  <option
                    key={ui?._id}
                    value={ui?.category}
                    className="capitalize"
                  >
                    {ui?.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="selectOp flex items-center">
              <CiFilter className="h-6 w-6 mr-2" />
              <select
                value={priceFilterValue}
                onChange={(e) => setPriceFilterValue(e.target.value)}
                name=""
                id=""
                className="rounded px-2"
              >
                <option value="" selected disabled>
                  Filter with Price
                </option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>

          {categoryValue || priceFilterValue ? (
            <div className="mt-2 flex items-center justify-end absolute right-2">
              <button
                onClick={() => {
                  setSearchValue("");
                  setCategoryValue("");
                  setPriceFilterValue("");
                }}
                className="flex items-center justify-center text-red-600 underline"
                title="reset filter"
              >
                <CiFilter className="h-6 w-6 mr-1" /> Reset filter
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {menuItems?.data?.length > 0 ? (
        <table className="min-w-full border-collapse block md:table">
          <MenuItemTableHead />
          <tbody className="block md:table-row-group">
            {uniqueCategories?.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className="bg-gray-100 border border-gray-200 md:border-none block md:table-row">
                  <td
                    className="p-2 text-left text-black font-bold md:border md:border-gray-300 block md:table-cell capitalize"
                    colSpan="4"
                  >
                    {category}
                  </td>
                </tr>
                {menuItems?.data
                  ?.filter((fItem) => fItem?.category === category)
                  .map((item, itemIndex) => (
                    <tr
                      key={itemIndex}
                      className={` border border-gray-200 md:border-none block md:table-row hover:bg-blue-100 ${
                        checkedItems?.includes(item?.item_id)
                          ? "bg-blue-200 hover:bg-blue-300 duration-500"
                          : "bg-white"
                      }`}
                    >
                      <td className="p-2 md:border md:border-gray-200 text-left block md:table-cell">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item?.item_id)}
                            onChange={(event) =>
                              handleCheckboxChange(event, item?.item_id)
                            }
                            className="h-5 w-5 mr-2 cursor-pointer"
                          />
                          <span className="capitalize">{item?.item_name}</span>
                        </div>
                      </td>
                      <td className="p-2 md:border md:border-gray-200 text-center block md:table-cell">
                        {item?.discount ? (
                          <button className="bg-green-600 w-[30px] text-white rounded ml-2">
                            On
                          </button>
                        ) : (
                          <button className="bg-red-600 w-[30px] text-white rounded ml-2">
                            Off
                          </button>
                        )}
                      </td>
                      <td className="p-2 md:border md:border-gray-200 text-center block md:table-cell">
                        {new Date(item?.createdAt).toLocaleString()}
                      </td>
                      <td className="p-2 md:border md:border-gray-200 text-end block md:table-cell">
                        <CurrencyFormatter value={item?.item_price} />
                      </td>
                      <td className="p-2 md:border md:border-gray-200 text-center block md:table-cell">
                        <button
                          onClick={() => {
                            setSelectedEditItem(item);
                            setIsModalOpen(!isModalOpen);
                            setEditedItemName("");
                            setEditedCategory("");
                            setEditedDiscount("");
                          }}
                          className="text-blue-600 text-xl"
                          title="Edit"
                        >
                          <EditFilled />
                        </button>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <PrimaryError
          message={
            menuItemError?.data?.message
              ? menuItemError?.data?.message
              : "Oops! no data found!"
          }
        />
      )}

      <CustomModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <form onSubmit={handleEdit} className="py-4">
          <div className="mb-4">
            <label className="block text-gray-700">Edit Item Name</label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              value={editedItemName}
              onChange={(e) => {
                setEditedItemName(e.target.value);
                setErrorMessage("");
              }}
              placeholder={selectedEditItem?.item_name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categoriesData?.data?.map((c) => (
                <option className="capitalize" key={c?._id} value={c.category}>
                  {c?.category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Discount</label>
            <select
              value={editedDiscount}
              onChange={(e) => setEditedDiscount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            >
              <option value="" disabled>
                Select Discount Option
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Edit Price</label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              value={editedPrice}
              onChange={(e) => {
                setEditedPrice(e.target.value);
                setErrorMessage("");
              }}
              placeholder={selectedEditItem?.item_price}
            />
          </div>

          <button
            disabled={
              updateLoading ||
              (!editedItemName &&
                !editedDiscount &&
                !editedCategory &&
                !editedPrice)
            }
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
              updateLoading && "cursor-not-allowed"
            }`}
          >
            {updateLoading ? <PrimaryLoading /> : "SAVE CHANGES"}
          </button>
        </form>
      </CustomModal>
    </div>
  );
};

export default MenuCategory;
