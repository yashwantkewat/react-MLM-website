import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";
import "../styles/auth.css";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referred_by: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/auth/register", formData);

      alert("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      leftContent={
        <div className="left-panel-image">
          <img
            src="/kyc.png"
            alt="KYC"
            className="left-image"
          />
        </div>
      }
      rightContent={
        <div className="auth-box">
          <h3 className="text-center">New User ? Sign Up Now</h3>

          {/* Name */}
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
          {errors.name && (
            <small className="text-danger">
              {errors.name}
            </small>
          )}

          {/* Email */}
          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          {errors.email && (
            <small className="text-danger">
              {errors.email}
            </small>
          )}

          {/* Password */}
          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {errors.password && (
            <small className="text-danger">
              {errors.password}
            </small>
          )}

          {/* Referral */}
          <input
            className="form-control mb-3"
            name="referred_by"
            placeholder="Referral ID"
            onChange={handleChange}
          />

          {/* Button */}
          <button
            className="btn btn-success w-100"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Continue"}
          </button>

          {/* Login Link */}
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      }
    />
  );
}

export default Register;