import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import otpAnimation from "../../../assets/animation/Animation - 1716694632912.json";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useRegenerateOTPMutation,
  useVerifyUserMutation,
} from "../../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useFetchCurrentUserMutation } from "../../../redux/features/user/userApi";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading/PrimaryLoading";
import {
  logout,
  setUser,
  setUserInfo,
} from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";

const OtpValidation = () => {
  const otpExpirationTime = 120; //second
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.search?.split("=")[1];
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [remainingTime, setRemainingTime] = useState(otpExpirationTime);
  const [isOtpResent, setIsOtpResent] = useState(false);

  const [verifyUser, { isLoading: verifyLoading }] = useVerifyUserMutation();
  const [regenerateOTP, { isLoading: regenerateLoading }] =
    useRegenerateOTPMutation();
  const [fetchCurrentUser, { isLoading: fetchCurrentUserInfoLoading }] =
    useFetchCurrentUserMutation();

  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    const userId = location?.search?.split("=")[1];
    if (userId) {
      const data = {
        id,
        otp: otpCode,
      };
      try {
        const res = await verifyUser(data).unwrap();
        const token = res?.accessToken;
        const decoded = jwtDecode(token);

        const user = {
          user: decoded,
          token: token,
        };

        dispatch(setUser(user));
        try {
          const userInfoRes = await fetchCurrentUser().unwrap();
          dispatch(setUserInfo(userInfoRes?.data));
          navigate("/user");
        } catch (error) {
          dispatch(logout());
          toast.error("Failed to fetch user info");
        }
      } catch (error) {
        setErrorMessage(
          error?.data?.message || "Invalid OTP. Please try again."
        );
      }
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage(null);
    if (id) {
      try {
        const res = await regenerateOTP(id).unwrap();
        if (res) {
          setIsOtpResent(true);
          setOtp(["", "", "", "", "", ""]);
          setRemainingTime(otpExpirationTime);
          toast.success("OTP resend successfully at your email");
        }
      } catch (error) {
        setErrorMessage(
          error?.data?.message || "Failed to resend OTP. Please try again."
        );
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const isOtpComplete = otp?.every((digit) => digit !== "");

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center min-h-screen max-w-[118rem] mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-[#0F0C0B] mb-6">
            Enter the OTP Code
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Please enter the 6-digit code we sent to your email.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  className="shadow appearance-none border rounded w-12 py-2 px-3 text-[#0F0C0B] leading-tight focus:outline-none focus:shadow-outline text-center text-2xl"
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>
            {errorMessage && (
              <div className="flex items-center justify-between pb-4">
                <div className="w-full text-red-600 text-center">
                  {errorMessage}
                </div>
              </div>
            )}
            <div className="text-gray-600 text-center mb-4">
              {remainingTime > 0 ? (
                <p>Time remaining: {formatTime(remainingTime)}</p>
              ) : (
                <p className="text-red-600">
                  OTP expired.{" "}
                  <button
                    disabled={regenerateLoading}
                    type="button"
                    onClick={() => handleResendOtp()}
                    className="text-blue-500 underline"
                  >
                    Resend OTP
                  </button>
                </p>
              )}
            </div>
            {isOtpResent && remainingTime > 0 && (
              <div className="text-green-600 text-center mb-4">
                OTP has been re-sent successfully!
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                disabled={
                  verifyLoading ||
                  remainingTime === 0 ||
                  !isOtpComplete ||
                  regenerateLoading
                }
                className="w-full flex justify-center items-center bg-[#0F0C0B] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
                type="submit"
              >
                {verifyLoading ||
                regenerateLoading ||
                fetchCurrentUserInfoLoading ? (
                  <PrimaryLoading />
                ) : (
                  "VERIFY"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block w-1/2 h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <Lottie
              className="h-[380px]"
              animationData={otpAnimation}
              loop={true}
            />
            <p className="text-white text-2xl font-semibold -mt-12">
              Secure and Fast OTP Verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpValidation;
