const canvas = document.getElementById("canvas");

if(canvas) {
    canvas.width = 400
    canvas.height = 400

    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const image = new Image()
    image.src = './assets/main-map.png'

    const playerImage = new Image();
    playerImage.src = './assets/playerDown.png'

    image.onload = ()=> {
        ctx.drawImage(image, 10, -700)
        setTimeout(() => {
            ctx.drawImage(
                playerImage,
                0,
                0,
                playerImage.width / 3,
                playerImage.height,
                canvas.width / 2 - playerImage.width / 3,
                canvas.height / 2 - playerImage.height / 2,
                playerImage.width / 3,
                playerImage.height
        )}, 10);
    }


}
