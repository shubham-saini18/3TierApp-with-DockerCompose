import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";

const StudentsView = () => {
	const [students, setStudents] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		loadStudents();
	}, []);

	const loadStudents = async () => {
		try {
			const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/students`);
			console.log("Fetched students:", result.data); // Log the fetched data
			setStudents(result.data);
		} catch (error) {
			console.error("Error fetching students:", error);
			if (error.response) {
				console.error("Server responded with status:", error.response.status);
				console.error("Response data:", error.response.data);
			}
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this student?")) {
			await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/students/delete/${id}`);
			loadStudents();
		}
	};

	return (
		<section>
			<Search search={search} setSearch={setSearch} />
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Gender</th>
						<th>Email</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{students.length === 0 ? (
						<tr>
							<td colSpan="6">No students found.</td>
						</tr>
					) : (
						students
							.filter((st) => st.firstName && st.firstName.toLowerCase().includes(search.toLowerCase()))
							.map((student, index) => (
								<tr key={student.id}>
									<th scope="row">{index + 1}</th>
									<td>{student.firstName || 'N/A'}</td>
									<td>{student.lastName || 'N/A'}</td>
									<td>{student.gender || 'N/A'}</td>
									<td>{student.email || 'N/A'}</td>
									<td className="mx-2">
										<Link to={`/student-profile/${student.id}`} className="btn btn-info">
											<FaEye />
										</Link>
									</td>
									<td className="mx-2">
										<Link to={`/edit-student/${student.id}`} className="btn btn-warning">
											<FaEdit />
										</Link>
									</td>
									<td className="mx-2">
										<button className="btn btn-danger" onClick={() => handleDelete(student.id)}>
											<FaTrashAlt />
										</button>
									</td>
								</tr>
							))
					)}
				</tbody>
			</table>
		</section>
	);
};

export default StudentsView;
