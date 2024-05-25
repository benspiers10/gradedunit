-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2024 at 05:05 PM
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
-- Table structure for table `contact_information`
--

CREATE TABLE `contact_information` (
  `contact_id` int(11) NOT NULL,
  `user_fk` int(11) DEFAULT NULL,
  `firstname` varchar(60) DEFAULT NULL,
  `surname` varchar(60) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_information`
--

INSERT INTO `contact_information` (`contact_id`, `user_fk`, `firstname`, `surname`, `address`, `phone`) VALUES
(1, 1, 'Neb', 'Spook', '123 bullshitlane', '123455678'),
(2, 8, 'Sam', 'Mck', '123 Address', '1234786');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `eve_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `title`, `content`, `location`, `eve_img`) VALUES
(1, 'Event 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis, turpis sed viverra tempor, tellus elit gravida arcu, eget vestibulum est est ut ex. Duis id tincidunt sem. Aliquam ultrices leo ut est vestibulum rutrum. Nulla urna ipsum, dignissim ac pellentesque in, facilisis quis tortor. Ut at quam sagittis libero posuere cursus. Sed molestie tortor at risus vehicula, eget laoreet justo laoreet. Fusce turpis lacus, fermentum vitae neque id, lobortis aliquam dolor. Fusce tempor nec nulla sit amet sodales. Fusce eget lacinia neque.  Nulla nec enim ac justo pulvinar lacinia. Quisque consequat, lacus sed dignissim sagittis, eros elit imperdiet sem, eget vulputate ex lectus et urna. Aliquam posuere consectetur erat, at tristique arcu bibendum non. Morbi et rhoncus ex, a pellentesque lacus. Vivamus ullamcorper pulvinar sem, vel vestibulum nisi mollis ac. Integer laoreet massa nulla, sit amet cursus ipsum blandit sed. Nunc ullamcorper vulputate lectus non scelerisque. Nullam non turpis in dui hendrerit porta.', 'Karrigan Lodge, DE', 'images\\events\\image_1716475124867.jpg'),
(2, 'Event 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis, turpis sed viverra tempor, tellus elit gravida arcu, eget vestibulum est est ut ex. Duis id tincidunt sem. Aliquam ultrices leo ut est vestibulum rutrum. Nulla urna ipsum, dignissim ac pellentesque in, facilisis quis tortor. Ut at quam sagittis libero posuere cursus. Sed molestie tortor at risus vehicula, eget laoreet justo laoreet. Fusce turpis lacus, fermentum vitae neque id, lobortis aliquam dolor. Fusce tempor nec nulla sit amet sodales. Fusce eget lacinia neque.\r\n\r\nNulla nec enim ac justo pulvinar lacinia. Quisque consequat, lacus sed dignissim sagittis, eros elit imperdiet sem, eget vulputate ex lectus et urna. Aliquam posuere consectetur erat, at tristique arcu bibendum non. Morbi et rhoncus ex, a pellentesque lacus. Vivamus ullamcorper pulvinar sem, vel vestibulum nisi mollis ac. Integer laoreet massa nulla, sit amet cursus ipsum blandit sed. Nunc ullamcorper vulputate lectus non scelerisque. Nullam non turpis in dui hendrerit porta.', 'Dunskey Castle, SCO', 'images\\events\\eventImage_1716476157549.jpg');

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
-- Table structure for table `helper_availability`
--

CREATE TABLE `helper_availability` (
  `availability_id` int(11) NOT NULL,
  `helper_id` int(11) DEFAULT NULL,
  `available_day` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `helper_availability`
--

INSERT INTO `helper_availability` (`availability_id`, `helper_id`, `available_day`) VALUES
(35, 2, 'Tuesday'),
(36, 2, 'Wednesday'),
(37, 2, 'Friday'),
(38, 2, 'Saturday'),
(39, 3, 'Tuesday'),
(40, 3, 'Monday');

-- --------------------------------------------------------

--
-- Table structure for table `helper_registration_requests`
--

CREATE TABLE `helper_registration_requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','approved','denied') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `helper_registration_requests`
--

INSERT INTO `helper_registration_requests` (`id`, `user_id`, `created_at`, `status`) VALUES
(2, 5, '2024-05-23 18:51:19', 'approved'),
(3, 9, '2024-05-23 19:01:23', 'denied');

-- --------------------------------------------------------

--
-- Table structure for table `training_applications`
--

CREATE TABLE `training_applications` (
  `application_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `training_type` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training_applications`
--

INSERT INTO `training_applications` (`application_id`, `user_id`, `training_type`, `status`) VALUES
(2, 2, 'Helper Training', 'approved'),
(3, 2, 'Scouts Badge', 'Training');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `training_status` enum('not_applicable','training','trained') DEFAULT 'not_applicable'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `img_path`, `training_status`) VALUES
(1, 'admin', 'admin@admin.com', '$2b$10$O9QS2GfcEyiop7G/EdoyBuzAmzzBqzwIciBqZJVGBoPjcR9huVxay', 3, 'images\\profileimg\\profileImage_1716578890790.jpg', 'not_applicable'),
(2, 'ben', 'ben@helper.com', '$2b$10$thEMByfEhl6OtO2aUgIrw.dzf4iRrrdBn2uVlclfDbkOpqOrt0hwa', 2, 'images\\profileimg\\profileImage_1716479285546.png', 'trained'),
(3, 'robbie', 'robbie@helper.com', '$2b$10$GHxh.fqT6k9Mt5zcoqedYey17UDLucyuBWK54nLaDMT9WlBtGvRRy', 2, NULL, 'not_applicable'),
(4, 'craig', 'craig@helper.com', '$2b$10$3lUdNhP3bjt2SqfETLsUP.8VtgjYbELychT9MENpqhaErMyJd/u2i', 2, NULL, 'not_applicable'),
(5, 'hamish', 'hamish@scout.com', '$2b$10$qfp/wuQMVmjSzKH0CG/VPOkVx8qWrfyjaBYn3h0Z1nAUwhcFbdyk.', 2, NULL, 'not_applicable'),
(6, 'jonas', 'jonas@scout.com', '$2b$10$YCiGfWQHsW3YTHO/uXjF..Koq4lVMtOSHEA.l/icPG.h2XiCoI8sW', 1, NULL, 'not_applicable'),
(7, 'jeff', 'jeff@scout.com', '$2b$10$tVtqjMeUpgOFE6pGreiypu8MIxfSUgch.NI57/B3yLtDtJYR7VbnO', 0, NULL, 'not_applicable'),
(8, 'sam', 'sam@scout.com', '$2b$10$gEYXgCEsfOoz55HPqt4NsOAdfVJtHj1h4TbLax82NrytQ8rOS2muO', 0, 'images\\profileimg\\profileImage_1716581811012.jpg', 'not_applicable'),
(9, 'jammin', 'jamming123', '$2b$10$GiX5Exx1wQ7vHCPcMzZa5OjElq8Qlm568ee4ggqWKpc7qHYpTF0yS', 1, NULL, 'not_applicable');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`badge_id`);

--
-- Indexes for table `contact_information`
--
ALTER TABLE `contact_information`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `user_fk` (`user_fk`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD UNIQUE KEY `event_id` (`event_id`),
  ADD UNIQUE KEY `event_id_2` (`event_id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`gallery_id`);

--
-- Indexes for table `helper_availability`
--
ALTER TABLE `helper_availability`
  ADD PRIMARY KEY (`availability_id`),
  ADD KEY `fk_helper_id` (`helper_id`);

--
-- Indexes for table `helper_registration_requests`
--
ALTER TABLE `helper_registration_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `training_applications`
--
ALTER TABLE `training_applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `badge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `contact_information`
--
ALTER TABLE `contact_information`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `gallery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `helper_availability`
--
ALTER TABLE `helper_availability`
  MODIFY `availability_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `helper_registration_requests`
--
ALTER TABLE `helper_registration_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `training_applications`
--
ALTER TABLE `training_applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact_information`
--
ALTER TABLE `contact_information`
  ADD CONSTRAINT `contact_information_ibfk_1` FOREIGN KEY (`user_fk`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `helper_availability`
--
ALTER TABLE `helper_availability`
  ADD CONSTRAINT `fk_helper_id` FOREIGN KEY (`helper_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `helper_registration_requests`
--
ALTER TABLE `helper_registration_requests`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `training_applications`
--
ALTER TABLE `training_applications`
  ADD CONSTRAINT `training_applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
