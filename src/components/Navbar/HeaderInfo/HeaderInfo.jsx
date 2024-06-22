import { Dropdown } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import avatar from "../../../../public/image/avatar/6791548_avatar_person_profile_profile icon_user_icon.png";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { useGetCurrentUserQuery } from "../../../redux/features/user/userApi";

const HeaderInfo = () => {
  const { data: user } = useGetCurrentUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const items = [
    {
      key: "0",
      label: (
        <div className="my-4 w-64"  onClick={() => navigate("/user/profile")}>
          <div className="w-32 h-32 border border-gray-300 rounded-full mx-auto">
            <img
              className="rounded-full w-full h-full"
              src={user?.data?.avatar?.url ? user?.data?.avatar?.url : avatar}
              alt="avatar"
            />
          </div>
          <div className="text-center">
            <p className="capitalize mt-4">{user?.data?.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <Link className="text-lg" title="Profile" to="/user/profile">
          Profile
        </Link>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: (
        <Link className="text-lg" title="Profile" to="/user/brand">
          Brand
        </Link>
      ),
      icon: <QrcodeOutlined />,
    },
    {
      key: "3",
      label: (
        <button className="text-lg" title="Logout" onClick={handleLogout}>
          Logout
        </button>
      ),
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <div className="flex justify-center items-center">
      <div className="mr-2">
        <span> Hi, </span>
        <span title={user?.data?.name} className="font-bold capitalize">
          {user?.data?.name}
        </span>
      </div>

      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow
      >
        <div className="w-12 h-12 border border-gray-300 rounded-full cursor-pointer">
          <img
            className="rounded-full"
            src={user?.data?.avatar?.url ? user?.data?.avatar?.url : avatar}
            alt="avatar"
            title="Avatar"
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderInfo;
