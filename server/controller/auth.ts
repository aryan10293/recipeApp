import passport from "passport"
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../model/user";
let auth = {
    postCreateAccount: (req, res, next) => {
      console.log(req.body)
        //const validationErrors = [];
        interface Message {
            msg: string;
        }
        const validationErrors: Message[] = [];
    
        const validEmail: Message = {
             msg: "Please enter a valid email address." 
        }
        const passwordLength: Message = {
            msg: "Password must be at least 8 characters long",
        }
        const correctPassword: Message = {
            msg: "Passwords do not match" 
        }
        if (!validator.isEmail(req.body.email))
          validationErrors.push(validEmail);
        if (!validator.isLength(req.body.password, { min: 8 }))
          validationErrors.push(passwordLength);
        if (req.body.password !== req.body.confirmPassword)
          validationErrors.push(correctPassword);
      
        if (validationErrors.length) {
          console.log(validationErrors)
          req.flash("errors", validationErrors);
          //return res.redirect("../");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
          gmail_remove_dots: false,
        });
        const user = new User({
          userName: req.body.username,
          email: req.body.email,
          password: req.body.password,
          lastName: req.body.first,
          firstName: req.body.last,
        });

        User.findOne(
          { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
          (err, existingUser) => {
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
                const token = jwt.sign({ sub: user._id }, process.env.SECRET_KEY as string , { expiresIn: '1h' });
                res.send(
                  { token, newUser: user, status:'200' }
                )
              });
            });
          }
        );
      },
      postLogin: (req,res,next) => {
        interface Message {
            msg: string;
        }
        const validationErrors: Message[] = [];
    
        const validEmail: Message = {
             msg: "Please enter a valid email address." 
        }
        const emptyPassword: Message = {
             msg: "Please enter a valid email address." 
        }
        if (!validator.isEmail(req.body.email))
          validationErrors.push(validEmail);
        if (validator.isEmpty(req.body.password))
          validationErrors.push(emptyPassword);
        if (validationErrors.length) {
          req.flash("errors", validationErrors);
          return res.redirect("/login");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
          gmail_remove_dots: false,
        });
        passport.authenticate("local", (err:any, user:any, info:any) => {
          if (err) {
            console.log(err)
            return next(err);
          }
          if (!user) {

            req.flash("errors", info);
            return res.redirect("/login");
          }
          req.logIn(user, (err) => {
            if (err) {
              console.log(err)
              return next(err);
            }
            req.flash("success", { msg: "Success! You are logged in." });
             const token = jwt.sign({ sub: user._id }, process.env.SECRET_KEY as string , { expiresIn: '1h' })
             res.status(200).send(
                  { token, newUser: user, status:'200' }
                )
          });
        })(req, res, next);
      },
      logout: (req,res) => {
        req.logout(() => {
          console.log('User has logged out.')
        })
        req.session.destroy((err) => {
          if (err)
            console.log("Error : Failed to destroy the session during logout.", err);
          req.user = null;
          res.redirect("/");
        });
      },
      checkUser:  async (req,res) => {
        jwt.verify(req.params.id, process.env.SECRET_KEY as string, async (err, decoded) => {
          if (err) {
            // Token is invalid or expired
            // Handle unauthorized access
            res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
          } else {
            const userId = decoded.sub;
            // Fetch user account data from the database based on userId
            let thisIsAwe = await User.find({_id: userId}) // user info if token is not expired
            res.status(200).json({success: true, message:'lebron james is elite', userinfo: thisIsAwe})
          }
        });
    },
    getUser: async (req,res) => {
      const user = await User.find({_id: req.params.id})
      res.status(200).json({user:user})
    }
}
export default auth