/* eslint-disable react/prop-types */
import { PlusSquareFilled } from "@ant-design/icons";
import { useState } from "react";
import {  toast } from "sonner";
import CustomModal from "../../Modal/Modal";
import { useAddStaffMutation } from "../../../redux/features/staff/staffApi";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";

const AddStaff = ({ setSelectedRowKeys }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [staffName, setStaffName] = useState(false);

  const [addStaff, { isLoading }] = useAddStaffMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: staffName,
    };
    try {
      const res = await addStaff(data).unwrap();

      if (res) {
        toast.success(`New Staff ${res?.data?.name} has been added`);
        setSelectedRowKeys([]);
        setIsModalOpen(!isModalOpen);
        setStaffName("");
      }
    } catch (error) {
      setErrorMessage(error?.data?.message);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setIsModalOpen(!isModalOpen);
          setErrorMessage("");
          setStaffName("");
        }}
        className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg my-4 rounded flex items-center justify-center gap-2"
      >
        <PlusSquareFilled />
        Add New Staff
      </button>

      <CustomModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <form onSubmit={handleSubmit} className="py-4">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Staff name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              value={staffName}
              onChange={(e) => {
                setStaffName(e.target.value);
                setErrorMessage("");
              }}
              placeholder="Write staff name..."
            />
          </div>

          <button
            disabled={!setStaffName || isLoading}
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
              !staffName || (isLoading && "cursor-not-allowed")
            }`}
          >
            {isLoading ? <PrimaryLoading /> : "ADD"}
          </button>
        </form>
      </CustomModal>
    </div>
  );
};

export default AddStaff;
