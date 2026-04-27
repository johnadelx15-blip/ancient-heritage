let user = JSON.parse(localStorage.getItem("user"));
let Button = document.getElementById("sign-btn");
let Icon = document.getElementById("icon");
if (user) {
    Icon.style.display = "block";
    Button.style.display = "none";
}

function changeMod() {
    let circle = document.querySelector(".span1");
    let left = circle.style.left;
    let right = circle.style.right;
    let moon = document.querySelector(".moon");
    let sun = document.querySelector(".sun");
    let moon2 = document.querySelector(".moon2");
    let sun2 = document.querySelector(".sun2");
    let nav = document.querySelector(".nav-bar");
    let links = document.querySelectorAll(".nav-links a")
    let footer = document.querySelector(".footer");
    let background = document.body;
    let color = window.getComputedStyle(background).backgroundColor;
    if ( left !== "5px") {
        sun2.style.scale = "0";
        circle.style.left = "5px";
        moon.style.scale = "0";
        background.style.backgroundColor = "var(--background-light)";
        nav.style.backgroundColor = "var(--navBar-color-light)";
        nav.style.color = "var(--big-text-light)"
        footer.style.backgroundColor = "var(--footer-light)";
        links.forEach(e =>{
            if (window.getComputedStyle(e).color === "rgb(231, 192, 117)"){
                e.style.color = "var(--active-text)";
            }
            else {
                e.style.color = "var(--text-light)";
            }
        })
        setTimeout(()=>{
            moon2.style.scale = "1";
            sun.style.scale = "1";
        }, 100)
    }
    else {
        circle.style.left = "calc(100% - 45px)";
        moon2.style.scale = "0";
        sun.style.scale = "0";
        background.style.backgroundColor = "var(--background-dark)";
        nav.style.backgroundColor = "var(--navBar-color-dark)";
        nav.style.color = "var(--golden-color)"
        footer.style.backgroundColor = "var(--navBar-color-dark)";
        links.forEach(e =>{
            if (window.getComputedStyle(e).color === "rgb(152, 120, 34)"){
                e.style.color = "var(--golden-color)";
            }
            else {
                e.style.color = "var(--text-dark)";
            }
        })
        setTimeout(()=>{
            sun2.style.scale = "1";
            moon.style.scale = "1";
        }, 100)
    }
}
