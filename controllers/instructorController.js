const courses = require('../model/courses');

const addCourse = async (req, res) => {
  try {
    const {name, imageUrl, price, description} = req.body;

    if (!name || !imageUrl || !price || !description) {
      return res.status(400).json({msg: 'Please fill all fields'});
    }
    const newCourse = new courses({
      name,
      imageUrl,
      price,
      description,
    });
    await newCourse.save();

    return res
        .status(201)
        .json({msg: 'Course added successfully', course: newCourse});
  } catch (error) {
    console.error('Error adding course:', error);
    return res.status(500).json({msg: 'Internal server error'});
  }
};

module.exports = {
  addCourse,
};
