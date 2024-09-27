"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    userName: { type: String, unique: true, required: true },
    usernameSearch: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true, },
    bio: { type: String, default: '' },
    profilePic: { type: String, default: 'https://s-media-cache-ak0.pinimg.com/736x/dd/6f/40/dd6f403a57b73215b5be860bd397ec34.jpg' },
    savedRecipes: { type: Array, default: [] },
    skillLevel: { type: String, default: 'Beginner' },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    dob: { type: String, default: '' },
    pinnedPost: { type: Array, default: [] },
    cookingStyle: { type: String, default: 'Grill Master' },
    country: { type: String, default: 'Hungary' },
    accountAge: { type: Date, default: Date.now() },
});
UserSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_1.default.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
