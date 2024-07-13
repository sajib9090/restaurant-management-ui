/* eslint-disable react/prop-types */
import { EditFilled } from "@ant-design/icons";
import { useState } from "react";
import CustomModal from "../Modal/Modal";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useChangeInfoByAuthorityMutation } from "../../redux/features/user/userApi";

const Edit = ({ user, userInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [changeInfoByAuthority, { isLoading: editUserLoading }] =
    useChangeInfoByAuthorityMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      role: formData.role,
      password: formData.password,
    };
    setErrorMessage("");
    try {
      const res = await changeInfoByAuthority({
        id: user?.user_id,
        ...data,
      }).unwrap();
      if (res) {
        setIsModalOpen(!isModalOpen);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      {user?.username !== userInfo?.username && (
        <button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
            setFormData({ role: "", password: "" });
            setErrorMessage("");
          }}
          title="Edit"
          className="text-blue-500 text-xl hover:text-blue-700 transition-transform transform hover:scale-110"
        >
          <EditFilled />
        </button>
      )}

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
      >
        <form onSubmit={handleSubmit} className="py-4">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="regular">Regular</option>
            </select>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700" htmlFor="email">
              Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Write secure password..."
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

          <button
            disabled={editUserLoading || (!formData.role && !formData.password)}
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
              editUserLoading && "cursor-not-allowed"
            }`}
          >
            {editUserLoading ? <PrimaryLoading /> : "SAVE CHANGES"}
          </button>
        </form>
      </CustomModal>
    </>
  );
};

export default Edit;
