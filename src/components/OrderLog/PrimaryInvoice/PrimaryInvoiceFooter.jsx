/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CurrencyFormatter from "../../Currencyformatter/CurrencyFormatter";
import { useGetSingleMemberByMobileQuery } from "../../../redux/features/member/memberApi";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";
import KitchenInvoice from "./KitchenInvoice";
import CustomerInvoice from "./CustomerInvoice";
import PaymentInvoice from "./PaymentInvoice";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";

const PrimaryInvoice = ({ tableWiseOrder, selectedStaff, table_name }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [membershipToggle, setMembershipToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [singleMemberData, setSingleMemberData] = useState({});
  const [totalDiscount, setTotalDiscount] = useState("");
  const [gotMoney, setGotMoney] = useState("");
  const [backMoney, setBackMoney] = useState("");

  const user = useSelector(currentUser);

  const totalBill = tableWiseOrder?.reduce(
    (total, item) => total + item?.item_quantity * item?.item_price,
    0
  );

  const withoutDiscountTotalBill = tableWiseOrder?.reduce((total, item) => {
    if (!item.discount) {
      total += item?.item_price * item?.item_quantity;
    }
    return total;
  }, 0);

  const {
    data: singleMember,
    isLoading: singleMemberLoading,
    error: memberFetchingError,
  } = useGetSingleMemberByMobileQuery(
    { mobile: mobileNumber },
    { skip: !mobileNumber }
  );

  const handleCheckMember = async (e) => {
    e.preventDefault();
    const mobile = e.target.mobile.value;

    if (mobile?.length !== 11) {
      setErrorMessage("Mobile number should be 11 characters");
    } else {
      setMobileNumber(mobile);
      setErrorMessage("");
    }
  };

  const handleDiscount = (value) => {
    const discountableAmount = totalBill - withoutDiscountTotalBill;
    const totalDiscount = (discountableAmount * value) / 100;
    setTotalDiscount(totalDiscount);
  };

  const handleChangeMoney = (e) => {
    const value = e.target.value;
    setGotMoney(value);
    if (totalDiscount) {
      setBackMoney(parseFloat(value) - (totalBill - totalDiscount));
    } else {
      setBackMoney(parseFloat(value) - totalBill);
    }
  };

  useEffect(() => {
    if (singleMember) {
      setSingleMemberData(singleMember?.data);
    }
    if (memberFetchingError) {
      setErrorMessage(memberFetchingError?.data?.message);
      setSingleMemberData({});
    }
  }, [singleMember, memberFetchingError]);

  return (
    <>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">
          Got Money from Customer: ৳
        </label>
        <input
          value={gotMoney}
          onChange={handleChangeMoney}
          type="number"
          className="w-full p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-gray-800 text-lg font-bold">
          <span>Total Bill:</span>
          <span>
            <CurrencyFormatter value={totalBill} />
          </span>
        </div>
        {singleMemberData?.discount_value && (
          <>
            <div className="flex items-center justify-between mt-2">
              <span>Discount:</span>
              <button
                onClick={() => handleDiscount(singleMemberData?.discount_value)}
                className="px-4 h-[35px] bg-green-600 text-white rounded shadow hover:bg-green-800 transition duration-200"
              >
                Apply {singleMemberData?.discount_value}%
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-purple-700 font-semibold text-base">
              <span>No Discount Amount:</span>
              <span>
                <CurrencyFormatter value={withoutDiscountTotalBill} />
              </span>
            </div>
            <div className="flex justify-between mt-2 text-blue-800 font-semibold text-base">
              <span>Total Discount:</span>
              <CurrencyFormatter value={totalDiscount} />
            </div>
            <div className="flex justify-between mt-2 text-black text-lg font-extrabold">
              <span>After Discount:</span>
              <CurrencyFormatter value={totalBill - totalDiscount} />
            </div>
          </>
        )}
        <div className="flex justify-between mt-2 text-green-600 font-bold text-lg">
          <span>Customer will get:</span>
          <span>
            <CurrencyFormatter value={backMoney} />
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label
          onClick={() => setMembershipToggle(!membershipToggle)}
          className="block mb-2 text-gray-700 underline cursor-pointer hover:text-gray-900"
        >
          Membership Offer
        </label>
        {membershipToggle && (
          <form onSubmit={handleCheckMember}>
            <input
              type="text"
              name="mobile"
              className="w-full p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            />
            {errorMessage && (
              <p className="text-red-700 mb-1">{errorMessage}</p>
            )}
            <button
              disabled={singleMemberLoading}
              type="submit"
              className="w-full h-[40px] bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition duration-200"
            >
              {singleMemberLoading ? <PrimaryLoading /> : "Check"}
            </button>
          </form>
        )}
      </div>

      <div className="flex justify-center gap-3">
        <KitchenInvoice tableWiseOrder={tableWiseOrder} />
        <CustomerInvoice
          tableWiseOrder={tableWiseOrder}
          totalDiscount={totalDiscount}
          totalBill={totalBill}
          selectedStaff={selectedStaff}
          user={user}
        />
        <PaymentInvoice
          user={user}
          tableWiseOrder={tableWiseOrder}
          totalDiscount={totalDiscount}
          totalBill={totalBill}
          selectedStaff={selectedStaff}
          singleMemberData={singleMemberData}
          table_name={table_name}
        />
      </div>
    </>
  );
};

export default PrimaryInvoice;
