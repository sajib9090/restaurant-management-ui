/* eslint-disable react/prop-types */
import { EditFilled } from "@ant-design/icons";
import CustomModal from "../../Modal/Modal";
import { useState } from "react";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";
import { useUpdateBrandInfoMutation } from "../../../redux/features/brand/brandApi";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { toast } from "sonner";
import { useFetchCurrentUserMutation } from "../../../redux/features/user/userApi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/features/auth/authSlice";

const EditBrand = ({ brandInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [updateBrandInfo, { isLoading: updateLoading }] =
    useUpdateBrandInfoMutation();

  const [fetchCurrentUser, { isLoading }] = useFetchCurrentUserMutation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    brand_name: brandInfo?.brand_name || "",
    mobile1: brandInfo?.contact?.mobile1 || "",
    mobile2: brandInfo?.contact?.mobile2 || "",
    location: brandInfo?.address?.location || "",
    sub_district: brandInfo?.address?.sub_district || "",
    district: brandInfo?.address?.district || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = formData;
    setErrorMessage("");
    try {
      const res = await updateBrandInfo(data).unwrap();
      const userInfo = await fetchCurrentUser().unwrap();
      dispatch(setUserInfo(userInfo?.data));
      toast.success(res?.message);
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(error?.data?.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        title="Edit"
        className="absolute top-0 right-6 text-blue-600 text-xl cursor-pointer"
      >
        <EditFilled />
      </button>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
      >
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <form onSubmit={handleEdit} className="py-4">
          <div className="mb-4">
            <label className="block text-blue-800">Name</label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1 text-gray-400"
              type="text"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-800">Contact</label>
            <div className="ml-16">
              <div className="mb-2">
                <label className="block text-orange-800">Mobile-1</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded mt-1 text-gray-400"
                  type="text"
                  name="mobile1"
                  value={formData.mobile1}
                  onChange={handleChange}
                  placeholder="Add Mobile Number"
                />
              </div>
              <div className="mb-2">
                <label className="block text-orange-800">Mobile-2</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded mt-1 text-gray-400"
                  type="text"
                  name="mobile2"
                  value={formData.mobile2}
                  onChange={handleChange}
                  placeholder="Add Mobile Number"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-blue-800">Address</label>
            <div className="ml-16">
              <div className="mb-2">
                <label className="block text-orange-800">Location</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded mt-1 text-gray-400"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Add exact location like - plaza or market floor etc"
                />
              </div>
              <div className="mb-2">
                <label className="block text-orange-800">Sub-District</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded mt-1 text-gray-400"
                  type="text"
                  name="sub_district"
                  value={formData.sub_district}
                  onChange={handleChange}
                  placeholder="Sub district or upazila or like mirpur-12"
                />
              </div>
              <div className="mb-2">
                <label className="block text-orange-800">District</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded mt-1 text-gray-400"
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Add district"
                />
              </div>
            </div>
          </div>

          <button
            disabled={updateLoading || isLoading}
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]`}
          >
            {updateLoading || isLoading ? <PrimaryLoading /> : "SAVE CHANGES"}
          </button>
        </form>
      </CustomModal>
    </>
  );
};

export default EditBrand;
