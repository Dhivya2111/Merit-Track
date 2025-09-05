import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
export default function StudentDashboard() {
  const [selectedPage, setSelectedPage] = useState("view");
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    id: "", 
    title: "",
    description: "",
    proof: null,
    proofBase64: "",
    proofName: "",
    status: "Pending",
  });

  useEffect(() => {
    try {
      const savedAchievements = JSON.parse(localStorage.getItem("achievements")) || [];
      const studentAchievements = savedAchievements.filter((ach) => !ach.isHardcoded);
      setAchievements(studentAchievements);
    } catch (error) {
      console.error("Error parsing localStorage:", error);
      localStorage.clear(); 
      setAchievements([]);
    }
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewAchievement((prev) => ({
          ...prev,
          proof: file,
          proofBase64: reader.result,
          proofName: file.name,
        }));
      };
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (newAchievement.title && newAchievement.description && newAchievement.proofBase64) {
      const newEntry = {
        id: `ach-${Date.now()}-${Math.random()}`, 
        title: newAchievement.title,
        description: newAchievement.description,
        proofBase64: newAchievement.proofBase64,
        proofName: newAchievement.proofName,
        status: "Pending", 
      };
      const updatedAchievements = [...achievements, newEntry];
      const uniqueAchievements = Array.from(
        new Map(updatedAchievements.map((ach) => [ach.id, ach])).values()
      );
      setAchievements(uniqueAchievements);
      localStorage.setItem("achievements", JSON.stringify(uniqueAchievements)); 
      window.dispatchEvent(new Event("achievementUpdated"));
      setNewAchievement({ id: "", title: "", description: "", proof: null, proofBase64: "", proofName: "", status: "Pending" });
      setSelectedPage("view");
    } else {
      alert("Please fill all fields and upload a proof.");
    }
  };
  return (
    <div className="dashboard-container">
      <Sidebar onSelect={setSelectedPage} />
      <div className="dashboard-content">
        {selectedPage === "upload" && (
          <form className="upload-form" onSubmit={handleUpload}>
            <h3>Upload New Achievement</h3>
            <input
              type="text"
              placeholder="Title"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
            <textarea
              placeholder="Description"
              value={newAchievement.description}
              onChange={(e) => setNewAchievement((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
            <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} required />
            <button type="submit">Submit</button>
          </form>
        )}

        {selectedPage === "view" && (
          <div className="achievements-list">
            <h3>My Achievements</h3>
            {achievements.length === 0 ? (
              <p>No achievements uploaded yet.</p>
            ) : (
              achievements.map((ach) => (
                <div key={ach.id || Math.random()} className="achievement-card">
                  <h4>{ach.title}</h4>
                  <p>{ach.description}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={ach.status.toLowerCase()}>{ach.status}</span>
                  </p>
                  {ach.proofBase64 && (
                    <p>
                      <a href={ach.proofBase64} download={ach.proofName}>
                        📄 View Proof ({ach.proofName})
                      </a>
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
