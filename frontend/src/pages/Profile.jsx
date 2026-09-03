import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as userService from "../services/userService";
import Avatar from "../components/Avatar";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user?.userId) return;
    // /users/me only returns the raw auth payload (see user.route.js),
    // so we fetch the full record separately for name/email/role.
    userService
      .getUserById(user.userId)
      .then((data) => {
        setProfile(data.user);
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setEmail(data.user.email);
      })
      .catch((err) => setError(err.message));
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const data = await userService.updateUser(user.userId, firstName, lastName, email);
      setProfile(data.user);
      setMessage("Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!profile) return <p className="loading-state">Loading...</p>;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <div className="form-page">
      <div className="profile-card">
        <div className="profile-header">
          <Avatar name={fullName} size="lg" />
          <div>
            <h2>{fullName}</h2>
            {profile.role && <span className="profile-role">{profile.role}</span>}
          </div>
        </div>

        {!editing ? (
          <>
            <div className="profile-fields">
              <div>
                <p className="profile-field-label">First Name</p>
                <p className="profile-field-value">{profile.first_name}</p>
              </div>
              <div>
                <p className="profile-field-label">Last Name</p>
                <p className="profile-field-value">{profile.last_name}</p>
              </div>
              <div>
                <p className="profile-field-label">Email</p>
                <p className="profile-field-value">{profile.email}</p>
              </div>
            </div>
            <button onClick={() => setEditing(true)} className="btn btn-primary">
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="field">
              <label>First Name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>

            <div className="field">
              <label>Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
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

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
