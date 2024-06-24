import { useState, useRef } from "react";
import defaultAvatar from "../../../public/image/avatar/6791548_avatar_person_profile_profile icon_user_icon.png";
import { CameraOutlined } from "@ant-design/icons";
import {
  useGetCurrentUserQuery,
  useUpdateUserAvatarMutation,
} from "../../redux/features/user/userApi";
import { toast } from "sonner";

const Profile = () => {
  const { data } = useGetCurrentUserQuery();
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef(null);

  const [updateUserAvatar, { isLoading: uploadLoading }] =
    useUpdateUserAvatarMutation();

  const handleFileChange = async (event) => {
    const file = event.target?.files[0];
  
    if (file) {
      const userId = data?.data?.user_id;

      try {
        const res = await updateUserAvatar({
          id: userId,
          avatar: file,
        }).unwrap();

        toast.success(res?.message || "Photo uploaded successfully:");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div>
      <div className="w-full h-auto bg-gray-100 p-8 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative flex-shrink-0">
            <img
              className="h-32 w-32 rounded-full shadow object-cover border-2 border-gray-300 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              src={
                data?.data?.avatar?.url
                  ? data?.data?.avatar?.url
                  : defaultAvatar
              }
              alt="User Avatar"
            />
            <div
              className="absolute inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={() => setShowOptions(true)}
              onMouseLeave={() => setShowOptions(false)}
            >
              {uploadLoading ? (
                <div className="text-white text-lg font-semibold">
                  Uploading...
                </div>
              ) : (
                <>
                  <CameraOutlined className="text-white text-2xl mb-1" />
                  <span className="text-white font-semibold">Change Image</span>
                  {showOptions && (
                    <div className="absolute top-12 flex flex-col bg-white px-2 py-8 rounded shadow-md">
                      <button
                        className="text-gray-800 hover:text-blue-600 w-[120px]"
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
              disabled={uploadLoading}
              id="fileInput"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="w-full lg:w-auto h-auto flex flex-col justify-center space-y-4 text-gray-800">
            <h1 className="text-3xl font-bold capitalize">
              {data?.data?.name}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg shadow-sm bg-white">
                <p className="text-sm font-semibold text-gray-600">Role</p>
                <p className="text-lg">{data?.data?.role}</p>
              </div>
              <div className="p-4 rounded-lg shadow-sm bg-white">
                <p className="text-sm font-semibold text-gray-600">Email</p>
                <p className="text-lg">{data?.data?.email}</p>
              </div>
              <div className="p-4 rounded-lg shadow-sm bg-white">
                <p className="text-sm font-semibold text-gray-600">Username</p>
                <p className="text-lg">{data?.data?.username}</p>
              </div>
              <div className="p-4 rounded-lg shadow-sm bg-white">
                <p className="text-sm font-semibold text-gray-600">Mobile</p>
                <p className="text-lg">{data?.data?.mobile}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
