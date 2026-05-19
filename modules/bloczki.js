// Oczekiwana poprawna kolejność bloczków
const correctOrder = ["fun", "sum(a: Int, b: Int)", ": Int", "{", "return a + b", "}"];

// Losowe przemieszanie bloczków na starcie
const shuffledBlocks = [...correctOrder].sort(() => Math.random() - 0.5);

const pool = document.getElementById('blocks-pool');
const zone = document.getElementById('drop-zone');

// Renderowanie losowych bloczków w puli
shuffledBlocks.forEach((text, index) => {
    const block = document.createElement('div');
    block.className = 'code-block';
    block.innerText = text;
    block.id = `block-${index}`;
    block.draggable = true;
    
    block.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
    
    pool.appendChild(block);
});

// Obsługa stref upuszczania (zarówno do strefy rozwiązania, jak i powrót do puli)
[zone, pool].forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault(); // Wymagane, aby pozwolić na drop
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        const blockId = e.dataTransfer.getData('text/plain');
        const block = document.getElementById(blockId);
        
        // Zabezpieczenie, aby upuszczać bezpośrednio do kontenera, a nie na inny bloczek
        if (e.target.classList.contains('drop-zone') || e.target.classList.contains('blocks-pool')) {
            e.target.appendChild(block);
        } else {
            e.target.parentElement.appendChild(block);
        }
    });
});

// Sprawdzanie wyniku
document.getElementById('check-blocks').addEventListener('click', () => {
    const currentBlocks = Array.from(zone.children).map(b => b.innerText);
    
    let isCorrect = currentBlocks.length === correctOrder.length &&
                    currentBlocks.every((val, i) => val === correctOrder[i]);
                    
    const score = isCorrect ? 1 : 0;
    localStorage.setItem('blocksScore', score);

    const resultDiv = document.getElementById('blocks-result');
    resultDiv.style.marginTop = "20px";
    resultDiv.style.padding = "15px";
    resultDiv.style.borderRadius = "8px";

    if (isCorrect) {
        resultDiv.style.backgroundColor = "#dcfce7";
        resultDiv.innerHTML = `<h3>Brawo! Kod został ułożony poprawnie. (1/1 pkt)</h3>`;
    } else {
        resultDiv.style.backgroundColor = "#fee2e2";
        resultDiv.innerHTML = `<h3>Niestety, to nie jest poprawna kolejność. Spróbuj jeszcze raz! (0/1 pkt)</h3>`;
    }
    resultDiv.classList.remove('hidden');
});