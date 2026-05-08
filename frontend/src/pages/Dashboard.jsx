import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStart,
  fetchSuccess,
  fetchFail
} from "../features/dashboard/dashboardSlice";
import api from "../services/api";
import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { stats, loading } = useSelector((state) => state.dashboard);

  const fetchStats = async () => {
    try {
      dispatch(fetchStart());
      const res = await api.get("/dashboard/stats");
      dispatch(fetchSuccess(res.data.stats));
    } catch {
      dispatch(fetchFail());
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <MainLayout>
      <div className="dashboard-page">

        {/* HERO */}
        <div className="dashboard-hero">
          <div>
            <h2>Welcome back, {user?.name} </h2>
            <p>
              Referral Code:
              <span>{user?.referral_code}</span>
            </p>
          </div>

          <div className="hero-badge">
            Active Member
          </div>
        </div>

        {/* STATS */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="dashboard-cards">

            <div className="dash-card wallet">
              <h4>Wallet Balance</h4>
              <h2>₹{stats?.walletBalance || 0}</h2>
            </div>

            <div className="dash-card team">
              <h4>Direct Team</h4>
              <h2>{stats?.directTeam || 0}</h2>
            </div>

            <div className="dash-card total">
              <h4>Total Team</h4>
              <h2>{stats?.totalTeam || 0}</h2>
            </div>

            <div className="dash-card tx">
              <h4>Transactions</h4>
              <h2>{stats?.totalTransactions || 0}</h2>
            </div>

          </div>
        )}

        {/* QUICK ACTIONS */}
        <div className="quick-section">
          <h3>Quick Actions</h3>

          <div className="quick-grid">
            <Link to="/team">👥 View Team</Link>
            <Link to="/transactions">💸 Transactions</Link>
            <Link to="/profile">👤 Profile</Link>
            <Link to="/kyc">🪪 KYC</Link>
          </div>
        </div>

        {/* REFERRAL */}
        <div className="referral-box">
          <h3>Your Referral Code</h3>
          <div className="referral-code">
            {user?.referral_code}
          </div>
          <p>Share this code and grow your network.</p>
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;