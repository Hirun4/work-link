import  { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        // Sending POST request with userId in the body
        console.log(userId);
        
        const response = await axios.post('http://localhost:3000/api/user/profile', { userId });
        setUserData(response.data.userData);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setError('User ID is required');
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container p-4">
      <div className="user-details">
        <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
        <p className="text-xl">{userData.email}</p>
        <p className="text-sm text-gray-500">Role: {userData.role}</p>
      </div>

      {userData.role === 'freelancer' && (
        <div className="freelancer-profile mt-6 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-semibold">Freelancer Profile</h2>
          <p><strong>Title:</strong> {userData.title}</p>
          <p><strong>Bio:</strong> {userData.bio}</p>
          <p><strong>Skills:</strong> {userData.skills.join(', ')}</p>
          <p><strong>Portfolio:</strong> <a href={userData.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Portfolio</a></p>
        </div>
      )}

      {userData.role === 'client' && (
        <div className="client-profile mt-6 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-semibold">Client Profile</h2>
          <p><strong>Company Name:</strong> {userData.companyName}</p>
          <p><strong>Contact Number:</strong> {userData.contactNumber}</p>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,  // userId should be a required string
};

export default Profile;
