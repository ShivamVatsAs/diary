const mongoose = require('mongoose');

// A Mongoose schema defines the structure of the documents within a collection.
const diaryEntrySchema = new mongoose.Schema(
  {
    // The 'date' field will store the date of the diary entry.
    date: {
      type: Date,
      required: true, // This field must be provided.
    },
    // The 'content' field will store the text of the diary entry.
    content: {
      type: String,
      required: true, // This field must be provided.
    },
  },
  {
    // The 'timestamps' option automatically adds 'createdAt' and 'updatedAt' fields
    // to our documents, which is useful for tracking when entries are created and modified.
    timestamps: true,
  }
);

// A Mongoose model provides an interface to the database for creating, querying, etc.
// The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, for 'DiaryEntry', the model will be for the 'diaryentries' collection in the database.
const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);

// Export the model to be used in our controller.
module.exports = DiaryEntry;
