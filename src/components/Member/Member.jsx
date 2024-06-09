import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { Pagination, Popconfirm, Table } from "antd";
import {
  useDeleteMemberMutation,
  useGetAllMembersQuery,
} from "../../redux/features/member/memberApi";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import CurrencyFormatter from "../Currencyformatter/CurrencyFormatter";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";
import { toast } from "sonner";

const Member = () => {
  const [searchValue, setSearchValue] = useState("");
  const [spentValue, setSpentValue] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "capitalize",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      className: "text-gray-500 w-[20%]",
    },
    {
      title: "Total Spent",
      dataIndex: "total_spent",
      key: "total_spent",
      className: "text-gray-500 w-[15%]",
    },
    {
      title: "Got Total Discount",
      dataIndex: "total_discount",
      key: "total_discount",
      className: "text-gray-500 w-[15%]",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      className: "w-[10%] text-center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      className: "w-[7%]",
    },
  ];

  const { data: members, isLoading } = useGetAllMembersQuery({
    searchValue,
    spentValue,
    discountValue,
    pageValue: currentPage,
    limitValue: pageSize,
  });

  const data =
    members?.data?.map((member, i) => ({
      key: member?.member_id,
      name: (
        <div>
          <span className="mr-1">
            {i + 1 + members?.pagination?.currentPage * pageSize - pageSize}.
          </span>
          {member?.name}
        </div>
      ),
      mobile: (
        <div>
          <p className="text-blue-600 font-semibold">{member?.mobile}</p>
          <span className="text-xs">
            {new Date(member?.createdAt).toLocaleString()}
          </span>
        </div>
      ),
      total_spent: member?.total_spent ? (
        <span className="text-green-600 font-bold">
          <CurrencyFormatter value={member?.total_spent} />
        </span>
      ) : (
        0
      ),
      total_discount: member?.total_discount ? (
        <span className="text-red-600 font-bold">
          <CurrencyFormatter value={member?.total_discount} />
        </span>
      ) : (
        0
      ),
      discount: member?.discount_value + "%",
      actions: (
        <button
          onClick={() => {}}
          title="Edit"
          className="text-blue-600 text-xl ml-4"
        >
          <EditFilled />
        </button>
      ),
    })) || [];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const expandedRowRender = (record) => {
    return (
      <div>
        <p>
          <strong>Name:</strong> {record.name}
        </p>
      </div>
    );
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const [deleteMember, { isLoading: deleteLoading }] =
    useDeleteMemberMutation();

  const handleDelete = async () => {
    const data = {
      ids: selectedRowKeys,
    };

    try {
      const res = await deleteMember(data).unwrap();
      if (res) {
        toast.success(`${selectedRowKeys?.length} -Member has been deleted`);
        setSelectedRowKeys([]);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  if (isLoading) {
    return <PrimaryLoading />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mt-4 mb-10">
        <div className="search">
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setDiscountValue("");
              setSpentValue("");
            }}
            className="rounded"
            type="search"
            placeholder="Search..."
          />
        </div>
        {selectedRowKeys?.length > 0 && (
          <Popconfirm
            title="Delete Staff"
            description="Are you sure you want to delete the selected staff?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
          >
            <button
              disabled={deleteLoading}
              className="h-[40px] w-[220px] border border-gray-300 text-red-500 text-lg my-6 rounded flex items-center justify-center gap-2"
            >
              {deleteLoading ? (
                <>
                  Deleting ...
                  <PrimaryLoading />
                </>
              ) : (
                <>
                  <DeleteFilled />
                  Delete Selected-({selectedRowKeys?.length})
                </>
              )}
            </button>
          </Popconfirm>
        )}

        <div className="relative">
          <div className="space-y-2">
            <div className="selectOp flex items-center">
              <CiFilter className="h-6 w-6 mr-2" />
              <select
                value={spentValue}
                onChange={(e) => {
                  setSpentValue(e.target.value);
                  setDiscountValue("");
                }}
                name=""
                id=""
                className="rounded"
              >
                <option value="" selected disabled>
                  Filter with Spent Amount
                </option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
            <div className="selectOp flex items-center">
              <CiFilter className="h-6 w-6 mr-2" />
              <select
                value={discountValue}
                onChange={(e) => {
                  setDiscountValue(e.target.value);
                  setSpentValue("");
                }}
                name=""
                id=""
                className="rounded"
              >
                <option value="" selected disabled>
                  Filter with Discount
                </option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>

          {discountValue || spentValue ? (
            <div className="mt-2 flex items-center justify-end absolute right-2">
              <button
                onClick={() => {
                  setSearchValue("");
                  setDiscountValue("");
                  setSpentValue("");
                }}
                className="flex items-center justify-center text-red-600 underline"
                title="reset filter"
              >
                <CiFilter className="h-6 w-6 mr-1" /> Reset filter
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data}
        pagination={false}
        expandable={{
          expandedRowRender,
        }}
      />
      <div className="mt-2">
        <Pagination
          total={members?.data_found || 0}
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

export default Member;
