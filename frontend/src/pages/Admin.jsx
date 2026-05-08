import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../components/MainLayout";

function Admin() {
    const [users, setUsers] = useState([]);
    const [kyc, setKyc] = useState([]);

    const fetchAdminData = async () => {
        try {
            const usersRes = await api.get("/admin/users");
            const kycRes = await api.get("/kyc/all");

            setUsers(usersRes.data.users);
            setKyc(kycRes.data.kyc);

        } catch (error) {
            console.log(error);
        }
    };

    const updateKYC = async (userId, status) => {
        try {
            await api.put("/kyc/update-status", {
                user_id: userId,
                status
            });

            alert("Updated");
            fetchAdminData();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    return (
        <MainLayout>

            <h2 className="mb-4">⚙️ Admin Panel</h2>

            {/* USERS */}
            <div className="card mb-4">
                <h3>👥 All Users</h3>

                {users.map((user) => (
                    <div
                        key={user.id}
                        style={{
                            padding: "10px 0",
                            borderBottom: "1px solid #ddd"
                        }}
                    >
                        <strong>{user.name}</strong> — {user.email}
                    </div>
                ))}
            </div>

            {/* KYC */}
            <div className="card">
                <h3>📄 KYC Requests</h3>

                {kyc.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            padding: "15px 0",
                            borderBottom: "1px solid #ddd"
                        }}
                    >
                        <p><b>User ID:</b> {item.user_id}</p>
                        <p><b>Status:</b> {item.status}</p>

                        <button
                            className="btn btn-success me-2"
                            onClick={() =>
                                updateKYC(
                                    item.user_id,
                                    "approved"
                                )
                            }
                        >
                            Approve
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                updateKYC(
                                    item.user_id,
                                    "rejected"
                                )
                            }
                        >
                            Reject
                        </button>
                    </div>
                ))}
            </div>

        </MainLayout>
    );
}

export default Admin;