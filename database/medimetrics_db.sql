-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2024 at 02:27 PM
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
  `dr_specialization` int(20) NOT NULL,
  `dr_photo` varchar(255) NOT NULL,
  `dr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`dr_name`, `dr_age`, `dr_area`, `dr_specialization`, `dr_photo`, `dr_id`) VALUES
('asdf', 21, 'kjhgf', 0, 'uploads/IMG20231015131306.jpg', 1);

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
(6, 'afgdag', 32, 'dagr', 'advdga', '3r432', 'uploads/Screenshot 2024-10-07 033159.png'),
(7, 'afgdag', 21, 'geragre', 'dsfahb', '23456', 'uploads/Screenshot 2024-10-07 002851.png'),
(8, 'Avdhut Rokde', 19, 'Dombivli ', 'avdhut', 'shitdhut', 'uploads/Screenshot 2024-10-09 022833.png'),
(9, 'help', 321, 'fds', 'fdsa', 'fdsa', 'uploads/pexels-mizunokozuki-13801535.jpg'),
(10, 'wef', 21, 'fef', 'rfqfq', 'gfds', 'uploads/pexels-mizunokozuki-13801535.jpg'),
(12, 'uwrehguoh', 72, 'akjdhfg', 'aiohgo', '1234', 'uploads/IMG20231015131306.jpg'),
(13, 'tew', 21, 'qwerty', 'asdfg', 'asdfg', 'uploads/IMG_20230922_092802.jpg'),
(14, 'gfds', 21, 'jhgfd', 'hgf', '12', 'uploads/IMG20231015131306.jpg');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `dr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
