let head = document.querySelector(".heading h1");
let cards = document.querySelectorAll(".card-container");
function museumMod() {

    document.getElementById("poster1").classList.toggle("light");
    document.getElementById("poster2").classList.toggle("light");
    document.getElementById("poster3").classList.toggle("light");
    document.getElementById("poster4").classList.toggle("light");
    document.getElementById("poster5").classList.toggle("light");
    document.getElementById("row1").classList.toggle("light");
    document.getElementById("row2").classList.toggle("light");
    document.getElementById("row3").classList.toggle("light");
    document.getElementById("row4").classList.toggle("light");
    document.getElementById("row5").classList.toggle("light");
    document.getElementById("footer-r").classList.toggle("light");

    const elementsToToggle = [".heading h1", ".heading p", ".heading span",
        ".table", "#all-m"

    ];

    elementsToToggle.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            el.classList.toggle("light");
        }
    });

    const groups = [".card-container", ".cards_container span", "button", ".table-museum", ".footer-d", ".table-museum th"];
    groups.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.toggle("light");
        });
    });
}
if (head.classList.contains("light")) {
    let currentMus = localStorage.setItem("museumMod", "light");
}
else {
    let currentMus = localStorage.setItem("museumMod", "dark");
}
let savedMus = localStorage.getItem("museumMod");
let savedMod = localStorage.getItem("theme");
if (savedMus !== savedMod) {
    museumMod();
}