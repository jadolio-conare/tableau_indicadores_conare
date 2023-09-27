let JSON_DATOS_VIZ = [
    {
        url_pagina: '01_indicadores_docencia.html',
        json: 'json/indicadores/01_indicadores_docencia.json'
    },
    {
        url_pagina: '02_indicadores_investigacion.html',
        json: 'json/indicadores/02_indicadores_investigacion.json'
    },
    {
        url_pagina: '03_indicadores_ext_accion_social.html',
        json: 'json/indicadores/03_indicadores_ext_accion_social.json'
    },
    {
        url_pagina: '04_indicadores_vida_estudiantil.html',
        json: 'json/indicadores/04_indicadores_vida_estudiantil.json'
    }
];

let URL_INDICADORES = [];

const HEIGHT_VIZ = 800;

let listaVizTableau = [];

/* =============================================== */

/**
 * 
 * @param {*} url 
 */
function inicializarVisualizaciones(container, width_container, url) {

    let options = {
        width: width_container,
        height: HEIGHT_VIZ,
        hideTabs: true
    };

    let vizTableau = new tableau.Viz(container, url, options);

    if(listaVizTableau.length > 0){
        listaVizTableau.splice(0, listaVizTableau.length);
    }

    listaVizTableau.push(vizTableau);

}

/* =============================================== */

incluyeNotasGrafico = ($divPadre, elemento) => {
    let $divNotasViz = $("<div />", {"class": "info-notas-viz"});
    let notasViz = elemento["notas"];
    if(typeof notasViz === "string"){
        let $divContenedorNota = $("<div />", {"class": "contenido-nota"});
        let $parrafoNota = $("<p />", {"html" : notasViz});
        $divContenedorNota.append($parrafoNota);
        $divNotasViz.append($divContenedorNota);
    } else{
        notasViz.forEach(sbelem => {
            let $divContenedorNota = $("<div />", {"class": "contenido-nota"});
            let $tituloNota = $("<span />", {"html" : sbelem["item"]});
            $divContenedorNota.append($tituloNota);
            sbelem["parrafos"].forEach(p => {
                let $parrafoNota = $("<p />", {"html" : p["pr"]});
                $divContenedorNota.append($parrafoNota);
            });
            $divNotasViz.append($divContenedorNota);
        });
    }
    $divPadre.append($divNotasViz);
}

/* =============================================== */

/**
 * 
 */
cambioTamannoGrafico = () => {

    let $wrapperPrincipal = $(".group-vizualizations");

    $wrapperPrincipal.empty();

    URL_INDICADORES.forEach((e, idx) => {
        // ------------------------------------
        let divVisualizacion = document.createElement("div");
        divVisualizacion.className = `viz-container graphic-${idx}`;
        $wrapperPrincipal.append(divVisualizacion);
        let divVizAgregado = document.querySelector(`.viz-container.graphic-${idx}`);
        let anchoDivViz = divVizAgregado.clientWidth;
        inicializarVisualizaciones(divVisualizacion, anchoDivViz, e["url"]);
        // ------------------------------------
        let iframeViz = divVizAgregado.querySelector("iframe");
        iframeViz.className+= `iframe-viz-container-graphic-${idx}`;
        iframeViz.addEventListener("load", function(evt){
            incluyeNotasGrafico($(divVisualizacion), e);
        });
        
    });

    let hijosMenosPrimero = [...document.querySelectorAll(`.viz-container:not(:first-child)`)];
    let hijoViz = hijosMenosPrimero[0].querySelector("iframe");
    document.querySelector(`.viz-container:first-child iframe`).style.width = hijoViz.style.width;

}

/* =============================================== */

/**
 * 
 */
construyeMenuDerecho = (estructura_menu) => {

    console.log(estructura_menu["menu_derecho"]);

}

/* =============================================== */

cargarDatosPagina = (ruta_json_menu, ruta_json_indicadores) => {

    let datosMenuDerecho, datosIndicadores;

    $.when(

        $.getJSON(ruta_json_menu, function( data ) {
            datosMenuDerecho = data;
        }),

        $.getJSON(ruta_json_indicadores, function( data ) {
            datosIndicadores = data;
        }),

    ).then(function(){

        if(datosMenuDerecho){
            construyeMenuDerecho(datosMenuDerecho);
        }

        if(datosIndicadores){
            URL_INDICADORES = datosIndicadores["indicadores"];
            cambioTamannoGrafico();
            window.addEventListener("resize", cambioTamannoGrafico);
        }
    });

}

$(function(){

    let url_pagina = window.location.href.split("").reverse().join("");
    let extrae_pagina = url_pagina.match(/[a-z].*\d+\//gm)[0].replace("/", "");
    let nombre_pagina = extrae_pagina.split("").reverse().join("");

    let datos_json_cargar = JSON_DATOS_VIZ.filter(function(dato) {
        return dato["url_pagina"] == nombre_pagina; 
    });

    let url_json_menu = "json/otros/menu_derecho.json";

    let url_json_indicadores = datos_json_cargar[0]["json"];

    cargarDatosPagina(url_json_menu, url_json_indicadores);

});