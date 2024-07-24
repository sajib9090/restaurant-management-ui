import { useState } from "react";
import MenuCategory from "../../../../components/MenuItem/MenuCategory";
import { useAddMenuItemMutation } from "../../../../redux/features/menuItemApi/menuItemApi";
import CustomModal from "../../../../components/Modal/Modal";
import PrimaryLoading from "../../../../components/Loading/PrimaryLoading/PrimaryLoading";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "../../../../redux/features/category/categoryApi";
import TitleComponent from "../../../../components/TitleComponent/TitleComponent";
import LocationPath from "../../../../components/LocationPath/LocationPath";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/FormInput/Input";

const MaintainMenuItems = () => {
  const location = useLocation();
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetAllCategoriesQuery();

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
      <TitleComponent title={LocationPath(location)} />
      <Button
        title={"Add New Menu Item"}
        onclick={() => {
          setIsModalOpen(!isModalOpen);
          setErrorMessage("");
          setFormData({
            item_name: "",
            category: "",
            price: "",
          });
        }}
      />
      <MenuCategory
        categoriesData={categoriesData}
        isLoading={addLoading || categoryLoading}
      />

      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <div className="pt-4">
          <form onSubmit={handleSubmit}>
            <Input
              labelText={"Item Name*"}
              type={"text"}
              placeholder={"Write item name..."}
              onChange={handleChange}
              name={"item_name"}
            />
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
            <Input
              labelText={"Item Price*"}
              type={"text"}
              placeholder={"Price..."}
              value={formData?.price}
              onChange={handleChange}
              name={"price"}
            />
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
    </div>
  );
};

export default MaintainMenuItems;
