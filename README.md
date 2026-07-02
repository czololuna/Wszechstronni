# Wszechstronni - Nauka, zabawa, udział, zarobek

Platforma edukacyjna dla początkujących z systemem kodów, praktycznymi narzędziami i przykładami.

## 🚀 Szybki start

### Frontend (HTML/CSS/JS)
```bash
# Otwórz w przeglądarce lub serwuj lokalnie
python3 -m http.server 8000
# Odwiedź: http://localhost:8000
```

### Backend (Flask)
```bash
# 1. Zainstaluj zależności
pip install -r requirements.txt

# 2. Ustaw klucz admin (Linux/Mac)
export ADMIN_KEY="twoj_super_tajny_klucz"

# Na Windows (Command Prompt):
set ADMIN_KEY=twoj_super_tajny_klucz

# Na Windows (PowerShell):
$env:ADMIN_KEY="twoj_super_tajny_klucz"

# 3. Uruchom serwer
python app.py
# Serwer dostępny: http://0.0.0.0:5000
```

## 📋 Konfiguracja

W pliku `app.js` zmień IP na Twoje lokalne IP:
```javascript
const BACKEND_IP = "192.168.1.100"; // ZMIEŃ to
const BACKEND_PORT = "5000";
```

Aby znaleźć swoje IP:
- **Linux/Mac**: `ifconfig` lub `hostname -I`
- **Windows**: `ipconfig`
- **Termux**: `hostname -I`

## 🔧 API Endpoints

### Publiczne
- `POST /redeem` - Sprawdzanie kodu
  ```json
  { "code": "ABC123DEF456" }
  ```

### Admin (wymagany X-ADMIN-KEY)
- `POST /admin/generate` - Generowanie kodów
  ```json
  { "amount": 10 }
  ```
- `GET /admin/list` - Lista aktywnych kodów

## 📁 Struktura

```
index.html           - Strona główna
joke-generator.html  - Generator żartów (standalone)
app.js              - Frontend (JavaScript)
app.py              - Backend (Flask)
style.css           - Style
logger.js           - Logger (opcjonalny)
requirements.txt    - Zależności Python
```

## 🎯 Funkcje

- ✅ Kod do sprawdzenia (formularz)
- ✅ Generator żartów z API
- ✅ System generowania kodów admin
- ✅ Obsługa SQLite i JSON

## 📝 Uwagi

- Backend musi być uruchomiony w Termuxie lub na innym urządzeniu
- Zmień IP w `app.js` na adres Twojego serwera
- Ustaw `ADMIN_KEY` przed uruchomieniem produkcji
