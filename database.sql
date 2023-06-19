CREATE DATABASE users;

USE users;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    address VARCHAR(255),
    plan_details VARCHAR(255),
    plan_validity DATE,
    starting_point VARCHAR(255),
    destination_point VARCHAR(255)
);

INSERT INTO students (name, username, password, address, plan_details, plan_validity, starting_point, destination_point)
VALUES ('Athul Santhosh E N', 'athul', '1234', '123 Main Street', 'Basic Plan', '2023-06-30', 'Punnol', 'Nyannar Road'),
	   ('Ashwin T','ashwin','0000','ABC Main Street','Basic Plan','2023-07-05','Mambaram','Nayannar Road');

SELECT * FROM students;