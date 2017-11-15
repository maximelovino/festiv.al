-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mer 15 Novembre 2017 à 10:52
-- Version du serveur :  5.6.35
-- Version de PHP :  7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `festiv`
--
CREATE DATABASE IF NOT EXISTS `festiv` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `festiv`;

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `idEvent` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` point NOT NULL,
  `venueName` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `ticketshop` varchar(255) NOT NULL,
  `idLineup` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `lineup`
--

CREATE TABLE `lineup` (
  `idLineup` int(11) NOT NULL,
  `artists` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`idEvent`),
  ADD KEY `idLineup` (`idLineup`),
  ADD KEY `name` (`name`),
  ADD KEY `position` (`position`(25));

--
-- Index pour la table `lineup`
--
ALTER TABLE `lineup`
  ADD PRIMARY KEY (`idLineup`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `idEvent` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`idLineup`) REFERENCES `lineup` (`idLineup`) ON DELETE CASCADE ON UPDATE CASCADE;


GRANT USAGE ON *.* TO 'festiv'@'localhost' IDENTIFIED BY PASSWORD '*9001C4553B2E0BD5479AD8E13E5A73A9B9A71BDE';

GRANT SELECT, INSERT, UPDATE, DELETE ON `festiv`.* TO 'festiv'@'localhost';
