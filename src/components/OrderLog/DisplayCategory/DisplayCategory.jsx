/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addOrderMenuItem } from "../../../redux/features/OrderLog/orderLogSlice";
import DisplayItem from "../DisplayItem/DisplayItem";
import { useGetAllMenuItemsQuery } from "../../../redux/features/menuItemApi/menuItemApi";
import MenuItemSkeleton from "../../Skeleton/MenuItemSkeleton";

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
    const { createdAt, createdBy, ...menuCopy } = menu;
    if (!selectedStaff) {
      toast.error("Please select a staff first");
    } else {
      const data = {
        table: table_name,
        served_by: selectedStaff,
        ...menuCopy,
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
    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
      {menuLoading &&
        Array.from({ length: 4 }).map((_, i) => <MenuItemSkeleton key={i} />)}
      {uniqueCategories
        ?.sort((a, b) => a?.localeCompare(b))
        .map((category, index) => (
          <div
            key={category}
            className="border border-gray-200 shadow-lg rounded-md"
          >
            <div className="capitalize text-center rounded-t-md py-2 font-bold text-xl bg-gray-200 text-black border-t border-l border-r border-gray-400">
              {category}
            </div>
            <DisplayItem
              filteredMenuItems={filteredMenuItems}
              category={category}
              index={index}
              handleAddToCart={handleAddToCart}
              commonMenuItems={commonMenuItems}
              menuLoading={menuLoading}
            />
          </div>
        ))}
    </div>
  );
};

export default DisplayCategory;
