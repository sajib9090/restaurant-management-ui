/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import brandLogo from "../../../../public/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";
import { currentUserInfo } from "../../../redux/features/auth/authSlice";

const SideDataBar = ({ collapsed, dark }) => {
  const userInfo = useSelector(currentUserInfo);

  const firstLetters = userInfo?.brand?.brand_name
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
            <img
              src={userInfo?.brand?.brand_logo?.url || brandLogo}
              alt={userInfo?.brand?.brand_slug}
            />
          </div>
          <h1 className="text-2xl text-center font-bold uppercase">
            {firstLetters}
          </h1>
        </div>
      ) : (
        <div className={`mt-6 mb-10 ${dark ? "text-white" : "text-black"}`}>
          <div className="w-[50%] mx-auto">
            <img
              src={userInfo?.brand?.brand_logo?.url || brandLogo}
              alt={userInfo?.brand?.brand_slug}
            />
          </div>
          <h1 className="text-2xl text-center font-bold capitalize">
            {userInfo?.brand?.brand_name}
          </h1>
          <address className="text-center capitalize">
            {userInfo?.brand?.address?.sub_district || "sub district"},{" "}
            {userInfo?.brand?.address?.district || "District"}
          </address>
        </div>
      )}
    </div>
  );
};

export default SideDataBar;
