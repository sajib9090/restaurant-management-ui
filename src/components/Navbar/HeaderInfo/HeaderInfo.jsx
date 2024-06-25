import { Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserInfo,
  logout,
} from "../../../redux/features/auth/authSlice";
import avatar from "../../../../public/image/avatar/6791548_avatar_person_profile_profile icon_user_icon.png";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";

const HeaderInfo = () => {
  const userInfo = useSelector(currentUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      key: "0",
      label: (
        <div className="my-4 w-64" onClick={() => navigate("/user/profile")}>
          <div className="w-44 h-44 border border-gray-300 rounded-full mx-auto">
            <img
              className="w-full h-full rounded-full object-cover"
              src={userInfo?.avatar?.url || avatar}
              alt="avatar"
            />
          </div>
          <div className="text-center mt-4">
            <p className="capitalize">{userInfo?.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: "1",
      icon: <UserOutlined />,
      label: (
        <Link className="text-lg" title="Profile" to="/user/profile">
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      icon: <QrcodeOutlined />,
      label: (
        <Link className="text-lg" title="Brand" to="/user/brand">
          Brand
        </Link>
      ),
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: (
        <button className="text-lg" title="Logout" onClick={handleLogout}>
          Logout
        </button>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="mr-2">
        <span> Hi, </span>
        <span title={userInfo?.name} className="font-bold capitalize">
          {userInfo?.name}
        </span>
      </div>

      <Dropdown
        overlay={<Menu items={menuItems} />}
        placement="bottomRight"
        arrow
      >
        <div className="w-12 h-12 border border-gray-300 rounded-full cursor-pointer">
          <img
            className="w-full h-full rounded-full object-cover"
            src={userInfo?.avatar?.url || avatar}
            alt="avatar"
            title="Avatar"
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderInfo;
