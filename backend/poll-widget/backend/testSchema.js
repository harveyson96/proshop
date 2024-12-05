// testSchema.js
import mongoose from 'mongoose';
import * as Poll from './models/Poll.js';


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pollWidget', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");

  // Create a test poll document
  const testPoll = new Poll({
    question: 'What is your favorite programming language?',
    options: [
      { text: 'JavaScript' },
      { text: 'Python' },
      { text: 'Java' },
    ],
  });

  // Save the poll to the database
  return testPoll.save();
}).then(() => {
  console.log("Poll saved successfully");

  // Query the database to check if the poll exists
  return Poll.findOne({ question: 'What is your favorite programming language?' });
}).then((poll) => {
  if (poll) {
    console.log("Poll retrieved from the database:", poll);
  } else {
    console.log("Poll not found");
  }

  // Close the database connection
  return mongoose.connection.close();
}).catch(err => {
  console.error("Error:", err);
  mongoose.connection.close(); // Ensure the connection closes on error
});
