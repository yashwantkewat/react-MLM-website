import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import AuthLayout from "../components/AuthLayout";
import { loginSuccess } from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Login Handler
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password
      });

      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.token
        })
      );

      alert("Login Successful");
      navigate("/dashboard");

    } catch (error) {
      const msg = error.response?.data?.message;

      // Backend mapped errors
      if (msg === "EMAIL_NOT_FOUND") {
        setErrors({ email: "Email does not exist" });
      } 
      else if (msg === "PASSWORD_INCORRECT") {
        setErrors({ password: "Password is incorrect" });
      } 
      else {
        alert(msg || "Login Failed");
      }

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
            alt="Login"
            className="left-image"
          />
        </div>
      }

      rightContent={
        <div className="auth-box">
          <h3>Login To Continue</h3>

          {/* Email */}
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
          {errors.email && (
            <small className="text-danger">
              {errors.email}
            </small>
          )}

          {/* Password */}
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
          {errors.password && (
            <small className="text-danger">
              {errors.password}
            </small>
          )}

          {/* Button */}
          <button
            className="btn btn-success w-100"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register here
            </Link>
          </p>
        </div>
      }
    />
  );
}

export default Login;