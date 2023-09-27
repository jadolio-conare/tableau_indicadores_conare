let opcionesMenu = [...document.querySelectorAll(".menu-principal-container ul.menu.nav-menu > li")];

opcionesMenu.forEach(e => {
    let vinculosPrincipales = e.querySelector("a[role='link']");
    let textoVinculo = vinculosPrincipales.innerHTML.replace(/\<.*\>/gm, '');
    if(textoVinculo === "Consultas y Trámites"){
        let submenu = e.querySelectorAll("ul > li");
        submenu.forEach(sb => {
            console.log(sb.innerHTML);
        });
    }
});