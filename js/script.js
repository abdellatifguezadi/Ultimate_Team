const flagUrls = {
    "Argentina": "https://cdn.sofifa.net/flags/ar.png",
    "Portugal": "https://cdn.sofifa.net/flags/pt.png", 
    "Belgium": "https://cdn.sofifa.net/flags/be.png",
    "France": "https://cdn.sofifa.net/flags/fr.png",
    "Netherlands": "https://cdn.sofifa.net/flags/nl.png",
    "Germany": "https://cdn.sofifa.net/flags/de.png",
    "Brazil": "https://cdn.sofifa.net/flags/br.png",
    "Egypt": "https://cdn.sofifa.net/flags/eg.png",
    "Slovenia": "https://cdn.sofifa.net/flags/si.png",
    "Croatia": "https://cdn.sofifa.net/flags/hr.png",
    "Morocco": "https://cdn.sofifa.net/flags/ma.png",
    "Norway": "https://cdn.sofifa.net/flags/no.png",
    "Canada": "https://cdn.sofifa.net/flags/ca.png",
    "England": "https://cdn.sofifa.net/flags/gb-eng.png",
    "Italy": "https://cdn.sofifa.net/flags/it.png"
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

function createPlayerData() {
    return {
        name: document.getElementById('name').value,
        photo: document.getElementById('photo').value,
        flag: flagUrls[document.getElementById('nationality').value],
        logo: clubLogos[document.getElementById('club').value],
        rating: document.getElementById('rating').value,
        position: document.getElementById('position').value,
        pace: document.querySelector('#normalStats input[placeholder="Pace"]').value,
        shooting: document.querySelector('#normalStats input[placeholder="Shooting"]').value,
        passing: document.querySelector('#normalStats input[placeholder="Passing"]').value,
        dribbling: document.querySelector('#normalStats input[placeholder="Dribbling"]').value,
        defending: document.querySelector('#normalStats input[placeholder="Defending"]').value,
        physical: document.querySelector('#normalStats input[placeholder="Physical"]').value
    };
}

function setupInputValidation() {
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
        showError(ratingInput, 'La note globale est obligatoire');
        isValid = false;
    } else {
        const rating = parseInt(ratingInput.value);
        if (isNaN(rating) || rating < 0 || rating > 99) {
            showError(ratingInput, 'La note doit être comprise entre 0 et 99');
            isValid = false;
        }
    }

    if (!positionSelect.value) {
        showError(positionSelect, 'La position est obligatoire');
        isValid = false;
    }

    const statsInputs = positionSelect.value === 'GK' ? gkStatsInputs : normalStatsInputs;
    let hasEmptyStats = false;
    let hasInvalidStats = false;

    statsInputs.forEach(input => {
        if (!input.value) {
            hasEmptyStats = true;
        } else {
            const stat = parseInt(input.value);
            if (isNaN(stat) || stat < 0 || stat > 99) {
                hasInvalidStats = true;
            }
        }
    });

    if (hasEmptyStats) {
        showError(statsInputs[5], 'Tous les stats sont obligatoires');
        isValid = false;
    } else if (hasInvalidStats) {
        showError(statsInputs[5], 'Les stats doivent être entre 0 et 99');
        isValid = false;
    }

    return isValid;
}

function showError(inputElement, message) {
    clearError(inputElement);
    let errorDiv = inputElement.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        inputElement.parentNode.insertBefore(errorDiv, inputElement.nextElementSibling);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    inputElement.classList.add('input-error');
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

function movePlayerToPosition(player, targetPosition) {
    tempPlayers = tempPlayers.filter(p => p.name !== player.name);
    localStorage.setItem(tempStorageKey, JSON.stringify(tempPlayers));
    players = players.filter(p => p.name !== player.name);
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    playerCard.style.position = 'absolute';
    playerCard.style.top = targetPosition.style.top;
    playerCard.style.left = targetPosition.style.left;
    playerCard.dataset.playerName = player.name;
    playerCard.innerHTML = createPlayerCard(player);
    playerCard.addEventListener('click', function() {
        handlePlayerClick(player);
    });
    targetPosition.parentElement.replaceChild(playerCard, targetPosition);
    const playerWithPosition = {
        ...player,
        fieldPosition: {
            top: targetPosition.style.top,
            left: targetPosition.style.left
        }
    };
    players.push(playerWithPosition);
    localStorage.setItem('players', JSON.stringify(players));
    
    updateTempStorage();
    document.querySelector('.temp-storage').style.display = 'none';
}
function updateField() {
    const formationSelect = document.getElementById('formation');
    const field = document.querySelector('.field');
    const banc = document.querySelector('.banc');
    const existingPlayers = players.slice(); 
    field.innerHTML = '';
    banc.innerHTML = '';
    const selectedFormation = formations[formationSelect.value];
    selectedFormation.positions.forEach(position => {
        field.appendChild(createEmptyCard(position));
    });
    for (let i = 0; i < 12; i++) {
        banc.appendChild(createEmptyBenchCard());
    }
    existingPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.style.position = 'absolute';
        playerCard.dataset.playerName = player.name;
        playerCard.innerHTML = createPlayerCard(player);
        const emptyPositions = Array.from(field.querySelectorAll('.empty-position'));
        const matchingPosition = emptyPositions.find(pos => {
            const marker = pos.querySelector('.position-marker');
            return marker && marker.textContent === player.position;
        });
        
        if (matchingPosition) {
            playerCard.style.top = matchingPosition.style.top;
            playerCard.style.left = matchingPosition.style.left;
            matchingPosition.parentElement.replaceChild(playerCard, matchingPosition);
        } else {
            const emptyBenchPosition = banc.querySelector('.empty-position');
            if (emptyBenchPosition) {
                playerCard.style.position = 'static'; 
                emptyBenchPosition.parentElement.replaceChild(playerCard, emptyBenchPosition);
            }
        }
    });
    
    setupPositionClickHandlers();
}

document.getElementById('formation').addEventListener('change', () => {
    const existingPlayers = players.slice();
    players = [];
    updateField();
    players = existingPlayers;
    localStorage.setItem('players', JSON.stringify(players));
});
document.addEventListener('DOMContentLoaded', () => {
    players = JSON.parse(localStorage.getItem('players')) || [];
    tempPlayers = JSON.parse(localStorage.getItem(tempStorageKey)) || [];
    updateField();
    updateTempStorage();
    setupInputValidation();
});



document.getElementById('formation').addEventListener('change', updateField);

function createPlayerCard(player) {
    return `
        <div class="card-inner fifa-card">
            <div class="card-header">
                <div class="rating-position">
                    <span class="rating">${player.rating || ''}</span>
                    <span class="position">${player.position || ''}</span>
                </div>
            </div>
            
            <div class="player-image-wrapper">
                <img class="player-image" src="${player.photo || ''}" alt="${player.name}">
                <div class="card-footer">
                <img class="flag-image" src="${player.flag || ''}" alt="flag">
                <img class="club-logo" src="${player.logo || ''}" alt="club">
            </div>
            </div>
            
            <div class="player-name">${player.name || ''}</div>
            
            <div class="player-attributes">
                <div class="attribute-row">
                    <span class="attribute-label">PAC</span>
                    <span class="attribute-value">${player.pace || ''}</span>
                </div>
                <div class="attribute-row">
                    <span class="attribute-label">SHO</span>
                    <span class="attribute-value">${player.shooting || ''}</span>
                </div>
                <div class="attribute-row">
                    <span class="attribute-label">PAS</span>
                    <span class="attribute-value">${player.passing || ''}</span>
                </div>
                <div class="attribute-row">
                    <span class="attribute-label">DRI</span>
                    <span class="attribute-value">${player.dribbling || ''}</span>
                </div>
                <div class="attribute-row">
                    <span class="attribute-label">DEF</span>
                    <span class="attribute-value">${player.defending || ''}</span>
                </div>
                <div class="attribute-row">
                    <span class="attribute-label">PHY</span>
                    <span class="attribute-value">${player.physical || ''}</span>
                </div>
            </div>
            
            
        </div>
    `;
}

document.querySelector('.temp-storage-grid').addEventListener('click', function(e) {
    const card = e.target.closest('.player-card');
    if (!card) return;
    
    const playerName = card.dataset.playerName;
    const player = tempPlayers.find(p => p.name === playerName);
    
    if (player) {
        handlePlayerClick(player);
    }
});

function handlePlayerClick(player) {
    const emptyPositions = Array.from(document.querySelectorAll('.field .empty-position'));
    const matchingPosition = emptyPositions.find(pos => 
        pos.querySelector('.position-marker').textContent === player.position
    );
    
    const emptyBenchPosition = document.querySelector('.banc .empty-position');
    
    if (matchingPosition) {
        movePlayerToPosition(player, matchingPosition);
    } else if (emptyBenchPosition) {
        movePlayerToPosition(player, emptyBenchPosition);
    }
}



function updateTempStorage() {
    const tempStorageGrid = document.querySelector('.temp-storage-grid');
    let cardsHTML = '';
    
    tempPlayers.forEach(player => {
        cardsHTML += createPlayerCard(player);
    });
    
    tempStorageGrid.innerHTML = cardsHTML;
}

function setupPositionClickHandlers() {
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
            handlePlayerClick(player);
        });
    });


    const benchCards = document.querySelectorAll('.banc .player-card');
    benchCards.forEach(card => {
        card.addEventListener('click', function() {
            const playerName = card.dataset.playerName;
            const player = tempPlayers.find(p => p.name === playerName);
            handlePlayerClick(player);
        });
    });
}
function setupBenchClickHandler() {
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
    
    if (matchingPlayers.length === 0) {
        tempStorageGrid.innerHTML = `
            <div class="empty-message">
                <p>Aucun joueur disponible pour la position ${position}</p>
            </div>
        `;
    } else {
        let cardsHTML = '';
        matchingPlayers.forEach(player => {
            cardsHTML += createPlayerCard(player);
        });
        tempStorageGrid.innerHTML = cardsHTML;
    }
    
    tempStorage.style.display = 'block';
}

function showAllPlayers() {
    const tempStorage = document.querySelector('.temp-storage');
    const tempStorageGrid = document.querySelector('.temp-storage-grid');
    
    if (tempPlayers.length === 0) {
        tempStorageGrid.innerHTML = `
            <div class="empty-message">
                <p>Aucun joueur disponible</p>
            </div>
        `;
    } else {
        let cardsHTML = '';
        tempPlayers.forEach(player => {
            cardsHTML += createPlayerCard(player);
        });
        tempStorageGrid.innerHTML = cardsHTML;
    }
    
    tempStorage.style.display = 'block';
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
    
    if (!validateInputs()) {
        return;
    }
    
    const newPlayer = createPlayerData();
    tempPlayers.push(newPlayer);
    localStorage.setItem(tempStorageKey, JSON.stringify(tempPlayers));
    
    updateTempStorage();
    
    this.reset();
    toggleStats();
});

document.addEventListener('DOMContentLoaded', () => {
    players = JSON.parse(localStorage.getItem('players')) || [];
    tempPlayers = JSON.parse(localStorage.getItem(tempStorageKey)) || [];
    updateField();
    updateTempStorage();
    setupInputValidation();
    setupPositionClickHandlers();
});