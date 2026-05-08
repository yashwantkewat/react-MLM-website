import { useState } from "react";
import api from "../services/api";
import MainLayout from "../components/MainLayout";
import "../styles/commission.css";

function AdminCommission() {
  const [level, setLevel] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.put("/admin/commission", {
        level,
        amount
      });

      setMessage(res.data.message);
      setLevel("");
      setAmount("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="commission-page">

        <div className="commission-header">
          <h2>⚙️ Commission Management</h2>
          <p>
            Configure referral income for each MLM level
          </p>
        </div>

        <div className="commission-card">

          <div className="commission-info">
            <h4>Commission Rules</h4>

            <ul>
              <li>Level 1 → Direct referral bonus</li>
              <li>Level 2 → Indirect referral bonus</li>
              <li>Level 3+ → Deep network rewards</li>
            </ul>
          </div>

          <form onSubmit={handleUpdate}>

            <div className="form-group">
              <label>Referral Level</label>

              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value)
                }
                required
              >
                <option value="">
                  Select Level
                </option>
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Level {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Commission Amount (₹)</label>

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
              className="commission-btn"
            >
              {loading
                ? "Updating..."
                : "Update Commission"}
            </button>

            {message && (
              <div className="success-box">
                {message}
              </div>
            )}

          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminCommission;