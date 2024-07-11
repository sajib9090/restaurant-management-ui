/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomModal from "../../Modal/Modal";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { useChangeOwnPasswordMutation } from "../../../redux/features/user/userApi";
import { toast } from "sonner";

const RequestPasswordChange = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

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
  };

  const [changeOwnPassword, { isLoading: changePasswordLoading }] =
    useChangeOwnPasswordMutation();

  const isFormIncomplete = Object.values(formData).some(
    (value) => value.trim() === ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormIncomplete) {
      setErrorMessage("All field are required");
      return;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage("New Password and Confirm New Password must match.");
      return;
    }

    const data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmNewPassword,
    };
    setErrorMessage("");
    try {
      const res = await changeOwnPassword(data).unwrap();
      if (res) {
        setErrorMessage("");
        toast.success(res?.data?.message || res?.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      setErrorMessage(error?.message || error?.data?.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mb-2 mt-8">
        <button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
            setFormData({
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            });
          }}
          className="hover:underline text-blue-600"
        >
          Request change password?
        </button>
      </div>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
      >
        <form onSubmit={handleSubmit} className="py-4">
          <div className="mb-4 relative">
            <label className="block text-gray-700" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Old Password..."
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-lg"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700" htmlFor="newPassword">
              New Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password..."
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-lg"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700" htmlFor="confirmNewPassword">
              Confirm New Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type={showConfirmNewPassword ? "text" : "password"}
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm New Password..."
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-lg"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            >
              {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

          <button
            disabled={changePasswordLoading}
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
              changePasswordLoading && "cursor-not-allowed"
            }`}
          >
            {changePasswordLoading ? <PrimaryLoading /> : "SAVE CHANGES"}
          </button>
        </form>
      </CustomModal>
    </>
  );
};

export default RequestPasswordChange;
