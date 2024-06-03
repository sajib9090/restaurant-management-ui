import { Table } from "antd";
import {
  useAddTableMutation,
  useGetAllTablesQuery,
} from "../../../../redux/features/table/tableApi";
import { EditFilled, PlusSquareFilled } from "@ant-design/icons";
import { useState } from "react";
import { Modal } from "antd";
import { Toaster, toast } from "sonner";
import PrimaryLoading from "../../../../components/Loading/PrimaryLoading/PrimaryLoading";

const MaintainTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
      className: "text-gray-500 uppercase",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      className: "uppercase",
    },
  ];

  const { data: tables, isLoading } = useGetAllTablesQuery();

  const data =
    tables?.data?.map((table) => ({
      key: table?._id,
      table_name: table?.table_name,
      createdAt: new Date(table?.createdAt).toLocaleString(),
      actions: (
        <button title="Edit" className="text-blue-600 text-xl ml-4">
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

  const [tableName, setTableName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addTable, { isLoading: addTableLoading }] = useAddTableMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      table_name: tableName,
    };
    try {
      const res = await addTable(data).unwrap();
      if (res) {
        toast.success("New Table has been created");
        setIsModalOpen(!isModalOpen);
      }
    } catch (error) {
      setErrorMessage(error.data.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg my-6 rounded flex items-center justify-center gap-2"
        >
          <PlusSquareFilled />
          Add New Table
        </button>
        {selectedRowKeys?.length > 0 && (
          <button className="h-[40px] px-4 border border-gray-300 text-red-500 text-lg my-6 rounded flex items-center justify-center gap-2">
            <PlusSquareFilled />
            Delete Selected-({selectedRowKeys?.length})
          </button>
        )}
      </div>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data}
        pagination={false}
      />

      <>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          {errorMessage && (
            <div
              className="mb-4 mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
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
              disabled={!tableName}
              type="submit"
              className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
                !tableName && "cursor-not-allowed"
              }`}
            >
              {addTableLoading ? <PrimaryLoading /> : "ADD"}
            </button>
          </form>
        </Modal>
      </>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default MaintainTable;
