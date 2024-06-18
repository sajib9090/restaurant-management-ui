import { Card, Col, DatePicker, Row, Spin } from "antd";
import { useState, useMemo } from "react";
import { useGetAllSellAlsoDateFilterQuery } from "../../../../redux/features/soldInvoice/soldInvoiceApi";

const SellHistory = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [daysInMonth, setDaysInMonth] = useState(null);

  const handleDateChange = (_, dateString) => {
    setSelectedDate(dateString);
    if (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const days = new Date(year, month, 0).getDate();
      setDaysInMonth(days);
    } else {
      setDaysInMonth(null);
    }
  };

  const { data, isLoading } = useGetAllSellAlsoDateFilterQuery(
    { month: selectedDate },
    { skip: !selectedDate }
  );

  const itemsName = useMemo(() => {
    if (!data) return [];
    return data?.data?.flatMap((item) =>
      item?.items?.map((it) => it?.item_name)
    );
  }, [data]);

  const uniqueItemsName = useMemo(() => {
    return [...new Set(itemsName)];
  }, [itemsName]);

  const dataSource = useMemo(() => {
    if (!data) return [];
    const dailyTotals = Array(daysInMonth).fill(0);
    const itemDataList = uniqueItemsName?.map((name) => {
      const itemData = { item_name: name, total: 0 };
      if (daysInMonth) {
        for (let i = 1; i <= daysInMonth; i++) {
          const dayKey = `day${i}`;
          const dateString = selectedDate + `-${String(i).padStart(2, "0")}`;
          const dayData = data?.data?.filter((item) => {
            const itemDate = new Date(item.createdAt)
              .toISOString()
              .split("T")[0];
            return itemDate === dateString;
          });

          const quantity =
            dayData?.reduce((sum, item) => {
              return (
                sum +
                item?.items
                  .filter((it) => it?.item_name === name)
                  .reduce(
                    (innerSum, it) => innerSum + (it?.item_quantity || 0),
                    0
                  )
              );
            }, 0) || 0;

          itemData[dayKey] = quantity === 0 ? "-" : quantity;
          itemData.total += quantity;
          dailyTotals[i - 1] += quantity;
        }
        itemData.total = itemData.total === 0 ? "-" : itemData.total;
      }
      return itemData;
    });

    const totalData = { item_name: "Daily Sell Quantity", total: 0 };
    dailyTotals.forEach((total, index) => {
      const dayKey = `day${index + 1}`;
      totalData[dayKey] = total === 0 ? "-" : total;
      totalData.total += total;
    });
    itemDataList.push(totalData);

    return { items: itemDataList.slice(0, -1), totals: totalData };
  }, [data, uniqueItemsName, daysInMonth, selectedDate]);

  const renderTableHeader = () => {
    const daysColumns = Array.from({ length: daysInMonth }, (_, i) => (
      <th
        key={`day${i + 1}`}
        className="text-center border p-2 bg-gray-200 text-[13px]"
      >
        {i + 1}
      </th>
    ));
    return (
      <tr>
        <th className="text-left border p-2 bg-gray-100">Item Name</th>
        {daysColumns}
        <th className="text-center border p-2 bg-blue-200">Total</th>
      </tr>
    );
  };

  const renderTableBody = () => {
    return dataSource?.items?.map((record, i) => {
      const daysColumns = Array.from({ length: daysInMonth }, (_, i) => (
        <td
          key={`day${i + 1}`}
          className="text-center border p-2 bg-white text-[12px]"
        >
          {record[`day${i + 1}`]}
        </td>
      ));
      return (
        <tr key={record?.item_name} className="hover:bg-gray-100">
          <td className="text-left border py-2 px-3 text-blue-600 font-bold capitalize bg-gray-200 text-[12.5px]">
            {i + 1}. {record?.item_name}
          </td>
          {daysColumns}
          <td className="text-center border p-2 bg-blue-100 text-[12px] font-bold">
            {record?.total}
          </td>
        </tr>
      );
    });
  };

  const renderTotalsRow = () => {
    const { totals } = dataSource;
    const daysColumns = Array.from({ length: daysInMonth }, (_, i) => (
      <td key={`day${i + 1}`} className="text-center border p-2 bg-yellow-100">
        {totals[`day${i + 1}`]}
      </td>
    ));
    return (
      <tr className="bg-yellow-200 hover:bg-yellow-300 text-black font-bold">
        <td className="text-left border py-2 px-3">{totals?.item_name}</td>
        {daysColumns}
        <td className="text-center border p-2 bg-yellow-300">
          {totals?.total}
        </td>
      </tr>
    );
  };

  return (
    <div>
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
        </div>
      </Card>

      {data?.data_found == 0 ? (
        "Nothing found"
      ) : (
        <>
          {isLoading ? (
            <Spin
              size="large"
              className="flex justify-center items-center mt-4"
            />
          ) : (
            <div>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border-collapse border shadow-md ">
                  <thead>{renderTableHeader()}</thead>
                  <tbody>{renderTableBody()}</tbody>
                  <tfoot>{renderTotalsRow()}</tfoot>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SellHistory;
