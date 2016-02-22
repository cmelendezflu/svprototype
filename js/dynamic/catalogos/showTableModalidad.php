<?php

require_once ('libs/dal/catalogos/dalCatalogos.php');
require_once ('libs/Configuration.php');

$codigoError = '';
$tabla = "";

// Acción por realizar
$mode = $_REQUEST["mode"];

// Encabezado de tabla
echo '<table id="tabla" align="center" width="80%">';
echo "<tr class=\"dxgvDataRow_PlasticBlue\">
                  <td class=\"dxgv\" colspan = \"5\" align=\"right\">
                  <a href=\"javascript:nuevo()\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/crear.png\" title=\"Agregar\"/></a>
                  <a href=\"javascript:refresh()\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/actualizar.png\" title=\"Actualizar\"/></a>
                  </td>
              </tr>
              <tr class=\"dxgvDataRow_PlasticBlue\">
                  <th width=\"50%\" class=\"dxgvHeader_PlasticBlue\">Nombre</th>
                  <th width=\"30%\" class=\"dxgvHeader_PlasticBlue\">habilita Nombre</th>
                  <th width=\"10%\" class=\"dxgvHeader_PlasticBlue\">Activo</th>
                  <th width=\"10%\" class=\"dxgvHeader_PlasticBlue\" colspan=\"2\">Acciones</th>
              </tr>";

//                  <th class=\"dxgvHeader_PlasticBlue\">Influenza</th>


// Para borrar
if ($mode == "delete") {
    $var_id = $_GET["id"];
    $error = dalCatalogos::borrarModadlidad($var_id);

    if ($error != "1") {
        $codigoError = 'B';
        echo '<script type="text/javascript">';
        echo 'alert("Imposible borrar, por favor intente nuevamente, ya existe informaci\xe3n relacionada");';
        echo '</script>';
    }
}


// Nuevo
if ($mode == "new") {
    echo"<tr class=\"dxgvDataRow_PlasticBlue\">";
    echo"<td class=\"dxgv\" width=\"50%\"> <input  type=\"text\" maxlength=\"45\" nombre='nombre' size=\"55%\" id='n' /> </td>";
    echo"<td class=\"dxgv\" width=\"30%\"> <input  type=\"checkbox\" nombre='habilita_nombre' size=\"20%\" id='h' /> </td>";
    echo"<td class=\"dxgv\" width=\"10%\"> <input  type=\"checkbox\" id='s'/></td> ";
    echo"<td class=\"dxgv\" width=\"5%\"><a href=\"javascript:refresh()\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/Back.png\" title=\"Cancelar\"/></a></td>";
    echo"<td class=\"dxgv\" width=\"5%\"><a href=\"javascript:save_data();\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/save.png\" title=\"Guardar\"/></a></td>";
    echo"</tr>";
}


// Guardar nuevo
if ($mode == "save_new") {
    $n = $_REQUEST["n"];
    $h = $_REQUEST["h"];
    $s = $_REQUEST["s"];
//    $flu = $_REQUEST["f"];
    $id = dalCatalogos::agregarModalidad($n, $h, $s);

    if ($id == "-1") {
        //$tabla.='</td></tr></table>';
        echo '<script type="text/javascript">';
        echo 'alert("Imposible agregar la modalidad, por favor intente nuevamente.");';
        echo '</script>';
    }
}

// Guardar edición
if ($mode == "update_data") {
    $n = $_REQUEST["n"];
    $h = $_REQUEST["h"];
    $s = $_REQUEST["s"];
    $id = $_REQUEST["i"];

    $error = dalCatalogos::editarModalidad($id, $n, $h, $s);

    if ($error != "1") {
        //$tabla.='</td></tr></table>';
        echo '<script type="text/javascript">';
        echo 'alert("Imposible editar, por favor intente nuevamente.");';
        echo '</script>';
    }
}
// End of Update
// Parametros para limitar los resultados
$config["paginado"] = Configuration::paginado; // Cuantos resultados por pagina se desean ver
$config["page"] = $_REQUEST["pagina"] != "" ? $_REQUEST["pagina"] : 1; // Pagina de resultados a mostrar
$config["inicio"] = ($config['page'] - 1) * $config["paginado"]; // Inicio del set de datos
// Display all the data from the table
$lista = dalCatalogos::obtenerModalidades($config);

if (isset($lista)) {
    foreach ($lista as $lista) {
        $id = $lista['id'];
        $nombre = $lista['nom'];
        $habilita_nombre = $lista['hab'];
        $status = $lista['stat'];
//        $influenza = $lista['flu'];

//        $influenza = ($influenza == '1' ? 'S&iacute;' : 'No');
        $habilita_nombre = ($habilita_nombre == '1' ? 'Si' : 'No');
        $status = ($status == '1' ? 'Si' : 'No');
        $id_ = "";
        //// if Mode is Update then get the ID and display the text field with value Other wise print the data into the table
        if ($mode == "update")
            $id_ = $_GET["id"];

        if ($id_ == $id) {
            echo "<tr class=\"dxgvDataRow_PlasticBlue\">";
            echo "<td class=\"dxgv\" width=\"50%\">
                                <input type='hidden' value='" . $id_ . "' name='prev_id' id='i" . $id_ . "'/>
                                <input type='text' value='" . htmlentities($nombre) . "' id='n" . $id_ . "' size=\"55%\" />
                         </td>";
            echo "<td class=\"dxgv\" width=\"30%\">
                                <input type='checkbox' value='" . $habilita_nombre . "' id='h" . $id_ . "'  '" . ($habilita_nombre != 'No' ? " checked " : " ") . "' />
                         </td>";
            echo '<td class=\"dxgv\" width = \"10%\">
                                <input type="checkbox" value= "' . $status . '" name="estado" id="s' . $id_ . '" ' . ($status != 'No' ? " checked " : " ") . ' />
                         </td> ';

            echo "<td class=\"dxgv\" width = \"5%\"> <a href=\"javascript:refresh()\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/Back.png\" title=\"Cancelar\"/></a> </td> ";
            echo "<td class=\"dxgv\" width = \"5%\"><a href=\"javascript:update_data('" . $id_ . "');\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/save.png\" title=\"Guardar\"/></a></td>";
        } else {
            echo "<tr class=\"dxgvDataRow_PlasticBlue\">";
            echo "<td class=\"dxgv\" width= \"50%\">" . htmlentities($nombre) . "</td>";
            echo "<td class=\"dxgv\" width= \"30%\">" . htmlentities($habilita_nombre) . "</td>";
            echo "<td class=\"dxgv\" width= \"10%\">" . $status . "</td>";
            echo "<td class=\"dxgv\" width= \"5%\"><a href=\"javascript:editar('" . $id . "')\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/edit copy.png\" title=\"Editar\"/></a></td> ";
            echo "<td class=\"dxgv\" width= \"5%\"><a href=\"javascript:requestInfo('js/dynamic/catalogos/showTableModalidad.php?mode=delete&id=$id','showTable','')\" onclick='return confirmLink(this);'><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/delete.png\" title=\"Eliminar\"/></a></td>";
        }
        echo "</tr>";
    }
}
echo "</table>";

// ### PAGINADO ###
// Almacenar cuantos registros hay en total

$total = dalCatalogos::conteoModalidad();

// Mostrar HTML con numeros de paginas
// ### PAGINADO ###
require_once('libs/PagineoAjax.php');
$pagineo = new PagineoAjax($total, $config['page'], $config["paginado"], '');
$pagineo->renderPagineo();
### PAGINADO ###
?>