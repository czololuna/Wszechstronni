// Konfiguracja
const BACKEND_IP = "192.168.1.100"; // ZMIEŃ na Twoje IP
const BACKEND_PORT = "5000";
const BACKEND_URL = `http://${BACKEND_IP}:${BACKEND_PORT}`;

// Funkcje dla sekcji
function openSection(section) {
  const messages = {
    start: "📚 Start od zera - przewodnik dla początkujących (wkrótce)",
    tests: "🧪 Moje testy i doświadczenia (wkrótce)",
    tools: "🛠️ Narzędzia i mini-aplikacje (wkrótce)"
  };
  alert(messages[section] || "Sekcja niedostępna");
}

// Funkcje dla kodu
async function redeemCode() {
  const codeInput = document.getElementById("codeInput");
  const resultDiv = document.getElementById("result");
  const code = codeInput.value.trim();

  if (!code) {
    resultDiv.textContent = "❌ Wpisz kod";
    resultDiv.style.color = "red";
    return;
  }

  resultDiv.textContent = "⏳ Sprawdzam...";
  resultDiv.style.color = "#666";

  try {
    const response = await fetch(`${BACKEND_URL}/redeem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (data.valid) {
      resultDiv.textContent = "✅ Kod prawidłowy!";
      resultDiv.style.color = "green";
      codeInput.value = "";
    } else {
      resultDiv.textContent = "❌ Kod nieprawidłowy";
      resultDiv.style.color = "red";
    }
  } catch (error) {
    resultDiv.textContent = "❌ Błąd połączenia z backend";
    resultDiv.style.color = "red";
    console.error("Błąd:", error);
  }
}

function clearCode() {
  document.getElementById("codeInput").value = "";
  document.getElementById("result").textContent = "";
}
