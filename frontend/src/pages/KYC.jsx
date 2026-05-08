import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";

function KYC() {

  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentImage, setDocumentImage] = useState(null);
  const [status, setStatus] = useState("");
  const loadingRef = useRef(false); // 🔥 prevent double calls

  // 📥 FETCH KYC
  const fetchKYC = async () => {
    try {
      if (loadingRef.current) return; // ❌ stop duplicate calls

      loadingRef.current = true;

      const res = await api.get("/kyc/my");

      if (res.data.kyc) {
        setStatus(res.data.kyc.status);
      }

    } catch (error) {
      console.log(error);
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    fetchKYC();
  }, []);

  // 📤 SUBMIT KYC
  const handleSubmit = async () => {
    try {

      if (!documentType || !documentNumber || !documentImage) {
        alert("All fields required");
        return;
      }

      const formData = new FormData();
      formData.append("document_type", documentType);
      formData.append("document_number", documentNumber);
      formData.append("document_image", documentImage);

      await api.post("/kyc/submit", formData);

      alert("KYC Submitted");

      // 🔥 IMPORTANT: small delay to avoid duplicate call
      setTimeout(() => {
        fetchKYC();
      }, 500);

    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  return (
    <AuthLayout

      leftContent={
        <div className="left-panel-image">
          <img src="/kyc.png" alt="KYC" className="left-image" />
        </div>
      }

      rightContent={
        <div>

          <div className="auth-box">

            <h3>Verify Identity</h3>

            <input
              className="form-control mb-3"
              placeholder="Document Type"
              onChange={(e) => setDocumentType(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Document Number"
              onChange={(e) => setDocumentNumber(e.target.value)}
            />

            <input
              className="form-control mb-3"
              type="file"
              onChange={(e) => setDocumentImage(e.target.files[0])}
            />

            <p>
              Status: <strong>{status || "Not Submitted"}</strong>
            </p>

            <button
              className="btn btn-success w-100"
              onClick={handleSubmit}
            >
              Save & Continue
            </button>

          </div>

        </div>
      }

    />
  );
}

export default KYC;