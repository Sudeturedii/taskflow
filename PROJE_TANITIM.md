# TaskFlow - Proje Tanıtım Dokümanı

**Proje Adı:** TaskFlow - Görev ve Proje Yönetim Sistemi API
**Eğitim:** Node.js ile Backend Programlama - Bitirme Projesi (2026)
**Hazırlayan:** <Ad Soyad>
**Hazırlayan:** Sude Türedi

## 1. Projenin Amacı

Bu proje, eğitim boyunca edinilen Node.js ve Express.js bilgilerini uygulamalı olarak göstermek amacıyla
geliştirilmiştir. Gerçek hayatta kullanılabilecek, REST API mantığında çalışan bir görev yönetim sistemi
oluşturulmuştur.

## 2. Senaryo

Bir yazılım şirketi, ekip içindeki görevleri ve çalışanların sorumluluklarını takip etmek istemektedir.
TaskFlow API'si ile görevler oluşturulabilir, çalışanlara atanabilir, durumları ve öncelikleri takip edilebilir,
güncellenebilir ve silinebilir.

## 3. Sistem Özeti

- **Teknolojiler:** Node.js, Express.js, JSON dosyası ile veri saklama
- **Mimari:** Routes (yönlendirme) → Controllers (iş mantığı) → Utils (dosya okuma/yazma)
- **Middleware:** Tüm istekleri (method, endpoint, zaman damgası) konsola ve `logs/logs.txt` dosyasına kaydeden Logger
- **Veri Saklama:** `data/tasks.json` (sunucu kapansa bile veriler korunur)

## 4. Veri Modeli

| Alan        | Tip    | Açıklama                                  |
|-------------|--------|-------------------------------------------|
| id          | number | Otomatik artan benzersiz numara           |
| title       | string | Görev başlığı (zorunlu)                   |
| description | string | Görev açıklaması                          |
| status      | string | `todo` / `in-progress` / `done`           |
| priority    | string | `low` / `medium` / `high`                 |
| assignee    | string | Görevin atandığı çalışan                  |

## 5. Temel Özellikler (Endpoint'ler)

| Özellik         | Method | Endpoint     |
|-----------------|--------|--------------|
| Görev ekleme    | POST   | /tasks       |
| Görev listeleme | GET    | /tasks       |
| Görev detayı    | GET    | /tasks/:id   |
| Görev güncelleme| PUT    | /tasks/:id   |
| Görev silme     | DELETE | /tasks/:id   |

## 6. Hata Yönetimi

- `400 Bad Request`: Başlık eksik, geçersiz status/priority veya bozuk JSON
- `404 Not Found`: Görev veya adres bulunamadı

## 7. Sonuç

Proje; CRUD operasyonlarını, routing yapısını ve temel middleware (logger) kullanımını eksiksiz
şekilde uygulayan çalışan bir REST API olarak tamamlanmıştır. Tüm uç noktalar Postman ile test edilmiştir.
