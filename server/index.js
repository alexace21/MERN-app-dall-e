import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// Server-database-cluster
import connectDB from "./mongodb/connect.js";
// Cloud storage
import postRoutes from './routes/postRoutes.js';
// OpenAI Api
import dalleRoutes from './routes/dalleRoutes.js';

// Dotenv allows us to pull environmental variables from dotenv file.
dotenv.config();

// init application
const app = express();
// Set cross origin resource communication
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Set application routes to use
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Route '/'
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

// Start process
const startServer = async () => {
  try {
    // Connection to MongoDB
    connectDB(process.env.MONGODB_URL);
    // Port listen 8080
    app.listen(8080, () =>
      console.log(
        "Server has started on port: http://localhost:8080 \nServer is running..."
      )
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
