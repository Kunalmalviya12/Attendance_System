import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Assuming you have a CSS file for styling


const AdminDashboard = () => {
  const navigate = useNavigate();

  

  // State for adding and updating faculty
  const [facultyData, setFacultyData] = useState({
    name: "",
    email: "",
    department: "",
    facultyId: "",
    password: "",
  });

  // State for user details
  const [students, setStudents] = useState([]); // State to hold student details
  const [faculty, setFaculty] = useState([]); // State to hold faculty details
  const [showUsers, setShowUsers] = useState(false); // State to toggle user details
  const [loading, setLoading] = useState(false); // Loading state

  // Add notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "" // 'success' or 'error'
  });

  const [updateMode, setUpdateMode] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");

  const handleLogout = () => {
    // Logic for logging out (e.g., clearing tokens, redirecting to login)
    navigate("/login");
  };

  // Show notification helper function
  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        type: ""
      });
    }, 3000);
  };

  const handleFacultyChange = (e) => {
    setFacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const handleAddFaculty = (e) => {
    e.preventDefault();
    try {
      // Logic to add faculty (e.g., API call)
      console.log("Faculty added:", facultyData);
      showNotification("Faculty added successfully!", "success");
      // Reset form
      setFacultyData({ name: "", email: "", department: "", facultyId: "", password: "" });
    } catch (error) {
      showNotification("Failed to add faculty. Please try again.", "error");
    }
  };

  const handleSearchFaculty = async () => {
    if (!searchEmail) {
      alert("Please enter faculty email to search");
      return;
    }
    
    try {
      // API call to search faculty
      // const response = await axios.get(`/api/faculty/${searchEmail}`);
      // setFacultyData(response.data);
      setUpdateMode(true);
    } catch (error) {
      alert("Faculty not found");
    }
  };

  const handleUpdateFaculty = async (e) => {
    e.preventDefault();
    try {
      // API call to update faculty
      // await axios.put(`/api/faculty/${facultyData.email}`, facultyData);
      alert("Faculty updated successfully");
      setUpdateMode(false);
      setFacultyData({
        name: "",
        email: "",
        department: "",
        facultyId: "",
        password: ""
      });
    } catch (error) {
      alert("Error updating faculty");
    }
  };

  const handleRemoveFaculty = async () => {
    try {
      // API call to remove faculty
      // await axios.delete(`/api/faculty/${facultyData.email}`);
      showNotification("Faculty removed successfully!", "success");
      setFacultyData({ name: "", email: "", department: "", facultyId: "", password: "" });
      setUpdateMode(false);
    } catch (error) {
      showNotification("Failed to remove faculty. Please try again.", "error");
    }
  };

  const handleCreateTimetable = () => {
    navigate('/admin/create-timetable');
  };

  const handleViewUsers = () => {
    setLoading(true); // Set loading state
    // Simulate fetching user details (replace with actual API call)
    setTimeout(() => {
      const mockStudents = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ];
      const mockFaculty = [
        { id: 1, name: "Dr. Alice Johnson", email: "alice@example.com" },
        { id: 2, name: "Prof. Bob Brown", email: "bob@example.com" },
      ];
      setStudents(mockStudents);
      setFaculty(mockFaculty);
      setShowUsers(true); // Show user details
      setLoading(false); // Reset loading state
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <h1>Welcome to the Admin Dashboard</h1>

        <div className="dashboard-actions">
          <button 
            className="create-timetable-btn"
            onClick={handleCreateTimetable}
          >
            <i className="fas fa-calendar-alt"></i>
            Create Timetable
          </button>
          <button 
            className="control-btn"
            onClick={handleViewUsers}
          >
            <i className="fas fa-users"></i>
            View Users
          </button>
        </div>

        {/* Show loading indicator while fetching users */}
        {loading && <div className="loading">Loading users...</div>}

        {/* Show user details if showUsers is true */}
        {showUsers && !loading && (
          <div className="user-details">
            <h2>Registered Users</h2>

            <div className="user-container">
              <div className="user-column">
                <h3>Students</h3>
                {students.map(student => (
                  <div key={student.id} className="user-item">
                    <strong>{student.name}</strong> - {student.email}
                  </div>
                ))}
              </div>

              <div className="user-column">
                <h3>Faculty</h3>
                {faculty.map(facultyMember => (
                  <div key={facultyMember.id} className="user-item">
                    <strong>{facultyMember.name}</strong> - {facultyMember.email}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setShowUsers(false)} className="cancel-btn">
              Close
            </button>
          </div>
        )}

        {/* Notification Component */}
        {notification.show && (
          <div className={`notification ${notification.type}`}>
            <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            {notification.message}
          </div>
        )}

        {/* Faculty Management Form */}
        <div className="faculty-management">
          <h2>Faculty Management</h2>
          
          <div className="faculty-controls">
            
            <button 
              className={`control-btn ${updateMode ? 'active' : ''}`}
              onClick={() => setUpdateMode(true)}
            >
              <i className="fas fa-edit"></i>
              Update Faculty
            </button>
          </div>

          {updateMode && (
            <div className="search-faculty">
              <input
                type="email"
                placeholder="Search Faculty by Email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
              <button onClick={handleSearchFaculty} className="search-btn">
                <i className="fas fa-search"></i>
                Search Faculty
              </button>
            </div>
          )}

          <form className="faculty-form" onSubmit={updateMode ? handleUpdateFaculty : handleAddFaculty}>
            <input
              type="text"
              name="name"
              placeholder="Faculty Name"
              value={facultyData.name}
              onChange={handleFacultyChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Faculty Email"
              value={facultyData.email}
              onChange={handleFacultyChange}
              required
            />
            <input
              type="text"
              name="facultyId"
              placeholder="Faculty ID"
              value={facultyData.facultyId}
              onChange={handleFacultyChange}
              pattern="[A-Za-z0-9]+"
              title="Faculty ID should contain only letters and numbers"
              required
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={facultyData.department}
              onChange={handleFacultyChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={facultyData.password}
              onChange={handleFacultyChange}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              title="Password must be at least 8 characters long and contain both letters and numbers"
              required
            />
            <div className="faculty-actions">
              <button type="submit" className="submit-btn">
                <i className={`fas ${updateMode ? 'fa-save' : 'fa-plus'}`}></i>
                {updateMode ? "Update Faculty" : "Add Faculty"}
              </button>
              {updateMode && (
                <button
                  type="button"
                  onClick={() => {
                    setUpdateMode(false);
                    setFacultyData({
                      name: "",
                      email: "",
                      department: "",
                      facultyId: "",
                      password: ""
                    });
                  }}
                  className="cancel-btn"
                >
                  <i className="fas fa-times"></i>
                  Cancel
                </button>
              )}
              <button 
                type="button" 
                className="remove-btn"
                onClick={handleRemoveFaculty}
              >
                <i className="fas fa-trash-alt"></i>
                Remove Faculty
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
