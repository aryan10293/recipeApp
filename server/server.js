"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_flash_1 = __importDefault(require("express-flash"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_js_1 = __importDefault(require("./config/passport.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const MongoStore = (0, connect_mongo_1.default)(express_session_1.default);
const database_1 = __importDefault(require("./config/database"));
const main_1 = __importDefault(require("./routes/main"));
dotenv_1.default.config({ path: "./config/.env" });
(0, database_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose_1.default.connection }),
}));
app.use((0, cookie_parser_1.default)("keyboard cat"));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_js_1.default)(passport_1.default);
app.use((0, express_flash_1.default)());
app.use("/", main_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server is running, you better catch it! on " + process.env.PORT);
});
