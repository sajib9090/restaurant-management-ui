import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  useGetSinglePlanQuery,
  usePurchasePlanMutation,
} from "../../../redux/features/plan/planApi";
import CurrencyFormatter from "../../../components/Currencyformatter/CurrencyFormatter";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading/PrimaryLoading";
import { toast } from "sonner";

const SelectedPlan = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("plan");

  const navigate = useNavigate();

  const {
    data: plan,
    isLoading,
    error,
  } = useGetSinglePlanQuery(id, { skip: !id });
  const [purchasePlan, { isLoading: purchaseLoading }] =
    usePurchasePlanMutation();

  const calculateTax = (price) => price * 0.0;
  const calculateVAT = (price) => price * 0.0;
  const totalPrice = (price) =>
    price + calculateTax(price) + calculateVAT(price);

  const handleCreatePayment = async (plan) => {
    const data = {
      plan_id: plan?.plan_id,
      amount: totalPrice(plan?.price),
    };

    try {
      const response = await purchasePlan(data).unwrap();
      if (response) {
        navigate("/user");
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">An error occurred</p>;

  return (
    <div className="max-w-5xl mx-auto my-12 p-8 border rounded-lg shadow-2xl bg-gradient-to-r from-blue-50 to-blue-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        Selected Plan
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700 capitalize">
          {plan?.data.plan_name}
        </h2>
        <p className="text-gray-700 mb-6">{plan?.data?.description}</p>
        <div className="text-gray-700 mb-4">
          <strong className="text-blue-600">Price:</strong>{" "}
          <CurrencyFormatter value={plan?.data?.price} />
        </div>
        <div className="text-gray-700 mb-4">
          <strong className="text-blue-600">Users:</strong>{" "}
          {plan?.data?.user_limit}
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-blue-700">
            Features:
          </h3>
          <ul className="list-disc list-inside pl-4">
            {plan?.data?.features.split(". ").map((feature, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-blue-700">
            Limitations:
          </h3>
          <ul className="list-disc list-inside pl-4">
            {plan?.data?.limitations.split(". ").map((limitation, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {limitation}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-blue-700">
            Terms and Conditions:
          </h3>
          <p className="text-gray-700">
            {plan?.data?.terms_and_conditions || "Not specified"}
          </p>
        </div>
        <div className="border-t pt-6 mt-6">
          <h3 className="text-2xl font-semibold mb-2 text-blue-700">
            Billing Details:
          </h3>
          <div className="text-gray-700 mb-2 flex justify-between">
            <span>Base Price:</span>
            <CurrencyFormatter value={plan?.data?.price} />
          </div>
          <div className="text-gray-700 mb-2 flex justify-between">
            <span>Tax (0%):</span>
            <CurrencyFormatter value={calculateTax(plan?.data?.price)} />
          </div>
          <div className="text-gray-700 mb-2 flex justify-between">
            <span>VAT (0%):</span>
            <CurrencyFormatter value={calculateVAT(plan?.data?.price)} />
          </div>
          <div className="text-gray-700 mb-2 flex justify-between font-bold">
            <span>Total:</span>
            <CurrencyFormatter value={totalPrice(plan?.data?.price)} />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <button
            disabled={purchaseLoading}
            onClick={() => handleCreatePayment(plan?.data)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4"
          >
            {purchaseLoading ? <PrimaryLoading /> : "Proceed to Payment"}
          </button>
          <Link
            to="/user/pricing"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            Want to change your plan? View all plans
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectedPlan;
