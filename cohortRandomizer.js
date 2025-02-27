let randomizeMode = 'mode1';

function setRandomizeMode(mode) {
    randomizeMode = mode;
    document.getElementById('mode1Label').classList.toggle('active', mode === 'mode1');
    document.getElementById('mode2Label').classList.toggle('active', mode === 'mode2');
    document.getElementById('groupSizeContainer').style.display = mode === 'mode2' ? 'block' : 'none';
}

function randomizeCohort() {
    let selectedItems = document.querySelectorAll('.name-item.selected');
    let cohort = Array.from(selectedItems).map(item => item.textContent);

    if (cohort.length === 0) {
        alert('Please select at least one name.');
        return;
    }

    if (randomizeMode === 'mode1') {
        randomizePairs(cohort);
    } else if (randomizeMode === 'mode2') {
        const groupSize = parseInt(document.getElementById('groupSizeInput').value);
        if (isNaN(groupSize) || groupSize <= 0) {
            alert('Please enter a valid group size.');
            return;
        }
        randomizeGroups(cohort, groupSize);
    }
}

function randomizePairs(cohort) {
    // Shuffle the cohort array
    for (let i = cohort.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cohort[i], cohort[j]] = [cohort[j], cohort[i]];
    }

    // Pair students together
    let pairs = [];
    while (cohort.length > 1) {
        let pair = [cohort.pop(), cohort.pop()];
        pairs.push(pair);
    }

    // If there's an odd number of students, the last one is left alone
    let leftAlone = cohort.length === 1 ? cohort[0] : null;

    // Clear the result container
    let resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    // Display the pairs and the student left alone
    pairs.forEach(pair => {
        let pairElement = document.createElement('p');
        pairElement.textContent = `Pair: ${pair[0]} with ${pair[1]}`;
        resultContainer.appendChild(pairElement);
    });

    if (leftAlone) {
        let soloElement = document.createElement('p');
        soloElement.textContent = `Solo: ${leftAlone}`;
        resultContainer.appendChild(soloElement);
    }
}

function randomizeGroups(cohort, groupSize) {
    const shuffledNames = cohort.sort(() => Math.random() - 0.5);
    const groups = [];

    while (shuffledNames.length) {
        groups.push(shuffledNames.splice(0, groupSize));
    }

    // Distribute remaining names
    for (let i = 0; i < shuffledNames.length; i++) {
        groups[i % groups.length].push(shuffledNames[i]);
    }

    displayGroups(groups);
}

function displayGroups(groups) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.innerHTML = `<h3>Group ${index + 1}</h3><p>${group.join(', ')}</p>`;
        resultDiv.appendChild(groupDiv);
    });
}

function addName(name = null) {
    let nameInput = name || document.getElementById('nameInput').value.trim();
    if (nameInput === '') {
        alert('Please enter a name.');
        return;
    }

    let nameList = document.getElementById('nameList');
    let nameItem = document.createElement('div');
    nameItem.className = 'name-item';
    nameItem.textContent = nameInput;
    nameItem.onclick = () => nameItem.classList.toggle('selected');
    nameList.appendChild(nameItem);

    if (!name) {
        document.getElementById('nameInput').value = '';
        saveNameToLocalStorage(nameInput);
    }
}

function saveNameToLocalStorage(name) {
    let names = JSON.parse(localStorage.getItem('names')) || [];
    names.push(name);
    localStorage.setItem('names', JSON.stringify(names));
}

function loadNamesFromLocalStorage() {
    let names = JSON.parse(localStorage.getItem('names')) || [];
    names.forEach(name => addName(name));
}

window.onload = () => {
    const defaultNames = ['Aidan', 'Cadee', 'Courtney', 'Ethan', 'Lesedi', 'Lindo', 'Marvelous', 'Mieke', 'Phomello', 'Pierre', 'Ronny', 'Sibu', 'Tom', 'Ulrich'];
    defaultNames.sort().forEach(name => addName(name));
    loadNamesFromLocalStorage();
    setRandomizeMode(randomizeMode);
};