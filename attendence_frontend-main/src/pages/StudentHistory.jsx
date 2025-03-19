import React from 'react';

const StudentHistory = ({ studentData }) => {
  return (
    <div className="student-history">
      <h1>Student History</h1>
      {studentData.length === 0 ? (
        <p>No student data available.</p>
      ) : (
        <ul>
          {studentData.map((student, index) => (
            <li key={index}>
              <h2>{student.name}</h2>
              <p>Email: {student.email}</p>
              <p>Course: {student.course}</p>
              <p>Year: {student.year}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentHistory; 