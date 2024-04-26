-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2024 at 11:32 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eksflorasi`
--

-- --------------------------------------------------------

--
-- Table structure for table `action_completed`
--

CREATE TABLE `action_completed` (
  `completed_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `action_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `action_type`
--

CREATE TABLE `action_type` (
  `action_id` int(11) NOT NULL,
  `action_name` varchar(32) NOT NULL,
  `point_value` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `action_type`
--

INSERT INTO `action_type` (`action_id`, `action_name`, `point_value`, `created_at`, `updated_at`) VALUES
(1, 'New Discovery', 50, '2023-06-16 13:48:00', '2023-06-16 13:48:00'),
(2, 'Discovery', 10, '2023-06-16 13:48:00', '2023-06-16 13:48:00'),
(3, 'Update Streak', 0, '2023-06-16 13:48:00', '2023-06-16 13:48:00');

-- --------------------------------------------------------

--
-- Table structure for table `avatar`
--

CREATE TABLE `avatar` (
  `avatar_id` int(11) NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `avatar`
--

INSERT INTO `avatar` (`avatar_id`, `avatar_url`, `created_at`, `updated_at`) VALUES
(1, 'https://storage.googleapis.com/eksflorasi-user-avatar/bunny-avatar.png', '2023-06-16 13:47:53', '2023-06-16 13:47:53'),
(2, 'https://storage.googleapis.com/eksflorasi-user-avatar/dog-avatar.png', '2023-06-16 13:47:53', '2023-06-16 13:47:53'),
(3, 'https://storage.googleapis.com/eksflorasi-user-avatar/hamster-avatar.png', '2023-06-16 13:47:53', '2023-06-16 13:47:53');

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `object_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location_name` varchar(64) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location_name`, `created_at`, `updated_at`) VALUES
(1, 'Aceh', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(2, 'Bali', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(3, 'Bangka Belitung', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(4, 'Banten', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(5, 'Bengkulu', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(6, 'Central Java', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(7, 'Central Kalimantan', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(8, 'Central Papua', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(9, 'Central Sulawesi', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(10, 'East Java', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(11, 'East Kalimantan', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(12, 'East Nusa Tenggara', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(13, 'Gorontalo', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(14, 'Highland Papua', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(15, 'Jakarta', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(16, 'Jambi', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(17, 'Special Region of Yogyakarta', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(18, 'Lampung', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(19, 'Maluku', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(20, 'North Kalimantan', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(21, 'North Maluku', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(22, 'North Sulawesi', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(23, 'North Sumatra', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(24, 'Papua', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(25, 'Riau', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(26, 'Riau Islands', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(27, 'South Kalimantan', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(28, 'South Papua', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(29, 'South Sulawesi', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(30, 'South Sumatra', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(31, 'Southeast Sulawesi', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(32, 'Southwest Papua', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(33, 'West Java', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(34, 'West Kalimantan', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(35, 'West Nusa Tenggara', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(36, 'West Papua', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(37, 'West Sulawesi', '2023-06-16 13:47:45', '2023-06-16 13:47:45'),
(38, 'West Sumatra', '2023-06-16 13:47:45', '2023-06-16 13:47:45');

-- --------------------------------------------------------

--
-- Table structure for table `object`
--

CREATE TABLE `object` (
  `object_id` int(11) NOT NULL,
  `label` varchar(32) NOT NULL,
  `type` varchar(16) NOT NULL,
  `full_picture_url` varchar(255) NOT NULL,
  `mini_picture_url` varchar(255) NOT NULL,
  `name` varchar(64) NOT NULL,
  `latin` varchar(64) NOT NULL,
  `short_desc` text NOT NULL,
  `fun_fact` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tip`
--

CREATE TABLE `tip` (
  `tip_id` int(11) NOT NULL,
  `tip_desc` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tip`
--

INSERT INTO `tip` (`tip_id`, `tip_desc`, `created_at`, `updated_at`) VALUES
(1, 'Please be careful while exploring!', '2023-06-16 13:47:36', '2023-06-16 13:47:36'),
(2, 'Don\'t go to dangerous places!', '2023-06-16 13:47:36', '2023-06-16 13:47:36'),
(3, ':D', '2023-06-16 13:47:36', '2023-06-16 13:47:36'),
(4, 'Meow! Meow Meow :3', '2023-06-16 13:47:36', '2023-06-16 13:47:36'),
(5, 'Remember to drink water!', '2023-06-16 13:47:36', '2023-06-16 13:47:36'),
(6, 'Approach animals carefully!', '2023-06-16 13:47:36', '2023-06-16 13:47:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `streak` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `avatar_id` int(11) NOT NULL DEFAULT 1,
  `location_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action_completed`
--
ALTER TABLE `action_completed`
  ADD PRIMARY KEY (`completed_id`),
  ADD KEY `action_id` (`action_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `action_type`
--
ALTER TABLE `action_type`
  ADD PRIMARY KEY (`action_id`);

--
-- Indexes for table `avatar`
--
ALTER TABLE `avatar`
  ADD PRIMARY KEY (`avatar_id`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`object_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`object_id`);

--
-- Indexes for table `tip`
--
ALTER TABLE `tip`
  ADD PRIMARY KEY (`tip_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `avatar_id` (`avatar_id`),
  ADD KEY `location_id` (`location_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action_completed`
--
ALTER TABLE `action_completed`
  MODIFY `completed_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `action_type`
--
ALTER TABLE `action_type`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `avatar`
--
ALTER TABLE `avatar`
  MODIFY `avatar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `object`
--
ALTER TABLE `object`
  MODIFY `object_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tip`
--
ALTER TABLE `tip`
  MODIFY `tip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `action_completed`
--
ALTER TABLE `action_completed`
  ADD CONSTRAINT `action_completed_ibfk_1` FOREIGN KEY (`action_id`) REFERENCES `action_type` (`action_id`),
  ADD CONSTRAINT `action_completed_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`),
  ADD CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`avatar_id`) REFERENCES `avatar` (`avatar_id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
