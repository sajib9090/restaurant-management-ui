import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleInvoiceByIdQuery } from "../../../redux/features/soldInvoice/soldInvoiceApi.js";
import { useRef } from "react";
import brandLogo from "../../../../public/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";
import DateFormatter from "../../../components/DateFormatter/DateFormatter.jsx";
import CurrencyFormatter from "../../../components/Currencyformatter/CurrencyFormatter.jsx";
import ReactToPrint from "react-to-print";
import InvoiceSkeleton from "../../../components/Skeleton/InvoiceSkeleton.jsx";
import { useSelector } from "react-redux";
import { currentUserInfo } from "../../../redux/features/auth/authSlice.js";

const SoldInvoice = () => {
  const { invoice_id } = useParams();
  const userInfo = useSelector(currentUserInfo);

  const { data, isLoading } = useGetSingleInvoiceByIdQuery({ invoice_id });
  const componentRef = useRef();
  const navigate = useNavigate();

  if (isLoading) {
    return <InvoiceSkeleton />;
  }

  return (
    <div className="px-2 pt-4">
      <div className="w-full max-w-[310px] mx-auto">
        <div
          ref={componentRef}
          className="w-full max-w-[310px] min-h-[300px] pb-1"
        >
          <div className="text-center mt-6">
            <div className="mx-auto w-full">
              <img
                src={userInfo?.brand?.brand_logo?.url || brandLogo}
                alt=""
                className="h-[50px] text-center mx-auto grayscale"
              />
            </div>
            <h1 className="text-2xl font-bold capitalize">
              {userInfo?.brand?.brand_name || "Restaurant Name"}
            </h1>
            <p className="text-[8.5px] -mt-0.5 capitalize">
              {userInfo?.brand?.address?.location || "Your Location"},{" "}
              {userInfo?.brand?.address?.sub_district || "Sub district"},{" "}
              {userInfo?.brand?.address?.district || "District"}
            </p>
            <div className="text-[8.5px] flex justify-center space-x-1">
              <p>+88{userInfo?.brand?.contact?.mobile1 || "00000000000"},</p>
              <p>+88{userInfo?.brand?.contact?.mobile2 || "00000000000"}</p>
            </div>

            <p className="text-xs mb-1">
              <DateFormatter dateString={data?.data?.createdAt} />
            </p>
            <p className="capitalize text-xs">{data?.data?.table_name}</p>
          </div>
          <p className="text-[8px] pl-2">
            Served by:{" "}
            <span className="capitalize">{data?.data?.served_by}</span>
          </p>
          <div className="mt-2">
            <div className="min-h-[30px] border-b border-black flex justify-between items-center px-3 text-[10px]">
              <div>Items</div>
              <div className="flex">
                <div className="mr-8">Quantity</div>
                <div>Price</div>
              </div>
            </div>
            {data?.data?.items?.map((item, index) => (
              <div
                key={item._id}
                className="min-h-[27px] w-full border-b border-gray-600 flex items-center justify-between text-[10px] pr-1"
              >
                <div className="flex items-center w-[70%]">
                  <p className="mr-1">{index + 1}.</p>
                  <p className="wrapped-text3 capitalize">{item?.item_name}</p>
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
                <CurrencyFormatter value={data?.data?.total_bill} />
              </div>
            </div>
            <div className="min-w-[50%]">
              {data?.data?.total_discount ? (
                <>
                  <div className="flex justify-end text-sm font-medium w-full">
                    <p className="w-[50%] text-end">Discount:</p>
                    <div className="w-[50%] text-end">
                      <CurrencyFormatter
                        value={
                          data?.data?.total_bill -
                          (data?.data?.total_bill - data?.data?.total_discount)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end text-sm font-bold w-full">
                    <p className="w-[50%] text-end">Net Bill:</p>
                    <div className="w-[50%] text-end">
                      <CurrencyFormatter
                        value={
                          data?.data?.total_bill - data?.data?.total_discount
                        }
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="text-[10px] text-center mt-3 font-medium border-b border-t border-black">
            <p className="py-1">
              Thanks for visiting{" "}
              <span className="capitalize">{userInfo?.brand?.brand_name}</span>!
              Come again
            </p>
          </div>
          <div className="text-[7px] text-start ml-2 mt-2 font-medium">
            Software Developed by Saif Sajib
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => navigate("/user/sell")}
            className="h-[35px] px-4 bg-black text-white rounded-md hover:bg-opacity-70"
          >
            Back to sell
          </button>
          <ReactToPrint
            trigger={() => (
              <button className="h-[35px] w-[80px] bg-blue-500 rounded-md text-white hover:bg-opacity-70">
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default SoldInvoice;
