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