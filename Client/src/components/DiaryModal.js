import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiaryModal = ({ date, entry, onClose }) => {
  // State to hold the text content of the diary entry.
  const [content, setContent] = useState('');

  // useEffect hook to set the initial content of the textarea.
  // If an entry for the selected date already exists, it populates the textarea with that content.
  // Otherwise, it's an empty string.
  useEffect(() => {
    if (entry) {
      setContent(entry.content);
    } else {
      setContent('');
    }
  }, [entry]);

  // Handles saving a new entry or updating an existing one.
  const handleSave = async () => {
    try {
      const entryData = { date, content };
      if (entry) {
        // If an entry already exists, send a PUT request to update it.
        await axios.put(`/api/diary/${entry._id}`, entryData);
      } else {
        // If it's a new entry, send a POST request to create it.
        await axios.post('/api/diary', entryData);
      }
      // Close the modal and signal a refresh of the entries list.
      onClose(true);
    } catch (error) {
      console.error("Error saving diary entry:", error);
      // Optionally: show an error message to the user
    }
  };

  // Handles deleting an existing entry.
  const handleDelete = async () => {
    if (!entry) return; // No entry to delete

    try {
      // Send a DELETE request to the server.
      await axios.delete(`/api/diary/${entry._id}`);
      // Close the modal and signal a refresh.
      onClose(true);
    } catch (error) {
      console.error("Error deleting diary entry:", error);
    }
  };

  return (
    // Modal backdrop - a semi-transparent overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal content container */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg m-4">
        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-pink-500 mb-4">
          {/* Format the date for display */}
          {date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </h2>

        {/* Text area for the diary entry */}
        <textarea
          className="w-full h-64 p-3 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind today?"
        ></textarea>

        {/* Action buttons */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <button
              onClick={handleSave}
              className="bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Save
            </button>
            {/* The delete button only shows if an entry already exists */}
            {entry && (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors ml-2"
              >
                Delete
              </button>
            )}
          </div>
          <button
            onClick={() => onClose(false)} // Close without refreshing
            className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryModal;
