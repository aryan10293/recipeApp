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
    iHaveNoName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    })
};
exports.default = search;
