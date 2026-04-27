/* ═══════════════════════════════════════════════
   VotePath — Firebase Integration
   Handles: quiz score storage & leaderboard
   ═══════════════════════════════════════════════ */

// ─── FIREBASE CONFIG ───────────────────────────
// Replace with your own Firebase project credentials:
// https://console.firebase.google.com/
const FIREBASE_CONFIG = {
    apiKey: "AIzaSy-REPLACE-WITH-YOUR-FIREBASE-API-KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

let db = null;
let firebaseReady = false;

// Demo fallback scores (shown when Firebase is not configured)
const DEMO_SCORES = [
    { name: "Maria G.", score: 5, total: 5, timestamp: Date.now() - 86400000 * 2 },
    { name: "James T.", score: 5, total: 5, timestamp: Date.now() - 86400000 * 3 },
    { name: "Priya K.", score: 4, total: 5, timestamp: Date.now() - 86400000 },
    { name: "Chen L.", score: 4, total: 5, timestamp: Date.now() - 86400000 * 4 },
    { name: "Alex R.", score: 3, total: 5, timestamp: Date.now() - 86400000 * 5 },
];

// ─── INITIALIZE FIREBASE ───────────────────────
function initFirebase() {
    try {
        if (!firebase || FIREBASE_CONFIG.apiKey.includes('REPLACE')) {
            console.info('VotePath: Running in demo mode (Firebase not configured).');
            firebaseReady = false;
            loadDemoLeaderboard();
            return;
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }
        db = firebase.firestore();
        firebaseReady = true;
        console.info('VotePath: Firebase connected.');
        loadLeaderboard();
    } catch (err) {
        console.warn('Firebase init failed, using demo data.', err);
        firebaseReady = false;
        loadDemoLeaderboard();
    }
}

// ─── SAVE SCORE ────────────────────────────────
window.saveQuizScore = async function (name, score, total) {
    if (!firebaseReady || !db) {
        // Persist locally for demo
        const stored = JSON.parse(localStorage.getItem('vp_scores') || '[]');
        stored.push({ name, score, total, timestamp: Date.now() });
        localStorage.setItem('vp_scores', JSON.stringify(stored));
        loadDemoLeaderboard();
        return Promise.resolve();
    }
    return db.collection('quiz_scores').add({
        name,
        score,
        total,
        percentage: Math.round((score / total) * 100),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
};

// ─── LOAD LEADERBOARD (Firebase) ──────────────
window.loadLeaderboard = async function () {
    if (!firebaseReady || !db) {
        loadDemoLeaderboard();
        return;
    }
    try {
        const snap = await db
            .collection('quiz_scores')
            .orderBy('score', 'desc')
            .orderBy('timestamp', 'asc')
            .limit(10)
            .get();
        const rows = snap.docs.map(d => d.data());
        renderLeaderboard(rows);
    } catch (err) {
        console.warn('Leaderboard load failed:', err);
        loadDemoLeaderboard();
    }
};

// ─── DEMO LEADERBOARD ──────────────────────────
function loadDemoLeaderboard() {
    // Merge demo scores with any locally stored scores
    const local = JSON.parse(localStorage.getItem('vp_scores') || '[]');
    const all = [...DEMO_SCORES, ...local]
        .sort((a, b) => b.score - a.score || a.timestamp - b.timestamp)
        .slice(0, 10);
    renderLeaderboard(all, true);
}

// ─── RENDER LEADERBOARD ────────────────────────
function renderLeaderboard(scores, isDemo = false) {
    const table = document.getElementById('leaderboardTable');
    if (!table) return;
    if (!scores || scores.length === 0) {
        table.innerHTML = `<div class="lb-empty">No scores yet — take the quiz and be first! 🏆</div>`;
        return;
    }
    const medals = ['gold', 'silver', 'bronze'];
    const rows = scores.map((s, i) => {
        const rankClass = medals[i] || '';
        const rankLabel = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
        const pct = Math.round((s.score / (s.total || 5)) * 100);
        return `
      <div class="lb-row">
        <div class="lb-rank ${rankClass}">${rankLabel}</div>
        <div class="lb-name">${escapeHtml(s.name)}</div>
        <div class="lb-score">${s.score}/${s.total || 5} &nbsp;<span style="opacity:.5;font-size:.8rem">${pct}%</span></div>
      </div>
    `;
    }).join('');
    table.innerHTML = rows;
    if (isDemo) {
        table.innerHTML += `
      <div style="padding:12px 24px;font-size:.78rem;color:rgba(255,255,255,.3);border-top:1px solid rgba(255,255,255,.06)">
        📌 Demo mode — configure Firebase to enable live leaderboard
      </div>
    `;
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ─── BOOT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', initFirebase);