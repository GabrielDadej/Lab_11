// Funkcja obsługująca obracanie fizki
function flipCard(cardElement) {
    cardElement.classList.toggle('flipped');
}

// Zapisanie ukończenia modułu
document.getElementById('finish-flashcards').addEventListener('click', () => {
    // Zapisujemy w localStorage informację, że użytkownik przerobił fiszki (1 = zaliczone)
    localStorage.setItem('flashcardsCompleted', '1');

    const resultDiv = document.getElementById('flashcards-result');
    resultDiv.style.marginTop = "20px";
    resultDiv.style.padding = "15px";
    resultDiv.style.backgroundColor = "#dcfce7";
    resultDiv.style.borderRadius = "8px";
    resultDiv.innerHTML = `<h3>Świetnie! Fiszki zostały zaliczone. Twój postęp został zapisany.</h3>`;
    resultDiv.classList.remove('hidden');
});