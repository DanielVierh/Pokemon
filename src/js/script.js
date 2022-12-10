const menueButton = document.getElementById("btn_Menue");
const menueWindow = document.getElementById("windowMenu");
const menueCloseButton = document.getElementById("btnCloseMenue");
const inx = document.getElementById("inx")

window.onload = init();


function init() {
    if(inx) {
        window.location = 'battle.html'
    }
}



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
