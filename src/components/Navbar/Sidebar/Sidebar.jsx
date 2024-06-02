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
  UserAddOutlined,
  BarChartOutlined,
  PlusCircleOutlined,
  SunFilled,
  MoonOutlined,
  LogoutOutlined,
  BugOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { currentUser, logout } from "../../../redux/features/auth/authSlice";

const Sidebar = ({ setDark, dark, collapsed }) => {
  const user = useSelector(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    },
    {
      label: <Link to="/user/sell">Sell</Link>,
      key: "/user/sell",
      icon: <CalendarOutlined />,
    },
    {
      label: "Dashboard",
      key: "/user/dashboard",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: "Sell Report",
          key: "/user/dashboard/sell-report",
          icon: <SignalFilled />,
          children: [
            {
              label: (
                <Link to={`/user/dashboard/sell-report/daily-sell-report`}>
                  Daily Sell Report
                </Link>
              ),
              key: `/user/dashboard/sell-report/daily-sell-report`,
              icon: <PrinterFilled />,
            },
            {
              label: (
                <Link to="/user/dashboard/sell-report/find-sold-invoice">
                  Find Sold Invoice
                </Link>
              ),
              key: "/user/dashboard/sell-report/find-sold-invoice",
              icon: <FileSearchOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/sell-report/sell-history">
                  Sell History
                </Link>
              ),
              key: "/user/dashboard/sell-report/sell-history",
              icon: <HistoryOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/sell-report/find-void">
                  Find Void
                </Link>
              ),
              key: "/user/dashboard/sell-report/find-void",
              icon: <FileSearchOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/sell-report/unsuccessful-sell">
                  Unsuccessful Sell
                </Link>
              ),
              key: "/user/dashboard/sell-report/unsuccessful-sell",
              icon: <StopOutlined />,
            },
          ],
        },
        {
          label: "Features",
          key: "/user/dashboard/features",
          icon: <ReadFilled />,
          children: [
            {
              label: (
                <Link to="/user/dashboard/features/maintain-tables">
                  Maintain Tables
                </Link>
              ),
              key: "/user/dashboard/features/maintain-tables",
              icon: <BgColorsOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/features/maintain-menu-items">
                  Maintain Menu Items
                </Link>
              ),
              key: "/user/dashboard/features/maintain-menu-items",
              icon: <JavaOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/features/maintain-void">
                  Maintain Void
                </Link>
              ),
              key: "/user/dashboard/features/maintain-void",
              icon: <ScissorOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/features/maintain-members">
                  Maintain Members
                </Link>
              ),
              key: "/user/dashboard/features/maintain-members",
              icon: <TeamOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/features/maintain-users">
                  Maintain Users
                </Link>
              ),
              key: "/user/dashboard/features/maintain-users",
              icon: <UserSwitchOutlined />,
            },
          ],
        },
        {
          label: "Staff Records",
          key: "/user/dashboard/staff-records",
          icon: <GithubFilled />,
          children: [
            {
              label: (
                <Link to="/user/dashboard/staff-records/add-new-staff">
                  Add New Staff
                </Link>
              ),
              key: "/user/dashboard/staff-records/add-new-staff",
              icon: <UserAddOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/staff-records/staffs-sell-records">
                  Staffs Sell Records
                </Link>
              ),
              key: "/user/dashboard/staff-records/staffs-sell-records",
              icon: <BarChartOutlined />,
            },
          ],
        },
        {
          label: "Expense Reports",
          key: "/user/dashboard/expense-reports",
          icon: <DeleteFilled />,
          children: [
            {
              label: (
                <Link to="/user/dashboard/expense-reports/add-daily-expenses">
                  Add Daily Expenses
                </Link>
              ),
              key: "/user/dashboard/expense-reports/add-daily-expenses",
              icon: <PlusCircleOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/expense-reports/find-expenses">
                  Find Expenses
                </Link>
              ),
              key: "/user/dashboard/expense-reports/find-expenses",
              icon: <FileSearchOutlined />,
            },
            {
              label: (
                <Link to="/user/dashboard/expense-reports/expense-history">
                  Expense History
                </Link>
              ),
              key: "/user/dashboard/expense-reports/expense-history",
              icon: <HistoryOutlined />,
            },
          ],
        },
      ],
    },
    {
      label: "Settings",
      key: "/user/settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <button onClick={() => setMode(!mode)}>
              Menu Mode - {mode ? "Hover" : "Click"}
            </button>
          ),
          key: "100",
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
        },
      ],
    },
    {
      label: <Link to="/user/report-bugs">Report Bugs</Link>,
      key: "/user/report-bugs",
      icon: <BugOutlined />,
    },
    user && {
      label: <button onClick={handleLogout}>Logout</button>,
      key: "/user/logout",
      icon: <LogoutOutlined />,
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
  );
};

export default Sidebar;
