package student.studentApp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import student.studentApp.data.Data;
import student.studentApp.entity.Student;
import student.studentApp.exception.StudentAlreadyExistsException;
import student.studentApp.exception.StudentNotFoundException;
@Service
public class StudentServiceImpl implements StudentService {
	@Autowired
	private Data data;

	public StudentServiceImpl() {

	}

	@Override
    public List<Student> getStudents() {
        return data.findAll();
    }
    @Override
    public Student addStudent(Student student) {
        if (studentAlreadyExists(student.getEmail())){
            throw  new StudentAlreadyExistsException(student.getEmail()+ " already exists!");
        }
        return data.save(student);
    }


    @Override
    public Student updateStudent(Student student, Long id) {
        return data.findById(id).map(st -> {
            st.setFirstName(student.getFirstName());
            st.setLastName(student.getLastName());
            st.setEmail(student.getEmail());
            st.setGender(student.getGender());
            return data.save(st);
        }).orElseThrow(() -> new StudentNotFoundException("Sorry, this student could not be found"));
    }

    @Override
    public Student getStudentById(Long id) {
        return data.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Sorry, no student found with the Id :" +id));
    }

    @Override
    public void deleteStudent(Long id) {
        if (!data.existsById(id)){
            throw new StudentNotFoundException("Sorry, student not found");
        }
        data.deleteById(id);
    }
    private boolean studentAlreadyExists(String email) {
        return data.findByEmail(email).isPresent();
    }

}
