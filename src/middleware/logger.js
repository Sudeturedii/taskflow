const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "..", "..", "logs");
const logFile = path.join(logDir, "logs.txt");

// logs klasörü yoksa oluştur
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Her isteğin method, endpoint ve zaman damgasını kaydeder
function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${req.method} ${req.originalUrl}`;

  // 1) Konsola yaz
  console.log(line);

  // 2) Dosyaya ekle
  fs.appendFile(logFile, line + "\n", (err) => {
    if (err) console.error("Log file write error:", err.message);
  });

  // Bir sonraki adıma (route'a) geç
  next();
}

module.exports = logger;
