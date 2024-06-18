/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomModal from "../../Modal/Modal";
import { useAddSoldInvoiceMutation } from "../../../redux/features/soldInvoice/soldInvoiceApi";
import { toast } from "sonner";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeStaff,
  removeTableWiseMenuItems,
} from "../../../redux/features/OrderLog/orderLogSlice";

const PaymentInvoice = ({
  tableWiseOrder,
  totalDiscount,
  totalBill,
  selectedStaff,
  singleMemberData,
  table_name,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addSoldInvoice, { isLoading: soldInvoiceLoading }] =
    useAddSoldInvoiceMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSell = async () => {
    const data = {
      table_name: tableWiseOrder[0]?.table,
      member: totalDiscount ? singleMemberData?.mobile : null,
      served_by: selectedStaff,
      items: tableWiseOrder,
      total_bill: totalBill,
      total_discount: totalDiscount ? totalDiscount : 0,
    };

    try {
      const res = await addSoldInvoice(data).unwrap();
      if (res) {
        dispatch(removeStaff({ table_name }));
        dispatch(removeTableWiseMenuItems(tableWiseOrder));
        navigate(res?.data?.invoice_id);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition duration-200"
      >
        Payment Done
      </button>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
        width={"380px"}
        center
      >
        <div className="flex items-center justify-center">
          <div className="bg-white p-6 text-center">
            <div className="mb-4">
              <div className="text-7xl text-gray-400">?</div>
            </div>
            <div className="mb-4">
              <h3 className="text-3xl font-semibold">Are you sure?</h3>
              <p className="text-gray-600 text-base">Want to done payment?</p>
            </div>
            <div className="flex justify-evenly">
              <button
                disabled={soldInvoiceLoading}
                className={`w-[70px] h-[40px] bg-blue-700 text-white rounded hover:bg-blue-800 ${
                  soldInvoiceLoading ? "cursor-not-allowed" : ""
                }`}
                onClick={handleSell}
              >
                {soldInvoiceLoading ? <PrimaryLoading /> : "Yes"}
              </button>
              <button
                className="w-[70px] h-[40px] bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default PaymentInvoice;
