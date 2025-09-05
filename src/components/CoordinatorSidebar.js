import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
export default function CoordinatorSidebar({ onSelect }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <h2>Coordinator Panel</h2>
      <ul>
        <li onClick={() => onSelect("approval-requests")}>📋 Approval Requests</li>
        <li onClick={() => onSelect("manage-achievements")}>🛠 Manage Achievements</li> 
        <li onClick={() => navigate("/")}>🏠 Go to Home</li>
        <li onClick={handleLogout} className="logout-btn">🚪 Logout</li>
      </ul>
    </div>
  );
}
