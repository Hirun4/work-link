import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:3000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);

        const pictureResponse = await axios.get(
          `http://localhost:3000/api/profile-picture/${response.data._id}`
        );
        setProfilePicture(pictureResponse.data.imageUrl);
      } catch (error) {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("userId", userData._id);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post("http://localhost:3000/api/profile-picture/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setProfilePicture(response.data.imageUrl);
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      alert("Failed to upload profile picture");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={profilePicture || "/default-profile.png"} alt="Profile" />
          <input type="file" accept="image/*" onChange={handleProfilePictureUpload} />
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
