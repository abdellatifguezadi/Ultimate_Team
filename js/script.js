
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
            { top: "80%", left: "50%", position: "GK" },
            { top: "60%", left: "20%", position: "LB" },
            { top: "60%", left: "40%", position: "CB" },
            { top: "60%", left: "60%", position: "CB" },
            { top: "60%", left: "80%", position: "RB" },
            { top: "35%", left: "20%", position: "LM" },
            { top: "35%", left: "40%", position: "CM" },
            { top: "35%", left: "60%", position: "CM" },
            { top: "35%", left: "80%", position: "RM" },
            { top: "10%", left: "35%", position: "ST" },
            { top: "10%", left: "64%", position: "ST" }
        ]
    },
    "433": {
        positions: [
            { top: "80%", left: "50%", position: "GK" },
            { top: "60%", left: "20%", position: "LB" },
            { top: "60%", left: "40%", position: "CB" },
            { top: "60%", left: "60%", position: "CB" },
            { top: "60%", left: "80%", position: "RB" },
            { top: "35%", left: "35%", position: "CM" },
            { top: "35%", left: "50%", position: "CM" },
            { top: "35%", left: "65%", position: "CM" },
            { top: "15%", left: "20%", position: "LW" },
            { top: "10%", left: "50%", position: "ST" },
            { top: "15%", left: "80%", position: "RW" }
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
            const card = createPlayerCard(player, position);
            field.appendChild(card);
        } else {

            const emptyCard = document.createElement('div');
            emptyCard.className = 'player-card empty';
            const positionMarker = document.createElement('div');
            positionMarker.className = 'position-marker';
            positionMarker.textContent = position.position;
            emptyCard.appendChild(positionMarker);
            emptyCard.style.top = position.top;
            emptyCard.style.left = position.left;
            field.appendChild(emptyCard);
        }
    });
    const benchPlayers = players.filter(player => !usedPlayers.has(player));
    benchPlayers.forEach(player => {
        const bancCard = createPlayerCard(player, { position: player.position });
        banc.appendChild(bancCard);
    });
}

function createPlayerCard(player, position) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img class="player-image" src="${player.photo}">
                <div class="logo-container">
                    <img class="flag-image" src="${player.flag}">
                    <img class="club-logo" src="${player.logo}">
                </div>
                <div class="player-rating">${player.rating}</div>
                <div class="position-marker">${position.position}</div>
                <div class="player-name">${player.name}</div>
            </div>
            <div class="card-back">
                <h3>${player.name}</h3>
                ${player.position === 'GK' ? `
                    <div class="stats">
                        <div class="stat">DIV: ${player.diving}</div>
                        <div class="stat">HAN: ${player.handling}</div>
                        <div class="stat">KIC: ${player.kicking}</div>
                        <div class="stat">REF: ${player.reflexes}</div>
                        <div class="stat">SPE: ${player.speed}</div>
                        <div class="stat">POS: ${player.positioning}</div>
                    </div>
                ` : `
                    <div class="stats">
                        <div class="stat">PAC: ${player.pace}</div>
                        <div class="stat">SHO: ${player.shooting}</div>
                        <div class="stat">PAS: ${player.passing}</div>
                        <div class="stat">DRI: ${player.dribbling}</div>
                        <div class="stat">DEF: ${player.defending}</div>
                        <div class="stat">PHY: ${player.physical}</div>
                    </div>
                `}
            </div>
        </div>
    `;

    if (position.top && position.left) {
        card.style.top = position.top;
        card.style.left = position.left;
    }

    return card;
}
function changeFormation() {
    updateField();
}

function toggleStats() {
    const position = document.getElementById('position').value;
    const normalStats = document.getElementById('normalStats');
    const gkStats = document.getElementById('gkStats');

    if (position === 'GK') {
        normalStats.style.display = 'none';
        gkStats.style.display = 'grid';
    } else if (position === '') {
        normalStats.style.display = 'none';
        gkStats.style.display = 'none';
    } else {
        normalStats.style.display = 'grid';
        gkStats.style.display = 'none';
    }
}

function createPlayerData() {
    const playerData = {
        name: nameInput.value,
        photo: photoInput.value,
        position: positionSelect.value,
        nationality: nationalitySelect.value,
        flag: flagUrls[nationalitySelect.value],
        club: clubSelect.value,
        logo: clubLogos[clubSelect.value],
        rating: ratingInput.value
    };

    if (positionSelect.value === 'GK') {
        playerData.diving = gkStatsInputs[0].value;
        playerData.handling = gkStatsInputs[1].value;
        playerData.kicking = gkStatsInputs[2].value;
        playerData.reflexes = gkStatsInputs[3].value;
        playerData.speed = gkStatsInputs[4].value;
        playerData.positioning = gkStatsInputs[5].value;
    } else {
        playerData.pace = normalStatsInputs[0].value;
        playerData.shooting = normalStatsInputs[1].value;
        playerData.passing = normalStatsInputs[2].value;
        playerData.dribbling = normalStatsInputs[3].value;
        playerData.defending = normalStatsInputs[4].value;
        playerData.physical = normalStatsInputs[5].value;
    }
    return playerData;
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
const nameInput = document.getElementById('name');
const photoInput = document.getElementById('photo');
const nationalitySelect = document.getElementById('nationality');
const clubSelect = document.getElementById('club');
const ratingInput = document.getElementById('rating');
const positionSelect = document.getElementById('position');
const normalStatsDiv = document.getElementById('normalStats');
const gkStatsDiv = document.getElementById('gkStats');
const normalStatsInputs = normalStatsDiv.querySelectorAll('input');
const gkStatsInputs = gkStatsDiv.querySelectorAll('input');

const allInputs = [nameInput, photoInput, nationalitySelect, clubSelect, ratingInput, positionSelect,
    ...normalStatsInputs, ...gkStatsInputs];

allInputs.forEach(input => {
    input.addEventListener('input', () => clearError(input));
});

playerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateInputs()) {
        return;
    }
    
    const newPlayer = createPlayerData();
    players.push(newPlayer);
    savePlayers();
    updateField();
    
    nameInput.value = '';
    photoInput.value = '';
    nationalitySelect.value = '';
    clubSelect.value = '';
    ratingInput.value = '';
    positionSelect.value = '';


    normalStatsInputs.forEach(input => input.value = '');
    gkStatsInputs.forEach(input => input.value = '');


    toggleStats();
});


document.addEventListener('DOMContentLoaded', () => {
    players = JSON.parse(localStorage.getItem('players')) || [];
    changeFormation();
    updateField();
});

function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
}
