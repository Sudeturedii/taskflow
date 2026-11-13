const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "..", "data", "tasks.json");

// tasks.json dosyasını okuyup JavaScript dizisine çevirir
function readTasks() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // Dosya yoksa veya bozuksa boş liste ile devam et
    return [];
  }
}

// Diziyi tekrar tasks.json dosyasına yazar
function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
}

module.exports = { readTasks, writeTasks };
