

window.onload = (event) => {
    document.getElementById('heroIcon').addEventListener('change', updateHeroIcon, true);
    function updateHeroIcon(){
    var file = document.getElementById("heroIcon").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        document.querySelector('.hero-icon').style.backgroundImage = "url(" + reader.result + ")";        
    }
    if(file){
        reader.readAsDataURL(file);
        }else{
        }
    }
    
    document.getElementById('heroImage').addEventListener('change', updateHeroImage, true);
    function updateHeroImage(){
    var file = document.getElementById("heroImage").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        document.querySelector('.hero-image').style.backgroundImage = "url(" + reader.result + ")";        
    }
    if(file){
        reader.readAsDataURL(file);
        }else{
        }
    }
    
    document.querySelector('.dice-icon-select').addEventListener('change', updateDiceIcon, true);
    function updateDiceIcon(e){
        var diceSlot = document.querySelector('.dice-slot-select');
        if (!diceSlot) {
            return;
        }

        var diceIcon = document.querySelector(`.hero-dice>div:nth-child(${diceSlot.value}) .icon`);
        if (!diceIcon) {
            return;
        }
        diceIcon.dataset.icon = e.target.value;
    }
    
    document.querySelector('.dice-slot-select').addEventListener('change', updateDiceSlot, true);
    function updateDiceSlot(e){
        var diceIconSelect = document.querySelector('.dice-icon-select');
        if (!diceIconSelect) {
            return;
        }

        var diceIcon = document.querySelector(`.hero-dice>div:nth-child(${e.target.value}) .icon`);
        if (!diceIcon) {
            return;
        }
        diceIconSelect.value = diceIcon.dataset.icon;
    }
    
    document.getElementById('backgroundColor').addEventListener('change', updateBackgroundColor, true);
    function updateBackgroundColor(e){
        document.querySelector('.hero-dice').style.setProperty('--background-color', e.target.value);
    }
    
    document.getElementById('borderColor').addEventListener('change', updateBorderColor, true);
    function updateBorderColor(e){
        document.querySelector('.hero-dice').style.setProperty('--border-color', e.target.value);
    }
    
    document.getElementById('invertColor').addEventListener('change', invertColor, true);
    function invertColor(e){
        document.querySelector('.hero-dice').dataset.inverted = e.target.checked;
    }
    
    document.getElementById('cardColor').addEventListener('change', updateCardColor, true);
    function updateCardColor(e){
        document.querySelector('.hero-background').style.setProperty('--background-color', e.target.value);
    }
    
    document.getElementById('heroName').addEventListener('change', updateHeroName, true);
    function updateHeroName(e){
        document.querySelector('.hero-name').innerHTML = e.target.value;
    }
    
    document.getElementById('heroFactions').addEventListener('change', updateHeroFactions, true);
    function updateHeroFactions(e){
        document.querySelector('.hero-factions').innerHTML = e.target.value;
    }
    
    document.getElementById('heroAbility').addEventListener('change', updateHeroAbility, true);
    function updateHeroAbility(e){
        document.querySelector('.hero-ability-name').innerHTML = e.target.value;
    }
    
    document.getElementById('heroAbilityDescription').addEventListener('change', updateHeroAbilityDescription, true);
    function updateHeroAbilityDescription(e){
        document.querySelector('.hero-ability-description').innerHTML = e.target.value;
    }
    
    document.querySelector('input.hero-stat-move').addEventListener('change', (e) => {
        document.querySelector('span.hero-stat-move').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input.hero-stat-attack').addEventListener('change', (e) => {
        document.querySelector('span.hero-stat-attack').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input.hero-stat-block').addEventListener('change', (e) => {
        document.querySelector('span.hero-stat-block').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input.hero-stat-skill').addEventListener('change', (e) => {
        document.querySelector('span.hero-stat-skill').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input.hero-stat-focus').addEventListener('change', (e) => {
        document.querySelector('span.hero-stat-focus').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input.hero-stat-health').addEventListener('change', (e) => {
        document.querySelector('span.hero-stat-health').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input.hero-stat-awaken').addEventListener('change', (e) => {
        document.querySelector('span.hero-stat-awaken').innerHTML = e.target.value;
    }, true);

    document.getElementById('saveHero').addEventListener('click', saveHero, true);
    function saveHero(e){
/*         var clonedNode = document.querySelector(".hero-template").cloneNode(true);
        var inputs = clonedNode.querySelectorAll('input');
        alert( Array.prototype.slice.call(inputs).length);

        [...inputs].forEach(element => {
            console.log(element);
            var newElement = document.createElement('span');
            newElement.innerHTML = 'Test'
            element.parentNode.replaceChild(newElement, element)
        }); */

        html2canvas(document.querySelector(".hero-template"), {backgroundColor: null}).then(canvas => {
            document.querySelector('.saved-template-container').prepend(canvas);
        });
    }
};