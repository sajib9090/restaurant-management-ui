import { Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUser,
  logout,
} from "../../../redux/features/auth/authSlice";
import avatar from "../../../../public/image/avatar/6791548_avatar_person_profile_profile icon_user_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const HeaderInfo = () => {
  const user = useSelector(currentUser);
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
        <div className="my-4">
          <div className="w-32 h-32 border border-gray-300 rounded-full">
            <img
              className="rounded-full"
              src={user?.avatar ? user?.avatar : avatar}
              alt="avatar"
            />
          </div>
          <div className="text-center">
            <p className="capitalize">{user?.role}</p>
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
        <span title={user?.name} className="font-bold capitalize">
          {user?.name}
        </span>
      </div>

      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow
      >
        <div className="w-12 border border-gray-300 rounded-full cursor-pointer">
          <img
            className="rounded-full"
            src={user?.avatar ? user?.avatar : avatar}
            alt="avatar"
            title="Avatar"
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderInfo;
