let user = JSON.parse(localStorage.getItem("user"));
let Button = document.getElementById("sign-btn");
let Icon = document.getElementById("icon");
if(user){
    Icon.style.display="block";
    Button.style.display="none";
}
