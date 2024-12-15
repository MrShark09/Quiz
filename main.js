let correctAnswers = 0;
let incorrectAnswers = 0;
let timerInterval;
let timeLeft = 10;

function randInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomSign() {
  const signs = ["+", "-", "*", "/"];
  return signs[randInt(0, signs.length - 1)];
}

class Question {
  constructor() {
    this.a = randInt(1, 50);
    this.b = randInt(1, 50);
    this.sign = getRandomSign();
    this.question = `${this.a} ${this.sign} ${this.b}`;
    this.correct = this.getCorrectAnswer();
    this.answers = this.generateAnswers();
  }

  getCorrectAnswer() {
    switch (this.sign) {
      case "+":
        return this.a + this.b;
      case "-":
        return this.a - this.b;
      case "*":
        return this.a * this.b;
      case "/":
        return Math.round((this.a / this.b) * 10) / 10;
    }
  }

  generateAnswers() {
    const answers = [];
    answers.push(this.correct);

    while (answers.length < 4) {
      let randomAnswer = randInt(this.correct - 30, this.correct + 30);
      if (!answers.includes(randomAnswer)) {
        answers.push(randomAnswer);
      }
    }

    return this.shuffleArray(answers);
  }

  shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  display() {
    document.getElementById("question").innerText = this.question;
    const answerButtons = document.querySelectorAll(".answer-btn");
    answerButtons.forEach((button, index) => {
      button.innerText = this.answers[index];
      button.classList.remove("correct", "incorrect");
      button.onclick = () => this.checkAnswer(button, this.answers[index]);
    });

    startTimer();
  }

  checkAnswer(button, selectedAnswer) {
    clearInterval(timerInterval);
    if (selectedAnswer === this.correct) {
      button.classList.add("correct");
      correctAnswers++;
    } else {
      button.classList.add("incorrect");
      incorrectAnswers++;
    }

    setTimeout(() => {
      loadNewQuestion();
    }, 1000);
  }
}

function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").innerText = timeLeft;
  document.getElementById("timer").style.color = "#000000";

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById("timer").innerText = timeLeft;

      if (timeLeft === 3) {
        document.getElementById("timer").style.color = "#ff0000";
        playSound("beep1");
      } else if (timeLeft === 2) {
        document.getElementById("timer").style.color = "#ff0000";
        playSound("beep1");
      } else if (timeLeft === 1) {
        document.getElementById("timer").style.color = "#ff0000";
        playSound("beep1");
      } else if (timeLeft === 0) {
        document.getElementById("timer").style.color = "#ff0000";
        document.getElementById("timer").innerText = timeLeft;
        playSound("beep2");
      }
    } else {
      clearInterval(timerInterval);
      incorrectAnswers++;
      setTimeout(loadNewQuestion, 0);
    }
  }, 1000);
}

function playSound(id) {
  const sound = document.getElementById(id);
  sound.play();
}

function loadNewQuestion() {
  if (correctAnswers + incorrectAnswers >= 10) {
    endQuiz();
  } else {
    const currentQuestion = new Question();
    currentQuestion.display();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  document.getElementById("correct-answers").innerText = correctAnswers;
  document.getElementById("incorrect-answers").innerText = incorrectAnswers;
}

document.getElementById("start-btn").onclick = function () {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  correctAnswers = 0;
  incorrectAnswers = 0;
  loadNewQuestion();
};

document.getElementById("restart-btn").onclick = function () {
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
};

const translations = {
  en: {
    title: "Quiz with 10 questions",
    startMessage: 'To start, press "Start"',
    startButton: "Start",
    question: "Question",
    gameOver: "Game over!",
    correctAnswers: "Correct answers: ",
    incorrectAnswers: "Incorrect answers: ",
    restartButton: "Restart",
  },
  uk: {
    title: "Квіз на 10 запитань",
    startMessage: 'Щоб почати натисніть "Почати"',
    startButton: "Почати",
    question: "Питання",
    gameOver: "Гра завершена!",
    correctAnswers: "Правильних відповідей: ",
    incorrectAnswers: "Неправильних відповідей: ",
    restartButton: "Заново",
  },
};

function switchLanguage(lang) {
  document.title = translations[lang].title;
  document.querySelector("#start-screen h2:nth-of-type(1)").innerText =
    translations[lang].title;
  document.querySelector("#start-screen h2:nth-of-type(2)").innerText =
    translations[lang].startMessage;
  document.querySelector("#start-btn span").innerText =
    translations[lang].startButton;
  document.querySelector("#question").innerText = translations[lang].question;
  document.querySelector("#end-screen h1").innerText =
    translations[lang].gameOver;
  document.querySelector("#correct-answers").previousSibling.textContent =
    translations[lang].correctAnswers;
  document.querySelector("#incorrect-answers").previousSibling.textContent =
    translations[lang].incorrectAnswers;
  document.querySelector("#restart-btn .front").innerText =
    translations[lang].restartButton;
}
