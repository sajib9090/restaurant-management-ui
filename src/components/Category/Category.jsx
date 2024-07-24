/* eslint-disable react/prop-types */
import { Table, Pagination } from "antd";
import { useState } from "react";
import { EditFilled } from "@ant-design/icons";
import { toast } from "sonner";
import CustomModal from "../Modal/Modal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/features/category/categoryApi";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";
import IndividualLoading from "../Loading/IndividualLoading/IndividualLoading";
import Button from "../Button/Button";
import DeleteButton from "../Button/DeleteButton";
import SearchInput from "../SearchInput/SearchInput";
import Input from "../FormInput/Input";
import defaultLogo from "../../assets/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";

const Category = ({
  categories,
  searchValue,
  setSearchValue,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  categoryLoading,
  user,
}) => {
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

  const data =
    (categories &&
      categories?.data?.map((category) => ({
        key: category?.category_id,
        category: category?.category,
        brand: (
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-8 h-8 object-fill"
              src={category?.brand_info?.brand_logo?.url || defaultLogo}
              alt={category?.brand_info?.brand_name}
            />
            <p className="capitalize">{category?.brand_info?.brand_name}</p>
          </div>
        ),
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

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

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

  const isLoading =
    categoryLoading || addCategoryLoading || updateLoading || deleteLoading;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button
          onclick={() => {
            setIsModalOpen(!isModalOpen);
            setErrorMessage("");
            setModalContent("add");
            setCategoryName("");
          }}
          title={"Add New Category"}
        />
        {selectedRowKeys?.length > 0 && (
          <DeleteButton
            deleteTitle={"Categories"}
            onConfirm={handleDelete}
            deleteLoading={deleteLoading}
            selectedRowKeys={selectedRowKeys}
          />
        )}
      </div>

      <div className="my-4">
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>

      {isLoading ? (
        <IndividualLoading contentLength={50} />
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
          total={categories?.data_found || 0}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>

      <CustomModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        closeSymbolFalse={true}
      >
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        {modalContent == "add" ? (
          <form onSubmit={handleSubmit} className="py-4">
            <Input
              labelText={"Write Category Name"}
              type={"text"}
              placeholder={"Write category name..."}
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setErrorMessage("");
              }}
            />

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
            <Input
              labelText={"Edit Category Name"}
              type={"text"}
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setErrorMessage("");
              }}
            />

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
    </div>
  );
};

export default Category;
