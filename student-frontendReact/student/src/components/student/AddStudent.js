import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
	let navigate = useNavigate();
	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		gender: "",
	});

	const { firstName, lastName, gender, email } = student;

	const handleInputChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		});
	};

	const saveStudent = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/students`, student);
			navigate("/view-students");
		} catch (error) {
			console.error("Error saving student:", error);
			// Optionally handle error, e.g., display an alert
		}
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Add Student</h2>
			<form onSubmit={saveStudent}>
				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="firstName">
						First Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="firstName"
						id="firstName"
						required
						value={firstName}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="lastName">
						Last Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="lastName"
						id="lastName"
						required
						value={lastName}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="gender">
						Gender
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="gender"
						id="gender"
						required
						value={gender}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="email">
						Your Email
					</label>
					<input
						className="form-control col-sm-6"
						type="email"
						name="email"
						id="email"
						required
						value={email}
						onChange={handleInputChange}
					/>
				</div>

				<div className="row mb-5">
					<div className="col-sm-2">
						<button
							type="submit"
							className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link
							to={"/view-students"}
							className="btn btn-outline-warning btn-lg">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddStudent;
