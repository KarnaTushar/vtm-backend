-- Create the database
CREATE DATABASE vehicle_management;
USE vehicle_management;

-- Create the driver table
CREATE TABLE driver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    profile_photo VARCHAR(255)
);

-- Create the vehicle table
CREATE TABLE vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicleNumber VARCHAR(20) UNIQUE NOT NULL,
    vehicleType VARCHAR(50) NOT NULL,
    puc_certificate VARCHAR(255),
    insurance_certificate VARCHAR(255)
);