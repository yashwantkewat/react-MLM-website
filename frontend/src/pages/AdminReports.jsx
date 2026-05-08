import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../features/reports/reportsSlice";
import MainLayout from "../components/MainLayout";
import CommonTable from "../components/CommonTable";
import "../styles/adminReports.css";

function AdminReports() {
  const dispatch = useDispatch();

  const {
    report,
    recentTransactions,
    userReports,
    loading,
    error
  } = useSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  if (loading) {
    return (
      <MainLayout>
        <div className="loading-box">
          Loading Reports...
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="error-box">
          {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="reports-page">

        {/* HEADER */}
        <div className="reports-header">
          <h2>📊 Financial Reports</h2>
          <p>
            Complete payout and wallet analytics
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="reports-grid">

          <ReportCard
            title="Wallet Balance"
            value={`₹${report?.total_wallet_balance || 0}`}
            icon="💰"
          />

          <ReportCard
            title="Total Credit"
            value={`₹${report?.total_credit || 0}`}
            icon="📈"
          />

          <ReportCard
            title="Total Debit"
            value={`₹${report?.total_debit || 0}`}
            icon="📉"
          />

          <ReportCard
            title="Transactions"
            value={report?.total_transactions || 0}
            icon="🧾"
          />

        </div>

        {/* RECENT TRANSACTIONS */}
        <CommonTable
          title="🕒 Recent Transactions"
          columns={[
            "Name",
            "Amount",
            "Type",
            "Date"
          ]}
          data={recentTransactions || []}
          emptyMessage="No Recent Transactions"
          renderRow={(tx) => (
            <tr key={tx.id}>
              <td>{tx.name}</td>

              <td className="amount">
                ₹{tx.amount}
              </td>

              <td>
                <span
                  className={
                    tx.type === "credit"
                      ? "status-credit"
                      : "status-debit"
                  }
                >
                  {tx.type}
                </span>
              </td>

              <td>
                {new Date(
                  tx.created_at
                ).toLocaleString()}
              </td>
            </tr>
          )}
        />
      <div className="mt-4"></div>
        {/* USER REPORTS */}
        <CommonTable
          title="👥 User Financial Report"
          columns={[
            "Name",
            "Email",
            "Wallet",
            "Transactions",
            "Total Amount"
          ]}
          data={userReports || []}
          emptyMessage="No User Reports"
          renderRow={(user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td className="amount">
                ₹{user.wallet_balance}
              </td>

              <td>
                {user.total_transactions}
              </td>

              <td className="amount">
                ₹{user.total_amount}
              </td>
            </tr>
          )}
        />

      </div>
    </MainLayout>
  );
}

function ReportCard({
  title,
  value,
  icon
}) {
  return (
    <div className="report-card">
      <div className="report-icon">
        {icon}
      </div>

      <div>
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default AdminReports;