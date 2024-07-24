/* eslint-disable react/prop-types */
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";
import { useAddMemberMutation } from "../../redux/features/member/memberApi";
import { toast } from "sonner";
import Input from "../FormInput/Input";

const AddMember = ({ setIsModalOpen, isModalOpen }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [addMember, { isLoading }] = useAddMemberMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      mobile: mobile,
    };
    setErrorMessage("");
    try {
      const res = await addMember(data).unwrap();
      if (res) {
        toast.success("New Member has been created");
        setIsModalOpen(!isModalOpen);
        setName("");
        setMobile("");
      }
    } catch (error) {
      setErrorMessage(error?.data?.message);
    }
  };
  return (
    <div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <form onSubmit={handleSubmit} className="py-4">
        <Input
          labelText={"Customer Name"}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorMessage("");
          }}
          placeholder="Customer name..."
        />

        <Input
          labelText={" Customer Mobile Number"}
          type="text"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
            setErrorMessage("");
          }}
          placeholder="Mobile number..."
        />

        <button
          disabled={!name || isLoading}
          type="submit"
          className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
            !name || (isLoading && "cursor-not-allowed")
          }`}
        >
          {isLoading ? <PrimaryLoading /> : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddMember;
