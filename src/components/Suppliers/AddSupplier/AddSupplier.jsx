import { useState } from "react";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import CustomModal from "../../Modal/Modal";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";
import { useAddSupplierMutation } from "../../../redux/features/supplier/supplierApi";
import { toast } from "sonner";
import Button from "../../Button/Button";
import Input from "../../FormInput/Input";

const AddSupplier = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    mobile1: "",
    mobile2: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [addSupplier, { isLoading }] = useAddSupplierMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData?.name,
      company_name: formData?.company_name,
      mobile1: formData?.mobile1,
      mobile2: formData?.mobile2,
      email: formData?.email,
    };
    setErrorMessage("");
    try {
      const res = await addSupplier(data).unwrap();
      toast.success(res?.message || res?.data?.message);
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };
  return (
    <div>
      <Button
        title={"Add New Supplier"}
        onclick={() => {
          setIsModalOpen(!isModalOpen);
          setFormData({
            name: "",
            company_name: "",
            mobile1: "",
            mobile2: "",
            email: "",
          });
        }}
      />

      <CustomModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        closeSymbolFalse={true}
      >
        <form onSubmit={handleSubmit} className="py-4">
          <Input
            labelText={"Supplier name"}
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Write staff name..."
          />
          <Input
            labelText={"Supplier Company Name (Optional)"}
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Write staff name..."
          />
          <Input
            labelText={"Mobile"}
            type="text"
            name="mobile1"
            required
            value={formData.mobile1}
            onChange={handleChange}
            placeholder="Write staff name..."
          />
          <Input
            labelText={"Mobile (Optional)"}
            type="text"
            name="mobile2"
            value={formData.mobile2}
            onChange={handleChange}
            placeholder="Write staff name..."
          />

          <Input
            labelText={"Email (Optional)"}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Write staff name..."
          />
          {errorMessage && (
            <ErrorMessage
              errorMessage={errorMessage}
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Write staff name..."
            />
          )}
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            {isLoading ? <PrimaryLoading /> : "ADD"}
          </button>
        </form>
      </CustomModal>
    </div>
  );
};

export default AddSupplier;
