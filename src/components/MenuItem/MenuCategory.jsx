/* eslint-disable react/prop-types */
import MenuList from "./MenuList";

const MenuCategory = ({ uniqueCategories, menuItems }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-1">
      {uniqueCategories?.map((category, index) => {
        return (
          <div
            key={index}
            className="w-full border border-gray-300 rounded-md"
          >
            <div
              className="capitalize text-center rounded-t py-2 font-bold text-lg
                  bg-[#001529] bg-opacity-75 text-white"
            >
              {category}
            </div>

            {menuItems?.data
              ?.filter((menuItem) => menuItem?.category === category)
              .map((item, i) => {
                return <MenuList key={item?._id} item={item} i={i} />;
              })}
          </div>
        );
      })}
    </div>
  );
};

export default MenuCategory;
