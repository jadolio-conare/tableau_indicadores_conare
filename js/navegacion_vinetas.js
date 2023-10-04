/**
 * 
 */
activaNavegacionVinetas = ($vineta_presionada) => {
    let separaCSSClases = $vineta_presionada.attr("class").split(" ");
    let $cuerpoViz = $(`div.tab-viz-indicators.${separaCSSClases[1]}`);

    if($vineta_presionada.hasClass("tab-inactivo")){
        $vineta_presionada.removeClass("tab-inactivo");
        $vineta_presionada.addClass("tab-activo");
        $cuerpoViz.removeClass("seccion-viz-inactivo");
        $cuerpoViz.removeClass("seccion-viz-activo");
    }// Fin del if($vineta_presionada.hasClass("tab-inactivo"))

    let otros_tabs_titulos = document.querySelectorAll(`a.title-viz-indicators:not(a[class*='${separaCSSClases[1]}'])`);
    let otros_tabs_cuerpo = document.querySelectorAll(`div.tab-viz-indicators:not(div[class*='${separaCSSClases[1]}'])`);

    otros_tabs_titulos.forEach(elem_viz => {
        let clasesCSS = elem_viz.className.split(" ");
        elem_viz.className = `title-viz-indicators ${clasesCSS[1]} tab-inactivo`;
    });

    otros_tabs_cuerpo.forEach(elem_viz => {
        let clasesCSS = elem_viz.className.split(" ");
        elem_viz.className = `tab-viz-indicators ${clasesCSS[1]} seccion-viz-inactivo`;
    });
}

/**
 * 
 */
graficosVinetaActiva = (datos_indicadores) => {

    let tabActivo = document.querySelector("a.title-viz-indicators.tab-activo");
    let clase_css_tab = [...tabActivo.classList][1];
    let disciplina_activa = datos_indicadores.filter(disciplina => disciplina.id === clase_css_tab);
    let $grupo_visualizaciones = $(`div.group-vizualizations.${disciplina_activa[0]["id"]}`);
    construirContenidoViz(disciplina_activa[0]["id"], $grupo_visualizaciones, disciplina_activa[0]["indicadores"]);
    construirDiapositivasNavegacion($grupo_visualizaciones, disciplina_activa[0]["id"], disciplina_activa[0]["indicadores"]);

}

/**
 * 
 */
defineAnchuraVista = () => {

    let anchoElementosViz = document.querySelector("div.body-tabs-groups-vizualizations").clientWidth;

    let gruposDivsVisualizaciones = document.querySelectorAll("div.group-vizualizations");

    gruposDivsVisualizaciones.forEach(grp => {
        grp.style.width = `${anchoElementosViz-30}px`;
    });

    ANCHO_VIZ = 0;

}

/**
 * 
 */
construirVinetasIndicadores = () => {

    let $padreViz = $(".wrapper-viz");
    let $divGrupos = $("<div />", {"class": "main-groups-vizualizations"});
    let $divNavTabs = $("<div />", {"class": "nav-tabs-groups-vizualizations"});
    let $divCuerpoTabs = $("<div />", {"class": "body-tabs-groups-vizualizations"});

    $divGrupos.append($divNavTabs, $divCuerpoTabs);
    $padreViz.append($divGrupos);

    URL_INDICADORES.forEach(elem => {
        let separa_id = parseInt(elem["id"].split("-"));
        let css_tab = (separa_id === 1) ? `title-viz-indicators ${elem["id"]} tab-activo` : `title-viz-indicators ${elem["id"]} tab-inactivo`;
        let css_seccion = (separa_id === 1) ? `tab-viz-indicators ${elem["id"]} seccion-viz-activo` : `tab-viz-indicators ${elem["id"]} seccion-viz-inactivo`;
        $divVineta = $("<div />", {"class": css_seccion});
        $tituloVineta = $("<a />", {"class": css_tab, "href": "#", "html": elem["titulo"]});
        $contenidoVineta = $("<div />", {"class": `group-vizualizations ${elem["id"]}`});
        $divVineta.append($contenidoVineta);
        $divNavTabs.append($tituloVineta);
        $divCuerpoTabs.append($divVineta);
    });

    defineAnchuraVista();
   
    graficosVinetaActiva(URL_INDICADORES);

    let $tabsVinetas = $("a.title-viz-indicators");

    $tabsVinetas.on("click", function(evt){
        evt.preventDefault();
        activaNavegacionVinetas($(this));
        graficosVinetaActiva(URL_INDICADORES);
    });

}

/**
 * 
 */
mostrarMenu = ($padre_menu, opciones, indice) => {

    if(indice >= opciones.length) return;
    
    if(typeof opciones[indice] === "object"){

        let $elemento_menu = $("<li />", {
            "class": `elem-menu-derecho item-${opciones[indice]["subitem"]}`,
        });
    
        let $item_menu = $("<a />", {
            "class": `link-menu-derecho acceso-item-${opciones[indice]["subitem"]}`, 
            "html": opciones[indice]["texto"],
            "href": opciones[indice]["url"],
            "target": "_self"
        });

        $elemento_menu.append($item_menu);

        $padre_menu.append($elemento_menu);

        if("opciones" in opciones[indice]){
            let $lista_subelementos = $("<ul />", {"class": `listado-cuerpo-menu-gris`});
            $elemento_menu.append($lista_subelementos);
            mostrarMenu($lista_subelementos, opciones[indice]["opciones"], 0);
        }    
    }

    mostrarMenu($padre_menu, opciones, indice + 1);

}

/**
 * 
 */
construyeMenuDerecho = (estructura_menu) => {
    let $padreViz = $(".wrapper-viz");
    let $divMenu = $("<div />", {"class": "menu-gris"});
    let $tituloMenu = $("<span />", {"class": "titulo-menu-gris", "html": estructura_menu["titulo"]});
    let $navCuerpoMenu = $("<nav />", {"class": "cuerpo-menu-gris"});
    let $listaMenu = $("<ul />", {"class": "listado-cuerpo-menu-gris"});
    $navCuerpoMenu.append($listaMenu);
    $divMenu.append($tituloMenu);
    $divMenu.append($navCuerpoMenu);
    mostrarMenu($listaMenu, estructura_menu["opciones"], 0);
    $padreViz.append($divMenu);
}
