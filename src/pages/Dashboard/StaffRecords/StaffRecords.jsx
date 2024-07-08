import { useState } from "react";
import { useGetAllStaffsQuery } from "../../../redux/features/staff/staffApi";
import { Pagination, Table } from "antd";
import AddStaff from "../../../components/Staff/AddStaff/AddStaff";
import DeleteStaff from "../../../components/Staff/DeleteStaff/DeleteStaff";
import DateFormatter from "../../../components/DateFormatter/DateFormatter";
import { SnippetsOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const StaffRecords = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "capitalize",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      className: "w-[25%]",
    },
  ];

  const { data: staffs, isLoading: staffLoading } = useGetAllStaffsQuery({
    searchValue,
    pageValue: currentPage,
    limitValue: pageSize,
  });

  const data =
    staffs?.data?.map((staff, i) => ({
      key: staff?.staff_id,
      name: (
        <div>
          <span className="mr-1">
            {i + 1 + staffs?.pagination?.currentPage * pageSize - pageSize}.
          </span>
          {staff?.name}
        </div>
      ),
      date: (
        <span className="text-gray-400">
          <DateFormatter dateString={staff?.createdAt} />
        </span>
      ),
    })) || [];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <div className="flex justify-between">
        <AddStaff setSelectedRowKeys={setSelectedRowKeys} />
        <Link
          to={"/user/dashboard/staff-records/sell-record"}
          className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg my-4 rounded flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white duration-700 transition-all"
        >
          <SnippetsOutlined />
          Staff Sell Record
        </Link>
      </div>

      <div className="flex items-center justify-between mt-4 mb-10">
        <div className="search">
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="rounded"
            type="search"
            placeholder="Search..."
          />
        </div>
        <DeleteStaff
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      </div>

      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data}
        pagination={false}
      />
      <div className="mt-2">
        <Pagination
          total={staffs?.data_found || 0}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default StaffRecords;
