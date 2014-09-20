-- phpMyAdmin SQL Dump
-- version 4.0.0-alpha1
-- http://www.phpmyadmin.net
--
-- 主机: 
-- 生成日期: 2014 年 05 月 25 日 15:17
-- 服务器版本: 5.6.10-log
-- PHP 版本: 5.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `screen_shetuanxunyan`
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- 转存表中的数据 `screen_data`
--

INSERT INTO `screen_data` (`data_id`, `data_player`, `data_player_name`, `data_player_class`, `data_bgm`, `data_program`, `data_program_name`, `data_score`, `data_display`) VALUES
(11, '', '器乐部', '鼓表演', '', '', ' ', '', ''),
(12, '', '英语话剧社', '阿拉丁神灯', '', '', '', '', ''),
(13, '', '街舞社', '街舞串烧', '', '', '', '', ''),
(14, '', '中文话剧社', '窦娥冤续', '', '', '', '', ''),
(15, '', '机器人社', '飞机表演', '', '', '', '', ''),
(16, '', '英文话剧社', '白雪公主', '', '', '', '', ''),
(17, ' ', '器乐部', '器乐串烧', '', '', '', '', ''),
(18, '', '街舞社', '街舞串烧', '', '', '', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
