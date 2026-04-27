# 🗳️ VotePath — Election Process Assistant

> A smart, interactive assistant that helps every American understand the election process — powered by Google Gemini AI, Google Maps, Firebase, and Google Translate.

![VotePath Preview](https://img.shields.io/badge/status-ready%20to%20deploy-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Challenge](https://img.shields.io/badge/Google%20Antigravity-Challenge%20Entry-orange)

---

## 🎯 Chosen Vertical

**Civic Education & Democratic Participation**

VotePath addresses a critical need: millions of eligible voters don't participate because the electoral system feels confusing or inaccessible. This assistant demystifies every step — from eligibility through inauguration — making democracy approachable for first-time voters, new citizens, and anyone who wants to be more informed.

---

## 🧠 Approach & Logic

### Core Problem
The U.S. election system is highly decentralized (50 different sets of state rules), the process spans months, and key information is often scattered across multiple government websites in dense legal language.

### Solution Architecture
VotePath is a single-page application (no backend required) with four integrated layers:

```
┌─────────────────────────────────────────────┐
│              VotePath SPA                    │
├───────────┬──────────┬──────────┬───────────┤
│  Content  │  Google  │ Firebase │  Google   │
│  Engine   │  Gemini  │ Firestore│  Maps +   │
│ (Steps,   │   AI     │(Scores & │ Translate │
│ Timeline, │ Chatbot  │Leaderbd) │           │
│ FAQ, Quiz)│          │          │           │
└───────────┴──────────┴──────────┴───────────┘
```

### Decision Logic
- **Content Layer**: Static, fact-checked educational content about the 7 election steps, a chronological timeline, 6 common FAQs, and a 5-question quiz with explanations
- **AI Layer**: Gemini 1.5 Flash handles open-ended Q&A with a nonpartisan system prompt that prevents political bias
- **Location Layer**: Google Maps Places API finds actual polling locations near any U.S. address
- **Persistence Layer**: Firebase Firestore stores quiz scores for a global leaderboard
- **Accessibility Layer**: Google Translate Widget provides 13-language support instantly

---

## ✨ Features

| Feature | Description | Technology |
|---------|-------------|------------|
| 7-Step Process Guide | Expandable cards explaining the full election journey | Vanilla JS |
| Election Timeline | Visual chronological calendar from primaries to inauguration | CSS + JS |
| FAQ Section | 6 common questions with accordion answers | Vanilla JS |
| Knowledge Quiz | 5 interactive questions with instant feedback & explanations | Vanilla JS |
| AI Chatbot | Live Q&A powered by Google Gemini (nonpartisan) | Gemini 1.5 Flash API |
| Polling Locator | Find nearby polling places by address with map markers | Google Maps + Places API |
| Quiz Leaderboard | Community leaderboard with top scores | Firebase Firestore |
| Multilingual Support | 13 languages via Google Translate Widget | Google Translate |
| Demo Fallback | Works fully offline/without API keys using local fallbacks | localStorage |

---

## 🏗️ How It Works

### File Structure
```
election-assistant/
├── index.html          # Main SPA with all sections
├── css/
│   └── style.css       # Complete stylesheet (custom design system)
├── js/
│   ├── data.js         # Static content: steps, timeline, FAQ
│   ├── app.js          # Core rendering + navigation
│   ├── quiz.js         # Quiz logic with scoring
│   ├── map.js          # Google Maps + polling locator
│   ├── chat.js         # Gemini AI chatbot
│   └── firebase-config.js  # Firebase + leaderboard
└── README.md
```

### User Flow
1. User arrives → hero section with clear CTAs
2. Explores **7 Steps** (expandable cards) to understand the process
3. Views **Timeline** to understand key dates
4. Reads **FAQ** for common concerns
5. Takes the **Quiz** to self-assess knowledge → saves score to leaderboard
6. Uses **Polling Locator** to find nearby voting locations
7. **Asks AI** any remaining questions in natural language

---

## 🔧 Setup & Configuration

### Quick Start (Demo Mode)
Open `index.html` in any browser — it works immediately in demo mode with all features functional.

### Enable Live Google Services

#### 1. Gemini AI Chatbot
```javascript
// In js/chat.js, line 9:
const GEMINI_API_KEY = 'YOUR_ACTUAL_GEMINI_KEY';
// Get key: https://aistudio.google.com/app/apikey
```

#### 2. Google Maps + Polling Locator
```html
<!-- In index.html, last script tag: -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_MAPS_KEY&libraries=places&callback=initMap" ...>
```
Enable: Maps JavaScript API + Places API in [Google Cloud Console](https://console.cloud.google.com/)

#### 3. Firebase Leaderboard
```javascript
// In js/firebase-config.js, lines 12-18:
const FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ...
};
```
Setup: [Firebase Console](https://console.firebase.google.com/) → New Project → Firestore → Start in test mode

**Firestore Security Rule** (add after setup):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quiz_scores/{doc} {
      allow read: if true;
      allow create: if request.resource.data.score is int
                    && request.resource.data.score >= 0
                    && request.resource.data.score <= 5
                    && request.resource.data.name.size() <= 30;
    }
  }
}
```

#### 4. Google Translate
Works automatically via the widget (no API key required for basic use).

---

## 📐 Design Decisions

- **Single HTML file approach**: Reduces setup friction; anyone can open it directly
- **No build tools**: Pure HTML/CSS/JS for maximum accessibility and minimal repository size
- **Graceful degradation**: Every Google service has a working fallback — app never breaks without API keys
- **Nonpartisan AI system prompt**: Gemini is strictly instructed to avoid political opinions, ensuring trust across all political backgrounds
- **localStorage fallback for Firebase**: Scores are saved locally if Firestore is unavailable, then merged with demo data
- **American civic aesthetic**: Navy, red, gold color palette; Playfair Display serif typography; stars — recognizable without being partisan

---

## ♿ Accessibility

- Semantic HTML5 elements throughout
- ARIA labels on interactive controls
- Keyboard-navigable (Tab, Enter)
- High color contrast ratios (WCAG AA compliant)
- Mobile-responsive at all breakpoints
- Google Translate covers 13 languages including Spanish, Hindi, Arabic, Chinese, French

---

## 🔒 Security

- **No secrets in client code** (API keys are configuration, not secrets — standard for browser apps)
- **Firestore write rules** limit score entries to valid integer ranges and name length
- **Input sanitization**: All user-generated content (leaderboard names) is HTML-escaped before rendering
- **No eval() or innerHTML from API responses**: Gemini responses are formatted via safe string replacement
- **No tracking or analytics** beyond Firebase's standard anonymous usage

---

## 🧪 Testing

Manual test checklist:
- [ ] All 7 step cards expand/collapse correctly
- [ ] Timeline renders all 11 events
- [ ] All 6 FAQ items toggle correctly
- [ ] Quiz tracks score accurately across all 5 questions
- [ ] Quiz restart resets state fully
- [ ] Chatbot responds in demo mode (no API key)
- [ ] Polling locator shows demo cards without Maps key
- [ ] Leaderboard shows demo data without Firebase
- [ ] Mobile hamburger menu works
- [ ] Translate button shows Google widget

---

## 📦 Repository Info

- **Size**: < 100KB (well under 1MB limit)
- **Branch**: `main` (single branch)
- **Dependencies**: All loaded via CDN (no npm install required)

---

## 📜 Assumptions

1. Users are in the United States (content is U.S.-specific; Maps restricted to US addresses)
2. Educational purposes only — not affiliated with any government body or political party
3. Voters should always verify official polling places at [vote.gov](https://vote.gov) regardless of Maps results
4. The leaderboard is community-wide (not per-user) by design — encouraging shared civic engagement

---

## 🙏 Built With

- Google Gemini 1.5 Flash — AI Q&A
- Google Maps JavaScript API + Places — Location search
- Firebase / Cloud Firestore — Score persistence
- Google Translate Widget — Multilingual access
- Fonts: Playfair Display + DM Sans (Google Fonts)

---

*Built for the Google Antigravity Challenge · Educational purposes only · Not affiliated with any government agency or political party*