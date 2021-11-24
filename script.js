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

function addEventToInitiativeDeck() {
    var eventCount = initiativeDeckPool.filter(card => { return card.includes('initiative'); }).length;
    if (eventCount > 4) {
        return;
    }

    initiativeDeck.push(`initiative${eventCount+1}.jpg`);
    initiativeDeckPool.push(`initiative${eventCount+1}.jpg`);
    initiativeDeck = shuffleCards(initiativeDeck.slice());
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length;
    document.querySelector('.initiative-event-quantity').dataset.quantity = eventCount + 1;
}

function addEventToInitiativeDiscard() {
    var eventCount = initiativeDeckPool.filter(card => { return card.includes('initiative'); }).length;
    if (eventCount > 4) {
        return;
    }

    initiativeDeckPool.push(`initiative${eventCount+1}.jpg`);
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

    var initiativeDrawDeck = document.querySelector('.initiative-draw-deck');
    if (initiativeDrawDeck) {
        initiativeDrawDeck.classList.add('shuffled');
        setTimeout(() => { initiativeDrawDeck.classList.remove('shuffled'); }, 1500)
    }
}

function shuffleAllInitiativeCards() {
    initiativeDeck = shuffleCards(initiativeDeckPool.slice());
    document.querySelector('.initiative-deck-quantity').innerHTML = initiativeDeck.length;
    document.querySelector('.initiative-cards').innerHTML = '';
    
    var initiativeDrawDeck = document.querySelector('.initiative-draw-deck');
    if (initiativeDrawDeck) {
        initiativeDrawDeck.classList.add('shuffled');
        setTimeout(() => { initiativeDrawDeck.classList.remove('shuffled'); }, 1500)
    }
}

function shuffleEventDeck() {
    eventDeck = shuffleCards(eventDeck.slice());
    
    var eventDrawDeck = document.querySelector('.event-draw-deck');
    if (eventDrawDeck) {
        eventDrawDeck.classList.add('shuffled');
        setTimeout(() => { eventDrawDeck.classList.remove('shuffled'); }, 1500)
    }
}

function shuffleAllEventCards() {
    eventDeck = shuffleCards(eventDeckPool.slice());
    document.querySelector('.event-deck-quantity').innerHTML = eventDeck.length;
    document.querySelectorAll('.event-cards .event-card-container:not(.draw-deck)').forEach((eventCard) => {
        eventCard.remove();
    });
    
    var eventDrawDeck = document.querySelector('.event-draw-deck');
    if (eventDrawDeck) {
        eventDrawDeck.classList.add('shuffled');
        setTimeout(() => { eventDrawDeck.classList.remove('shuffled'); }, 1500)
    }
}

function drawInitiativeCard() {
    var initiativeCards = document.querySelector('.initiative-cards');
    var initiativeDrawn = initiativeDeck.pop();
    
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

    var eventCardContainer = document.createElement('div');
    eventCardContainer.classList.add('event-card-container');
    eventCardContainer.dataset.removed = false;
    eventCardContainer.dataset.filename = eventDrawn.image;

    var removeEventButton = document.createElement('span');
    removeEventButton.innerHTML = 'Remove'
    removeEventButton.classList.add('remove-event-button');
    removeEventButton.addEventListener('click', removeEventCard);

    var eventButtonContainer = document.createElement('div');
    eventButtonContainer.classList.add('event-button-container');

    if (eventDrawn.activate) {
        var activateEventButton = document.createElement('span');
        activateEventButton.innerHTML = 'Activate'
        activateEventButton.classList.add('activate-event-button');
        activateEventButton.addEventListener('click', activateEventCard);
        eventButtonContainer.appendChild(activateEventButton);
    }

    if (eventDrawn.counter) {
        var counterContainer = document.createElement('div');
        counterContainer.classList.add('counter-container');
        var counterDecrementButton = document.createElement('span');
        counterDecrementButton.addEventListener('click', decrementEventCounter);
        counterDecrementButton.innerHTML = '-';
        var counterValue = document.createElement('span');
        counterValue.innerHTML = eventDrawn.counterValue;
        counterValue.classList.add('label');
        var counterIncrementButton = document.createElement('span');
        counterIncrementButton.addEventListener('click', incrementEventCounter);
        counterIncrementButton.innerHTML = '+';

        counterContainer.appendChild(counterDecrementButton);
        counterContainer.appendChild(counterValue);
        counterContainer.appendChild(counterIncrementButton);
        eventButtonContainer.appendChild(counterContainer);
    }

    eventButtonContainer.appendChild(removeEventButton);

    var eventImage = document.createElement('div');
    eventImage.style.backgroundImage = `url('images/events/${eventDrawn.image}')`;
    eventImage.classList.add('card-background');
    eventImage.classList.add('card-shadow');

    var magnifyButton = document.createElement('span');
    magnifyButton.innerHTML = '+';
    magnifyButton.classList.add('magnify-button');
    magnifyButton.addEventListener('click', magnifyCard);

    eventCardContainer.appendChild(eventButtonContainer);
    eventCardContainer.appendChild(eventImage);
    eventCardContainer.appendChild(magnifyButton);

    var eventCardQuantity = document.querySelectorAll('.event-cards .event-card-container').length;

    var slot1Card = document.querySelector('.event-cards .event-card-container:nth-child(1)');
    var slot2Card = document.querySelector('.event-cards .event-card-container:nth-child(2)');
    var slot3Card = document.querySelector('.event-cards .event-card-container:nth-child(3)');
    var slot4Card = document.querySelector('.event-cards .event-card-container:nth-child(4)');

    if (eventCardQuantity === 0) {
        eventCards.prepend(eventCardContainer);
    }
    else if (slot1Card && slot1Card.classList.contains('empty')) {
        slot1Card.remove();
        eventCards.prepend(eventCardContainer);
    }
    else if (slot2Card && slot2Card.classList.contains('empty')) {
        slot2Card.remove();
        eventCards.prepend(eventCardContainer);
    }    
    else if (slot3Card && slot3Card.classList.contains('empty')) {
        slot3Card.remove();
        eventCards.prepend(eventCardContainer);
    }    
    else if (slot4Card && slot4Card.classList.contains('empty')) {
        slot4Card.remove();
        eventCards.prepend(eventCardContainer);
    }

    var eventDrawDeck = document.querySelector('.event-draw-deck');
    eventDrawDeck.parentNode.insertBefore(eventCardContainer, eventDrawDeck.nextSibling);
    //eventCards.prepend(eventCardContainer);
    document.querySelector('.event-deck-quantity').innerHTML = eventDeck.length;
}

function incrementEventCounter(e) {
    var counterLabel = e.target.parentElement.querySelector('.label');
    counterLabel.innerHTML = parseInt(counterLabel.innerHTML) + 1;
}

function decrementEventCounter(e) {
    var counterLabel = e.target.parentElement.querySelector('.label');
    counterLabel.innerHTML = parseInt(counterLabel.innerHTML) - 1;
}

function toggleEventDiscards(e) {
    var eventDeck = document.querySelector('.event-deck');

    if (eventDeck.dataset.showdiscards === 'true') {
        eventDeck.dataset.showdiscards = false;
        e.innerHTML = 'Show Discards';
    } else {
        eventDeck.dataset.showdiscards = true;
        e.innerHTML = 'Hide Discards';
    }
}

function magnifyCard(e) {
    var cardContainer = e.target.closest('.event-card-container');

    if (!cardContainer) {
        return;
    }

    if (cardContainer.classList.contains('magnify')) {
        cardContainer.classList.remove('magnify');
    } else {
        cardContainer.classList.add('magnify');
    }
}

function removeEventCard(e) {
    e.preventDefault();

    // Check if the event has already been marked as removed
    if (e.target.parentElement.dataset.removed) {
        return;
    }

    var eventCardContainer = e.target.closest('.event-card-container');
    if (eventCardContainer) {
        eventDeckPool = eventDeckPool ? eventDeckPool.filter(card => { return card.image !== eventCardContainer.dataset.filename; }) : [];

        var focusDifficulty = eventCardContainer.dataset.active === 'true' ? 4 : 5 - Array.prototype.indexOf.call(eventCardContainer.parentElement.children, eventCardContainer);
        if (confirm(`Perform a Difficulty ${focusDifficulty} Focus Check`)) {
            eventCardContainer.querySelector('.card-background').style.backgroundImage = `url("images/events/resolved.jpg")`;
            eventCardContainer.classList.add('empty');
            eventCardContainer.dataset.removed = true;            
        } else {
            eventCardContainer.querySelector('.card-background').style.backgroundImage = `url('images/events/${eventCardContainer.dataset.filename}')`;
            eventCardContainer.classList.remove('empty');
            eventCardContainer.dataset.removed = false;
        };
    }
}

function activateEventCard(e) {
    e.preventDefault();

    // Check if the event has already been marked as removed
    if (e.target.parentElement.dataset.removed) {
        return;
    }
    
    var eventCardContainer = e.target.closest('.event-card-container');

    if (confirm(`Move this Event Card from the queue to a character sheet?`)) {
        if (eventCardContainer) {
            eventCardContainer.dataset.active = true;
            document.querySelector('.active-event-cards').prepend(eventCardContainer.cloneNode(true));    
            eventDeckPool = eventDeckPool ? eventDeckPool.filter(card => { return card.image !== eventCardContainer.dataset.filename; }) : [];
            
            eventCardContainer.querySelector('.card-background').style.backgroundImage = `url("images/events/resolved.jpg")`;
            eventCardContainer.querySelector('.event-button-container').innerHTML = '';
            eventCardContainer.classList.add('empty');
            eventCardContainer.dataset.removed = true; 
        }
    }    
}

function burnEventCard(e, image) {
    e.preventDefault();

    if (e.target.src.includes('resolved')) {
        moveEventToActivePool(e);
        return;
    }

    e.target.src = "images/events/resolved.jpg";

    e.target.parentElement.classList.add('empty');
    eventDeckPool = eventDeckPool ? eventDeckPool.filter(card => { return card.image !== e.target.dataset.filename; }) : [];
}

function unburnEventCard(e, image) {
    e.preventDefault();
    e.target.src = `images/events/${e.target.dataset.filename}`;
    e.target.parentElement.classList.remove('empty');
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
        name: 'Clan Hamato Turtle Michelangelo',
        image: 'Michelangelo.jpg'
    },
    {
        name: 'Clan Hamato Turtle Donatello',
        image: 'Donatello.jpg'
    },
    {
        name: 'Clan Hamato Turtle Leonardo',
        image: 'Leonardo.jpg'
    },
    {
        name: 'Clan Hamato Turtle Raphael',
        image: 'Raphael.jpg'
    },
    {
        name: 'Clan Hamato Casey Jones',
        image: 'Casey Jones.jpg'
    },
    {
        name: 'Clan Hamato April O\'Neil',
        image: 'April ONeil.jpg'
    },
    {
        name: 'Clan Hamato Splinter',
        image: 'Splinter.jpg'
    },
    {
        name: 'Stockgen Baxter',
        image: 'Baxter hero.jpg'
    },
    {
        name: 'Foot Clan Bebop',
        image: 'Bebop hero.jpg'
    },
    {
        name: 'Foot Clan Rocksteady',
        image: 'Rocksteady hero.jpg'
    },
    {
        name: 'Clan Hamato Stan Saki Donatello',
        image: 'Donatello alt.jpg'
    },
    {
        name: 'Clan Hamato Stan Saki Leonardo',
        image: 'Leonardo alt.jpg'
    },
    {
        name: 'Clan Hamato Stan Saki Michelangelo',
        image: 'Michelangelo alt.jpg'
    },
    {
        name: 'Clan Hamato Stan Saki Raphael',
        image: 'Raphael alt.jpg'
    },
    {
        name: 'Foot Clan The Foot Clan',
        image: 'Foot Clan.jpg'
    },
    {
        name: 'Clan Hamato Hamato Sons',
        image: 'Hamato Sons.jpg'
    },
    {
        name: 'Clan Hamato Hamato Yoshi',
        image: 'Hamato Yoshi.jpg'
    },
    {
        name: 'Mutanimal Herman',
        image: 'Herman.jpg'
    },
    {
        name: 'Purple Dragon Hun',
        image: 'Hun hero.jpg'
    },
    {
        name: 'Foot Clan Karai',
        image: 'Karai hero.jpg'
    },
    {
        name: 'Foot Clan Koya',
        image: 'Koya.jpg'
    },
    {
        name: 'Mutanimal Man Ray',
        image: 'Man Ray.jpg'
    },
    {
        name: 'Mutanimal Michelangelo Mutanimal',
        image: 'Michelangelo mutanimal.jpg'
    },
    {
        name: 'Mutanimal Mondo Gecko',
        image: 'Mondo Gecko.jpg'
    },
    {
        name: 'Unaffiliated Old Hob',
        image: 'Old Hob hero.jpg'
    },
    {
        name: 'Mutanimal Old Hob Mutanimal',
        image: 'Old Hob mutanimal.jpg'
    },
    {
        name: 'Clan Hamato Oroku Saki',
        image: 'Oroku Saki.jpg'
    },
    {
        name: 'Mutanimal Pigeon Pete',
        image: 'Pigeon Pete.jpg'
    },
    {
        name: 'Purple Dragons',
        image: 'Purple Dragon hero.jpg'
    },
    {
        name: 'Clan Hamato Turtle Raphael Loner',
        image: 'Raphael loner.jpg'
    },
    {
        name: 'Mutanimal Sally Pride',
        image: 'Sally Pride.jpg'
    },
    {
        name: 'Unaffiliated Slash',
        image: 'Slash.jpg'
    },
    {
        name: 'Foot Clan Shredder',
        image: 'Shredder hero.jpg'
    },
    {
        name: 'Unaffiliated Usagi',
        image: 'Usagi.jpg'
    },
    {
        name: 'Clan Hamato Turtle Jennika',
        image: 'Jennika.jpg'
    },
    {
        name: 'Unaffiliated Metalhead',
        image: 'Metalhead hero.jpg'
    },
    {
        name: 'Purple Dragon Angel Bridge',
        image: 'Angel Bridge.jpg'
    }
]

var villainInitiativeCards = [
    {
        name: 'Foot Leader Alopex',
        image: 'Alopex.jpg'
    },
    {
        name: 'Stockgen Leader Baxter',
        image: 'Baxter.jpg'
    },
    {
        name: 'Foot Leader Bebop & Rocksteady',
        image: 'Bebop and Rocksteady.jpg'
    },
    {
        name: 'Foot Leader Bebop',
        image: 'Bebop.jpg'
    },
    {
        name: 'Foot Leader Rocksteady',
        image: 'Rocksteady.jpg'
    },
    {
        name: 'Deviations Donatello',
        image: 'Donatello Villain.jpg'
    },
    {
        name: 'Deviations Leonardo',
        image: 'Leonardo Villain.jpg'
    },
    {
        name: 'Deviations Michelangelo',
        image: 'Michelangelo Villain.jpg'
    },
    {
        name: 'Deviations Raphael',
        image: 'Raphael Villain.jpg'
    },
    {
        name: 'Foot Leader Leonardo',
        image: 'Leonardo chunin.jpg'
    },
    {
        name: 'Stockgen Minion Flyborgs',
        image: 'Flyborgs.jpg'
    },
    {
        name: 'Stockgen Minion Flying Mouser',
        image: 'Flying Mouser.jpg'
    },
    {
        name: 'Foot Minion Assassin',
        image: 'Foot Assassin.jpg'
    },
    {
        name: 'Foot Minion Bruiser',
        image: 'Foot Bruiser.jpg'
    },
    {
        name: 'Foot Minion Elite',
        image: 'Foot Elite.jpg'
    },
    {
        name: 'Foot Minion Elite',
        image: 'Foot Elite alt.jpg'
    },
    {
        name: 'Foot Minion Ninja',
        image: 'Foot Ninja.jpg'
    },
    {
        name: 'Foot Minion Ninja',
        image: 'Foot Ninja alt.jpg'
    },
    {
        name: 'Purple Dragon Leader Hun',
        image: 'Hun.jpg'
    },
    {
        name: 'Foot Leader Karai',
        image: 'Karai.jpg'
    },
    {
        name: 'Unaffiliated Leader Kitsune',
        image: 'Kitsune.jpg'
    },
    {
        name: 'Foot Clan Koya',
        image: 'Koya villain.jpg'
    },
    {
        name: 'Unaffiliated Leader Krang',
        image: 'Krang.jpg'
    },
    {
        name: 'Unaffiliated Leader Leatherhead',
        image: 'Leatherhead.jpg'
    },
    {
        name: 'Stockgen Minion Mega Mouser',
        image: 'Mega Mouser.jpg'
    },
    {
        name: 'Unaffiliated Leader Metalhead',
        image: 'Metalhead.jpg'
    },
    {
        name: 'Stockgen Minion Mouser',
        image: 'Mouser.jpg'
    },
    {
        name: 'Unaffiliated Leader Old Hob',
        image: 'Old Hob.jpg'
    },
    {
        name: 'Purple Dragon Minion',
        image: 'Purple Dragon.jpg'
    },
    {
        name: 'Unaffiliated Leader Rahzar',
        image: 'Rahzar.jpg'
    },
    {
        name: 'Unaffiliated Leader Rat King',
        image: 'Rat King.jpg'
    },
    {
        name: 'Unaffiliated Leader Savage Slash',
        image: 'Savage Slash.jpg'
    },
    {
        name: 'Savate Minion Ninja',
        image: 'Savate Ninja.jpg'
    },
    {
        name: 'Unaffiliated Leader Scratch',
        image: 'Scratch.jpg'
    },
    {
        name: 'Foot Clan Leader Shredder',
        image: 'Shredder.jpg'
    },
    {
        name: 'Stockgen Leader Stockman Fly',
        image: 'Stockman Fly.jpg'
    },
    {
        name: 'Unaffiliated Leader Stranger',
        image: 'Stranger.jpg'
    },
    {
        name: 'Unaffiliated Leader Stranger',
        image: 'Stranger alt.jpg'
    },
    {
        name: 'Unaffiliated Leader Stranger',
        image: 'Stranger alt2.jpg'
    },
    {
        name: 'Unaffiliated Minion Thug Brawler',
        image: 'Thug Brawler.jpg'
    },
    {
        name: 'Unaffiliated Minion Thug Gunner',
        image: 'Thug Gunner.jpg'
    },
    {
        name: 'Unaffiliated Leader Tokka',
        image: 'Tokka.jpg'
    },
    {
        name: 'Unaffiliated Leader Wyrm',
        image: 'Wyrm.jpg'
    },
    {
        name: 'Savate Leader Victor',
        image: 'Victor.jpg'
    }
];

var eventCards = [
    {
        name: 'Event!',
        description: '',
        image: 'base1.jpg',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base2.jpg',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base3.jpg',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base4.jpg',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base5.jpg',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base6.jpg',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base7.jpg',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base8.jpg',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'base9.jpg',
        deck: 'Base'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero1.jpg',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero2.jpg',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero3.jpg',
        deck: 'Hero',
        counter: true,
        counterValue: 5
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero4.jpg',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero5.jpg',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero6.jpg',
        deck: 'Hero'
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero7.jpg',
        deck: 'Hero',
        counter: true,
        counterValue: 5
    },
    {
        name: 'Event!',
        description: '',
        image: 'hero8.jpg',
        deck: 'Hero',
        counter: true,
        counterValue: 5
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionred1.jpg',
        deck: 'Red Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionred2.jpg',
        deck: 'Red Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionred3.jpg',
        deck: 'Red Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionred4.jpg',
        deck: 'Red Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue1.jpg',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue2.jpg',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue3.jpg',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue4.jpg',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue5.jpg',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'minionblue6.jpg',
        deck: 'Blue Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mixed1.jpg',
        deck: 'Mixed Leader/Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mixed2.jpg',
        deck: 'Mixed Leader/Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mixed3.jpg',
        deck: 'Mixed Leader/Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mixed4.jpg',
        deck: 'Mixed Leader/Minion'
    },
    {
        name: 'Event!',
        description: '',
        image: 'leaderpurple1.jpg',
        deck: 'Leader'
    },
    {
        name: 'Event!',
        description: '',
        image: 'leaderpurple2.jpg',
        deck: 'Leader'
    },
    {
        name: 'Event!',
        description: '',
        image: 'leaderpurple3.jpg',
        deck: 'Leader'
    },
    {
        name: 'Event!',
        description: '',
        image: 'leaderpurple4.jpg',
        deck: 'Leader'
    },
    {
        name: 'Event!',
        description: '',
        image: 'footclan1.jpg',
        deck: 'Foot Clan'
    },
    {
        name: 'Event!',
        description: '',
        image: 'footclan2.jpg',
        deck: 'Foot Clan'
    },
    {
        name: 'Event!',
        description: '',
        image: 'footclan3.jpg',
        deck: 'Foot Clan',
        activate: true
    },
    {
        name: 'Event!',
        description: '',
        image: 'footclan4.jpg',
        deck: 'Foot Clan',
        activate: true
    },
    {
        name: 'Event!',
        description: '',
        image: 'beboprocksteady1.jpg',
        deck: 'Bebop and Rocksteady',
        activate: true
    },
    {
        name: 'Event!',
        description: '',
        image: 'beboprocksteady2.jpg',
        deck: 'Bebop and Rocksteady',
        activate: true
    },
    {
        name: 'Event!',
        description: '',
        image: 'baxter1.jpg',
        deck: 'Baxter',
        activate: true
    },
    {
        name: 'Event!',
        description: '',
        image: 'baxter2.jpg',
        deck: 'Baxter'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mutanimals1.jpg',
        deck: 'Mutanimals'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mutanimals2.jpg',
        deck: 'Mutanimals'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mutanimals3.jpg',
        deck: 'Mutanimals'
    },
    {
        name: 'Event!',
        description: '',
        image: 'mutanimals4.jpg',
        deck: 'Mutanimals'
    },
    {
        name: 'Event!',
        description: '',
        image: 'shredder1.jpg',
        deck: 'Shredder',
        activate: true
    },
    {
        name: 'Event!',
        description: '',
        image: 'shredder2.jpg',
        deck: 'Shredder'
    },
    {
        name: 'Event!',
        description: '',
        image: 'oldhob1.jpg',
        deck: 'Old Hob',
        activate: true
    },
    {
        name: 'Event!',
        description: '',
        image: 'hun1.jpg',
        deck: 'Hun',
        activate: true
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

    var eventInitiativeCount = initiativeDeckPool.filter(card => { return card.includes('initiative'); }).length;
    if (eventInitiativeCount < 2) {
        addEventToInitiativeDeck();
        if (eventInitiativeCount === 0) {
            addEventToInitiativeDeck();
        }
    }
}

function removeEventDeckFromPool(eventDeckName) {
    eventDeckPool = eventDeckPool.filter(eventCard => {
        return eventCard.deck !== eventDeckName;
    });
    eventDeck = eventDeck.filter(eventCard => {
        return eventCard.deck !== eventDeckName;
    });
    document.querySelector('.event-deck-quantity').innerHTML = eventDeck.length;

    if (eventDeck.length === 0) {
        var eventInitiativeCount = initiativeDeckPool.filter(card => { return card.includes('initiative'); }).length;

        for (var i = 0; i < eventInitiativeCount; i++) {
            removeEventFromInitiativeDeck();
        }
    }
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

            removeInitiativeCardFromPool(initiativeCard.image);
            if (parseInt(initiativeCardImg.dataset.quantity) > 0) {
                initiativeCardImg.dataset.quantity = parseInt(initiativeCardImg.dataset.quantity) - 1;
            }

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

function inspectInitiativeDeck(e) {
    if (initiativeDeck.length < 1) {
        return;
    }

    var body = document.querySelector('body');
    body.dataset.page = 'initiativeinspection';

    var initiativeInspectionCardsContainer = document.querySelector('.initiative-inspection-cards');
    initiativeInspectionCardsContainer.innerHTML = '';
    
    for (var i = 0; i < 3; i++) {
        var index = initiativeDeck.length - 1 - i;

        if (index < 0) {
            continue;
        }

        var initiativeCard = initiativeDeck[initiativeDeck.length - 1 - i];

        if (!initiativeCard) {
            continue;
        }

        var initiativeImage = document.createElement('img');
        initiativeImage.dataset.filename = initiativeCard;
        initiativeImage.src = `images/initiative/${initiativeCard}`;
        initiativeImage.classList.add('card-background');
        initiativeImage.classList.add('card-shadow');
        initiativeImage.addEventListener('click', returnToInitiativeDeck);

        initiativeInspectionCardsContainer.prepend(initiativeImage);
    }

    initiativeDeck = initiativeDeck.length > 3 ? initiativeDeck.slice(0, initiativeDeck.length - 3) : [];
}

function returnToInitiativeDeck(e) {
    var initiativeImage = e.target.dataset.filename;
    initiativeDeck.push(initiativeImage);
    e.target.remove();

    if (document.querySelector('.initiative-inspection-cards').children.length === 0) {
        var body = document.querySelector('body');
        body.dataset.page = 'playarea';
    }
}