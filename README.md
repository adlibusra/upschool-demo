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
| `#/home` | Günün özeti, sıradaki plan öğünü, fotoğraf yükleme |
| `#/plan` | 7 günlük örnek diyet listesi, öğünü tek dokunuşla günlüğe ekleme |
| `#/analyzing` | 5 saniyelik analiz animasyonu |
| `#/analyze` | Analiz sonucu, besin listesi, makro dağılımı |
| `#/diary` | Günlük — öğünler, su takibi, manuel ekleme, haftalık grafik |
| `#/profile` | Profil, hedefler ve istatistikler |

## Günlük diyet takibi

- **Diyet planı:** Pazartesi–Pazar için günde 5 öğünlük (~1550-1610 kcal) uygulanabilir liste.
  Her öğünün porsiyonu, kalorisi ve makroları yazılı. "Yedim" ile günlüğe düşer.
- **Günlük kayıt:** Öğünler tarih bazlı tutulur; gün seçiciyle son 7 gün gezilir.
- **Manuel ekleme:** Hazır besin kütüphanesinden seç ya da ad + kalori girerek ekle.
- **Su takibi:** Günlük bardak hedefi, tıklayarak işaretlenir.
- **İstatistikler:** Son 7 günün ortalaması, toplam öğün ve kesintisiz takip serisi.

Veriler `localStorage`'da saklanır. Profil sayfasındaki **Günlüğü Sıfırla** ile örnek
veriler yeniden yüklenir.

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
