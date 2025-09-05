import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
export default function Login() {
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      if (userType === "student") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userType", "student");
        navigate("/student-dashboard");
      } else if (userType === "coordinator") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userType", "coordinator");
        navigate("/coordinator-dashboard");
      }
    } else {
      alert("Please enter your email and password.");
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        {userType === null ? (
          <div className="user-selection">
            <button className="user-btn student-btn" onClick={() => setUserType("student")}>
              Login as Student
            </button>
            <button className="user-btn coordinator-btn" onClick={() => setUserType("coordinator")}>
              Login as Coordinator
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-submit-btn">Login</button>
            <p className="back-option" onClick={() => setUserType(null)}>← Back</p>
          </form>
        )}

        <Link to="/" className="back-home">← Go to Home</Link>
      </div>
    </div>
  );
}
