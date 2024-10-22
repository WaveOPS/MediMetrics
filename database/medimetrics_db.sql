-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 10:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medimetrics_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `dr_name` varchar(50) NOT NULL,
  `dr_age` int(3) NOT NULL,
  `dr_area` varchar(50) NOT NULL,
  `dr_specialization` varchar(20) NOT NULL,
  `dr_photo` varchar(255) NOT NULL,
  `dr_id` int(11) NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`dr_name`, `dr_age`, `dr_area`, `dr_specialization`, `dr_photo`, `dr_id`, `latitude`, `longitude`) VALUES
('Dr. Om Moholkar', 40, 'Juinagar', 'Cardiologist ', 'uploads/employee1.jpeg', 2, NULL, NULL),
('Dr. Pawan Jamkhande', 32, 'Vashi', 'Orthopedist', 'uploads/employee6.jpeg', 3, NULL, NULL),
('Dr. Shital Prajapati', 32, 'Kamothe', 'Gynaecologist', 'uploads/employee5.jpeg', 6, 51.51624032, -0.10986328),
('Dr. Avdhut Rokade', 32, 'Dombivili', 'Family Physician', 'uploads/employee3.jpeg', 7, 51.51624032, -0.10986328),
('Dr. Shrihari Mane', 32, 'Sion', 'Dermatologist', 'uploads/employee5.jpeg', 8, 51.51624032, -0.10986328),
('Dr. Sharmeen Khan', 32, 'Taloja', 'Child Speacialist ', 'uploads/employee5.jpeg', 9, 51.51624032, -0.10986328);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(3) NOT NULL,
  `area` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `age`, `area`, `username`, `password`, `photo`) VALUES
(3, 'Om Moholkar', 20, 'Juinagar', 'omoholkar', '1234', 'uploads/employee1.jpeg'),
(6, 'Shital Prajapati', 32, 'Kamothe', 'shital', '876', 'uploads/employee5.jpeg'),
(14, 'Avdhut Rokade ', 27, 'Dombivili', 'avdhut@123', '5944', 'uploads/employee2.jpeg\r\n'),
(16, 'Pawan Jamkhande', 26, 'Vashi', 'pawan@123', '234', 'uploads/employee3.jpeg'),
(18, 'Shrihari Mane', 34, 'Sion', 'shri@123', '343', 'uploads/employee1.jpeg'),
(19, 'Deesha Patel', 33, 'Kharghar', 'disha@132', '343', 'uploads/employee5.jpeg'),
(20, 'Mandar Mawale', 44, 'Bandra ', 'mandar@123', '232', 'uploads/employee2.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `tour_plans`
--

CREATE TABLE `tour_plans` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `doctor_list` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`doctor_list`)),
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tour_plans`
--

INSERT INTO `tour_plans` (`id`, `employee_id`, `doctor_list`, `submitted_at`) VALUES
(2, 3, '[{\"dr_area\":\"Kamothe\",\"dr_name\":\"Dr. Shital Prajapati\",\"dr_specialization\":\"Gynaecologist\"},{\"dr_area\":\"Vashi\",\"dr_name\":\"Dr. Pawan Jamkhande\",\"dr_specialization\":\"Orthopedist\"},{\"dr_area\":\"Taloja\",\"dr_name\":\"Dr. Sharmeen Khan\",\"dr_specialization\":\"Child Speacialist \"}]', '2024-10-22 19:58:56'),
(3, 6, '[{\"dr_area\":\"Juinagar\",\"dr_name\":\"Dr. Om Moholkar\",\"dr_specialization\":\"Cardiologist \"},{\"dr_area\":\"Sion\",\"dr_name\":\"Dr. Shrihari Mane\",\"dr_specialization\":\"Dermatologist\"},{\"dr_area\":\"Dombivili\",\"dr_name\":\"Dr. Avdhut Rokade\",\"dr_specialization\":\"Family Physician\"},{\"dr_area\":\"Vashi\",\"dr_name\":\"Dr. Pawan Jamkhande\",\"dr_specialization\":\"Orthopedist\"}]', '2024-10-22 19:59:49'),
(4, 14, '[{\"dr_area\":\"Vashi\",\"dr_name\":\"Dr. Pawan Jamkhande\",\"dr_specialization\":\"Orthopedist\"},{\"dr_area\":\"Taloja\",\"dr_name\":\"Dr. Sharmeen Khan\",\"dr_specialization\":\"Child Speacialist \"},{\"dr_area\":\"Kamothe\",\"dr_name\":\"Dr. Shital Prajapati\",\"dr_specialization\":\"Gynaecologist\"}]', '2024-10-22 20:00:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`dr_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tour_plans`
--
ALTER TABLE `tour_plans`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `dr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tour_plans`
--
ALTER TABLE `tour_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
