var selectedInitiativeCards = [];
var eventCardQuantity = 2;
var initiativeDeck = [];
var initiativeDeckPool = [];
var eventDeck = [];
var eventDeckPool = [];
var selectedEventDecks = [];
var selectedEventCards = [];

function toggleSetup() {
    var setupArea = document.querySelector('.setup-area');
    var setupHeader = document.querySelector('.setup-header');

    if (setupArea.style.display === "none") {
        setupArea.style.display = "block";
        setupHeader.innerHTML = "Hide Setup -";
    }
    else {
        setupArea.style.display = "none";
        setupHeader.innerHTML = "Show Setup +";
    }
}

/* function addToSelectedEvents() {
    var selectedEventDeck = document.getElementById('selectEvents').value;
    if (selectedEventDecks.includes(selectedEventDeck)) {
        return;
    }
    selectedEventDecks.push(selectedEventDeck);
    console.log(selectedEventDecks);

    document.getElementById('selectedEvents').innerHTML = selectedEventDecks.join(", ");
}

function removeFromSelectedEvents() {
    var selectedEventDeck = document.getElementById('selectEvents').value;
    if (!selectedEventDecks.includes(selectedEventDeck)) {
        return;
    }
    selectedEventDecks = selectedEventDecks.filter(deck => { return deck !== selectedEventDeck });

    document.getElementById('selectedEvents').innerHTML = selectedEventDecks.join();
}

function addToSelectedInitiatives() {
    var selectedInitiative = document.getElementById('selectInitiatives').value;
    if (selectedInitiativeCards.includes(selectedInitiative)) {
        return;
    }
    selectedInitiativeCards.push(selectedInitiative);

    document.getElementById('selectedInitiatives').innerHTML = selectedInitiativeCards.join(", ");
}

function removeFromSelectedInitiatives() {
    var selectedInitiative = document.getElementById('selectInitiatives').value;
    if (!selectedInitiativeCards.includes(selectedInitiative)) {
        return;
    }
    selectedInitiativeCards = selectedInitiativeCards.filter(card => { return card !== selectedInitiative });

    document.getElementById('selectedInitiatives').innerHTML = selectedInitiativeCards.join(", ");
}

// Setup the Event deck based on the specified parameters
function setupEventDeck() {
    document.querySelector('.event-cards').innerHTML = '';

    eventDeck = [];
    selectedEventCards = [];
    selectedEventDecks.forEach(deck => {
        var filteredCards = eventCards.filter((card) => { return card.type === deck; });
        selectedEventCards.push(...filteredCards);
    });

    if (selectedEventCards.length === 0) {
        return;
    }

    eventDeck = shuffleCards(selectedEventCards.slice());
    eventDeckPool = eventDeck.slice();
    document.querySelector('.event-deck-quantity').innerHTML = eventDeck.length;
}

// Setup the Initiative deck based on the specified parameters
function setupInitiativeDeck() {
    document.querySelector('.initiative-cards').innerHTML = '';

    initiativeDeck = [];
    var selectedInitiativeDeck = [];
    selectedInitiativeCards.forEach(selectedCard => {
        selectedInitiativeDeck.push(`${selectedCard}.png`);
    });

    // If we aren't adding events, just assign the selected cards to the active initiative deck
    eventCardQuantity = parseInt(document.getElementById('selectEventCardQuantity').value);

    if (eventCardQuantity > 0) {
        for (var i = 0; i < eventCardQuantity; i++) {
            selectedInitiativeDeck.push(`initiative${i+1}.png`);
        }
    }

    initiativeDeck = shuffleCards(selectedInitiativeDeck.slice());
    initiativeDeckPool = initiativeDeck.slice();
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length;

    initiativeDeck = shuffleCards(initiativeDeckPool.slice());
    initiativeDeckPool = initiativeDeck.slice();
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length; 
} */

function addEventToInitiativeDeck() {
    var eventCount = initiativeDeckPool.filter(card => { return card.includes('initiative'); }).length;
    if (eventCount > 4) {
        return;
    }

    initiativeDeck.push(`initiative${eventCount+1}.png`);
    initiativeDeckPool.push(`initiative${eventCount+1}.png`);
    initiativeDeck = shuffleCards(initiativeDeck.slice());
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length;
    document.querySelector('.initiative-event-quantity').dataset.quantity = eventCount + 1;
}

function addEventToInitiativeDiscard() {
    var eventCount = initiativeDeckPool.filter(card => { return card.includes('initiative'); }).length;
    if (eventCount > 4) {
        return;
    }

    initiativeDeckPool.push(`initiative${eventCount+1}.png`);
    document.querySelector('.initiative-event-quantity').dataset.quantity = eventCount + 1;
}

function removeEventFromInitiativeDeck() {
    var eventCount = initiativeDeckPool.filter(card => { return card.includes('initiative'); }).length;
    if (eventCount < 1) {
        return;
    }

    initiativeDeckPool.splice(initiativeDeckPool.findIndex(card => { return card.includes('initiative'); }), 1);

    var eventIndex = initiativeDeck.findIndex(card => { return card.includes('initiative'); });

    if (eventIndex >= 0) {
        initiativeDeck.splice(eventIndex, 1);
    }
    
    document.querySelector('.initiative-event-quantity').dataset.quantity = eventCount - 1;
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length;
}

function shuffleInitiativeDeck() {
    initiativeDeck = shuffleCards(initiativeDeck.slice());
}

function shuffleAllInitiativeCards() {
    initiativeDeck = shuffleCards(initiativeDeckPool.slice());
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length;
    document.querySelector('.initiative-cards').innerHTML = '';
}

function shuffleEventDeck() {
    eventDeck = shuffleCards(eventDeck.slice());
}

function shuffleAllEventCards() {
    eventDeck = shuffleCards(eventDeckPool.slice());
    document.querySelector('.event-deck-quantity').innerHTML = eventDeck.length;
    document.querySelector('.event-cards').innerHTML = '';
}

function drawInitiativeCard() {
    var initiativeCards = document.querySelector('.initiative-cards');
    var initiativeDrawn = initiativeDeck.pop();
    console.log(initiativeDrawn);
    if (!initiativeDrawn) {
        return;
    }

    var initiativeImage = document.createElement('img');
    initiativeImage.src = `images/initiative/${initiativeDrawn}`;
    initiativeCards.appendChild(initiativeImage);
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length;
}

function drawEventCard() {
    var eventCards = document.querySelector('.event-cards');
    var eventDrawn = eventDeck.pop();
    var eventImage = document.createElement('img');
    eventImage.src = `images/events/${eventDrawn.image}`;
    eventImage.role = 'button';
    eventImage.dataset.filename = eventDrawn.image;

    eventImage.addEventListener('click', burnEventCard);
    eventImage.addEventListener('contextmenu', unburnEventCard);
    eventImage.addEventListener('middleclick', moveEventToActivePool);

    eventCards.prepend(eventImage);
    document.querySelector('.event-deck-quantity').innerHTML = eventDeck.length;
}

function burnEventCard(e, image) {
    e.preventDefault();

    if (e.target.src.includes('resolved')) {
        moveEventToActivePool(e);
        return;
    }

    e.target.src = "images/events/resolved.png";
    eventDeckPool = eventDeckPool ? eventDeckPool.filter(card => { return card.image !== e.target.dataset.filename; }) : [];
}

function unburnEventCard(e, image) {
    e.preventDefault();
    e.target.src = `images/events/${e.target.dataset.filename}`;
    eventDeckPool.push({ image: e.target.dataset.filename });
}

function moveEventToActivePool(e, image) {
    e.preventDefault();
    e.target.src = `images/events/${e.target.dataset.filename}`;
    eventDeckPool = eventDeckPool ? eventDeckPool.filter(card => { return card.image !== e.target.dataset.filename; }) : [];    
    document.querySelector('.active-event-cards').appendChild(e.target);
}

function createRandomSetup() {
    var initiativeCardOptions = document.getElementById('selectInitiatives').options;
    var arr = [];
    while(arr.length < 8) {
        var r = Math.floor(Math.random() * initiativeCardOptions.length);
        if(arr.indexOf(r) === -1) arr.push(r);
    }

    for (var i = 0; i < arr.length; i++) {
        selectedInitiativeCards.push(initiativeCardOptions[arr[i]].value);
    }
    eventCardQuantity = 2;
    document.getElementById('selectEventCardQuantity').value = 2;


    var eventDeckOptions = document.getElementById('selectEvents').options;
    arr = [];
    while(arr.length < 5) {
        var r = Math.floor(Math.random() * eventDeckOptions.length);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    selectedEventDecks = [];

    for (var i = 0; i < arr.length; i++) {
        selectedEventDecks.push(eventDeckOptions[arr[i]].value);
    }

    setupInitiativeDeck();
    setupEventDeck();
}

function shuffleCards(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

var heroInitiativeCards = [
    {
        name: 'Michelangelo',
        image: 'Michelangelo.png'
    },
    {
        name: 'Donatello',
        image: 'Donatello.png'
    },
    {
        name: 'Leonardo',
        image: 'Leonardo.png'
    },
    {
        name: 'Raphael',
        image: 'Raphael.png'
    },
    {
        name: 'Casey Jones',
        image: 'Casey Jones.png'
    },
    {
        name: 'April O\'Neil',
        image: 'April ONeil.png'
    },
    {
        name: 'Splinter',
        image: 'Splinter.png'
    },
    {
        name: 'Baxter',
        image: 'Baxter hero.png'
    },
    {
        name: 'Bebop',
        image: 'Bebop hero.png'
    },
    {
        name: 'Rocksteady',
        image: 'Rocksteady hero.png'
    },
    {
        name: 'Stan Saki Donatello',
        image: 'Donatello alt.png'
    },
    {
        name: 'Stan Saki Leonardo',
        image: 'Leonardo alt.png'
    },
    {
        name: 'Stan Saki Michelangelo',
        image: 'Michelangelo alt.png'
    },
    {
        name: 'Stan Saki Raphael',
        image: 'Raphael alt.png'
    },
    {
        name: 'The Foot Clan',
        image: 'Foot Clan.png'
    },
    {
        name: 'Hamato Sons',
        image: 'Hamato Sons.png'
    },
    {
        name: 'Hamato Yoshi',
        image: 'Hamato Yoshi.png'
    },
    {
        name: 'Herman',
        image: 'Herman.png'
    },
    {
        name: 'Hun',
        image: 'Hun hero.png'
    },
    {
        name: 'Karai',
        image: 'Karai hero.png'
    },
    {
        name: 'Koya',
        image: 'Koya.png'
    },
    {
        name: 'Man Ray',
        image: 'Man Ray.png'
    },
    {
        name: 'Michelangelo Mutanimal',
        image: 'Michelangelo mutanimal.png'
    },
    {
        name: 'Mondo Gecko',
        image: 'Mondo Gecko.png'
    },
    {
        name: 'Old Hob',
        image: 'Old Hob hero.png'
    },
    {
        name: 'Old Hob Mutanimal',
        image: 'Old Hob mutanimal.png'
    },
    {
        name: 'Oroku Saki',
        image: 'Oroku Saki.png'
    },
    {
        name: 'Pigeon Pete',
        image: 'Pigeon Pete.png'
    },
    {
        name: 'Purple Dragons',
        image: 'Purple Dragon hero.png'
    },
    {
        name: 'Loner Raph',
        image: 'Raphael loner.png'
    },
    {
        name: 'Sally Pride',
        image: 'Sally Pride.png'
    },
    {
        name: 'Slash',
        image: 'Slash.png'
    },
    {
        name: 'Shredder',
        image: 'Shredder hero.png'
    },
    {
        name: 'Usagi',
        image: 'Usagi.png'
    },
    {
        name: 'Jennika',
        image: 'Jennika.png'
    },
    {
        name: 'Metalhead',
        image: 'Metalhead hero.png'
    },
    {
        name: 'Angel Bridge',
        image: 'Angel Bridge.png'
    }
]

var villainInitiativeCards = [
    {
        name: 'Foot Leader Alopex',
        image: 'Alopex.png'
    },
    {
        name: 'Stockgen Leader Baxter',
        image: 'Baxter.png'
    },
    {
        name: 'Foot Leader Bebop & Rocksteady',
        image: 'Bebop and Rocksteady.png'
    },
    {
        name: 'Foot Leader Bebop',
        image: 'Bebop.png'
    },
    {
        name: 'Foot Leader Rocksteady',
        image: 'Rocksteady.png'
    },
    {
        name: 'Deviations Donatello',
        image: 'Donatello villain.png'
    },
    {
        name: 'Deviations Leonardo',
        image: 'Leonardo villain.png'
    },
    {
        name: 'Deviations Michelangelo',
        image: 'Michelangelo villain.png'
    },
    {
        name: 'Deviations Raphael',
        image: 'Raphael villain.png'
    },
    {
        name: 'Foot Leader Leonardo',
        image: 'Leonardo Chunin.png'
    },
    {
        name: 'Stockgen Minion Flyborgs',
        image: 'Flyborgs.png'
    },
    {
        name: 'Stockgen Minion Flying Mouser',
        image: 'Flying Mouser.png'
    },
    {
        name: 'Foot Minion Assassin',
        image: 'Foot Assassin.png'
    },
    {
        name: 'Foot Minion Bruiser',
        image: 'Foot Bruiser.png'
    },
    {
        name: 'Foot Minion Elite',
        image: 'Foot Elite.png'
    },
    {
        name: 'Foot Minion Elite',
        image: 'Foot Elite alt.png'
    },
    {
        name: 'Foot Minion Ninja',
        image: 'Foot Ninja.png'
    },
    {
        name: 'Foot Minion Ninja',
        image: 'Foot Ninja alt.png'
    },
    {
        name: 'Purple Dragon Leader Hun',
        image: 'Hun.png'
    },
    {
        name: 'Foot Leader Karai',
        image: 'Karai.png'
    },
    {
        name: 'Unaffiliated Leader Kitsune',
        image: 'Kitsune.png'
    },
    {
        name: 'Foot Clan Koya',
        image: 'Koya villain.png'
    },
    {
        name: 'Unaffiliated Leader Krang',
        image: 'Krang.png'
    },
    {
        name: 'Unaffiliated Leader Leatherhead',
        image: 'Leatherhead.png'
    },
    {
        name: 'Stockgen Minion Mega Mouser',
        image: 'Mega Mouser.png'
    },
    {
        name: 'Unaffiliated Leader Metalhead',
        image: 'Metalhead.png'
    },
    {
        name: 'Stockgen Minion Mouser',
        image: 'Mouser.png'
    },
    {
        name: 'Unaffiliated Leader Old Hob',
        image: 'Old Hob.png'
    },
    {
        name: 'Purple Dragon Minion',
        image: 'Purple Dragon.png'
    },
    {
        name: 'Unaffiliated Leader Rahzar',
        image: 'Rahzar.png'
    },
    {
        name: 'Unaffiliated Leader Rat King',
        image: 'Rat King.png'
    },
    {
        name: 'Unaffiliated Leader Savage Slash',
        image: 'Savage Slash.png'
    },
    {
        name: 'Savate Minion Ninja',
        image: 'Savate Ninja.png'
    },
    {
        name: 'Unaffiliated Leader Scratch',
        image: 'Scratch.png'
    },
    {
        name: 'Foot Clan Leader Shredder',
        image: 'Shredder.png'
    },
    {
        name: 'Stockgen Leader Stockman Fly',
        image: 'Stockman Fly.png'
    },
    {
        name: 'Unaffiliated Leader Stranger',
        image: 'Stranger.png'
    },
    {
        name: 'Unaffiliated Leader Stranger',
        image: 'Stranger alt.png'
    },
    {
        name: 'Unaffiliated Leader Stranger',
        image: 'Stranger alt2.png'
    },
    {
        name: 'Unaffiliated Minion Thug Brawler',
        image: 'Thug Brawler.png'
    },
    {
        name: 'Unaffiliated Minion Thug Gunner',
        image: 'Thug Gunner.png'
    },
    {
        name: 'Unaffiliated Leader Tokka',
        image: 'Tokka.png'
    },
    {
        name: 'Unaffiliated Leader Wyrm',
        image: 'Wyrm.png'
    },
    {
        name: 'Savate Leader Victor',
        image: 'Victor.png'
    }
];

var eventCards = [
    {
        name: 'Event!',
        description: '',
        image: 'base1.png',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base2.png',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base3.png',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base4.png',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base5.png',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base6.png',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base7.png',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base8.png',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base9.png',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero1.png',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero2.png',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero3.png',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero4.png',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero5.png',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero6.png',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero7.png',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero8.png',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionred1.png',
        deck: 'Red Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionred2.png',
        deck: 'Red Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionred3.png',
        deck: 'Red Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionred4.png',
        deck: 'Red Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue1.png',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue2.png',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue3.png',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue4.png',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue5.png',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue6.png',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mixed1.png',
        deck: 'Mixed Leader/Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mixed2.png',
        deck: 'Mixed Leader/Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mixed3.png',
        deck: 'Mixed Leader/Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mixed4.png',
        deck: 'Mixed Leader/Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'leaderpurple1.png',
        deck: 'Leader'
    },
    {
        name: 'Event!',
        description: '',
        image: 'leaderpurple2.png',
        deck: 'Leader'
    },
    {
        name: 'Event!',
        description: '',
        image: 'leaderpurple3.png',
        deck: 'Leader'
    },
    {
        name: 'Event!',
        description: '',
        image: 'leaderpurple4.png',
        deck: 'Leader'
    },
    {
        name: 'Event!',
        description: '',
        image: 'footclan1.png',
        deck: 'Foot Clan'
    },
    {
        name: 'Event!',
        description: '',
        image: 'footclan2.png',
        deck: 'Foot Clan'
    },
    {
        name: 'Event!',
        description: '',
        image: 'footclan3.png',
        deck: 'Foot Clan'
    },
    {
        name: 'Event!',
        description: '',
        image: 'footclan4.png',
        deck: 'Foot Clan'
    },
    {
        name: 'Event!',
        description: '',
        image: 'beboprocksteady1.png',
        deck: 'Bebop and Rocksteady'
    },
    {
        name: 'Event!',
        description: '',
        image: 'beboprocksteady2.png',
        deck: 'Bebop and Rocksteady'
    },
    {
        name: 'Event!',
        description: '',
        image: 'baxter1.png',
        deck: 'Baxter'
    },
    {
        name: 'Event!',
        description: '',
        image: 'baxter2.png',
        deck: 'Baxter'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mutanimals1.png',
        deck: 'Mutanimals'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mutanimals2.png',
        deck: 'Mutanimals'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mutanimals3.png',
        deck: 'Mutanimals'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mutanimals4.png',
        deck: 'Mutanimals'
    },
    {
        name: 'Event!',
        description: '',
        image: 'shredder1.png',
        deck: 'Shredder'
    },
    {
        name: 'Event!',
        description: '',
        image: 'shredder2.png',
        deck: 'Shredder'
    },
    {
        name: 'Event!',
        description: '',
        image: 'oldhob1.png',
        deck: 'Old Hob'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hun1.png',
        deck: 'Hun'
    }
];

// Initialize web app

window.onload = function () {
    var heroInitiativeArea = document.querySelector('.hero-initiatives');
    var villainInitiativeArea = document.querySelector('.villain-initiatives');

    loadInitiatives(villainInitiativeCards, villainInitiativeArea);
    loadInitiatives(heroInitiativeCards, heroInitiativeArea);

    loadEvents();
}

function loadEvents(eventArea) {
    var eventDeckOptionsArea = document.querySelector('.event-deck-options');

    var eventDeckOptions = [];

    eventCards.forEach((eventCard) => {
        if (eventDeckOptions.includes(eventCard.deck)) {
            return;
        }

        eventDeckOptions.push(eventCard.deck);
    });

    eventDeckOptions.forEach(eventDeck => {
        var eventDeckCheckbox = document.createElement('input');
        eventDeckCheckbox.type = 'checkbox';
        eventDeckCheckbox.id = eventDeck;
        eventDeckCheckbox.name = eventDeck;
        
        var eventDeckLabel = document.createElement('label');
        eventDeckLabel.htmlFor = eventDeck;
        eventDeckLabel.innerHTML = eventDeck;

        eventDeckLabel.addEventListener('click', function (e) {
            e.preventDefault();

            var eventDeckButton = e.target;
            if (eventDeckButton.classList.contains('selected')) {
                removeEventDeckFromPool(eventDeck);
                eventDeckButton.classList.remove('selected');
            }
            else {
                addEventDeckToPool(eventDeck);
                eventDeckButton.classList.add('selected');
            }
        });

        //eventDeckOptionsArea.appendChild(eventDeckCheckbox);
        eventDeckOptionsArea.appendChild(eventDeckLabel);
    });
}

function addEventDeckToPool(eventDeckName) {
    var eventDeckCards = eventCards.filter(eventCard => {
        return eventCard.deck === eventDeckName;
    });

    eventDeckPool.push(...eventDeckCards);    
    eventDeck.push(...eventDeckCards);
    document.querySelector('.event-deck-quantity').innerHTML = eventDeck.length;
}

function removeEventDeckFromPool(eventDeckName) {
    eventDeckPool = eventDeckPool.filter(eventCard => {
        return eventCard.deck !== eventDeckName;
    });
    eventDeck = eventDeck.filter(eventCard => {
        return eventCard.deck !== eventDeckName;
    });
    document.querySelector('.event-deck-quantity').innerHTML = eventDeck.length;
}

function loadInitiatives(initiativeArray, initiativeArea) {
    initiativeArray.sort((a, b) => { return a.name > b.name ? 1 : a.name < b.name ? -1 : 0; }).forEach(initiativeCard => {
        var initiativeCardImg = document.createElement('div');
        initiativeCardImg.style.backgroundImage = `url('images/initiative/${initiativeCard.image}')`;
        initiativeCardImg.dataset.quantity = 0;
        initiativeCardImg.classList.add('initiative-card-mini');

        initiativeCardImg.addEventListener('click', function (ev) {
            ev.preventDefault();
            addInitiativeCardToPool(initiativeCard.image);
            initiativeCardImg.classList.add('selected');
            initiativeCardImg.dataset.quantity = parseInt(initiativeCardImg.dataset.quantity) + 1;
        });

        initiativeCardImg.addEventListener('contextmenu', function (ev) {
            ev.preventDefault();
            //alert('right click');
            removeInitiativeCardFromPool(initiativeCard.image);
            if (parseInt(initiativeCardImg.dataset.quantity) > 0) {
                initiativeCardImg.dataset.quantity = parseInt(initiativeCardImg.dataset.quantity) - 1;
            }

            console.log(initiativeDeckPool); 
            console.log(initiativeCard.image);

            if (!initiativeDeckPool.includes(initiativeCard.image)) {
                initiativeCardImg.classList.remove('selected');
            }
        });
        
        initiativeArea.appendChild(initiativeCardImg);
    });
}

function addInitiativeCardToPool(imageName) {
    initiativeDeckPool.push(imageName);    
    initiativeDeck.push(imageName);
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length;
}

function removeInitiativeCardFromPool(imageName) {    
    if (initiativeDeckPool.includes(imageName)) {
        initiativeDeckPool.splice(initiativeDeckPool.indexOf(imageName), 1);
    }

    if (initiativeDeck.includes(imageName)) {
        initiativeDeck.splice(initiativeDeck.indexOf(imageName), 1);
    }
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length;
}