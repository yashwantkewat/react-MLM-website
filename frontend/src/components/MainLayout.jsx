import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import "../styles/admin.css";

function MainLayout({ children }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div>

            {/* TOPBAR */}
            <div className="topbar">
                <h2>MLM Dashboard</h2>

                <div className="top-actions">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                        ☰
                    </button>

                </div>
            </div>

            <div className="layout">

                {/* SIDEBAR */}
                {sidebarOpen && (
                    <div className="sidebar">

                        {/* USER MENU */}
                        <Link to="/dashboard">Dashboard</Link>
                        {user?.role !== "admin" && (
<>  
                        <Link to="/team">My Team</Link>
                        <Link to="/transactions">Transactions</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/kyc">KYC</Link>
                        </>
                       ) }
                        {/* ADMIN MENU */}
                        {user?.role === "admin" && (
                            <>
                                <Link to="/userlist">Users</Link>
                                <Link to="/kyclist">KYC Requests</Link>
                                <Link to="/admin-transactions">All Transactions</Link>
                                <Link to="/admin-commission">Commission</Link>
                                <Link to="/admin-wallet-credit">Wallet Credit</Link>
                                <Link to="/team-tree">Team Tree</Link>
                                <Link to="/admin/reports">Reports</Link>
                            </>
                        )}
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* CONTENT */}
                <div className="content">
                    {children}
                </div>

            </div>
        </div>
    );
}

export default MainLayout;