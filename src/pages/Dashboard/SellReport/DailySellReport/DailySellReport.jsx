import { useState } from "react";
import MultipleDatePicker from "../../../../components/MultipleDatePicker/MultipleDatePicker";
import { useGetAllSellAlsoDateFilterQuery } from "../../../../redux/features/soldInvoice/soldInvoiceApi";
import { Pagination, Table } from "antd";
import DateFormatter from "../../../../components/DateFormatter/DateFormatter";
import CurrencyFormatter from "../../../../components/Currencyformatter/CurrencyFormatter";
import SellReportFooter from "../../../../components/SellReport/SellReportFooter";
import SellReportSkeleton from "../../../../components/Skeleton/SellReportSkeleton";
import FindSpecificInvoice from "../../../../components/SellReport/FindSpecificInvoice";

const DailySellReport = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedRange, setSelectedRange] = useState([]);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      key: "invoiceId",
      className: "",
    },
    {
      title: "Served By",
      dataIndex: "servedBy",
      key: "servedBy",
      className: "w-[15%]",
    },
    {
      title: "Info",
      dataIndex: "dateAndTable",
      key: "dateAndTable",
      className: "text-gray-500 w-[20%]",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      className: "w-[10%] text-center",
    },
    {
      title: "",
      dataIndex: "bill",
      key: "bill",
      className: "w-[15%] text-end",
    },
  ];

  const { data: soldInvoices, isLoading: sellReportLoading } =
    useGetAllSellAlsoDateFilterQuery(
      {
        pageValue: currentPage,
        limitValue: pageSize,
        date: selectedDate,
        start_date: selectedRange[0],
        end_date: selectedRange[1],
      },
      {
        skip:
          !selectedDate &&
          (!selectedRange || !selectedRange[0] || !selectedRange[1]),
      }
    );

  const data =
    soldInvoices?.data?.map((invoice, i) => ({
      key: invoice?.invoice_id,
      invoiceId: (
        <div>
          <span className="mr-1">
            {i +
              1 +
              soldInvoices?.pagination?.currentPage * pageSize -
              pageSize}
            .
          </span>
          <span className="bg-gray-200 text-base font-semibold px-2 py-1">
            {invoice?.invoice_id}
          </span>
        </div>
      ),
      servedBy: (
        <div>
          <p className="text-blue-500 capitalize">{invoice?.served_by}</p>
        </div>
      ),
      dateAndTable: (
        <div>
          <p className="text-gray-600 font-semibold capitalize">
            {invoice?.table_name}
          </p>
          <span className="text-xs text-gray-400">
            <DateFormatter dateString={invoice?.createdAt} />
          </span>
        </div>
      ),

      discount: invoice?.total_discount ? (
        <>
          <span className="text-red-600 font-bold">
            <CurrencyFormatter value={invoice?.total_discount} />
          </span>
          <span className="flex items-center justify-center">
            <span>
              {((invoice?.total_discount / invoice?.total_bill) * 100).toFixed(
                1
              )}
              %
            </span>
          </span>
        </>
      ) : (
        0
      ),
      bill: invoice?.total_bill ? (
        <span className="font-bold">
          <CurrencyFormatter value={invoice?.total_bill} />
        </span>
      ) : (
        0
      ),
    })) || [];

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="min-h-screen px-4">
      <FindSpecificInvoice />
      <MultipleDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />

      {sellReportLoading ? (
        <SellReportSkeleton />
      ) : (
        <div className="mt-6">
          <div className="text-center my-4 text-lg">
            <span>
              {selectedDate
                ? selectedDate
                : selectedRange &&
                  selectedRange.length === 2 &&
                  selectedRange[0] &&
                  selectedRange[1]
                ? selectedRange[0] + " " + "to" + " " + selectedRange[1]
                : null}
            </span>
          </div>
          <Table columns={columns} dataSource={data} pagination={false} />
          {soldInvoices?.data_found > 0 && (
            <>
              <SellReportFooter soldInvoices={soldInvoices} />
              <div className="mt-2">
                <Pagination
                  total={soldInvoices?.data_found || 0}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                  pageSize={pageSize}
                  current={currentPage}
                  onChange={handlePaginationChange}
                  showSizeChanger
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DailySellReport;
