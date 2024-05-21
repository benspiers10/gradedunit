-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2024 at 11:08 PM
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
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `badge_id` int(11) NOT NULL,
  `badge_name` varchar(100) NOT NULL,
  `badge_info` varchar(455) DEFAULT NULL,
  `badge_img` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`badge_id`, `badge_name`, `badge_info`, `badge_img`) VALUES
(2, 'Artistic Badge', 'To earn the badge as an artist, you need to paint, draw, or illustrate each of the following: a scene from a story, a person or object, and a landscape. Additionally, you must show a selection of your own recent work.', 'artist.png'),
(3, 'Astronomer Badge', 'To earn the badge, explore the night sky\'s mysteries. Understand star patterns, key terms, and the solar system\'s scale. Learn about lunar tides and build a simple telescope for comparison. Identify constellations, read star maps, and distinguish satellites. Teach others these skills for a complete understanding of celestial navigation.', 'astronomer.png'),
(4, 'Communication Badge', 'To earn the badge, log stations, tune a receiver, composing a greeting, understanding radio waves, mastering codes, recognising signs, visiting a station, and knowing equipment rules.', 'communicate.png'),
(5, 'Crafting Badge', 'To earn the badge, create original items with guidance from a leader, investing about six hours. Craft containers, clothing, or decorative pieces using techniques like weaving, sewing, or embroidery. Try decorative techniques like engraving or etching.', 'craft.png'),
(6, 'Cycling Badge', 'Earn the badge by first maintaining a bicycle for six months and mastering essential maintenance tasks. learn safety measures for cycling in dark or wet conditions, basic first aid, and map reading skills. Plan and complete a 40 km all-day ride and optionally demonstrate cycling control or knowledge of the Highway Code.', 'cyclist.png'),
(7, 'DIY Badge', 'To earn the badge, learn safety procedures and electrical circuit isolation. Handle DIY emergencies like sink blockages and leak repairs. Participate in two major DIY projects indoors or outdoors, such as painting or assembling furniture, or undertake similar projects with guidance from an experienced adult.', 'diy.png'),
(8, 'Enviroment Conservation Badge', 'To earn the badge, learn about a local environmental issue, join a conservation project to improve the area, and campaign to raise awareness by writing to local representatives or speaking to community groups.', 'enviromental.png'),
(9, 'Farming Activity Badge', 'To earn the badge, first, learn about local farming practices. Then, choose a farm to explore its organisation and daily operations, noting details about livestock, crops, machinery, and labor. Lastly, find and explain photos showing changes in farming practices over time.', 'farming.png'),
(10, 'Fire Safety Badge', 'To earn the badge, grasp fire safety measures. Know how to respond to home or camp fires, including emergency calls and extinguisher use. Understand combustion, smoke effects, and precautions for household hazards. Recognise the importance of smoke detectors and discuss fire safety plans with family.', 'firesafety.png'),
(11, 'Hobbies Badge', 'To earn the badge, Pursue a new hobby or interest and maintain a record of your activities for at least four months.', 'hobbies.png'),
(12, 'Reading Badge', 'To earn the badge, care for books and e-readers, use a library catalogue, and understand how fiction and non-fiction books are organized. Utilise reference materials for journey planning and demonstrate internet research skills. Discuss reading experiences and obtaining e-books online with your assessor.', 'library.png'),
(13, 'Naturalist Badge', 'To earn the badge, spend a day at a natural location like a woodland, moor, or seashore, observing wildlife and plants. Discuss your findings with an experienced adult, sharing notes, sketches, photos, or maps. Additionally, delve deeper into the study of a specific plant, animal, or aspect of wildlife.', 'nature.png'),
(14, 'Photography Badge', 'To earn the still photography badge, choose between producing 12 photos with different techniques or six black and white photos on a theme. Learn digital camera settings and accessories. Edit your images and address common issues. Lastly, demonstrate camera care.', 'photographer.png');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `badge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
