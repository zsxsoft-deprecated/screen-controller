-- phpMyAdmin SQL Dump
-- version 4.0.0-alpha1
-- http://www.phpmyadmin.net
--
-- 主机: 
-- 生成日期: 2014 年 05 月 24 日 16:12
-- 服务器版本: 5.6.10-log
-- PHP 版本: 5.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `screen_database`
--

-- --------------------------------------------------------

--
-- 表的结构 `screen_data`
--

CREATE TABLE IF NOT EXISTS `screen_data` (
  `data_id` int(11) NOT NULL AUTO_INCREMENT,
  `data_player` text NOT NULL,
  `data_player_name` text NOT NULL,
  `data_player_class` text NOT NULL,
  `data_bgm` text NOT NULL,
  `data_program` text NOT NULL,
  `data_program_name` text NOT NULL,
  `data_score` text NOT NULL,
  `data_display` text NOT NULL,
  PRIMARY KEY (`data_id`),
  UNIQUE KEY `data_id_2` (`data_id`),
  KEY `data_id` (`data_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `screen_data`
--

INSERT INTO `screen_data` (`data_id`, `data_player`, `data_player_name`, `data_player_class`, `data_bgm`, `data_program`, `data_program_name`, `data_score`, `data_display`) VALUES
(1, '{"class": "测试（一）班", "name": "测试", "doom": "A101"}', '测试', '测试（1）班', '/multimedia/星守歌.mp3', '{"name": "测试节目1"}', '测试节目1', '[1,2,3,4,5]', '[{"message": "测试1", "media": "/multimedia/thefox.mp4", "type": "video", "display_type": "full-screen"}, {"message": "测试2", "media": "/multimedia/2.jpg", "type": "image", "display_type": "full-screen"}]'),
(2, '{"class": "测试（2）班", "name": "测试2", "doom": "A101"}', '测试2', '测试（2）班', '/multimedia/星守歌.mp3', '{"name": "测试节目2"}', '测试节目2', '[5,2,3,4,1]', '[{"message": "测试2", "media": "", "type": "text", "display_type": "full-screen"}, {"message": "", "media": "/multimedia/1.jpg", "type": "image", "display_type": "full-screen"}, {"message": "", "media": "/multimedia/thefox.mp4", "type": "video", "display_type": "full-screen"}]');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
