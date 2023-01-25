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

    // resultaten
    let resultscreen = document.getElementById("js--resultscreen");
    let frame = document.getElementById("js--results_frame");
    let title = document.getElementById("js--results_title");
    let columns = document.getElementsByClassName("results_column");
    let graphs = document.getElementsByClassName("graph");
    let graph_percentages = document.getElementsByClassName("percentage_in_graph");
    let choices = document.getElementsByClassName("choice");
    

    var results_quest1 = {
        choices_amount: 2,
        choices_in_title: ["to play hide and seek", "not to play hide and seek"],
        choices_in_graph: ["Play", "Don't play"],
        percentages: [80, 20],
    }

    var results_quest2 = {
        choices_amount: 3,
        choices_in_title: ["to A", "to B", "to C"],
        choices_in_graph: ["A", "B", "C"],
        percentages: [33, 21, 46],
    }

    function getResultScreen(questnum, player_choice) {
        var questdata = eval("results_quest" + questnum);
        let choices_amount = questdata.choices_amount;
        let frame_width = frame.getAttribute("width");
        let column_width = frame_width / choices_amount;

        let chosen_choice = questdata.choices_in_title[player_choice];
        let chosen_pct = questdata.percentages[player_choice];
        let title_template = `You and ${chosen_pct}% of players chose ${chosen_choice}. Others chose:`
        title.setAttribute("value", title_template);
        graphs[player_choice].setAttribute("color", "green");

        for(let i=0; i < choices_amount; i++){
            columns[i].setAttribute("visible", "true");

            let x = column_width * (i + 0.5) - (frame_width / 2)
            let y = -.25

            let height = questdata.percentages[i] / 200;
            graphs[i].setAttribute("height", height);
            graphs[i].setAttribute("width", 0.6 / choices_amount);

            let newposition = `${x} ${y + (height / 2)} .001`;
            columns[i].setAttribute("position", newposition);

            graph_percentages[i].setAttribute("value", questdata.percentages[i]+"%");
            choices[i].setAttribute("value", questdata.choices_in_graph[i]);
            let newtextposition = `0 ${-height/2 -.1} 0`;
            choices[i].setAttribute("position", newtextposition);
        }
    }
    
    getResultScreen(1,0);
    
}

