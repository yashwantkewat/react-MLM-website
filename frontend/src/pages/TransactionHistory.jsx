import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transactions/transactionsSlice";
import MainLayout from "../components/MainLayout";
import CommonTable from "../components/CommonTable";

function TransactionHistory() {
  const dispatch = useDispatch();

  const { list, loading } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <MainLayout>
      <CommonTable
        title="💰 Transaction History"
        columns={[
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
                    ? "badge-credit"
                    : "badge-debit"
                }`}
              >
                {tx.type}
              </span>
            </td>

            <td>{tx.level}</td>
            <td>{tx.description}</td>
            <td>
              {new Date(tx.created_at).toLocaleString()}
            </td>
          </tr>
        )}
      />
    </MainLayout>
  );
}

export default TransactionHistory;