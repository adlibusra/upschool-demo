# KaloriLens

Yemek fotoğrafından kalori ve makro analizi yapan uygulamanın mock veriyle çalışan prototipi.
Saf HTML/CSS/JS — derleme adımı ve bağımlılık yok.

## Yönlendirme kuralı

**Hash rotaları her zaman İngilizce yazılır.** Arayüz metinleri Türkçe olsa da rota adları
İngilizce kalır; yeni sayfa eklerken de bu kurala uyulur.

Mevcut rotalar:

| Rota | Sayfa |
| --- | --- |
| `#/home` | Ana sayfa, günün özeti, fotoğraf yükleme |
| `#/plan` | 7 günlük diyet planı |
| `#/analyzing` | Analiz yükleme ekranı |
| `#/analyze` | Analiz sonucu |
| `#/diary` | Günlük |
| `#/profile` | Profil |

Rotalar [js/app.js](js/app.js) içindeki `ROTALAR` nesnesinde tanımlıdır.

## Veri

Günlük kayıtlar tarih anahtarlı (`YYYY-MM-DD`) olarak `localStorage`'da tutulur:
`kalorilens-gunluk`, `kalorilens-su`, `kalorilens-profil`. İlk açılışta son 6 gün
diyet planından tohumlanır; bugün boş başlar.

## Çalıştırma

Sayfa harici CSS/JS kullandığı için yerel sunucu gerekir:

```bash
python -m http.server 5173
```
