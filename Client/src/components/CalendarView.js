import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling for the calendar
import DiaryModal from './DiaryModal'; // The modal for writing entries, we'll create this next
import axios from 'axios'; // We'll use axios to communicate with our backend

const CalendarView = () => {
  // State to hold the currently selected date.
  const [selectedDate, setSelectedDate] = useState(new Date());
  // State to control the visibility of the diary entry modal.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store all diary entries fetched from the database.
  const [entries, setEntries] = useState([]);

  // This function will run when the component mounts to fetch all existing entries.
  const fetchEntries = async () => {
    try {
      // We'll set up this API endpoint on our server later.
      const response = await axios.get('/api/diary');
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    }
  };
  
  // useEffect hook to call fetchEntries when the component first loads.
  useEffect(() => {
    fetchEntries();
  }, []);


  // Handles clicking on a day in the calendar.
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Closes the modal and can optionally refresh entries.
  const handleCloseModal = (refresh) => {
    setIsModalOpen(false);
    // If an entry was saved/updated, refresh the list.
    if (refresh) {
      fetchEntries();
    }
  };

  // Function to add custom styling to calendar tiles that have an entry.
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Check if there is an entry for this date.
      const hasEntry = entries.some(
        (entry) => new Date(entry.date).toDateString() === date.toDateString()
      );
      if (hasEntry) {
        // Return a custom class for dates with entries.
        return 'has-entry';
      }
    }
    return null;
  };

  return (
    <div className="calendar-container bg-white p-6 rounded-lg shadow-lg">
      <style>
        {`
          /* Custom styles for our calendar to match the theme */
          .react-calendar {
            border: none;
            width: 100%;
          }
          .react-calendar__tile--active {
            background-color: #F472B6 !important; /* Active day pink */
            color: white !important;
          }
          .react-calendar__tile--now {
            background-color: #FBCFE8 !important; /* Today's date light pink */
            color: #C2185B !important;
          }
          .react-calendar__tile:hover {
            background-color: #FCE7F3 !important;
          }
          .react-calendar button {
            border-radius: 8px;
          }
          /* Style for dates with entries */
          .has-entry {
            background-color: #F472B6;
            color: white;
            border-radius: 50%;
            font-weight: bold;
          }
        `}
      </style>
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate}
        tileClassName={tileClassName}
      />
      {/* The modal is rendered here but only visible when isModalOpen is true. */}
      {isModalOpen && (
        <DiaryModal
          date={selectedDate}
          onClose={handleCloseModal}
          // Find the entry for the selected date, if it exists.
          entry={entries.find(e => new Date(e.date).toDateString() === selectedDate.toDateString())}
        />
      )}
    </div>
  );
};

export default CalendarView;