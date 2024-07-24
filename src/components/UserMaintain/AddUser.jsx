import { useState } from "react";
import CustomModal from "../Modal/Modal";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useAddUserForMaintainBrandMutation } from "../../redux/features/user/userApi";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../FormInput/Input";

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [upgradeLink, setUpgradeLink] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobile: "",
    role: "",
    password: "",
  });

  const [addUserForMaintainBrand, { isLoading: addUserLoading }] =
    useAddUserForMaintainBrandMutation();

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

  const isFormIncomplete = Object.values(formData).some(
    (value) => value.trim() === ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormIncomplete) {
      setErrorMessage("All field are required");
      return;
    }

    const data = {
      name: formData?.name,
      username: formData?.username,
      mobile: formData?.mobile,
      role: formData?.role,
      password: formData?.password,
    };

    setErrorMessage("");
    setUpgradeLink(false);

    try {
      const res = await addUserForMaintainBrand(data).unwrap();
      if (res?.success) {
        setErrorMessage("");
        setIsModalOpen(false);
        setUpgradeLink(false);
      }
    } catch (error) {
      if (error?.data?.message?.includes("You have reached your user limit")) {
        setErrorMessage(error?.message || error?.data?.message);
        setUpgradeLink(true);
      } else {
        setErrorMessage(error?.message || error?.data?.message);
        setUpgradeLink(false);
      }
    }
  };
  return (
    <>
      <Button
        onclick={() => {
          setIsModalOpen(!isModalOpen);
          setFormData({
            name: "",
            username: "",
            mobile: "",
            role: "",
            password: "",
          });
          setErrorMessage("");
        }}
        title={"Add New User"}
      />

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
      >
        <form onSubmit={handleSubmit} className="py-4">
          <Input
            labelText={"Name"}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Write full name..."
          />
          <Input
            labelText="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Write username..."
          />
          <Input
            labelText={"Mobile"}
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Write mobile number..."
          />
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
          <Input
            labelText={"Password"}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Write secure password..."
            password={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          {upgradeLink && (
            <div className="mb-2">
              <Link to={"/user/pricing"} className="text-blue-600 underline">
                Want to Upgrade Plan?
              </Link>
            </div>
          )}
          <button
            disabled={addUserLoading || isFormIncomplete}
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
              addUserLoading && "cursor-not-allowed"
            }`}
          >
            {addUserLoading ? <PrimaryLoading /> : "ADD"}
          </button>
        </form>
      </CustomModal>
    </>
  );
};

export default AddUser;
