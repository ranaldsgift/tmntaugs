const rotationAngles = [0, 90, 180, 270];

const overlayTokenTypes = [
    {
        name: 'tmnt',
        types: [
            'blocking terrain',
            'covered terrain',
            'elevated terrain',
            'harmful terrain',
            'obscuring terrain',
            'rough terrain',
            'slow terrain',
            'unstable terrain',
            'doors',
            'figures',
            'goal',
            'health',
            'machines',
            'neutral terrain',
            'objectives',
            'objects',
            'spawns',
            'status'
        ]
    },    
    {
        name: 'dblade cartography',
        types: [
            'blocking terrain',
            'covered terrain',
            'elevated terrain',
            'harmful terrain',
            'obscuring terrain',
            'rough terrain',
            'slow terrain',
            'unstable terrain',
            'doors',
            'figures',
            'goal',
            'health',
            'machines',
            'neutral terrain',
            'objectives',
            'spawns',
            'status'
        ]
    }
]

const mapTileTypes = [
    {
        name: 'tmnt',
        types: [
            'change is constant',
            'city fall',
            'secret history of the foot',
            'northhampton'
        ]
    },
    {
        name: 'dblade cartography',
        types: [
            'btas'
        ]
    }
]

const rootFolderProduction = `/`;
const rootFolderDev = `/tmntaugs/`;
const homebrewFolder = `images/homebrew/`;

function loadOverlayTokenOptions() {
    var overlayOptions = [];
    var overlayTokenOption = document.createElement('li');
    overlayTokenOption.classList = 'overlay-token-type-option selected';
    overlayTokenOption.dataset.type = 'all';
    overlayTokenOption.innerHTML = 'All Overlay Tokens';
    overlayTokenOption.addEventListener('click', selectOverlayTokenTypeOption);
    document.querySelector('.overlay-token-filters').appendChild(overlayTokenOption);

    overlayTokenTypes.forEach((gameTokenType) => {

        gameTokenType.types.forEach((overlayTokenType) => {
            if (!overlayOptions.includes(overlayTokenType)) {
                overlayTokenOption = document.createElement('li');
                overlayTokenOption.classList.add('overlay-token-type-option');
                overlayTokenOption.dataset.type = overlayTokenType;
                overlayTokenOption.innerHTML = overlayTokenType;
                overlayTokenOption.addEventListener('click', selectOverlayTokenTypeOption);
                document.querySelector('.overlay-token-filters').appendChild(overlayTokenOption);
                overlayOptions.push(overlayTokenType);
            }

            var xhr = new XMLHttpRequest();
            xhr.open("GET", `${rootFolderProduction}images/homebrew/${gameTokenType.name}/overlay tokens/${overlayTokenType}`, true);
            xhr.responseType = 'document';
            xhr.onload = () => {
            if (xhr.status === 200) {
                var elements = xhr.response.getElementsByTagName("a");
                for (x of elements) {
                    if ( x.href.match(/\.(jpe?g|png|gif)$/) ) {
                        var overlayToken = document.createElement('img');
                        overlayToken.classList.add('overlay-token');
                        overlayToken.style.setProperty('--background-image', `url('${x.href}')`);
                        overlayToken.dataset.type = overlayTokenType;
                        overlayToken.src = x.href;
                        overlayToken.addEventListener('click', selectOverlayTile);
                
                        document.querySelector('.overlay-token-selection .overlay-token-container').appendChild(overlayToken);
                    } 
                };
            } 
            else {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            }
            xhr.send()

        });
    });

}

function loadMapTileOptions() { 
    var mapTileContainer = document.querySelector('.map-tile-container');

    var mapTypeOption = document.createElement('li');
    mapTypeOption.classList = 'map-type-option selected';
    mapTypeOption.dataset.type = 'all';
    mapTypeOption.innerHTML = 'All Map Tiles';
    mapTypeOption.addEventListener('click', selectMapTypeOption);
    document.querySelector('.map-tile-filters').appendChild(mapTypeOption);
    
    mapTileTypes.forEach((gameTileType) => {

        gameTileType.types.forEach((mapTileType) => {
            mapTypeOption = document.createElement('li');
            mapTypeOption.classList.add('map-type-option');
            mapTypeOption.dataset.type = mapTileType;
            mapTypeOption.innerHTML = `${gameTileType.name} - ${mapTileType}`;

            mapTypeOption.addEventListener('click', selectMapTypeOption);
            document.querySelector('.map-tile-filters').appendChild(mapTypeOption);

            var xhr = new XMLHttpRequest();
            xhr.open("GET", `${rootFolderProduction}images/homebrew/${gameTileType.name}/map tiles/${mapTileType}`, true);
            xhr.responseType = 'document';
            xhr.onload = () => {
            if (xhr.status === 200) {
                var elements = xhr.response.getElementsByTagName("a");
                for (x of elements) {
                    if ( x.href.match(/\.(jpe?g|png|gif)$/) ) {

                        var mapTile = document.createElement('div');
                        mapTile.classList.add('map-tile');
                        mapTile.dataset.type = mapTileType;
                        mapTile.style.setProperty('--background-image', `url('${x.href}')`);
                        mapTile.style.setProperty('--thumb-image', `url('${x.href.slice(0, x.href.lastIndexOf('/'))}/thumbs${x.href.slice(x.href.lastIndexOf('/')).replace('.png', '.jpg')}')`);
                        mapTile.style.setProperty('--rotation', 0);
                        mapTile.addEventListener('click', addMapTileToScenario);
                        mapTileContainer.appendChild(mapTile);
                    } 
                };
            } 
            else {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            }
            xhr.send()
        });
    });
}
        
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM ready");
});

window.onload = (event) => {
    document.querySelectorAll('.floating-template-options ul li').forEach((floatingOption) => {
        floatingOption.addEventListener('click', (e) => {
            document.querySelector('.floating-template-options').dataset.active = e.target.dataset.tab;
            var selectedOption = document.querySelector('.floating-template-options ul li.selected');
            if (selectedOption) {
                selectedOption.classList.remove('selected');
            }
            e.target.classList.add('selected');
        });
    })

    loadMapTileOptions();
    loadOverlayTokenOptions();

/*     var overlayTokenOption = document.createElement('li');
    overlayTokenOption.classList = 'overlay-token-type-option selected';
    overlayTokenOption.dataset.type = 'all';
    overlayTokenOption.innerHTML = 'All Overlay Tokens';
    overlayTokenOption.addEventListener('click', selectOverlayTokenTypeOption);
    document.querySelector('.overlay-token-filters').appendChild(overlayTokenOption);

    overlayTokenTypes.forEach((type) => {
        overlayTokenOption = document.createElement('li');
        overlayTokenOption.classList.add('overlay-token-type-option');
        overlayTokenOption.dataset.type = type;
        overlayTokenOption.innerHTML = type.replaceAll('_', ' ');
        overlayTokenOption.addEventListener('click', selectOverlayTokenTypeOption);
        document.querySelector('.overlay-token-filters').appendChild(overlayTokenOption);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", `${rootFolderDev}images/homebrew/tmnt/overlay tokens/${type}`, true);
        xhr.responseType = 'document';
        xhr.onload = () => {
        if (xhr.status === 200) {
            var elements = xhr.response.getElementsByTagName("a");
            console.log(xhr.response.getElementsByTagName("a"));
            for (x of elements) {
                if ( x.href.match(/\.(jpe?g|png|gif)$/) ) {
                    var overlayToken = document.createElement('img');
                    overlayToken.classList.add('overlay-token');
                    overlayToken.style.setProperty('--background-image', `url('${x.href}')`);
                    overlayToken.dataset.type = type;
                    overlayToken.src = x.href;
                    overlayToken.addEventListener('click', selectOverlayTile);
            
                    document.querySelector('.overlay-token-selection .overlay-token-container').appendChild(overlayToken);
                } 
            };
        } 
        else {
            alert('Request failed. Returned status of ' + xhr.status);
        }
        }
        xhr.send()

    }); */

    
/*     overlayTokens.forEach((token) => {
        if (!overlayTokenTypes.includes(token.type)) {
            overlayTokenTypes.push(token.type);
            overlayTokenOption = document.createElement('li');
            overlayTokenOption.classList.add('overlay-token-type-option');
            overlayTokenOption.dataset.type = token.type;
            overlayTokenOption.innerHTML = token.type.replaceAll('_', ' ');

            overlayTokenOption.addEventListener('click', selectOverlayTokenTypeOption);

            document.querySelector('.overlay-token-filters').appendChild(overlayTokenOption);
        }

        var overlayToken = document.createElement('img');
        overlayToken.classList.add('overlay-token');
        overlayToken.style.setProperty('--background-image', `url('${token.imagePath}')`);
        overlayToken.style.setProperty('--row-span', token.rowSpan);
        overlayToken.style.setProperty('--col-span', token.colSpan);
        overlayToken.dataset.shape = token.rowSpan === token.colSpan ? 'square' : 'rectangle';
        overlayToken.dataset.type = token.type;
        overlayToken.src = token.imagePath;
        overlayToken.addEventListener('click', selectOverlayTile);

        document.querySelector('.overlay-token-selection .overlay-token-container').appendChild(overlayToken);
    }); */
    /* var mapTileContainer = document.querySelector('.map-tile-container');

    var mapTypes = [];

    var mapTypeOption = document.createElement('li');
    mapTypeOption.classList = 'map-type-option selected';
    mapTypeOption.dataset.type = 'all';
    mapTypeOption.innerHTML = 'All Map Tiles';
    mapTypeOption.addEventListener('click', selectMapTypeOption);
    document.querySelector('.map-tile-filters').appendChild(mapTypeOption);

    mapTiles.forEach((tile) => {
        if (!mapTypes.includes(tile.type)) {
            mapTypes.push(tile.type);
            mapTypeOption = document.createElement('li');
            mapTypeOption.classList.add('map-type-option');
            mapTypeOption.dataset.type = tile.type;
            mapTypeOption.innerHTML = tile.type.replaceAll('_', ' ');

            mapTypeOption.addEventListener('click', selectMapTypeOption);

            document.querySelector('.map-tile-filters').appendChild(mapTypeOption);
        }

        var mapTile = document.createElement('div');
        mapTile.classList.add('map-tile');
        mapTile.dataset.type = tile.type;
        mapTile.style.setProperty('--background-image', `url('${tile.imagePath}')`);
        mapTile.style.setProperty('--thumb-image', `url('${tile.imagePath.replace('/map tiles/', '/map tiles/thumbs/').replace('.png', '.jpg')}')`);
        mapTile.style.setProperty('--rotation', 0);
        mapTile.addEventListener('click', addMapTileToScenario);
        mapTileContainer.appendChild(mapTile);
    });
 */
/*     var xhr = new XMLHttpRequest();
    xhr.open("GET", "/tmntaugs/images/homebrew/tmnt/overlay tokens/figures", true);
    xhr.responseType = 'document';
    xhr.onload = () => {
    if (xhr.status === 200) {
        var elements = xhr.response.getElementsByTagName("a");
        for (x of elements) {
            if ( x.href.match(/\.(jpe?g|png|gif)$/) ) { 
                let img = document.createElement("img");
                img.src = x.href
                document.body.appendChild(img);
            } 
        };
    } 
    else {
        alert('Request failed. Returned status of ' + xhr.status);
    }
    }
    xhr.send() */
}

function selectOverlayTokenTypeOption(e) {
    e.target.closest('.filters-container').querySelector('.overlay-token-type-option.selected').classList.remove('selected');
    e.target.classList.add('selected');

    e.target.closest('.overlay-token-options').querySelectorAll(`.filtered-data-container .overlay-token`).forEach((token) => {
        token.style.display = 'none';
    });

    var overlayTokenSelector = `.filtered-data-container .overlay-token[data-type='${e.target.dataset.type}']`;

    if (e.target.dataset.type === 'all') {
        overlayTokenSelector = `.filtered-data-container .overlay-token`;
    }

    e.target.closest('.overlay-token-options').querySelectorAll(overlayTokenSelector).forEach((token) => {
        token.style.display = 'block';
    });
}

function selectMapTypeOption(e) {
    e.target.closest('.filters-container').querySelector('.map-type-option.selected').classList.remove('selected');
    e.target.classList.add('selected');

    e.target.closest('.map-options').querySelectorAll('.filtered-data-container .map-tile').forEach((mapTile) => {
        mapTile.style.display = 'none';
    });

    var selector = `.filtered-data-container .map-tile[data-type='${e.target.dataset.type}']`;

    if (e.target.dataset.type === 'all') {
        selector = `.filtered-data-container .map-tile`;
    }

    e.target.closest('.map-options').querySelectorAll(selector).forEach((mapTile) => {
        mapTile.style.display = 'block';
    });
}

function selectOverlayTile(e) {
    document.querySelectorAll('.overlay-token-container .overlay-token.selected').forEach((token) => { token.classList.remove('selected'); });
    e.target.classList.add('selected');
}

function addMapTileToScenario(e) {
    var mapTileMask = document.createElement('div');
    mapTileMask.classList.add('map-tile-mask');

    var mapTileWrapper = document.createElement('div');
    mapTileWrapper.classList.add('map-tile-wrapper');

    var mapTile = document.createElement('div');
    mapTile.classList.add('map-tile');
    mapTile.dataset.rotation = 0;
    mapTile.style.setProperty('--background-image', e.target.style.getPropertyValue('--background-image'));
    mapTile.style.setProperty('--rotation', '0deg');
    mapTile.addEventListener('click', addOverlayTileToMapTile);

    var rotateButton = document.createElement('span');
    rotateButton.classList.add('map-tile-rotate-button');
    rotateButton.innerHTML = 'rotate';
    rotateButton.addEventListener('click', rotateMapTile);

    var removeButton = document.createElement('span');
    removeButton.classList.add('map-tile-remove-button');
    removeButton.innerHTML = 'remove';
    removeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.currentTarget.closest('.map-tile-mask').remove();
    });
    
    mapTileWrapper.appendChild(rotateButton);
    mapTileWrapper.appendChild(removeButton);
    mapTileWrapper.appendChild(mapTile);
    mapTileMask.appendChild(mapTileWrapper);

    document.querySelector('.scenario-map-container').appendChild(mapTileMask);
}

function rotateMapTile (e) {
    var mapTile = e.target.closest('.map-tile-wrapper').querySelector('.map-tile');
    var rotation = parseInt(mapTile.dataset.rotation);
    var nextIndex = rotationAngles.indexOf(rotation) + 1;
    nextIndex = nextIndex > 3 ? 0 : nextIndex;

    rotation = rotationAngles[nextIndex];
    var rotationValue = `${rotation}deg`;

    mapTile.dataset.rotation = rotation;
    mapTile.style.setProperty('--rotation', rotationValue);
}

function addOverlayTileToMapTile(e) {
    var leftPos = (e.clientX - e.target.getBoundingClientRect().left) / 749 * 8;
    var topPos = (e.clientY - e.target.getBoundingClientRect().top) / 749 * 8;
    console.log(Math.ceil(leftPos));
    console.log(Math.ceil(topPos));
    topPos = Math.ceil(topPos);
    leftPos = Math.ceil(leftPos);

    var selectedOverlayToken = document.querySelector('.overlay-token-container .overlay-token.selected');
    //console.log(selectedOverlayToken.naturalHeight);
    var overlayToken = document.createElement('div');
    //console.log(selectedOverlayToken.style.getPropertyValue('--background-image'));
    console.log(selectedOverlayToken.naturalWidth / 93.625)
    overlayToken.classList.add('overlay-token');
    overlayToken.style.setProperty('--background-image', selectedOverlayToken.style.getPropertyValue('--background-image'));
    overlayToken.style.setProperty('--rotation', '0deg');
    overlayToken.dataset.rotation = 0;
    overlayToken.dataset.shape = selectedOverlayToken.naturalHeight === selectedOverlayToken.naturalWidth ? 'square' : 'rectangle';
    overlayToken.style.setProperty('--row-start', topPos);
    overlayToken.style.setProperty('--col-start', leftPos);
    overlayToken.style.setProperty('--row-end', topPos + Math.round(selectedOverlayToken.naturalHeight / 93.625)); //parseInt(selectedOverlayToken.style.getPropertyValue('--row-span')));
    overlayToken.style.setProperty('--col-end', leftPos + Math.round(selectedOverlayToken.naturalWidth / 93.625)); //parseInt(selectedOverlayToken.style.getPropertyValue('--col-span')));
    overlayToken.addEventListener('click', rotateOverlayTile);

    overlayToken.addEventListener('contextmenu', (token) => {
        token.preventDefault();
        token.target.remove();
    });

    e.target.closest('.map-tile-wrapper').appendChild(overlayToken);
}

function rotateOverlayTile (e) {
    var rotation = parseInt(e.target.dataset.rotation);
    var nextIndex = rotationAngles.indexOf(rotation) + 1;
    nextIndex = nextIndex > 3 ? 0 : nextIndex;

    rotation = rotationAngles[nextIndex];
    var rotationValue = `${rotation}deg`;

    e.target.dataset.rotation = rotation;
    e.target.style.setProperty('--rotation', rotationValue);
}

const mapTiles = [
    {
        name: '1A',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/1A.png'
    },
    {
        name: '1B',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/1B.png'
    },
    {
        name: '2A',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/2A.png'
    },
    {
        name: '2B',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/2B.png'
    },
    {
        name: '3A',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/3A.png'
    },
    {
        name: '3B',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/3B.png'
    },
    {
        name: '4A',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/4A.png'
    },
    {
        name: '4B',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/4B.png'
    },
    {
        name: '5A',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/5A.png'
    },
    {
        name: '5B',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/5B.png'
    },
    {
        name: '6A',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/6A.png'
    },
    {
        name: '6B',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/6B.png'
    },
    {
        name: '7A',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/7A.png'
    },
    {
        name: '7B',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/7B.png'
    },
    {
        name: '8A',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/8A.png'
    },
    {
        name: '8B',
        type: 'change_is_constant',
        imagePath: '../images/homebrew/tmnt/map tiles/8B.png'
    },
    {
        name: '9A',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/9A.png'
    },
    {
        name: '9B',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/9B.png'
    },
    {
        name: '10A',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/10A.png'
    },
    {
        name: '10B',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/10B.png'
    },
    {
        name: '11A',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/11A.png'
    },
    {
        name: '11B',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/11B.png'
    },
    {
        name: '12A',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/12A.png'
    },
    {
        name: '12B',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/12B.png'
    },
    {
        name: '13A',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/13A.png'
    },
    {
        name: '13B',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/13B.png'
    },
    {
        name: '14A',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/14A.png'
    },
    {
        name: '14B',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/14B.png'
    },
    {
        name: '15A',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/15A.png'
    },
    {
        name: '15B',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/15B.png'
    },
    {
        name: '16A',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/16A.png'
    },
    {
        name: '16B',
        type: 'city_fall',
        imagePath: '../images/homebrew/tmnt/map tiles/16B.png'
    },
    {
        name: '17A',
        type: 'secret_history_of_the_foot',
        imagePath: '../images/homebrew/tmnt/map tiles/17A.png'
    },
    {
        name: '17B',
        type: 'secret_history_of_the_foot',
        imagePath: '../images/homebrew/tmnt/map tiles/17B.png'
    },
    {
        name: '18A',
        type: 'secret_history_of_the_foot',
        imagePath: '../images/homebrew/tmnt/map tiles/18A.png'
    },
    {
        name: '18B',
        type: 'secret_history_of_the_foot',
        imagePath: '../images/homebrew/tmnt/map tiles/18B.png'
    },
    {
        name: '19A',
        type: 'northhampton_expansion',
        imagePath: '../images/homebrew/tmnt/map tiles/19A.png'
    },
    {
        name: '19B',
        type: 'northhampton_expansion',
        imagePath: '../images/homebrew/tmnt/map tiles/19B.png'
    },
    {
        name: '20A',
        type: 'northhampton_expansion',
        imagePath: '../images/homebrew/tmnt/map tiles/20A.png'
    },
    {
        name: '20B',
        type: 'northhampton_expansion',
        imagePath: '../images/homebrew/tmnt/map tiles/20B.png'
    },
    {
        name: '21A',
        type: 'northhampton_expansion',
        imagePath: '../images/homebrew/tmnt/map tiles/21A.png'
    },
    {
        name: '21B',
        type: 'northhampton_expansion',
        imagePath: '../images/homebrew/tmnt/map tiles/21B.png'
    }
]