import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";
import QRCode from "react-qr-code";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [facultyName] = useState("Dr. Smith");
  const [courses] = useState(["MBA", "MSCIT", "BBA", "IMCA", "BCA"]); // Course names
  const [subjects, setSubjects] = useState([]); // Subjects based on selected course
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [showStudentList, setShowStudentList] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Updated students data structure with subject-wise grouping
  const [students] = useState({
    "Data Structures": [
      {
        id: "101",
        name: "John Doe",
        attendance: [
          { date: "2024-03-10", time: "10:30 AM", status: "Present" },
          { date: "2024-03-09", time: "11:30 AM", status: "Absent" }
        ]
      },
      {
        id: "102",
        name: "Jane Smith",
        attendance: [
          { date: "2024-03-10", time: "10:30 AM", status: "Present" },
          { date: "2024-03-09", time: "11:30 AM", status: "Present" }
        ]
      }
    ],
    "Database Management": [
      {
        id: "103",
        name: "Alice Johnson",
        attendance: [
          { date: "2024-03-10", time: "09:30 AM", status: "Present" },
          { date: "2024-03-09", time: "09:30 AM", status: "Absent" }
        ]
      }
    ]
  });

  const [selectedSubjectForAttendance, setSelectedSubjectForAttendance] = useState(null);
  const [showManualAttendance, setShowManualAttendance] = useState(false);

  // Add new state for tracking current attendance status
  const [attendanceStatus, setAttendanceStatus] = useState({});

  // Add new state for timetable
  const [showTimetable, setShowTimetable] = useState(false);
  
  // Sample timetable data - in real app, this would come from your backend
  const [timetable] = useState([
    {
      day: "Monday",
      schedule: [
        {
          course: "BCA",
          semester: 4,
          subject: "Data Structures",
          time: "10:00 AM - 11:00 AM",
          room: "Lab 1"
        },
        {
          course: "MSCIT",
          semester: 2,
          subject: "Database Management",
          time: "11:00 AM - 12:00 PM",
          room: "Room 201"
        }
      ]
    },
    {
      day: "Tuesday",
      schedule: [
        {
          course: "MCA",
          semester: 3,
          subject: "Python Programming",
          time: "09:00 AM - 10:00 AM",
          room: "Lab 2"
        }
      ]
    },
    {
      day: "Wednesday",
      schedule: [
        {
          course: "BCA",
          semester: 4,
          subject: "Data Structures",
          time: "10:00 AM - 11:00 AM",
          room: "Lab 1"
        }
      ]
    },
    {
      day: "Thursday",
      schedule: [
        {
          course: "MSCIT",
          semester: 2,
          subject: "Database Management",
          time: "02:00 PM - 03:00 PM",
          room: "Room 201"
        }
      ]
    },
    {
      day: "Friday",
      schedule: [
        {
          course: "McA",
          semester: 3,
          subject: "Python Programming",
          time: "11:00 AM - 12:00 PM",
          room: "Lab 2"
        }
      ]
    }
  ]);

  useEffect(() => {
    // Set subjects based on selected course
    if (selectedCourse === "MBA") {
      setSubjects(["PHP", "Python", "MySQL", "AI", "Java"]);
    } else if (selectedCourse === "MSCIT") {
      setSubjects(["CP", "AI", "FS", "Java", "Adv. Java"]);
    } else if (selectedCourse === "BBA") {
      setSubjects(["DBMS", "AI", "Python"]);
    } else if (selectedCourse === "IMCA") {
      setSubjects(["PHP", "MySQL", "Java"]);
    } else if (selectedCourse === "BCA") {
      setSubjects(["Python", "AI", "Java", "DBMS"]);
    } else {
      setSubjects([]);
    }
  }, [selectedCourse]);

  const handleGenerateQR = () => {
    if (!selectedSubject.trim()) {
      alert("Please select a subject");
      return;
    }

    const qrValue = `https://your-attendance-system.com/verify?course=${encodeURIComponent(selectedCourse)}&subject=${encodeURIComponent(selectedSubject)}`;
    const staticDateTime = new Date().toLocaleString();
    setQrData(qrValue);
    setShowQR(true);
    setTimestamp(staticDateTime);
  };

  const handleShowHistory = () => {
    setShowStudentList(true);
    setSelectedStudent(null);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  // Modified handleAttendanceUpdate function
  const handleAttendanceUpdate = (studentId, subject, newStatus) => {
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const time = today.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });

    // Update the attendance status state
    setAttendanceStatus(prev => ({
      ...prev,
      [`${studentId}-${date}`]: newStatus
    }));

    setStudents(prevStudents => {
      const updatedStudents = { ...prevStudents };
      const studentIndex = updatedStudents[subject].findIndex(s => s.id === studentId);
      
      if (studentIndex !== -1) {
        // Find if there's already an attendance record for today
        const todayAttendanceIndex = updatedStudents[subject][studentIndex].attendance
          .findIndex(a => a.date === date);

        if (todayAttendanceIndex !== -1) {
          // Update existing attendance record
          updatedStudents[subject][studentIndex].attendance[todayAttendanceIndex].status = newStatus;
        } else {
          // Add new attendance record
          updatedStudents[subject][studentIndex].attendance.unshift({
            date,
            time,
            status: newStatus
          });
        }
      }
      
      return updatedStudents;
    });
  };

  // Helper function to get current attendance status
  const getAttendanceStatus = (studentId, date) => {
    const key = `${studentId}-${date}`;
    if (attendanceStatus[key]) {
      return attendanceStatus[key];
    }
    // Check if there's an existing record for today
    const today = new Date().toISOString().split('T')[0];
    const student = students[selectedSubjectForAttendance]?.find(s => s.id === studentId);
    const todayAttendance = student?.attendance.find(a => a.date === today);
    return todayAttendance?.status || null;
  };

  // Update the manual attendance section in renderStudentList
  const renderManualAttendance = () => (
    <div className="manual-attendance">
      <h4>Mark Today's Attendance</h4>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students[selectedSubjectForAttendance].map(student => {
            const today = new Date().toISOString().split('T')[0];
            const currentStatus = getAttendanceStatus(student.id, today);

            return (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  <span className={`status-badge ${(currentStatus || '').toLowerCase()}`}>
                    {currentStatus || 'Not Marked'}
                  </span>
                </td>
                <td className="attendance-actions">
                  <button 
                    className={`attendance-btn ${currentStatus === 'Present' ? 'active' : ''}`}
                    onClick={() => handleAttendanceUpdate(
                      student.id, 
                      selectedSubjectForAttendance, 
                      'Present'
                    )}
                  >
                    Present
                  </button>
                  <button 
                    className={`attendance-btn ${currentStatus === 'Absent' ? 'active' : ''}`}
                    onClick={() => handleAttendanceUpdate(
                      student.id, 
                      selectedSubjectForAttendance, 
                      'Absent'
                    )}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button 
        className="close-manual-btn"
        onClick={() => setShowManualAttendance(false)}
      >
        Done
      </button>
    </div>
  );

  // Update the renderStudentList function to use the new renderManualAttendance
  const renderStudentList = () => (
    <div className="student-list">
      <div className="list-header">
        <h2>Attendance Management</h2>
        <button className="close-btn" onClick={() => setShowStudentList(false)}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      {!selectedSubjectForAttendance ? (
        // Show subject-wise list
        <div className="subject-cards">
          {Object.entries(students).map(([subject, studentList]) => (
            <div 
              key={subject} 
              className="subject-card clickable"
              onClick={() => setSelectedSubjectForAttendance(subject)}
            >
              <h3>{subject}</h3>
              <p>Total Students: {studentList.length}</p>
            </div>
          ))}
        </div>
      ) : (
        // Show students for selected subject
        <div className="subject-attendance">
          <div className="subject-header">
            <button 
              className="back-btn"
              onClick={() => setSelectedSubjectForAttendance(null)}
            >
              <i className="fas fa-arrow-left"></i> Back to Subjects
            </button>
            <h3>{selectedSubjectForAttendance}</h3>
            
          </div>

          {showManualAttendance ? (
            renderManualAttendance()
          ) : (
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Last Attendance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students[selectedSubjectForAttendance].map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>
                      {student.attendance[0]?.date} - {student.attendance[0]?.status}
                    </td>
                    <td>
                      <button 
                        className="view-history-btn"
                        onClick={() => handleStudentClick(student)}
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );

  // Modified timetable render function with table format
  const renderTimetable = () => (
    <div className="timetable-modal">
      <div className="timetable-content">
        <div className="timetable-header">
          <h2>Weekly Schedule - {facultyName}</h2>
          <button 
            className="close-btn"
            onClick={() => setShowTimetable(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="timetable-body">
          <table className="timetable-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Time</th>
                <th>Subject</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Room</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((day) => (
                day.schedule.map((session, sessionIndex) => (
                  <tr key={`${day.day}-${sessionIndex}`}>
                    {sessionIndex === 0 && (
                      <td 
                        rowSpan={day.schedule.length} 
                        className="day-cell"
                      >
                        {day.day}
                      </td>
                    )}
                    <td>{session.time}</td>
                    <td>{session.subject}</td>
                    <td>{session.course}</td>
                    <td>{session.semester}</td>
                    <td>{session.room}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <img src="/logo.png" alt="Logo" className="nav-logo" />
        </div>
        <div className="nav-links">
          <Link to="/FacultyDashboard" className="nav-link active">
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/manage-attendance" className="nav-link">
            <i className="fas fa-clipboard-check"></i> Manage Attendance
          </Link>
          <Link to="/class-schedule" className="nav-link">
            <i className="fas fa-calendar-alt"></i> Class Schedule
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
          <h1>Welcome, {facultyName} </h1>
          <p>Generate QR code for attendance or view attendance history</p>
        </div>

        <div className="qr-generator-section">
          <div className="input-group">
            <label>Select Course:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="subject-input"
            >
              <option value="">Select a course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Select Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="subject-input"
              disabled={!selectedCourse} // Disable if no course is selected
            >
              <option value="">Select a subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="action-buttons">
            <button onClick={handleGenerateQR} className="generate-btn">
              <i className="fas fa-qrcode"></i> Generate QR
            </button>
            <button onClick={handleShowHistory} className="history-btn">
              <i className="fas fa-history"></i> Show Student History
            </button>
            <button onClick={() => setShowTimetable(true)} className="timetable-btn">
              <i className="fas fa-calendar-alt"></i> View Timetable
            </button>
          </div>
        </div>

        {showQR && (
          <div className="qr-display">
            <h2>QR Code for {selectedCourse} - {selectedSubject}</h2>
            <div className="qr-code">
              {qrData ? <QRCode value={qrData} size={200} /> : <p>Please select a subject to generate a QR code.</p>}
            </div> 
            <p className="qr-info">Generated on: <strong>{timestamp}</strong></p>
          </div>
        )}

        {showStudentList && !selectedStudent && renderStudentList()}

        {selectedStudent && (
          <div className="attendance-history">
            <div className="history-header">
              <h2>Attendance History - {selectedStudent.name}</h2>
              <div className="history-actions">
                <button 
                  className="mark-attendance-btn"
                  onClick={() => setShowManualAttendance(true)}
                >
                  <i className="fas fa-user-check"></i> Mark Attendance
                </button>
                <button 
                  className="back-btn"
                  onClick={() => setSelectedStudent(null)}
                >
                  <i className="fas fa-arrow-left"></i> Back to List
                </button>
              </div>
            </div>

            {showManualAttendance ? (
              <div className="single-student-attendance">
                <div className="attendance-form">
                  <h4>Mark Today's Attendance</h4>
                  <div className="attendance-status">
                    <p>Current Status: 
                      <span className={`status-badge ${
                        getAttendanceStatus(selectedStudent.id, new Date().toISOString().split('T')[0])?.toLowerCase() || ''
                      }`}>
                        {getAttendanceStatus(selectedStudent.id, new Date().toISOString().split('T')[0]) || 'Not Marked'}
                      </span>
                    </p>
                    <div className="attendance-actions">
                      <button 
                        className={`attendance-btn ${
                          getAttendanceStatus(selectedStudent.id, new Date().toISOString().split('T')[0]) === 'Present' ? 'active' : ''
                        }`}
                        onClick={() => handleAttendanceUpdate(
                          selectedStudent.id, 
                          selectedSubjectForAttendance, 
                          'Present'
                        )}
                      >
                        Present
                      </button>
                      <button 
                        className={`attendance-btn ${
                          getAttendanceStatus(selectedStudent.id, new Date().toISOString().split('T')[0]) === 'Absent' ? 'active' : ''
                        }`}
                        onClick={() => handleAttendanceUpdate(
                          selectedStudent.id, 
                          selectedSubjectForAttendance, 
                          'Absent'
                        )}
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                  <button 
                    className="close-manual-btn"
                    onClick={() => setShowManualAttendance(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudent.attendance.map((record, index) => (
                    <tr key={index}>
                      <td>{record.date}</td>
                      <td>{record.time}</td>
                      <td>{selectedSubjectForAttendance}</td>
                      <td>
                        <span className={`status-badge ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {showTimetable && renderTimetable()}
      </div>
    </div>
  );
};

export default FacultyDashboard;