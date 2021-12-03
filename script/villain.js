window.onload = (event) => {
    document.getElementById('villainAiIcon').addEventListener('change', (e) => {        
        var file = document.getElementById("villainAiIcon").files[0];
        var reader = new FileReader();
        reader.onloadend = function(){
            document.querySelector('.villainai-icon').style.backgroundImage = "url(" + reader.result + ")";        
        }
        if(file) {
            reader.readAsDataURL(file);
        }
    }, true);
    
    document.getElementById('villainAiImage').addEventListener('change', (e) => {
        var file = document.getElementById("villainAiImage").files[0];
        var reader = new FileReader();
        reader.onloadend = function(){
            document.querySelector('.villainai-image').style.backgroundImage = "url(" + reader.result + ")";        
        }
        if(file){
            reader.readAsDataURL(file);
        }
    }, true);
    
    document.querySelector('.villainai-attack-type-select').addEventListener('change', (e) => {        
        var attackValue = document.querySelector('.villainai-attack-value');
        if (!attackValue) {
            return;
        }
        attackValue.dataset.icon = e.target.value;
    }, true);
    
    document.querySelector('.villainai-priority-value').addEventListener('change', (e) => {        
        var priorityValue = document.querySelector('.priority-value');
        if (!priorityValue) {
            return;
        }
        priorityValue.dataset.icon = e.target.value;
    }, true);
    
    document.querySelector('.villainai-priority-type').addEventListener('change', (e) => {        
        var priorityType = document.querySelector('.priority-type');
        if (!priorityType) {
            return;
        }
        priorityType.dataset.icon = e.target.value;
    }, true);
    
    document.getElementById('villainAiCardColor').addEventListener('change', (e) => {        
        document.querySelector('.villainai-background').style.setProperty('--background-color', e.target.value);
    }, true);
    
    document.getElementById('villainAiName').addEventListener('change', (e) => {        
        document.querySelector('.villainai-name').innerHTML = e.target.value;
    }, true);
    
    document.getElementById('villainAiFactions').addEventListener('change', (e) => {        
        document.querySelector('.villainai-factions').innerHTML = e.target.value;
    }, true);
    
    document.getElementById('villainAiAbility').addEventListener('change', (e) => {        
        document.querySelector('.villainai-ability-name').innerHTML = e.target.value;
    }, true);
    
    document.getElementById('villainAiAbilityDescription').addEventListener('change', (e) => {        
        document.querySelector('.villainai-ability-description').innerHTML = e.target.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }, true);
    
    document.querySelector('input.villainai-stat-move').addEventListener('change', (e) => {
        document.querySelector('span.villainai-stat-move').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input.villainai-stat-attack').addEventListener('change', (e) => {
        document.querySelector('span.villainai-stat-attack').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input.villainai-stat-block').addEventListener('change', (e) => {
        document.querySelector('span.villainai-stat-block').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input.villainai-stat-health').addEventListener('change', (e) => {
        document.querySelector('span.villainai-stat-health').innerHTML = e.target.value;
    }, true);
    
    document.querySelector('input#villainAiImagePositionLeft').addEventListener('change', (e) => {
        document.querySelector('.villainai-image').style.setProperty('--left', e.target.value);
    }, true);

    document.querySelector('input#villainAiImagePositionTop').addEventListener('change', (e) => {
        document.querySelector('.villainai-image').style.setProperty('--top', e.target.value);
    }, true);
    
    document.querySelector('input#villainAiImageSize').addEventListener('change', (e) => {
        document.querySelector('.villainai-image').style.setProperty('--size', `${e.target.value}%`);
    }, true);
    
    document.querySelector('input#villainAiNameFontSize').addEventListener('change', (e) => {
        document.querySelector('.villainai-name').style.setProperty('--font-size', `${e.target.value}px`);
    }, true);

    document.getElementById('saveVillainAi').addEventListener('click', (e) => {
        html2canvas(document.querySelector(".villainai-template"), {backgroundColor: null}).then(canvas => {
            document.querySelector('.saved-template-container').prepend(canvas);
        });
    }, true);
};