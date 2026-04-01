# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import os, json, secrets, string, sqlite3, time

app = Flask(__name__)
CORS(app)

# CONFIG
USE_SQLITE = True  # ustaw False jeśli chcesz zostać przy JSON
CODES_FILE = "codes/active.json"
DB_FILE = "codes/codes.db"
ADMIN_KEY = os.environ.get("ADMIN_KEY", "change_me_now")  # ustaw w Termuxie

# GENERATOR
def generate_code(length=12):
    alphabet = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

# JSON helpers
def load_codes_json():
    if not os.path.exists(CODES_FILE):
        return []
    with open(CODES_FILE, "r") as f:
        return json.load(f)

def save_codes_json(codes):
    with open(CODES_FILE, "w") as f:
        json.dump(codes, f, indent=2)

# SQLITE helpers
def init_db():
    os.makedirs(os.path.dirname(DB_FILE), exist_ok=True)
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT UNIQUE,
            created_at INTEGER
        )
    """)
    conn.commit()
    conn.close()

def add_code_sql(code):
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("INSERT OR IGNORE INTO codes (code, created_at) VALUES (?, ?)", (code, int(time.time())))
    conn.commit()
    conn.close()

def list_codes_sql():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("SELECT code FROM codes")
    rows = [r[0] for r in cur.fetchall()]
    conn.close()
    return rows

def remove_code_sql(code):
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("DELETE FROM codes WHERE code = ?", (code,))
    changed = cur.rowcount
    conn.commit()
    conn.close()
    return changed > 0

# init
if USE_SQLITE:
    init_db()
else:
    os.makedirs("codes", exist_ok=True)
    if not os.path.exists(CODES_FILE):
        save_codes_json([])

@app.route("/")
def home():
    return jsonify({"status": "Wszech API działa"})

# public generate (optional, rate-limit externally)
@app.route("/generate", methods=["POST"])
def generate_public():
    data = request.get_json() or {}
    amount = int(data.get("amount", 1))
    new_codes = []
    for _ in range(amount):
        c = generate_code()
        new_codes.append(c)
        if USE_SQLITE:
            add_code_sql(c)
        else:
            codes = load_codes_json()
            codes.append(c)
            save_codes_json(codes)
    return jsonify({"generated": new_codes})

# admin generate (protected)
@app.route("/admin/generate", methods=["POST"])
def generate_admin():
    key = request.headers.get("X-ADMIN-KEY") or request.args.get("key")
    if key != ADMIN_KEY:
        return jsonify({"error": "unauthorized"}), 401

    data = request.get_json() or {}
    amount = int(data.get("amount", 1))
    new_codes = []
    for _ in range(amount):
        c = generate_code()
        new_codes.append(c)
        if USE_SQLITE:
            add_code_sql(c)
        else:
            codes = load_codes_json()
            codes.append(c)
            save_codes_json(codes)
    return jsonify({"generated": new_codes})

@app.route("/redeem", methods=["POST"])
def redeem():
    data = request.get_json() or {}
    code = data.get("code")
    if not code:
        return jsonify({"error": "missing code"}), 400

    if USE_SQLITE:
        ok = remove_code_sql(code)
        return jsonify({"valid": bool(ok)})
    else:
        codes = load_codes_json()
        if code not in codes:
            return jsonify({"valid": False})
        codes.remove(code)
        save_codes_json(codes)
        return jsonify({"valid": True})

@app.route("/admin/list", methods=["GET"])
def admin_list():
    key = request.headers.get("X-ADMIN-KEY") or request.args.get("key")
    if key != ADMIN_KEY:
        return jsonify({"error": "unauthorized"}), 401
    if USE_SQLITE:
        return jsonify({"codes": list_codes_sql()})
    else:
        return jsonify({"codes": load_codes_json()})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
