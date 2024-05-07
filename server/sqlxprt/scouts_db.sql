-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2024 at 08:56 PM
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
-- Database: `scouts_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(264) NOT NULL,
  `email` varchar(64) NOT NULL,
  `helper` tinyint(4) DEFAULT NULL,
  `is_admin` int(11) NOT NULL,
  `img_path` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `helper`, `is_admin`, `img_path`) VALUES
(14, 'admin', '$2y$10$bihFWrC8SLISdric/zq8lecnOKhO908Dkn8Hh43SZQ4bRmJ/h2yyC', 'admin@email.com', 1, 1, NULL),
(36, 'karen', '$2y$10$Nz00s6i686VAYUrgYYGxYunOyJcNEjEaFdAaglSpFo2OpBT5FKIDu', 'karen@email.com', 0, 0, 'theatreiconlight.png'),
(38, 'paul', '$2y$10$o300/7Wb2UoC7BUtAEI4EONA6BPJyBHlXiIb1GVHeHoBdUSZZHEV6', 'karen@email.com', 0, 0, 'user6.png'),
(39, 'treacle', '$2y$10$L7aLXRyuF1bXJAGaOn4Epu8EiRRSUErIy16KqFCnG7SZkaFkGh2ii', 'treacle@email.com', 1, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
