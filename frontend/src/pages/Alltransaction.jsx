import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminTransactions } from "../features/transactions/adminTransactionSlice";
import MainLayout from "../components/MainLayout";
import CommonTable from "../components/CommonTable";

function AdminTransactions() {
  const dispatch = useDispatch();

  const {
    list = [],
    loading = false,
    error = null
  } = useSelector(
    (state) => state.adminTransactions || {}
  );

  useEffect(() => {
    dispatch(fetchAdminTransactions());
  }, [dispatch]);

  if (error) {
    return (
      <MainLayout>
        <p className="text-danger">{error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <CommonTable
        title="💸 All Transactions"
        columns={[
          "User",
          "Email",
          "Amount",
          "Type",
          "Level",
          "Description",
          "Date"
        ]}
        data={list}
        loading={loading}
        emptyMessage="No Transactions Found"
        renderRow={(tx) => (
          <tr key={tx.id}>
            <td>{tx.name}</td>

            <td>{tx.email}</td>

            <td
              className={
                tx.type === "credit"
                  ? "status-credit"
                  : "status-debit"
              }
            >
              ₹{tx.amount}
            </td>

            <td>
              <span
                className={`badge ${
                  tx.type === "credit"
                    ? "badge-user"
                    : "badge-admin"
                }`}
              >
                {tx.type.toUpperCase()}
              </span>
            </td>

            <td>{tx.level}</td>

            <td>{tx.description}</td>

            <td>
              {new Date(
                tx.created_at
              ).toLocaleString()}
            </td>
          </tr>
        )}
      />
    </MainLayout>
  );
}

export default AdminTransactions;