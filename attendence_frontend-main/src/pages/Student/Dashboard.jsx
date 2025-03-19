import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [studentName] = useState("John Doe");
  const [showHistory, setShowHistory] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  // Sample attendance data
  const attendanceData = {
    "Data Structures": {
      totalClasses: 15,
      attended: 12,
      percentage: 80,
      monthlyData: {
        "March 2024": {
          total: 8,
          attended: 6,
          history: [
            { date: "2024-03-10", time: "10:30 AM", status: "Present" },
            { date: "2024-03-08", time: "10:30 AM", status: "Present" },
            { date: "2024-03-06", time: "10:30 AM", status: "Absent" },
          ]
        },
        "February 2024": {
          total: 7,
          attended: 6,
          history: [
            { date: "2024-02-28", time: "10:30 AM", status: "Present" },
            { date: "2024-02-21", time: "10:30 AM", status: "Present" },
            { date: "2024-02-14", time: "10:30 AM", status: "Absent" },
          ]
        }
      }
    },
    "Database Management": {
      totalClasses: 12,
      attended: 10,
      percentage: 83.33,
      monthlyData: {
        "March 2024": {
          total: 6,
          attended: 5,
          history: [
            { date: "2024-03-09", time: "11:30 AM", status: "Present" },
            { date: "2024-03-07", time: "11:30 AM", status: "Present" },
            { date: "2024-03-05", time: "11:30 AM", status: "Absent" },
          ]
        },
        "February 2024": {
          total: 6,
          attended: 5,
          history: [
            { date: "2024-02-27", time: "11:30 AM", status: "Present" },
            { date: "2024-02-20", time: "11:30 AM", status: "Present" },
            { date: "2024-02-13", time: "11:30 AM", status: "Present" },
          ]
        }
      }
    },
    "Web Development": {
      totalClasses: 10,
      attended: 8,
      percentage: 80,
      monthlyData: {
        "March 2024": {
          total: 5,
          attended: 4,
          history: [
            { date: "2024-03-08", time: "09:30 AM", status: "Present" },
            { date: "2024-03-06", time: "09:30 AM", status: "Present" },
            { date: "2024-03-04", time: "09:30 AM", status: "Absent" },
          ]
        },
        "February 2024": {
          total: 5,
          attended: 4,
          history: [
            { date: "2024-02-26", time: "09:30 AM", status: "Present" },
            { date: "2024-02-19", time: "09:30 AM", status: "Present" },
            { date: "2024-02-12", time: "09:30 AM", status: "Present" },
          ]
        }
      }
    }
  };

  // Calculate overall attendance
  const totalClasses = Object.values(attendanceData).reduce((sum, subject) => sum + subject.totalClasses, 0);
  const totalAttended = Object.values(attendanceData).reduce((sum, subject) => sum + subject.attended, 0);
  const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(2);

  // Get all available months
  const getAvailableMonths = (subject) => {
    if (!subject) return [];
    return Object.keys(attendanceData[subject].monthlyData);
  };

  // Filter history based on selected month
  const getFilteredHistory = (subject) => {
    if (!subject) return [];
    const subjectData = attendanceData[subject];
    if (selectedMonth === "all") {
      return Object.values(subjectData.monthlyData).flatMap(month => month.history);
    }
    return subjectData.monthlyData[selectedMonth]?.history || [];
  };

  const handleScanQR = () => {
    navigate('/scan');
    // After successful QR scan:
    setShowOtpInput(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Add your OTP verification logic here
    console.log('OTP submitted:', otp);
    // Reset OTP input after submission
    setOtp('');
    setShowOtpInput(false);
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <img src="/logo.png" alt="Logo" className="nav-logo" />
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link active">
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/attendance" className="nav-link">
            <i className="fas fa-clipboard-check"></i> Attendance
          </Link>
          <Link to="/timetable" className="nav-link">
            <i className="fas fa-calendar-alt"></i> Timetable
          </Link>
        </div>
        <div className="nav-right">
          <button onClick={() => navigate('/login')} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome, {studentName}</h1>
          <p>View your attendance details below</p>
        </div>

        {/* Quick Actions with OTP Input */}
        <div className="quick-actions">
          <button className="scan-qr-btn" onClick={handleScanQR}>
            <i className="fas fa-qrcode"></i>
            Scan QR Code
          </button>
        </div>

        {/* OTP Input Modal */}
        {showOtpInput && (
          <div className="otp-modal">
            <div className="otp-content">
              <div className="otp-header">
                <h2>Enter OTP</h2>
                <button 
                  className="close-otp" 
                  onClick={() => setShowOtpInput(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <p className="otp-instruction">
                Please enter the OTP sent to your registered email/phone
              </p>
              <form onSubmit={handleOtpSubmit} className="otp-form">
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="otp-input"
                  required
                />
                <div className="otp-actions">
                  <button type="submit" className="verify-btn">
                    <i className="fas fa-check-circle"></i>
                    Verify OTP
                  </button>
                  <button 
                    type="button" 
                    className="resend-btn"
                    onClick={() => {
                      // Add resend OTP logic here
                      console.log('Resend OTP');
                    }}
                  >
                    <i className="fas fa-redo"></i>
                    Resend OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Overall Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Classes</h3>
            <p>{totalClasses}</p>
          </div>
          <div className="stat-card clickable" onClick={() => setShowHistory(true)}>
            <h3>Classes Attended</h3>
            <p>{totalAttended}</p>
          </div>
          <div className="stat-card">
            <h3>Overall Attendance</h3>
            <p>{overallPercentage}%</p>
          </div>
        </div>

        {/* Attendance History Modal */}
        {showHistory && (
          <div className="attendance-history-modal">
            <div className="modal-content">
              <div className="history-header">
                <h2>Attendance History</h2>
                <button className="close-history" onClick={() => {
                  setShowHistory(false);
                  setSelectedSubject(null);
                  setSelectedMonth("all");
                }}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {!selectedSubject ? (
                // Show subject cards
                <div className="subject-cards">
                  {Object.entries(attendanceData).map(([subject, data]) => (
                    <div 
                      key={subject} 
                      className="subject-card"
                      onClick={() => setSelectedSubject(subject)}
                    >
                      <h3>{subject}</h3>
                      <div className="subject-stats">
                        <p>Total Classes: {data.totalClasses}</p>
                        <p>Attended: {data.attended}</p>
                        <p className={`percentage ${data.percentage < 75 ? 'low' : ''}`}>
                          {data.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Show detailed subject history
                <div className="subject-history">
                  <div className="subject-header">
                    <button 
                      className="back-to-subjects"
                      onClick={() => {
                        setSelectedSubject(null);
                        setSelectedMonth("all");
                      }}
                    >
                      <i className="fas fa-arrow-left"></i> Back to Subjects
                    </button>
                    <select 
                      value={selectedMonth} 
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="month-selector"
                    >
                      <option value="all">All Months</option>
                      {getAvailableMonths(selectedSubject).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>

                  <div className="history-table-container">
                    <table className="history-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredHistory(selectedSubject).map((record, index) => (
                          <tr key={index}>
                            <td>{record.date}</td>
                            <td>{record.time}</td>
                            <td>
                              <span className={`status-badge ${record.status.toLowerCase()}`}>
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;