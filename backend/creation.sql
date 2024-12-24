-- Table for Department
CREATE TABLE Department (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

-- Table for Faculty
CREATE TABLE Faculty (
    faculty_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

-- Table for course
CREATE TABLE course (
    course_id INT PRIMARY KEY,       
    course_name VARCHAR(255) NOT NULL
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);


-- Table for Class
CREATE TABLE Class (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    class_name VARCHAR(255) NOT NULL,
    department_id INT,
    year INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

-- Table for Student
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES Class(class_id)
);

-- Table for Faculty-course Assignment
CREATE TABLE Faculty_course_Assigned (
    faculty_id INT,
    course_id INT,
    PRIMARY KEY (faculty_id, course_id),
    FOREIGN KEY (faculty_id) REFERENCES Faculty(faculty_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),

);

-- Table for Schedule
CREATE TABLE Schedule (
    schedule_id INT PRIMARY KEY,
    hour INT NOT NULL,
    day_order INT NOT NULL,
    class_id INT,
    faculty_id INT,
    course_id INT,
    FOREIGN KEY (class_id) REFERENCES Class(class_id),
    FOREIGN KEY (faculty_id) REFERENCES Faculty(faculty_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);



-- Table for course Enrollment
CREATE TABLE course_Enrolled (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);
CREATE TABLE course_to_class (
    course_id INT,
    class_id INT,
    PRIMARY KEY (course_id, class_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (class_id) REFERENCES class(class_id)
);
    
-- Table for Attendance
CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY,
    hour INT NOT NULL,
    day_order INT NOT NULL,
    date DATE NOT NULL,
    student_id INT,
    attendance_status BOOLEAN NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student(student_id)
);
