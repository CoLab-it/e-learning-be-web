/* eslint-disable valid-jsdoc */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const secretkey = process.env.SECRET_KEY;
const User = require('../model/users');
const Course = require('../model/courses');
const userProfile = require('../model/userProfile');

/**
 - Function to  create a new user in the database.
    - body {@param Object}
    - @returns  {Promise<Object>} returns a promise
*/
const signupuser = async (req, res) => {
  try {
    const {username, useremail, userphone, userpass} = req.body;
    const existinguser = await User.findOne({
      email: useremail,
      phonenumber: userphone,
    });
    const emailuse = await User.findOne({email: useremail});
    const phonenumberuse = await User.findOne({phonenumber: userphone});
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
      const newUser = new User({
        name: username,
        email: useremail,
        phonenumber: userphone,
        password: bcryptpassword,
      });
      const suc = await newUser.save();
      if (suc) {
        const token = jwt.sign(
            {userid: newUser._id, email: newUser.email, type: newUser.type},
            secretkey,
            {expiresIn: '1d'},
        );
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
    const existinguser = await User.findOne({email: useremail});
    if (existinguser) {
      bcrypt.compare(userpass, existinguser.password, function(err, result) {
        if (err) {
          console.log(err);
          throw err;
        } else if (result) {
          const token = jwt.sign(
              {
                userid: existinguser._id,
                email: existinguser.email,
                type: existinguser.type,
              },
              secretkey,
              {expiresIn: '1d'},
          );
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

const getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({courses});
  } catch (err) {
    res.json({message: 'Error Occurred when getting courses', err});
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const id = req.params.courseId;
    const course = await Course.findById(id);
    res.json({course});
  } catch (err) {
    res.json({message: 'Error Occurred when getting course details', err});
  }
};

const getUserProfile = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.token.userid);
  try {
    const user = await User.aggregate([
      {$match: {_id: id}},
      {
        $lookup: {
          from: 'userprofiles',
          localField: '_id',
          foreignField: 'userId',
          as: 'userProfile',
        },
      },
    ]);
    res.json({user});
  } catch (err) {
    res.json({message: 'Error Occurred when getting user profile', err});
  }
};

const saveUserProfile = async (req, res) => {
  try {
    const userId = req.token.userid;
    const {username, email, number, address} = req.body;

    await User.updateOne(
        {_id: userId},
        {
          $set: {
            name: username,
            email,
            phonenumber: number,
          },
        },
        {upsert: true},
    );

    await userProfile.updateOne(
        {userId},
        {
          $set: {
            address,
          },
        },
        {upsert: true},
    );

    if (req.file) {
      const file = req?.file?.location;
      await userProfile.updateOne(
          {userId},
          {
            $set: {
              imageUrl: file,
            },
          },
      );
    }

    res.status(200).json({message: 'User profile saved successfully.'});
  } catch (error) {
    console.error('Error saving user profile:', error);
    res
        .status(500)
        .json({message: 'Error saving user profile. Please try again later.'});
  }
};

module.exports = {
  loginuser,
  signupuser,
  getCourse,
  getCourseDetails,
  saveUserProfile,
  getUserProfile,
};
