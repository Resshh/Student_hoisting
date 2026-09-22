const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.use(express.json());

function verifyToken(req, res, next) {
  let token = req.header.token;
  try {
    if (!token) throw ("Unauthorized request");
    else {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (!payload) throw ("Unauthorized request");
      next();
    }
  } catch (err) {
    console.log(err);
  }
}


router.post("/register", async (req, res) => {
  try {
    const { rollNo, candidateName, course, email, marks, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new userModel({
      rollNo,
      candidateName,
      course,
      email,
      marks,
      password: hashedPassword,
    });

    await student.save();

    const studentResponse = {
      _id: student._id,
      rollNo: student.rollNo,
      candidateName: student.candidateName,
      course: student.course,
      email: student.email,
      marks: student.marks,
    };

    res.status(201).json({
      message: "Student Registered Successfully",
      student: studentResponse,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});



router.post("/login",async (req, res) => {
  try {
    const { email, password } = req.body;


    const student = await userModel.findOne({ email });

    if (!student) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const payload = {
      id: student._id,
      email: student.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const studentResponse = {
      _id: student._id,
      rollNo: student.rollNo,
      candidateName: student.candidateName,
      course: student.course,
      email: student.email,
      marks: student.marks,
    };

    res.status(200).json({
      message: "Login Successful",
      token,
      student: studentResponse,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});



router.get("/", verifyToken, async (req, res) => {
  try {
    const students = await userModel.find();

    // Remove password from every student
    const studentResponse = students.map((student) => {
      const studentObject = student.toObject();
      delete studentObject.password;
      return studentObject;
    });

    res.status(200).json(studentResponse);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});



router.get("/:rollno", verifyToken, async (req, res) => {
  try {
    const student = await userModel.findOne({
      rollNo: req.params.rollno,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }


    const studentResponse = student.toObject();
    delete studentResponse.password;

    res.status(200).json(studentResponse);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});




router.put("/:rollno", verifyToken, async (req, res) => {
  try {
    const { password, ...otherData } = req.body;

    // Data to update
    const updateData = {
      ...otherData,
    };



    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedStudent = await userModel.findOneAndUpdate(
      { rollNo: req.params.rollno },
      updateData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }


    const studentResponse = updatedStudent.toObject();
    delete studentResponse.password;

    res.status(200).json({
      message: "Student Updated Successfully",
      updatedStudent: studentResponse,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});



router.delete("/:rollno", verifyToken, async (req, res) => {
  try {
    const deletedStudent = await userModel.findOneAndDelete({
      rollNo: req.params.rollno,
    });

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      message: "Student Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


module.exports = router;