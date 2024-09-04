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
const user_1 = __importDefault(require("../model/user"));
const cloudinary_1 = __importDefault(require("../middleware/cloudinary"));
let profile = {
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.body.profiePic === undefined) {
                const getUserAndUpdate = yield user_1.default.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {
                        bio: req.body.bio, userName: req.body.userName,
                        skillLevel: req.body.skillLevel,
                        cooking: req.body.cookingStyle
                    }
                });
                if (!getUserAndUpdate) {
                    res.status(400).json({ status: '400', message: 'profile was not updated' });
                }
                else {
                    res.status(200).json({ status: '200', message: 'profile was updated' });
                }
            }
            else {
                const getUserAndUpdate = yield user_1.default.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {
                        img: yield (0, cloudinary_1.default)(req.body.profilePic),
                        bio: req.body.bio, userName: req.body.userName,
                        skillLevel: req.body.skillLevel,
                        cooking: req.body.cookingStyle
                    }
                });
                if (!getUserAndUpdate) {
                    res.status(400).json({ status: '400', message: 'profile was not updated' });
                }
                else {
                    res.status(200).json({ status: '200', message: 'profile was updated' });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = profile;
