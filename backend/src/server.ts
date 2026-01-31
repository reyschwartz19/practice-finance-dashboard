import express from "express";
const app = express();
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";

connectDB();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})