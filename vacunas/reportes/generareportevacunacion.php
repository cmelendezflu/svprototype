<?php
require_once ('libs/pages/vacunas/reportes/generaReporteVacunacionPage.php');
require_once ('libs/caus/clsCaus.php');
require_once('libs/Configuration.php');

// Validar si ya ha iniciado sesion
if (!clsCaus::validarSession()){
    header("location: ".Configuration::getUrlprefix()."login.php");
}

$config = array();

// Archivos javascript necesarios
$config["jsfiles"][] = "comun.js";
$config["jsfiles"][] = "bienvenida.js";
$config["jsfiles"][] = "Utils.js";
$config["parameters"] = $_POST;
$page = new generaReporteVacunacionPage($config);
$page->displayPage();
