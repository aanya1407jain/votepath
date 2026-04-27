/* ═══════════════════════════════════════════════
   VotePath — App Core
   ═══════════════════════════════════════════════ */

// ── NAV SCROLL EFFECT ──────────────────────────
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    nav.style.boxShadow = window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,.3)' : '';
});

// ── HAMBURGER ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ── TRANSLATE BUTTON ───────────────────────────
document.getElementById('translateBtn')?.addEventListener('click', () => {
    const widget = document.getElementById('google_translate_element');
    if (widget.style.display === 'block') {
        widget.style.display = 'none';
    } else {
        widget.style.display = 'block';
        widget.style.position = 'absolute';
        widget.style.top = '64px';
        widget.style.right = '24px';
        widget.style.background = '#0A2240';
        widget.style.padding = '12px';
        widget.style.borderRadius = '8px';
        widget.style.border = '1px solid rgba(255,255,255,.15)';
        widget.style.zIndex = '2000';
    }
});

// ── RENDER STEPS ───────────────────────────────
function renderSteps() {
    const grid = document.getElementById('stepsGrid');
    if (!grid || !window.STEPS) return;
    grid.innerHTML = STEPS.map((s, i) => `
    <div class="step-card" id="step-${i}" onclick="toggleStep(${i})">
      <div class="step-head">
        <div class="step-num">${s.num}</div>
        <span class="step-icon">${s.icon}</span>
        <div class="step-title">${s.title}</div>
        <span class="step-arrow">▼</span>
      </div>
      <div class="step-body">
        <div class="step-tag">${s.tag}</div>
        <p>${s.body}</p>
      </div>
    </div>
  `).join('');
}
function toggleStep(i) {
    const card = document.getElementById(`step-${i}`);
    card?.classList.toggle('open');
}

// ── RENDER TIMELINE ────────────────────────────
function renderTimeline() {
    const container = document.getElementById('timelineEvents');
    if (!container || !window.TIMELINE) return;
    container.innerHTML = TIMELINE.map((ev, i) => `
    <div class="timeline-event ${ev.phase}" style="animation-delay:${i * .07}s">
      <div class="tl-dot">${ev.icon}</div>
      <div class="tl-content">
        <div class="tl-date">${ev.date}</div>
        <div class="tl-title">${ev.title}</div>
        <div class="tl-desc">${ev.desc}</div>
      </div>
    </div>
  `).join('');
}

// ── RENDER FAQ ─────────────────────────────────
function renderFAQ() {
    const grid = document.getElementById('faqGrid');
    if (!grid || !window.FAQS) return;
    grid.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-q" onclick="toggleFAQ(${i})">
        <span>${f.q}</span>
        <span class="arrow">▼</span>
      </div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}
function toggleFAQ(i) {
    const item = document.getElementById(`faq-${i}`);
    item?.classList.toggle('open');
}

// ── INTERSECTION OBSERVER (animate on scroll) ──
function setupScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        }),
        { threshold: 0.1 }
    );
    document.querySelectorAll('.step-card, .faq-item, .timeline-event').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
        observer.observe(el);
    });
}

// ── INIT ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderSteps();
    renderTimeline();
    renderFAQ();
    setTimeout(setupScrollAnimations, 100);
});