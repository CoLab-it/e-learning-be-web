/* eslint-disable valid-jsdoc */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretkey = process.env.SECRET_KEY;
const user = require('../model/users');
const course = require('../model/courses');

/**
 - Function to  create a new user in the database.
    - body {@param Object}
    - @returns  {Promise<Object>} returns a promise
*/
const signupuser = async (req, res) => {
  try {
    const {username, useremail, userphone, userpass} = req.body;
    const existinguser = await user.findOne({
      email: useremail,
      phonenumber: userphone,
    });
    const emailuse = await user.findOne({email: useremail});
    const phonenumberuse = await user.findOne({phonenumber: userphone});
    if (existinguser) {
      return res.status(201).json({
        success: false,
        message: 'User already exists',
      });
    } else if (emailuse) {
      return res.status(201).json({
        success: false,
        message: 'email already used',
      });
    } else if (phonenumberuse) {
      return res.status(201).json({
        success: false,
        message: 'phonenumber already used',
      });
    } else {
      const bcryptpassword = await bcrypt.hash(userpass, 10);
      const newUser = new user({
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
          success: true,
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
};

/**
 - Function to  login  a user in the system.
    - body {@param Object}
    - @returns  {Promise<Object>} returns a promise
*/
const loginuser = async (req, res) => {
  try {
    const {useremail, userpass} = req.body;
    const existinguser = await user.findOne({email: useremail});
    if (existinguser) {
      bcrypt.compare(userpass, existinguser.password, function(err, result) {
        if (err) {
          console.log(err);
          throw err;
        } else if (result) {
          const token = jwt.sign({
            userid: existinguser._id, email: existinguser.email},
          secretkey,
          {expiresIn: '1h',
          });
          res.status(201).json({
            success: true,
            message: 'login is successful',
            token,
          });
        } else {
          return res.status(201).json({
            success: false,
            message: 'password in correct',
          });
        }
      });
    } else {
      return res.status(201).json({
        success: false,
        message: 'User does not exist!',
      });
    }
  } catch (error) {
    return res.status(401).json({message: 'user login  failed', error});
  }
};

const getCourse = async (req, res)=>{
  const courses = await course.find();
  res.json({courses});
};

module.exports = {
  loginuser,
  signupuser,
  getCourse,
};
