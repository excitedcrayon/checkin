-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2025 at 02:52 PM
-- Server version: 8.0.26
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testingcheckin`
--

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `middlename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `gender` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `fellowshipgroup` enum('Mens Fellowship','Ladies Fellowship','Youth Fellowship','Early Youth Fellowship') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Mens Fellowship',
  `category` enum('Minister','Steward','Elderly','Men and Women','Youth') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Youth',
  `department` enum('Ushering','Security','Catering','Media','Decor','Other','None') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'None',
  `region` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` text COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `passportnumber` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `placeofstay` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `qrcodeid` text COLLATE utf8mb4_general_ci NOT NULL,
  `qrcodename` text COLLATE utf8mb4_general_ci NOT NULL,
  `qrcode` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dateregistered` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','disabled') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'active'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `firstname`, `middlename`, `lastname`, `gender`, `fellowshipgroup`, `category`, `department`, `region`, `email`, `phone`, `passportnumber`, `placeofstay`, `qrcodeid`, `qrcodename`, `qrcode`, `dateregistered`, `status`) VALUES
(1, 'O\'Brien', '', 'Mungofa', 'Male', 'Youth Fellowship', 'Youth', 'None', 'Africa', 'obrienmungofa@email.com', '+26300847473', 'FNB095847', 'Joburg', 'OBrienMungofa1736344115984', '1736344115999-OBrien-Mungofa.png', 'res/codes/1736344115999-OBrien-Mungofa.png', '2025-01-08 23:48:37', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
