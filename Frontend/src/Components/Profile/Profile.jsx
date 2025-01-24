import { useState, useEffect } from "react";
import axios from "axios";
// import "./Profile.css"; // Assuming the CSS file for styling

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
        const response = await axios.get("http://localhost:3000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={userData.profilePicture || "/default-profile.png"} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>
            {userData.firstName} {userData.lastName}
          </h2>
          {userData.role === "freelancer" && <p>{userData.title || "No title provided"}</p>}
        </div>
      </div>

      <div className="profile-main">
        <section className="profile-section">
          <h3>About Me</h3>
          <p>{userData.role === "freelancer" ? userData.bio || "No bio provided" : "Client details are confidential."}</p>
        </section>

        {userData.role === "freelancer" && (
          <section className="profile-section">
            <h3>Skills</h3>
            <div className="skills-container">
              {userData.skills && userData.skills.length > 0 ? (
                userData.skills.split(",").map((skill, index) => (
                  <span key={index} className="skill-badge">
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <p>No skills provided</p>
              )}
            </div>
          </section>
        )}

        <section className="profile-section">
          <h3>Contact Information</h3>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.contactNumber || "No phone number provided"}</p>
          {userData.role === "freelancer" && userData.portfolio && (
            <p>
              Portfolio: <a href={userData.portfolio}>{userData.portfolio}</a>
            </p>
          )}
          {userData.role === "client" && userData.companyName && <p>Company: {userData.companyName}</p>}
        </section>
      </div>
    </div>
  );
};

export default Profile;
