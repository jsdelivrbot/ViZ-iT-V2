-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.16 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for vizit
CREATE DATABASE IF NOT EXISTS `vizit` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `vizit`;

-- Dumping structure for table vizit.country
CREATE TABLE IF NOT EXISTS `country` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `iso` char(2) NOT NULL,
  `name` varchar(80) NOT NULL,
  `nicename` varchar(80) NOT NULL,
  `iso3` char(3) DEFAULT NULL,
  `numcode` smallint(6) DEFAULT NULL,
  `phonecode` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=254 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table vizit.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `mob_no` varchar(50) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table vizit.uservisits
CREATE TABLE IF NOT EXISTS `uservisits` (
  `VisitId` mediumint(9) NOT NULL AUTO_INCREMENT,
  `UserId` smallint(6) NOT NULL,
  `CountryCode` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `FromDate` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `ToDate` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `VisitedWith` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `VisitedCity` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`VisitId`),
  KEY `FK_uservisits_users` (`UserId`),
  CONSTRAINT `FK_uservisits_users` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table vizit.visitphotos
CREATE TABLE IF NOT EXISTS `visitphotos` (
  `PhotoId` int(11) NOT NULL,
  `VisitId` mediumint(9) NOT NULL,
  `PhotoFile` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `PhotoThumb` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`PhotoId`),
  KEY `FK_visitphotos_uservisits` (`VisitId`),
  CONSTRAINT `FK_visitphotos_uservisits` FOREIGN KEY (`VisitId`) REFERENCES `uservisits` (`VisitId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
