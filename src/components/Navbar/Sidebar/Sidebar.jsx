/* eslint-disable react/prop-types */
import {
  AppstoreOutlined,
  CalendarOutlined,
  HomeOutlined,
  SettingOutlined,
  SignalFilled,
  PrinterFilled,
  ReadFilled,
  GithubFilled,
  DeleteFilled,
  FileSearchOutlined,
  HistoryOutlined,
  StopOutlined,
  BgColorsOutlined,
  JavaOutlined,
  ScissorOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  BarChartOutlined,
  PlusCircleOutlined,
  SunFilled,
  MoonOutlined,
  LogoutOutlined,
  BugOutlined,
  GoldenFilled,
  PlusSquareFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { currentUser, logout } from "../../../redux/features/auth/authSlice";
import CustomModal from "../../Modal/Modal";
import AddMember from "../../Member/AddMember";

const Sidebar = ({ setDark, dark, collapsed }) => {
  const user = useSelector(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const initialMode = localStorage.getItem("menu-mode") === "true";
  const [mode, setMode] = useState(initialMode);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("menu-mode", mode);
    localStorage.setItem("theme-mode", dark);
  }, [mode, dark]);

  const items = [
    {
      label: <Link to="/user">Home</Link>,
      key: "/user",
      icon: <HomeOutlined />,
      title: "Home",
    },
    {
      label: <Link to="/user/sell">Sell</Link>,
      key: "/user/sell",
      icon: <CalendarOutlined />,
      title: "Sell",
    },
    {
      label: "Dashboard",
      key: "/user/dashboard",
      icon: <AppstoreOutlined />,
      title: "Dashboard",
      children: [
        {
          label: "Overview",
          key: "/user/dashboard/overview",
          icon: <BarChartOutlined />,
          title: "Overview",
        },
        {
          label: "Sell Report",
          key: "/user/dashboard/sell-report",
          icon: <SignalFilled />,
          title: "Sell Report",
          children: [
            {
              label: (
                <Link to={`/user/dashboard/sell-report/daily-sell-report`}>
                  Daily Sell Report
                </Link>
              ),
              key: `/user/dashboard/sell-report/daily-sell-report`,
              icon: <PrinterFilled />,
              title: "Daily Sell Report",
            },
            {
              label: (
                <Link to="/user/dashboard/sell-report/find-sold-invoice">
                  Find Sold Invoice
                </Link>
              ),
              key: "/user/dashboard/sell-report/find-sold-invoice",
              icon: <FileSearchOutlined />,
              title: "Find Sold Invoice",
            },
            {
              label: (
                <Link to="/user/dashboard/sell-report/sell-history">
                  Sell History
                </Link>
              ),
              key: "/user/dashboard/sell-report/sell-history",
              icon: <HistoryOutlined />,
              title: "Sell History",
            },
            {
              label: (
                <Link to="/user/dashboard/sell-report/find-void">
                  Find Void
                </Link>
              ),
              key: "/user/dashboard/sell-report/find-void",
              icon: <FileSearchOutlined />,
              title: "Find Void",
            },
            {
              label: (
                <Link to="/user/dashboard/sell-report/unsuccessful-sell">
                  Unsuccessful Sell
                </Link>
              ),
              key: "/user/dashboard/sell-report/unsuccessful-sell",
              icon: <StopOutlined />,
              title: "Unsuccessful Sell",
            },
          ],
        },
        {
          label: "Features",
          key: "/user/dashboard/features",
          icon: <ReadFilled />,
          title: "Features",
          children: [
            {
              label: (
                <Link to="/user/dashboard/features/maintain-tables">
                  Maintain Tables
                </Link>
              ),
              key: "/user/dashboard/features/maintain-tables",
              icon: <BgColorsOutlined />,
              title: "Maintain Tables",
            },
            {
              label: (
                <Link to="/user/dashboard/features/maintain-categories">
                  Maintain Categories
                </Link>
              ),
              key: "/user/dashboard/features/maintain-categories",
              icon: <JavaOutlined />,
              title: "Maintain Categories",
            },
            {
              label: (
                <Link to="/user/dashboard/features/maintain-menu-items">
                  Maintain Menu Items
                </Link>
              ),
              key: "/user/dashboard/features/maintain-menu-items",
              icon: <GoldenFilled />,
              title: "Maintain Menu Items",
            },
            {
              label: (
                <Link to="/user/dashboard/features/maintain-void">
                  Maintain Void
                </Link>
              ),
              key: "/user/dashboard/features/maintain-void",
              icon: <ScissorOutlined />,
              title: "Maintain Void",
            },
            {
              label: (
                <Link to="/user/dashboard/features/maintain-members">
                  Maintain Members
                </Link>
              ),
              key: "/user/dashboard/features/maintain-members",
              icon: <TeamOutlined />,
              title: "Maintain Members",
            },
            {
              label: (
                <Link to="/user/dashboard/features/maintain-users">
                  Maintain Users
                </Link>
              ),
              key: "/user/dashboard/features/maintain-users",
              icon: <UserSwitchOutlined />,
              title: "Maintain Users",
            },
          ],
        },
        {
          label: <Link to="/user/dashboard/staff-records">Staff Records</Link>,
          key: "/user/dashboard/staff-records",
          icon: <GithubFilled />,
          title: "Staff Records",
        },
        {
          label: "Expense Reports",
          key: "/user/dashboard/expense-reports",
          icon: <DeleteFilled />,
          title: "Expense Reports",
          children: [
            {
              label: (
                <Link to="/user/dashboard/expense-reports/add-daily-expenses">
                  Add Daily Expenses
                </Link>
              ),
              key: "/user/dashboard/expense-reports/add-daily-expenses",
              icon: <PlusCircleOutlined />,
              title: "Add Daily Expenses",
            },
            {
              label: (
                <Link to="/user/dashboard/expense-reports/find-expenses">
                  Find Expenses
                </Link>
              ),
              key: "/user/dashboard/expense-reports/find-expenses",
              icon: <FileSearchOutlined />,
              title: "Find Expenses",
            },
            {
              label: (
                <Link to="/user/dashboard/expense-reports/expense-history">
                  Expense History
                </Link>
              ),
              key: "/user/dashboard/expense-reports/expense-history",
              icon: <HistoryOutlined />,
              title: "Expend History",
            },
          ],
        },
      ],
    },
    {
      label: "Settings",
      key: "/user/settings",
      icon: <SettingOutlined />,
      title: "Settings",
      children: [
        {
          label: (
            <button onClick={() => setMode(!mode)}>
              Menu Mode - {mode ? "Hover" : "Click"}
            </button>
          ),
          key: "100",
          title: "Menu Mode",
        },
        {
          label: (
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center"
            >
              {dark ? (
                <span>
                  <SunFilled className="h-5 w-5" /> Light Mode
                </span>
              ) : (
                <span>
                  <MoonOutlined className="h-5 w-5" /> Dark Mode
                </span>
              )}
            </button>
          ),
          key: "101",
          title: "Theme Mode",
        },
      ],
    },
    {
      label: <Link to="/user/report-bugs">Report Bugs</Link>,
      key: "/user/report-bugs",
      icon: <BugOutlined />,
      title: "Report Bugs",
    },
    {
      label: (
        <button onClick={() => setIsModalOpen(!isModalOpen)}>Add Member</button>
      ),
      key: "/user/add-member",
      icon: <PlusSquareFilled />,
      title: "Add Member",
    },
    user && {
      label: <button onClick={handleLogout}>Logout</button>,
      key: "/user/logout",
      icon: <LogoutOutlined />,
      title: "Logout",
    },
  ];

  const getPathKeys = (path) => {
    const segments = path.split("/").filter(Boolean);
    const keys = segments.map((segment, index) => {
      return `/${segments.slice(0, index + 1).join("/")}`;
    });
    return keys;
  };

  const selectedKeys = [location.pathname];
  const openKeys = getPathKeys(location.pathname).slice(0, -1);

  return (
    <>
      <Menu
        className={`w-[200px] ${
          collapsed ? "min-h-[calc(100vh-200px)]" : "min-h-[calc(100vh-250px)]"
        }`}
        mode={mode ? "inline" : "vertical"}
        theme={dark ? "dark" : "light"}
        items={items}
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
      />
      <CustomModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <AddMember setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      </CustomModal>
    </>
  );
};

export default Sidebar;
