import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './AddStudent.css';

const AddStudent = () => {
	const navigate = useNavigate();
	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		gender: "",
	});
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setStudent((prev) => ({ ...prev, [name]: value }));
	};

	const saveStudent = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/students`, student);
			navigate("/view-students");
		} catch (error) {
			console.error("Error saving student:", error);
			setError("Failed to save student. Please try again.");
		}
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5">Add Student</h2>
			{error && <p className="text-danger">{error}</p>}
			<form onSubmit={saveStudent}>
				<div className="input-group mb-3">
					<label className="input-group-text" htmlFor="firstName">First Name</label>
					<input
						className="form-control"
						type="text"
						name="firstName"
						id="firstName"
						required
						value={student.firstName}
						onChange={handleInputChange}
						aria-label="First Name"
					/>
				</div>

				<div className="input-group mb-3">
					<label className="input-group-text" htmlFor="lastName">Last Name</label>
					<input
						className="form-control"
						type="text"
						name="lastName"
						id="lastName"
						required
						value={student.lastName}
						onChange={handleInputChange}
						aria-label="Last Name"
					/>
				</div>

				<div className="input-group mb-3">
					<label className="input-group-text" htmlFor="gender">Gender</label>
					<select
						className="form-select"
						name="gender"
						id="gender"
						required
						value={student.gender}
						onChange={handleInputChange}
						aria-label="Gender"
					>
						<option value="">Select Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</div>

				<div className="input-group mb-3">
					<label className="input-group-text" htmlFor="email">Your Email</label>
					<input
						className="form-control"
						type="email"
						name="email"
						id="email"
						required
						value={student.email}
						onChange={handleInputChange}
						aria-label="Email"
					/>
				</div>

				<div className="row mb-3">
					<div className="col-sm-2">
						<button type="submit" className="btn btn-outline-success btn-lg">Save</button>
					</div>
					<div className="col-sm-2">
						<Link to="/view-students" className="btn btn-outline-warning btn-lg">Cancel</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddStudent;
