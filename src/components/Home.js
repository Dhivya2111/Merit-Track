import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hardcodedAchievements from "../data/Data";
import "../styles/Home.css";
import { FaFacebook, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
export default function Home() {
  const [approvedAchievements, setApprovedAchievements] = useState([]);
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  useEffect(() => {
    fetchAchievements();
    window.addEventListener("achievementUpdated", fetchAchievements);
    return () => {
      window.removeEventListener("achievementUpdated", fetchAchievements);
    };
  }, []);
  const fetchAchievements = () => {
    const storedAchievements = JSON.parse(localStorage.getItem("achievements")) || [];
    const approved = storedAchievements.filter((ach) => ach.status === "Approved");
    const approvedIds = new Set(approved.map((ach) => ach.id));
    const filteredHardcoded = hardcodedAchievements.filter((ach) => !approvedIds.has(ach.id));
    setApprovedAchievements([...filteredHardcoded, ...approved]);
  };
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");
  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">MeritTrack</h1>
        {/* Login / Dashboard Button */}
        <div className="header-btn">
          {isLoggedIn ? (
            <Link to={userType === "coordinator" ? "/coordinator-dashboard" : "/student-dashboard"} className="login-btn">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </header>
      {/* Banner Image Below Header */}
      <div className="banner">
        <img src="/2.png" alt="MeritTrack Banner" />
      </div>

      {/* Introduction Section */}
      <div className="intro-section">
        <div className="intro-text">
          <h2>Welcome to MeritTrack 🎉</h2>
          <p>
            <strong>MeritTrack</strong> is a platform dedicated to recognizing and showcasing the <strong>achievements of students</strong>. 
            Our mission is to <strong>celebrate talent, inspire excellence, and ensure credibility</strong> in the way student successes are documented.
          </p>
          <p>
            Whether it's academic excellence, research publications, hackathon victories, or sports achievements, 
            we believe every milestone deserves recognition. 🚀
          </p>
        </div>
      </div>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="achievements-grid">
          {approvedAchievements.length > 0 ? (
            approvedAchievements.map((ach) => (
              <div key={ach.id} className="achievement-card1">
                <h3>{ach.title}</h3>
                <p>{ach.description}</p>
                <div className="card-buttons">
                  <button className="verified-btn">✔ Verified</button>
                  <button 
                    className="view-btn" 
                    onClick={() => navigate(`/achievement/${ach.id}`, { state: ach })}
                  >
                    👁 View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-achievements">No approved achievements yet. 🎉</p>
          )}
        </div>
      </section>

{/* FAQ Section */}
<section id="faq-section" className="faq-section">
  <h2 className="faq-title">Frequently Asked Questions ❓</h2>

  {[
    { question: "📌 How do I submit an achievement?", answer: "You can submit achievements by logging into your dashboard and filling the submission form." },
    { question: "📌 How long does it take for an achievement to be verified?", answer: "Achievements are usually verified within 3-5 working days by the coordinators." },
    { question: "📌 What types of achievements can be submitted?", answer: "Any academic, research, hackathon, or sports achievements with valid proof can be submitted." },
  ].map((faq, index) => (
    <div key={index} className="faq-item">
      <div 
        className="faq-question" 
        onClick={() => setOpenFAQ(openFAQ === index ? null : index)} // Toggle FAQ
        style={{ cursor: "pointer", fontWeight: "bold", padding: "10px", backgroundColor: "#f9f9f9", border: "1px solid #ddd" }}
      >
        {faq.question}
      </div>
      {openFAQ === index && (
        <div className="faq-answer" style={{ padding: "10px", backgroundColor: "#fff", border: "1px solid #ddd", borderTop: "none" }}>
          {faq.answer}
        </div>
      )}
    </div>
  ))}
</section>
      {/*Help & Support Section */}
      <section id="help-section" className="help-section">
        <h2 className="help-title">Need Help? 🛠</h2>
        <p>For any issues or queries, reach out to our support team.</p>
        <p>Refer contact</p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section about">
            <div className="footer-logo">
              <img src="/1.png" alt="MeritTrack Logo" />
            </div>
            <p>MeritTrack - Showcasing student achievements with credibility and transparency.</p>
            <div className="footer-socials">
              <a href="#!" className="social-link"><FaFacebook /></a>
              <a href="#!" className="social-link"><FaInstagram /></a>
              <a href="#!" className="social-link"><FaYoutube /></a>
            </div>
          </div>

          <div className="footer-section links">
  <h3>Quick Links</h3>
  <ul>
    <li><Link to="/" onClick={() => document.getElementById("faq-section").scrollIntoView({ behavior: "smooth" })}>FAQ</Link></li>
    <li><Link to="/" onClick={() => document.getElementById("help-section").scrollIntoView({ behavior: "smooth" })}>Help & Support</Link></li>
  </ul>
</div>


          <div className="footer-section contact">
            <h3>Contact</h3>
            <p><FaMapMarkerAlt /> Vellore, Tamil Nadu, India</p>
            <p><FaPhone /> +91 9876543210</p>
            <p><FaEnvelope /> support@merittrack.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MeritTrack. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
