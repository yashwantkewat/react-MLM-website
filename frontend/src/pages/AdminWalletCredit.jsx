import { useState, useEffect } from "react";
import api from "../services/api";
import MainLayout from "../components/MainLayout";
import "../styles/walletCredit.css";

function AdminWalletCredit() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCredit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/admin/wallet-credit", {
        user_id: userId,
        amount
      });

      setMessage(res.data.message);
      setUserId("");
      setAmount("");
      fetchUsers();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Credit Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="wallet-credit-page">

        <div className="wallet-header">
          <h2>💰 Wallet Credit Management</h2>
          <p>
            Instantly add balance to any user's wallet
          </p>
        </div>

        <div className="wallet-card">

          <div className="wallet-info">
            <h4>Admin Wallet Actions</h4>
            <ul>
              <li>Instant manual wallet recharge</li>
              <li>Creates wallet automatically</li>
              <li>Transaction history recorded</li>
              <li>Visible in reports panel</li>
            </ul>
          </div>

          <form onSubmit={handleCredit}>

            <div className="form-group">
              <label>Select User</label>

              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              >
                <option value="">Choose User</option>

                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Credit Amount (₹)</label>

              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                required
              />
            </div>

            <button
              type="submit"
              className="wallet-btn"
            >
              {loading
                ? "Processing..."
                : "Credit Wallet"}
            </button>

            {message && (
              <div className="wallet-success">
                {message}
              </div>
            )}

          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminWalletCredit;