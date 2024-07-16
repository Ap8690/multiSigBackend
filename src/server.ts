// Import the 'express' module
import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './dbConnection.helper';

dotenv.config();

// Create an Express application
const app = express();
app.use(cors())

// Set the port number for the server
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Define a route for the root path ('/')
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello, TypeScript + Node.js + Express!');
});
app.use("/api/v1", router)

// Start the server and listen on the specified port
app.listen(port, async() => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB(process.env.MONGO_URL)
});