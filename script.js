let Questions = [
  {
    question:
      "A flashing red traffic light signifies that a driver should do what?",
    A: "stop",
    B: "speed up",
    C: "proceed with caution",
    D: "honk the horn",
    answer: "A",
  },
  {
    question: "A knish is traditionally stuffed with what filling?",
    A: "potato",
    B: "creamed corn",
    C: "lemon custard",
    D: "raspberry jelly",
    answer: "A",
  },
  {
    question: "A pita is a type of what?",
    A: "fresh fruit",
    B: "flat bread",
    C: "French tart",
    D: "friend bean dip",
    answer: "B",
  },
  {
    question:
      "A portrait that comically exaggerates a person's physical traits is called a what?",
    A: "landscape",
    B: "caricature",
    C: "still life",
    D: "Impressionism",
    answer: "B",
  },
  {
    question: "A second-year college student is usually called a what?",
    A: "sophomore",
    B: "senior",
    C: "freshman ",
    D: "junior ",
    answer: "A",
  },
];

let quest = document.getElementById("quest");
let answers = document.getElementsByClassName("answer-container")[0];
let next = document.getElementById("next");
let score = document.getElementById("points");
let result = document.getElementById("result");

let timeOut = null;
let curQueNo = 0;
let totalScore = 0;
let topScore = 0;

let SetQuestion = (Questions, qNum) => {
  let { A, B, C, D, answer } = Questions[qNum];
  let ans = [A, B, C, D];
  let isAnswerChose = false;

  quest.innerText = Questions[qNum].question;
  answers.innerHTML = "";
  next.innerText = `${curQueNo + 1} of ${Questions.length} - Next`;

  ans.map((item) => {
    let p = document.createElement("p");

    p.innerHTML = `<span>${item.toLowerCase()}</span>`;
    p.classList.add("answer");

    p.addEventListener("click", () => {
      if (!isAnswerChose) {
        if (item === Questions[qNum][answer] && !isAnswerChose) {
          p.style.color = "#20ed20";
          p.style.fontSize = "1.6rem";
          updateScore(10);
        } else {
          p.style.color = "red";
          p.style.textDecoration = "line-through";
          updateScore(-5);
        }
        isAnswerChose = true;

        timeOut = setTimeout(() => {
          NextQuestion();
        }, 2000);
      }
    });
    answers.append(p);
  });
  next.innerText = `${qNum + 1} of ${Questions.length} - Next`;
};

let updateScore = (mark) => {
  totalScore += mark;
  score.innerText = totalScore;
};

let NextQuestion = () => {
  if (Questions.length > curQueNo + 1) {
    curQueNo++;
    updateQuestion(curQueNo);
  } else {
    topScore = parseInt(localStorage.getItem("topScore"));
    if (topScore < totalScore) {
      localStorage.setItem("topScore", totalScore);
      topScore = totalScore;
    }
    result.innerText = `Top Score is ${topScore}`;
    next.innerText = `Restart`;
  }
};

let updateQuestion = (index) => {
  SetQuestion(Questions, index);
};

let updateNextButton = () => {
  clearTimeout(timeOut);
  timeOut = null;
};

let restart = () => {
  curQueNo = 0;
  totalScore = 0;
  updateScore(totalScore);
  result.innerText = "";
  updateQuestion(curQueNo);
};

(function Init() {
  SetQuestion(Questions, curQueNo);

  next.addEventListener("click", () => {
    NextQuestion();
    updateNextButton();
    if (Questions.length <= curQueNo + 1) {
      setTimeout(restart, 500);
    }
  });
})();
