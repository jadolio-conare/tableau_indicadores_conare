/**
 * 
 * @param {*} url 
 */
function inicializarVisualizaciones(container, url) {

    let cuerpoVisualizaciones = document.querySelector("div.body-tabs-groups-vizualizations");

    let anchoCuerpoViz = cuerpoVisualizaciones.clientWidth-45;

    ANCHO_VIZ = (ANCHO_VIZ === 0) ? anchoCuerpoViz : ANCHO_VIZ;

    let opciones_visualizacion = {
        width: ANCHO_VIZ,
        height: ALTURA_VIZ,
        hideTabs: true
    };

    let vizTableau = new tableau.Viz(container, url, opciones_visualizacion);

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
construirContenidoViz = (id, $div_padre, lista_indicadores) => {

    $div_padre.empty();
    
    lista_indicadores.forEach((e, idx) => {
        let divVisualizacion = document.createElement("div");
        divVisualizacion.className = `viz-container ${id} graphic-${idx}`;
        $div_padre.append(divVisualizacion);
        inicializarVisualizaciones(divVisualizacion, e["url"]);

        let iframeViz = divVisualizacion.querySelector("iframe");
        iframeViz.className+= `iframe-viz-container-graphic-${idx}`;
        iframeViz.addEventListener("load", function(evt){
            incluyeNotasGrafico($(divVisualizacion), e);
        });
    });

}

/**
 * 
 */
construirDiapositivasNavegacion = ($presentacion_graficos, id, lista_indicadores) => {

    let $padrePresentacion = $presentacion_graficos.parent();
    let $navegacionDiapositivas = $("<div />", {"class": `navigate-vizualizations ${id}`});
    $padrePresentacion.append($navegacionDiapositivas);

    //console.log($padrePresentacion);

}

/**
 * 
 */
cargaDatosIndicadores = () => {

    /*
    let $wrapperPrincipal = $(".group-vizualizations");

    $wrapperPrincipal.empty();

    URL_INDICADORES.forEach((e, idx) => {

        // ------------------------------------
        //let divVisualizacion = document.createElement("div");
        //divVisualizacion.className = `viz-container graphic-${idx}`;
        //$wrapperPrincipal.append(divVisualizacion);
        
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
    */
}