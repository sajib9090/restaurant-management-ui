import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import restaurant from "../../../assets/animation/Animation - 1716694632912.json";
import { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading/PrimaryLoading";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import useGreetings from "../../../components/Greetings/Greetings";

const Register = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brand_name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.trim() === "") {
      setErrorMessage(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    } else {
      setErrorMessage("");
    }
    if (name === "mobile") {
      if (value.length !== 11) {
        setErrorMessage("Please enter valid mobile number");
        return;
      } else {
        setErrorMessage("");
      }
    }
    if (name === "password") {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
      if (!passwordRegex.test(value)) {
        setErrorMessage(
          "Password must contain at least one letter (a-z) and one number"
        );
      } else {
        setErrorMessage("");
      }
    }
  };

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, brand_name, mobile, email, password } = formData;

    if (!name || !brand_name || !mobile || !email || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    const data = {
      name,
      email,
      brand_name,
      mobile: mobile,
      password,
    };
    try {
      const res = await register(data).unwrap();
      if (res?.success) {
        navigate(`/otp-check?otp=${res?.data}`);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Registration failed: " + error?.data?.message);
    }
  };
  const { currentDateTime, greeting } = useGreetings();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 register">
      <div className="flex flex-col md:flex-row justify-center items-center w-full min-h-screen py-8 px-16 bg-black bg-opacity-65">
        <div className=" p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 bg-white">
          <h2 className="text-3xl font-bold text-center">{greeting}</h2>
          <p className="text-center mb-2 text-[16px]">{currentDateTime}</p>
          <p className="text-gray-600 mb-8 text-center">
            Enter the information those is required
          </p>
          {errorMessage && (
            <div
              className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Brand Name</label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                placeholder="Enter your Brand name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mobile</label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your Mobile number"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type={visible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {visible ? (
                <EyeFilled
                  onClick={() => setVisible(!visible)}
                  className="absolute bottom-[14px] right-3 cursor-pointer text-xl"
                />
              ) : (
                <EyeInvisibleFilled
                  onClick={() => setVisible(!visible)}
                  className="absolute bottom-[14px] right-3 cursor-pointer text-xl"
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
            >
              {isLoading ? <PrimaryLoading /> : "REGISTER"}
            </button>
          </form>
          <p className="mt-8 text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
        <div className="hidden md:block md:w-1/2 lg:w-2/3 h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <Lottie
              className="h-[380px]"
              animationData={restaurant}
              loop={true}
            />
            <p className="text-white text-2xl font-semibold -mt-12 text-center">
              Innovative Solutions for Modern Restaurants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
