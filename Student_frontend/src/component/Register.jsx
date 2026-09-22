import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../axiosInterceptor";
const Register = () => {

    const [student, setStudent] = useState({
        rollNo: "",
        candidateName: "",
        course: "",
        email: "",
        marks: "",
        password: "",
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axiosInstance.post(
                "/api/register",
                student
            );

            alert(response.data.message);

            setStudent({
                rollNo: "",
                candidateName: "",
                course: "",
                email: "",
                marks: "",
                password: "",
            });

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Registration Failed");
            }

        }
    };


    
    return (
        <div className="form-container">

            <form onSubmit={handleSubmit}>

                <h2>Student Registration</h2>

                <input
                    type="number"
                    name="rollNo"
                    placeholder="Roll Number"
                    value={student.rollNo}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="candidateName"
                    placeholder="Candidate Name"
                    value={student.candidateName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={student.course}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="marks"
                    placeholder="Marks"
                    value={student.marks}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={student.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>

            </form>

        </div>
    );
};

export default Register;