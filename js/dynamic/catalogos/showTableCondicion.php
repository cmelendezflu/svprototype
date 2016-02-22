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
                  <th width=\"60%\" class=\"dxgvHeader_PlasticBlue\">Nombre</th>
                  <th width=\"20%\" class=\"dxgvHeader_PlasticBlue\">Codigo</th>
                  <th class=\"dxgvHeader_PlasticBlue\">Activo</th>
                  <th class=\"dxgvHeader_PlasticBlue\" colspan=\"2\">Acciones</th>
              </tr>";

//                  <th class=\"dxgvHeader_PlasticBlue\">Influenza</th>


// Para borrar
if ($mode == "delete") {
    $var_id = $_GET["id"];
    $error = dalCatalogos::borrarCondicion($var_id);

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
    echo"<td class=\"dxgv\" width=\"10%\"> <input  type=\"text\" maxlength=\"45\" nombre='codigo' size=\"20%\" id='c' /> </td>";
    echo"<td class=\"dxgv\" width=\"10%\"> <input  type=\"checkbox\" id='s'/></td> ";
    echo"<td class=\"dxgv\" width=\"5%\"><a href=\"javascript:refresh()\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/Back.png\" title=\"Cancelar\"/></a></td>";
    echo"<td class=\"dxgv\" width=\"5%\"><a href=\"javascript:save_data();\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/save.png\" title=\"Guardar\"/></a></td>";
    echo"</tr>";
}


// Guardar nuevo
if ($mode == "save_new") {
    $n = $_REQUEST["n"];
    $c = $_REQUEST["c"];
    $s = $_REQUEST["s"];
//    $flu = $_REQUEST["f"];
    $id = dalCatalogos::agregarCondicion($n, $c, $s);

    if ($id == "-1") {
        //$tabla.='</td></tr></table>';
        echo '<script type="text/javascript">';
        echo 'alert("Imposible agregar la condicion, por favor intente nuevamente.");';
        echo '</script>';
    }
}

// Guardar edición
if ($mode == "update_data") {
    $n = $_REQUEST["n"];
    $c = $_REQUEST["c"];
    $s = $_REQUEST["s"];
    $id = $_REQUEST["i"];

    $error = dalCatalogos::editarCondicion($id, $n, $c, $s);

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
$lista = dalCatalogos::obtenerCondiciones($config);

if (isset($lista)) {
    foreach ($lista as $lista) {
        $id = $lista['id'];
        $nombre = $lista['nom'];
        $codigo = $lista['cod'];
        $status = $lista['stat'];
//        $influenza = $lista['flu'];

//        $influenza = ($influenza == '1' ? 'S&iacute;' : 'No');
        $status = ($status == '1' ? 'S&iacute;' : 'No');
        $id_ = "";
        //// if Mode is Update then get the ID and display the text field with value Other wise print the data into the table
        if ($mode == "update")
            $id_ = $_GET["id"];

        if ($id_ == $id) {
            echo "<tr class=\"dxgvDataRow_PlasticBlue\">";
            echo "<td class=\"dxgv\" width=\"60%\">
                                <input type='hidden' value='" . $id_ . "' name='prev_id' id='i" . $id_ . "'/>
                                <input type='text' value='" . htmlentities($nombre) . "' id='n" . $id_ . "' size=\"55%\" />
                         </td>";
            echo "<td class=\"dxgv\" width=\"20%\">
                                <input type='text' value='" . htmlentities($codigo) . "' id='c" . $id_ . "' size=\"25%\" />
                         </td>";
            echo '<td class=\"dxgv\" width = \"10%\">
                                <input type="checkbox" value= "' . $status . '" name="estado" id="s' . $id_ . '" ' . ($status != 'No' ? " checked " : " ") . ' />
                         </td> ';

            echo "<td class=\"dxgv\" width = \"5%\"> <a href=\"javascript:refresh()\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/Back.png\" title=\"Cancelar\"/></a> </td> ";
            echo "<td class=\"dxgv\" width = \"5%\"><a href=\"javascript:update_data('" . $id_ . "');\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/save.png\" title=\"Guardar\"/></a></td>";
        } else {
            echo "<tr class=\"dxgvDataRow_PlasticBlue\">";
            echo "<td class=\"dxgv\" width= \"60%\">" . htmlentities($nombre) . "</td>";
            echo "<td class=\"dxgv\" width= \"20%\">" . htmlentities($codigo) . "</td>";
            echo "<td class=\"dxgv\" width= \"10%\">" . $status . "</td>";
            echo "<td class=\"dxgv\" width= \"5%\"><a href=\"javascript:editar('" . $id . "')\"><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/edit copy.png\" title=\"Editar\"/></a></td> ";
            echo "<td class=\"dxgv\" width= \"5%\"><a href=\"javascript:requestInfo('js/dynamic/catalogos/showTableCondicion.php?mode=delete&id=$id','showTable','')\" onclick='return confirmLink(this);'><img border=0 src=\"" . Configuration::getUrlprefix() . "img/iconos/delete.png\" title=\"Eliminar\"/></a></td>";
        }
        echo "</tr>";
    }
}
echo "</table>";

// ### PAGINADO ###
// Almacenar cuantos registros hay en total

$total = dalCatalogos::conteoCondciones();

// Mostrar HTML con numeros de paginas
// ### PAGINADO ###
require_once('libs/PagineoAjax.php');
$pagineo = new PagineoAjax($total, $config['page'], $config["paginado"], '');
$pagineo->renderPagineo();
### PAGINADO ###
?>