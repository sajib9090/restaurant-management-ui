import { useState } from "react";
import CustomModal from "../../components/Modal/Modal";
import PlanCard from "../../components/Plans/PlanCard";
import { PlusSquareFilled } from "@ant-design/icons";
import PrimaryLoading from "../../components/Loading/PrimaryLoading/PrimaryLoading";
import {
  useAddPlanMutation,
  useGetAllPlansQuery,
} from "../../redux/features/plan/planApi";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Plans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    plan_name: "",
    description: "",
    price: "",
    user_limit: "",
    features: "",
    limitations: "",
    terms_and_conditions: "",
  });

  const [addPlan, { isLoading: addPlanLoading }] = useAddPlanMutation();
  const { data: plans } = useGetAllPlansQuery();

  const handleChange = (e) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      plan_name: formData.plan_name,
      description: formData.description,
      price: formData.price,
      user_limit: formData.user_limit,
      features: formData.features,
      limitations: formData.limitations,
      terms_and_conditions: formData.terms_and_conditions,
    };
    try {
      const res = await addPlan(data).unwrap();
      if (res?.success) {
        setIsModalOpen(false);
      }
    } catch (error) {
      setErrorMessage(error?.message || error?.data?.message);
    }
  };

  const resetFormData = () => {
    setFormData(
      Object.keys(formData).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {})
    );
  };

  return (
    <div className="py-4">
      <button
        onClick={() => {
          setIsModalOpen(!isModalOpen);
          setErrorMessage("");
          resetFormData();
        }}
        className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg mb-12 rounded flex items-center justify-center gap-2"
      >
        <PlusSquareFilled />
        Add New Plan
      </button>

      <div className="grid grid-cols-3 gap-4">
        {plans?.data?.map((plan) => (
          <PlanCard
            key={plan?.plan_id}
            popular={plan?.plan_name == "pro"}
            actionButton={false}
            plan={plan}
          />
        ))}
      </div>

      <CustomModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        closeSymbolFalse={true}
      >
        <form onSubmit={handleSubmit} className="py-4">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="plan_name">
              Plan Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="plan_name"
              value={formData.plan_name}
              onChange={handleChange}
              placeholder="Write plan name..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded mt-1"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write description..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="price">
              Price
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Plan price..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="user_limit">
              User Limit
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="number"
              name="user_limit"
              value={formData.user_limit}
              onChange={handleChange}
              placeholder="User limit..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="features">
              Features
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded mt-1"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Write features..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="limitations">
              Limitations
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded mt-1"
              name="limitations"
              value={formData.limitations}
              onChange={handleChange}
              placeholder="Write limitations..."
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700"
              htmlFor="terms_and_conditions"
            >
              Terms and Conditions
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded mt-1"
              name="terms_and_conditions"
              value={formData.terms_and_conditions}
              onChange={handleChange}
              placeholder="Write Terms and conditions..."
            />
          </div>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={addPlanLoading}
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] 
                  ${addPlanLoading && "cursor-not-allowed"}
                `}
          >
            {addPlanLoading ? <PrimaryLoading /> : "ADD"}
          </button>
        </form>
      </CustomModal>
    </div>
  );
};

export default Plans;
