import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Feed from "./pages/Feed/Feed";
import FinancialLedger from "./pages/FinancialLedger/FinancialLedger";
import FindIdPw from "./pages/User/FindIdPw";
import Scheduler from "./pages/Scheduler/Scheduler";
import SignUp from "./pages/User/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/User/Login";
import Setting from "./pages/Setting/Setting";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/financialledger",
        element: <FinancialLedger />,
      },
      {
        path: "/login/findidpw",
        element: <FindIdPw />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/scheduler",
        element: <Scheduler />,
      },
      {
        path: "/setting",
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login/signup",
        element: <SignUp />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
