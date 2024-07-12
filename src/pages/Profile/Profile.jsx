import { useState, useRef } from "react";
import defaultAvatar from "../../assets/image/avatar/6791548_avatar_person_profile_profile icon_user_icon.png";
import { CameraOutlined } from "@ant-design/icons";
import {
  useFetchCurrentUserMutation,
  useUpdateUserAvatarMutation,
} from "../../redux/features/user/userApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserInfo,
  setUserInfo,
} from "../../redux/features/auth/authSlice";
import EditProfile from "../../components/Profile/EditProfile/EditProfile";
import RequestPasswordChange from "../../components/Profile/RequestPasswordChange/RequestPasswordChange";
import AccessError from "../../components/AccessError/AccessError";

const Profile = () => {
  const userInfo = useSelector(currentUserInfo);
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef(null);

  const [updateUserAvatar, { isLoading: uploadLoading, error: updateError }] =
    useUpdateUserAvatarMutation();
  const [fetchCurrentUser, { isLoading, error }] =
    useFetchCurrentUserMutation();
  const dispatch = useDispatch();

  const handleFileChange = async (event) => {
    const file = event.target?.files[0];

    if (file) {
      const userId = userInfo?.user_id;

      try {
        const res = await updateUserAvatar({
          id: userId,
          avatar: file,
        }).unwrap();
        const userInfo = await fetchCurrentUser().unwrap();
        dispatch(setUserInfo(userInfo?.data));
        toast.success(res?.message || "Photo uploaded successfully:");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  const allError = error || updateError;
  if (allError) {
    return (
      <AccessError
        errorMessage={allError?.data?.message || allError?.message}
      />
    );
  }

  return (
    <div className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-lg relative">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="relative flex-shrink-0">
          <img
            className="h-32 w-32 rounded-full shadow object-cover border-2 border-gray-300 transition-transform duration-300 transform hover:scale-110 cursor-pointer"
            src={userInfo?.avatar?.url || defaultAvatar}
            alt="User Avatar"
          />
          <div
            className="absolute inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onClick={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
          >
            {uploadLoading || isLoading ? (
              <div className="text-white text-lg font-semibold">
                Uploading...
              </div>
            ) : (
              <>
                <CameraOutlined className="text-white text-2xl mb-1" />
                <span className="text-white font-semibold">Change Image</span>
                {showOptions && (
                  <div className="absolute top-12 flex flex-col bg-white px-4 py-2 rounded shadow-md">
                    <button
                      className="text-gray-800 hover:text-blue-600 w-full text-left py-1"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Upload
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <input
            type="file"
            disabled={uploadLoading || isLoading}
            id="fileInput"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="w-full lg:w-auto h-auto flex flex-col justify-center space-y-4 text-gray-800">
          <h1 className="text-3xl font-bold capitalize">{userInfo?.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg shadow-sm bg-green-100 transition-transform duration-200 transform hover:scale-105">
              <p className="text-sm font-semibold text-gray-600">Status</p>
              <p className="text-lg">{userInfo?.role}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-yellow-100 transition-transform duration-200 transform hover:scale-105">
              <p className="text-sm font-semibold text-gray-600">Email</p>
              <p className="text-lg">{userInfo?.email || "N/A"}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-lime-100 transition-transform duration-200 transform hover:scale-105">
              <p className="text-sm font-semibold text-gray-600">Username</p>
              <p className="text-lg">{userInfo?.username}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-blue-100 transition-transform duration-200 transform hover:scale-105">
              <p className="text-sm font-semibold text-gray-600">Mobile</p>
              <p className="text-lg">{userInfo?.mobile}</p>
            </div>
          </div>
        </div>
      </div>
      <RequestPasswordChange />
      <EditProfile userInfo={userInfo} />
    </div>
  );
};

export default Profile;
