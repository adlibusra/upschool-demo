# KaloriLens

Yemek fotoğrafından kalori ve makro besin analizi yapan uygulamanın **tasarım prototipi**.
Gerçek bir yapay zeka servisi bağlı değildir — tüm sonuçlar mock (sahte) veriden gelir.

## Çalıştırma

Proje saf HTML/CSS/JS ile yazıldı, derleme adımı yok. Ancak sayfalar harici CSS/JS dosyaları
kullandığı için dosyayı çift tıklamak yerine küçük bir yerel sunucu üzerinden açın:

```bash
python -m http.server 5173
```

Ardından tarayıcıda `http://localhost:5173` adresini açın.

## Sayfalar

Uygulama hash tabanlı yönlendirme kullanır (tek `index.html`):

| Rota | Sayfa |
| --- | --- |
| `#/home` | Ana sayfa, fotoğraf yükleme ve günün özeti |
| `#/analyzing` | 5 saniyelik analiz animasyonu |
| `#/analyze` | Analiz sonucu, besin listesi, makro dağılımı |
| `#/diary` | Günlük — öğünler, hedef takibi, haftalık grafik |
| `#/profile` | Profil, hedefler ve istatistikler |

## Dosya yapısı

```
index.html        Uygulama kabuğu ve navigasyon
css/style.css     Tüm stiller (CSS değişkenleriyle tema)
js/mock-data.js   Sahte veri: kullanıcı, yemekler, 7 günlük kayıtlar
js/app.js         Hash router ve sayfa şablonları
```

## Notlar

- Profil hedefleri `localStorage` üzerinde saklanır.
- Yüklenen fotoğraf sadece tarayıcı belleğinde tutulur, hiçbir yere gönderilmez.
- Yemek görselleri için dış bağımlılık yoktur; emoji ve renk kullanılır.
