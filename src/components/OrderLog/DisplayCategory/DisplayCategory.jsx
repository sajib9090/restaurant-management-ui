/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addOrderMenuItem } from "../../../redux/features/OrderLog/orderLogSlice";
import DisplayItem from "../DisplayItem/DisplayItem";
import { useGetAllMenuItemsQuery } from "../../../redux/features/menuItemApi/menuItemApi";

const DisplayCategory = ({
  selectedStaff,
  table_name,
  searchValue,
  tableWiseOrder,
}) => {
  const dispatch = useDispatch();
  const { data: menuItems, isLoading: menuLoading } = useGetAllMenuItemsQuery();

  const filteredMenuItems = menuItems?.data?.filter((item) =>
    item?.item_name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const menuCategories = filteredMenuItems?.map((item) => item?.category);
  const uniqueCategories = [...new Set(menuCategories)];

  const handleAddToCart = (menu) => {
    if (!selectedStaff) {
      toast.error("Please select a staff first");
    } else {
      const data = {
        table: table_name,
        served_by: selectedStaff,
        ...menu,
      };
      dispatch(addOrderMenuItem(data));
      toast.success(`${menu?.item_name} - has been added`);
    }
  };

  const tableWiseOrderItemIds = tableWiseOrder?.map((item) => item?.item_id);

  const commonMenuItems = filteredMenuItems?.filter((item) =>
    tableWiseOrderItemIds?.includes(item?.item_id)
  );

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2 mt-6">
      {uniqueCategories
        ?.sort((a, b) => a?.localeCompare(b))
        .map((category, index) => (
          <div
            key={category}
            className="border border-gray-200 shadow-xl rounded-md"
          >
            <div
              className={`capitalize text-center rounded-md py-2 font-bold text-xl ${
                index === 0
                  ? "bg-[#070f17] bg-opacity-75 text-white"
                  : index === 1
                  ? "bg-[#502a14] bg-opacity-75 text-white"
                  : index === 2
                  ? "bg-[#21380e] bg-opacity-75 text-white"
                  : "bg-pink-700 bg-opacity-75 text-white"
              }`}
            >
              {category}
            </div>
            {/* display menu items by category */}
            <DisplayItem
              filteredMenuItems={filteredMenuItems}
              category={category}
              index={index}
              handleAddToCart={handleAddToCart}
              commonMenuItems={commonMenuItems}
            />
          </div>
        ))}
    </div>
  );
};

export default DisplayCategory;
