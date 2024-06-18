import { FileSearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import CustomModal from "../Modal/Modal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useGetSingleInvoiceByIdQuery } from "../../redux/features/soldInvoice/soldInvoiceApi";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import DateFormatter from "../DateFormatter/DateFormatter";
import CurrencyFormatter from "../Currencyformatter/CurrencyFormatter";
import ReactToPrint from "react-to-print";
import brandLogo from "../../../public/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";

const FindSpecificInvoice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const componentRef = useRef();
  const user = useSelector(currentUser);

  const { data, isLoading, error } = useGetSingleInvoiceByIdQuery(
    { invoice_id: invoiceId },
    { skip: !invoiceId }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.invoiceId.value;
    if (!id || id?.length < 34) {
      setErrorMessage("Invalid invoice id");
    } else {
      setInvoiceId(id);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(!isModalOpen);
          setInvoiceId("");
        }}
        className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg my-6 rounded flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white duration-500"
      >
        <FileSearchOutlined /> Find specific invoice
      </button>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
        width={600}
      >
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        {error && !errorMessage && (
          <ErrorMessage errorMessage={error?.data?.message} />
        )}
        <form onSubmit={handleSubmit} className="flex items-center my-4">
          <input
            onChange={() => setErrorMessage("")}
            type="text"
            name="invoiceId"
            placeholder="Search by invoice id..."
            className="border border-gray-300 rounded-l-md p-3 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="text-white bg-blue-500 border border-blue-500 rounded-r-md p-3 hover:bg-blue-600 transition duration-200 w-[120px]"
            type="submit"
          >
            {isLoading ? <PrimaryLoading /> : "SEARCH"}
          </button>
        </form>

        {data?.data?._id && (
          <div className="px-2 pt-4">
            <div className="w-full max-w-[310px] mx-auto">
              <div
                ref={componentRef}
                className="w-full max-w-[310px] min-h-[300px] pb-1"
              >
                <div className="text-center mt-6">
                  <div className="mx-auto w-full">
                    <img
                      src={
                        user?.brand?.brand_logo
                          ? user?.brand?.brand_logo
                          : brandLogo
                      }
                      alt=""
                      className="h-[50px] text-center mx-auto grayscale"
                    />
                  </div>
                  <h1 className="text-2xl font-bold capitalize">
                    {user?.brand?.brand_name
                      ? user?.brand?.brand_name
                      : "Restaurant Name"}
                  </h1>
                  <p className="text-[8.5px] -mt-0.5">
                    Mazhi Plaza 2nd floor, Naria, Shariatpur
                  </p>
                  <div className="text-[8.5px] flex justify-center space-x-1">
                    <p>+8801770 940333,</p>
                    <p>+8801903 390050</p>
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
                                (data?.data?.total_bill -
                                  data?.data?.total_discount)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex justify-end text-sm font-bold w-full">
                          <p className="w-[50%] text-end">Net Bill:</p>
                          <div className="w-[50%] text-end">
                            <CurrencyFormatter
                              value={
                                data?.data?.total_bill -
                                data?.data?.total_discount
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
                    <span className="capitalize">
                      {user?.brand?.brand_name}
                    </span>
                    ! Come again
                  </p>
                </div>
                <div className="text-[7px] text-start ml-2 mt-2 font-medium">
                  Software Developed by Saif Sajib
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
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
        )}
      </CustomModal>
    </>
  );
};

export default FindSpecificInvoice;
