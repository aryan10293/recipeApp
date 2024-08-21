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
const post_1 = __importDefault(require("../model/post"));
const cloudinary_1 = __importDefault(require("../middleware/cloudinary"));
let feed = {
    createRecipe: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const recipeData = {
                userWhoPostId: req.body.userId,
                image: yield (0, cloudinary_1.default)(req.body.pictureOfFood),
                ingridentList: req.body.ingridentList,
                levelOfMeal: req.body.levelOfMeal,
                prepTime: req.body.prepTime
            };
            const createRecipie = yield post_1.default.create(recipeData);
            if (!createRecipie) {
                return res.status(404).json({ status: '404', message: 'error is unknown, Please try again!' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    commentRecipe: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('hey does this comment stuff work');
    })
};
exports.default = feed;
