/* eslint-disable react/prop-types */
import { Table } from "antd";
import { useState } from "react";
import { EditFilled, PlusSquareFilled, DeleteFilled } from "@ant-design/icons";
import { Toaster, toast } from "sonner";
import CustomModal from "../Modal/Modal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/features/category/categoryApi";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";

const Category = ({ categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "Category Name",
      dataIndex: "category",
      key: "category",
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

  const data =
    (categories &&
      categories?.data?.map((category) => ({
        key: category?.category_id,
        category: category?.category,
        createdAt: new Date(category?.createdAt).toLocaleString(),
        actions: (
          <button
            onClick={() => {
              openEditModal(category);
              setModalContent("edit");
            }}
            title="Edit"
            className="text-blue-600 text-xl ml-4"
          >
            <EditFilled />
          </button>
        ),
      }))) ||
    [];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const [addCategory, { isLoading: addCategoryLoading }] =
    useAddCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  const [deleteCategoy, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      category: categoryName,
    };
    try {
      const res = await addCategory(data).unwrap();
      if (res) {
        toast.success("New Category has been created");
        setSelectedRowKeys([]);
        setIsModalOpen(!isModalOpen);
        setCategoryName("");
      }
    } catch (error) {
      setErrorMessage(error.data.message);
    }
  };

  const openEditModal = (data) => {
    setCategoryName(data?.category);
    setSelectedId(data?._id);
    setIsModalOpen(!isModalOpen);
    setErrorMessage("");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      category: categoryName,
    };
    try {
      const res = await updateCategory({ id: selectedId, ...data }).unwrap();
      if (res) {
        toast.success("Category has been updated");
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
      const res = await deleteCategoy(data).unwrap();
      if (res) {
        toast.success(`${selectedRowKeys?.length} -Category has been deleted`);
        setSelectedRowKeys([]);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
            setErrorMessage("");
            setModalContent("add");
            setCategoryName("");
          }}
          className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg my-6 rounded flex items-center justify-center gap-2"
        >
          <PlusSquareFilled />
          Add New Category
        </button>
        {selectedRowKeys?.length > 0 && (
          <button
            onClick={handleDelete}
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
        )}
      </div>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data}
        pagination={false}
      />

      <CustomModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        {modalContent == "add" ? (
          <form onSubmit={handleSubmit} className="py-4">
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Write Category Name
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Write category name..."
              />
            </div>

            <button
              disabled={!categoryName || addCategoryLoading}
              type="submit"
              className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
                !categoryName || (addCategoryLoading && "cursor-not-allowed")
              }`}
            >
              {addCategoryLoading ? <PrimaryLoading /> : "ADD"}
            </button>
          </form>
        ) : modalContent == "edit" ? (
          <form onSubmit={handleEdit} className="py-4">
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Edit Category Name
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setErrorMessage("");
                }}
              />
            </div>

            <button
              disabled={updateLoading}
              type="submit"
              className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
                updateLoading && "cursor-not-allowed"
              }`}
            >
              {updateLoading ? <PrimaryLoading /> : "SAVE CHANGES"}
            </button>
          </form>
        ) : null}
      </CustomModal>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Category;
