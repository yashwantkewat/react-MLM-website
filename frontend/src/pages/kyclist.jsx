import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../components/MainLayout";
import CommonTable from "../components/CommonTable";

function KycList() {
  const [allKyc, setAllKyc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchAllKYC = async () => {
    try {
      setLoading(true);

      const res = await api.get("/kyc/all");
      setAllKyc(res.data.kycs || []);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllKYC();
  }, []);

  const updateStatus = async (kycId, status) => {
    try {
      await api.put("/kyc/update-status", {
        kyc_id: kycId,
        status
      });
    

      alert(`KYC ${status}`);
      fetchAllKYC();

    } catch (error) {
      alert("Update failed");
    }
  };

  const filtered = allKyc.filter((k) =>
    k.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Search user..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="form-control"
        />
      </div>

      <CommonTable
        title="📄 KYC Requests"
        columns={[
          "Name",
          "Email",
          "Status",
          "Document Type",
          "Document Number",
          "File",
          "Action"
        ]}
        data={filtered}
        loading={loading}
        emptyMessage="No KYC Records Found"
        renderRow={(kyc) => (
          <tr key={kyc.id}>
            <td>{kyc.name}</td>

            <td>{kyc.email}</td>

            <td>
              <span
                className={`badge ${
                  kyc.status === "approved"
                    ? "badge-user"
                    : kyc.status === "rejected"
                    ? "badge-admin"
                    : "badge-credit"
                }`}
              >
                {kyc.status}
              </span>
            </td>

            <td>{kyc.document_type}</td>

            <td>{kyc.document_number}</td>

            <td>
              <a
                href={`http://localhost:5000/uploads/${kyc.document_image}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            </td>

            <td>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() =>
                  updateStatus(
                    kyc.id,
                    "approved"
                  )
                }
              >
                Approve
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  updateStatus(
                    kyc.id,
                    "rejected"
                  )
                }
              >
                Reject
              </button>
            </td>
          </tr>
        )}
      />
    </MainLayout>
  );
}

export default KycList;