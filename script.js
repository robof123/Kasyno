const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '🔔', '💰'];
const spinButton = document.getElementById('spin-button');
const depositButton = document.getElementById('deposit-button');
const resultDisplay = document.getElementById('result');
const balanceDisplay = document.getElementById('balance');
const betInput = document.getElementById('bet-input');
const depositInput = document.getElementById('deposit-input');

let balance = 100; // Początkowe saldo

// Obsługa wpłaty
depositButton.addEventListener('click', () => {
    const depositAmount = parseInt(depositInput.value); // Kwota wpłaty

    if (isNaN(depositAmount) || depositAmount <= 0) {
        resultDisplay.textContent = 'Wprowadź prawidłową kwotę wpłaty!';
        return;
    }

    balance += depositAmount; // Dodajemy wpłatę do salda
    updateBalanceDisplay();
    depositInput.value = ''; // Czyścimy pole po wpłacie
});

// Obsługa obrotu
spinButton.addEventListener('click', () => {
    const betAmount = parseInt(betInput.value); // Kwota obstawiona przez gracza

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        resultDisplay.textContent = 'Wprowadź prawidłową kwotę obstawienia!';
        return;
    }

    balance -= betAmount; // Odejmujemy kwotę zakładu od salda
    updateBalanceDisplay();

    const slots = document.querySelectorAll('.slot');
    const spinDuration = 1500; // Czas trwania animacji losowania
    const intervalDuration = 10; // Czas między zmianami emotek

    slots.forEach(slot => {
        slot.classList.add('spinning'); // Dodajemy klasę animacji
    });

    const spinInterval = setInterval(() => {
        slots.forEach(slot => {
            slot.textContent = getRandomSymbol();
        });
    }, intervalDuration);

    setTimeout(() => {
        clearInterval(spinInterval); // Zatrzymujemy losowanie
        // Ostateczne losowanie emotek
        const finalSlots = Array.from(slots).map(() => getRandomSymbol());
        slots.forEach((slot, index) => {
            slot.textContent = finalSlots[index];
            slot.classList.remove('spinning'); // Usuwamy klasę animacji
        });

        checkResult(finalSlots[0], finalSlots[1], finalSlots[2], betAmount);
    }, spinDuration);
});

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function checkResult(slot1, slot2, slot3, betAmount) {
    // Zasady wygranej: wszystkie sloty muszą być takie same
    if (slot1 === slot2 && slot2 === slot3) {
        const winnings = betAmount * 5; // Wycena wygranej
        balance += winnings; // Dodajemy wygraną do salda
        resultDisplay.textContent = `Gratulacje! Wygrałeś: ${winnings}!`;
    } else {
        resultDisplay.textContent = 'Spróbuj ponownie!';
    }
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    balanceDisplay.textContent = `Saldo: ${balance}`;
}
