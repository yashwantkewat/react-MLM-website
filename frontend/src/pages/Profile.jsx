import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileSlice";
import api from "../services/api";
import MainLayout from "../components/MainLayout";
import "../styles/profile.css";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const openModal = () => {
    setForm({
      name: user.name,
      email: user.email
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put("/user/profile/update", form);
      alert("Profile Updated");
      setShowModal(false);
      dispatch(fetchProfile());
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <MainLayout>
      <div className="profile-page">
        <h2 className="profile-title">👤 My Profile</h2>

        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="profile-card">

            {/* Header */}
            <div className="profile-header">
              <div className="profile-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>

                <button
                  className="edit-btn"
                  onClick={openModal}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="profile-grid">
              <div className="profile-box">
                <span>Referral Code</span>
                <h4>{user.referral_code}</h4>
              </div>

              <div className="profile-box">
                <span>Role</span>
                <h4>{user.role}</h4>
              </div>

              <div className="profile-box">
                <span>Joined On</span>
                <h4>
                  {new Date(user.created_at).toLocaleDateString()}
                </h4>
              </div>

              <div className="profile-box">
                <span>Status</span>
                <h4 className="active-status">Active</h4>
              </div>
            </div>
          </div>
        ) : (
          <p>No Profile Found</p>
        )}

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="profile-modal">
              <h3>Edit Profile</h3>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Name"
              />

              <input
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="Email"
              />

              <div className="modal-actions">
                <button
                  className="save-btn"
                  onClick={handleUpdate}
                >
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Profile;