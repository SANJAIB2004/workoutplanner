//index.js
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const entryRoute = require("./routes/entries.js");
const routineRoute = require("./routes/routines.js");
const mealRoute = require("./routes/meals.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Initialize dotenv to read .env files
dotenv.config();

// Initialize express app
const app = express();

// Use middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());




dotenv.config();

const PORT = process.env.PORT || 7700;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.get('/', (req, res) => { res.send('Hello from Express!') });

app.use(cookieParser())
app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);
app.use("/api/routines", routineRoute);
app.use("/api/meals", mealRoute);

app.listen(PORT, () => {
    console.log("Listening on port 2000");
    connect();
});
