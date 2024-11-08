-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2024 at 10:59 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `movie_id`) VALUES
(4, 1, 'tt6964150'),
(5, 1, 'tt1833647'),
(6, 1, 'tt1177167'),
(7, 1, 'tt1510728'),
(8, 1, 'tt3473568'),
(9, 1, 'tt0120737'),
(10, 1, 'tt0368222');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `pass`) VALUES
(1, 'user1', 'empuertojohnellchess@gmail.com', '$2y$10$S2bvZuc2ILhMsWUGjPovB.kzuFbT6k/8SHv9sxQcUjq805STu7xw2'),
(2, 'user2', 'jamesedwardsapanta82@gmail.com', '$2y$10$q/NJgY8tgnHUAMH1x2RuaOC75tGwjEdasWGama95cwd8OqJwutP5u'),
(3, 'user3', 'jamesedwardsapanta823@gmail.com', '$2y$10$Sup1F0XulqzNsCYwR3hhYOnoDVgNrA1yx6xu/XBSnJRbKXbOnthu2'),
(4, 'user5', 'shaneandracamus@sample.com', '$2y$10$H9.ibTDR4VunZqcyXw4yfOz47vjsJ5XvK49TmtB8bhNMYggnOJzbG'),
(5, 'user6', 'empuertojohn@gmail.com', '$2y$10$D5hXcl6sOpYER8E1x42ebuJcACliz9Z9Kr/xw2GbUc.qMB6t3NbI.'),
(6, 'user7', 'empuertojohn4@gmail.com', '$2y$10$LpXYZZHNU0DWmEl0Fke5ZewuEu3n5fCrWfRp9Vt995gy4BjzM4i0q'),
(7, 'user8', 'jamesedwardswapanta82@gmail.com', '$2y$10$IsfLRr7pi/g4GaahAcAsC.M8jO01BFZ8w/oxE/pCN1yarx.qLibtW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
