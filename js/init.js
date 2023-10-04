const ALTURA_VIZ = 800;
const JSON_MENU = "json/otros/menu_derecho.json";
const JSON_PATH_INDICATORS = "json/indicadores/indicadores_educ_superior.json";

var ANCHO_VIZ = 0;
let URL_INDICADORES = [];
let listaVizTableau = [];

/* ============================================ */

/**
 * 
 */
cargarDatosPagina = (ruta_json_menu, ruta_json_indicadores) => {

    let datosMenu, datosIndicadores;

    $.when(

        $.getJSON(ruta_json_menu, function( data ) {
            datosMenu = data;
        }),

        $.getJSON(ruta_json_indicadores, function( data ) {
            datosIndicadores = data;
        })

    ).then(function(){

        if(datosMenu && datosIndicadores){
            URL_INDICADORES = datosIndicadores["indicadores_educ_superior"];
            construirVinetasIndicadores();
            construyeMenuDerecho(datosMenu["menu_derecho"]);
        }

        /*
        if(datosIndicadores){
            URL_INDICADORES = datosIndicadores["indicadores"];
            cambioTamannoGrafico();
            window.addEventListener("resize", cambioTamannoGrafico);
        }*/

    });

}

/* ============================================ */

/**
 * Función de Inicialización Gráficos
 */

$(function(){
    cargarDatosPagina(JSON_MENU, JSON_PATH_INDICATORS);
});