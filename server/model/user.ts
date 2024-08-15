import bcrypt from "bcrypt"
import mongoose from "mongoose"
import { Schema, Document } from "mongoose";

interface UserI extends Document{
    userName: string
    firstName: string,
    lastName: string
    email: string
    password: string
    bio: string
    profilePic: string
    savedRecipes: string[]
    skillLevel: string
    followers: string[]
    followings: string[]
    dob: string
    pinnedPost: string[]
    cookingStyle: string
    country: string
    accountAge: string
}
const UserSchema = new Schema<UserI>({
  userName: { type: String, unique: true , required: true},
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, unique: true },
  password: {type: String, required: true},
  bio: {type: String, default: ''},
  profilePic: {type: String,  default: 'https://s-media-cache-ak0.pinimg.com/736x/dd/6f/40/dd6f403a57b73215b5be860bd397ec34.jpg'},
  savedRecipes:{type: Array, default: []},
  skillLevel:{type: String, default: 'Beginner'},
  followers:{type: Array, default: []},
  followings:{type: Array, default: []},
  dob:{type: String, default:''}, 
  pinnedPost:{type: Array, default: []},
  cookingStyle: {type: String, default:'Grill Master'},
  country: {type: String, default: 'Hungary'},
  accountAge: {type: Date, default: Date.now()},

});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model<UserI>('User', UserSchema);
export default User