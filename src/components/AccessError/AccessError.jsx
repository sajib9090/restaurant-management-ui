/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const AccessError = ({ errorMessage, paymentError, selectedPlanId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div
        className="bg-red-100 text-red-700 px-16 py-16 rounded-lg shadow-lg flex flex-col items-center"
        role="alert"
      >
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-red-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
            ></path>
          </svg>
          <strong className="font-bold">Error: </strong>
        </div>
        <span className="block text-center mb-4">{errorMessage}</span>
        {paymentError && (
          <button
            onClick={() =>
              navigate(
                `/user/pricing${
                  selectedPlanId && `/plans?plan=${selectedPlanId}`
                }`
              )
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Go to Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default AccessError;
