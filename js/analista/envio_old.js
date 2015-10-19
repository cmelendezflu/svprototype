var pagina = 1;
var conteo = 0;
var muestras = new Array();

// LOAD
$(document).ready(function()
{
    // CALENDARIOS
    $(function() {$( "#derivacion_desde" ).datepicker({showOn: "button", buttonImage: urlprefix+"img/calendar.gif", buttonImageOnly: true, showAnim: "slideDown"});});
    $(function() {$( "#derivacion_hasta" ).datepicker({showOn: "button",buttonImage: urlprefix+"img/calendar.gif",buttonImageOnly: true,showAnim: "slideDown"});});

    $("#validacionesDiv").hide();
    $("#envio").hide();
    $("#all").hide();

    // Cambio de área de análisis
    $("#area").change(function()
    {

        if(conteo!=0)
        {
            var retVal = confirm("Debe enviar derivaciones de un \xe1rea \xfanicamente, si cambia de \xe1rea se perder\xe1n las derivaciones de la lista de env\xedo. \xbfContinuar?");

            if(retVal)
            {
                getEve();
                borrarTabla();
            }
        }
        else
            getEve();
    });

    $("#rechazada").change(function(){
        $("#recha").val($(this).val());
    });
});


function borrarTabla()
{   
    $("#envio").hide();
    for(var row in muestras)
       $("#eR"+muestras[row]).remove();
    muestras = new Array();
    conteo = 0;
}

function borrarLista()
{
    var retVal = confirm("\xbfBorrar el listado de env\xedo?");
    if(retVal)
        borrarTabla();
}

function getEve()
{
    $.getJSON(urlprefix + 'js/dynamic/eventos.php',{
            idarea: $("#area").val(),
            ajax: 'true'
        }, function(j){
            var options = '';
            options += '<option value="0">N/A</option>';

            for (var i = 0; i < j.length; i++){
                options += '<option value="' + j[i].optionValue + '">' + j[i].optionDisplay + '</option>';
            }
            $("#evento").html(options);
        })
}


function borrarFiltro()
{    
    $("#area").val(0);
    $("#evento").val(0);

    $("#codigo_global_desde").val("");
    $("#codigo_global_hasta").val("");
    $("#codigo_correlativo_desde").val("");
    $("#codigo_correlativo_hasta").val("");

    $("#derivacion_desde").val("");
    $("#derivacion_hasta").val("");
}

function buscarDerivaciones()
{
    var Message = '';


    if($("#area").val()==0)
            Message+='- Por favor seleccione un &aacute;rea de env&iacute;o.<br/>';

    if($("#evento").val()==0)
            Message+='- Por favor seleccione un evento.<br/>';

    if(jQuery.trim($("#derivacion_desde").val())!='')
    {
        if(!isDate($("#derivacion_desde").val()))
            Message+='- Por favor ingrese una fecha inicial de derivaci&oacute;n adecuada.<br/>';
    }

    if(jQuery.trim($("#derivacion_hasta").val())!='')
    {
        if(!isDate($("#derivacion_hasta").val()))
            Message+='- Por favor ingrese una fecha final de derivaci&oacute;n adecuada.<br/>';
    }


    if(Message!='')
    {
        $("#validacionesDiv").show();
        $("#validaciones").html(Message);
    }
    else{
        $("#validacionesDiv").hide();
        obtenerMuestras();
    }
}

function obtenerMuestras()
{
    $.ajax({
       type: "POST",
       url: urlprefix + 'js/dynamic/envioMuestras.php',
       data: "&are="+ ($("#area").val()==0?'':$("#area").val())
             + "&ev="+ ($("#evento").val()==0?'':$("#evento").val())
         
             + "&gd="+jQuery.trim($("#codigo_global_desde").val()) + "&gh="+jQuery.trim($("#codigo_global_hasta").val())
             + "&cd="+jQuery.trim($("#codigo_correlativo_desde").val()) + "&ch="+jQuery.trim($("#codigo_correlativo_hasta").val())
             + "&td="+jQuery.trim($("#fecha_toma_desde").val()) + "&th="+jQuery.trim($("#fecha_toma_hasta").val())
             + "&rd="+jQuery.trim($("#fecha_recepcion_desde").val()) + "&rh="+jQuery.trim($("#fecha_recepcion_hasta").val())+"&pagina="+pagina,
       success: function(data){
           $("#resultadosBusqueda").html(data);
       }
     });
}

function seleccionarMuestra(numM)
{
    var c1, c2, c3;
    var clasetd = ' class="dxgv" ';
    var clasetr = ' class="dxgvDataRow_PlasticBlue" ';
    var num = ' id="eR'+numM + '"';

    // si la muestra no está agregarla
    if(jQuery.inArray(numM, muestras)==-1)
    {
        muestras.push(numM);
        c1 = $("#g"+numM).text();
        c2 = $("#c"+numM).text();
        c3 = '<a title="Quitar muestra del listado" class="ui-state-default ui-corner-all ui-link-button" onmouseover="RollOver(this)" onmouseout="RollOut(this)"'
             + 'href="javascript:quitarMuestra('+numM+')"><span class="ui-icon ui-icon-trash"></span></a></a>';
        $("#envio > tbody").append("<tr"+num+clasetr+"><td"+clasetd+">"+c1+"</td><td"+clasetd+">"+c2+"</td><td"+clasetd+">"+c3+"</td></tr>");
        conteo++;
    }
    else
        alert("La muestra que seleccion\xf3 ya se encuentra en la lista.");

    if(conteo > 0)
        $("#envio").show();
}

function quitarMuestra(idMuestra)
{
    if(conteo>0)
    {
        var retVal = confirm("\xbfEliminar la muestra del listado de env\xedo?");
        if( retVal == true )
        {
            conteo--;
            $("#eR"+idMuestra).remove();

            // borrar del array
            delete muestras[jQuery.inArray(idMuestra, muestras)];
        }
    }

    if(conteo==0){
        $("#envio").hide();
    }
}

function Enviar()
{
    var param = '';

    for(var row in muestras)
    {
       param+=muestras[row]+'-';
    }
    param = param.substr(0, param.length-1);
    window.location = urlprefix+'ventanilla/enviarMuestras.php?m='+param;
}

function marcarTodas()
{
    
}

function refrescarResultados(nuevaPag)
{
    if(nuevaPag >= '1' )
    {
        pagina = nuevaPag;
        obtenerMuestras();
    }

}