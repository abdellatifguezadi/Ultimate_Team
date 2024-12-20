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
            { top: "82%", left: "47%", position: "GK" },
            { top: "49%", left: "80%", position: "RB" },
            { top: "51%", left: "59%", position: "CB" },
            { top: "51%", left: "35%", position: "CB" },
            { top: "49%", left: "11%", position: "LB" },
            { top: "9%", left: "80%", position: "RM" },
            { top: "19%", left: "59%", position: "CM" },
            { top: "19%", left: "35%", position: "CM" },
            { top: "9%", left: "11%", position: "LM" },
            { top: "-15%", left: "59%", position: "ST" },
            { top: "-15%", left: "35%", position: "ST" }
        ]
    },
    "433": {
        positions: [
            { top: "82%", left: "47%", position: "GK" },
            { top: "49%", left: "80%", position: "RB" },
            { top: "51%", left: "59%", position: "CB" },
            { top: "51%", left: "35%", position: "CB" },
            { top: "49%", left: "11%", position: "LB" },
            { top: "22%", left: "45%", position: "CM" },
            { top: "25%", left: "69%", position: "CM" },
            { top: "25%", left: "22%", position: "CM" },
            { top: "-9%", left: "75%", position: "LW" },
            { top: "-15%", left: "46%", position: "ST" },
            { top: "-9%", left: "16%", position: "RW" }
        ]
    }
};



const terrain_players = 'terrainPlayers';
const bench_players = 'benchPlayers';
const tempsPlayers = 'tempPlayers';

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

let players = JSON.parse(localStorage.getItem('players')) || [];
let tempPlayers = JSON.parse(localStorage.getItem(tempsPlayers)) || [];
let playerForEdit = null;
const FORMATION_KEY = 'selectedFormation';


const clubLeagues = {
    "Inter Miami": "MLS",
    "Al Nassr": "Saudi Pro League",
    "Manchester City": "Premier League",
    "Real Madrid": "La Liga",
    "Liverpool": "Premier League",
    "Al-Hilal": "Saudi Pro League",
    "Bayern Munich": "Bundesliga",
    "Atletico Madrid": "La Liga",
    "Al-Ittihad": "Saudi Pro League",
    "Manchester United": "Premier League",
    "Paris Saint-Germain": "Ligue 1",
    "Fenerbahçe": "Super Lig",
    "PSV": "Eredivisie"
};

// change stats gardien/joueur normal
function toggleStats() {
    if (positionSelect.value === 'GK') {
        normalStatsDiv.style.display = 'none';
        gkStatsDiv.style.display = 'grid';
    } else {
        normalStatsDiv.style.display = 'grid';
        gkStatsDiv.style.display = 'none';
    }
}

// verifie si formulaire bien rempli
function validateInputs() {
    let isValid = true;
    
    
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Le nom est obligatoire');
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


// efface toutes les erreurs
function clearAllValidation() {
    const inputs = [nameInput, photoInput, nationalitySelect, clubSelect, ratingInput, positionSelect, ...normalStatsInputs, ...gkStatsInputs];
    inputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
        input.addEventListener('change', () => clearError(input));
    });
}

// affiche message erreur rouge
function showError(inputElement, message) {
    const errorContainer = document.querySelector('.form-errors') || createErrorContainer();
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    inputElement.classList.add('input-error');
}

// crée le conteneur d'erreur
function createErrorContainer() {
    const container = document.createElement('div');
    container.className = 'form-errors';
    playerForm.insertBefore(container, playerForm.firstChild);
    return container;
}

// enleve message erreur rouge
function clearError(inputElement) {
    const errorContainer = document.querySelector('.form-errors');
    if (errorContainer) {
        errorContainer.style.display = 'none';
    }
    inputElement.classList.remove('input-error');
}

// cree position vide terrain
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

// cree position vide banc
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

// cree nouveau joueur du formulaire
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

// cree carte visuelle joueur
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

// supprime joueur du jeu
function removePlayerCard(event, playerName) {
    event.stopPropagation();
    
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const benchPlayers = JSON.parse(localStorage.getItem(bench_players)) || [];
    const tempStoragePlayers = JSON.parse(localStorage.getItem(tempsPlayers)) || [];
    
    const newTerrainPlayers = terrainPlayers.filter(p => p.name !== playerName);
    const newBenchPlayers = benchPlayers.filter(p => p.name !== playerName);
    const newTempPlayers = tempStoragePlayers.filter(p => p.name !== playerName);
    
    localStorage.setItem(terrain_players, JSON.stringify(newTerrainPlayers));
    localStorage.setItem(bench_players, JSON.stringify(newBenchPlayers));
    localStorage.setItem(tempsPlayers, JSON.stringify(newTempPlayers));
    
    updateField();
    teamChemistry();
    updatTemps();
}



// modifie carte joueur existant
function editPlayerCard(event, playerName) {
    event.stopPropagation();
    
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const benchPlayers = JSON.parse(localStorage.getItem(bench_players)) || [];
    const tempStoragePlayers = JSON.parse(localStorage.getItem(tempsPlayers)) || [];
    
    const player = [...terrainPlayers, ...benchPlayers, ...tempStoragePlayers]
        .find(p => p.name === playerName);
        
    if (player) {
        playerForEdit = {
            ...player,
            originalPosition: player.position
        };

        const submitButton = playerForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Modifier Joueur';

        fillFormWithPlayerData(player);
    }
}


// remplit formulaire avec joueur existant
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

// remplit stats de gardien
function fillGKStats(player) {
    document.querySelector('#gkStats input[placeholder="Diving"]').value = player.diving;
    document.querySelector('#gkStats input[placeholder="Handling"]').value = player.handling;
    document.querySelector('#gkStats input[placeholder="Kicking"]').value = player.kicking;
    document.querySelector('#gkStats input[placeholder="Reflexes"]').value = player.reflexes;
    document.querySelector('#gkStats input[placeholder="Speed"]').value = player.speed;
    document.querySelector('#gkStats input[placeholder="Positioning"]').value = player.positioning;
}

// remplit stats de joueur
function fillPlayerStats(player) {
    document.querySelector('#normalStats input[placeholder="Pace"]').value = player.pace;
    document.querySelector('#normalStats input[placeholder="Shooting"]').value = player.shooting;
    document.querySelector('#normalStats input[placeholder="Passing"]').value = player.passing;
    document.querySelector('#normalStats input[placeholder="Dribbling"]').value = player.dribbling;
    document.querySelector('#normalStats input[placeholder="Defending"]').value = player.defending;
    document.querySelector('#normalStats input[placeholder="Physical"]').value = player.physical;
}



// modifie joueur deja existant
function handlePlayerEdit(newPlayer) {
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const benchPlayers = JSON.parse(localStorage.getItem(bench_players)) || [];
    const tempStoragePlayers = JSON.parse(localStorage.getItem(tempsPlayers)) || [];

    const wasOnField = terrainPlayers.find(p => p.name === playerForEdit.name);
    const wasOnBench = benchPlayers.find(p => p.name === playerForEdit.name);
    const wasInTemp = tempStoragePlayers.find(p => p.name === playerForEdit.name);
    

    const newTerrainPlayers = terrainPlayers.filter(p => p.name !== playerForEdit.name);
    const newBenchPlayers = benchPlayers.filter(p => p.name !== playerForEdit.name);
    const newTempPlayers = tempStoragePlayers.filter(p => p.name !== playerForEdit.name);
    

    if (wasOnField) {
        newTerrainPlayers.push({
            ...newPlayer,
            top: wasOnField.top,
            left: wasOnField.left
        });
    } else if (wasOnBench) {
        newBenchPlayers.push(newPlayer);
    } else if (wasInTemp) {
        newTempPlayers.push(newPlayer);
    }


    localStorage.setItem(terrain_players, JSON.stringify(newTerrainPlayers));
    localStorage.setItem(bench_players, JSON.stringify(newBenchPlayers));
    localStorage.setItem(tempsPlayers, JSON.stringify(newTempPlayers));

    tempPlayers = newTempPlayers;

    updateField();
    teamChemistry();
    updatTemps();

    const tempStorage = document.querySelector('.temp-storage');
    if (wasInTemp) {
        showAllPlayers();
        tempStorage.style.display = 'block';
    } else {
        tempStorage.style.display = 'none';
    }

    clearAllValidation();
    playerForm.reset();
    toggleStats();
    playerForEdit = null;

    const submitButton = playerForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Ajouter Joueur';
}


// met les joueurs dans terrain
function updateField() {
    const field = document.querySelector('.field');
    const formation = document.getElementById('formation').value;
    field.innerHTML = '';
    
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const benchPlayers = JSON.parse(localStorage.getItem(bench_players)) || [];
    let newTerrainPlayers = [];
    
    const placedPlayers = new Set(); 
    
    formations[formation].positions.forEach(position => {
        const existingPlayer = terrainPlayers.find(p => 
            p.position === position.position && 
            !placedPlayers.has(p.name)
        );
        
        if (existingPlayer) {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.dataset.playerName = existingPlayer.name;
            playerCard.innerHTML = createPlayer(existingPlayer);
            playerCard.style.position = 'absolute';
            playerCard.style.top = position.top;
            playerCard.style.left = position.left;
            
            field.appendChild(playerCard);
            placedPlayers.add(existingPlayer.name);
            newTerrainPlayers.push({
                ...existingPlayer,
                top: position.top,
                left: position.left
            });
        } else {
            const emptyCard = createEmptyCard(position);
            field.appendChild(emptyCard);
        }
    });
    
    // placer les joueurs restants dans positions disponibles
    terrainPlayers.forEach(player => {
        if (!placedPlayers.has(player.name)) {
            const availablePosition = formations[formation].positions.find(pos => {
                const existingCard = Array.from(field.children).find(card => 
                    card.style.top === pos.top && 
                    card.style.left === pos.left && 
                    !card.classList.contains('empty-position')
                );
                return !existingCard;
            });
            
            if (availablePosition) {
                const playerCard = document.createElement('div');
                playerCard.className = 'player-card wrong-position';
                playerCard.dataset.playerName = player.name;
                playerCard.innerHTML = createPlayer(player);
                playerCard.style.position = 'absolute';
                playerCard.style.top = availablePosition.top;
                playerCard.style.left = availablePosition.left;
                
                field.appendChild(playerCard);
                placedPlayers.add(player.name);
                newTerrainPlayers.push({
                    ...player,
                    top: availablePosition.top,
                    left: availablePosition.left
                });
            } else {
                benchPlayers.push(player);
            }
        }
    });
    
    // mettre a jour le banc
    const banc = document.querySelector('.banc');
    banc.innerHTML = '';
    
    const uniqueBenchPlayers = benchPlayers.filter(player => 
        !placedPlayers.has(player.name)
    );
    
    uniqueBenchPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.dataset.playerName = player.name;
        playerCard.innerHTML = createPlayer(player);
        playerCard.style.position = 'relative';
        banc.appendChild(playerCard);
    });
    
    const remainingBenchSlots = 12 - uniqueBenchPlayers.length;
    for(let i = 0; i < remainingBenchSlots; i++) {
        banc.appendChild(createEmptyBenchCard());
    }
    
    localStorage.setItem(terrain_players, JSON.stringify(newTerrainPlayers));
    localStorage.setItem(bench_players, JSON.stringify(uniqueBenchPlayers));
    

    document.querySelector('.temp-storage').style.display = 'none';
    
    positionTerrain();
    bancVideClick();
    switchPlayers();

    
    document.dispatchEvent(new Event('fieldUpdate'));

   
}

// gere clics sur terrain
function positionTerrain() {
    const emptyCards = document.querySelectorAll('.field .empty-position, .banc .empty-position');
    emptyCards.forEach(card => {
        card.addEventListener('click', function() {
            const selectedPlayer = document.querySelector('.selected-player');
            if (selectedPlayer) {
                const player1Name = selectedPlayer.dataset.playerName;
                const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
                const benchPlayers = JSON.parse(localStorage.getItem(bench_players)) || [];
                
                const player1 = terrainPlayers.find(p => p.name === player1Name) || 
                               benchPlayers.find(p => p.name === player1Name);
                
                if (player1) {
                    const positionMarker = this.querySelector('.position-marker');
                    if (positionMarker && (positionMarker.textContent === player1.position || positionMarker.textContent === 'BANC')) {
                        movePlayerToEmptyPosition(player1, this);
                        selectedPlayer.classList.remove('selected-player');
                    }
                }
            } else {
                const positionMarker = this.querySelector('.position-marker');
                if (positionMarker && positionMarker.textContent !== 'BANC') {
                    showMatchingPlayers(positionMarker.textContent);
                } else {
                    showAllPlayers();
                }
            }
        });
    });

}

// actualise liste joueurs disponibles
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

// gere clic sur joueur
function gererClickPlayer(player) {
    if (!player) return;

    const emptyPositions = Array.from(document.querySelectorAll('.field .empty-position'));
    
    const matchingPosition = emptyPositions.find(pos => {
        const marker = pos.querySelector('.position-marker');
        if (!marker) return false;
        return marker.textContent === player.position;
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

// gere clics banc vide
function bancVideClick() {
    const benchCards = document.querySelectorAll('.banc .empty-position');
    benchCards.forEach(card => {
        card.addEventListener('click', function() {
            if (!selectedPlayer) {
                return;
            }
            showAllPlayers();
        });
    });
}

// affiche tous joueurs disponibles
function showAllPlayers() {

    const selectedPlayer = document.querySelector('.selected-player');
    if (selectedPlayer) return;

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

// montre joueurs pour position
function showMatchingPlayers(position) {
    const selectedPlayer = document.querySelector('.selected-player');
    if (selectedPlayer) return;

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

// echange position deux joueurs

function switchPlayers() {
    let selectedPlayer = null;
    const allPlayers = document.querySelectorAll('.field .player-card, .banc .player-card');
    
    allPlayers.forEach(player => {
        player.addEventListener('click', function() {
            if (!selectedPlayer) {
                if (!this.classList.contains('empty-position')) {
                    selectedPlayer = this;
                    this.classList.add('selected-player');
                }
            } 
            else if (this !== selectedPlayer) {
                const player1IsField = selectedPlayer.closest('.field') !== null;
                const player2IsField = this.closest('.field') !== null;
                
                const player1Name = selectedPlayer.dataset.playerName;
                const player2Name = this.classList.contains('empty-position') ? null : this.dataset.playerName;
                
                const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
                const benchPlayers = JSON.parse(localStorage.getItem(bench_players)) || [];
                
                const player1 = player1IsField ? terrainPlayers.find(p => p.name === player1Name) : benchPlayers.find(p => p.name === player1Name);
                const player2 = player2Name ? (player2IsField ? terrainPlayers.find(p => p.name === player2Name) : benchPlayers.find(p => p.name === player2Name)) : null;

                if (player1 && player2) {
                    if (player1IsField && player2IsField) {
                        const tempTop = player1.top;
                        const tempLeft = player1.left;
                        player1.top = player2.top;
                        player1.left = player2.left;
                        player2.top = tempTop;
                        player2.left = tempLeft;
                    } else {
                        if (player1IsField) {
                            const newTerrainPlayers = terrainPlayers.filter(p => p.name !== player1Name);
                            newTerrainPlayers.push({
                                ...player2,
                                top: player1.top,
                                left: player1.left
                            });
                            
                            const newBenchPlayers = benchPlayers.filter(p => p.name !== player2Name);
                            newBenchPlayers.push({...player1, top: '', left: ''});
                            
                            localStorage.setItem(terrain_players, JSON.stringify(newTerrainPlayers));
                            localStorage.setItem(bench_players, JSON.stringify(newBenchPlayers));
                        } else {
                            const newTerrainPlayers = terrainPlayers.filter(p => p.name !== player2Name);
                            newTerrainPlayers.push({
                                ...player1,
                                top: player2.top,
                                left: player2.left
                            });
                            
                            const newBenchPlayers = benchPlayers.filter(p => p.name !== player1Name);
                            newBenchPlayers.push({...player2, top: '', left: ''});
                            
                            localStorage.setItem(terrain_players, JSON.stringify(newTerrainPlayers));
                            localStorage.setItem(bench_players, JSON.stringify(newBenchPlayers));
                        }
                    }
                    updateField();
                    teamChemistry();
                }
                
                selectedPlayer.classList.remove('selected-player');
                selectedPlayer = null;
            }
            else {
                this.classList.remove('selected-player');
                selectedPlayer = null;
            }
        });
    });
}

// place joueur nouvelle position
function movePlayerToPosition(player, targetPosition) {
    tempPlayers = tempPlayers.filter(p => p.name !== player.name);
    localStorage.setItem(tempsPlayers, JSON.stringify(tempPlayers));
    
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
        const benchPlayers = JSON.parse(localStorage.getItem(bench_players)) || [];
        benchPlayers.push(player);
        localStorage.setItem(bench_players, JSON.stringify(benchPlayers));
    }
    
    targetPosition.parentElement.replaceChild(playerCard, targetPosition);
    updatTemps();
    document.querySelector('.temp-storage').style.display = 'none';

    const tempStorage = document.querySelector('.temp-storage');
    const wasVisible = tempStorage.style.display === 'block';
    updateField();
    if (!wasVisible) {
        tempStorage.style.display = 'none';
    }
    
    teamChemistry();
}


// fonction pour gerer le deplacement vers une position vide
function movePlayerToEmptyPosition(player, targetPosition) {
    const isFieldPosition = targetPosition.closest('.field');
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const benchPlayers = JSON.parse(localStorage.getItem(bench_players)) || [];

    const newTerrainPlayers = terrainPlayers.filter(p => p.name !== player.name);
    const newBenchPlayers = benchPlayers.filter(p => p.name !== player.name);
    
    if (isFieldPosition) {
        newTerrainPlayers.push({
            ...player,
            top: targetPosition.style.top,
            left: targetPosition.style.left
        });
    } else {
        newBenchPlayers.push(player);
    }
    
    localStorage.setItem(terrain_players, JSON.stringify(newTerrainPlayers));
    localStorage.setItem(bench_players, JSON.stringify(newBenchPlayers));
    
    updateField();
    teamChemistry();
}

// calcule la chimie individuelle
function playerChemistry(player, allPlayers, formation) {
    let chemistry = 0;

    const positionInfo = formations[formation].positions.find(pos => 
        pos.top === player.top && pos.left === player.left
    );
    if (positionInfo && positionInfo.position === player.position) {
        chemistry += 10;
    }
    
    const adjacentPlayers = findAdjacentPlayers(player, allPlayers);
    
    if (adjacentPlayers.length > 0) {
        const hasClubLink = adjacentPlayers.some(p => 
            getClub(p.logo) === getClub(player.logo)
        );
        if (hasClubLink) {
            chemistry += 3;
        }
        
        const leagueLinkCount = Math.min(2, adjacentPlayers.filter(p => 
            clubLeagues[getClub(p.logo)] === clubLeagues[getClub(player.logo)]
        ).length);
        chemistry += leagueLinkCount * 2;
        
        const hasNationalityLink = adjacentPlayers.some(p => 
            getNationality(p.flag) === getNationality(player.flag)
        );
        if (hasNationalityLink) {
            chemistry += 1;
        }
    }
    
    return chemistry;
}

// trouve les joueurs adjacents
function findAdjacentPlayers(player, allPlayers) {
    const threshold = 50; 
    
    return allPlayers.filter(p => {
        if (p.name === player.name) return false;
        
        const xDiff = Math.abs(parseFloat(p.left) - parseFloat(player.left));
        const yDiff = Math.abs(parseFloat(p.top) - parseFloat(player.top));
        
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff) <= threshold;
    });
}



// affichage du score total
function teamChemistry() {
    const terrainPlayers = JSON.parse(localStorage.getItem(terrain_players)) || [];
    const formation = document.getElementById('formation').value;
    
    let totalChemistry = 0;
    terrainPlayers.forEach(player => {
        totalChemistry += playerChemistry(player, terrainPlayers, formation);
    });
    
    const chemistryDisplay = document.querySelector('.total-chemistry') || 
        createChemistryDisplay();
    chemistryDisplay.textContent = `Score Formation: ${totalChemistry}/198`;
}


// element d'affichage du score
function createChemistryDisplay() {
    const display = document.createElement('div');
    display.className = 'total-chemistry';
    document.querySelector('.formation-selector').appendChild(display);
    return display;
}



function getClub(logoUrl) {
    return Object.keys(clubLogos).find(club => clubLogos[club] === logoUrl);
}


function getNationality(flagUrl) {
    return Object.keys(flagcdn).find(nationality => flagcdn[nationality] === flagUrl);
}


document.addEventListener('DOMContentLoaded', () => {
    players = JSON.parse(localStorage.getItem('players')) || [];
    tempPlayers = JSON.parse(localStorage.getItem(tempsPlayers)) || [];

    const savedFormation = localStorage.getItem(FORMATION_KEY) || '442';
    document.getElementById('formation').value = savedFormation;
    
    updateField();
    teamChemistry();
    updatTemps();
    clearAllValidation();
    positionTerrain();

});

document.getElementById('formation').addEventListener('change', function() {
    localStorage.setItem(FORMATION_KEY, this.value);
    updateField();
    teamChemistry();
});

document.querySelectorAll('.toggle-temp-storage').forEach(button => {
    button.addEventListener('click', function() {
        const tempStorage = document.querySelector('.temp-storage');
        if (tempStorage.style.display === 'none') {
            showAllPlayers();
        } else {
            tempStorage.style.display = 'none';
        }
    });
});

  
playerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    const newPlayer = createPlayerData();
    
    if (playerForEdit) {
        handlePlayerEdit(newPlayer);
        return;
    }
    
    tempPlayers.push(newPlayer);
    localStorage.setItem(tempsPlayers, JSON.stringify(tempPlayers));
    
    updateField();
    teamChemistry();
    updatTemps();
    clearAllValidation();
    this.reset();
    toggleStats();
   
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.textContent = 'Ajouter Joueur';
});







