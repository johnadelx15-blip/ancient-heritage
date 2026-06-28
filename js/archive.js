let archiveData = JSON.parse(localStorage.getItem("archive")) || [];

console.log(archiveData)
function isItemInStorage(key, id) {
    let savedItems = JSON.parse(localStorage.getItem(key)) || [];
    return savedItems.some(item => item.id === id);
}

function addToLocal(key, value) {
    let savedItems = JSON.parse(localStorage.getItem(key)) || []
    let isExist = false

    for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].id === value.id) {
            isExist = true;
            break;
        }
    }
    if (isExist)
        return

    savedItems.push(value)
    localStorage.setItem(key, JSON.stringify(savedItems))
}
function removeFromLocal(key, id) {
    let savedItems = JSON.parse(localStorage.getItem(key)) || [];
    let updatedItems = savedItems.filter(el => el.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedItems));
}

const container = document.getElementById("artifacts-container");
const col1 = document.createElement("div");
col1.classList.add("artifacts-col");
const col2 = document.createElement("div");
col2.classList.add("artifacts-col");
const col3 = document.createElement("div");
col3.classList.add("artifacts-col");

container.appendChild(col1);
container.appendChild(col2);
container.appendChild(col3);

const columns = [col1, col2, col3];
let colIndex = 0;

for (let i of archiveData) {

    let card = document.createElement("div");
    let x = (i.category || "").replaceAll(" ", "-");
    card.classList.add("card", x, i.artifactName.replaceAll(" ", "-"));

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    let image = document.createElement("img");
    let type = document.createElement("div");
    let typetext = document.createElement("p");
    typetext.innerText = i.type;
    type.appendChild(typetext);
    image.setAttribute("src", i.image);
    imgContainer.appendChild(type);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);

    let textContainer = document.createElement("div")
    textContainer.classList.add("text-container")

    let name = document.createElement("div");
    let nametext = document.createElement("p");
    name.classList.add("artifact-name");
    nametext.innerText = (i.artifactName);
    name.appendChild(nametext)
    textContainer.appendChild(name);

    let museum = document.createElement("h6")
    museum.classList.add("artifacte-subtitle")
    museum.innerText = (i.category).toUpperCase()
    textContainer.appendChild(museum)

    let dynasty = document.createElement("p")
    dynasty.classList.add("artifact-dynasty")
    dynasty.innerText = (i.dynasty).toUpperCase()
    textContainer.appendChild(dynasty)

    let removeIcon = document.createElement("div");
    removeIcon.innerHTML = `
        <svg viewBox="0 -960 960 960">
            <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
        </svg>`;
    removeIcon.style.cursor = "pointer";
    removeIcon.onclick = () => {
        removeFromLocal("archive", i.id);
        card.remove();
        check();
    };

    name.appendChild(removeIcon)
    card.appendChild(textContainer)

    columns[colIndex % 3].appendChild(card);
    colIndex++;
}

function quick(type) {
    let currentArchive = JSON.parse(localStorage.getItem("archive")) || [];
    for (let i of currentArchive) {
        let card = Array.from(document.getElementsByClassName(i.artifactName.replaceAll(" ", "-")));
        if (type === "all" || type.toUpperCase() === i.type.toUpperCase())
            card[0].classList.remove("hide");
        else
            card[0].classList.add("hide");
    }
    for (let i of document.querySelectorAll("#quick section")) {
        if (i.id === type)
            i.classList.add("active");
        else
            i.classList.remove("active");
    }
    check();
}

function redistributeCards() {
    const container = document.getElementById("artifacts-container");
    const cols = Array.from(container.querySelectorAll(".artifacts-col"));
    if (cols.length === 0) return;

    const allCards = Array.from(container.querySelectorAll(".card"));
    const visibleCards = allCards.filter(card => !card.classList.contains("hide"));
    const hiddenCards = allCards.filter(card => card.classList.contains("hide"));

    allCards.forEach(card => card.remove());

    let colIndex = 0;
    visibleCards.forEach(card => {
        cols[colIndex % 3].appendChild(card);
        colIndex++;
    });

    hiddenCards.forEach(card => {
        cols[0].appendChild(card);
    });
}

function check() {
    let remainingCards = document.querySelectorAll(".card:not(.hide)");
    const container = document.getElementById("artifacts-container");
    const emptyMessage = document.querySelector("h2.empty");
    if (emptyMessage) emptyMessage.remove();
    let currentArchive = JSON.parse(localStorage.getItem("archive")) || [];

    if (remainingCards.length === 0 && currentArchive.length === 0) {
        observer.disconnect();
        container.innerHTML = "<h2 class='empty'>archive is empty</h2>";
        container.classList.add("empty");
        document.querySelector("main").classList.add("empty");
    }
    else if (remainingCards.length === 0 && currentArchive.length > 0) {
        observer.disconnect();
        const empty = document.createElement("h2");
        empty.classList.add("empty");
        empty.innerText = "No elements with that tag";
        container.before(empty);
        container.classList.add("empty");
        document.querySelector("main").classList.add("empty");
    }
    else {
        observer.disconnect();
        container.classList.remove("empty");
        document.querySelector("main").classList.remove("empty");

        redistributeCards();
        observer.observe(container, {
            childList: true, attributes: true, subtree: true
        });
    }
}


let observer = new MutationObserver(() => {
    check();
});
observer.observe(document.getElementById("artifacts-container"), {
    childList: true, attributes: true, subtree: true
});
window.onload = check;


function searcher() {
    let searchValue = document.getElementById("search-bar").value.toUpperCase().trim();
    let cards = document.querySelectorAll(".card");

    if (searchValue === "") {
        cards.forEach((card) => card.classList.remove("hide"));
        return;
    }

    for (let card of cards) {
        let allText = Array.from(card.querySelectorAll(".text-container h6, p"));
        let isMatch = allText.some(el => el.innerText.toUpperCase().includes(searchValue));

        if (isMatch) {
            card.classList.remove("hide");
        } else {
            card.classList.add("hide");
        }
    } check();
}

document.getElementById("search-bar").addEventListener("keypress", (event) => {
    if (event.key === "Enter")
        searcher();
});



let cards = document.querySelectorAll(".card");
function archiveMod() {
    cards.forEach(e => {
        e.classList.toggle("light");
    })
}
let firstCard = document.querySelector(".card");
if (firstCard) {
    localStorage.setItem("archiveMod", firstCard.classList.contains("light") ? "light" : "dark");
    if (localStorage.getItem("archiveMod") !== localStorage.getItem("theme")) {
        archiveMod();
    }
}