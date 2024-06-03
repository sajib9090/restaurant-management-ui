import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import AuthenticatedRoute from "./AuthenticatedRoute";
import PublicLayout from "../layout/PublicLayout";
import NonAuthenticatedRoute from "./NonAuthenticatedRoute";
const Login = lazy(() => import("../pages/PrimaryPage/Login/Login"));
const Register = lazy(() => import("../pages/PrimaryPage/Register/Register"));
const Sell = lazy(() => import("../pages/Sell/Sell"));
const DailySellReport = lazy(() =>
  import("../pages/Dashboard/SellReport/DailySellReport/DailySellReport")
);
const PrimaryHome = lazy(() => import("../pages/PrimaryPage/Home/Home"));
const About = lazy(() => import("../pages/PrimaryPage/About/About"));
const Services = lazy(() => import("../pages/PrimaryPage/Services/Services"));
const ExpiredCredentials = lazy(() =>
  import("../pages/PrimaryPage/ExpiredCredentials/ExpiredCredentials")
);
const Profile = lazy(() => import("../pages/Dashboard/Profile/Profile"));
const ReportBugs = lazy(() => import("../pages/ReportBugs/ReportBugs"));
const SelectOrder = lazy(() => import("../pages/Sell/SelectOrder/SelectOrder"));
const MaintainTable = lazy(() =>
  import("../pages/Dashboard/Features/MaintainTable/MaintainTable")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NonAuthenticatedRoute>
        <PublicLayout />
      </NonAuthenticatedRoute>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <PrimaryHome />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/services",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/expired-credentials",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <ExpiredCredentials />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/user",
    element: (
      <AuthenticatedRoute>
        <Main />
      </AuthenticatedRoute>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/user",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/user/sell",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Sell />
          </Suspense>
        ),
      },
      {
        path: "/user/sell/:name",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <SelectOrder />
          </Suspense>
        ),
      },
      {
        path: "/user/profile",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/user/report-bugs",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <ReportBugs />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/sell-report/daily-sell-report",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <DailySellReport />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/features/maintain-tables",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <MaintainTable />
          </Suspense>
        ),
      },
    ],
  },
]);
