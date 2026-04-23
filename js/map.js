function info() {
    let infoCnt = window.parent.document.getElementById("information-container");
    let mapCnt = window.parent.document.getElementById("map-iframe");
    let right = infoCnt.style.right;
    let footer = window.parent.document.getElementById("map-footer");
    if (right === "-100%") {
        infoCnt.style.right = "0";
        infoCnt.style.height = "130vh";
        mapCnt.style.marginRight = "20%";
        mapCnt.style.marginBottom = "10%"
    } else {
        infoCnt.style.right = "-100%";
        infoCnt.style.height = "30vh";
        mapCnt.style.marginRight = "0"
        mapCnt.style.marginBottom = "3%"
    }
}

const normal_scale = 1;
const max_scale = 2;
const add = 0.2;
function zoomIn() {
    let map = document.getElementById("iframe-container");
    let scale = parseFloat(map.style.scale) || 1;
    if (scale < max_scale) {
        map.style.scale = scale + add;
    }
}
function zoomout() {
    let map = document.getElementById("iframe-container");
    let scale = parseFloat(map.style.scale);
    if (scale > normal_scale) {
        map.style.scale = scale - add;
    }
}