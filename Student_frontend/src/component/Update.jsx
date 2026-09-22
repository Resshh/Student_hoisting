import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInterceptor";
const Update = () => {

    const { rollno } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        rollNo: "",
        candidateName: "",
        course: "",
        email: "",
        marks: "",
        password: "",
    });

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = async () => {
        try {

            const res = await axiosInstance.get(
                `/user/${rollno}`
            );

            setStudent(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axiosInstance.put(
                `/user/${rollno}`,
                student
            );

            alert(res.data.message);

            navigate("/student");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="form-container">

            <form onSubmit={handleSubmit}>

                <h2>Update Student</h2>

                <input
                    type="number"
                    name="rollNo"
                    value={student.rollNo}
                    onChange={handleChange}
                    placeholder="Roll Number"
                    required
                />

                <input
                    type="text"
                    name="candidateName"
                    value={student.candidateName}
                    onChange={handleChange}
                    placeholder="Candidate Name"
                    required
                />

                <input
                    type="text"
                    name="course"
                    value={student.course}
                    onChange={handleChange}
                    placeholder="Course"
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />

                <input
                    type="number"
                    name="marks"
                    value={student.marks}
                    onChange={handleChange}
                    placeholder="Marks"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={student.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <button type="submit">
                    Update
                </button>

            </form>

        </div>

    );

};

export default Update;