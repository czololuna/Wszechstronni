function openSection(section) {
    alert("Sekcja: " + section + " (tu później dodamy treść)");
}

// FUNKCJA ŁĄCZĄCA SIĘ Z TWOIM API W TERMUXIE
async function redeemCode() {
    const code = document.getElementById("codeInput").value;

    const res = await fetch("http://192.168.0.152:5000/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
    });

    const data = await res.json();

    if (data.valid === true) {
        document.getElementById("result").innerText = "Kod jest prawidłowy!";
    } else {
        document.getElementById("result").innerText = "Kod nieprawidłowy.";
    }
}
