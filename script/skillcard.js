

window.onload = (event) => {
    
    document.getElementById('skillCardCharacterName').addEventListener('change', (e) => {
        document.querySelector('.skill-card-character-name').innerHTML = e.target.value;
    }, true);
    
    document.getElementById('skillCardName').addEventListener('change', (e) => {
        document.querySelector('.skill-card-name').innerHTML = e.target.value;
    }, true);
    
    document.getElementById('skillCardDescription').addEventListener('change', (e) => {
        console.log(e.target.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        document.querySelector('.skill-card-description').innerHTML = e.target.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }, true);
    
    document.getElementById('skillCardImage').addEventListener('change', (e) => {        
        var file = document.getElementById("skillCardImage").files[0];
        var reader = new FileReader();
        reader.onloadend = function(){
            document.querySelector('.skill-card-image').style.backgroundImage = "url(" + reader.result + ")";        
        }
        if(file){
            reader.readAsDataURL(file);
        }
    }, true);
    
    document.getElementById('skillCardImagePositionLeft').addEventListener('change', (e) => {
        document.querySelector('.skill-card-image').style.setProperty('--left', `${e.target.value}px`);
    }, true);
    
    document.getElementById('skillCardImagePositionTop').addEventListener('change', (e) => {
        document.querySelector('.skill-card-image').style.setProperty('--top', `${e.target.value}px`);
    }, true);
    
    document.getElementById('skillCardImageSize').addEventListener('change', (e) => {
        document.querySelector('.skill-card-image').style.setProperty('--size', `${e.target.value}%`);
    }, true);

    document.getElementById('skillCardNameFontSize').addEventListener('change', (e) => {
        document.querySelector('.skill-card-name').style.setProperty('--font-size', `${e.target.value}px`);
    }, true);
    
    document.getElementById('skillCardColor').addEventListener('change', (e) => {        
        document.querySelector('.skill-card-background').style.setProperty('--background-color', e.target.value);
    }, true);
    
    document.getElementById('addSkillcardCost').addEventListener('click', (e) => {
        var iconName = document.querySelector('.skill-card-icon-select').value;
        var iconChild = document.createElement('div');
        iconChild.classList = 'icon';
        iconChild.dataset.icon = iconName;

        document.querySelector('.skill-card-cost-container').appendChild(iconChild)
    }, true);
    
    document.getElementById('removeSkillcardCost').addEventListener('click', (e) => {        
        var iconName = document.querySelector('.skill-card-icon-select').value;

        if (document.querySelectorAll(`.icon[data-icon="${iconName}"]`).length < 1) {
            return;
        }

        document.querySelectorAll(`.icon[data-icon="${iconName}"]`)[0].remove()
    }, true);
    
    document.getElementById('saveSkillCard').addEventListener('click', (e) => {
        html2canvas(document.querySelector(".skill-card-template-container"), {backgroundColor: null}).then(canvas => {
            document.querySelector('.saved-template-container').prepend(canvas);
        });
    }, true);
};