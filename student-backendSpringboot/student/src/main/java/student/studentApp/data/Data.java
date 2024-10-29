package student.studentApp.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import student.studentApp.entity.Student;

public interface Data extends JpaRepository<Student , Long> {
	Optional<Student> findByEmail(String email);
}
