import { useSelector } from "react-redux";
import { currentUserDetails } from "../../../redux/features/auth/authSlice";

/* eslint-disable react/prop-types */
const SideDataBar = ({ collapsed, dark }) => {
  const user = useSelector(currentUserDetails);
  const firstLetters = user?.brand?.brand_name
    ?.split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <div
      className={`min-h-[200px] flex flex-col justify-center w-full ${
        collapsed ? "w-[40px]" : "w-[200px]"
      }  ${dark ? "bg-[#001529]" : " bg-white"}`}
    >
      {collapsed ? (
        <div className={`mt-6 mb-10 ${dark ? "text-white" : "text-black"}`}>
          <div className="w-[80%] mx-auto">
            <img src={user?.brand?.brand_logo} alt={user?.brand?.brand_slug} />
          </div>
          <h1 className="text-2xl text-center font-bold uppercase">
            {firstLetters}
          </h1>
        </div>
      ) : (
        <div className={`mt-6 mb-10 ${dark ? "text-white" : "text-black"}`}>
          <div className="w-[50%] mx-auto">
            <img src={user?.brand?.brand_logo} alt={user?.brand?.brand_slug} />
          </div>
          <h1 className="text-2xl text-center font-bold capitalize">
            {user?.brand?.brand_name}
          </h1>
          <address className="text-center">Naria, Shariatpur</address>
        </div>
      )}
    </div>
  );
};

export default SideDataBar;
