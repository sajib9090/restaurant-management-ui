import { useState } from "react";
import { useGetAllStaffsQuery } from "../../../redux/features/staff/staffApi";
import { Pagination, Table } from "antd";
import AddStaff from "../../../components/Staff/AddStaff/AddStaff";
import DeleteStaff from "../../../components/Staff/DeleteStaff/DeleteStaff";
import DateFormatter from "../../../components/DateFormatter/DateFormatter";
import { SnippetsOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import IndividualLoading from "../../../components/Loading/IndividualLoading/IndividualLoading";
import LocationPath from "../../../components/LocationPath/LocationPath";
import TitleComponent from "../../../components/TitleComponent/TitleComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import BrandFilter from "../../../components/Filter/BrandFilter";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";
import StatisticsCard from "../../../components/StatisticsCard/StatisticsCard";

const StaffRecords = () => {
  const user = useSelector(currentUser);
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [brandValue, setBrandValue] = useState("");

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
    brandValue: brandValue,
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
      <TitleComponent
        title={`${LocationPath(location)}-(${staffs?.data_found || 0})`}
      />
      <StatisticsCard
        bg={"bg-blue-100"}
        title={"Total Staff Found"}
        value={staffs?.data_found}
      />

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
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <DeleteStaff
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
        {user?.role === "super admin" && (
          <BrandFilter
            user={user}
            brandValue={brandValue}
            setBrandValue={setBrandValue}
          />
        )}
      </div>

      {staffLoading ? (
        <IndividualLoading contentLength={20} />
      ) : (
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={data}
          pagination={false}
        />
      )}
      <div className="mt-2">
        <Pagination
          disabled={staffLoading}
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
