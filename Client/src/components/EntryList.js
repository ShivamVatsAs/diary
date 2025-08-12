import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // Fetch all diary entries from our backend API
        const response = await axios.get('/api/diary');
        // Sort entries by date, with the newest first
        const sortedEntries = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(sortedEntries);
        setError(null);
      } catch (err) {
        console.error("Error fetching diary entries:", err);
        setError("Failed to load entries. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []); // The empty array means this effect runs once when the component mounts

  // Show a loading message while fetching data
  if (isLoading) {
    return <div className="text-center p-10">Loading your secrets...</div>;
  }

  // Show an error message if the fetch failed
  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-500 font-display">
          Your Diary Entries
        </h2>
        <Link
          to="/"
          className="bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Back to Calendar
        </Link>
      </div>

      {/* Display a message if there are no entries */}
      {entries.length === 0 ? (
        <p className="text-gray-500">You haven't written any entries yet.</p>
      ) : (
        <ul className="space-y-6">
          {/* Loop through each entry and display it */}
          {entries.map(entry => (
            <li key={entry._id} className="p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
              <h3 className="font-semibold text-pink-600 text-lg">
                {/* Format the date to be more readable */}
                {new Date(entry.date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              {/* Use whitespace-pre-wrap to preserve line breaks from the diary entry */}
              <p className="text-gray-700 mt-2 whitespace-pre-wrap">{entry.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryList;