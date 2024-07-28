import { Link, useLocation } from "react-router-dom";
import LocationPath from "../../../components/LocationPath/LocationPath";
import TitleComponent from "../../../components/TitleComponent/TitleComponent";
import { useState } from "react";
import AddSupplier from "../../../components/Suppliers/AddSupplier/AddSupplier";
import { SnippetsOutlined } from "@ant-design/icons";
import DeleteSupplier from "../../../components/Suppliers/DeleteSupplier/DeleteSupplier";
import { useGetAllSuppliersQuery } from "../../../redux/features/supplier/supplierApi";
import { Pagination, Table } from "antd";
import DateFormatter from "../../../components/DateFormatter/DateFormatter";
import StatisticsCard from "../../../components/StatisticsCard/StatisticsCard";
import IndividualLoading from "../../../components/Loading/IndividualLoading/IndividualLoading";
import SearchInput from "../../../components/SearchInput/SearchInput";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";
import BrandInfo from "../../../components/Brand/BrandInfo/BrandInfo";
import BrandFilter from "../../../components/Filter/BrandFilter";

const Suppliers = () => {
  const user = useSelector(currentUser);
  const location = useLocation();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandValue, setBrandValue] = useState("");

  const { data: suppliers, isLoading } = useGetAllSuppliersQuery({
    searchValue: searchValue,
    limitValue: pageSize,
    pageValue: currentPage,
    brandValue: brandValue,
  });

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "capitalize",
    },
    ...(user?.role === "super admin"
      ? [
          {
            title: "",
            dataIndex: "brand",
            key: "brand",
            className: "w-[12%]",
          },
        ]
      : []),
    ...(user?.role !== "super admin"
      ? [
          {
            title: "Joining date",
            dataIndex: "date",
            key: "date",
            className: "text-gray-500 w-[15%]",
          },
        ]
      : []),

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "w-[20%] text-gray-500 text-[13px]",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      className: "text-gray-800 w-[15%] capitalize",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      className: "text-gray-500 w-[10%]",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      className: "uppercase w-[7%]",
    },
  ];

  const data =
    suppliers?.data?.map((supplier, i) => ({
      key: supplier?.supplier_id,
      name: (
        <>
          <span className="mr-2">
            {i + 1 + suppliers?.pagination?.currentPage * pageSize - pageSize}.
          </span>{" "}
          {supplier?.name}
        </>
      ),
      brand: (
        <BrandInfo
          logo={supplier?.brand_info?.brand_logo?.url}
          name={supplier?.brand_info?.brand_name}
        />
      ),
      date: <DateFormatter dateString={supplier?.createdAt} />,
      email: supplier?.email || "N/A",
      company: supplier?.company_name,
      mobile: (
        <span className="flex flex-col justify-center gap-2">
          <span>{supplier?.mobile1}</span>
          <span>{supplier?.mobile2}</span>
        </span>
      ),
      actions: (
        <button title="Edit" className="text-blue-600 text-xl ml-4">
          edit
        </button>
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
        title={`${LocationPath(location)}-(${suppliers?.data_found || 0})
        `}
      />

      <StatisticsCard
        bg={"bg-blue-100"}
        title={"Total Supplier"}
        value={suppliers?.data_found}
      />

      <div className="flex justify-between">
        <AddSupplier setSelectedRowKeys={setSelectedRowKeys} />
        <Link
          to={"/user/dashboard/staff-records/sell-record"}
          className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg my-4 rounded flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white duration-700 transition-all"
        >
          <SnippetsOutlined />
          Suppliers Records
        </Link>
      </div>

      <div className="flex items-center justify-between mt-4 mb-10">
        <SearchInput
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setBrandValue("");
          }}
        />
        <DeleteSupplier
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

      {/* table */}
      {isLoading ? (
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
          disabled={isLoading}
          total={suppliers?.data_found || 0}
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

export default Suppliers;
