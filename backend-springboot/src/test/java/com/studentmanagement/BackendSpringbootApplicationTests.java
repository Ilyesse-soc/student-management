package com.studentmanagement;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.studentmanagement.model.Student;
import com.studentmanagement.repository.StudentRepository;

@SpringBootTest
class BackendSpringbootApplicationTests {
    @Autowired
    private StudentRepository studentRepository;

    @Test
    void contextLoads() {
        assertThat(studentRepository).isNotNull();
    }

    @Test
    void canCreateStudent() {
        Student student = new Student();
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setEmail("john.doe@example.com");
        student.setPhone("0600000000");
        student.setEnrollmentDate(java.time.LocalDate.now());
        Student saved = studentRepository.save(student);
        assertThat(saved.getId()).isNotNull();
    }
}
