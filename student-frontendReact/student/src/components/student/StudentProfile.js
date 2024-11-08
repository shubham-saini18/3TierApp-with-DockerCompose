import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentProfile = () => {
	const { id } = useParams();
	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		gender: "",
	});

	// Wrapping loadStudent in useCallback to stabilize it as a dependency
	const loadStudent = useCallback(async () => {
		try {
			const result = await axios.get(`http://localhost:8081/students/student/${id}`);
			setStudent(result.data);
		} catch (error) {
			console.error("Error fetching student data:", error);
		}
	}, [id]);

	// Adding loadStudent as a dependency in useEffect
	useEffect(() => {
		loadStudent();
	}, [loadStudent]);

	return (
		<section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>
								<h5 className="my-3">{`${student.firstName} ${student.lastName}`}</h5>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />
								<div className="row">
									<div className="col-sm-3"><h5 className="mb-0">First Name</h5></div>
									<div className="col-sm-9"><p className="text-muted mb-0">{student.firstName}</p></div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3"><h5 className="mb-0">Last Name</h5></div>
									<div className="col-sm-9"><p className="text-muted mb-0">{student.lastName}</p></div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3"><h5 className="mb-0">Email</h5></div>
									<div className="col-sm-9"><p className="text-muted mb-0">{student.email}</p></div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3"><h5 className="mb-0">Gender</h5></div>
									<div className="col-sm-9"><p className="text-muted mb-0">{student.gender}</p></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StudentProfile;
