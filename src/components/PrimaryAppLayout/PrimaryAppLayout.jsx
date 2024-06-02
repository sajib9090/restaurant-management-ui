import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const menu = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
  },
  {
    label: "Login",
    path: "/login",
  },
  {
    label: "Register",
    path: "/register",
  },
];

const PrimaryAppLayout = () => {
  const location = useLocation();

  const items = menu.map((item, index) => ({
    key: index + 1,
    label: <Link to={item.path}>{item.label}</Link>,
    className: location.pathname === item.path ? "active-menu-item" : "",
  }));

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="mr-24">
          <Link to="/" className="text-2xl text-white">
            Ahaar Assist
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[
            items.find((item) => item.className === "active-menu-item")?.key,
          ]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content className="max-w-[118rem] w-full mx-auto">
        <div
          style={{
            background: colorBgContainer,
            minHeight: "85vh",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#002140",
          color: "white",
        }}
      >
        {"Sajib's"} Restaurant Management ©{new Date().getFullYear()} Created by{" "}
        <Link>Sajib Hossain</Link>
      </Footer>
    </Layout>
  );
};

export default PrimaryAppLayout;
