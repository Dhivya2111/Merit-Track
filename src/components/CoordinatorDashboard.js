import { useState, useEffect } from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import hardcodedAchievements from "../data/Data";
import "../styles/Dashboard.css";
import "../styles/ManageAchievements.css";
export default function CoordinatorDashboard() {
  const [selectedPage, setSelectedPage] = useState("approval-requests");
  const [achievements, setAchievements] = useState([]);
  useEffect(() => {
    const storedAchievements = JSON.parse(localStorage.getItem("achievements")) || [];
    const allAchievements = [...hardcodedAchievements, ...storedAchievements].map((ach, index) => ({
      ...ach,
      id: ach.id || `ach-${Date.now()}-${index}`,
    }));
    const uniqueAchievements = Array.from(new Map(allAchievements.map((ach) => [ach.id, ach])).values());
    setAchievements(uniqueAchievements);
    localStorage.setItem("achievements", JSON.stringify(uniqueAchievements));
  }, []);
  const handleApprove = (id) => {
    const updatedAchievements = achievements.map((ach) =>
      ach.id === id ? { ...ach, status: "Approved" } : ach
    );
    setAchievements(updatedAchievements);
    localStorage.setItem("achievements", JSON.stringify(updatedAchievements));

    window.dispatchEvent(new Event("achievementUpdated"));
  };
  const handleReject = (id) => {
    const updatedAchievements = achievements.filter((ach) => ach.id !== id);
    setAchievements(updatedAchievements);
    localStorage.setItem("achievements", JSON.stringify(updatedAchievements));

    window.dispatchEvent(new Event("achievementUpdated"));
  };
  const handleDelete = (id) => {
    const updatedAchievements = achievements.filter((ach) => ach.id !== id);
    setAchievements(updatedAchievements);
    localStorage.setItem("achievements", JSON.stringify(updatedAchievements));
    window.dispatchEvent(new Event("achievementUpdated"));
  };
  return (
    <div className="dashboard-container">
      <CoordinatorSidebar onSelect={setSelectedPage} />
      <div className="dashboard-content">
        {/*Approval Requests Section */}
        {selectedPage === "approval-requests" && (
          <>
            <h2>Approval Requests</h2>
            {achievements.filter((ach) => ach.status === "Pending").length === 0 ? (
              <p>No pending achievements.</p>
            ) : (
              achievements
                .filter((ach) => ach.status === "Pending")
                .map((ach) => (
                  <div key={ach.id} className="achievement-card">
                    <h4>{ach.title}</h4>
                    <p>{ach.description}</p>
                    <p><strong>Uploaded By:</strong> Student</p>
                    {ach.proofName && (
                      <p>
                        <a href={ach.proofBase64} download={ach.proofName}>
                          📄 View Proof ({ach.proofName})
                        </a>
                      </p>
                    )}
                    <div className="approval-buttons">
                      <button className="approve-btn" onClick={() => handleApprove(ach.id)}>✅ Approve</button>
                      <button className="reject-btn" onClick={() => handleReject(ach.id)}>❌ Reject</button>
                    </div>
                  </div>
                ))
            )}
          </>
        )}

        {/*Manage Achievements Section */}
        {selectedPage === "manage-achievements" && (
          <div className="manage-achievements-container">
            <h2>Manage Achievements</h2>
            {achievements.length === 0 ? (
              <p>No achievements available.</p>
            ) : (
              <ul className="achievement-list">
                {achievements.map((ach) => (
                  <li key={ach.id} className="achievement-item">
                    <div className="achievement-info">
                      <h4>{ach.title}</h4>
                      <p>{ach.description}</p>
                    </div>
                    <button className="del-btn" onClick={() => handleDelete(ach.id)}>🗑 Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
