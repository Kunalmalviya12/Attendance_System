import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTimetable.css';

const CreateTimetable = () => {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState({
    course: '',
    semester: '',
    section: '',
    faculty: '',
    schedule: Array(8).fill(Array(5).fill('')) // Initialize with empty strings for each time slot and day
  });

  // Add notification state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: ''
  });

  // Add update mode state
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // Predefined options for dropdowns
  const courseOptions = ['MBA', 'BBA', 'MISCIT', 'IMCA', 'BCA'];
  const semesterOptions = ['1', '2', '3', '4', '5'];
  const sectionOptions = ['A', 'B', 'C'];
  const facultyOptions = ['Sadhana', 'Neha', 'Narav', 'Anjali', 'Himali'];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  // Show notification helper function
  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
    setTimeout(() => {
      setNotification({
        show: false,
        message: '',
        type: ''
      });
    }, 3000);
  };

  const handleInputChange = (timeIndex, dayIndex, value) => {
    const newSchedule = timetableData.schedule.map((row, rowIndex) =>
      rowIndex === timeIndex
        ? row.map((cell, cellIndex) =>
            cellIndex === dayIndex ? value : cell
          )
        : row
    );

    setTimetableData({
      ...timetableData,
      schedule: newSchedule
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!timetableData.course || !timetableData.semester || !timetableData.section) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    console.log('Timetable Data:', timetableData);
    showNotification('Timetable saved successfully!', 'success');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!timetableData.course || !timetableData.semester || !timetableData.section) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    console.log('Updated Timetable Data:', timetableData);
    showNotification('Timetable updated successfully!', 'success');
  };

  return (
    <div className="create-timetable">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
          {notification.message}
        </div>
      )}

      <div className="timetable-header">
        <h1>{isUpdateMode ? 'Update Timetable' : 'Create New Timetable'}</h1>
        <div className="header-actions">
          <button 
            onClick={() => setIsUpdateMode(!isUpdateMode)} 
            className="toggle-btn"
          >
            <i className={`fas ${isUpdateMode ? 'fa-plus' : 'fa-edit'}`}></i>
            {isUpdateMode ? 'Create New' : 'Update Existing'}
          </button>
          <button onClick={() => navigate('/AdminDashboard')} className="back-btn">
            <i className="fas fa-arrow-left"></i>
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="timetable-form">
        <div className="form-controls">
          <select
            value={timetableData.course}
            onChange={(e) => setTimetableData({...timetableData, course: e.target.value})}
            required
            className="form-select"
          >
            <option value="">Select Course</option>
            {courseOptions.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>

          <select
            value={timetableData.semester}
            onChange={(e) => setTimetableData({...timetableData, semester: e.target.value})}
            required
            className="form-select"
          >
            <option value="">Select Semester</option>
            {semesterOptions.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>

          <select
            value={timetableData.section}
            onChange={(e) => setTimetableData({...timetableData, section: e.target.value})}
            required
            className="form-select"
          >
            <option value="">Select Section</option>
            {sectionOptions.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>

          <select
            value={timetableData.faculty}
            onChange={(e) => setTimetableData({...timetableData, faculty: e.target.value})}
            required
            className="form-select"
          >
            <option value="">Select Faculty</option>
            {facultyOptions.map(faculty => (
              <option key={faculty} value={faculty}>{faculty}</option>
            ))}
          </select>
        </div>

        <div className="timetable-grid">
          <table>
            <thead>
              <tr>
                <th>Time/Day</th>
                {days.map(day => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, timeIndex) => (
                <tr key={time}>
                  <td className="time-slot">{time}</td>
                  {days.map((day, dayIndex) => (
                    <td key={`${day}-${time}`}>
                      <input
                        type="text"
                        placeholder="Enter subject"
                        value={timetableData.schedule[timeIndex][dayIndex]}
                        onChange={(e) => handleInputChange(timeIndex, dayIndex, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="timetable-actions">
          <button 
            className="save-btn" 
            onClick={isUpdateMode ? handleUpdate : handleSubmit}
          >
            <i className={`fas ${isUpdateMode ? 'fa-sync-alt' : 'fa-save'}`}></i>
            {isUpdateMode ? 'Update Timetable' : 'Save Timetable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTimetable; 