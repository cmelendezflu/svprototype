var http = location.protocol;var slashes = http.concat("//");var host = slashes.concat(window.location.host);//var urlprefix = 'http://localhost/sisvig2/';//var urlprefix = 'http://'+window.location.host+'/sisvig2/';var urlprefix = host+'/sisvig2/';//var urlprefix = host+'/sisvig2_173.201.187.40/trunk/';var finalizado = 4;var recibidoMuestra = 3;var recibidoDer = 7;var finalizadoDer = 8;var flu = 9;var rabia = 19; var estadoAdecuado = 1;var motivoAdecuado = 1;// Contiene los resultados finales// Para los cuales se deshabilitan los específicos// y se selecciona automáticamente No Aplica en ellosvar conclusiones = new Array();conclusiones[0] = '2'; // Negativoconclusiones[1] = '3'; // Indeterminadoconclusiones[2] = '4'; // No procesadaconclusiones[3] = '5'; // Mala muestraconclusiones[4] = '7'; // Sensibleconclusiones[5] = '8'; // MDRconclusiones[6] = '9'; // XDRvar indiceNegativo = 0;var indiceIndeterminado = 1;var indiceNoprocesada = 2;var indiceMalamuestra = 3;var indiceSensible = 4;var indiceMDR = 5;var indiceXDR = 6;var noAplicaTipo = 1;var noAplicaSubtipo = 6;var stringNoAplica = 'No Aplica';var finalPositivo = 1;//$(document).ready(function()//{//    $( "#dialog:ui-dialog" ).dialog( "destroy" );//    $( "#dialog-message" ).dialog({//			autoOpen: false,//			height: 350,//			width: 350,//			modal: true,//                        position: 'center',//			buttons: {//				Aceptar: function() {//                                    $( this ).dialog( "close" );//				}//			}//		});//});////function about()//{//        $( "#dialog-message" ).dialog("open");//}var Utf8 = {     // public method for url encoding    encode : function (string) {        string = string.replace(/\r\n/g,"\n");        var utftext = "";         for (var n = 0; n < string.length; n++) {             var c = string.charCodeAt(n);             if (c < 128) {                utftext += String.fromCharCode(c);            }            else if((c > 127) && (c < 2048)) {                utftext += String.fromCharCode((c >> 6) | 192);                utftext += String.fromCharCode((c & 63) | 128);            }            else {                utftext += String.fromCharCode((c >> 12) | 224);                utftext += String.fromCharCode(((c >> 6) & 63) | 128);                utftext += String.fromCharCode((c & 63) | 128);            }         }         return utftext;    },     // public method for url decoding    decode : function (utftext) {        var string = "";        var i = 0;        var c = c1 = c2 = 0;         while ( i < utftext.length ) {             c = utftext.charCodeAt(i);             if (c < 128) {                string += String.fromCharCode(c);                i++;            }            else if((c > 191) && (c < 224)) {                c2 = utftext.charCodeAt(i+1);                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));                i += 2;            }            else {                c2 = utftext.charCodeAt(i+1);                c3 = utftext.charCodeAt(i+2);                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));                i += 3;            }         }         return string;    } }function isDate(value){	return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);}function RollOver(elemento) {    $(elemento).addClass('ui-state-hover');}function RollOut(elemento) {    $(elemento).removeClass('ui-state-hover');}$(document).ready(function() {//    alert(host);	$('.default-value').each(function() {		var default_value = this.value;		$(this).css('color', '#666');		$(this).focus(function() {			if(this.value == default_value) {				this.value = '';				$(this).css('color', '#333');			}		});		$(this).blur(function() {			if(this.value == '') {				$(this).css('color', '#666');				this.value = default_value;			}		});	});});var dtCh= "/";var minYear=1900;var maxYear=2100;function isInteger(s){	var i;    for (i = 0; i < s.length; i++){           // Check that current character is number.        var c = s.charAt(i);        if (((c < "0") || (c > "9"))) return false;    }    // All characters are numbers.    return true;}function stripCharsInBag(s, bag){	var i;    var returnString = "";    // Search through string's characters one by one.    // If character is not in bag, append to returnString.    for (i = 0; i < s.length; i++){           var c = s.charAt(i);        if (bag.indexOf(c) == -1) returnString += c;    }    return returnString;}function daysInFebruary (year){	// February has 29 days in any year evenly divisible by four,    // EXCEPT for centurial years which are not also divisible by 400.    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );}function DaysArray(n) {	for (var i = 1; i <= n; i++) {		this[i] = 31		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}		if (i==2) {this[i] = 29}   }    return this}// Acepta solamente númerosfunction numbersonly(e, decimal) {    var key;    var keychar;    if (window.event) {       key = window.event.keyCode;    }    else if (e) {       key = e.which;    }    else {       return true;    }    keychar = String.fromCharCode(key);    if ((key==null) || (key==0) || (key==8) ||  (key==9) || (key==13) || (key==27) ) {       return true;    }    else if ((("0123456789").indexOf(keychar) > -1)) {       return true;    }    else if (decimal && (keychar == ".")) {      return true;    }    else       return false;}function isDate(dtStr){	var daysInMonth = DaysArray(12)	var pos1=dtStr.indexOf(dtCh)	var pos2=dtStr.indexOf(dtCh,pos1+1)	var strDay=dtStr.substring(0,pos1)	var strMonth=dtStr.substring(pos1+1,pos2)	var strYear=dtStr.substring(pos2+1)		strYr=strYear	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)		for (var i = 1; i <= 3; i++) {		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)	}		month=parseInt(strMonth)	day=parseInt(strDay)	year=parseInt(strYr)	if (pos1==-1 || pos2==-1){		return false	}		if (strMonth.length<1 || month<1 || month>12){		return false	}		if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){		return false	}		if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){		return false	}		if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){		return false	}		return true}// Validaci�n de fecha mayor by Mauricio Escobar  //  //Este script y otros muchos pueden  //descarse on-line de forma gratuita  //en El C�digo: www.elcodigo.com    //Formato de la fecha  // 1 = DD/MM/YYYY   // 2 = MM/DD/YYYY     // 3 = YYYY/MM/DD  // 4 = YYYY/DD/MM  var formato = 1;    //**********************************************************************************************  //  invierta una fecha dada retornando en formato YYYYMMDD  //  dFecIni = Fecha a invertir  //  nTipFormat = Formato en que biene la fecha  //               1 = DD/MM/YYYY   //               2 = MM/DD/YYYY   //               3 = YYYY/MM/DD  //               4 = YYYY/DD/MM    function invFecha(nTipFormat,dFecIni){        // primera division fecha      if (typeof dFecIni === "undefined")         return dFecIni;        var singnoFechas = (dFecIni.indexOf("-")==-1)?"/":"-";            var nPosUno  = ponCero(dFecIni.substr(0,dFecIni.indexOf(singnoFechas)));    // 2� divicion fecha      var nPosDos  = ponCero(dFecIni.substr(parseInt(dFecIni.indexOf(singnoFechas)) + 1,parseInt(dFecIni.lastIndexOf(singnoFechas)) - parseInt(dFecIni.indexOf(singnoFechas)) - 1));    // 3� divicion fecha      var nPosTres = ponCero(dFecIni.substr(parseInt(dFecIni.lastIndexOf(singnoFechas)) + 1));      switch(nTipFormat){          case 1 :    //  DD/MM/YYYY              dReturnFecha = nPosTres + "/" + nPosDos + "/" + nPosUno;            break;            case 2 :    //  MM/DD/YYYY              dReturnFecha = nPosTres + "" + nPosUno + "" +nPosDos;              break;            case 3 :    //  YYYY/MM/DD              dReturnFecha = nPosUno + "" + nPosDos + "" +nPosTres;              break;                case 4 :    //  YYYY/DD/MM              dReturnFecha = nPosUno + "" + nPosTres + "" +nPosDos;              break;      }            return dReturnFecha;    // retorna la fecha       }    // Agrega un cero delante del strPon cuando tenga solo un caracter  function ponCero(strPon){      if(parseInt(strPon.length) < 2)          strPon = "0" + strPon;      return strPon;  }    //*******************************************************************************  // valida que la fecha dFecMenor es menor o igual a  dFecMayor  // los parametros dFecMenor, dFecMayor son fecha con divisores validos "-" o "/"  // el parametro dFormat es el tipo de formato en que viene la fecha   //               1 = DD/MM/YYYY   //               2 = MM/DD/YYYY   //               3 = YYYY/MM/DD  //               4 = YYYY/DD/MM    function comparaFecha(dFormat,dFecMenor, dFecMayor){      dFecMenor = invFecha(dFormat,dFecMenor);      dFecMayor = invFecha(dFormat,dFecMayor);        if(dFecMenor > dFecMayor)          return false;      else          return true;  }// Calcular la fecha de la SemanaDate.prototype.getWeek = function (dowOffset) {	dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero	var newYear = new Date(this.getFullYear(),0,1);	var day = newYear.getDay() - dowOffset; //the day of week the year begins on	day = (day >= 0 ? day : day + 7);	var daynum = Math.floor((this.getTime() - newYear.getTime() -	(this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;	var weeknum;	// Si el a�o inicia antes del miercoles	diasRestantes = 3;	if(day < diasRestantes) {		weeknum = Math.floor((daynum+day-1)/7) + 1;		if(weeknum > 52) {			nYear = new Date(this.getFullYear() + 1,0,1);			nday = nYear.getDay() - dowOffset;			nday = nday >= 0 ? nday : nday + 7;			/*if the next year starts before the middle of			the week, it is week #1 of that year*/			weeknum = nday < diasRestantes ? 1 : 53;		}	}else{		weeknum = Math.floor((daynum+day-1)/7);	}		if (weeknum == 0) weeknum = 52;	if (weeknum == 53) weeknum = 1;		return weeknum;};function __isset(variable_name) {    var flag = false;    try {         if (typeof(eval(variable_name)) != 'undefined')         if (eval(variable_name) != null)         flag = true;     } catch(e) { }    return flag;}function esTextoVacio(texto){    if (!texto) return true;    return texto.trim() == '';}function esNumero(numero){    if (!(/^([0-9])*$/.test(numero))){        return false;    }    return numero > 0;}function esEmail(email){    var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;    console.log(regex.test(email));    return regex.test(email);}function esNumeroDecimal(numero){    if (!(/^\d+\.*\d{0,2}$/.test(numero))){        return false;    }    return numero > 0;}function transformarJsonEstandar(arreglo){    var objeto = {};    for(i=0;i<arreglo.length;i++){        objeto[arreglo[i].name] = arreglo[i].value;    }    return objeto;}function utf8_decode(str_data) {  //  discuss at: http://phpjs.org/functions/utf8_decode/  // original by: Webtoolkit.info (http://www.webtoolkit.info/)  //    input by: Aman Gupta  //    input by: Brett Zamir (http://brett-zamir.me)  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)  // improved by: Norman "zEh" Fuchs  // bugfixed by: hitwork  // bugfixed by: Onno Marsman  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)  // bugfixed by: kirilloid  //   example 1: utf8_decode('Kevin van Zonneveld');  //   returns 1: 'Kevin van Zonneveld'  var tmp_arr = [],    i = 0,    ac = 0,    c1 = 0,    c2 = 0,    c3 = 0,    c4 = 0;  str_data += '';  while (i < str_data.length) {    c1 = str_data.charCodeAt(i);    if (c1 <= 191) {      tmp_arr[ac++] = String.fromCharCode(c1);      i++;    } else if (c1 <= 223) {      c2 = str_data.charCodeAt(i + 1);      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));      i += 2;    } else if (c1 <= 239) {      // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout      c2 = str_data.charCodeAt(i + 1);      c3 = str_data.charCodeAt(i + 2);      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));      i += 3;    } else {      c2 = str_data.charCodeAt(i + 1);      c3 = str_data.charCodeAt(i + 2);      c4 = str_data.charCodeAt(i + 3);      c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);      c1 -= 0x10000;      tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));      tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));      i += 4;    }  }  return tmp_arr.join('');}