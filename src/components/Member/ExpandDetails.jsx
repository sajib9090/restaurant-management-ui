/* eslint-disable react/prop-types */
import { FaFileInvoice } from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import CurrencyFormatter from "../Currencyformatter/CurrencyFormatter";
import DateFormatter from "../DateFormatter/DateFormatter";

const ExpandDetails = ({ record }) => {
  
  return (
    <div className="p-4">
      <p className="text-2xl font-bold text-blue-700 mb-6">
        Invoices Info- ({record?.member?.invoices?.length})
      </p>
      {record?.member?.invoices?.map((invoice, i) => (
        <div
          key={invoice?.invoice_id}
          className="border border-gray-200 rounded-lg mb-8 p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg transform transition duration-500 hover:scale-105 relative"
        >
          <p className="bg-blue-600 font-extrabold h-8 w-8 text-white rounded-full flex items-center justify-center absolute -left-4 -top-4 text-xs">
            {i + 1}
          </p>
          <div className="flex items-center mb-4">
            <FaFileInvoice className="text-blue-600 mr-2" />
            <span className="font-semibold text-gray-700">Invoice ID:</span>
            <span className="ml-2 text-gray-900">{invoice?.invoice_id}</span>
          </div>
          <div className="flex items-center mb-4">
            <TbCoinTakaFilled className="text-green-600 mr-2 h-4 w-4" />
            <span className="font-semibold text-gray-700">Bill:</span>
            <span className="ml-2 text-gray-900">
              <CurrencyFormatter value={invoice?.bill ? invoice?.bill : 0} />
            </span>
          </div>
          <div className="flex items-center mb-4">
            <TbCoinTakaFilled className="text-yellow-600 mr-2 h-4 w-4" />
            <span className="font-semibold text-gray-700">Discount:</span>
            <span className="ml-2 text-gray-900">
              <CurrencyFormatter
                value={invoice?.discount ? invoice?.discount : 0}
              />
            </span>
          </div>
          <div className="flex items-center">
            <CiCalendarDate className="text-green-600 mr-2 h-4 w-4" />
            <span className="font-semibold text-gray-700">Date:</span>
            <span className="ml-2 text-gray-900">
              <DateFormatter dateString={invoice?.createdAt} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandDetails;
