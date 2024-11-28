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
            { top: "60%", left: "43%", position: "GK" },
            { top: "45%", left: "75%", position: "LB" }, 
            { top: "47%", left: "58%", position: "CB" },  
            { top: "47%", left: "27%", position: "CB" },  
            { top: "44%", left: "9%", position: "RB" }, 
            { top: "20%", left: "75%", position: "LM" }, 
            { top: "25%", left: "58%", position: "CM" }, 
            { top: "25%", left: "27%", position: "CM" }, 
            { top: "20%", left: "9%", position: "RM" }, 
            { top: "3%", left: "53%", position: "ST" }, 
            { top: "3%", left: "32%", position: "ST" }  
        ]
    },
    "433": {
        positions: [
            { top: "60%", left: "43%", position: "GK" },  
            { top: "45%", left: "75%", position: "LB" },  
            { top: "47%", left: "58%", position: "CB" },  
            { top: "47%", left: "27%", position: "CB" },  
            { top: "44%", left: "9%", position: "RB" },  
            { top: "25%", left: "65%", position: "CM" },  
            { top: "20%", left: "42%", position: "CM" },   
            { top: "25%", left: "20%", position: "CM" },
            { top: "10%", left: "70%", position: "LW" },
            { top: "2%", left: "43%", position: "ST" },  
            { top: "10%", left: "15%", position: "RW" }  
        ]
    }
};

let players = JSON.parse(localStorage.getItem('players')) || [];

function updateField() {
    const formationSelect = document.getElementById('formation');
    const field = document.querySelector('.field');
    const banc = document.querySelector('.banc');
    field.innerHTML = '';
    banc.innerHTML = '';

    const selectedFormation = formations[formationSelect.value];
    const usedPlayers = new Set();
    
    selectedFormation.positions.forEach(position => {
        const player = players.find(p => 
            p.position === position.position && 
            !usedPlayers.has(p)
        );
        
        if (player) {
            usedPlayers.add(player);
            field.appendChild(createPlayerCard(player, position));
        } else {
            field.appendChild(createEmptyCard(position));
        }
    });

    const benchPlayers = players.filter(p => !usedPlayers.has(p));
    benchPlayers.forEach(player => {
        banc.appendChild(createPlayerCard(player, { position: 'banc' }));
    });

    const emptySlots = Math.max(0, 7 - benchPlayers.length);
    for (let i = 0; i < emptySlots; i++) {
        banc.appendChild(createEmptyBenchCard());
    }

    savePlayers();
}

function createPlayerCard(player, position) {
    const card = document.createElement('div');
    card.className = 'player-card fifa-card';
    card.draggable = true;
    
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragover', handleDragOver);
    card.addEventListener('drop', handleDrop);
    
    card.dataset.playerName = player.name;
    card.dataset.position = position.position;
    
    card.innerHTML = `
        <div class="card-inner">

            <div class="player-image-container">
                <img class="player-image" src="${player.photo}" alt="${player.name}">
                <div class="card-footer">
                <img class="flag-image" src="${player.flag}">
                <img class="club-logo" src="${player.logo}">
            </div>
            </div>
            <div class="player-name">${player.name}</div>
            <div class="player-stats">
                <div class="stat-row">
                    <span class="stat">PAC ${player.pace}</span>
                    <span class="stat">DRI ${player.dribbling}</span>
                    <span class="stat">SHO ${player.shooting}</span>
                    <span class="stat">DEF ${player.defending}</span>
                </div>
                <div class="stat-row">
                    
                    <span class="stat">PAS ${player.passing}</span>
                    <span class="stat">PHY ${player.physical}</span>
                     <span class="rating">${player.rating}</span>
                     <span class="position">${position.position}</span>
                </div>  
            </div>
           
        </div>
    `;

    if (position.top && position.left) {
        card.style.top = position.top;
        card.style.left = position.left;
    }

    return card;
}

function createEmptyCard(position) {
    const emptyCard = document.createElement('div');
    emptyCard.className = 'player-card empty-position';
    emptyCard.style.top = position.top;
    emptyCard.style.left = position.left;
    
    emptyCard.addEventListener('dragover', handleDragOver);
    emptyCard.addEventListener('drop', handleDrop);
    
    const positionMarker = document.createElement('div');
    positionMarker.className = 'position-marker';
    positionMarker.textContent = position.position;
    emptyCard.appendChild(positionMarker);
    
    return emptyCard;
}

function createEmptyBenchCard() {
    const emptyCard = document.createElement('div');
    emptyCard.className = 'player-card empty-position';
    
    const positionMarker = document.createElement('div');
    positionMarker.className = 'position-marker';
    positionMarker.textContent = 'BANC';
    emptyCard.appendChild(positionMarker);
    
    emptyCard.addEventListener('dragover', handleDragOver);
    emptyCard.addEventListener('drop', handleDrop);
    
    return emptyCard;
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.playerName);
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    
    const draggedPlayerName = e.dataTransfer.getData('text/plain');
    const draggedCard = document.querySelector(`.player-card[data-player-name="${draggedPlayerName}"]`);
    const targetCard = e.target.closest('.player-card, .empty-position');
    
    if (draggedCard && targetCard) {
        const draggedPlayer = players.find(p => p.name === draggedPlayerName);

        if (targetCard.classList.contains('empty-position') && targetCard.closest('.banc')) {
            draggedPlayer.position = 'banc';
        } else if (targetCard.classList.contains('empty-position')) {
            const targetPosition = targetCard.querySelector('.position-marker').textContent;
            draggedPlayer.position = targetPosition;
        } else {
            const targetPlayer = players.find(p => p.name === targetCard.dataset.playerName);
            if (draggedPlayer && targetPlayer) {
                const tempPosition = draggedPlayer.position;
                draggedPlayer.position = targetPlayer.position;
                targetPlayer.position = tempPosition;
            }
        }
        
        updateField();
        savePlayers();
    }
    
    document.querySelectorAll('.player-card').forEach(card => {
        card.classList.remove('dragging');
    });
}

function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
}

function changeFormation() {
    updateField();
}


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

document.addEventListener('DOMContentLoaded', () => {
    players = JSON.parse(localStorage.getItem('players')) || [];
    changeFormation();
    updateField();
    setupInputValidation();
});

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
function setupInputValidation() {
    const inputs = [
        nameInput, 
        photoInput, 
        nationalitySelect, 
        clubSelect, 
        ratingInput, 
        positionSelect,
        ...normalStatsInputs,
        ...gkStatsInputs
    ];

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
const playerForm = document.querySelector('.player-form');


playerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateInputs()) {
        return;
    }
    
    const newPlayer = createPlayerData();
    players.push(newPlayer);
    savePlayers();
    updateField();
    
    this.reset();
    toggleStats();
});



function toggleStats() {
    const positionSelect = document.getElementById('position');
    const normalStatsDiv = document.getElementById('normalStats');
    const gkStatsDiv = document.getElementById('gkStats');

    if (positionSelect.value === 'GK') {
        normalStatsDiv.style.display = 'none';
        gkStatsDiv.style.display = 'grid';
    } else {
        normalStatsDiv.style.display = 'grid';
        gkStatsDiv.style.display = 'none';
    }
}

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



document.getElementById('position').addEventListener('change', toggleStats);

