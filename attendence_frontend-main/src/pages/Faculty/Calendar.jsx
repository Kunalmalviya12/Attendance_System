import React, { useState } from "react";
import { format } from "date-fns";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Generate dates for February 2025
  const generateDates = () => {
    const dates = [];
    for (let i = 1; i <= 28; i++) {
      dates.push(new Date(2025, 1, i)); // February is month index 1 (0-based index)
    }
    return dates;
  };

  const availableTimes = [
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 pm",
    "12:30 pm",
    "1:00 pm",
    "1:30 pm",
    "2:00 pm",
    "2:30 pm",
  ];

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2>Generate QR Code</h2>
      <p>Check out our availability and book the date and time that works for you.</p>

      {/* Date Selection */}
      <h3>Select a Date</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
        {generateDates().map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            style={{
              padding: "10px",
              margin: "5px",
              border: selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") ? "2px solid blue" : "1px solid gray",
              background: selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") ? "#dfe8ff" : "white",
              cursor: "pointer",
            }}
          >
            {format(date, "d")}
          </button>
        ))}
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <>
          <h3>Select a Time</h3>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                style={{
                  padding: "10px",
                  border: selectedTime === time ? "2px solid blue" : "1px solid gray",
                  background: selectedTime === time ? "#dfe8ff" : "white",
                  cursor: "pointer",
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Booking Details */}
      {selectedDate && selectedTime && (
        <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
          <h3>Service Details</h3>
          <p><strong>Generate QR Code</strong></p>
          <p><strong>Date:</strong> {format(selectedDate, "dd MMMM yyyy")}</p>
          <p><strong>Time:</strong> {selectedTime}</p>
          <p><strong>Location:</strong> Location 1</p>
          <p><strong>Staff:</strong> Member #1</p>
          <p><strong>Duration:</strong> 45 min</p>
          <p><strong>Price:</strong> $50</p>

          <button
            style={{
              padding: "10px 20px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
