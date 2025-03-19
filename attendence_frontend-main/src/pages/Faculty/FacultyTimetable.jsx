import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyTimetable.css';

const FacultyTimetable = () => {
  const navigate = useNavigate();
  const [facultyName] = useState("Dr. Smith");

  // Sample timetable data - replace with your actual data structure
  const [timetable] = useState([
    {
      day: "Monday",
      schedule: [
        {
          subject: "Data Structures",
          course: "BCA",
          semester: 3,
          time: "10:00 AM - 11:00 AM",
          room: "Lab 1"
        },
        {
          subject: "Database Management",
          course: "MSCIT",
          semester: 2,
          time: "11:15 AM - 12:15 PM",
          room: "Room 201"
        }
      ]
    },
    {
      day: "Tuesday",
      schedule: [
        {
          subject: "Python Programming",
          course: "BCA",
          semester: 1,
          time: "09:00 AM - 10:00 AM",
          room: "Lab 2"
        },
        {
          subject: "AI Fundamentals",
          course: "MSCIT",
          semester: 4,
          time: "02:00 PM - 03:00 PM",
          room: "Room 302"
        }
      ]
    }
    // Add more days as needed
  ]);

  return (
    <div className="timetable-container">
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <img src="/logo.png" alt="Logo" className="nav-logo" />
        </div>
        <div className="nav-right">
          <button onClick={() => navigate('/faculty-dashboard')} className="back-btn">
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <button onClick={() => navigate('/login')} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="timetable-content">
        <div className="timetable-header">
          <h1>Weekly Schedule - {facultyName}</h1>
        </div>

        <div className="timetable-grid">
          {timetable.map((day, index) => (
            <div key={index} className="day-schedule">
              <h2 className="day-header">{day.day}</h2>
              <div className="schedule-cards">
                {day.schedule.map((session, sessionIndex) => (
                  <div key={sessionIndex} className="schedule-card">
                    <div className="time-slot">{session.time}</div>
                    <div className="schedule-details">
                      <h3>{session.subject}</h3>
                      <p>
                        <span className="label">Course:</span> {session.course}
                      </p>
                      <p>
                        <span className="label">Semester:</span> {session.semester}
                      </p>
                      <p>
                        <span className="label">Room:</span> {session.room}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyTimetable; 