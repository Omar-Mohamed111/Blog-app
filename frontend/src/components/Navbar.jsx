import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Blog
      </Link>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/create-post" className="nav-link">
              Create Post
            </Link>
            <button onClick={handleLogout} className="nav-icon-btn">
              Logout
            </button>
            <Link to="/profile" className="nav-avatar-link" aria-label="Profile">
              <Avatar name={user?.firstName ? `${user.firstName} ${user.lastName || ""}` : ""} size="sm" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
