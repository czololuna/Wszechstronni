
// Prosty frontend logic
const API_BASE = "http://192.168.0.152:5000"; // <- Upewnij się, że to Twój adres z Termuxa

function openSection(section) {
    alert("Sekcja: " + section + " — tu możesz dodać treść.");
}

function clearCode() {
    document.getElementById("codeInput").value = "";
    document.getElementById("result").innerText = "";
}

async function redeemCode() {
    const code = document.getElementById("codeInput").value.trim();
    const resultEl = document.getElementById("result");
    resultEl.innerText = "";

    if (!code) {
        resultEl.innerText = "Wpisz kod.";
        resultEl.style.color = "#b33";
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/redeem`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
        });

        if (!res.ok) {
            resultEl.innerText = "Błąd połączenia z API.";
            resultEl.style.color = "#b33";
            return;
        }

        const data = await res.json();

        if (data.valid === true) {
            resultEl.innerText = "✅ Kod jest prawidłowy!";
            resultEl.style.color = "#1a7f37";
        } else {
            resultEl.innerText = "❌ Kod nieprawidłowy.";
            resultEl.style.color = "#b33";
        }
    } catch (err) {
        resultEl.innerText = "Błąd sieci. Sprawdź Termux i adres IP.";
        resultEl.style.color = "#b33";
        console.error(err);
    }
}