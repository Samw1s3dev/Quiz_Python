const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");

const questions = [
  {
    question: "Qual é a forma correta de declarar uma variável em Python?",
    options: ["var x = 10", "int x = 10", "x = 10", "let x = 10"],
    answer: 2,
  },
  {
    question: "Qual função é usada para ler entrada do usuário em Python?",
    options: ["input()", "read()", "scanf()", "get()"],
    answer: 0,
  },
  {
    question: "Como se chama o método usado para adicionar elementos ao final de uma lista?",
    options: ["append()", "add()", "insert()", "push()"],
    answer: 0,
  },
  {
    question: "Qual símbolo é usado para comentários em Python?",
    options: ["//", "/* */", "#", "--"],
    answer: 2,
  },
  {
    question: "Qual estrutura é usada para criar uma função em Python?",
    options: ["function", "def", "fun", "method"],
    answer: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let wrongAnswers = []; // Armazena perguntas erradas

function loadQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <div class="question">${q.question}</div>
    <div class="options">
      ${q.options.map((option, index) => `
        <button onclick="selectAnswer(${index})">${option}</button>
      `).join("")}
    </div>
    <p>Pergunta ${currentQuestion + 1} de ${questions.length}</p>
  `;
  selectedAnswer = null;
  nextBtn.disabled = true;
}

function selectAnswer(index) {
  selectedAnswer = index;
  const buttons = document.querySelectorAll(".options button");
  buttons.forEach((btn, i) => {
    btn.classList.remove("selected");
    if (i === index) {
      btn.classList.add("selected");
    }
  });
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  const currentQ = questions[currentQuestion];

  if (selectedAnswer === currentQ.answer) {
    score++;
  } else {
    wrongAnswers.push({
      question: currentQ.question,
      correctAnswer: currentQ.options[currentQ.answer],
      userAnswer: currentQ.options[selectedAnswer],
    });
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  let resultHTML = `
    <h2>Você acertou ${score} de ${questions.length} perguntas!</h2>
  `;

  if (wrongAnswers.length > 0) {
    resultHTML += `<h3 class="wrong-title">Erros:</h3><ul class="wrong-list">`;
    wrongAnswers.forEach((item, index) => {
      resultHTML += `
        <li>
          <strong>Pergunta:</strong> ${item.question}<br>
          <strong>Sua resposta:</strong> ${item.userAnswer}<br>
          <strong>Resposta correta:</strong> ${item.correctAnswer}
        </li>
      `;
    });
    resultHTML += `</ul>`;
  } else {
    resultHTML += `<p class="perfect">Parabéns! Você não cometeu nenhum erro! 🎉</p>`;
  }

  resultHTML += `
    <button onclick="restartQuiz()" class="restart-btn">Jogar novamente</button>
  `;

  quizContainer.innerHTML = resultHTML;
  nextBtn.style.display = "none";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  wrongAnswers = [];
  nextBtn.style.display = "block";
  loadQuestion();
}

// Inicializa o quiz
loadQuestion();