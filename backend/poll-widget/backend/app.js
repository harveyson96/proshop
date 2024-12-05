import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/pollWidget', {
 
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Database connection error", err);
  });

// Routes
import pollRoutes from './routes/pollRoutes.js';
app.use('/api/polls', pollRoutes);

// Export the app for testing purposes
export default app;
