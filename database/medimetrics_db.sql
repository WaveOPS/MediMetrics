-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2024 at 12:30 PM
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
  `dr_specialization` varchar(255) NOT NULL,
  `dr_photo` varchar(255) NOT NULL,
  `dr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`dr_name`, `dr_age`, `dr_area`, `dr_specialization`, `dr_photo`, `dr_id`) VALUES
('asdf', 21, 'kjhgf', '0', 'uploads/IMG20231015131306.jpg', 1),
('Pawan ', 32, 'Vashi', 'Orthopedic', 'uploads/Screenshot 2024-10-07 033159.png', 2),
('Shital Prajapati', 19, 'Kamothe', 'Gynac', 'uploads/Screenshot 2024-10-07 002851.png', 3),
('Lightning', 21, 'gfdsa', 'gfdswerf', 'uploads/Screenshot 2024-10-07 033159.png', 4),
('Dr. Manjusha Deshmukh', 69, 'Kharghar', 'BrainFucking', 'uploads/Screenshot 2024-10-04 034424.png', 5),
('Dr. Manjusha Deshmukh', 343, 'dagr', '54werfw', 'uploads/Screenshot 2024-10-07 033159.png', 6),
('Dr. Om Moholkar', 20, 'helo', 'hello', 'uploads/Screenshot 2024-10-08 233527.png', 7);

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
(3, 'Om Moholkar', 20, 'Juinagar', 'omoholkar', '1234', 'uploads/Screenshot 2024-10-07 033159.png'),
(4, 'Pawan Jamkhande', 20, 'Vashi', 'pawan', '1234', 'uploads/Screenshot 2024-10-07 002851.png'),
(5, 'Shital Prajapati', 19, 'Kamothe', 'shital', '1234', 'uploads/Screenshot 2024-10-07 033159.png'),
(8, 'Avdhut Rokde', 19, 'Dombivli ', 'avdhut', 'shitdhut', 'uploads/Screenshot 2024-10-09 022833.png'),
(9, 'Om Moholkar', 32, 'gfd', 'gfd', 'gfd', 'uploads/Screenshot 2024-10-07 002851.png'),
(11, 'help om now', 432, 'fds', 'fdsa', 'dsa', 'uploads/Screenshot 2024-10-07 002851.png'),
(12, 'Om Moholkar', 43, 'hgf', 'dsa', 'fdsa', 'uploads/Screenshot 2024-10-08 233802.png'),
(13, 'test2', 32, 'gfdsa', 'fdsa', 'fdsa', 'uploads/Screenshot 2024-10-07 033159.png'),
(14, 'test 3', 23, 'fdsfd', 'fadfds', 'fadsfs', 'uploads/Screenshot 2024-10-07 033159.png'),
(15, 'Raj', 23, 'acdfs', 'sdaf', 'asdf', 'uploads/Screenshot 2024-10-07 002851.png');

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
-- Indexes for dumped tables
--

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`dr_id`),
  ADD UNIQUE KEY `dr_id` (`dr_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tour_plans`
--
ALTER TABLE `tour_plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employee` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `dr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tour_plans`
--
ALTER TABLE `tour_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tour_plans`
--
ALTER TABLE `tour_plans`
  ADD CONSTRAINT `fk_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
