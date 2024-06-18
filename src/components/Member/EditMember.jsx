/* eslint-disable react/prop-types */
import { useState } from "react";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";
import { useUpdateMemberMutation } from "../../redux/features/member/memberApi";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { toast } from "sonner";

const EditMember = ({ memberData, setIsModalOpen, setSelectedRowKeys }) => {
  const [name, setName] = useState(memberData?.name || "");
  const [discount, setDiscount] = useState(memberData?.discount_value || "");
  const [errorMessage, setErrorMessage] = useState("");

  const [updateMember] = useUpdateMemberMutation();
  let isLoading = false;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    if (name !== memberData.name) {
      data.name = name;
    }
    if (discount !== memberData.discount_value) {
      data.discount = discount;
    }
    if (Object.keys(data).length > 0) {
      try {
        const res = await updateMember({
          id: memberData?._id,
          ...data,
        }).unwrap();

        if (res) {
          toast.success("Member updated successfully");
          setSelectedRowKeys([]);
          setIsModalOpen(false);
        }
      } catch (error) {
        setErrorMessage(error?.data?.message);
      }
    } else {
      toast.error("No changes to submit.");
    }
  };
  return (
    <div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <form onSubmit={handleSubmit} className="py-4">
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Name
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded mt-1"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessage("");
            }}
            placeholder="Name..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Discount %
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded mt-1"
            type="text"
            value={discount}
            onChange={(e) => {
              setDiscount(e.target.value);
              setErrorMessage("");
            }}
            placeholder="Discount value..."
          />
        </div>

        <button
          //   disabled={!setStaffName || isLoading}
          type="submit"
          className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]`}
        >
          {isLoading ? <PrimaryLoading /> : "SAVE CHANGES"}
        </button>
      </form>
    </div>
  );
};

export default EditMember;
