<?php
require_once('libs/dal/vacunas/notificacion/dalNotificacionGrupo.php');
require_once('libs/caus/clsCaus.php');
if (!clsCaus::validarSession()){
    header("location: ".Configuration::getUrlprefix()."login.php");
}

header('Content-Type: application/json');
$data["id"] = $_REQUEST["id"];
$data = dalNotificacionGrupo::Borrar($data);

echo json_encode($data);