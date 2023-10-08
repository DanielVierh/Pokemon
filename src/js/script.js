const menueButton = document.getElementById("btn_Menue");
const menueWindow = document.getElementById("windowMenu");
const menueCloseButton = document.getElementById("btnCloseMenue");
// const inx = document.getElementById("inx")
const startButton = document.getElementById("btnStartGame")

window.onload = init();


function init() {
    if(startButton) {
        startButton.addEventListener("click", ()=> {
            window.location = 'map1.html'
        })
    }
}



if(menueButton) {
    menueButton.addEventListener("click", ()=> {
        const is_blocked = menueButton.getAttribute('data-blocked');
        if(is_blocked !== 'true') {
            menueWindow.classList.add("active")
        }
    })
}


if(menueCloseButton) {
    menueCloseButton.addEventListener("click", ()=> {
            menueWindow.classList.remove("active")
    })
}
