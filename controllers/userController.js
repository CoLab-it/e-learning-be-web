/* eslint-disable valid-jsdoc */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretkey= process.env.SECRET_KEY;
const user= require('../model/users');

module.exports={
/**
 - Function to  create a new user in the database.
    - body {@param Object}
    - @returns  {Promise<Object>} returns a promise
*/
  signupuser: async (req, res) =>{
    try {
      const {username, useremail, userphone, userpass}= req.body;
      const existinguser= await user.findOne({
        email: useremail, phonenumber: userphone,
      });
      const emailuse= await user.findOne({email: useremail});
      const phonenumberuse= await user.findOne({phonenumber: userphone});
      if (existinguser) {
        return res.status(201).json({message: 'User already exists'});
      } else if (emailuse) {
        return res.status(201).json({message: 'email already used'});
      } else if (phonenumberuse) {
        return res.status(201).json({message: 'phonenumber already used'});
      } else {
        const bcryptpassword = await bcrypt.hash(userpass, 10);
        const newUser= new user({
          name: username,
          email: useremail,
          phonenumber: userphone,
          password: bcryptpassword,
        });
        const suc = await newUser.save();
        if (suc) {
          const token = jwt.sign({userid: newUser._id, email: newUser.email},
              secretkey, {expiresIn: '1h'});
          return res.status(201).json({
            message: 'user succesfully signed up',
            token,
          });
        } else {
          return res.status(401).json({message: 'adding user  failed'});
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({message: 'user sign up  failed'});
    }
  },

};


