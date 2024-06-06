/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const PrimaryError = ({
  message,
  refresh,
  redirect,
  redirectLink,
  redirectMessage,
}) => {
  return (
    <div className="my-1 w-full border border-[#d0cfcf] rounded bg-gray-50">
      <div className="text-center my-6 text-red-600">
        {message}
        {refresh && (
          <span
            onClick={() => window.location.reload()}
            className="ml-2 underline cursor-pointer"
          >
            Please Refresh
          </span>
        )}
        {redirect && (
          <Link to={redirectLink} className="ml-2 underline cursor-pointer">
            {redirectMessage}
          </Link>
        )}
      </div>
    </div>
  );
};

export default PrimaryError;
