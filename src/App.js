import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import CoordinatorDashboard from "./components/CoordinatorDashboard";
import AchievementDetails from "./components/AchievementDetails"; 

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/achievement/:id" element={<AchievementDetails />} /> 
        <Route path="/student-dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/coordinator-dashboard" element={<ProtectedRoute><CoordinatorDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
