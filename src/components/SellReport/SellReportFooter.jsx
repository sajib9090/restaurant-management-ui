import CurrencyFormatter from "../Currencyformatter/CurrencyFormatter";

/* eslint-disable react/prop-types */
const SellReportFooter = ({ soldInvoices }) => {
  const totalBilSum = soldInvoices?.data?.reduce(
    (acc, current) => acc + current.total_bill,
    0
  );

  const totalDiscountSum = soldInvoices?.data?.reduce(
    (acc, current) => acc + current.total_discount,
    0
  );
  return (
    <div className="w-80 ml-auto p-4">
      <div className="flex justify-between my-2 text-lg border-b border-gray-400">
        <span className="font-bold">Total Sell:</span>
        <span>
          <CurrencyFormatter value={totalBilSum} />
        </span>
      </div>
      <div className="flex justify-between my-2 text-base border-b border-gray-400">
        <span className="font-bold">Total Discount:</span>
        <span>
          <CurrencyFormatter value={totalDiscountSum} />
        </span>
      </div>
      <div className="flex justify-between my-2 text-xl border-b border-gray-400">
        <span className="font-bold">Grand Total:</span>
        <span>
          <CurrencyFormatter value={totalBilSum - totalDiscountSum} />
        </span>
      </div>
    </div>
  );
};

export default SellReportFooter;
