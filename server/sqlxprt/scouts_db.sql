-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2024 at 05:01 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

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
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `badge_id` int(11) NOT NULL,
  `badge_name` varchar(100) NOT NULL,
  `badge_info` varchar(455) DEFAULT NULL,
  `badge_img` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`badge_id`, `badge_name`, `badge_info`, `badge_img`) VALUES
(2, 'Artistic Badge', 'Fill in after', 'artist.png'),
(3, 'Astronomer Badge', 'Fill in after', 'astronomer.png'),
(4, 'Communication Badge', 'Fill in after', 'communicate.png'),
(5, 'Crafting Badge', 'Fill in after', 'craft.png'),
(6, 'Cycling Badge', 'Fill in after', 'cyclist.png'),
(7, 'DIY Badge', 'Fill in after', 'diy.png');

-- --------------------------------------------------------

--
-- Table structure for table `contactinformation`
--

CREATE TABLE `contactinformation` (
  `contact_id` int(11) NOT NULL,
  `user_fk` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `posted_by` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `gallery_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `gal_img` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `pending` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`gallery_id`, `title`, `content`, `location`, `posted_by`, `gal_img`, `created_at`, `pending`) VALUES
(6, 'te', 'te', 'te', NULL, 'images\\gallery\\image_1716225264554.png', '2024-05-20 17:14:24', 0),
(7, 'Bacon De Kevin', 'THis is a hi', 'Lol meme', NULL, 'images\\gallery\\image_1716225424908.png', '2024-05-20 17:17:04', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(264) NOT NULL,
  `email` varchar(64) NOT NULL,
  `role` tinyint(4) DEFAULT NULL,
  `img_path` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `img_path`) VALUES
(92, 'admin', '$2b$10$z1LK6z8RWuMLum03IW6wF.WF2KfQYVFw4vd7wI1JuusQiqguA1MC2', 'admin@mail.com', 2, NULL),
(93, 'ben', '$2b$10$Kl7p0VR67a0TpVjxujqgFuovLoOQkVgzy6g9VEv3gLiIB1cWvNFvK', 'ben@helper.com', 1, NULL),
(94, 'james', '$2b$10$64CW/dor3v5pgFxMvW5Xou/XzrI3WOw/7HPXSg0SOH6qyz2YOdiI.', 'james@scout.com', 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`badge_id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`gallery_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `badge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `gallery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
