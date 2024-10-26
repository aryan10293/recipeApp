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
const post_1 = __importDefault(require("../model/post"));
let search = {
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let getSearchData;
        const searchText = req.body.searchText;
        const returnData = (data) => {
            if (!data) {
                res.status(400).json({ status: '400', error: 'no users found for that search' });
            }
            else {
                res.status(200).json({ status: '200', data });
            }
        };
        switch (req.body.searchOption) {
            case 'type of chefs':
                getSearchData = yield user_1.default.find({ cookingStyle: { $regex: searchText, $options: "i" } });
                returnData(getSearchData);
                break;
            case 'cooks':
                getSearchData = yield user_1.default.find({ userName: { $regex: searchText, $options: "i" } });
                returnData(getSearchData);
                break;
            case 'meals':
                getSearchData = yield post_1.default.find({
                    '$or': [
                        { nameOfDish: { $regex: searchText, $options: "i" } },
                        { ingridentList: { $regex: searchText, $options: "i" } }
                    ]
                });
                returnData(getSearchData);
                break;
            case 'other':
                const [post, user] = yield Promise.all([
                    post_1.default.find({ steps: { $regex: searchText, $options: "i" } }),
                    user_1.default.find({ bio: { $regex: searchText, $options: "i" } })
                ]);
                getSearchData = [...post, ...user];
                returnData(getSearchData);
        }
    }),
    mealSearch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const conditions = [];
        const searchQuery = {};
        const arr = Object.keys(req.body);
        const cal = Number(req.body.maxCal);
        for (let i = 0; i < arr.length; i++) {
            if (req.body[arr[i]] === false && i > 4) {
                searchQuery[arr[i]] = { $lte: req.body[arr[i]] };
            }
        }
        if (req.body.ingredients.length >= 1) {
            const ingredients = req.body.ingredients.map((ingredient) => ({
                ingridentList: { $regex: new RegExp(ingredient, 'i') }
            }));
            conditions.push({ $and: ingredients });
        }
        if (req.body.ingredientsEx.length >= 1) {
            const ingredientsEx = req.body.ingredientsEx.map((excludeIngredient) => ({
                ingridentList: { $not: { $regex: new RegExp(excludeIngredient, 'i') } }
            }));
            conditions.push({ $and: ingredientsEx });
        }
        if (conditions.length >= 1) {
            searchQuery.$and = conditions;
        }
        try {
            const meals = yield post_1.default.find(searchQuery);
            if (!meals) {
                res.status(400).json({ status: '400', error: 'i have no idea what would be the problem' });
            }
            else {
                res.status(200).json({ status: '200', meals: meals });
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ error: error });
        }
    })
};
exports.default = search;
