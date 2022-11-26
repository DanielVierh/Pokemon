const menueButton = document.getElementById("btn_Menue");
const menueWindow = document.getElementById("windowMenu");
const menueCloseButton = document.getElementById("btnCloseMenue");






if(menueButton) {
    menueButton.addEventListener("click", ()=> {
            menueWindow.classList.add("active")
    })
}


if(menueCloseButton) {
    menueCloseButton.addEventListener("click", ()=> {
            menueWindow.classList.remove("active")
    })
}
