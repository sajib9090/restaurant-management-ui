/* eslint-disable react/prop-types */
import { PlusSquareFilled } from "@ant-design/icons";
const Button = ({ title, onclick }) => {
  return (
    <button
      onClick={onclick}
      className="h-[40px] px-4 border border-gray-300 text-blue-500 text-lg my-4 rounded flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white duration-700 transition-all"
    >
      <PlusSquareFilled />
      {title}
    </button>
  );
};

export default Button;
