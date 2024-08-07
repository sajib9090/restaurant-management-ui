/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import CustomModal from "../../Modal/Modal";
import CurrencyFormatter from "../../Currencyformatter/CurrencyFormatter";
import ReactToPrint from "react-to-print";
import DateFormatter from "../../DateFormatter/DateFormatter";
import brandLogo from "../../../assets/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";

const CustomerInvoice = ({
  tableWiseOrder,
  totalDiscount,
  totalBill,
  selectedStaff,
  user,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef();

  console.log(user);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
      >
        Customer Copy
      </button>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        width={"400px"}
        closeSymbolFalse={true}
      >
        <div className="w-full max-w-[310px] mx-auto">
          <div
            ref={componentRef}
            className="w-full max-w-[310px] min-h-[300px] pb-1"
          >
            <div className="text-center mt-6">
              <div className="mx-auto w-full">
                <img
                  src={user?.brand?.brand_logo?.url || brandLogo}
                  alt=""
                  className="h-[50px] text-center mx-auto grayscale"
                />
              </div>
              <h1 className="text-2xl font-bold capitalize">
                {user?.brand?.brand_name || "Restaurant Name"}
              </h1>
              <p className="text-[8.5px] -mt-0.5 capitalize">
                {user?.brand?.address?.location || "Location"},{" "}
                {user?.brand?.address?.sub_district || "Sub District"},{" "}
                {user?.brand?.address?.district || "District"}
              </p>
              <div className="text-[8.5px] flex justify-center space-x-1">
                <p>+88{user?.brand?.contact?.mobile1 || "00000000000"},</p>
                <p>+88{user?.brand?.contact?.mobile2 || "00000000000"},</p>
              </div>

              <p className="text-xs mb-1">
                <DateFormatter dateString={new Date()} />
              </p>
              <p className="capitalize text-xs">{name}</p>
            </div>
            <p className="text-[8px] pl-2">
              Served by: <span className="capitalize">{selectedStaff}</span>
            </p>
            <div className="mt-2">
              <div className="min-h-[30px] border-b border-black flex justify-between items-center px-3 text-[10px]">
                <div>Items</div>
                <div className="flex">
                  <div className="mr-8">Quantity</div>
                  <div>Price</div>
                </div>
              </div>
              {tableWiseOrder?.map((item, index) => (
                <div
                  key={item._id}
                  className="min-h-[27px] w-full border-b border-gray-600 flex items-center justify-between text-[10px] pr-1"
                >
                  <div className="flex items-center w-[70%]">
                    <p className="mr-1">{index + 1}.</p>
                    <p className="wrapped-text3 capitalize">
                      {item?.item_name}
                    </p>
                  </div>
                  <div className="flex items-center justify-end w-[30%]">
                    <div className="flex items-center w-[30%]">
                      <div className="mr-3">{item?.item_quantity}</div>
                      <div>-</div>
                    </div>
                    <div className="ml-1 w-[70%] text-end">
                      <CurrencyFormatter
                        value={item?.item_price * item?.item_quantity}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[210px] flex flex-col justify-end ml-auto mt-2">
              <div className="flex justify-end text-sm font-medium min-w-full">
                <p className="w-[50%] text-end">Total Bill:</p>
                <div className="w-[50%] text-end">
                  <CurrencyFormatter value={totalBill} />
                </div>
              </div>
              <div className="min-w-[50%]">
                {totalDiscount ? (
                  <>
                    <div className="flex justify-end text-sm font-medium w-full">
                      <p className="w-[50%] text-end">Discount:</p>
                      <div className="w-[50%] text-end">
                        <CurrencyFormatter
                          value={totalBill - (totalBill - totalDiscount)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end text-sm font-bold w-full">
                      <p className="w-[50%] text-end">Net Bill:</p>
                      <div className="w-[50%] text-end">
                        <CurrencyFormatter value={totalBill - totalDiscount} />
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className="text-[10px] text-center mt-3 font-medium border-b border-t border-black">
              <p className="py-1">
                Thanks for visiting{" "}
                <span className="capitalize">{user?.brand?.brand_name}</span>!
                Come again
              </p>
            </div>
            <div className="text-[7px] text-start ml-2 mt-2 font-medium">
              Software Developed by Saif Sajib
            </div>
          </div>
          <div className="text-center space-x-4 my-4">
            <ReactToPrint
              trigger={() => (
                <button className="h-[40px] w-[160px] bg-blue-500 rounded-md text-white">
                  Print Customer Copy
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

export default CustomerInvoice;
