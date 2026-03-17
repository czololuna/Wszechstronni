javascript
function openSection(section) {
    const content = document.createElement('div');
    content.className = 'section-content';

    let html = '';

    if (section === 'start') {
        html = `
            <h2>Start od zera</h2>
            <p>Najprostszy możliwy sposób, by zacząć naukę bez chaosu i presji.</p>

            <ul>
                <li>Zacznij od jednego małego kroku.</li>
                <li>Nie szukaj idealnych materiałów — zacznij od tego, co masz.</li>
                <li>Rób krótkie sesje, ale regularnie.</li>
                <li>Notuj swoje postępy, nawet minimalne.</li>
            </ul>

            <button onclick="closeSection()">Wróć</button>
        `;
    }

    if (section === 'tests') {
        html = `
            <h2>Moje testy</h2>
            <p>Realne doświadczenia, bez ściemy. To, co naprawdę działa.</p>

            <div class="test-item">
                <h3>Test 1 — Grafiki z telefonu</h3>
                <p>Jak stworzyć profesjonalne grafiki bez komputera.</p>
            </div>

            <div class="test-item">
                <h3>Test 2 — Nauka HTML z telefonu</h3>
                <p>Jak zacząłem budować pierwsze strony tylko na Androidzie.</p>
            </div>

            <button onclick="closeSection()">Wróć</button>
        `;
    }

    if (section === 'tools') {
        html = `
            <h2>Narzędzia</h2>
            <p>Proste, praktyczne mini‑narzędzia dla początkujących.</p>

            <button onclick="alert('Planer nauki w przygotowaniu')">Planer nauki</button>
            <button onclick="alert('Generator celów w przygotowaniu')">Generator celów</button>
            <button onclick="alert('Notatnik w przygotowaniu')">Minimalistyczny notatnik</button>

            <button onclick="closeSection()">Wróć</button>
        `;
    }

    content.innerHTML = html;
    document.body.appendChild(content);

    document.querySelector('main').style.display = 'none';
    document.querySelector('header').style.display = 'none';
}

function closeSection() {
    const section = document.querySelector('.section-content');
    if (section) section.remove();

    document.querySelector('main').style.display = 'block';
    document.querySelector('header').style.display = 'block';
}
`

---
