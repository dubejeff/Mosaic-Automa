const regions = ["Italia", "Greece", "Assyria", "Egypt", "Numidia", "Gaul", "Hispania"]
const easyActions = [ "Build (Project)", "Build (City)", "Technology", "Technology", "Technology", "Tax & Tariff", "Population", "Military", "Reshuffle" ]
const moderateActions = [ "Build (Project)", "Build (City)", "Technology", "Technology", "Technology", "Tax & Tariff", "Population", "Military | Technology", "Reshuffle" ]
const challengingActions = [ "Build (Project)", "Build (City)", "Technology", "Technology", "Technology", "Tax & Tariff 2", "Population 2", "Military | Technology", "Reshuffle" ]
const expertActions = ["Build (Project)", "Build (City)", "Technology", "Technology", "Technology", "Tax & Tariff 2", "Population 2", "Military", "Reshuffle"]
const colors = ["Yellow", "Red", "Blue", "Green", "Violet", "Black"]
const leaders = ["Artist", "Engineer", "Farmer", "General", "Magistrate", "Merchant", "Philosopher", "Priestess", "Scribe"]
const greeceRegion = [{ "name": "Greece", "rotation": "<-", "priority": "Food > Idea > Stone" }, { "name": "Greece", "rotation": "->", "priority": "Stone > Idea > Food" }, { "name": "Greece", "rotation": "<-", "priority": "Idea > Stone > Food" }]
const assyriaRegion = [{ "name": "Assyria", "rotation": "<-", "priority": "Food > Stone > Idea" }, { "name": "Assyria", "rotation": "->", "priority": "Idea > Stone > Food" }, { "name": "Assyria", "rotation": "<-", "priority": "Stone > Idea > Food" }]
const numidiaRegion = [{ "name": "Numida", "rotation": "->", "priority": "Food > Stone > Idea" }, { "name": "Numidia", "rotation": "->", "priority": "Idea > Stone > Food" }, { "name": "Numidia", "rotation": "<-", "priority": "Stone > Idea > Food" }]
const egyptRegion = [{ "name": "Egypt", "rotation": "<-", "priority": "Food > Idea > Stone" }, { "name": "Egypt", "rotation": "->", "priority": "Stone > Idea > Food" }, { "name": "Egypt", "rotation": "<-", "priority": "Idea > Stone > Food" }]
const italiaRegion = [{ "name": "Italia", "rotation": "->", "priority": "Food > Stone > Idea" }, { "name": "Italia", "rotation": "->", "priority": "Idea > Stone > Food" }, { "name": "Italia", "rotation": "<-", "priority": "Stone > Idea > Food" }]
const hispaniaRegion = [{ "name": "Hispania", "rotation": "<-", "priority": "Food > Stone > Idea" }, { "name": "Hispania", "rotation": "->", "priority": "Idea > Stone > Food" }, { "name": "Hispania", "rotation": "<-", "priority": "Stone > Idea > Food" }]
const gaulRegion = [{ "name": "Gaul", "rotation": "->", "priority": "Food > Stone > Idea" }, { "name": "Gaul", "rotation": "->", "priority": "Idea > Stone > Food" }, { "name": "Gaul", "rotation": "<-", "priority": "Stone > Idea > Food" }]
const fewest = [{ "name": "Fewest", "rotation": "<-", "priority": "Idea > Stone > Food" }, { "name": "Fewest", "rotation": "->", "priority": "Stone > Idea > Food" }]
const reshuffleLocation = [{ "name": "Reshuffle", "rotation": "", "priority": "" }]

let players = []
let regionsAvailable = ["Italia", "Greece", "Assyria", "Egypt", "Numidia"]
let currentPlayer = 0;

class Player {
    constructor(name, color, leader, homeland, automa) {
        this.name = name;
        this.color = color;
        this.automa = automa;
        this.leader = leader;
        this.homeland = homeland;
        // only for automa
        this.secondaryRegion = "";
        this.actionDeck = [];
        this.actionDiscard = [];
        this.populationPlayed = false;
        this.taxTariffPlayed = false;
        this.locationDeck = [];
        this.locationDiscard = [];
    }

    shuffle(deck, reshuffle, lastCard) {
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
        let j = deck.length - (Math.floor(Math.random() * lastCard));
        deck.splice(j, 0, reshuffle);
    }

    prepareActionDeck() {
        // todo Implement Easy, Challenging and Expert
        this.actionDeck = [];
        for (let i = 0; i < moderateActions.length - 1; i++) {
            this.actionDeck.push(moderateActions[i]);
        }
        this.shuffle(this.actionDeck, moderateActions[moderateActions.length - 1], 2);
    }

    prepareLocationDeck() {
        var select = document.getElementById('numberOfAutoma');
        var numberOfAutoma = select.options[select.selectedIndex].value;
        var regionToRemove = 0;
        if (numberOfAutoma == 1) {
            regionToRemove = 2;
        }
        if (numberOfAutoma == 2) {
            regionToRemove = 1;
        }
        let localRegionsAvailable = [];
        for (let i = 0; i < regions.length - regionToRemove; i++) {
            localRegionsAvailable.push(regions[i]);
        }
        this.locationDeck = [];
        for (let i = 0; i < fewest.length; i++) {
            this.locationDeck.push(fewest[i]);
        }
        for (let i = 0; i < localRegionsAvailable.length; i++) {
            let tempRegion = [];
            if (localRegionsAvailable[i] == "Italia") {
                tempRegion = italiaRegion.slice();
            }
            if (localRegionsAvailable[i] == "Greece") {
                tempRegion = greeceRegion.slice();
            }
            if (localRegionsAvailable[i] == "Assyria") {
                tempRegion = assyriaRegion.slice();
            }
            if (localRegionsAvailable[i] == "Egypt") {
                tempRegion = egyptRegion.slice();
            }
            if (localRegionsAvailable[i] == "Numidia") {
                tempRegion = numidiaRegion.slice();
            }
            if (localRegionsAvailable[i] == "Gaul") {
                tempRegion = gaulRegion.slice();
            }
            if (localRegionsAvailable[i] == "Hispania") {
                tempRegion = hispaniaRegion.slice();
            }
            let iCard = Math.floor(Math.random() * tempRegion.length);
            let tempLocation = tempRegion.splice(iCard, 1);
            this.locationDeck.push(tempLocation[0]);
            iCard = Math.floor(Math.random() * tempRegion.length);
            tempLocation = tempRegion.splice(iCard, 1);
            this.locationDeck.push(tempLocation[0]);
            if (localRegionsAvailable[i] == this.homeland) {
                this.locationDeck.push(tempRegion.pop());
            }
        }
        this.shuffle(this.locationDeck, reshuffleLocation[0], 3);
    }

    reshuffleActionDeck() {
        while (this.actionDiscard.length > 1) {
            this.actionDeck.push(this.actionDiscard.splice(0, 1));
        }
        this.shuffle(this.actionDeck, this.actionDiscard.splice(0, 1), 2);
    }

    reshuffleLocationDeck() {
        while (this.locationDiscard.length > 1) {
            let card = this.locationDiscard.splice(0, 1);
            this.locationDeck.push(card[0]);
        }
        let card = this.locationDiscard.splice(0, 1);
        this.shuffle(this.locationDeck, card[0], 2);
    }

    drawAction() {
        let card = this.actionDeck.splice(1, 1);
        this.actionDiscard.push(card);
        if (card == "Reshuffle") {
            this.reshuffleActionDeck();
        }
        return card;
    }

    drawLocation() {
        let card = this.locationDeck.splice(1, 1);
        this.locationDiscard.push(card[0]);
        if (card[0].name == "Reshuffle") {
            this.reshuffleLocationDeck();
            card = this.locationDeck.splice(1, 1);
            this.locationDeck.push(card[0]);
        }
        return card;
    }

}

function startGameBtn() {
    var select = document.getElementById('numberOfAutoma');
    var numberOfAutoma = select.options[select.selectedIndex].value;
    select = document.getElementById('playerColor');
    var playerColor = select.options[select.selectedIndex].value;
    select = document.getElementById('playerLeader');
    var playerLeader = select.options[select.selectedIndex].value;
    select = document.getElementById('playerHomeland');
    var playerHomeland = select.options[select.selectedIndex].value;

    if (playerColor == -1) {
        playerColor = Math.floor(Math.random() * colors.length);
    }
    if (playerLeader == -1) {
        playerLeader = Math.floor(Math.random() * leaders.length);
    }
    if (playerHomeland == -1) {
        playerHomeland = Math.floor(Math.random() * regionsAvailable.length);
    }
    playerColor = colors.splice(playerColor, 1);
    playerLeader = leaders.splice(playerLeader, 1);
    playerHomeland = regionsAvailable.splice(playerHomeland, 1);
    players = [];
    let player = new Player("Player", playerColor[0], playerLeader[0], playerHomeland[0], false);
    players.push(player);

    let homeland = regionsAvailable.splice(Math.floor(Math.random() * regionsAvailable.length), 1);
    for (let i = 0; i < numberOfAutoma; i++) {
        let automaName = "Herobotus";
        automaName = automaName.concat(" ", i + 1);
        let color = colors.splice(Math.floor(Math.random() * colors.length), 1);
        let leader = leaders.splice(Math.floor(Math.random() * leaders.length), 1);
        player = new Player(automaName, color[0], leader[0], homeland[0], true);
        homeland = regionsAvailable.splice(Math.floor(Math.random() * regionsAvailable.length), 1);
        player.secondaryRegion = homeland[0];
        player.prepareActionDeck();
        player.prepareLocationDeck();
        players.push(player);
    }
    document.getElementById("SetupSection").style.display = "none";

    for (let i = 0; i < players.length; i++) {
        let trNode = document.createElement("tr");
        let tdNode = document.createElement("td");
        let spanNode = document.createElement("span");
        spanNode.className = "badge";
        spanNode.style.backgroundColor = players[i].color;
        spanNode.style.color = players[i].color;
        let textNode = document.createTextNode("O");
        spanNode.appendChild(textNode);
        tdNode.appendChild(spanNode);
        let text = " ";
        text = text.concat(players[i].name);
        textNode = document.createTextNode(text);
        tdNode.appendChild(textNode);
        trNode.appendChild(tdNode);
        tdNode = document.createElement("td");
        textNode = document.createTextNode(players[i].leader);
        tdNode.appendChild(textNode);
        trNode.appendChild(tdNode);
        tdNode = document.createElement("td");
        textNode = document.createTextNode(players[i].homeland);
        tdNode.appendChild(textNode);
        trNode.appendChild(tdNode);
        tdNode = document.createElement("td");
        textNode = document.createTextNode(players[i].secondaryRegion);
        tdNode.appendChild(textNode);
        trNode.appendChild(tdNode);
        document.getElementById("setupTable").appendChild(trNode);
    }

    currentPlayer = Math.floor(Math.random() * players.length);

    document.getElementById("herobotusSetup").style.display = "block";
}

function numberOfAutomaChange() {
    var select = document.getElementById('numberOfAutoma');
    var numberOfAutoma = select.options[select.selectedIndex].value;
    var regionToRemove = 0;
    if (numberOfAutoma == 1) {
        regionToRemove = 2;
    }
    if (numberOfAutoma == 2) {
        regionToRemove = 1;
    }

    regionsAvailable = [];
    for (let i = 0; i < regions.length - regionToRemove; i++) {
        regionsAvailable.push(regions[i]);
    }

    document.getElementById("playerHomeland").innerHTML = "";
    let optionNode = document.createElement("option");
    optionNode.value = -1;
    let textNode = document.createTextNode("Random");
    optionNode.appendChild(textNode);
    document.getElementById("playerHomeland").appendChild(optionNode);
    for (let i = 0; i < regionsAvailable.length; i++) {
        optionNode = document.createElement("option");
        optionNode.value = i;
        textNode = document.createTextNode(regionsAvailable[i]);
        optionNode.appendChild(textNode);
        document.getElementById("playerHomeland").appendChild(optionNode);
    }
}

function nextPlayer() {
    currentPlayer++;
    if (currentPlayer == players.length) {
        currentPlayer = 0;
    }
    let playerSection = document.getElementById("playerSection")
    if (playerSection.style.display == "none") {
        document.getElementById("herobotusSetup").style.display = "none";
        playerSection.style.display = "block";
    }

    let playerName = document.getElementById("playerName");
    playerName.innerHTML = players[currentPlayer].name;
    playerName.style.backgroundColor = players[currentPlayer].color;
    let actionDescription = "";
    if (players[currentPlayer].name != "Player") {
        let playerAction = players[currentPlayer].drawAction();
        document.getElementById("playerAction").innerHTML = playerAction;
        document.getElementById("locationBtn").disabled = false;
        "Build (Project)", "Build (City)", "Technology", "Technology", "Technology", "Tax & Tariff", "Population", "Military | Technology", "Reshuffle"
        if (playerAction == "Build (Project)") {
            actionDescription = "<p>SPEND 1 STONE OR PRODUCE STONE</p><ol><li>PROJECT & TOWN,</li><li>CITY & TOWN,</li><li>TOWN & PRODUCE 1 STONE</li></ol>";
        }
        if (playerAction == "Build (City)") {
            actionDescription = "<p>SPEND 1 STONE OR PRODUCE STONE</p><ol>><li>CITY & TOWN,</li><li>PROJECT & TOWN,</li<li>TOWN & PRODUCE 1 STONE</li></ol>";
        }
        if (playerAction == "Technology") {
            actionDescription = "<p>SPEND 1 IDEA OR PRODUCE IDEAS</p><ol><li>? VP + LEFT,</li><li>2/3 VP + LEFT,</li><li>MOST SYMBOLS + LEFT</li></ol>";
        }
        if (playerAction == "Tax & Tariff") {
            if (players[currentPlayer].populationPlayed) {
                // todo Location
                actionDescription = "<p>Add 1 Infantry</p>";
            } else {
                actionDescription = "<p>SPEND 1 FOOD OR PRODUCE FOOD</p><p>TAKE LOWEST UNREST TAX & TARIFF CARD</p>";
                players[currentPlayer].taxTariffPlayed = true;
            }
        }
        if (playerAction == "Population") {
            if (players[currentPlayer].taxTariffPlayed) {
                actionDescription = "<p>Add 1 Cavalry</p>";
            } else {
                actionDescription = "<p>SPEND 1 FOOD OR PRODUCE FOOD</p><p>TAKE HIGHEST POPULATION CARD</p>";
                players[currentPlayer].populationPlayed = true;
            }
        }
        if (playerAction == "Military | Technology") {
            actionDescription = '<p>ADD 1 INFANTRY AND 1 CAVALRY.</p><p>SPEND 1 IDEA OR PRODUCE IDEAS</p><ol><li>? VP + LEFT,</li><li>2/3 VP + LEFT,</li><li>MOST SYMBOLS + LEFT</li></ol>';
        }

        if (playerAction == "Reshuffle") {
            if (players[currentPlayer].leader == "General" || players[currentPlayer].leader == "Scribe") {
                actionDescription = "<p>ADD 1 INFANTRY AND 1 CAVALRY.</p>";
            }
            if (players[currentPlayer].leader == "Philosopher" || players[currentPlayer].leader == "Artist") {
                actionDescription = "<p>SPEND 1 IDEA OR PRODUCE IDEAS</p><ol><li>? VP + LEFT,</li><li>2/3 VP + LEFT,</li><li>MOST SYMBOLS + LEFT</li></ol>";
            }
            if (players[currentPlayer].leader == "Magistrate" || players[currentPlayer].leader == "Engineer") {
                actionDescription = "<p>SPEND 1 STONE OR PRODUCE STONE</p><ol><li>PROJECT & TOWN,</li><li>CITY & TOWN,</li><li>TOWN & PRODUCE 1 STONE</li></ol>";
            }
            if (players[currentPlayer].leader == "Merchant" || players[currentPlayer].leader == "Priestess") {
                actionDescription = "<p>COLLECT MONEY FROM HOLDING AREA PLUS 10 MONEY FROM SUPPLY.</p>";
            }
            if (players[currentPlayer].leader == "Farmer") {
                // todo Location
                actionDescription = "<p>PLACE 1 FARM TOWN</p>";
            }
            actionDescription = actionDescription.concat("<p></p><p>ALSO GAIN 1 RANDOM WONDER OR ACHIEVEMENT</p>");
        }
    } else {

        document.getElementById("locationBtn").disabled = true;
    }
    document.getElementById("playerActionDescription").innerHTML = actionDescription;
}

function locationBtn() {
    let card = players[currentPlayer].drawLocation();
    let text = card[0].name;
    text = text.concat(" ", card[0].rotation);
    text = text.concat(" / ", card[0].priority);

    document.getElementById("location").innerHTML = text;
}

document.getElementById("startGameBtn").addEventListener("click", startGameBtn);
document.getElementById("numberOfAutoma").addEventListener("change", numberOfAutomaChange);
document.getElementById("firstPlayer").addEventListener("click", nextPlayer);
document.getElementById("nextPlayer").addEventListener("click", nextPlayer);
document.getElementById("locationBtn").addEventListener("click", locationBtn);