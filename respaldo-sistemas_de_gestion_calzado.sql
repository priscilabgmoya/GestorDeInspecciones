-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-03-2023 a las 04:00:19
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemas_de_gestion_calzado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

CREATE TABLE `color` (
  `id_color` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`id_color`, `descripcion`) VALUES
(143, 'rosa'),
(4569, 'azul'),
(7852, 'verde'),
(7896, 'verde aqua'),
(8072, 'salmon');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `defecto`
--

CREATE TABLE `defecto` (
  `id_defecto` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `tipo_defecto` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `defecto`
--

INSERT INTO `defecto` (`id_defecto`, `descripcion`, `tipo_defecto`) VALUES
(0, 'grieta en el material', '0'),
(1, 'destrucción costura inf.', '0'),
(2, 'plantilla desigual', '0'),
(3, 'descocido', '0'),
(4, 'error de pintado', '0'),
(5, 'salida de la suela ', '1'),
(6, 'forro desigual', '1'),
(7, 'ensamblaje incorrecto', '1'),
(8, 'mancha de grasa', '1'),
(9, 'perforación corrida', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `dni` varchar(45) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `correo_electronico` varchar(45) DEFAULT NULL,
  `contraseña` varchar(45) NOT NULL,
  `id_tipo_empleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`dni`, `nombre`, `apellido`, `correo_electronico`, `contraseña`, `id_tipo_empleado`) VALUES
('18184997', 'Maria Sofia ', 'Gonella ', 'sofiaGonella@prueba.com', 'nKS5B2lu', 1),
('21744928', 'Maria Alejandra', 'Moya', 'gpriscilab@gmail.com', 'Mama2022', 1),
('40828159', 'Lourdes Carolina', 'Gomez', 'lina.lg83@gmail.com', '7SHoX$YZ', 0),
('41182280', 'Priscila Belen', 'Garcia Moya', 'pribelen.bgm@gmail.com', 'Casa2015', 2),
('41495541', 'Pablo Alejandro', 'Ceccarelli', 'pabloCeccarelli@prueba.com', 'rF4m8Igg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL,
  `tipo_estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id_estado`, `tipo_estado`) VALUES
(0, 'activa'),
(1, 'pausada'),
(2, 'finalizada'),
(3, 'en proceso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencia`
--

CREATE TABLE `incidencia` (
  `id_incidencia` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time NOT NULL,
  `defecto` int(11) DEFAULT NULL,
  `tipo_incidencia` varchar(45) DEFAULT NULL,
  `tipo_pie` varchar(45) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `jornada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencia`
--

INSERT INTO `incidencia` (`id_incidencia`, `fecha`, `hora`, `defecto`, `tipo_incidencia`, `tipo_pie`, `cantidad`, `jornada`) VALUES
(1, '2023-02-28', '18:00:00', NULL, '0', NULL, 1, 9392),
(2, '2023-02-28', '19:00:00', NULL, '0', NULL, 1, 9392),
(3, '2023-02-28', '15:00:00', NULL, '0', NULL, 1, 9392),
(4, '2023-02-28', '18:00:00', 6, '1', 'izquierdo', 1, 9392),
(5, '2023-02-28', '16:00:00', 4, '1', 'derecho', 1, 9392),
(6, '2023-02-28', '18:00:00', 7, '1', 'derecho', 1, 9392),
(7, '2023-02-28', '20:00:00', 3, '1', 'izquierdo', 1, 9392),
(1253, '2023-03-15', '09:00:00', NULL, '0', NULL, 1, 9392),
(1254, '2023-03-15', '09:00:00', NULL, '0', NULL, -1, 9392),
(1256, '2023-03-15', '08:00:00', 5, '1', 'derecho', 1, 9392),
(1257, '2023-03-15', '08:00:00', 6, '1', 'izquierdo', 1, 9392),
(1258, '2023-03-15', '08:00:00', 2, '1', 'derecho', 1, 9392),
(1259, '2023-03-15', '08:00:00', 4, '1', 'izquierdo', 1, 9392),
(1260, '2023-03-15', '08:00:00', 8, '1', 'derecho', 1, 9392),
(1261, '2023-03-15', '08:00:00', 1, '1', 'derecho', 1, 9392),
(1262, '2023-03-15', '08:00:00', 7, '1', 'derecho', 1, 9392),
(1263, '2023-03-15', '08:00:00', 7, '1', 'derecho', 1, 9392),
(1264, '2023-03-15', '08:00:00', 7, '1', 'derecho', -1, 9392),
(1265, '2023-03-15', '08:00:00', 8, '1', 'izquierdo', 1, 9392),
(1266, '2023-03-15', '08:00:00', 0, '1', 'derecho', 1, 9392),
(1267, '2023-03-15', '14:00:00', 0, '1', 'derecho', 1, 9392),
(1268, '2023-03-15', '14:00:00', 3, '1', 'derecho', 1, 9392),
(1269, '2023-03-15', '14:00:00', 2, '1', 'izquierdo', 1, 9392),
(1270, '2023-03-15', '14:00:00', 0, '1', 'izquierdo', 1, 9392),
(1271, '2023-03-15', '14:00:00', 5, '1', 'izquierdo', 1, 9392),
(1272, '2023-03-15', '14:00:00', NULL, '0', NULL, 1, 9392),
(1273, '2023-03-15', '14:00:00', NULL, '0', NULL, 1, 9392),
(1274, '2023-03-15', '14:00:00', NULL, '0', NULL, 1, 9392),
(1275, '2023-03-15', '14:00:00', NULL, '0', NULL, 1, 9392),
(1276, '2023-03-15', '14:00:00', NULL, '0', NULL, 1, 9392),
(1277, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1278, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1279, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1280, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1281, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1282, '2023-03-15', '13:00:00', 5, '1', 'izquierdo', 1, 9392),
(1283, '2023-03-15', '13:00:00', 5, '1', 'izquierdo', 1, 9392),
(1284, '2023-03-15', '13:00:00', 5, '1', 'izquierdo', 1, 9392),
(1285, '2023-03-15', '13:00:00', 1, '1', 'izquierdo', 1, 9392),
(1286, '2023-03-15', '13:00:00', 1, '1', 'izquierdo', 1, 9392),
(1287, '2023-03-15', '13:00:00', 3, '1', 'derecho', 1, 9392),
(1288, '2023-03-15', '13:00:00', 3, '1', 'derecho', 1, 9392),
(1289, '2023-03-15', '13:00:00', 5, '1', 'derecho', 1, 9392),
(1290, '2023-03-15', '13:00:00', 5, '1', 'derecho', 1, 9392),
(1291, '2023-03-15', '13:00:00', 9, '1', 'derecho', 1, 9392),
(1292, '2023-03-15', '13:00:00', 9, '1', 'derecho', 1, 9392),
(1293, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1294, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1295, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1296, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1297, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1298, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1299, '2023-03-15', '13:00:00', NULL, '0', NULL, 1, 9392),
(1300, '2023-03-20', '14:00:00', 5, '1', 'izquierdo', 1, 9392),
(1301, '2023-03-20', '14:00:00', 6, '1', 'izquierdo', 1, 9392),
(1302, '2023-03-20', '14:00:00', 7, '1', 'izquierdo', 1, 9392),
(1303, '2023-03-20', '14:00:00', 8, '1', 'izquierdo', 1, 9392),
(1304, '2023-03-20', '14:00:00', 9, '1', 'izquierdo', 1, 9392);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornada_laboral`
--

CREATE TABLE `jornada_laboral` (
  `id_jornada_laboral` int(11) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `idturno` int(11) DEFAULT NULL,
  `dni_empleado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jornada_laboral`
--

INSERT INTO `jornada_laboral` (`id_jornada_laboral`, `fecha_inicio`, `fecha_fin`, `idturno`, `dni_empleado`) VALUES
(9392, '2023-02-28', NULL, 8, '21744928');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea_de_trabajo`
--

CREATE TABLE `linea_de_trabajo` (
  `nro_linea_de_trabajo` int(11) NOT NULL,
  `disponibilidad` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `linea_de_trabajo`
--

INSERT INTO `linea_de_trabajo` (`nro_linea_de_trabajo`, `disponibilidad`) VALUES
(1, 'disponible'),
(2, 'no disponible'),
(3, 'disponible'),
(4, 'disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE `modelo` (
  `sku` varchar(45) NOT NULL,
  `denominacion` varchar(45) DEFAULT NULL,
  `limite_superior_observado` int(11) DEFAULT NULL,
  `limite_inferior_observado` int(11) DEFAULT NULL,
  `limite_superior_reproceso` int(11) DEFAULT NULL,
  `limite_inferior_reproceso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`sku`, `denominacion`, `limite_superior_observado`, `limite_inferior_observado`, `limite_superior_reproceso`, `limite_inferior_reproceso`) VALUES
('123ABC', 'puma', 10, 3, 15, 4),
('789BDC', 'fila', 10, 4, 20, 3),
('ABC457', 'nike', 20, 4, 10, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_produccion`
--

CREATE TABLE `orden_produccion` (
  `nro_produccion` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `id_color` int(11) DEFAULT NULL,
  `nro_linea` int(11) DEFAULT NULL,
  `id_jornada_laboral` int(11) DEFAULT NULL,
  `sku` varchar(45) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orden_produccion`
--

INSERT INTO `orden_produccion` (`nro_produccion`, `fecha`, `id_color`, `nro_linea`, `id_jornada_laboral`, `sku`, `estado`) VALUES
(1578, '2023-02-24', 4569, 2, 9392, '789BDC', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pie`
--

CREATE TABLE `pie` (
  `tipo_pie` varchar(45) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pie`
--

INSERT INTO `pie` (`tipo_pie`, `descripcion`) VALUES
('derecho', 'pie derecho'),
('izquierdo', 'pie izquierdo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_defecto`
--

CREATE TABLE `tipo_defecto` (
  `tipo_defecto` varchar(45) NOT NULL,
  `descripcion_defecto` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_defecto`
--

INSERT INTO `tipo_defecto` (`tipo_defecto`, `descripcion_defecto`) VALUES
('0', 'reproceso'),
('1', 'observado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_empleado`
--

CREATE TABLE `tipo_empleado` (
  `id_tipo_empleado` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_empleado`
--

INSERT INTO `tipo_empleado` (`id_tipo_empleado`, `descripcion`) VALUES
(0, 'supervisor de linea'),
(1, 'supervisor de calidad'),
(2, 'administrativo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_incidencia`
--

CREATE TABLE `tipo_incidencia` (
  `tipo_incidencia` varchar(45) NOT NULL,
  `descripcion_incidencia` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_incidencia`
--

INSERT INTO `tipo_incidencia` (`tipo_incidencia`, `descripcion_incidencia`) VALUES
('0', 'primera'),
('1', 'defecto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--

CREATE TABLE `turno` (
  `id_turno` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `hora_entrada` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turno`
--

INSERT INTO `turno` (`id_turno`, `descripcion`, `hora_entrada`, `hora_salida`) VALUES
(8, 'mañana', '08:00:00', '14:00:00'),
(14, 'tarde', '14:00:00', '20:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id_color`);

--
-- Indices de la tabla `defecto`
--
ALTER TABLE `defecto`
  ADD PRIMARY KEY (`id_defecto`),
  ADD KEY `tipo_defecto` (`tipo_defecto`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `id_tipo_empleado` (`id_tipo_empleado`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD PRIMARY KEY (`id_incidencia`),
  ADD KEY `tipo_incidencia` (`tipo_incidencia`),
  ADD KEY `tipo_pie` (`tipo_pie`),
  ADD KEY `defecto` (`defecto`),
  ADD KEY `jornada` (`jornada`);

--
-- Indices de la tabla `jornada_laboral`
--
ALTER TABLE `jornada_laboral`
  ADD PRIMARY KEY (`id_jornada_laboral`),
  ADD KEY `idturno` (`idturno`),
  ADD KEY `dni_empleado` (`dni_empleado`);

--
-- Indices de la tabla `linea_de_trabajo`
--
ALTER TABLE `linea_de_trabajo`
  ADD PRIMARY KEY (`nro_linea_de_trabajo`);

--
-- Indices de la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`sku`);

--
-- Indices de la tabla `orden_produccion`
--
ALTER TABLE `orden_produccion`
  ADD PRIMARY KEY (`nro_produccion`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `nro_linea` (`nro_linea`),
  ADD KEY `id_jornada_laboral` (`id_jornada_laboral`),
  ADD KEY `sku` (`sku`),
  ADD KEY `estado` (`estado`);

--
-- Indices de la tabla `pie`
--
ALTER TABLE `pie`
  ADD PRIMARY KEY (`tipo_pie`);

--
-- Indices de la tabla `tipo_defecto`
--
ALTER TABLE `tipo_defecto`
  ADD PRIMARY KEY (`tipo_defecto`);

--
-- Indices de la tabla `tipo_empleado`
--
ALTER TABLE `tipo_empleado`
  ADD PRIMARY KEY (`id_tipo_empleado`);

--
-- Indices de la tabla `tipo_incidencia`
--
ALTER TABLE `tipo_incidencia`
  ADD PRIMARY KEY (`tipo_incidencia`);

--
-- Indices de la tabla `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`id_turno`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  MODIFY `id_incidencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1305;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `defecto`
--
ALTER TABLE `defecto`
  ADD CONSTRAINT `defecto_ibfk_1` FOREIGN KEY (`tipo_defecto`) REFERENCES `tipo_defecto` (`tipo_defecto`);

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_tipo_empleado`) REFERENCES `tipo_empleado` (`id_tipo_empleado`);

--
-- Filtros para la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD CONSTRAINT `incidencia_ibfk_1` FOREIGN KEY (`tipo_incidencia`) REFERENCES `tipo_incidencia` (`tipo_incidencia`),
  ADD CONSTRAINT `incidencia_ibfk_2` FOREIGN KEY (`tipo_pie`) REFERENCES `pie` (`tipo_pie`),
  ADD CONSTRAINT `incidencia_ibfk_3` FOREIGN KEY (`defecto`) REFERENCES `defecto` (`id_defecto`),
  ADD CONSTRAINT `incidencia_ibfk_4` FOREIGN KEY (`jornada`) REFERENCES `jornada_laboral` (`id_jornada_laboral`);

--
-- Filtros para la tabla `jornada_laboral`
--
ALTER TABLE `jornada_laboral`
  ADD CONSTRAINT `jornada_laboral_ibfk_1` FOREIGN KEY (`idturno`) REFERENCES `turno` (`id_turno`),
  ADD CONSTRAINT `jornada_laboral_ibfk_2` FOREIGN KEY (`dni_empleado`) REFERENCES `empleado` (`dni`);

--
-- Filtros para la tabla `orden_produccion`
--
ALTER TABLE `orden_produccion`
  ADD CONSTRAINT `orden_produccion_ibfk_3` FOREIGN KEY (`id_color`) REFERENCES `color` (`id_color`),
  ADD CONSTRAINT `orden_produccion_ibfk_4` FOREIGN KEY (`nro_linea`) REFERENCES `linea_de_trabajo` (`nro_linea_de_trabajo`),
  ADD CONSTRAINT `orden_produccion_ibfk_5` FOREIGN KEY (`id_jornada_laboral`) REFERENCES `jornada_laboral` (`id_jornada_laboral`),
  ADD CONSTRAINT `orden_produccion_ibfk_6` FOREIGN KEY (`sku`) REFERENCES `modelo` (`sku`),
  ADD CONSTRAINT `orden_produccion_ibfk_7` FOREIGN KEY (`estado`) REFERENCES `estado` (`id_estado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
