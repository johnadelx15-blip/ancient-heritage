function removeFromLocal(key, id) {
    let savedItems = JSON.parse(localStorage.getItem(key)) || [];
    let updatedItems = savedItems.filter(el => el.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedItems));
}

let products = [];

async function loadArtifacts() {
    try {
        let response = await fetch('/api/artifacts/');
        let data = await response.json();
        products = data.artifacts;
        renderArtifactCards();
        filterArtifacts("All Museums");
        showMethodActive("grid");
        cardDisplay('grid');
    } catch (error) {
        console.error("Error loading artifacts from Django API:", error);
    }
}



function isItemInStorage(key, id) {
    let savedItems = JSON.parse(localStorage.getItem(key)) || [];
    return savedItems.some(item => item.id === id);
}

function addToLocal(key, value) {
    let savedItems = JSON.parse(localStorage.getItem(key)) || [];
    let isExist = false;

    for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].id === value.id) {
            isExist = true;
            break;
        }
    }
    if (isExist)
        return;

    savedItems.push(value);
    localStorage.setItem(key, JSON.stringify(savedItems));
}


function renderArtifactCards() {
    let container = document.getElementById("artifacts-container");
    let isLightMode = localStorage.getItem("theme") === "light" || localStorage.getItem("searchMod") === "light";

    for (let i of products) {
        let card = document.createElement("div");
        let x = i.category.replaceAll(" ", "-");
        card.classList.add("card", x, "hide");
        if (isLightMode) {
            card.classList.add("light");
        }

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");
        let image = document.createElement("img");
        image.setAttribute("src", i.image);
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);

        let textContainer = document.createElement("div")
        textContainer.classList.add("text-container")

        let header = document.createElement("h5");
        header.classList.add("artifact-header");
        header.innerText = i.header.toUpperCase();
        textContainer.appendChild(header);

        let name = document.createElement("h2");
        name.classList.add("artifact-name");
        if (isLightMode) {
            name.classList.add("light");
        }
        name.innerText = i.artifactName.toUpperCase();
        textContainer.appendChild(name);

        let cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");

        let museum = document.createElement("h6");
        museum.classList.add("artifacte-subtitle");
        if (isLightMode) {
            museum.classList.add("light");
        }
        museum.innerText = i.category.toUpperCase();
        cardFooter.appendChild(museum);

        let iconBox = document.createElement("div");
        iconBox.classList.add("icon-box");

        let archiveIcon = document.createElement("i");
        archiveIcon.classList.add("fa-solid", "fa-box-archive", "archive-icon");
        if (isLightMode) {
            archiveIcon.classList.add("light");
        }
        if (isItemInStorage("archive", i.id)) {
            archiveIcon.classList.add("active-icon");
            if (isLightMode) {
                archiveIcon.classList.add("light");
            }
        }
        archiveIcon.onclick = () => {
            let log = localStorage.getItem("log");
            if (log === "loged") {
                if (archiveIcon.classList.contains("active-icon")) {
                    removeFromLocal("archive", i.id);
                    archiveIcon.classList.remove("active-icon");
                } else {
                    addToLocal("archive", i);
                    archiveIcon.classList.add("active-icon");
                }
            }
            else {
                window.location.href = "sign-up.html";
            }
        }
        iconBox.appendChild(archiveIcon);

        let HeartIcon = document.createElement("i");
        HeartIcon.classList.add("fa-solid", "fa-heart", "heart-icon");
        if (isLightMode) {
            HeartIcon.classList.add("light");
        }
        if (isItemInStorage("favorite", i.id)) {
            HeartIcon.classList.add("active-icon");
            if (isLightMode) {
                HeartIcon.classList.add("light");
            }
        }
        HeartIcon.onclick = () => {
            let log = localStorage.getItem("log");
            if (log === "loged") {
                if (HeartIcon.classList.contains("active-icon")) {
                    removeFromLocal("favorite", i.id);
                    HeartIcon.classList.remove("active-icon");
                } else {
                    addToLocal("favorite", i);
                    HeartIcon.classList.add("active-icon");
                }
            }
            else {
                window.location.href = "sign-up.html";
            }
        }
        iconBox.appendChild(HeartIcon);
        cardFooter.appendChild(iconBox);
        textContainer.appendChild(cardFooter);
        card.appendChild(textContainer);

        container.appendChild(card);
    }
}

function filterArtifacts(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach(button => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active-category");
        }
        else {
            button.classList.remove("active-category");
        }
    })


    let elements = document.querySelectorAll(".card")
    elements.forEach(e => {
        let x = value.replaceAll(" ", "-");
        if (value == "All Museums") {
            e.classList.remove("hide");
        }

        else if (e.classList.contains(x)) {
            e.classList.remove("hide");
        }
        else {
            e.classList.add("hide");
        }

    })
}

function showMethodActive(value) {
    let methods = document.querySelectorAll(".filter-show span");
    methods.forEach(method => {
        if (value.toUpperCase() == method.id.toUpperCase()) {
            method.classList.add("active-method");
        }
        else {
            method.classList.remove("active-method");
        }
    });
}

function cardDisplay(method) {
    let container = document.getElementById("artifacts-container")
    if (method.toLowerCase() == 'list') {
        container.classList.add("list");
    }
    else
        container.classList.remove("list");
}


window.onload = () => {
    loadArtifacts();
}

function searcher() {
    let searchValue = document.getElementById("search-input").value.toUpperCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        let name = card.querySelector(".artifact-name").innerText.toUpperCase();
        let museum = card.querySelector(".artifacte-subtitle").innerText.toUpperCase();

        if (name.includes(searchValue) || museum.includes(searchValue)) {
            card.classList.remove("hide");
        }
        else {
            card.classList.add("hide");
        }
        if (searchValue === "") {
            filterArtifacts("All Museums");
        }
    });
}
document.getElementById("search").addEventListener("click", searcher);
document.getElementById("search-input").addEventListener("keypress", (event) => {
    searcher();
});

function cardDisplay(method) {
    let container = document.getElementById("artifacts-container");
    if (method.toLowerCase() == 'list')
        container.classList.add("list");
    else
        container.classList.remove("list");
}


let search = document.querySelector(".search-window input");
function searchMod() {
    search.classList.toggle("light");
    document.querySelector(".search-header").classList.toggle("light");
    document.getElementById("search").classList.toggle("light");
    document.querySelectorAll(".heart-icon").forEach(e => {
        e.classList.toggle("light");
    });
    document.querySelectorAll(".archive-icon").forEach(e => {
        e.classList.toggle("light")
    });
    document.querySelectorAll(".card").forEach((card) => {
        card.classList.toggle("light");
    });
    let categories = document.querySelectorAll(".categories button");
    categories.forEach((category) => {
        category.classList.toggle("light");
    });
    let text = document.querySelectorAll(".artifact-name");
    text.forEach((txt) => {
        txt.classList.toggle("light");
    });
    let textS = document.querySelectorAll(".artifacte-subtitle");
    textS.forEach((txt) => {
        txt.classList.toggle("light");
    });
    let icons = document.querySelectorAll(".active-icon");
    icons.forEach((icon) => {
        icon.classList.toggle("light");
    });
    document.querySelector(".filter-show").classList.toggle("light");
    let spans = document.querySelectorAll(".filter-show span");
    spans.forEach((span) => {
        span.classList.toggle("light");
    });
}
if (search.classList.contains("light")) {
    let currenS = localStorage.setItem("searchMod", "light");
}
else {
    let currentS = localStorage.setItem("searchMod", "dark");
}
let savedS = localStorage.getItem("searchMod");
let savedMod = localStorage.getItem("theme");
if (savedS !== savedMod) {
    searchMod();
}