import passport from "passport"
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { Request, Response } from "express";

let feed = {
    createRecipe: async(req:Express.Request, res:Express.Response) => {
        console.log('hey does this work')
        console.log(req,12)
        // const newRecipe = {
        //     id: req,
        //     image:{type: String, required: true},
        //     ingridentList:{type: String, required: true},
        //     levelOfMeal: {type: String, required: true},
        //     prepTime: {type:  Number, required: true},
        // }
    },
    commentRecipe: async(req:Express.Request, res:Express.Response) => {
        console.log('hey does this comment stuff work')
    }
}
export default feed