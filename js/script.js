const flagcdn = {
    "Argentina": "https://flagcdn.com/ar.svg",
    "Portugal": "https://flagcdn.com/pt.svg", 
    "Belgium": "https://flagcdn.com/be.svg",
    "France": "https://flagcdn.com/fr.svg",
    "Netherlands": "https://flagcdn.com/nl.svg",
    "Germany": "https://flagcdn.com/de.svg",
    "Brazil": "https://flagcdn.com/br.svg",
    "Egypt": "https://flagcdn.com/eg.svg",
    "Slovenia": "https://flagcdn.com/si.svg",
    "Croatia": "https://flagcdn.com/hr.svg",
    "Morocco": "https://flagcdn.com/ma.svg",
    "Norway": "https://flagcdn.com/no.svg",
    "Canada": "https://flagcdn.com/ca.svg",
    "England": "https://flagcdn.com/gb-eng.svg",
    "Italy": "https://flagcdn.com/it.svg"
};

const clubLogos = {
    "Inter Miami": "https://cdn.sofifa.net/meta/team/239235/120.png",
    "Al Nassr": "https://cdn.sofifa.net/meta/team/2506/120.png",
    "Manchester City": "https://cdn.sofifa.net/players/239/085/25_120.png",
    "Real Madrid": "https://cdn.sofifa.net/meta/team/3468/120.png",
    "Liverpool": "https://cdn.sofifa.net/meta/team/8/120.png",
    "Al-Hilal": "https://cdn.sofifa.net/meta/team/7011/120.png",
    "Bayern Munich": "https://cdn.sofifa.net/meta/team/503/120.png",
    "Atletico Madrid": "https://cdn.sofifa.net/meta/team/7980/120.png",
    "Al-Ittihad": "https://cdn.sofifa.net/meta/team/476/120.png",
    "Manchester United": "https://cdn.sofifa.net/meta/team/14/120.png",
    "Paris Saint-Germain": "https://cdn.sofifa.net/meta/team/591/120.png",
    "Fenerbahçe": "https://cdn.sofifa.net/meta/team/88/120.png",
    "PSV": "https://cdn.sofifa.net/meta/team/682/120.png"
};

const formations = {
    "442": {
        positions: [
            { top: "82%", left: "49%", position: "GK" },
            { top: "49%", left: "82%", position: "LB" },
            { top: "51%", left: "61%", position: "CB" },
            { top: "51%", left: "37%", position: "CB" },
            { top: "49%", left: "13%", position: "RB" },
            { top: "9%", left: "82%", position: "LM" },
            { top: "19%", left: "61%", position: "CM" },
            { top: "19%", left: "37%", position: "CM" },
            { top: "9%", left: "13%", position: "RM" },
            { top: "-10%", left: "61%", position: "ST" },
            { top: "-10%", left: "37%", position: "ST" }
        ]
    },
    "433": {
        positions: [
            { top: "82%", left: "49%", position: "GK" },
            { top: "49%", left: "82%", position: "LB" },
            { top: "51%", left: "61%", position: "CB" },
            { top: "51%", left: "37%", position: "CB" },
            { top: "49%", left: "13%", position: "RB" },
            { top: "22%", left: "49%", position: "CM" },
            { top: "25%", left: "71%", position: "CM" },
            { top: "25%", left: "27%", position: "CM" },
            { top: "-3%", left: "75%", position: "LW" },
            { top: "-10%", left: "49%", position: "ST" },
            { top: "-3%", left: "19%", position: "RW" }
        ]
    }
};

let players = JSON.parse(localStorage.getItem('players')) || [];
const tempStorageKey = 'tempPlayers';
let tempPlayers = JSON.parse(localStorage.getItem(tempStorageKey)) || [];

const nameInput = document.getElementById('name');
const photoInput = document.getElementById('photo');
const nationalitySelect = document.getElementById('nationality');
const clubSelect = document.getElementById('club');
const ratingInput = document.getElementById('rating');
const positionSelect = document.getElementById('position');
const normalStatsDiv = document.getElementById('normalStats');
const gkStatsDiv = document.getElementById('gkStats');
const normalStatsInputs = Array.from(document.querySelectorAll('#normalStats input[type="number"]'));
const gkStatsInputs = Array.from(document.querySelectorAll('#gkStats input[type="number"]'));
const playerForm = document.querySelector('.player-form');

const terrain_players = 'terrainPlayers';
const BENCH_PLAYERS_KEY = 'benchPlayers';

let playerBeingEdited = null;

function createPlayerData() {
    const position = document.getElementById('position').value;
    
    const baseData = {
        name: document.getElementById('name').value,
        photo: document.getElementById('photo').value,
        flag: flagcdn[document.getElementById('nationality').value],
        logo: clubLogos[document.getElementById('club').value],
        rating: document.getElementById('rating').value,
        position: position
    };
    
    if (position === 'GK') {
        return {
            ...baseData,
            diving: document.querySelector('#gkStats input[placeholder="Diving"]').value,
            handling: document.querySelector('#gkStats input[placeholder="Handling"]').value,
            kicking: document.querySelector('#gkStats input[placeholder="Kicking"]').value,
            reflexes: document.querySelector('#gkStats input[placeholder="Reflexes"]').value,
            speed: document.querySelector('#gkStats input[placeholder="Speed"]').value,
            positioning: document.querySelector('#gkStats input[placeholder="Positioning"]').value
        };
    } else {
        return {
            ...baseData,
            pace: document.querySelector('#normalStats input[placeholder="Pace"]').value,
            shooting: document.querySelector('#normalStats input[placeholder="Shooting"]').value,
            passing: document.querySelector('#normalStats input[placeholder="Passing"]').value,
            dribbling: document.querySelector('#normalStats input[placeholder="Dribbling"]').value,
            defending: document.querySelector('#normalStats input[placeholder="Defending"]').value,
            physical: document.querySelector('#normalStats input[placeholder="Physical"]').value
        };
    }
}

function clearAllValidation() {
    const inputs = [nameInput, photoInput, nationalitySelect, clubSelect, ratingInput, positionSelect, ...normalStatsInputs, ...gkStatsInputs];
    inputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
        input.addEventListener('change', () => clearError(input));
    });
}

function validateInputs() {
    let isValid = true;
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Le nom du joueur est obligatoire');
        isValid = false;
    }
    if (!photoInput.value.trim()) {
        showError(photoInput, 'L\'URL de la photo est obligatoire');
        isValid = false;
    }
    if (!nationalitySelect.value) {
        showError(nationalitySelect, 'La nationalité est obligatoire');
        isValid = false;
    }
    if (!clubSelect.value) {
        showError(clubSelect, 'Le club est obligatoire');
        isValid = false;
    }
    if (!ratingInput.value) {
        showError(ratingInput, 'La note est obligatoire');
        isValid = false;
    }
    if (!positionSelect.value) {
        showError(positionSelect, 'La position est obligatoire');
        isValid = false;
    }
    
    const statsInputs = positionSelect.value === 'GK' ? gkStatsInputs : normalStatsInputs;
    statsInputs.forEach(input => {
        if (!input.value) {
            showError(input, 'Ce champ est obligatoire');
            isValid = false;
        }
    });
    
    return isValid;
}

function showError(inputElement, message) {
    inputElement.classList.add('input-error');
    const errorDiv = inputElement.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    } else {
        const newErrorDiv = document.createElement('div');
        newErrorDiv.className = 'error-message';
        newErrorDiv.textContent = message;
        inputElement.parentNode.insertBefore(newErrorDiv, inputElement.nextSibling);
    }
}

function clearError(inputElement) {
    const errorDiv = inputElement.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.style.display = 'none';
    }
    inputElement.classList.remove('input-error');
}

function toggleStats() {
    if (positionSelect.value === 'GK') {
        normalStatsDiv.style.display = 'none';
        gkStatsDiv.style.display = 'grid';
    } else {
        normalStatsDiv.style.display = 'grid';
        gkStatsDiv.style.display = 'none';
    }
}

function createEmptyCard(position) {
    const emptyCard = document.createElement('div');
    emptyCard.className = 'player-card empty-position';
    emptyCard.style.position = 'absolute';
    emptyCard.style.top = position.top;
    emptyCard.style.left = position.left;
    
    const marker = document.createElement('div');
    marker.className = 'position-marker';
    marker.textContent = position.position;
    
    emptyCard.appendChild(marker);
    return emptyCard;
}

function createEmptyBenchCard() {
    const emptyCard = document.createElement('div');
    emptyCard.className = 'player-card empty-position';
    
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    
    const positionMarker = document.createElement('div');
    positionMarker.className = 'position-marker';
    positionMarker.textContent = 'BANC';
    
    emptyCard.appendChild(cardInner);
    emptyCard.appendChild(positionMarker);
    
    return emptyCard;
}

function createPlayer(player) {
    const isGoalkeeper = player.position === 'GK';
    
    return `
        <div class="card-inner">
            <div class="card-top">
                <div class="flag-club">
                    <img src="${player.flag}" alt="Flag" class="flag-image">
                    <img src="${player.logo}" alt="Club" class="club-logo">
                </div>
                <div class="player-image-wrapper">
                    <img src="${player.photo}" alt="${player.name}" class="player-image">
                </div>
                <div class="rating-position">
                    <span class="rating">${player.rating}</span>
                    <span class="position">${player.position}</span>
                </div>
            </div>
            <span class="player-name">${player.name}</span>
            <div class="player-attributes">
                ${isGoalkeeper ? `
                    <div class="attribute-column">
                        <div class="attribute-row">
                            <span class="attribute-label">DIV</span>
                            <span class="attribute-value">${player.diving}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">HAN</span>
                            <span class="attribute-value">${player.handling}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">KIC</span>
                            <span class="attribute-value">${player.kicking}</span>
                        </div>
                    </div>
                    <div class="attribute-column">
                        <div class="attribute-row">
                            <span class="attribute-label">REF</span>
                            <span class="attribute-value">${player.reflexes}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">SPE</span>
                            <span class="attribute-value">${player.speed}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">POS</span>
                            <span class="attribute-value">${player.positioning}</span>
                        </div>
                    </div>
                ` : `
                    <div class="attribute-column">
                        <div class="attribute-row">
                            <span class="attribute-label">PAC</span>
                            <span class="attribute-value">${player.pace}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">SHO</span>
                            <span class="attribute-value">${player.shooting}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">PAS</span>
                            <span class="attribute-value">${player.passing}</span>
                        </div>
                    </div>
                    <div class="attribute-column">
                        <div class="attribute-row">
                            <span class="attribute-label">DRI</span>
                            <span class="attribute-value">${player.dribbling}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">DEF</span>
                            <span class="attribute-value">${player.defending}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">PHY</span>
                            <span class="attribute-value">${player.physical}</span>
                        </div>
                    </div>
                `}
            </div>
            <div class="card-actions">
                <button class="card-btn remove-btn" onclick="removePlayerCard(event, '${player.name}')">✕</button>
                <button class="card-btn edit-btn" onclick="editPlayerCard(event, '${player.name}')">✎</button>
            </div>
        </div>
    `;
}

function updateField() {
    const field = document.querySelector('.field');
    const formation = document.getElementById('formation').value;
    field.innerHTML = '';
    
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const benchPlayers = JSON.parse(localStorage.getItem(BENCH_PLAYERS_KEY)) || [];
    let newTerrainPlayers = [];
    let usedPositions = new Set();
    

    formations[formation].positions.forEach(position => {
 
        if (!usedPositions.has(position.position)) {
            const matchingPlayer = terrainPlayers.find(p => 
                p.position === position.position && 
                !usedPositions.has(position.position)
            );
            
            if (matchingPlayer) {
                const playerCard = document.createElement('div');
                playerCard.className = 'player-card';
                playerCard.dataset.playerName = matchingPlayer.name;
                playerCard.innerHTML = createPlayer(matchingPlayer);
                playerCard.style.position = 'absolute';
                playerCard.style.top = position.top;
                playerCard.style.left = position.left;
                field.appendChild(playerCard);
                
                newTerrainPlayers.push({
                    ...matchingPlayer,
                    top: position.top,
                    left: position.left
                });
                
                usedPositions.add(position.position);
            } else {
                field.appendChild(createEmptyCard(position));
            }
        } else {
            field.appendChild(createEmptyCard(position));
        }
    });
    

    const remainingPlayers = terrainPlayers.filter(player => {
        return !newTerrainPlayers.some(p => p.name === player.name);
    });
    
    const allBenchPlayers = [...benchPlayers, ...remainingPlayers];
    localStorage.setItem(BENCH_PLAYERS_KEY, JSON.stringify(allBenchPlayers));
    localStorage.setItem(terrain_players, JSON.stringify(newTerrainPlayers));
    

    const banc = document.querySelector('.banc');
    banc.innerHTML = '';
    
    allBenchPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.dataset.playerName = player.name;
        playerCard.innerHTML = createPlayer(player);
        playerCard.style.position = 'relative';
        banc.appendChild(playerCard);
    });
    
    const remainingBenchSlots = 12 - allBenchPlayers.length;
    for(let i = 0; i < remainingBenchSlots; i++) {
        banc.appendChild(createEmptyBenchCard());
    }
    
    positionTerrain();
    bancVideClick();
}



function updatTemps() {
    const tempStorageGrid = document.querySelector('.temp-storage-grid');
    tempStorageGrid.innerHTML = '';
    
    tempPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.dataset.playerName = player.name;
        playerCard.innerHTML = createPlayer(player);
        
        playerCard.addEventListener('click', () => {
            gererClickPlayer(player);
        });
        
        tempStorageGrid.appendChild(playerCard);
    });
}

function movePlayerToPosition(player, targetPosition) {
    tempPlayers = tempPlayers.filter(p => p.name !== player.name);
    localStorage.setItem(tempStorageKey, JSON.stringify(tempPlayers));
    
    const isFieldPosition = targetPosition.closest('.field');
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    playerCard.dataset.playerName = player.name;
    playerCard.innerHTML = createPlayer(player);
    
    if (isFieldPosition) {
        playerCard.style.position = 'absolute';
        playerCard.style.top = targetPosition.style.top;
        playerCard.style.left = targetPosition.style.left;
        
        const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
        terrainPlayers.push({
            ...player,
            top: targetPosition.style.top,
            left: targetPosition.style.left
        });
        localStorage.setItem(terrain_players, JSON.stringify(terrainPlayers));
    } else {
        playerCard.style.position = 'relative';
        const benchPlayers = JSON.parse(localStorage.getItem(BENCH_PLAYERS_KEY)) || [];
        benchPlayers.push(player);
        localStorage.setItem(BENCH_PLAYERS_KEY, JSON.stringify(benchPlayers));
    }
    
    targetPosition.parentElement.replaceChild(playerCard, targetPosition);
    updatTemps();
    document.querySelector('.temp-storage').style.display = 'none';
    positionTerrain();
}

function positionTerrain() {
    const emptyCards = document.querySelectorAll('.field .empty-position');
    emptyCards.forEach(card => {
        card.addEventListener('click', function() {
            const positionMarker = this.querySelector('.position-marker');
            const clickedPosition = positionMarker.textContent;
            showMatchingPlayers(clickedPosition);
        });
    });

    const playerCards = document.querySelectorAll('.field .player-card');
    playerCards.forEach(card => {
        card.addEventListener('click', function() {
            const playerName = card.dataset.playerName;
            const player = players.find(p => p.name === playerName);
            gererClickPlayer(player);
        });
    });

    const benchCards = document.querySelectorAll('.banc .player-card');
    benchCards.forEach(card => {
        card.addEventListener('click', function() {
            const playerName = card.dataset.playerName;
            const player = tempPlayers.find(p => p.name === playerName);
            gererClickPlayer(player);
        });
    });
}

function bancVideClick() {
    const benchCards = document.querySelectorAll('.banc .empty-position');
    benchCards.forEach(card => {
        card.addEventListener('click', function() {
            showAllPlayers();
        });
    });
}

function showMatchingPlayers(position) {
    const tempStorage = document.querySelector('.temp-storage');
    const tempStorageGrid = document.querySelector('.temp-storage-grid');
    
    const matchingPlayers = tempPlayers.filter(player => player.position === position);
    
    tempStorageGrid.innerHTML = '';
    
    if (matchingPlayers.length === 0) {
        tempStorageGrid.innerHTML = `
            <div class="empty-message">
                <p>Aucun joueur disponible pour la position ${position}</p>
            </div>
        `;
    } else {
        matchingPlayers.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.dataset.playerName = player.name;
            playerCard.innerHTML = createPlayer(player);
            
            playerCard.addEventListener('click', () => {
                gererClickPlayer(player);
            });
            
            tempStorageGrid.appendChild(playerCard);
        });
    }
    
    tempStorage.style.display = 'block';
}

function showAllPlayers() {
    const tempStorage = document.querySelector('.temp-storage');
    const tempStorageGrid = document.querySelector('.temp-storage-grid');
    
    tempStorageGrid.innerHTML = '';
    
    if (tempPlayers.length === 0) {
        tempStorageGrid.innerHTML = `
            <div class="empty-message">
                <p>Aucun joueur disponible</p>
            </div>
        `;
    } else {
        tempPlayers.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.dataset.playerName = player.name;
            playerCard.innerHTML = createPlayer(player);
            
            playerCard.addEventListener('click', () => {
                gererClickPlayer(player);
            });
            
            tempStorageGrid.appendChild(playerCard);
        });
    }
    
    tempStorage.style.display = 'block';
}

function gererClickPlayer(player) {
    const emptyPositions = Array.from(document.querySelectorAll('.field .empty-position'));
    const matchingPosition = emptyPositions.find(pos => {
        const marker = pos.querySelector('.position-marker');
        return marker && marker.textContent === player.position;
    });
    
    if (matchingPosition) {
        movePlayerToPosition(player, matchingPosition);
    } else {
        const emptyBenchPosition = document.querySelector('.banc .empty-position');
        if (emptyBenchPosition) {
            movePlayerToPosition(player, emptyBenchPosition);
        }
    }
}

document.querySelector('.toggle-temp-storage').addEventListener('click', function() {
    const tempStorage = document.querySelector('.temp-storage');
    if (tempStorage.style.display === 'none') {
        showAllPlayers();
    } else {
        tempStorage.style.display = 'none';
    }
});

playerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    const newPlayer = createPlayerData();
    
    if (playerBeingEdited) {
        handlePlayerEdit(newPlayer);
        return;
    }
    
    tempPlayers.push(newPlayer);
    localStorage.setItem(tempStorageKey, JSON.stringify(tempPlayers));
    
    updateField();
    updatTemps();
    
    clearAllValidation();
    this.reset();
    toggleStats();
});

function handlePlayerEdit(newPlayer) {
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const benchPlayers = JSON.parse(localStorage.getItem(BENCH_PLAYERS_KEY)) || [];
    const tempStoragePlayers = JSON.parse(localStorage.getItem(tempStorageKey)) || [];
    
    const newTerrainPlayers = terrainPlayers.filter(p => p.name !== playerBeingEdited.name);
    const newBenchPlayers = benchPlayers.filter(p => p.name !== playerBeingEdited.name);
    const newTempPlayers = tempStoragePlayers.filter(p => p.name !== playerBeingEdited.name);
    
    const formation = document.getElementById('formation').value;
    const availablePosition = formations[formation].positions.find(pos => 
        !newTerrainPlayers.some(p => p.position === pos.position)
    );
    
    if (availablePosition) {

        newTerrainPlayers.push({
            ...newPlayer,
            top: availablePosition.top,
            left: availablePosition.left
        });
    } else {

        newBenchPlayers.push(newPlayer);
    }
    
    localStorage.setItem(terrain_players, JSON.stringify(newTerrainPlayers));
    localStorage.setItem(BENCH_PLAYERS_KEY, JSON.stringify(newBenchPlayers));
    localStorage.setItem(tempStorageKey, JSON.stringify(newTempPlayers));
    
    updateField();
    updatTemps();
    
    clearAllValidation();

    playerForm.reset();
    toggleStats();
    playerBeingEdited = null;

    document.querySelector('.temp-storage').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    players = JSON.parse(localStorage.getItem('players')) || [];
    tempPlayers = JSON.parse(localStorage.getItem(tempStorageKey)) || [];
    
    updateField();
    updatTemps();
    clearAllValidation();
    positionTerrain();
});

document.getElementById('formation').addEventListener('change', updateField);

function removePlayerCard(event, playerName) {
    event.stopPropagation();
    
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const benchPlayers = JSON.parse(localStorage.getItem(BENCH_PLAYERS_KEY)) || [];
    const tempStoragePlayers = JSON.parse(localStorage.getItem(tempStorageKey)) || [];
    
    const newTerrainPlayers = terrainPlayers.filter(p => p.name !== playerName);
    const newBenchPlayers = benchPlayers.filter(p => p.name !== playerName);
    const newTempPlayers = tempStoragePlayers.filter(p => p.name !== playerName);
    
    localStorage.setItem(terrain_players, JSON.stringify(newTerrainPlayers));
    localStorage.setItem(BENCH_PLAYERS_KEY, JSON.stringify(newBenchPlayers));
    localStorage.setItem(tempStorageKey, JSON.stringify(newTempPlayers));
    
    updateField();
    updatTemps();
}

function editPlayerCard(event, playerName) {
    event.stopPropagation();
    
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const benchPlayers = JSON.parse(localStorage.getItem(BENCH_PLAYERS_KEY)) || [];
    const tempStoragePlayers = JSON.parse(localStorage.getItem(tempStorageKey)) || [];
    
    const player = [...terrainPlayers, ...benchPlayers, ...tempStoragePlayers]
        .find(p => p.name === playerName);
        
    if (player) {
        playerBeingEdited = {
            ...player,
            originalPosition: player.position
        };

        fillFormWithPlayerData(player);
    }
}

function fillFormWithPlayerData(player) {
    document.getElementById('name').value = player.name;
    document.getElementById('photo').value = player.photo;
    document.getElementById('nationality').value = Object.keys(flagcdn)
        .find(key => flagcdn[key] === player.flag);
    document.getElementById('club').value = Object.keys(clubLogos)
        .find(key => clubLogos[key] === player.logo);
    document.getElementById('rating').value = player.rating;
    document.getElementById('position').value = player.position;
    
    toggleStats();
    
    if (player.position === 'GK') {
        fillGKStats(player);
    } else {
        fillPlayerStats(player);
    }
}

function fillGKStats(player) {
    document.querySelector('#gkStats input[placeholder="Diving"]').value = player.diving;
    document.querySelector('#gkStats input[placeholder="Handling"]').value = player.handling;
    document.querySelector('#gkStats input[placeholder="Kicking"]').value = player.kicking;
    document.querySelector('#gkStats input[placeholder="Reflexes"]').value = player.reflexes;
    document.querySelector('#gkStats input[placeholder="Speed"]').value = player.speed;
    document.querySelector('#gkStats input[placeholder="Positioning"]').value = player.positioning;
}

function fillPlayerStats(player) {
    document.querySelector('#normalStats input[placeholder="Pace"]').value = player.pace;
    document.querySelector('#normalStats input[placeholder="Shooting"]').value = player.shooting;
    document.querySelector('#normalStats input[placeholder="Passing"]').value = player.passing;
    document.querySelector('#normalStats input[placeholder="Dribbling"]').value = player.dribbling;
    document.querySelector('#normalStats input[placeholder="Defending"]').value = player.defending;
    document.querySelector('#normalStats input[placeholder="Physical"]').value = player.physical;
}