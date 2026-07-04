// Wszechstronni - Frontend Application
const APP = {
    baseURL: "http://192.168.1.100:5000", // zmień IP na swój adres lokalny
    currentSection: null,
    comments: {} // Magazyn komentarzy
};

// ============ INICJALIZACJA ============
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Wszechstronni App załadowany");
    loadComments(); // Załaduj zapisane komentarze
});

// ============ OTWIERANIE SEKCJI ============
function openSection(section) {
    APP.currentSection = section;
    
    const sectionsContent = {
        start: {
            title: "Start od zera",
            key: "start",
            content: `
                <div class="section-view">
                    <button class="btn back-btn" onclick="closeSection()">← Powrót</button>
                    <h3>Pierwszy krok do sukcesu</h3>
                    <ol>
                        <li>Zdefiniuj swój cel</li>
                        <li>Rozbij go na mniejsze kroki</li>
                        <li>Zrób pierwszy krok dzisiaj</li>
                        <li>Powtarzaj codziennie</li>
                    </ol>
                    <div class="comments-section">
                        <h4>💬 Komentarze</h4>
                        <textarea id="commentInput" placeholder="Wpisz swój komentarz..." class="comment-input"></textarea>
                        <button class="btn" onclick="addComment('start')">✏️ Dodaj komentarz</button>
                        <div id="start-comments" class="comments-list"></div>
                    </div>
                </div>
            `
        },
        tests: {
            title: "Moje testy",
            key: "tests",
            content: `
                <div class="section-view">
                    <button class="btn back-btn" onclick="closeSection()">← Powrót</button>
                    <h3>Realne doświadczenia i wyniki</h3>
                    <p>Tutaj będą opisane eksperymenty i ich wyniki</p>
                    <div class="test-item">
                        <h4>Test #1: Rutyna poranna</h4>
                        <p>Wynik: +30% produktywności</p>
                    </div>
                    <div class="test-item">
                        <h4>Test #2: Technika Pomodoro</h4>
                        <p>Wynik: Lepsza koncentracja</p>
                    </div>
                    <div class="comments-section">
                        <h4>💬 Komentarze</h4>
                        <textarea id="commentInput" placeholder="Wpisz swój komentarz..." class="comment-input"></textarea>
                        <button class="btn" onclick="addComment('tests')">✏️ Dodaj komentarz</button>
                        <div id="tests-comments" class="comments-list"></div>
                    </div>
                </div>
            `
        },
        tools: {
            title: "Narzędzia",
            key: "tools",
            content: `
                <div class="section-view">
                    <button class="btn back-btn" onclick="closeSection()">← Powrót</button>
                    <h3>Praktyczne mini-narzędzia</h3>
                    <div class="tools-grid">
                        <div class="tool-card" onclick="openTool('calculator')">
                            <h4>📱 Kalkulator BMI</h4>
                            <p>Sprawdź swój wskaźnik masy ciała</p>
                        </div>
                        <div class="tool-card" onclick="openTool('timer')">
                            <h4>⏱️ Timer</h4>
                            <p>Odmierzacz czasu dla nauki</p>
                        </div>
                        <div class="tool-card" onclick="openTool('notes')">
                            <h4>📝 Notatki</h4>
                            <p>Szybkie notatki i TODO</p>
                        </div>
                        <div class="tool-card" onclick="openTool('goaltracker')">
                            <h4>🎯 Śledzenie celów</h4>
                            <p>Monitoruj postęp swoich celów</p>
                        </div>
                    </div>
                    <div class="comments-section">
                        <h4>💬 Komentarze do narzędzi</h4>
                        <textarea id="commentInput" placeholder="Wpisz swój komentarz..." class="comment-input"></textarea>
                        <button class="btn" onclick="addComment('tools')">✏️ Dodaj komentarz</button>
                        <div id="tools-comments" class="comments-list"></div>
                    </div>
                </div>
            `
        }
    };
    
    const sectionData = sectionsContent[section];
    if (!sectionData) {
        console.warn("❌ Nieznana sekcja:", section);
        return;
    }
    
    // Zmień HTML główny
    const main = document.querySelector("main");
    main.innerHTML = sectionData.content;
    
    // Załaduj komentarze dla tej sekcji
    displayComments(sectionData.key);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ============ ZAMYKANIE SEKCJI ============
function closeSection() {
    location.reload(); // Reload strony aby wrócić do widoku głównego
}

// ============ SYSTEM KOMENTARZY ============
function addComment(section) {
    const input = document.getElementById("commentInput");
    const comment = input.value.trim();
    
    if (!comment) {
        alert("⚠️ Wpisz coś w komentarz!");
        return;
    }
    
    // Inicjalizuj komentarze dla sekcji jeśli nie istnieją
    if (!APP.comments[section]) {
        APP.comments[section] = [];
    }
    
    // Dodaj nowy komentarz
    const newComment = {
        id: Date.now(),
        text: comment,
        date: new Date().toLocaleString("pl-PL"),
        author: "Ty"
    };
    
    APP.comments[section].push(newComment);
    
    // Zapisz do localStorage
    saveComments();
    
    // Wyczyść input
    input.value = "";
    
    // Odśwież listę komentarzy
    displayComments(section);
    
    console.log("✅ Komentarz dodany:", newComment);
}

function displayComments(section) {
    const container = document.getElementById(section + "-comments");
    if (!container) return;
    
    const comments = APP.comments[section] || [];
    
    if (comments.length === 0) {
        container.innerHTML = '<p style="color: #999;">Brak komentarzy. Bądź pierwszy!</p>';
        return;
    }
    
    container.innerHTML = comments.map(c => `
        <div class="comment">
            <div class="comment-header">
                <strong>${c.author}</strong>
                <small>${c.date}</small>
            </div>
            <p>${c.text}</p>
            <button class="btn-small delete-btn" onclick="deleteComment('${section}', ${c.id})">🗑️ Usuń</button>
        </div>
    `).join("");
}

function deleteComment(section, id) {
    if (!APP.comments[section]) return;
    APP.comments[section] = APP.comments[section].filter(c => c.id !== id);
    saveComments();
    displayComments(section);
    console.log("🗑️ Komentarz usunięty");
}

function saveComments() {
    localStorage.setItem("wszechstronni_comments", JSON.stringify(APP.comments));
}

function loadComments() {
    const saved = localStorage.getItem("wszechstronni_comments");
    if (saved) {
        APP.comments = JSON.parse(saved);
        console.log("📥 Komentarze załadowane z localStorage");
    }
}

// ============ NARZĘDZIA ============
function openTool(tool) {
    const toolNames = {
        calculator: "Kalkulator BMI",
        timer: "Timer",
        notes: "Notatki",
        goaltracker: "Śledzenie celów"
    };
    alert(`🔧 Narzędzie: ${toolNames[tool] || tool}\n\nTa funkcja będzie wkrótce dostępna!`);
    console.log("Otwarte narzędzie:", tool);
}

// ============ SPRAWDZANIE KODÓW ============
function redeemCode() {
    const code = document.getElementById("codeInput").value.trim();
    const resultEl = document.getElementById("result");
    
    if (!code) {
        resultEl.innerHTML = "❌ Wpisz kod!";
        resultEl.style.color = "red";
        return;
    }
    
    // Wyślij do backendu
    fetch(`${APP.baseURL}/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code })
    })
    .then(r => r.json())
    .then(data => {
        if (data.valid) {
            resultEl.innerHTML = "✅ Kod ważny! Gratulacje!";
            resultEl.style.color = "green";
            document.getElementById("codeInput").value = "";
            log("✅ Valid code redeemed: " + code);
        } else {
            resultEl.innerHTML = "❌ Kod nieważny lub już użyty";
            resultEl.style.color = "red";
            log("❌ Invalid code attempt: " + code);
        }
    })
    .catch(err => {
        resultEl.innerHTML = "⚠️ Błąd połączenia z serwerem. Czy backend działa?";
        resultEl.style.color = "orange";
        console.error("API Error:", err);
        log("⚠️ API Error: " + err.message);
    });
}

function clearCode() {
    document.getElementById("codeInput").value = "";
    document.getElementById("result").innerHTML = "";
}

// ============ LOGGING (integracja z logger.js) ============
function log(message) {
    if (typeof Logger !== 'undefined') {
        Logger.log(message);
    } else {
        console.log(message);
    }
}

console.log("🚀 Wszechstronni App gotowa!");
