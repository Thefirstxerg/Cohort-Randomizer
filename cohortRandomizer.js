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
    }
}

function randomizeCohort() {
    let selectedItems = document.querySelectorAll('.name-item.selected');
    let cohort = Array.from(selectedItems).map(item => item.textContent);

    if (cohort.length === 0) {
        alert('Please select at least one name.');
        return;
    }

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

window.onload = () => {
    const defaultNames = ['Aidan', 'Cadee', 'Courtney', 'Ethan', 'Lesedi', 'Lindo', 'Marvelous', 'Mieke', 'Phomello', 'Pierre', 'Ronny', 'Sibu', 'Tom', 'Ulrich'];
    defaultNames.sort().forEach(name => addName(name));
};