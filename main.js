// Navegação responsiva
const navbarToggle = document.getElementById('navbar-toggle');
const navbarLinks = document.getElementById('navbar-links');

navbarToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    navbarToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
        navbarLinks.classList.remove('active');
        navbarToggle.classList.remove('active');
    });
});

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Quiz functionality
const quizQuestions = [
    {
        question: "Qual destes elementos é MAIS importante para a usabilidade de um software?",
        options: [
            "Cores vibrantes e modernas",
            "Consistência nos padrões de design",
            "Animações complexas e detalhadas",
            "Fonte personalizada e exclusiva"
        ],
        correctAnswer: 1,
        explanation: "A consistência nos padrões de design é crucial para a usabilidade, pois ajuda os usuários a entender rapidamente como interagir com a interface, reduzindo a curva de aprendizado."
    },
    {
        question: "Como um bom design de UI/UX pode reduzir bugs reportados?",
        options: [
            "Tornando a interface mais bonita",
            "Evitando que usuários cometam erros de interpretação",
            "Escondendo funcionalidades complexas",
            "Aumentando o número de botões na tela"
        ],
        correctAnswer: 1,
        explanation: "Interfaces bem projetadas guiam o usuário e tornam as ações claras, reduzindo erros de interpretação que muitas vezes são reportados como 'bugs' quando na verdade são problemas de usabilidade."
    },
    {
        question: "Qual destas práticas MELHORA a acessibilidade?",
        options: [
            "Usar apenas cores para transmitir informações",
            "Manter alto contraste entre texto e fundo",
            "Utilizar fontes pequenas para economizar espaço",
            "Evitar descrições alternativas em imagens"
        ],
        correctAnswer: 1,
        explanation: "Manter alto contraste entre texto e fundo é essencial para usuários com dificuldades visuais, tornando o conteúdo legível para um público mais amplo."
    },
    {
        question: "Por que a hierarquia visual é importante no UI design?",
        options: [
            "Deixa a interface mais bonita",
            "Guia o usuário pelas informações mais importantes primeiro",
            "Permite usar mais cores no design",
            "Torna o código mais eficiente"
        ],
        correctAnswer: 1,
        explanation: "Uma boa hierarquia visual organiza os elementos de forma que o usuário naturalmente perceba as informações mais importantes primeiro, melhorando a eficiência da interação."
    },
    {
        question: "Qual destes é um exemplo de feedback imediato para o usuário?",
        options: [
            "Um manual de instruções em PDF",
            "Um botão que muda de cor quando clicado",
            "Um email de confirmação enviado após 5 minutos",
            "Uma mensagem de erro exibida no console do navegador"
        ],
        correctAnswer: 1,
        explanation: "Feedback imediato, como mudança visual em um botão ao ser clicado, confirma para o usuário que sua ação foi registrada, melhorando a experiência e reduzindo incertezas."
    }
];

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false;

// Quiz elements
const quizIntro = document.getElementById('quiz-intro');
const quizQuestionsContainer = document.getElementById('quiz-questions');
const questionContainer = document.getElementById('question-container');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const nextQuestionBtn = document.getElementById('next-question');
const quizResults = document.getElementById('quiz-results');
const correctAnswersElement = document.getElementById('correct-answers');
const totalQuestionsResultElement = document.getElementById('total-questions-result');
const quizResultsDetails = document.getElementById('quiz-results-details');
const startQuizBtn = document.getElementById('start-quiz');
const restartQuizBtn = document.getElementById('restart-quiz');

// Set total questions
totalQuestionsElement.textContent = quizQuestions.length;
totalQuestionsResultElement.textContent = quizQuestions.length;

// Start quiz
startQuizBtn.addEventListener('click', startQuiz);

function startQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    score = 0;
    
    quizIntro.style.display = 'none';
    quizQuestionsContainer.style.display = 'block';
    quizResults.style.display = 'none';
    
    showQuestion();
}

// Show current question
function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    
    questionContainer.innerHTML = `
        <h3 class="quiz__question-text">${question.question}</h3>
        <div class="quiz__options">
            ${question.options.map((option, index) => `
                <div class="quiz__option">
                    <input type="radio" name="quiz-option" id="option-${index}" value="${index}">
                    <label for="option-${index}">${option}</label>
                </div>
            `).join('')}
        </div>
    `;
    
    nextQuestionBtn.disabled = true;
    
    // Add event listeners to options
    document.querySelectorAll('input[name="quiz-option"]').forEach(radio => {
        radio.addEventListener('change', () => {
            nextQuestionBtn.disabled = false;
        });
    });
}

// Next question
nextQuestionBtn.addEventListener('click', () => {
    // Check if answer is selected
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    
    if (!selectedOption) return;
    
    // Check if answer is correct
    const answer = parseInt(selectedOption.value);
    const question = quizQuestions[currentQuestionIndex];
    
    if (answer === question.correctAnswer) {
        score++;
    }
    
    // Move to next question or show results
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// Show quiz results
function showResults() {
    quizQuestionsContainer.style.display = 'none';
    quizResults.style.display = 'block';
    
    correctAnswersElement.textContent = score;
    
    // Show detailed results
    quizResultsDetails.innerHTML = quizQuestions.map((question, index) => {
        return `
            <div class="quiz__result-item ${index < score ? 'correct' : 'incorrect'}">
                <h4>Pergunta ${index + 1}: ${question.question}</h4>
                <p><strong>Resposta correta:</strong> ${question.options[question.correctAnswer]}</p>
                <p class="quiz__explanation">${question.explanation}</p>
            </div>
        `;
    }).join('');
}

// Restart quiz
restartQuizBtn.addEventListener('click', startQuiz);

// Animação ao rolar a página
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .comparison__item, .checklist__item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Inicializar animações quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Verificar se há hash na URL e rolar para a seção
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});