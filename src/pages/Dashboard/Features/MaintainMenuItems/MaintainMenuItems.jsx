import { useState } from "react";
import MenuCategory from "../../../../components/MenuItem/MenuCategory";
import { useAddMenuItemMutation } from "../../../../redux/features/menuItemApi/menuItemApi";
import { PlusSquareFilled } from "@ant-design/icons";
import CustomModal from "../../../../components/Modal/Modal";
import PrimaryLoading from "../../../../components/Loading/PrimaryLoading/PrimaryLoading";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useGetAllCategoriesQuery } from "../../../../redux/features/category/categoryApi";

const MaintainMenuItems = () => {
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    item_name: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.trim() === "") {
      setErrorMessage(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    } else {
      setErrorMessage("");
    }

    if (name == "item_name") {
      if (value?.length < 2) {
        setErrorMessage("Item name should be minimum 2 char long");
      } else {
        setErrorMessage("");
      }
    }
    if (name == "price") {
      if (isNaN(value) || value <= 0) {
        setErrorMessage("Price should be positive number");
      } else {
        setErrorMessage("");
      }
    }
  };

  const [addMenuItem, { isLoading: addLoading }] = useAddMenuItemMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const data = {
      item_name: formData?.item_name,
      category: formData?.category,
      discount: formData?.discount,
      item_price: formData?.price,
    };

    try {
      const res = await addMenuItem(data).unwrap();
      if (res) {
        toast.success("New Menu item has been created");
        setIsModalOpen(!isModalOpen);
        setFormData({
          item_name: "",
          category: "",
          price: "",
        });
      }
    } catch (error) {
      setErrorMessage(error?.data?.message);
    }
  };

  return (
    <div>
        <div>
          <button
            onClick={() => {
              setIsModalOpen(!isModalOpen);
              setErrorMessage("");
              setFormData({
                item_name: "",
                category: "",
                price: "",
              });
            }}
            className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg my-6 rounded flex items-center justify-center gap-2"
          >
            <PlusSquareFilled />
            Add New Menu Item
          </button>
        </div>
        <MenuCategory categoriesData={categoriesData} />
      

      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <div className="pt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Item Name*</label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                placeholder="Write item name..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category*</label>
              <div className="my-1 text-[14px]">
                <Link
                  to="/user/dashboard/features/maintain-categories"
                  className="underline hover:text-blue-600"
                >
                  Add a Category
                  <span className="animate-pulse text-blue-600 ml-2">
                    click here
                  </span>
                </Link>
              </div>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1"
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categoriesData?.data?.map((c) => (
                  <option
                    className="capitalize"
                    key={c?._id}
                    value={c.category}
                  >
                    {c?.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Item Price*</label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price..."
              />
            </div>
            <button
              disabled={
                formData?.item_name?.length == 0 ||
                formData?.category?.length == 0 ||
                formData?.price <= 0
              }
              type="submit"
              className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
            >
              {addLoading ? <PrimaryLoading /> : "ADD"}
            </button>
          </form>
        </div>
      </CustomModal>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default MaintainMenuItems;
