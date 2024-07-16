import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Col, DatePicker, Row, Table } from "antd";
import TitleComponent from "../../../../components/TitleComponent/TitleComponent";
import LocationPath from "../../../../components/LocationPath/LocationPath";
import { useGetAllSellAlsoDateFilterQuery } from "../../../../redux/features/soldInvoice/soldInvoiceApi";
import CurrencyFormatter from "../../../../components/Currencyformatter/CurrencyFormatter";
import IndividualLoading from "../../../../components/Loading/IndividualLoading/IndividualLoading";

const StaffSellRecord = () => {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const handleDateChange = (_, dateString) => {
    setSelectedDate(dateString);
  };

  const { data } = useGetAllSellAlsoDateFilterQuery(
    { month: selectedDate },
    { skip: !selectedDate }
  );
  const isLoading = false;
  const columns = [
    {
      title: "Served By",
      dataIndex: "served_by",
      key: "served_by",
      className: "w-[68%] capitalize text-purple-800 font-semibold",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Total Services",
      dataIndex: "total_sales",
      key: "total_sales",
      className: "w-[15%] text-yellow-600",
    },
    {
      title: "Total Sell",
      dataIndex: "total_bill",
      key: "total_bill",
      className: "w-[17%] font-semibold text-blue-600",
    },
  ];

  const groupedData = data?.data?.reduce((acc, record) => {
    const { served_by, createdAt, total_bill } = record;
    const date = new Date(createdAt).toLocaleDateString();
    if (!acc[served_by]) {
      acc[served_by] = {};
    }
    if (!acc[served_by][date]) {
      acc[served_by][date] = { sales_count: 0, total_bill: 0 };
    }
    acc[served_by][date].sales_count += 1;
    acc[served_by][date].total_bill += total_bill;
    return acc;
  }, {});

  const tableData = Object?.keys(groupedData || {})?.map((served_by) => {
    const totalSales = Object?.values(groupedData[served_by])?.reduce(
      (acc, { sales_count }) => acc + sales_count,
      0
    );
    const totalBill = Object?.values(groupedData[served_by])?.reduce(
      (acc, { total_bill }) => acc + total_bill,
      0
    );

    return {
      key: served_by,
      served_by,
      total_sales: totalSales,
      total_bill: <CurrencyFormatter value={totalBill} />,
      details: Object?.keys(groupedData[served_by])?.map((date) => ({
        date,
        sales_count: groupedData[served_by][date]?.sales_count,
        total_bill: (
          <CurrencyFormatter value={groupedData[served_by][date]?.total_bill} />
        ),
      })),
    };
  });

  const expandedRowRender = (record) => {
    const columns = [
      { title: "Date", dataIndex: "date", key: "date", className: "w-[55%]" },
      {
        title: "Date Wise Services Count",
        dataIndex: "sales_count",
        key: "sales_count",
        className: "w-[20%]",
      },
      {
        title: "Date Wise Sell",
        dataIndex: "total_bill",
        key: "total_bill",
        className: "w-[25%]",
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record?.details}
        pagination={false}
      />
    );
  };

  return (
    <div>
      <TitleComponent
        title={`${LocationPath(location)} ${selectedDate ? selectedDate : ""}`}
      />
      <Card className="bg-gray-50 shadow-md">
        <div className="p-4 space-y-6">
          <Row gutter={16} justify="center">
            <Col span={6}>
              <div>
                <h4 className="text-lg font-semibold mb-1 text-center text-gray-700">
                  {selectedDate ? selectedDate : "Choose a month"}
                </h4>
                <DatePicker
                  onChange={handleDateChange}
                  picker="month"
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {isLoading ? (
                <IndividualLoading contentLength={20} />
              ) : (
                <Table
                  columns={columns}
                  dataSource={tableData}
                  expandable={{ expandedRowRender }}
                  pagination={false}
                />
              )}
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default StaffSellRecord;
