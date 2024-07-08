/* eslint-disable react/prop-types */
import { EditFilled } from "@ant-design/icons";
import { useState } from "react";
import CustomModal from "../../Modal/Modal";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import {
  useFetchCurrentUserMutation,
  useUpdateUserInfoMutation,
} from "../../../redux/features/user/userApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/features/auth/authSlice";

const EditProfile = ({ userInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(userInfo?.name || "");
  const [userName, setUserName] = useState(userInfo?.username || "");
  const [mobile, setMobile] = useState(userInfo?.mobile || "");
  const [errorMessage, setErrorMessage] = useState("");

  const [updateUserInfo, { isLoading: updateLoading }] =
    useUpdateUserInfoMutation();
  const [fetchCurrentUser] = useFetchCurrentUserMutation();
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      username: userName,
      mobile: mobile,
    };
    setErrorMessage("");
    try {
      const res = await updateUserInfo(data).unwrap();
      const res2 = await fetchCurrentUser().unwrap();
      if (res2?.success) {
        dispatch(setUserInfo(res2?.data));
        toast.success(res?.data?.message || res?.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      <button
        onMouseEnter={() => {
          setErrorMessage("");
          setName(userInfo?.name || "");
          setMobile(userInfo?.mobile || "");
        }}
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="absolute top-0 right-6 text-blue-600 text-xl"
      >
        <EditFilled />
      </button>

      <CustomModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        closeSymbolFalse={true}
      >
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <form onSubmit={handleEdit} className="py-4">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Username
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Mobile
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <button
            disabled={updateLoading}
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] ${
              updateLoading && "cursor-not-allowed"
            }`}
          >
            {updateLoading ? <PrimaryLoading /> : "SAVE CHANGES"}
          </button>
        </form>
      </CustomModal>
    </>
  );
};

export default EditProfile;
