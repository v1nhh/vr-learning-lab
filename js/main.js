window.onload = () => {
    let player = document.getElementById("rig");
    let kids = document.getElementsByClassName("js--kid");
    const coins = document.getElementsByClassName("js--kid_quest");
    const coin_borders = document.getElementsByClassName("js--kid_quest_border");

    const translating = document.getElementById("js--translating");
    const translation_active = document.getElementById("js--translation_active");
    const translation_background = document.getElementById("js--translation_background");

    // dialoog en dergelijke
    let quest1_dialogue = document.getElementById("quest1_dialogue");
    let quest2_dialogue = document.getElementById("quest2_dialogue");
    let quest3_dialogue = document.getElementById("quest3_dialogue");
    const speech_bubble2 = document.getElementById("speech_bubble2");
    const speech_bubble3 = document.getElementById("speech_bubble3");

    // 3 kinderen ("quests"): Noors kind (quest1), Tim (quest2), kapitalistisch meisje (quest3)

    var quest1_text1 = "Hey, I am from Norway, would you like to play a game of hide and seek?"
    var quest1_question = "Would you like to play hide and seek?"
    var quest1_answer1 = "Yes, of course!"
    var quest1_answer1_text1 = "You found me! Let’s play another round!"
    var quest1_answer1_text2 = "That was fun! I am going to do something else now thanks for playing with me."
    var quest1_answer2 = "Maybe later..."

    var quest2_text1 = "It is not fair! All of my friends are looking at the AR-animals, but I do not have smart glasses!\n\nCan I borrow yours to see them?"
    var quest2_question = "Will you lend your glasses to Tim?"
    var quest2_answer1 = "Yes, you can borrow them for a little while!"
    var quest2_answer1_text1 = "Thank you! I will have a quick look. Wait for me here by the swings."
    var quest2_answer1_text2 = "Those animals are awesome! Thanks for letting me borrow your glasses. I wish I had such cool glasses."
    var quest2_answer2 = "I'm sorry, I'd rather not let other people use them." 
    var quest2_answer2_text1 = "Nobody will let me use their glasses... It is not fair, only because mom says we do not have money for these glasses."

    var quest3_text1 = "Unfortunately I don't have AR-glasses. But it doesn't matter, I prefer my Pop-it anyway."
    var quest3_question = "Would you like to have a fidget too?"
    var quest3_answer1 = "Yes, I would like a Pop-it too!"
    var quest3_answer1_text1 = "The SuperO sells them for a discount this week! If you buy one, I would love to see it."
    var quest3_answer2 = "Yes, I would like to have a fidget-cube!"
    var quest3_answer2_text1 = "Oh I like those as well! What colour would you pick? A blue one?"
    var quest3_answer3 = "Yes, I would like a fidget-spinner!"
    var quest3_answer3_text1 = "Fidget-spinners are so cool! Sadly, mine broke during the holidays. Maybe we could buy a new one together sometime."
    var quest3_answer4 = "No, because I have these amazing AR-glasses."
    var quest3_answer4_text1 = "Oh... of course. You should try this as well, it works very calming."

    let quest1_progress = 0
    let quest2_progress = 0
    let quest3_progress = 0

    // audio
    var noors1 = new Audio('assets/voices/Nordic-First.wav');
    var noors2 = new Audio('assets/voices/Nordic-Second.wav');
    var noors3 = new Audio('assets/voices/Nordic-Third.wav');

    for(let i=0; i < kids.length; i++){

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
            var playerLocation = player.getAttribute("position");
            var kidLocation = kids[i].parentElement.getAttribute("position");
            if (playerLocation.distanceTo(kidLocation) < 3) {
                // start question
                coins[i].setAttribute("visible", "false");
                // if (!quest_progress.includes(1)) {
                //     translate(1);
                // }

                interact(i+1);

            }
            
        }

        function interact(questnum) {
            if (questnum == 1) {
                translate()
            } else {
                let quest = "quest"+questnum;
                console.log(quest);
                let speech = eval(quest+"_dialogue");
                let quest_dialogue = eval(quest+"_text1");
                speech.setAttribute("value", quest_dialogue);
                eval("speech_bubble"+questnum).setAttribute("visible", "true");
            }
        }

        function translate() {
            let textnum = quest1_progress + 1;
            eval("quest1"+textnum).play();
            translating.setAttribute("visible", "true");
            setTimeout(function() {
                translating.setAttribute("visible", "false");
                translation_active.setAttribute("visible", "true");
                translation_background.setAttribute("visible", "true");
                quest1_dialogue.setAttribute("value", eval("quest1_text"+textnum));
                quest1_dialogue.setAttribute("visible", "true");
                quest1_progress++;
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
        percentages: [76, 24],
    }

    var results_quest2 = {
        choices_amount: 2,
        choices_in_title: ["to lend your glasses to Tim", "not to lend your glasses to Tim"],
        choices_in_graph: ["Lend glasses", "Don't lend glasses"],
        percentages: [83, 17],
    }

    var results_quest3 = {
        choices_amount: 4,
        choices_in_title: ["to say you'd like a Pop-it", "to say you'd like a fidget-cube", "to say you'd like a fidget-spinner", "to say you don't need a fidget (because of your awesome AR-glasses)"],
        choices_in_graph: ["Pop-it", "Fidget-cube", "Fidget-spinner", "No fidget"],
        percentages: [27, 15, 34, 24],
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

function welVerstoppertje() {
  console.log("banaan");
  document.getElementById("varken").style.visibility = "hidden";
}
