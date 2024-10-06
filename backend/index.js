// p - 3lBAaYlLnrMGqXNw
// id - keven3605y@gmail.com
// mongodb+srv://keven3605y:3lBAaYlLnrMGqXNw@cluster0.ld2av.mongodb.net/?retryWrites=true& w=majority&appName=Cluster0

import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import cookieParser   from "cookie-parser";
import path from "path";
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(cors({ origin : "http://localhost:5173" , credentials : true}));

app.use(express.json()); // allows us to parse incoming requests : req.body
app.use(cookieParser()); // allows us to parse incoming cookies 

/*
app.get("/" , (req, res) => {
    res.send("Hello world ");
});
*/

app.use("/api/auth" , authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log("server is running on port : " , PORT);
    
});


