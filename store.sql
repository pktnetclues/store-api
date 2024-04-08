-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 07, 2024 at 05:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` smallint(5) NOT NULL,
  `categoryName` text NOT NULL,
  `createdBy` smallint(5) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`, `createdBy`, `createdAt`) VALUES
(4, 'TV', 16, '2024-04-06 07:33:59'),
(5, 'Smartphone', 15, '2024-04-06 10:59:45'),
(6, 'Earbuds', 15, '2024-04-06 12:45:35'),
(7, 'Appliances', 16, '2024-04-06 14:38:16');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` smallint(5) NOT NULL,
  `productName` text NOT NULL,
  `productDesc` text NOT NULL,
  `productPrice` int(15) NOT NULL,
  `categoryId` smallint(5) NOT NULL,
  `createdBy` int(5) NOT NULL,
  `productImages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `productDesc`, `productPrice`, `categoryId`, `createdBy`, `productImages`) VALUES
(2, 'Iphone 14 Pro', 'The iPhone 14 Pro is a smartphone with a 6.1-inch Super Retina XDR OLED display, a 2,000,000:1 contrast ratio, and a refresh rate of 60 Hz. It has a resolution of 2532 × 1170 pixels and a pixel density of about 460 PPI. The iPhone 14 has rounded corners that follow a curved design, and the screen is 6.06 inches diagonally when measured as a standard rectangular shape.', 59000, 5, 15, '[\"26cbebd24cef87b8-psp-pankaj.jpg\"]'),
(3, 'Iphone 15', 'The iPhone 15 is a smartphone with a 6.1-inch Super Retina XDR OLED display, a 2,000,000:1 contrast ratio, and a refresh rate of 60 Hz. It has a resolution of 2532 × 1170 pixels and a pixel density of about 460 PPI. The iPhone 14 has rounded corners that follow a curved design, and the screen is 6.06 inches diagonally when measured as a standard rectangular shape.', 80000, 5, 15, '[\"85a6d37c7cc30858-psp-pankaj.jpg\",\"1e2af405d180b8e6-Screenshot from 2024-03-31 12-02-52.png\"]'),
(4, 'Airpods Pro', 'Apple\'s AirPods Pro are wireless, in-ear headphones that offer premium features like noise cancellation, 3D sound, and an ergonomic design. The second generation AirPods Pro have improved active noise cancellation, battery life, and the ability to adjust volume directly from the earbuds. The H1-powered AirPods Pro also feature Adaptive Audio, which automatically prioritizes sounds that need your attention as you move around. Apple AirPods Pro (2nd generation) The H2-powered AirPods Pro now feature Adaptive Audio, automatically prioritising sounds that need your attention as you move through the world. By seamlessly blending Active Noise Cancellation with Transparency mode when you need it, Adaptive Audio magically delivers the right mix of sound for any environment ... Wikipedia AirPods Pro - Wikipedia AirPods Pro are wireless Bluetooth in-ear headphones designed by Apple, initially introduced on October 30, 2019. They are Apple\'s mid-range wireless headphones, available alongside the base-level AirPods and the highest-end AirPods Max. Apple Inc. apple.com AirPods Pro (2nd generation) - Apple It uses computational algorithms to deliver noise cancellation, superior three-dimensional sound, and efficient battery life — all at once. AirPods Pro will pair with Apple Vision Pro to deliver Lossless Audio with ultra-low latency, for an unprecedented sound experience. The Verge Apple AirPods Pro (second-gen) review: same look, better ... 28 Sept 2022 — The second-gen AirPods Pro sound better. Their active noise cancellation is noticeably improved. You can now adjust the volume directly from the earbuds. And the charging case has gained a built-in speaker and pinpoint location tracking that makes it easier to find. Battery life is also slightly longer than before. For legions of loyal Apple customers, these changes are exciting — even if the outer design is old hat. So the second reaction has been along the lines of “these are what I\'ve been waiting for.” cnn.com 5 things the AirPods Pro do better than any other wireless earbuds - CNN 20 Jul 2023 — Both the original AirPods Pro and AirPods Pro 2 are some of the best true wireless earbuds in existence. They set the standard for premium earbuds, with excellent active noise cancellation (ANC) and striking 3D sound in an ergonomic design. Here are some more features of the AirPods Pro: Spatial Audio: Gyroscopes in the earpieces allow users to move their head around within an audio space Lossless Audio: Pairs with Apple Vision Pro to deliver ultra-low latency Adaptive Audio: Seamlessly blends Active Noise Cancellation with Transparency mode to deliver the right mix of sound for any environment Here are some controls for controlling audio content: Play and pause: Press the Digital Crown Play the next track: Double-click the Digital Crown Play the previous track: Triple-click the Digital Crown Adjust the volume: Turn the Digital Crown Switch between Noise Cancellation and Transparency mode: Press the noise control button What is the physical description of AirPods? What are the hidden features of AirPods Pro? How do I use AirPods Pro features? Ask a follow up', 30000, 6, 15, '[\"c7e972f29021e03f-psp-pankaj.jpg\",\"4df5cc8058f07b7c-Screenshot from 2024-03-31 12-02-52.png\"]'),
(10, 'Airpods Pro', 'Apple\'s AirPods Pro are wireless, in-ear headphones that offer premium features like noise cancellation, 3D sound, and an ergonomic design. The second generation AirPods Pro have improved active noise cancellation, battery life, and the ability to adjust volume directly from the earbuds. The H1-powered AirPods Pro also feature Adaptive Audio, which automatically prioritizes sounds that need your attention as you move around. Apple AirPods Pro (2nd generation) The H2-powered AirPods Pro now feature Adaptive Audio, automatically prioritising sounds that need your attention as you move through the world. By seamlessly blending Active Noise Cancellation with Transparency mode when you need it, Adaptive Audio magically delivers the right mix of sound for any environment ... Wikipedia AirPods Pro - Wikipedia AirPods Pro are wireless Bluetooth in-ear headphones designed by Apple, initially introduced on October 30, 2019. They are Apple\'s mid-range wireless headphones, available alongside the base-level AirPods and the highest-end AirPods Max. Apple Inc. apple.com AirPods Pro (2nd generation) - Apple It uses computational algorithms to deliver noise cancellation, superior three-dimensional sound, and efficient battery life — all at once. AirPods Pro will pair with Apple Vision Pro to deliver Lossless Audio with ultra-low latency, for an unprecedented sound experience. The Verge Apple AirPods Pro (second-gen) review: same look, better ... 28 Sept 2022 — The second-gen AirPods Pro sound better. Their active noise cancellation is noticeably improved. You can now adjust the volume directly from the earbuds. And the charging case has gained a built-in speaker and pinpoint location tracking that makes it easier to find. Battery life is also slightly longer than before. For legions of loyal Apple customers, these changes are exciting — even if the outer design is old hat. So the second reaction has been along the lines of “these are what I\'ve been waiting for.” cnn.com 5 things the AirPods Pro do better than any other wireless earbuds - CNN 20 Jul 2023 — Both the original AirPods Pro and AirPods Pro 2 are some of the best true wireless earbuds in existence. They set the standard for premium earbuds, with excellent active noise cancellation (ANC) and striking 3D sound in an ergonomic design. Here are some more features of the AirPods Pro: Spatial Audio: Gyroscopes in the earpieces allow users to move their head around within an audio space Lossless Audio: Pairs with Apple Vision Pro to deliver ultra-low latency Adaptive Audio: Seamlessly blends Active Noise Cancellation with Transparency mode to deliver the right mix of sound for any environment Here are some controls for controlling audio content: Play and pause: Press the Digital Crown Play the next track: Double-click the Digital Crown Play the previous track: Triple-click the Digital Crown Adjust the volume: Turn the Digital Crown Switch between Noise Cancellation and Transparency mode: Press the noise control button What is the physical description of AirPods? What are the hidden features of AirPods Pro? How do I use AirPods Pro features? Ask a follow up', 30000, 6, 15, '[\"669e547fa7bcbe49-psp-pankaj.jpg\",\"cf13fef55bfe9a0f-Screenshot from 2024-03-31 12-02-52.png\"]');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` tinyint(2) NOT NULL,
  `roleName` tinytext NOT NULL,
  `userId` smallint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`, `userId`) VALUES
(12, 'user', 15),
(13, 'admin', 16);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` smallint(5) NOT NULL,
  `firstName` tinytext NOT NULL,
  `lastName` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `password` text NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `hobbies` tinytext NOT NULL,
  `roleName` tinytext NOT NULL,
  `profilePic` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `gender`, `hobbies`, `roleName`, `profilePic`, `createdAt`) VALUES
(15, 'Pankaj', 'Thakur', 'pk@gmail.com', '$2b$10$zqYJUmFwJT0uMAdleatdLeLnaLjZJjzj8FfrEMRM3X89eJ7q7OUSa', 'Male', 'Coding, Gaming', 'user', 'ad0fce8916f3ff02-psp-pankaj.jpg', '2024-04-06 05:57:27'),
(16, 'Pankaj', 'Thakur', 'pkt@gmail.com', '$2b$10$ytuohxRUljJ.jPIuxNbF0eiBravJB1KXu0J3w9NgI7VUGqBEDxa6.', 'Male', 'Coding, Gaming', 'admin', '5bc75314f822ac51-psp-pankaj.jpg', '2024-04-06 07:32:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
