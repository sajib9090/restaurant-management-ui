import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import AuthenticatedRoute from "./AuthenticatedRoute";
import PublicLayout from "../layout/PublicLayout";
import NonAuthenticatedRoute from "./NonAuthenticatedRoute";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/Error/Error";
import LoadingSpinner from "../components/Loading/LoadingSpinner/LoadingSpinner";
const Login = lazy(() => import("../pages/PrimaryPage/Login/Login"));
const Register = lazy(() => import("../pages/PrimaryPage/Register/Register"));
const OTP = lazy(() => import("../pages/PrimaryPage/OTP/OTP"));
const Sell = lazy(() => import("../pages/Sell/Sell"));
const DailySellReport = lazy(() =>
  import("../pages/Dashboard/SellReport/DailySellReport/DailySellReport")
);
const PrimaryHome = lazy(() => import("../pages/PrimaryPage/Home/Home"));
const About = lazy(() => import("../pages/PrimaryPage/About/About"));
const Services = lazy(() => import("../pages/PrimaryPage/Services/Services"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const ReportBugs = lazy(() => import("../pages/ReportBugs/ReportBugs"));
const SelectOrder = lazy(() => import("../pages/Sell/SelectOrder/SelectOrder"));
const MaintainTable = lazy(() =>
  import("../pages/Dashboard/Features/MaintainTable/MaintainTable")
);
const MaintainCategories = lazy(() =>
  import("../pages/Dashboard/Features/MaintainCategories/MaintainCategories")
);
const MaintainMenuItems = lazy(() =>
  import("../pages/Dashboard/Features/MaintainMenuItems/MaintainMenuItems")
);
const MaintainMembers = lazy(() =>
  import("../pages/Dashboard/Features/MaintainMembers/MaintainMembers")
);
const StaffRecords = lazy(() =>
  import("../pages/Dashboard/StaffRecords/StaffRecords")
);
const SoldInvoice = lazy(() => import("../pages/Sell/SoldInvoice/SoldInvoice"));
const MaintainUsers = lazy(() =>
  import("../pages/Dashboard/Features/MaintainUsers/MaintainUsers")
);
const SellHistory = lazy(() =>
  import("../pages/Dashboard/SellReport/SellHistory/SellHistory")
);
const Brand = lazy(() => import("../pages/Brand/Brand"));
const Plans = lazy(() => import("../pages/Confidential/Plans"));
const Pricing = lazy(() => import("../pages/Pricing/Pricing"));
const SelectedPlan = lazy(() =>
  import("../pages/Pricing/SelectedPlan/SelectedPlan")
);
const Overview = lazy(() => import("../pages/Dashboard/Overview/Overview"));
const FindVoid = lazy(() =>
  import("../pages/Dashboard/SellReport/FindVoid/FindVoid")
);
const UnsuccessfulSell = lazy(() =>
  import("../pages/Dashboard/SellReport/UnsuccessfulSell/UnsuccessfulSell")
);
const StaffSellRecord = lazy(() =>
  import("../pages/Dashboard/StaffRecords/StaffSellRecord/StaffSellRecord")
);
const Suppliers = lazy(() => import("../pages/Dashboard/Suppliers/Suppliers"));
const Expense = lazy(() => import("../pages/Dashboard/ExpenseReports/Expense"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NonAuthenticatedRoute>
        <PublicLayout />
      </NonAuthenticatedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrimaryHome />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/services",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/otp-check?",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <OTP />
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
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/user",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/user/sell",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Sell />
          </Suspense>
        ),
      },
      {
        path: "/user/sell/:name",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SelectOrder />
          </Suspense>
        ),
      },
      {
        path: "/user/sell/:name/:invoice_id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SoldInvoice />
          </Suspense>
        ),
      },
      {
        path: "/user/profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/user/brand",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Brand />
          </Suspense>
        ),
      },
      {
        path: "/user/report-bugs",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ReportBugs />
          </Suspense>
        ),
      },
      {
        path: "/user/pricing",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Pricing />
          </Suspense>
        ),
      },
      {
        path: "/user/pricing/plans",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SelectedPlan />
          </Suspense>
        ),
      },
      {
        path: "/user/confidential/plans",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute role={"super admin"}>
              <Plans />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/overview",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Overview />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/sell-report/daily-sell-report",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DailySellReport />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/sell-report/sell-history",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SellHistory />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/sell-report/find-void",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FindVoid />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/sell-report/unsuccessful-sell",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UnsuccessfulSell />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/expense-reports/expenses",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Expense />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/features/maintain-tables",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MaintainTable />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/features/maintain-categories",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MaintainCategories />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/features/maintain-menu-items",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MaintainMenuItems />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/features/maintain-members",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MaintainMembers />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/features/maintain-users",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MaintainUsers />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/staff-records",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <StaffRecords />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/staff-records/sell-record",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <StaffSellRecord />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/suppliers",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Suppliers />
          </Suspense>
        ),
      },
    ],
  },
]);
