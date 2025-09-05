import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
export default function Sidebar({ onSelect }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); 
    navigate("/login"); 
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li onClick={() => onSelect("upload")}>📤 Upload Achievement</li>
        <li onClick={() => onSelect("view")}>📜 My Achievements</li>
        <li onClick={() => navigate("/")}>🏠 Go to Home</li>
        <li onClick={handleLogout} className="logout-btn">🚪 Logout</li> 
      </ul>
    </div>
  );
}
