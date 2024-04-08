import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors'
import  dbConnection  from "./config/dbConnection.js";
import userRoutes from './routes/userRoutes.js'
import bodyParser from "body-parser";




const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




dbConnection();
app.use(cors());
app.use ('/api/user/',userRoutes);
app.use(express.json());
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The Server is running at http://localhost:${port}`);
});
