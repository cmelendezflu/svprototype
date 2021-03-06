var pagina = 1;
var conteo = 0;
var muestras = new Array();

// LOAD
$(document).ready(function()
{    
    $("#validacionesDiv").hide();
    $("#all").hide();

    // Cambio de área de análisis
    $("#area").change(function()
    {

        if(conteo!=0)
        {
            var retVal = confirm("Debe enviar muestras de un \xe1rea \xfanicamente, si cambia de \xe1rea se perder\xe1n las muestras de la lista de env\xedo. \xbfContinuar?");

            if(retVal)
            {
                //getEve();
                borrarTabla();
            }
        }
        //else
            //getEve();
    });

    $("#rechazada").change(function(){
        $("#recha").val($(this).val());
    });
});

function getEve()
{
    $.getJSON(urlprefix + 'js/dynamic/eventos.php',{
            idarea: $("#area").val(),
            ajax: 'true'
        }, function(j){
            var options = '';
            options += '<option value="0">Todos</option>';

            for (var i = 0; i < j.length; i++){
                options += '<option value="' + j[i].optionValue + '">' + j[i].optionDisplay + '</option>';
            }
            $("#evento").html(options);
        })
}

function buscarInforme()
{
    var Message ='';
    if(jQuery.trim($("#idd").val())!='')
    {
        if(!parseInt($("#idd").val(), 10))
            Message+='- Por favor ingrese &uacute;nicamente n&uacute;meros para buscar el informe (desde).<br/>';
    }

    if(jQuery.trim($("#idh").val())!='')
    {
        if(!parseInt($("#idh").val(), 10))
            Message+='- Por favor ingrese &uacute;nicamente n&uacute;meros para buscar el informe (hasta).<br/>';
    }

    if(Message!='')
    {
        $("#validacionesDiv").show();
        $("#validaciones").html(Message);
    }
    else
    {
        $("#validacionesDiv").hide();
        $("#validaciones").html(' ');
        $("#formBuscar").submit();
    }
}

function borrarFiltro()
{
    $("#idd").val("");
    $("#idh").val("");
    $("#area").val("");
}

function generarReporte(informe)
{
    window.open (urlprefix+'reportes/listadoEnvioDerivaciones.php?lista='+informe,
    "mywindow",window.width, window.height);
}

function recibirTodas(informe)
{
    if(confirm("\xbfDesea recibir todas las muestras del informe seleccionado?"))
        window.location = urlprefix+'analista/historial.php?a=t&r='+informe;
}

function recibirSelectivo(informe)
{
    window.location = urlprefix+'analista/selectivo.php?r='+informe;
}