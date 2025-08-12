const express = require('express');
const router = express.Router();
const {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} = require('../controllers/diaryController'); // Import the controller functions

// This file defines the API routes and maps them to the controller functions.

// Route to get all entries and create a new entry.
// A GET request to /api/diary will trigger the getEntries function.
// A POST request to /api/diary will trigger the createEntry function.
router.route('/').get(getEntries).post(createEntry);

// Route to update or delete a specific entry by its ID.
// A PUT request to /api/diary/:id will trigger the updateEntry function.
// A DELETE request to /api/diary/:id will trigger the deleteEntry function.
router.route('/:id').put(updateEntry).delete(deleteEntry);

// Export the router to be used in our main server file.
module.exports = router;