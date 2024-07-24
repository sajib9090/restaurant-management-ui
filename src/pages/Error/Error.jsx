import { useNavigate } from "react-router-dom";
import errorImage from "../../assets/image/error/error.png";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-9xl font-extrabold text-white mb-4 animate-pulse">
        404
      </h1>
      <p className="text-2xl text-white mb-8">
        Oops! We can't seem to find the page you're looking for.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/user")}
          className="flex items-center px-6 py-3 bg-yellow-500 text-gray-800 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-all duration-300"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-all duration-300"
        >
          Go Back
        </button>
      </div>
      <img
        src={errorImage || "https://via.placeholder.com/400"}
        alt="Error Illustration"
        className="mt-8 w-80 h-80 object-cover"
      />
    </div>
  );
};

export default ErrorPage;
