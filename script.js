import { questions, elements } from './constants.js';

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let timer;

const { questionCounterElement, questionContainer, questionElement, answerButtonsElement, nextButton, prevButton, resultContainer, resultElement, restartButton, timerElement } = elements;
nextButton.addEventListener('click', handleNextButtonClick);
prevButton.addEventListener('click', handlePrevButtonClick);
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
    clearQuizState();
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    toggleVisibility(resultContainer, false);
    toggleVisibility(questionContainer, true);
    toggleVisibility(nextButton, true);
    toggleVisibility(prevButton, true);
    toggleVisibility(questionCounterElement, true);
    toggleVisibility(timerElement, true);
    setNextQuestion();
    startTimer(5 * 60); // Запускаем таймер на 5 минут
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    updateQuestionCounter();
    toggleNavigationButtons();
    saveQuizState();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => createAnswerButton(answer));
    if (question.multiple) {
        showMultipleAnswersInfo();
    }
    if (currentQuestionIndex > 0) {
        startTimer(60);
    }
}

function createAnswerButton(answer) {
    try {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    } catch (error) {
        console.error('Error in createAnswerButton:', error);
    }
}

function showMultipleAnswersInfo() {
    const info = document.createElement('div');
    info.innerText = "This question has multiple correct answers.";
    info.classList.add('info');
    questionContainer.appendChild(info);
}

function resetState() {
    toggleVisibility(nextButton, false);
    selectedAnswers = [];
    clearElementChildren(answerButtonsElement);
    removeElementByClass('info');
}

function selectAnswer(e) {
    try {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        selectedButton.classList.add(correct ? 'correct' : 'wrong');
        selectedButton.disabled = true;
        selectedAnswers.push(correct);
        if (questions[currentQuestionIndex].multiple || selectedAnswers.length === 1) {
            toggleVisibility(nextButton, true);
        }
        saveQuizState();
    } catch (error) {
        console.error('Error in selectAnswer:', error);
    }
}

function evaluateAnswer() {
    try {
        const question = questions[currentQuestionIndex];
        const correctAnswers = question.answers.filter(a => a.correct).length;
        const selectedCorrectAnswers = selectedAnswers.filter(a => a).length;
        const selectedIncorrectAnswers = selectedAnswers.length - selectedCorrectAnswers;

        if (selectedCorrectAnswers === correctAnswers && selectedIncorrectAnswers === 0) {
            score++;
        } else if (question.multiple && selectedCorrectAnswers > 0) {
            score += 0.5;
        }
        saveQuizState();
    } catch (error) {
        console.error('Error in evaluateAnswer:', error);
    }
}

function updateQuestionCounter() {
    questionCounterElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function showResult() {
    toggleVisibility(questionContainer, false);
    toggleVisibility(nextButton, false);
    toggleVisibility(prevButton, false);
    toggleVisibility(resultContainer, true);
    toggleVisibility(questionCounterElement, false);
    toggleVisibility(timerElement, false);
    resultElement.innerText = `You scored ${score} out of ${questions.length}!`;
    clearQuizState();
    toggleVisibility(ques, false);
}

function toggleNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.innerText = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
}

function saveQuizState() {
    const state = {
        currentQuestionIndex,
        score,
        selectedAnswers
    };
    localStorage.setItem('quizState', JSON.stringify(state));
}

function loadQuizState() {
    const state = JSON.parse(localStorage.getItem('quizState'));
    if (state) {
        currentQuestionIndex = state.currentQuestionIndex;
        score = state.score;
        selectedAnswers = state.selectedAnswers;
    }
}

function clearQuizState() {
    localStorage.removeItem('quizState');
}

function handleNextButtonClick() {
    evaluateAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
}

function handlePrevButtonClick() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        setNextQuestion();
    }
}

function toggleVisibility(element, isVisible) {
    element.classList.toggle('hidden', !isVisible);
}

function clearElementChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function removeElementByClass(className) {
    const element = document.querySelector(`.${className}`);
    if (element) {
        element.remove();
    }
}

function startTimer(duration) {
    clearInterval(timer);
    let timerSeconds = duration;
    timer = setInterval(() => {
        timerElement.innerText = formatTime(timerSeconds);
        if (timerSeconds <= 0) {
            clearInterval(timer);
        }
        timerSeconds--;
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

startTimer(60);

loadQuizState();
if (currentQuestionIndex < questions.length) {
    setNextQuestion();
} else {
    showResult();
}
