var http;
var currPagina = 1;

window.onload = function(){
    http = getHTTPObject();
    traerTipos();
}


function traerTipos()
{
    requestInfo('js/dynamic/catalogos/showTableVacunas.php?mode=list&pagina='+currPagina,'showTable','');
}

function nuevo()
{
    requestInfo('js/dynamic/catalogos/showTableVacunas.php?mode=new&pagina='+currPagina,'showTable','')
}

function refrescarResultados(pagina){
    if (pagina>='1'){
        currPagina = pagina;
        traerTipos();
    }
}

function confirmLink(theLink)
{
    var is_confirmed = confirm('\xBFEst\xe1 seguro que desea borrar la vacuna?');
    if (is_confirmed) {
        theLink.href += '';
    }
    return is_confirmed;
}

function refresh()
{
    $("#dSummaryErrors").hide();
    traerTipos();
}



function getHTTPObject()
{
  var xmlhttp;
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  }
  else if (window.ActiveXObject){
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    if (!xmlhttp){
        xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
}
return xmlhttp;
}

function requestInfo(url,id,redirectPage)
{
    var temp=new Array();
        http.open("GET", urlprefix + url, true);
        http.onreadystatechange = function()
        {
            if (http.readyState == 4)
            {
              if(http.status==200)
              {
                    var results=http.responseText;
                    if(redirectPage=="" || results!="1")
                    {

                        var temp=id.split("~"); // To display on multiple div
                        //alert(temp.length);
                        var r=results.split("~"); // To display multiple data into the div
                        //alert(temp.length);
                        if(temp.length>1)
                        {
                                for(i=0;i<temp.length;i++)
                                {
                                    //alert(temp[i]);
                                    document.getElementById(temp[i]).innerHTML=r[i];
                                }
                        } else
                                document.getElementById(id).innerHTML = results;
                    } else                       
                        window.location.href=redirectPage;
              }
            }
        };
        http.send(null);
   }

function update_data(id)
{
    var Message='';
    if(jQuery.trim($("#n"+id).val())=="")
        Message+= '<br/>&nbsp;&nbsp;- Por favor ingrese el nombre de la vacuna.';
    if(jQuery.trim($("#c"+id).val())=="")
        Message+= '<br/>&nbsp;&nbsp;- Por favor ingrese el codigo de la vacuna.';

    if(Message!=''){
        $("#dSummaryErrors").show();
        $("#error").html('Imposible guardar los cambios:' + Message);
    }
    else
    {
        $("#dSummaryErrors").hide();
        $("#error").html(' ');

        requestInfo('js/dynamic/catalogos/showTableVacunas.php?mode=update_data&pagina='+currPagina+'&i='+id+'&n='+$("#n"+id).val()+'&c='+$("#c"+id).val()
        +'&s='+($("#s"+id).attr('checked')?'1':'0'),'showTable','');
    }
}

function editar(id)
{
    requestInfo('js/dynamic/catalogos/showTableVacunas.php?mode=update&pagina='+currPagina+'&id='+id,'showTable','')
}

function save_data()
{
    var Message='';
    if(jQuery.trim($("#n").val())=="")
        Message+= '<br/>&nbsp;&nbsp;- Por favor ingrese el nombre de la vacuna.';
    if(jQuery.trim($("#c").val())=="")
        Message+= '<br/>&nbsp;&nbsp;- Por favor ingrese el codigo de la vacuna.';

    if(Message!=''){
        $("#dSummaryErrors").show();
        $("#error").html('Imposible guardar la nueva vacuna:' + Message);
    }
    else
    {
        $("#dSummaryErrors").hide();
        $("#error").html(' ');

        requestInfo('js/dynamic/catalogos/showTableVacunas.php?mode=save_new&pagina='+currPagina+'&n='+$("#n").val()+'&c='+$("#c").val()+
            '&s='+($("#s").attr('checked')?'1':'0'),'showTable','');
    }
}