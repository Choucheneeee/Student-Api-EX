const moong = require('mongoose');
const Joi = require('joi');

// Schema validation with Joi
const schemaValidation = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z]+$/).min(2).max(20).required(),
  age: Joi.number().integer().min(1).max(120).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().required(),
});

// Database URL
const url = 'mongodb://localhost:27017/FacApi';

// Define the Mongoose Schema for Student
const schemaStudent = moong.Schema({
  name: String,
  age: Number,
  email: String,
  phone: Number,
});

const Student = moong.model('student', schemaStudent);

// Connect to MongoDB once at the start of the application
moong.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if connection fails
  });

// Create a new student
exports.postNewStudent = async (name, age, email, phone) => {
  try {
    // Validate input
    await schemaValidation.validateAsync({ name, age, email, phone });

    // Create a new student instance
    const student = new Student({
      name,
      age,
      email,
      phone,
    });

    // Save the student to the database
    const doc = await student.save();
    return doc;
  } catch (error) {
    console.error('Error saving student:', error);
    throw new Error('Error saving student');
  }
};

// Get all students
exports.getStudents = async () => {
  try {
    const students = await Student.find();
    return students;
  } catch (err) {
    console.error('Error fetching students:', err);
    throw new Error('Error fetching students');
  }
};

// Get a single student by ID
exports.getOneStudent = async (id) => {
  try {
    const student = await Student.findOne({ _id: id });
    return student;
  } catch (err) {
    console.error('Error fetching one student:', err);
    throw new Error('Error fetching one student');
  }
};

// Delete a student by ID
exports.deleteOneStudent = async (id) => {
  try {
    const result = await Student.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      return 'Student Deleted Successfully';
    } else {
      throw new Error('No student found with the given ID');
    }
  } catch (error) {
    console.error('Error during delete operation:', error);
    throw new Error('Error deleting student');
  }
};

// Update a student by ID
exports.updateOneStudent = async (id, name, age, email, phone) => {
  try {
    const updatedStudent = await Student.updateOne(
      { _id: id },
      { name, age, email, phone }
    );
    if (updatedStudent.nModified > 0) {
      // Fetch the updated student
      const student = await Student.findOne({ _id: id });
      return student;
    } else {
      throw new Error('No student found to update');
    }
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Error updating student');
  }
};
