/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "sonner";
import CustomModal from "../../Modal/Modal";
import { useAddStaffMutation } from "../../../redux/features/staff/staffApi";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";
import Button from "../../Button/Button";
import Input from "../../FormInput/Input";

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
    <>
      <Button
        title={"Add New Staff"}
        onclick={() => {
          setIsModalOpen(!isModalOpen);
          setErrorMessage("");
          setStaffName("");
        }}
      />

      <CustomModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        closeSymbolFalse={true}
      >
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <form onSubmit={handleSubmit} className="py-4">
          <Input
            labelText={"Staff Name"}
            type="text"
            value={staffName}
            onChange={(e) => {
              setStaffName(e.target.value);
              setErrorMessage("");
            }}
            placeholder="Write staff name..."
          />

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
    </>
  );
};

export default AddStaff;
