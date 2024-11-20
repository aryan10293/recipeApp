"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
let auth = {
    postCreateAccount: (req, res, next) => {
        console.log(req.body);
        const validationErrors = [];
        const validEmail = {
            msg: "Please enter a valid email address."
        };
        const passwordLength = {
            msg: "Password must be at least 8 characters long",
        };
        const correctPassword = {
            msg: "Passwords do not match"
        };
        if (!validator_1.default.isEmail(req.body.email))
            validationErrors.push(validEmail);
        if (!validator_1.default.isLength(req.body.password, { min: 8 }))
            validationErrors.push(passwordLength);
        if (req.body.password !== req.body.confirmPassword)
            validationErrors.push(correctPassword);
        if (validationErrors.length) {
            console.log(validationErrors);
            req.flash("errors", validationErrors);
        }
        req.body.email = validator_1.default.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });
        const user = new user_1.default({
            userName: req.body.username,
            usernameSearch: req.body.username.toLowerCase(),
            email: req.body.email,
            password: req.body.password,
            lastName: req.body.first,
            firstName: req.body.last,
            skillLevel: req.body.skillLevel,
            cookingStyle: req.body.cookingStyle,
            dob: req.body.dob,
            country: req.body.country
        });
        user_1.default.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] }, (err, existingUser) => {
            if (err) {
                return next(err);
            }
            if (existingUser) {
                req.flash("errors", {
                    msg: "Account with that email address or username already exists.",
                });
            }
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    const token = jsonwebtoken_1.default.sign({ sub: user._id }, process.env.SECRET_KEY, { expiresIn: '1m' });
                    res.send({ token, newUser: user, status: '200' });
                });
            });
        });
    },
    postLogin: (req, res, next) => {
        const validationErrors = [];
        const validEmail = {
            msg: "Please enter a valid email address."
        };
        const emptyPassword = {
            msg: "Please enter a valid email address."
        };
        if (!validator_1.default.isEmail(req.body.email))
            validationErrors.push(validEmail);
        if (validator_1.default.isEmpty(req.body.password))
            validationErrors.push(emptyPassword);
        if (validationErrors.length) {
            req.flash("errors", validationErrors);
            return res.redirect("/login");
        }
        req.body.email = validator_1.default.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });
        passport_1.default.authenticate("local", (err, user, info) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                req.flash("errors", info);
                return res.redirect("/login");
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                req.flash("success", { msg: "Success! You are logged in." });
                const token = jsonwebtoken_1.default.sign({ sub: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.status(200).send({ token, newUser: user, status: '200' });
            });
        })(req, res, next);
    },
    logout: (req, res) => {
        req.logout(() => {
            console.log('User has logged out.');
        });
        req.session.destroy((err) => {
            if (err)
                console.log("Error : Failed to destroy the session during logout.", err);
            req.user = null;
            res.redirect("/");
        });
    },
    checkUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        jsonwebtoken_1.default.verify(req.params.id, process.env.SECRET_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
            }
            else {
                const userId = decoded.sub;
                let thisIsAwe = yield user_1.default.find({ _id: userId });
                res.status(200).json({ success: true, message: 'lebron james is elite', userinfo: thisIsAwe });
            }
        }));
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.find({ _id: req.params.id });
        res.status(200).json({ user: user });
    }),
    test: (req, res) => {
        res.send('hello world');
    }
};
exports.default = auth;
