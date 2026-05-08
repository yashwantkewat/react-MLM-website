
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import kycReducer from "../features/kyc/kycSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";
import profileReducer from "../features/profile/profileSlice";
import userReducer from "../features/userlist/userSlice";
import adminTransactionReducer from "../features/transactions/adminTransactionSlice";
import teamReducer from "../features/team/teamSlice";
import reportsReducer from "../features/reports/reportsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    kyc: kycReducer,
    transactions: transactionsReducer,
    profile: profileReducer,
    userlist: userReducer,
    adminTransactions: adminTransactionReducer,
    team: teamReducer,
    reports: reportsReducer

  }
});