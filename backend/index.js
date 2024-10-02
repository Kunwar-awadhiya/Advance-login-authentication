// p - 3lBAaYlLnrMGqXNw
// id - keven3605y@gmail.com
// mongodb+srv://keven3605y:3lBAaYlLnrMGqXNw@cluster0.ld2av.mongodb.net/?retryWrites=true& w=majority&appName=Cluster0

import dotenv from "dotenv";
import express from 'express';
import cookieParser   from "cookie-parser";
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

/*
app.get("/" , (req, res) => {
    res.send("Hello world ");
});
*/

app.use("/api/auth" , authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("server is running on port : " , PORT);
    
});


