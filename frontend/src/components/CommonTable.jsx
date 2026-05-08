import "../styles/commonTable.css";

function CommonTable({
  title,
  columns,
  data,
  loading,
  emptyMessage = "No Data Found",
  renderRow
}) {
  return (
    <div className="table-wrapper">
      {title && <h2 className="table-title">{title}</h2>}

      {loading ? (
        <p className="table-loading">Loading...</p>
      ) : data.length === 0 ? (
        <p className="table-empty">{emptyMessage}</p>
      ) : (
        <div className="table-container">
          <table className="common-table">
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th key={i}>{col}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) =>
                renderRow(item, index)
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CommonTable;