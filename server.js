require("dotenv").config(); 
const express = require('express');
const authRoutes = require("./routes/auth")
const mongoose = require("mongoose");
const cors = require("cors")
const { registerUser, loginUser } = require("./controllers/authControllers");
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const userRoutes = require("./routes/auth")

const app = express()

app.use(cors({ origin: "https://dish-covery-delta.vercel.app/" }))
app.use(express.json())

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch(err => console.log("MongoDB connection failed", err));

app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})