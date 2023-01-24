window.onload = () => {
    const player = document.getElementById("rig");
    const cursor = document.getElementById("js--cursor");
    const kids = document.getElementsByClassName("js--kid");
    const coins = document.getElementsByClassName("js--kid_quest");
    const coin_borders = document.getElementsByClassName("js--kid_quest_border");

    for(let i=0; i < kids.length; i++){
        var playerLocation = player.getAttribute("position");
        var kidLocation = kids[i].getAttribute("position");

        kids[i].onmouseenter = (event) => {
            // on hover
            coin_borders[i].setAttribute("visible", "true");
        }

        kids[i].onmouseleave = (event) => {
            // on hover leave
            coin_borders[i].setAttribute("visible", "false");
        }

        kids[i].onclick = (event) => {
            // on click
            if (playerLocation.distanceTo(kidLocation) < 3) {
                // start question
                coins[i].setAttribute("visible", "false");
            }
            
        }
        
    }

}

