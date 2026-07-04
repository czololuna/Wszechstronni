// Logger - Moduł do logowania zdarzeń na stronie klienta
const Logger = {
    logs: [],
    maxLogs: 100,
    
    log: function(message) {
        const timestamp = new Date().toLocaleTimeString("pl-PL");
        const logEntry = `[${timestamp}] ${message}`;
        
        this.logs.push(logEntry);
        
        // Ogranicz ilość logów
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        
        console.log(logEntry);
        this.save();
    },
    
    save: function() {
        try {
            localStorage.setItem("wszechstronni_logs", JSON.stringify(this.logs));
        } catch (e) {
            console.warn("Nie można zapisać logów do localStorage:", e);
        }
    },
    
    load: function() {
        try {
            const saved = localStorage.getItem("wszechstronni_logs");
            if (saved) {
                this.logs = JSON.parse(saved);
            }
        } catch (e) {
            console.warn("Nie można załadować logów z localStorage:", e);
        }
    },
    
    getAll: function() {
        return this.logs;
    },
    
    clear: function() {
        this.logs = [];
        localStorage.removeItem("wszechstronni_logs");
        console.log("Logi wyczyszczone");
    }
};

// Załaduj logi przy starcie
Logger.load();
Logger.log("🔧 Logger zainicjalizowany");
