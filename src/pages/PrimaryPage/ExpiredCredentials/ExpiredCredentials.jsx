import { Link } from "react-router-dom";
import expiredImage from "../../../../public/image/error/66815_key_error_icon.png";

const ExpiredCredentials = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-lg shadow-md">
        <img
          src={expiredImage}
          title="Credential Expired"
          className="w-24 mx-auto mb-8"
        />
        <h1 className="text-3xl font-bold text-red-500 mb-4">Token Expired</h1>
        <p className="text-gray-700 mb-6">
          Oops! It looks like your token has expired or your credentials are
          invalid.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-300"
        >
          Request New Token
        </Link>
        <p className="mt-4 text-gray-500">
          Need help?{" "}
          <Link to="/contact-support" className="text-blue-500 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ExpiredCredentials;
