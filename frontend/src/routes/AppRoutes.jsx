import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Team from "../pages/Team";
import KYC from "../pages/KYC";
import TransactionHistory from "../pages/TransactionHistory";
import Profile from "../pages/Profile";

import Admin from "../pages/Admin";
import KycList from "../pages/kyclist";
import UserList from "../pages/UserList";
import AdminTransactions from "../pages/alltransaction";
import AdminWalletCredit from "../pages/AdminWalletCredit";
import AdminCommission from "../pages/AdminCommission";
import TeamTree from "../pages/TeamTree";
import AdminReports from "../pages/AdminReports";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kyc"
          element={
            <ProtectedRoute>
              <KYC />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/kyclist"
          element={
            <AdminRoute>
              <KycList />
            </AdminRoute>
          }
        />

        <Route
          path="/userlist"
          element={
            <AdminRoute>
              <UserList />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-transactions"
          element={
            <AdminRoute>
              <AdminTransactions />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-commission"
          element={
            <AdminRoute>
              <AdminCommission />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-wallet-credit"
          element={
            <AdminRoute>
              <AdminWalletCredit />
            </AdminRoute>
          }
        />

        <Route
          path="/team-tree"
          element={
            <AdminRoute>
              <TeamTree />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <AdminReports />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;