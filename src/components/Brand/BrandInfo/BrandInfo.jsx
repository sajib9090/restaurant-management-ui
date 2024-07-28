/* eslint-disable react/prop-types */
import defaultLogo from "../../../assets/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";

const BrandInfo = ({ logo, name }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="w-8 h-8 object-fill"
        src={logo || defaultLogo}
        alt={name}
      />
      <p className="capitalize">{name}</p>
    </div>
  );
};

export default BrandInfo;
