/* ═══════════════════════════════════════════════
   VotePath — Gemini AI Chatbot
   ═══════════════════════════════════════════════ */

// ─── CONFIG ────────────────────────────────────
// Replace with your Gemini API key from:
// https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = 'AIzaSyC4EEJEOe68xu7AMsilBlgeuG9kAQEFNo8';
const GEMINI_MODEL = 'gemini-1.5-flash-latest';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_CONTEXT = `You are VotePath AI, a helpful, nonpartisan election process assistant for U.S. voters.
Your role is to clearly and accurately explain:
- How to register to vote
- Voting methods (in-person, early, absentee/mail-in)
- The election timeline and process
- The Electoral College
- How ballots are counted and certified
- Voter rights and what to do if they're violated
- Polling places and voter ID requirements
- The difference between primary and general elections
- Ballot measures, referendums, and initiatives
- Historical context for major voting rights milestones

IMPORTANT RULES:
- Stay strictly nonpartisan — do not favor any candidate, party, or political position
- Do not comment on specific candidates or current political controversies
- If asked for your opinion on a candidate or political issue, politely decline and redirect
- Keep answers concise (2-4 paragraphs max), clear, and factual
- If you don't know something, say so and direct users to vote.gov or their state election authority
- Always encourage civic participation`;

let conversationHistory = [];

// ─── SEND MESSAGE ──────────────────────────────
async function sendMessage(userText) {
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow || !userText.trim()) return;

    // Append user message
    appendMessage('user', userText);
    conversationHistory.push({ role: 'user', content: userText });

    // Show typing indicator
    const typingId = 'typing-' + Date.now();
    appendTyping(typingId);

    try {
        const reply = await callGemini(userText);
        removeTyping(typingId);
        appendMessage('bot', reply);
        conversationHistory.push({ role: 'bot', content: reply });
    } catch (err) {
        console.warn('Gemini API error:', err);
        removeTyping(typingId);
        const fallback = getFallbackResponse(userText);
        appendMessage('bot', fallback);
    }
}

// ─── GEMINI API CALL ───────────────────────────
async function callGemini(userText) {
    if (GEMINI_API_KEY.includes('REPLACE')) {
        // Demo mode with local fallback
        await delay(1200 + Math.random() * 800);
        return getFallbackResponse(userText);
    }

    // Build conversation context
    const parts = [
        { text: `System context:\n${SYSTEM_CONTEXT}\n\n---\nUser question: ${userText}` }
    ];

    // Include recent history (last 4 turns)
    const recent = conversationHistory.slice(-8);
    const historyText = recent.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
    if (historyText) {
        parts[0].text = `System context:\n${SYSTEM_CONTEXT}\n\nConversation so far:\n${historyText}\n\nCurrent question: ${userText}`;
    }

    const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
                temperature: 0.65,
                maxOutputTokens: 512,
                topP: 0.9,
            },
            safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            ]
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No content in Gemini response');
    return text;
}

// ─── FALLBACK RESPONSES ────────────────────────
function getFallbackResponse(question) {
    const q = question.toLowerCase();
    if (q.includes('register') || q.includes('registration')) {
        return `To register to vote in the U.S., visit <strong>vote.gov</strong> — the official federal site that links to your state's registration system. You'll need to be a U.S. citizen, at least 18 by Election Day, and a current resident of the state where you're registering.\n\nMost states allow online, mail-in, or in-person registration. Deadlines vary — many states require registration 15–30 days before Election Day, while 21 states offer same-day registration. Some states (like North Dakota) have no registration requirement at all!`;
    }
    if (q.includes('mail') || q.includes('absentee')) {
        return `Mail-in voting (also called absentee voting) lets you cast your ballot without going to a polling place. All 50 states offer some form of it — <strong>eight states automatically mail ballots to all registered voters</strong>.\n\nTo vote by mail: request an absentee ballot from your local election authority, fill it out according to instructions, sign the envelope, and return it by your state's deadline. Some states allow drop boxes; others require postmarks by Election Day. Always request your ballot early — ideally 2–3 weeks before the election.`;
    }
    if (q.includes('electoral college') || q.includes('electoral')) {
        return `The Electoral College is the system used to elect the U.S. President. Each state gets a number of electors equal to its congressional representation (senators + House members), plus 3 for D.C., totaling <strong>538 electors</strong>. A candidate needs 270 to win.\n\nMost states use a winner-take-all system — whoever wins the state's popular vote gets all its electoral votes. Maine and Nebraska allocate some electors by congressional district. After Election Day, electors meet in December to cast their votes, which Congress certifies in early January.`;
    }
    if (q.includes('id') || q.includes('identification')) {
        return `Voter ID requirements vary significantly by state. About 35 states have voter ID laws, ranging from strict (must show specific photo ID) to flexible (many documents accepted). The remaining states use signature verification or other methods.\n\nIf your state requires photo ID and you don't have one, most states must provide a free state ID to eligible voters. If you arrive at the polls without the required ID, you generally have the right to cast a <strong>provisional ballot</strong> and provide documentation later. Check your exact requirements at vote.gov.`;
    }
    if (q.includes('poll') || q.includes('polling place')) {
        return `Your polling place is your assigned voting location for Election Day. You can find it on your voter registration card, your state's election website, or at vote.gov.\n\nPolling places are typically schools, libraries, community centers, or government buildings. Bring any required ID. If there are long lines when polls close, stay in line — you have the right to vote if you were in line before closing time. Poll workers are there to assist you.`;
    }
    if (q.includes('primary') || q.includes('caucus')) {
        return `Primary elections and caucuses are how political parties select their candidates for the general election. <strong>Primaries</strong> are run like regular elections — voters cast secret ballots. <strong>Caucuses</strong> are party-organized meetings where supporters publicly group by candidate.\n\nPrimaries can be "open" (any registered voter can participate), "closed" (only registered party members), or "semi-closed." Presidential primaries run from January through June of election years, with each state setting its own date and rules.`;
    }
    return `Great question! The U.S. election system can be complex since each state runs its own elections under federal guidelines.\n\nFor accurate, up-to-date information specific to your location, I recommend visiting <strong>vote.gov</strong> — the official federal resource — or your state's Secretary of State website. You can also call the nonpartisan Election Protection hotline at <strong>1-866-OUR-VOTE</strong>.\n\n<em>(Note: Connect your Gemini API key in chat.js for AI-powered live responses to any question!)</em>`;
}

// ─── UI HELPERS ────────────────────────────────
function appendMessage(role, text) {
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) return;

    const avatarContent = role === 'bot' ? '🗳️' : '👤';
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');

    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${role}`;
    msgEl.innerHTML = `
    <div class="chat-avatar">${avatarContent}</div>
    <div class="chat-bubble">${formattedText}</div>
  `;
    chatWindow.appendChild(msgEl);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function appendTyping(id) {
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) return;
    const el = document.createElement('div');
    el.className = 'chat-msg bot';
    el.id = id;
    el.innerHTML = `
    <div class="chat-avatar">🗳️</div>
    <div class="chat-typing">
      <span></span><span></span><span></span>
    </div>
  `;
    chatWindow.appendChild(el);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTyping(id) {
    document.getElementById(id)?.remove();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── SUGGESTION CLICK ──────────────────────────
window.sendSuggestion = function (text) {
    const input = document.getElementById('chatInput');
    if (input) input.value = text;
    sendMessage(text);
};

// ─── EVENT LISTENERS ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('chatSend');
    const input = document.getElementById('chatInput');

    sendBtn?.addEventListener('click', () => {
        const text = input?.value?.trim();
        if (!text) return;
        input.value = '';
        sendMessage(text);
    });

    input?.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn?.click();
        }
    });

    // Add API key notice if using demo mode
    if (GEMINI_API_KEY.includes('REPLACE')) {
        const chatWrap = document.querySelector('.chat-wrap');
        if (chatWrap) {
            const notice = document.createElement('div');
            notice.className = 'api-key-notice';
            notice.innerHTML = '🔑 Running in demo mode — add your <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--gold)">Gemini API key</a> in chat.js for live AI responses';
            chatWrap.appendChild(notice);
        }
    }
});
