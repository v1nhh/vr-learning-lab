window.onload = () => {
    const player = document.getElementById("rig");
    const kids = document.getElementsByClassName("js--kid");
    const coins = document.getElementsByClassName("js--kid_quest");
    const coin_borders = document.getElementsByClassName("js--kid_quest_border");

    const translating = document.getElementById("js--translating");
    const translation_active = document.getElementById("js--translation_active");
    const translation_background = document.getElementById("js--translation_background");

    const dialogue = document.getElementById("dialogue");


    var noors_text1 = "Hey, I am from Norway, would you like to play a game of hide and seek?";
    var noors_text2 = "You found me! Let’s play another round!";
    var noors_text3 = "That was fun! I am going to do something else now thanks for playing with me.";
    let norwegian_kid_progress = []


    // audio
    var noors1 = new Audio('assets/voices/Nordic-First.wav');
    var noors2 = new Audio('assets/voices/Nordic-Second.wav');
    var noors3 = new Audio('assets/voices/Nordic-Third.wav');

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
                switch (kids[i].id) {
                    case "noors":
                        if (!norwegian_kid_progress.includes(1)) {
                            translate(1);
                        }
                        break;
                }
                

            }
            
        }
        function translate(textnum) {
            eval("noors"+textnum).play();
            translating.setAttribute("visible", "true");
            setTimeout(function() {
                translating.setAttribute("visible", "false");
                translation_active.setAttribute("visible", "true");
                translation_background.setAttribute("visible", "true");
                dialogue.setAttribute("value", eval("noors_text"+textnum));
                dialogue.setAttribute("visible", "true");
                norwegian_kid_progress.push(textnum);
            },1000)
    
        }
        
    }

    

}

