export const questions = [
    {
        question: "How many planets are in the solar system?",
        answers: [
            { text: "8", correct: true },
            { text: "9", correct: false },
            { text: "6", correct: false },
            { text: "10", correct: false }
        ]
    },
    {
        question: "What is the freezing point of water?",
        answers: [
            { text: "0", correct: true },
            { text: "-5", correct: false },
            { text: "-1", correct: false },
            { text: "-6", correct: false }
        ]
    },
    {
        question: "What is the capital of Belarus?",
        answers: [
            { text: "Minsk", correct: true },
            { text: "Moscow", correct: false },
            { text: "Grodno", correct: false },
            { text: "Kiyv", correct: false }
        ]
    },
    {
        question: "Which of these countries are in the northern hemisphere of the Earth?",
        answers: [
            { text: "Finland", correct: true },
            { text: "Australia", correct: false },
            { text: "Somali", correct: false },
            { text: "France", correct: true }
        ],
        multiple: true
    },
];

export const elements = {
    questionCounterElement: document.getElementById('question-counter'),
    questionContainer: document.getElementById('question-container'),
    questionElement: document.getElementById('question'),
    answerButtonsElement: document.getElementById('answer-buttons'),
    nextButton: document.getElementById('next-btn'),
    prevButton: document.getElementById('prev-btn'),
    resultContainer: document.getElementById('result-container'),
    resultElement: document.getElementById('result'),
    restartButton: document.getElementById('restart-btn'),
    timerElement: document.getElementById('timer') // Добавляем новый элемент таймера

};