document.addEventListener('DOMContentLoaded', function () {
    const words = [
        {
            word: "AUDITORIA",
            hints: ["Revisão sistemática de contas.", "Garantia de conformidade financeira."]
        },
        {
            word: "COMPLIANCE",
            hints: ["Conformidade com leis e regulamentos.", "Termo relacionado à ética corporativa."]
        },
        {
            word: "GOVERNANCA",
            hints: ["Conjunto de práticas que regulam a gestão corporativa.", "Relacionada à administração responsável."]
        },
        {
            word: "TRANSPARENCIA",
            hints: ["Princípio ético nas organizações.", "Clareza nas demonstrações financeiras."]
        },
        {
            word: "INTEGRIDADE",
            hints: ["Honestidade nas práticas empresariais.", "Valor essencial em compliance."]
        },
        {
            word: "FRAUDE",
            hints: ["Ato ilícito que afeta finanças.", "Comum em investigações de compliance."]
        },
        {
            word: "LIDERANCA",
            hints: ["Habilidade importante na gestão de pessoas.", "Capacidade de influenciar equipes."]
        },
        {
            word: "DUE DILIGENCE",
            hints: ["Processo de avaliação de riscos em compliance.", "Prática comum antes de aquisições ou fusões."]
        },
        {
            word: "RESPONSABILIDADE",
            hints: ["Dever dos gestores nas empresas.", "Relacionada à prestação de contas."]
        },
        {
            word: "CONFORMIDADE",
            hints: ["Relacionada ao cumprimento de normas.", "Necessária para evitar penalidades jurídicas."]
        }
    ];

    let selected = words[Math.floor(Math.random() * words.length)];
    let word = selected.word;
    let displayWord = word.replace(/./g, "_ ");
    let mistakes = 0; // Contador de erros
    let attempts = 0; // Contador de tentativas (certas ou erradas)
    const maxErrors = 6; // Máximo de erros permitidos
    const hintInterval = 3; // Liberação das dicas a cada 3 tentativas

    const wordDisplay = document.getElementById('wordDisplay');
    const hint1 = document.getElementById('hint1');
    const hint2 = document.getElementById('hint2');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    const letterButtons = document.querySelectorAll(".letters button");

    wordDisplay.textContent = displayWord;
    hint1.textContent = `Dica 1: ${selected.hints[0]}`;
    hint2.textContent = `Dica 2: ${selected.hints[1]}`;

    letterButtons.forEach(button => {
        button.addEventListener('click', handleGuess);
    });

    resetBtn.addEventListener('click', resetGame);

    function handleGuess(event) {
        const letter = event.target.textContent;

        // Adicionar risquinho na letra clicada
        event.target.classList.add('strikethrough');

        attempts++; // Incrementa as tentativas, seja certo ou errado
        if (word.includes(letter)) {
            let newDisplay = "";
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    newDisplay += letter + " ";
                } else {
                    newDisplay += displayWord[i * 2] + " ";
                }
            }
            displayWord = newDisplay;
            wordDisplay.textContent = displayWord.trim();
            checkWin();
        } else {
            mistakes++; // Incrementa os erros se a letra estiver errada
            message.textContent = `Erros: ${mistakes}`;
        }

        showHints(); // Mostrar dicas conforme as tentativas

        if (mistakes >= maxErrors) { // Verifica se o limite de erros foi atingido
            endGame(false);
        }

        event.target.disabled = true; // Desabilitar o botão após ser clicado
    }

    // Função para mostrar dicas a cada 3 tentativas
    function showHints() {
        if (attempts >= hintInterval) {
            hint1.style.display = 'block';
        }
        if (attempts >= hintInterval * 2) {
            hint2.style.display = 'block';
        }
    }

    function checkWin() {
        if (!displayWord.includes("_")) {
            endGame(true);
        }
    }

    function endGame(win) {
        letterButtons.forEach(button => {
            button.disabled = true;
        });
        if (win) {
            message.textContent = "Você venceu!";
        } else {
            message.textContent = `Você perdeu! A palavra era: ${word}`;
        }
    }

    function resetGame() {
        selected = words[Math.floor(Math.random() * words.length)];
        word = selected.word;
        displayWord = word.replace(/./g, "_ ");
        mistakes = 0;
        attempts = 0;
        wordDisplay.textContent = displayWord;
        message.textContent = "";
        hint1.style.display = 'none';
        hint2.style.display = 'none';
        hint1.textContent = `Dica 1: ${selected.hints[0]}`;
        hint2.textContent = `Dica 2: ${selected.hints[1]}`;
        letterButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove('strikethrough'); // Remover risquinho ao resetar
        });
    }
});
