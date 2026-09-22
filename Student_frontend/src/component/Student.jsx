import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInterceptor";

const Student = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        const res = await axiosInstance.get("/api/students");
        setStudents(res.data);
    };

    const handleEdit = (rollNo) => {

        navigate(`/update/${rollNo}`);

    };

    const handleDelete = async (rollNo) => {

        try {

            await axiosInstance.delete(
                `/user/${rollNo}`
            );

            alert("Student Deleted Successfully");

            getStudents();

        } catch (error) {

            console.log(error);

        }

    };
    return (
        <div className="student-container">

            <h2>Student Details</h2>

            <table className="student-table">

                <thead>

                    <tr>
                        <th>Roll No</th>
                        <th>Candidate Name</th>
                        <th>Course</th>
                        <th>Email</th>
                        <th>Marks</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {students.length > 0 ? (

                        students.map((student) => (

                            <tr key={student._id}>

                                <td>{student.rollNo}</td>
                                <td>{student.candidateName}</td>
                                <td>{student.course}</td>
                                <td>{student.email}</td>
                                <td>{student.marks}</td>

                                <td>



                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(student.rollNo)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(student.rollNo)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="6">
                                No Students Registered
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default Student;