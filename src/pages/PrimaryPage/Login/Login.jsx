import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useState } from "react";
import Lottie from "lottie-react";
import restaurant from "../../../../public/animation/Animation - 1716694632912.json";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../../redux/features/auth/authSlice";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading/PrimaryLoading";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username_email_mobile: formData?.email,
      password: formData?.password,
    };

    if (!data?.username_email_mobile || !data?.password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const res = await login(data).unwrap();
      const token = res?.accessToken;
      const decoded = jwtDecode(token);

      const user = {
        user: decoded,
        token: token,
      };

      dispatch(setUser(user));
      navigate("/user");
    } catch (error) {
      setErrorMessage("Login failed: " + error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen login">
      <div className="flex justify-center items-center min-h-screen login-content max-w-[118rem] mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-2 text-center">Good Morning</h2>
          <p className="text-gray-600 mb-8 text-center">
            Enter the information you entered while registering
          </p>
          {errorMessage && (
            <div
              className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email or Username or Mobile
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email or Username or Mobile"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
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
            <div className="mb-4 flex items-center justify-end">
              <Link
                href="#"
                className="text-sm text-yellow-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              disabled={
                formData?.email?.length == 0 ||
                formData?.password?.length == 0 ||
                isLoading
              }
              type="submit"
              className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
            >
              {isLoading ? <PrimaryLoading /> : "LOGIN"}
            </button>

            {/* <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div> */}
            {/* <button
            type="button"
            className="w-full bg-white text-gray-700 border border-gray-300 p-3 rounded-lg flex items-center justify-center hover:bg-gray-100 transition duration-200"
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            Sign in with Google
          </button> */}
          </form>
          <p className="mt-8 text-center text-gray-700">
            Dont have an account?{" "}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
        <div className="hidden md:block w-1/2 h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <Lottie
              className="h-[380px]"
              animationData={restaurant}
              loop={true}
            />
            <p className="text-white text-2xl font-semibold -mt-12">
              Innovative Solutions for Modern Restaurants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
