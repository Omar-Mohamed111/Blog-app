import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as authService from "../services/authService";

export default function Register() {
  const { loginUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      await authService.register(firstName, lastName, email, password);

      const token = await authService.login(email, password);

      loginUser(token);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="form-card">
        <h2>Create your account</h2>
        <p className="form-subtitle">Join the community and start posting</p>

        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label>First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary btn-block"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="form-subtitle">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
