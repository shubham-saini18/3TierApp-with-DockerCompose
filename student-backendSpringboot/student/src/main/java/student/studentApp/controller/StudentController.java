package student.studentApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import student.studentApp.entity.Student;
import student.studentApp.service.StudentService;

@CrossOrigin("http://frontend:3000")
@RestController
@RequestMapping("/students")
public class StudentController {
    @Value("${cors.allowed.origins}")
    private String allowedOrigins;

    @Autowired
    private StudentService s;

    @CrossOrigin(origins = "${cors.allowed.origins}")
    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        return new ResponseEntity<>(s.getStudents(), HttpStatus.FOUND);
    }

    @CrossOrigin(origins = "${cors.allowed.origins}")
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return s.addStudent(student);
    }

    @CrossOrigin(origins = "${cors.allowed.origins}")
    @PutMapping("/update/{id}")
    public Student updateStudent(@RequestBody Student student, @PathVariable Long id) {
        return s.updateStudent(student, id);
    }

    @CrossOrigin(origins = "${cors.allowed.origins}")
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Long id) {
        s.deleteStudent(id);
    }

    @CrossOrigin(origins = "${cors.allowed.origins}")
    @GetMapping("/student/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return s.getStudentById(id);
    }

}
