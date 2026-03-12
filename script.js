// Anniversary Date: March 13, 2019
const startDate = new Date('2019-03-13T00:00:00');

// Funny Reasons Array
const reasons = [
    "How you do everything so well and nicely.",
    "How you want to do great things and help me be better.",
    "The way your eyes shine when you are happy.",
    "Your great style that always looks amazing.",
    "How you make everyone feel special with your smile.",
    "Your kindness that makes everything better.",
    "How you remember the little things that matter most.",
    "How smart you are.",
    "Because you are Tanya, and you make my every day best.",
    "How you solve hard problems so easily.",
    "How you make life a fun adventure."
];

// Decision Maker Data
const decisions = {
    food: [
        "Tanya's Favorite Choice 👑", "Yummy Sushi 🍣", "Pasta & Wine 🍝", "A Nice Surprise Dinner 🕯️",
        "Breakfast in Bed (Yasith Cooks) 🥞", "Trying Sweet Desserts 🍦", "Healthy & Tasty 🥗", "Home Cooked Surprise 🍳"
    ],
    activity: [
        "Shopping Trip (Yasith Pays) 🛍️", "Watch a Movie 🍿", "Relaxing Spa Day 🧖‍♀️",
        "Romantic Walk 🚶‍♀️", "Painting & Wine 🍷", "Planned Surprise Date 🌹", "A Short Road Trip 🚗", "Cuddle Time 😴"
    ]
};

// Likely To Game Data
const likelyOptions = [
    "become a famous fashion star",
    "win a big prize for being very smart",
    "be the kindest person in the world",
    "make everyone happy with just one smile",
    "solve a hard problem that no one else can",
    "always wear the best clothes for any day",
    "make many people happy with one post",
    "be the boss of a very successful company",
    "make people believe in love at first sight",
    "be the person everyone loves the most"
];

// Quiz Data
const questions = [
    {
        q: "Who is the most beautiful girl in the world?",
        o: ["Tanya (obviously)", "My Suduu Manika"],
        a: "Both are right! You are so beautiful. ❤️"
    },
    {
        q: "What is Tanya's secret talent?",
        o: ["Making everyone happy", "Being very smart"],
        a: "It's both! You have a very kind heart. ✨"
    },
    {
        q: "How much does Yasith love you?",
        o: ["More than anything", "So much more than you know"],
        a: "I love you forever and ever! ❤️"
    },
    {
        q: "Who is the happy sunshine of our relationship?",
        o: ["Always Tanya", "Definitely Tanya"],
        a: "You make my world bright every day! ☀️"
    }
];

// Coupons Data
const coupons = [
    { title: "One 'Yasith Does Dishes' Pass", desc: "Yasith will wash all the dishes. No complaining!" },
    { title: "Romantic Dinner Date", desc: "Yasith plans everything. You just come and look pretty." },
    { title: "The 'I Am Right' Card", desc: "Use this to win any talk or argument. Only use once!" },
    { title: "Free 30-Min Massage", desc: "You choose: head, foot, or back massage." },
    { title: "One Shopping Trip Treat", desc: "Buy whatever you want, I will pay." },
    { title: "Unlimited Hugs for One Hour", desc: "One hour of just hugs and cuddles." }
];

let currentQuestion = 0;
let currentLikely = 0;

// Initialize Background Hearts
function createSingleHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    const heartSymbols = ['❤️', '💖', '💕', '💗', '✨', '🌹'];
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
    heart.style.animationDelay = '0s';
    container.appendChild(heart);

    // Remove heart after animation to keep DOM clean
    setTimeout(() => heart.remove(), 15000);
}

function createHearts() {
    for (let i = 0; i < 30; i++) {
        setTimeout(createSingleHeart, Math.random() * 5000);
    }
}

// Timer Logic
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById('years').innerText = years;
    document.getElementById('months').innerText = months;
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
}

// Decision Maker Logic
function decide(type) {
    const display = document.getElementById('decision-result');
    const options = decisions[type];
    display.classList.add('spin');

    let count = 0;
    const interval = setInterval(() => {
        display.innerText = options[Math.floor(Math.random() * options.length)];
        count++;
        if (count > 10) {
            clearInterval(interval);
            display.classList.remove('spin');
            display.innerText = options[Math.floor(Math.random() * options.length)];
        }
    }, 100);
}

// Likely To Logic
function nextLikely() {
    const text = document.getElementById('likely-text');
    const feedback = document.getElementById('likely-feedback');
    currentLikely = (currentLikely + 1) % likelyOptions.length;

    text.style.opacity = 0;
    feedback.innerText = "";
    setTimeout(() => {
        text.innerText = `...${likelyOptions[currentLikely]}?`;
        text.style.opacity = 1;
        text.style.transition = 'opacity 0.5s';
    }, 300);
}

function likelyVote(name) {
    const feedback = document.getElementById('likely-feedback');
    const responses = [
        `That is so ${name}! 😂`,
        `We all knew it was ${name}.`,
        `${name} is the one!`,
        `${name} is definitely the person.`,
        `I am sure it is ${name}.`
    ];
    feedback.innerText = responses[Math.floor(Math.random() * responses.length)];
}

// Quiz Logic
function renderQuestion() {
    const container = document.getElementById('quiz-container');
    const q = questions[currentQuestion];

    container.innerHTML = `
        <p class="quiz-question">${q.q}</p>
        <div class="quiz-options">
            <button class="btn btn-secondary" onclick="checkAnswer(0)">${q.o[0]}</button>
            <button class="btn btn-secondary" onclick="checkAnswer(1)">${q.o[1]}</button>
        </div>
    `;
}

function checkAnswer(idx) {
    const container = document.getElementById('quiz-container');
    const feedback = document.createElement('p');
    feedback.className = 'feedback-text';
    feedback.innerText = questions[currentQuestion].a;
    container.appendChild(feedback);

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            renderQuestion();
        } else {
            container.innerHTML = `
                <div class="heart-pulse" style="font-size: 3rem;">🏆</div>
                <h3>YOU WIN!</h3>
                <p>You finished the game perfectly! 🎁</p>
                <button class="btn" onclick="resetQuiz()">Play Again</button>
            `;
        }
    }, 2000);
}

function resetQuiz() {
    currentQuestion = 0;
    renderQuestion();
}

// Coupon Logic
function generateCoupon() {
    const title = document.getElementById('coupon-title');
    const desc = document.getElementById('coupon-desc');
    const random = coupons[Math.floor(Math.random() * coupons.length)];

    const container = document.querySelector('.coupon');
    container.style.transform = 'rotateY(360deg)';

    setTimeout(() => {
        title.innerText = random.title;
        desc.innerText = random.desc;
        container.style.transform = 'rotateY(0deg)';
    }, 250);
}

// Reason Generator Logic
function generateReason() {
    const display = document.getElementById('reason-text');
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];

    display.style.opacity = 0;
    setTimeout(() => {
        display.innerText = randomReason;
        display.style.opacity = 1;
        display.style.transition = 'opacity 0.5s ease';
    }, 300);
}

// Compatibility Logic
function calculateMatch() {
    const display = document.getElementById('match-result');
    display.classList.add('spin');

    let score = 0;
    const interval = setInterval(() => {
        display.innerText = Math.floor(Math.random() * 50) + 50 + "%";
        score++;
        if (score > 15) {
            clearInterval(interval);
            display.classList.remove('spin');
            display.innerText = "1000% ❤️";
            const feedback = document.createElement('p');
            feedback.className = 'feedback-text';
            feedback.innerText = "Error: Too much love detected!";
            display.parentElement.appendChild(feedback);
        }
    }, 80);
}

// Lock Logic
function checkLock() {
    const d1 = document.getElementById('date1').value.trim();
    const d2 = document.getElementById('date2').value.trim();
    const error = document.getElementById('lock-error');
    const lockScreen = document.getElementById('lock-screen');
    const mainContent = document.getElementById('main-content');

    // Expected birthdays: 2002.09.13 and 2002.07.14
    const valid1 = "2002.09.13";
    const valid2 = "2002.07.14";

    if ((d1 === valid1 && d2 === valid2) || (d1 === valid2 && d2 === valid1)) {
        lockScreen.classList.add('unlocked');
        mainContent.classList.remove('hidden');

        // Burst of hearts for celebration
        for (let i = 0; i < 50; i++) {
            setTimeout(createSingleHeart, i * 20);
        }

        setTimeout(() => {
            lockScreen.style.display = 'none';
        }, 800);
    } else {
        error.innerText = "Incorrect dates, please try again ❤️";
        // Shake animation could be added here
        const card = document.querySelector('.lock-card');
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'shake 0.5s ease';
        }, 10);
    }
}

// Add shake animation to CSS via JS or just add to CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
`;
document.head.appendChild(style);

// Initialize everything
window.onload = () => {
    createHearts();
    updateCounter();
    setInterval(updateCounter, 1000 * 60);
    renderQuestion();
};
