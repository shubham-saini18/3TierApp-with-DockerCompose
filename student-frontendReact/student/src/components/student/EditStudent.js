import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
	let navigate = useNavigate();
	const { id } = useParams();

	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		gender: "",
	});
	const { firstName, lastName, email, gender } = student;

	useEffect(() => {
		loadStudent();
	}, []);

	const loadStudent = async () => {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}/students/student/${id}`
			);
			setStudent(result.data);
		} catch (error) {
			console.error("Error loading student data:", error);
		}
	};

	const handleInputChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		});
	};

	const updateStudent = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				`${process.env.REACT_APP_BACKEND_URL}/students/update/${id}`,
				student
			);
			navigate("/view-students");
		} catch (error) {
			console.error("Error updating student:", error);
		}
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit Student</h2>
			<form onSubmit={(e) => updateStudent(e)}>
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

export default EditStudent;
