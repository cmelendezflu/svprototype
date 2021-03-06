<?php
require_once ('libs/pages/page.php');
require_once ('libs/TemplateHelp.php');
require_once ('libs/Configuration.php');

class enfermedadVihPage extends page
{
	public $config;

	function __construct($data = null)
	{
                $this->config = $data;
		parent::__construct($data);
	}

	public function parseContent()
	{
		$this->tpl->addBlockFile('CONTENT','contentBlock',Configuration::templatesPath.'vih/enfermedadVih.tpl.html');

                // Muestra mensajes de error correspondientes
                $this->tpl->setVariable('mensajeError',($this->config["error"]?'':'none'));
                $this->tpl->setVariable('mensajeExito',($this->config["exito"]?'':'none'));

                switch($this->config["search"]["caso"]){
                    case '1': $this->tpl->setVariable("selCaso1",'selected'); break;
                    case '2': $this->tpl->setVariable("selCaso2",'selected'); break;
                }
                
                switch($this->config["search"]["condicion"]){
                    case '1': $this->tpl->setVariable("selCondicion1",'selected'); break;
                    case '2': $this->tpl->setVariable("selCondicion2",'selected'); break;
                    case '3': $this->tpl->setVariable("selCondicion3",'selected'); break;
                }

//                require_once ('libs/caus/clsCaus.php');
//                if(clsCaus::validarSeccion(ConfigurationCAUS::r4, ConfigurationCAUS::Reportes))
                    $this->tpl->setVariable("botonGenerar",'<div style="margin-top:10px"><a href="javascript:validarReporte();" class="ui-state-default ui-corner-all ui-button" onmouseover="RollOver(this)" onmouseout="RollOut(this)" title="Por favor considere que el reporte puede tardarse">Generar</a></div>');
		$this->tpl->parse('contentBlock');
	}
}
?>