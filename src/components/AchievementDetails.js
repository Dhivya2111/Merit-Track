import { useLocation, Link } from "react-router-dom";
import "../styles/Details.css";
export default function AchievementDetails() {
  const location = useLocation();
  const achievement = location.state;

  if (!achievement) {
    return <h2>No achievement details found.</h2>;
  }
  return (
    <div className="details-container">
      <h1>{achievement.title}</h1>
      <p><strong>Description:</strong> {achievement.description}</p>
      <p><strong>Uploaded By:</strong> {achievement.uploadedBy ? achievement.uploadedBy : "Not Available"}</p>
      <p><strong>Approval Status:</strong> {achievement.status}</p>
      {/*Proof File (if available) */}
      {achievement.proofBase64 && achievement.proofBase64.startsWith("data:") ? (
        <div>
          <p><strong>Proof:</strong></p>
          <a 
            href={achievement.proofBase64} 
            download={achievement.proofName} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="download-btn"
          >
            📄 View Proof
          </a>
        </div>
      ) : (
        <p>No proof available.</p>
      )}
      {/* Back Button */}
      <Link to="/" className="back-btn">⬅ Back to Home</Link>
    </div>
  );
}
