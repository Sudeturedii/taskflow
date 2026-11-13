const express = require("express");
const logger = require("./src/middleware/logger");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Gelen JSON body'lerini okuyabilmek için
app.use(express.json());

// Logger middleware: tüm isteklerden ÖNCE çalışmalı
app.use(logger);

// Ana sayfa: API çalışıyor mu kontrolü
app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API is running" });
});

// Tüm görev endpoint'leri /tasks altında
app.use("/tasks", taskRoutes);

// Tanımsız bir adres istenirse 404 döndür
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Genel hata yakalayıcı (örneğin bozuk JSON gönderilirse)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`TaskFlow API running on http://localhost:${PORT}`);
});
