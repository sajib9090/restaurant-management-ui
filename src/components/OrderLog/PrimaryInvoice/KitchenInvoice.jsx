/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import CustomModal from "../../Modal/Modal";
import CurrencyFormatter from "../../Currencyformatter/CurrencyFormatter";
import ReactToPrint from "react-to-print";
import DateFormatter from "../../DateFormatter/DateFormatter";

const KitchenInvoice = ({ tableWiseOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef();
  const [tempTableWiseOrder, setTempTableWiseOrder] = useState([]);
  const [tempSelectedItem, setTempSelectedItem] = useState([]);

  const totalBill = tempTableWiseOrder?.reduce(
    (total, item) => total + item?.item_quantity * item?.item_price,
    0
  );

  const handleCross = (item) => {
    setTempSelectedItem((prev) => [...prev, item]);
  };

  const handleReload = () => {
    setTempSelectedItem([]);
    setTempTableWiseOrder(tableWiseOrder);
  };

  const handleKitchenDecrease = (item) => {
    if (item?.item_quantity > 1) {
      const updatedCart = tempTableWiseOrder?.map((cartItem) => {
        if (cartItem?._id === item?._id) {
          return {
            ...cartItem,
            item_quantity: cartItem?.item_quantity - 1,
          };
        }
        return cartItem;
      });
      setTempTableWiseOrder(updatedCart);
    }
  };

  const handleKitchenIncrease = (item) => {
    const updatedCart = tempTableWiseOrder?.map((cartItem) => {
      if (cartItem?._id === item?._id) {
        return {
          ...cartItem,
          item_quantity: cartItem?.item_quantity + 1,
        };
      }
      return cartItem;
    });
    setTempTableWiseOrder(updatedCart);
  };

  useEffect(() => {
    const updatedFilteredCart = tableWiseOrder?.filter(
      (item) => !tempSelectedItem?.includes(item)
    );
    setTempTableWiseOrder(updatedFilteredCart);
  }, [tableWiseOrder, tempSelectedItem]);

  useEffect(() => {
    setTempTableWiseOrder(tableWiseOrder);
  }, [tableWiseOrder]);

  return (
    <>
      <button
        onMouseEnter={handleReload}
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="px-4 py-2 bg-orange-600 text-white rounded shadow hover:bg-orange-700 transition duration-200"
      >
        Kitchen Copy
      </button>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        width={"370px"}
      >
        <div className="w-[310px] mx-auto mt-6">
          <div ref={componentRef} className="p-4 min-h-[400px]">
            <h1 className="text-center font-bold text-xl">Food Republic</h1>
            <h1 className="text-center font-semibold text-base mb-1 capitalize">
              {name}
            </h1>

            <div className="text-center text-[10px]">
              <DateFormatter dateString={new Date()} />
            </div>
            <h1 className="text-center font-bold">Kitchen Copy</h1>
            <div>
              <div className="min-h-[30px] border-b border-black flex items-center justify-between text-xs mt-2">
                <div>Items</div>
                <div className="flex items-center">
                  <p>Quantity</p>
                  <p className="mr-1 ml-6">Price</p>
                </div>
              </div>
              <div>
                {tempTableWiseOrder
                  ?.sort((a, b) => a?.item_name?.localeCompare(b?.item_name))
                  .map((item, index) => (
                    <div
                      key={item._id}
                      className="min-h-[30px] w-full border-b border-gray-500 flex items-center cursor-pointer justify-between text-[10px]"
                    >
                      <div
                        onClick={() => handleCross(item)}
                        className="flex items-center min-w-[65%]"
                      >
                        <p className="">{index + 1}.</p>
                        <p className="wrapped-text capitalize">
                          {item.item_name}
                        </p>
                      </div>
                      <div className="flex items-center min-w-[35%]">
                        <div className="ml-auto flex min-w-[40%]">
                          <button
                            onClick={() => handleKitchenDecrease(item)}
                            className="px-1 bg-gray-200"
                          >
                            -
                          </button>
                          <button className=" text-black px-1">
                            {item?.item_quantity}
                          </button>
                          <button
                            onClick={() => handleKitchenIncrease(item)}
                            className="px-1 bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-black min-w-[60%] flex justify-end">
                          <CurrencyFormatter
                            value={item?.item_price * item?.item_quantity}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="text-base font-semibold mt-1">
                <h1 className="flex justify-end">
                  Total Price:{" "}
                  <span className="ml-2">
                    <CurrencyFormatter value={totalBill} />
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="text-center space-x-4 my-4">
            <ReactToPrint
              trigger={() => (
                <button className="h-[40px] w-[160px] bg-blue-500 rounded-md text-white">
                  Print Kitchen Copy
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default KitchenInvoice;
