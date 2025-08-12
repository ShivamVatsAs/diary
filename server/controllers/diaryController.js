const DiaryEntry = require('../models/DiaryEntry'); // We will create this model next.

// @desc    Get all diary entries
// @route   GET /api/diary
// @access  Public (for this simple app)
const getEntries = async (req, res) => {
  try {
    // Find all entries and sort them by date in descending order (newest first).
    const entries = await DiaryEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new diary entry
// @route   POST /api/diary
// @access  Public
const createEntry = async (req, res) => {
  try {
    const { date, content } = req.body;

    // Basic validation
    if (!date || !content) {
      return res.status(400).json({ message: 'Please provide a date and content.' });
    }

    const newEntry = new DiaryEntry({
      date,
      content,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a diary entry
// @route   PUT /api/diary/:id
// @access  Public
const updateEntry = async (req, res) => {
  try {
    const { content } = req.body;
    const entry = await DiaryEntry.findById(req.params.id);

    if (entry) {
      entry.content = content || entry.content;
      const updatedEntry = await entry.save();
      res.json(updatedEntry);
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a diary entry
// @route   DELETE /api/diary/:id
// @access  Public
const deleteEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (entry) {
      await entry.deleteOne(); // Mongoose v6+ uses deleteOne()
      res.json({ message: 'Entry removed' });
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export all controller functions
module.exports = {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
};
