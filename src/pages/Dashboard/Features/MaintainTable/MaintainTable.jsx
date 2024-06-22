import { Pagination, Popconfirm, Table } from "antd";
import {
  useAddTableMutation,
  useDeleteTableMutation,
  useGetAllTablesQuery,
  useUpdateTableMutation,
} from "../../../../redux/features/table/tableApi";
import { EditFilled, PlusSquareFilled, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "sonner";
import PrimaryLoading from "../../../../components/Loading/PrimaryLoading/PrimaryLoading";
import CustomModal from "../../../../components/Modal/Modal";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";

const MaintainTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "Table Name",
      dataIndex: "table_name",
      key: "table_name",
      className: "uppercase",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      className: "text-gray-500 uppercase w-[25%]",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      className: "uppercase w-[7%]",
    },
  ];

  const { data: tables, isLoading } = useGetAllTablesQuery({
    pageValue: currentPage,
    limitValue: pageSize,
    searchValue: searchValue,
  });

  const data =
    tables?.data?.map((table) => ({
      key: table?.table_id,
      table_name: table?.table_name,
      createdAt: new Date(table?.createdAt).toLocaleString(),
      actions: (
        <button
          onClick={() => {
            openEditModal(table);
            setModalContent("edit");
          }}
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

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const [tableName, setTableName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addTable, { isLoading: addTableLoading }] = useAddTableMutation();
  const [deleteTable, { isLoading: deleteLoading }] = useDeleteTableMutation();
  const [updateTable, { isLoading: updateLoading }] = useUpdateTableMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      table_name: tableName,
    };
    try {
      const res = await addTable(data).unwrap();
      if (res) {
        toast.success("New Table has been created");
        setSelectedRowKeys([]);
        setIsModalOpen(!isModalOpen);
        setTableName("");
      }
    } catch (error) {
      setErrorMessage(error.data.message);
    }
  };

  const openEditModal = (data) => {
    setTableName(data?.table_name);
    setSelectedId(data?._id);
    setIsModalOpen(!isModalOpen);
    setErrorMessage("");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      table_name: tableName,
    };
    try {
      const res = await updateTable({ id: selectedId, ...data }).unwrap();
      if (res) {
        toast.success("Table has been updated");
        setSelectedRowKeys([]);
        setIsModalOpen(false);
      }
    } catch (error) {
      setErrorMessage(error?.data?.message);
    }
  };

  const handleDelete = async () => {
    const data = {
      ids: selectedRowKeys,
    };

    try {
      const res = await deleteTable(data).unwrap();
      if (res) {
        toast.success(`${selectedRowKeys?.length} -Table has been deleted`);
        setSelectedRowKeys([]);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
        <StatisticsCard
          bg="bg-gray-200"
          title="Total Tables"
          value={tables?.data_found}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsModalOpen(!isModalOpen);
              setErrorMessage("");
              setModalContent("add");
              setTableName("");
            }}
            className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg my-6 rounded flex items-center justify-center gap-2"
          >
            <PlusSquareFilled />
            Add New Table
          </button>
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
      </div>
      <div className="my-4">
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
      </div>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data}
        pagination={false}
      />
      <div className="mt-2">
        <Pagination
          total={tables?.data_found || 0}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
      <>
        <CustomModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          {modalContent === "add" ? (
            <form onSubmit={handleSubmit} className="py-4">
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">
                  Write Table Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded mt-1"
                  type="text"
                  value={tableName}
                  onChange={(e) => {
                    setTableName(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Write table name..."
                />
              </div>

              <button
                disabled={!tableName || addTableLoading}
                type="submit"
                className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
                  !tableName || (addTableLoading && "cursor-not-allowed")
                }`}
              >
                {addTableLoading ? <PrimaryLoading /> : "ADD"}
              </button>
            </form>
          ) : modalContent == "edit" ? (
            <form onSubmit={handleEdit} className="py-4">
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">
                  Edit Table Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded mt-1"
                  type="text"
                  value={tableName}
                  onChange={(e) => {
                    setTableName(e.target.value);
                    setErrorMessage("");
                  }}
                />
              </div>

              <button
                disabled={updateLoading}
                type="submit"
                className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
                  !tableName || (updateLoading && "cursor-not-allowed")
                }`}
              >
                {updateLoading ? <PrimaryLoading /> : "SAVE CHANGES"}
              </button>
            </form>
          ) : null}
        </CustomModal>
      </>
    </div>
  );
};

export default MaintainTable;
