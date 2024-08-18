import express from "express";
import http from "http";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongo";
import flash from "express-flash";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import configurePassport from "./config/passport.js";
import dotenv from "dotenv";
const app = express();
const server = http.createServer(app);
const MongoStore = connectMongo(session);

// Your application logic goes here...

// Import other modules (CommonJS syntax)
import connectDB from "./config/database";
import mainRoutes from "./routes/main";

//Use .env file in config folder
dotenv.config({ path: "./config/.env" });

// Passport config

//Connect To Database
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//Body Parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Logging
app.use(logger("dev"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(cookieParser("keyboard cat"));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);
//Use flash messages for errors, info, ect...
app.use(flash());

app.use("/", mainRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it! on " + process.env.PORT);
});
