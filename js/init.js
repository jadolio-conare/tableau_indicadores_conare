const ALTURA_VIZ = 800;
const JSON_MENU = "json/otros/menu_derecho.json";
const JSON_PATH_INDICATORS = "json/indicadores/indicadores_educ_superior.json";

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
            construirVinetasIndicadores(datosIndicadores["indicadores_educ_superior"]);
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
    
    /*
    let url_pagina = window.location.href.split("").reverse().join("");
    let extrae_pagina = url_pagina.match(/[a-z].*\d+\//gm)[0].replace("/", "");
    let nombre_pagina = extrae_pagina.split("").reverse().join("");

    let datos_json_cargar = JSON_DATOS_VIZ.filter(function(dato) {
        return dato["url_pagina"] == nombre_pagina; 
    });

    */

    cargarDatosPagina(JSON_MENU, JSON_PATH_INDICATORS);

});