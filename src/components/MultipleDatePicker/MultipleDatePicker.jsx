/* eslint-disable react/prop-types */
import { DatePicker, Card, Row, Col } from "antd";

const { RangePicker } = DatePicker;

const MultipleDatePicker = ({
  selectedDate,
  setSelectedDate,
  selectedRange,
  setSelectedRange,
}) => {
  const handleDateChange = (_, dateString) => {
    setSelectedDate(dateString);
    setSelectedRange([]);
  };

  const handleRangeChange = (_, dateStrings) => {
    setSelectedRange(dateStrings);
    setSelectedDate(null);
  };

  return (
    <div className="">
      <Card className="bg-gray-100">
        <div className="p-2 space-y-6">
          <Row gutter={16} justify="space-between">
            <Col span={6}>
              <div>
                <h4 className="text-lg font-semibold mb-1">
                  {selectedDate ? selectedDate : "Choose single date"}
                </h4>
                <DatePicker
                  onChange={handleDateChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </Col>
            <Col span={6}>
              <div>
                <h4 className="text-lg font-semibold mb-1">
                  {selectedRange?.length === 2 &&
                  selectedRange[0] &&
                  selectedRange[1]
                    ? `${selectedRange[0]} - ${selectedRange[1]}`
                    : "Choose multiple dates"}
                </h4>
                <RangePicker
                  onChange={handleRangeChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default MultipleDatePicker;
