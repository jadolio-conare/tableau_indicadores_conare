/**
 * 
 */
construirContenidoViz = (id, $div_padre, lista_indicadores) => {
    
    lista_indicadores.forEach((e, idx) => {
        let divVisualizacion = document.createElement("div");
        divVisualizacion.className = `viz-container ${id} graphic-${idx}`;
        $div_padre.append(divVisualizacion);
    });

}

/**
 * 
 */
construirVinetasIndicadores = (informacion_indicadores) => {

    let $padreViz = $(".wrapper-viz");
    let $divGrupos = $("<div />", {"class": "main-groups-vizualizations"});
    let $divNavTabs = $("<div />", {"class": "nav-tabs-groups-vizualizations"});
    let $divCuerpoTabs = $("<div />", {"class": "body-tabs-groups-vizualizations"});

    $divGrupos.append($divNavTabs, $divCuerpoTabs);
    $padreViz.append($divGrupos);

    informacion_indicadores.forEach(elem => {
        let separa_id = parseInt(elem["id"].split("-"));
        let css_tab = (separa_id === 1) ? `tab-viz-indicators ${elem["id"]}` : `tab-viz-indicators ${elem["id"]} tab-inactivo`;
        $divVineta = $("<div />", {"class": css_tab});
        $tituloVineta = $("<a />", {"class": `title-viz-indicators ${elem["id"]}`, "href": "#", "html": elem["titulo"]});
        $contenidoVineta = $("<div />", {"class": `group-vizualizations ${elem["id"]}`});
        $divVineta.append($contenidoVineta);
        $divNavTabs.append($tituloVineta);
        $divCuerpoTabs.append($divVineta);
        construirContenidoViz(elem["id"], $contenidoVineta, elem["indicadores"]);
    });

}

/**
 * 
 */
construyeMenuDerecho = (estructura_menu) => {
    let $padreViz = $(".wrapper-viz");
    let $divMenu = $("<div />", {"class": "menu-gris", "html" : estructura_menu});
    $padreViz.append($divMenu);
}
