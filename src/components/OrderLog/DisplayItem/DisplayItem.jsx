/* eslint-disable react/prop-types */
import CurrencyFormatter from "../../Currencyformatter/CurrencyFormatter";

const DisplayItem = ({
  filteredMenuItems,
  category,
  index,
  handleAddToCart,
  commonMenuItems,
}) => {
  const commonItemIds = commonMenuItems?.map((item) => item?.item_id);

  return (
    <>
      {filteredMenuItems
        ?.filter((item) => item?.category === category)
        .map((menuItem, i) => (
          <div
            onClick={() => handleAddToCart(menuItem)}
            key={menuItem?._id}
            className={`flex justify-between items-center py-4 shadow px-2 border-b border-gray-300 cursor-pointer hover:shadow hover:bg-blue-200 hover:text-red-700
              ${commonItemIds?.includes(menuItem?.item_id) ? "bg-blue-100" : ""}
            `}
          >
            <div className="flex font-bold text-black hover:text-red-700 text-base">
              <div>
                <p className="mr-1">{i + 1}.</p>
              </div>
              <div>
                <p className="wrapped-text capitalize hover:text-red-700">
                  {menuItem?.item_name}
                </p>
              </div>
            </div>
            <div>
              <button
                className={`hover:bg-opacity-70 px-2 py-1 text-white rounded-md text-base ${
                  index % 2 == 0 ? "bg-green-700" : "bg-[#c1622b]"
                } `}
              >
                <CurrencyFormatter value={menuItem?.item_price} />
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default DisplayItem;
