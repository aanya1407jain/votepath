/* ═══════════════════════════════════════════════
   VotePath — Quiz Module
   ═══════════════════════════════════════════════ */

const QUESTIONS = [
    {
        q: "What is the minimum voting age in U.S. federal elections?",
        opts: ["16", "18", "21", "25"],
        correct: 1,
        explanation: "The 26th Amendment (1971) lowered the voting age to 18 in all federal, state, and local elections. A few localities allow 16-year-olds to vote in certain local elections, but 18 is the federal standard."
    },
    {
        q: "How many Electoral College votes does a presidential candidate need to win?",
        opts: ["269", "270", "300", "538"],
        correct: 1,
        explanation: "There are 538 total electoral votes. A candidate needs a majority — 270 — to win the presidency. If no candidate reaches 270, the House of Representatives chooses the president."
    },
    {
        q: "Which constitutional amendment gave women the right to vote?",
        opts: ["13th Amendment", "15th Amendment", "19th Amendment", "24th Amendment"],
        correct: 2,
        explanation: "The 19th Amendment, ratified on August 18, 1920, prohibits denying the right to vote based on sex. This came after decades of advocacy by the women's suffrage movement."
    },
    {
        q: "What is a 'down-ballot' race?",
        opts: [
            "The presidential race at the top of the ballot",
            "Races for offices below president, like Senate, House, or local positions",
            "A race that was invalidated due to fraud",
            "A special election held after the main election"
        ],
        correct: 1,
        explanation: "Down-ballot refers to races for offices listed lower on the ballot, such as U.S. Senate, House of Representatives, governor, state legislature, and local offices. These races often have significant local impact but receive less media attention."
    },
    {
        q: "What does 'gerrymandering' mean?",
        opts: [
            "A type of mail-in ballot",
            "The process of certifying election results",
            "Manipulating district boundaries to favor a particular party",
            "The official count of electoral votes by Congress"
        ],
        correct: 2,
        explanation: "Gerrymandering is the manipulation of electoral district boundaries to advantage a political party, group, or incumbent. The term comes from Governor Elbridge Gerry, who signed a notably shaped district into law in 1812. It's a ongoing subject of legal and political debate."
    }
];

let currentQ = 0;
let score = 0;
let answered = false;
let quizStarted = false;

function renderQuizStart() {
    const box = document.getElementById('quizBox');
    if (!box) return;
    box.innerHTML = `
    <div class="quiz-start">
      <div style="font-size:3rem;margin-bottom:16px">🧠</div>
      <h3>Test Your Civic Knowledge</h3>
      <p>5 questions covering voting rights, the electoral process, and American democracy. Take your time — explanations are provided after each answer!</p>
      <button class="btn btn-primary" onclick="startQuiz()" style="margin-top:8px">Start the Quiz</button>
    </div>
  `;
}

function startQuiz() {
    currentQ = 0;
    score = 0;
    answered = false;
    quizStarted = true;
    renderQuestion();
}

function renderQuestion() {
    const box = document.getElementById('quizBox');
    if (!box) return;
    const q = QUESTIONS[currentQ];
    const pct = (currentQ / QUESTIONS.length) * 100;
    box.innerHTML = `
    <div class="quiz-header">
      <span class="quiz-progress-text">Question ${currentQ + 1} of ${QUESTIONS.length}</span>
      <span class="quiz-score-display">Score: ${score}/${currentQ}</span>
    </div>
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width:${pct}%"></div>
    </div>
    <div class="quiz-q">${q.q}</div>
    <div class="quiz-options" id="quizOpts">
      ${q.opts.map((opt, i) => `
        <button class="quiz-opt" onclick="selectAnswer(${i})">${opt}</button>
      `).join('')}
    </div>
    <div id="quizFeedback"></div>
  `;
}

function selectAnswer(idx) {
    if (answered) return;
    answered = true;
    const q = QUESTIONS[currentQ];
    const opts = document.querySelectorAll('.quiz-opt');
    opts.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('correct');
        else if (i === idx) btn.classList.add('wrong');
    });
    if (idx === q.correct) score++;
    const feedback = document.getElementById('quizFeedback');
    if (feedback) {
        feedback.innerHTML = `
      <div class="quiz-explanation">
        ${idx === q.correct ? '✅ Correct! ' : '❌ Not quite. '} ${q.explanation}
      </div>
      <button class="quiz-next" onclick="nextQuestion()">
        ${currentQ + 1 < QUESTIONS.length ? 'Next Question →' : 'See Results →'}
      </button>
    `;
    }
}

function nextQuestion() {
    currentQ++;
    answered = false;
    if (currentQ >= QUESTIONS.length) {
        renderResult();
    } else {
        renderQuestion();
    }
}

function renderResult() {
    const box = document.getElementById('quizBox');
    if (!box) return;
    const pct = Math.round((score / QUESTIONS.length) * 100);
    let grade = '';
    if (pct === 100) grade = 'Perfect Score! You\'re a civics champion! 🏆';
    else if (pct >= 80) grade = 'Excellent! You know your democracy. 🌟';
    else if (pct >= 60) grade = 'Good work! Keep exploring to learn more. 📚';
    else grade = 'Keep learning — democracy depends on informed voters! 🗳️';

    box.innerHTML = `
    <div class="quiz-result">
      <div class="big-score">${pct}%</div>
      <h3>${score} / ${QUESTIONS.length} Correct</h3>
      <p>${grade}</p>
      <div class="quiz-name-input-wrap">
        <input type="text" id="playerName" placeholder="Enter your name for the leaderboard…" maxlength="30" />
        <button class="quiz-save-btn" onclick="saveScore()">Save to Leaderboard 🏆</button>
      </div>
      <div id="saveStatus" style="font-size:.85rem;color:rgba(255,255,255,.5);margin-bottom:16px;min-height:20px"></div>
      <button class="quiz-restart" onclick="renderQuizStart()">Try Again</button>
    </div>
  `;
}

function saveScore() {
    const nameInput = document.getElementById('playerName');
    const status = document.getElementById('saveStatus');
    const name = nameInput?.value?.trim();
    if (!name) {
        if (status) status.textContent = 'Please enter your name first.';
        return;
    }
    if (status) status.textContent = 'Saving…';
    window.saveQuizScore(name, score, QUESTIONS.length)
        .then(() => {
            if (status) status.textContent = '✅ Score saved! Check the leaderboard above.';
            window.loadLeaderboard?.();
        })
        .catch(err => {
            console.warn('Save failed:', err);
            if (status) status.textContent = '⚠️ Could not save — leaderboard unavailable in demo mode.';
        });
}

document.addEventListener('DOMContentLoaded', renderQuizStart);