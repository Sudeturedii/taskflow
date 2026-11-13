# TaskFlow - Görev ve Proje Yönetim Sistemi API

Node.js ve Express.js ile geliştirilmiş, REST API mantığında çalışan basit bir görev yönetim sistemi.
Veriler `data/tasks.json` dosyasında saklanır, böylece sunucu kapansa bile görevler kaybolmaz.

## Gereksinimler

- [Node.js](https://nodejs.org/) (v18 veya üzeri önerilir)
- npm (Node.js ile birlikte gelir)
- Postman (test için)

## Kurulum ve Çalıştırma

1. Repoyu bilgisayarına indir:
   ```bash
   git clone <REPO_URL>
   cd taskflow
   ```
2. Bağımlılıkları kur:
   ```bash
   npm install
   ```
3. Sunucuyu başlat:
   ```bash
   npm start
   ```
4. Konsolda şu mesajı görmelisin:
   ```
   TaskFlow API running on http://localhost:3000
   ```
5. Tarayıcıda veya Postman'de `http://localhost:3000/` adresini aç. `{"message":"TaskFlow API is running"}` yanıtı gelirse her şey hazır.

> Geliştirme sırasında dosya değişince otomatik yeniden başlatmak için: `npm run dev`

## Proje Yapısı

```
taskflow/
├── server.js                    # Uygulamanın giriş noktası
├── package.json
├── data/
│   └── tasks.json               # Görevlerin saklandığı JSON dosyası
├── logs/
│   └── logs.txt                 # Logger çıktısı (otomatik oluşur)
├── screenshots/                 # Postman test ekran görüntüleri
├── postman/
│   └── TaskFlow.postman_collection.json
└── src/
    ├── routes/taskRoutes.js         # Endpoint tanımları (routing)
    ├── controllers/taskController.js # CRUD iş mantığı
    ├── middleware/logger.js         # İstekleri kaydeden middleware
    └── utils/fileStorage.js         # JSON dosyası okuma/yazma
```

## Görev (Task) Yapısı

| Alan        | Tip    | Açıklama                                  |
|-------------|--------|-------------------------------------------|
| id          | number | Otomatik verilir                          |
| title       | string | Görev başlığı (**zorunlu**)               |
| description | string | Görev açıklaması                          |
| status      | string | `todo`, `in-progress`, `done` (varsayılan: `todo`) |
| priority    | string | `low`, `medium`, `high` (varsayılan: `medium`)     |
| assignee    | string | Göreve atanan kişi (örn. Ahmet, Ayşe, Mehmet)      |

## API Endpoint'leri

| Method | Endpoint     | Açıklama           | Başarılı Kod |
|--------|--------------|--------------------|--------------|
| POST   | /tasks       | Görev ekleme       | 201          |
| GET    | /tasks       | Görev listeleme    | 200          |
| GET    | /tasks/:id   | Görev detayı       | 200          |
| PUT    | /tasks/:id   | Görev güncelleme   | 200          |
| DELETE | /tasks/:id   | Görev silme        | 200          |

Hata durumları: `400` (geçersiz/eksik veri), `404` (görev bulunamadı).

### Örnek İstekler

**POST /tasks**
```json
{
  "title": "API testlerini yaz",
  "description": "Postman ile tüm endpoint'leri test et",
  "status": "todo",
  "priority": "high",
  "assignee": "Mehmet"
}
```

**PUT /tasks/1** (sadece değişecek alanları göndermek yeterli)
```json
{
  "status": "done"
}
```

## Logger

Her istek hem konsola hem `logs/logs.txt` dosyasına şu formatta yazılır:

```
[2026-11-12T10:30:00.000Z] GET /tasks
```

## Postman ile Test

`postman/TaskFlow.postman_collection.json` dosyasını Postman'e **Import** ederek 5 hazır isteği kullanabilirsin.
Test ekran görüntüleri `screenshots/` klasöründedir.
