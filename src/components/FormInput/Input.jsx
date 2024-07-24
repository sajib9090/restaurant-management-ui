/* eslint-disable react/prop-types */
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  labelText,
  value,
  onChange,
  type,
  placeholder,
  name,
  password,
  showPassword,
  setShowPassword,
  required,
}) => {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700" htmlFor="email">
        {labelText}
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded mt-1"
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
      {password && (
        <span
          className="absolute right-3 top-10 cursor-pointer text-lg"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
};

export default Input;
