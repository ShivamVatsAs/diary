import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CalendarView from './components/CalendarView'; // Your original calendar component
import EntryList from './components/EntryList'; // The new list component

function App() {
  return (
    // The Router component wraps your entire app, enabling routing
    <Router>
      <div className="min-h-screen bg-[#FFF8F9] p-4 font-sans">
        <main className="w-full max-w-4xl mx-auto">
          {/* App Header */}
          <header className="text-center mb-8 flex justify-between items-center">
            {/* The main title of your diary */}
            <h1 className="text-4xl md:text-5xl font-bold text-pink-500 font-display">
              My Secret Diary
            </h1>
            {/* The new "View Entries" button that links to our new page */}
            <Link
              to="/entries"
              className="bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors shadow-md"
            >
              View Entries
            </Link>
          </header>

          {/* The Routes component manages which page to show based on the URL */}
          <Routes>
            {/* Route 1: The home page ("/") shows the CalendarView */}
            <Route path="/" element={<CalendarView />} />
            
            {/* Route 2: The entries page ("/entries") shows the EntryList */}
            <Route path="/entries" element={<EntryList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;