const uygulama = document.getElementById('uygulama');
const menu = document.getElementById('menu');

const ROTALAR = {
  '#/home': anaSayfa,
  '#/analyzing': yukleniyorSayfasi,
  '#/analyze': analizSayfasi,
  '#/diary': gunlukSayfasi,
  '#/profile': profilSayfasi
};

const YUKLEME_ADIMLARI = [
  'Fotoğraf işleniyor…',
  'Besinler tanınıyor…',
  'Porsiyon büyüklüğü ölçülüyor…',
  'Kalori ve makrolar hesaplanıyor…',
  'Sonuçlar hazırlanıyor…'
];

let durum = {
  fotoUrl: null,
  yemek: null,
  adetler: {},
  seciliGun: 6,
  silinenler: {}
};

function ayarlariOku() {
  try {
    const kayit = localStorage.getItem('kalorilens-profil');
    return kayit ? { ...MOCK.kullanici, ...JSON.parse(kayit) } : { ...MOCK.kullanici };
  } catch {
    return { ...MOCK.kullanici };
  }
}

function ayarlariYaz(ayar) {
  try {
    localStorage.setItem('kalorilens-profil', JSON.stringify(ayar));
  } catch {
    /* depolama kapalıysa sessizce geç */
  }
}

function bildir(mesaj) {
  const el = document.getElementById('bildirim');
  el.textContent = mesaj;
  el.classList.add('gorunur');
  clearTimeout(bildir.zaman);
  bildir.zaman = setTimeout(() => el.classList.remove('gorunur'), 2600);
}

function sayi(n) {
  return Math.round(n).toLocaleString('tr-TR');
}

function makroBar(ad, gram, yuzde, renk) {
  return `
    <div class="makro-satir">
      <div class="makro-ust">
        <span class="ad"><span class="makro-nokta" style="background:${renk}"></span>${ad}</span>
        <span class="deger">${sayi(gram)} g · %${Math.round(yuzde)}</span>
      </div>
      <div class="makro-ray"><div class="makro-dolu" style="width:${yuzde}%;background:${renk}"></div></div>
    </div>`;
}

function makroKart(toplam) {
  const kcal = toplam.protein * 4 + toplam.karbonhidrat * 4 + toplam.yag * 9 || 1;
  return `
    <div class="kart">
      <div class="kart-baslik">Makro Dağılımı</div>
      ${makroBar('Protein', toplam.protein, (toplam.protein * 4 * 100) / kcal, 'var(--protein)')}
      ${makroBar('Karbonhidrat', toplam.karbonhidrat, (toplam.karbonhidrat * 4 * 100) / kcal, 'var(--karbonhidrat)')}
      ${makroBar('Yağ', toplam.yag, (toplam.yag * 9 * 100) / kcal, 'var(--yag)')}
    </div>`;
}

/* ---------------- Ana sayfa ---------------- */

function anaSayfa() {
  const ayar = ayarlariOku();
  const bugun = gunToplami(durum.seciliGun);
  const yuzde = Math.min(100, (bugun.kalori / ayar.gunlukHedef) * 100);

  uygulama.innerHTML = `
    <div class="sayfa">
      <section class="hero">
        <span class="rozet-ust">✨ Yapay zeka destekli</span>
        <h1>Yemeğini çek,<br><em>kalorini öğren</em></h1>
        <p>Tabağının fotoğrafını yükle, saniyeler içinde besinleri, kalorileri ve makro değerlerini gör.</p>
      </section>

      <div class="yukleme-alani" id="birakmaAlani">
        <div id="yuklemeIcerik">
          <div class="yukleme-ikon">📷</div>
          <h3>Fotoğrafını buraya sürükle</h3>
          <p>veya cihazından seç · JPG, PNG</p>
          <div class="yukleme-butonlar">
            <button class="btn btn-dolu" id="secBtn">Fotoğraf Seç</button>
            <button class="btn btn-cerceve" id="kameraBtn">Kamera ile Çek</button>
          </div>
        </div>
      </div>

      <input type="file" id="dosyaGirdi" accept="image/*" hidden>
      <input type="file" id="kameraGirdi" accept="image/*" capture="environment" hidden>

      <div style="margin-top:32px" class="kart">
        <div class="ozet-serit">
          <div class="ozet-sol">
            <div class="etiket">Bugün alınan</div>
            <div class="deger">${sayi(bugun.kalori)} <span>/ ${sayi(ayar.gunlukHedef)} kcal</span></div>
          </div>
          <div style="flex:1;min-width:180px">
            <div class="makro-ray"><div class="makro-dolu" style="width:${yuzde}%;background:var(--yesil)"></div></div>
          </div>
          <a class="btn btn-cerceve" href="#/diary">Günlüğü Aç</a>
        </div>
      </div>

      <h3 style="margin:36px 0 16px;font-size:18px">Nasıl çalışır?</h3>
      <div class="grid-3">
        <div class="adim-kart">
          <div class="adim-no">1</div>
          <h4>Çek</h4>
          <p>Tabağının fotoğrafını çek veya galerinden yükle.</p>
        </div>
        <div class="adim-kart">
          <div class="adim-no">2</div>
          <h4>Analiz Et</h4>
          <p>Yapay zeka besinleri tanır ve porsiyonu tahmin eder.</p>
        </div>
        <div class="adim-kart">
          <div class="adim-no">3</div>
          <h4>Takip Et</h4>
          <p>Öğününü günlüğe kaydet, hedefine ne kadar kaldığını gör.</p>
        </div>
      </div>
    </div>`;

  kurAnaSayfa();
}

function kurAnaSayfa() {
  const alan = document.getElementById('birakmaAlani');
  const dosyaGirdi = document.getElementById('dosyaGirdi');
  const kameraGirdi = document.getElementById('kameraGirdi');

  document.getElementById('secBtn').onclick = () => dosyaGirdi.click();
  document.getElementById('kameraBtn').onclick = () => kameraGirdi.click();

  dosyaGirdi.onchange = (e) => dosyaAl(e.target.files[0]);
  kameraGirdi.onchange = (e) => dosyaAl(e.target.files[0]);

  alan.addEventListener('dragover', (e) => {
    e.preventDefault();
    alan.classList.add('surukleniyor');
  });
  alan.addEventListener('dragleave', () => alan.classList.remove('surukleniyor'));
  alan.addEventListener('drop', (e) => {
    e.preventDefault();
    alan.classList.remove('surukleniyor');
    dosyaAl(e.dataTransfer.files[0]);
  });
}

function dosyaAl(dosya) {
  if (!dosya || !dosya.type.startsWith('image/')) {
    bildir('Lütfen bir görsel dosyası seç.');
    return;
  }
  const okuyucu = new FileReader();
  okuyucu.onload = () => {
    durum.fotoUrl = okuyucu.result;
    onizlemeGoster(dosya.name);
  };
  okuyucu.readAsDataURL(dosya);
}

function onizlemeGoster(dosyaAdi) {
  document.getElementById('yuklemeIcerik').innerHTML = `
    <div class="onizleme">
      <img src="${durum.fotoUrl}" alt="Yüklenen yemek fotoğrafı">
      <div class="onizleme-ad">${dosyaAdi}</div>
      <div class="yukleme-butonlar">
        <button class="btn btn-dolu" id="analizBtn">Analiz Et</button>
        <button class="btn btn-cerceve" id="degistirBtn">Başka Fotoğraf</button>
      </div>
    </div>`;

  document.getElementById('analizBtn').onclick = () => {
    location.hash = '#/analyzing';
  };
  document.getElementById('degistirBtn').onclick = () => {
    durum.fotoUrl = null;
    anaSayfa();
  };
}

/* ---------------- Yükleniyor ---------------- */

function yukleniyorSayfasi() {
  uygulama.innerHTML = `
    <div class="yukleniyor">
      <div>
        <div class="spinner"></div>
        <h2>Yemeğin analiz ediliyor</h2>
        <p class="yukleniyor-mesaj" id="yuklemeMesaj">${YUKLEME_ADIMLARI[0]}</p>
        <div class="ilerleme-ray"><div class="ilerleme-dolu" id="ilerlemeDolu"></div></div>
      </div>
    </div>`;

  const sure = 5000;
  const adimSuresi = sure / YUKLEME_ADIMLARI.length;
  const mesajEl = document.getElementById('yuklemeMesaj');
  const doluEl = document.getElementById('ilerlemeDolu');
  const zamanlayicilar = [];

  requestAnimationFrame(() => {
    doluEl.style.transition = `width ${sure}ms linear`;
    doluEl.style.width = '100%';
  });

  YUKLEME_ADIMLARI.forEach((mesaj, i) => {
    if (i === 0) return;
    zamanlayicilar.push(
      setTimeout(() => {
        if (location.hash !== '#/analyzing') return;
        mesajEl.textContent = mesaj;
        mesajEl.style.animation = 'none';
        void mesajEl.offsetWidth;
        mesajEl.style.animation = '';
      }, adimSuresi * i)
    );
  });

  zamanlayicilar.push(
    setTimeout(() => {
      if (location.hash !== '#/analyzing') return;
      durum.yemek = MOCK.yemekler[Math.floor(Math.random() * MOCK.yemekler.length)];
      durum.adetler = {};
      location.replace('#/analyze');
    }, sure)
  );

  yukleniyorSayfasi.temizle = () => zamanlayicilar.forEach(clearTimeout);
}

/* ---------------- Analiz ---------------- */

function analizSayfasi() {
  if (!durum.yemek) {
    durum.yemek = MOCK.yemekler[0];
    durum.adetler = {};
  }

  const yemek = durum.yemek;
  const besinler = yemek.besinler.map((b, i) => ({ ...b, adet: durum.adetler[i] ?? 1 }));
  const toplam = besinler.reduce(
    (acc, b) => ({
      kalori: acc.kalori + b.kalori * b.adet,
      protein: acc.protein + b.protein * b.adet,
      karbonhidrat: acc.karbonhidrat + b.karbonhidrat * b.adet,
      yag: acc.yag + b.yag * b.adet
    }),
    { kalori: 0, protein: 0, karbonhidrat: 0, yag: 0 }
  );

  const gorsel = durum.fotoUrl
    ? `<img src="${durum.fotoUrl}" alt="${yemek.ad}">`
    : `<div class="foto-emoji">${yemek.emoji}</div>`;

  uygulama.innerHTML = `
    <div class="sayfa">
      <h1 class="sayfa-baslik">Analiz Sonucu</h1>
      <p class="sayfa-alt">Tespit edilen besinleri kontrol et, porsiyonları düzelt ve günlüğüne kaydet.</p>

      <div class="grid-analiz">
        <div class="foto-kutu" style="background:${yemek.renk}">
          ${gorsel}
          <div class="foto-etiketler">
            ${yemek.besinler.map((b) => `<span class="foto-etiket">${b.ad}</span>`).join('')}
          </div>
        </div>

        <div class="yigin">
          <div class="kart">
            <span class="guven-rozet">✓ %${yemek.guven} eminim</span>
            <div class="toplam-kalori">
              <strong id="toplamKalori">${sayi(toplam.kalori)}</strong><span>kcal</span>
            </div>
            <div style="color:var(--gri);font-size:15px">${yemek.ad}</div>
          </div>

          <div class="kart">
            <div class="kart-baslik">Tespit Edilen Besinler</div>
            <div id="besinListe">
              ${besinler
                .map(
                  (b, i) => `
                <div class="besin-satir">
                  <div class="besin-bilgi">
                    <div class="ad">${b.ad}</div>
                    <div class="porsiyon">${b.porsiyon}</div>
                  </div>
                  <div class="adet-kontrol">
                    <button class="adet-btn" data-azalt="${i}" ${b.adet <= 0.5 ? 'disabled' : ''} aria-label="${b.ad} porsiyonunu azalt">−</button>
                    <span class="adet-deger">${b.adet}×</span>
                    <button class="adet-btn" data-artir="${i}" aria-label="${b.ad} porsiyonunu artır">+</button>
                  </div>
                  <div class="besin-kalori">${sayi(b.kalori * b.adet)}<small>kcal</small></div>
                </div>`
                )
                .join('')}
            </div>
          </div>

          ${makroKart(toplam)}

          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <button class="btn btn-dolu" id="kaydetBtn" style="flex:1">Günlüğe Kaydet</button>
            <a class="btn btn-cerceve" href="#/home" style="flex:1">Yeniden Çek</a>
          </div>
        </div>
      </div>
    </div>`;

  uygulama.querySelectorAll('[data-artir]').forEach((btn) => {
    btn.onclick = () => {
      const i = Number(btn.dataset.artir);
      durum.adetler[i] = (durum.adetler[i] ?? 1) + 0.5;
      analizSayfasi();
    };
  });

  uygulama.querySelectorAll('[data-azalt]').forEach((btn) => {
    btn.onclick = () => {
      const i = Number(btn.dataset.azalt);
      durum.adetler[i] = Math.max(0.5, (durum.adetler[i] ?? 1) - 0.5);
      analizSayfasi();
    };
  });

  document.getElementById('kaydetBtn').onclick = () => {
    bildir('Öğün günlüğüne kaydedildi ✓');
    setTimeout(() => {
      location.hash = '#/diary';
    }, 800);
  };
}

/* ---------------- Günlük ---------------- */

function gunlukSayfasi() {
  const ayar = ayarlariOku();
  const gun = durum.seciliGun;
  const silinen = durum.silinenler[gun] || [];
  const kayitlar = (MOCK.gunluk[gun] || []).filter((_, i) => !silinen.includes(i));

  const toplam = kayitlar.reduce(
    (acc, k) => {
      const t = besinToplami(yemekBul(k.yemekId).besinler);
      return {
        kalori: acc.kalori + t.kalori,
        protein: acc.protein + t.protein,
        karbonhidrat: acc.karbonhidrat + t.karbonhidrat,
        yag: acc.yag + t.yag
      };
    },
    { kalori: 0, protein: 0, karbonhidrat: 0, yag: 0 }
  );

  const yuzde = Math.min(100, Math.round((toplam.kalori / ayar.gunlukHedef) * 100));
  const kalan = ayar.gunlukHedef - toplam.kalori;

  const ogunSirasi = ['Kahvaltı', 'Öğle', 'Akşam', 'Atıştırmalık'];
  const gruplar = ogunSirasi
    .map((ogunAd) => {
      const satirlar = (MOCK.gunluk[gun] || [])
        .map((k, i) => ({ ...k, i }))
        .filter((k) => k.ogun === ogunAd && !silinen.includes(k.i));
      if (!satirlar.length) return '';
      const ogunKalori = satirlar.reduce((s, k) => s + besinToplami(yemekBul(k.yemekId).besinler).kalori, 0);
      return `
        <div class="ogun-grup">
          <div class="ogun-baslik"><span>${ogunAd}</span><span>${sayi(ogunKalori)} kcal</span></div>
          ${satirlar
            .map((k) => {
              const y = yemekBul(k.yemekId);
              const t = besinToplami(y.besinler);
              return `
              <div class="ogun-kart">
                <div class="ogun-gorsel" style="background:${y.renk}">${y.emoji}</div>
                <div class="ogun-bilgi">
                  <div class="ad">${y.ad}</div>
                  <div class="saat">${k.saat}</div>
                </div>
                <div class="ogun-kalori">${sayi(t.kalori)} kcal</div>
                <button class="sil-btn" data-sil="${k.i}" aria-label="${y.ad} kaydını sil">×</button>
              </div>`;
            })
            .join('')}
        </div>`;
    })
    .join('');

  const haftalik = GUN_ADLARI.map((_, i) => gunToplami(i).kalori);
  const enYuksek = Math.max(...haftalik, ayar.gunlukHedef);

  uygulama.innerHTML = `
    <div class="sayfa">
      <h1 class="sayfa-baslik">Günlük</h1>
      <p class="sayfa-alt">Öğünlerini ve kalori takibini gün gün incele.</p>

      <div class="gun-serit" style="margin-bottom:20px">
        ${GUN_ADLARI.map(
          (ad, i) => `
          <button class="gun-btn ${i === gun ? 'aktif' : ''}" data-gun="${i}">
            <span class="gun-ad">${ad}</span>
            <span class="gun-no">${sayi(gunToplami(i).kalori / 100) / 10}k</span>
          </button>`
        ).join('')}
      </div>

      <div class="grid-2" style="margin-bottom:20px">
        <div class="kart">
          <div style="display:flex;align-items:center;gap:22px">
            <div class="halka" style="--yuzde:${yuzde}">
              <div class="halka-ic">
                <div>
                  <strong>%${yuzde}</strong>
                  <span>hedef</span>
                </div>
              </div>
            </div>
            <div>
              <div style="font-size:13px;color:var(--gri)">Alınan kalori</div>
              <div style="font-size:30px;font-weight:700;line-height:1.2">${sayi(toplam.kalori)}</div>
              <div style="font-size:14px;color:var(--gri)">
                Hedef ${sayi(ayar.gunlukHedef)} kcal ·
                <strong style="color:${kalan >= 0 ? 'var(--yesil-koyu)' : '#dc2626'}">
                  ${kalan >= 0 ? sayi(kalan) + ' kcal kaldı' : sayi(-kalan) + ' kcal aşıldı'}
                </strong>
              </div>
            </div>
          </div>
        </div>
        ${makroKart(toplam)}
      </div>

      <div class="kart" style="margin-bottom:20px">
        <div class="kart-baslik">Öğünler</div>
        ${gruplar || '<div class="bos-durum"><div class="ikon">🍽️</div>Bu gün için kayıt yok.</div>'}
      </div>

      <div class="kart">
        <div class="kart-baslik">Haftalık Kalori</div>
        <div class="grafik">
          ${haftalik
            .map(
              (kcal, i) => `
            <div class="grafik-sutun ${i === gun ? 'aktif' : ''}">
              <div class="grafik-deger">${sayi(kcal)}</div>
              <div class="grafik-bar" style="height:${(kcal / enYuksek) * 100}%"></div>
              <div class="grafik-etiket">${GUN_ADLARI[i]}</div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </div>`;

  uygulama.querySelectorAll('[data-gun]').forEach((btn) => {
    btn.onclick = () => {
      durum.seciliGun = Number(btn.dataset.gun);
      gunlukSayfasi();
    };
  });

  uygulama.querySelectorAll('[data-sil]').forEach((btn) => {
    btn.onclick = () => {
      const i = Number(btn.dataset.sil);
      durum.silinenler[gun] = [...(durum.silinenler[gun] || []), i];
      bildir('Öğün silindi');
      gunlukSayfasi();
    };
  });
}

/* ---------------- Profil ---------------- */

function profilSayfasi() {
  const ayar = ayarlariOku();
  const toplamFark = ayar.baslangicKilo - ayar.hedefKilo;
  const gelinen = ayar.baslangicKilo - ayar.kilo;
  const ilerleme = Math.max(0, Math.min(100, (gelinen / toplamFark) * 100));
  const kalanKilo = Math.max(0, ayar.kilo - ayar.hedefKilo);
  const bas = ayar.ad.trim().charAt(0).toUpperCase();

  uygulama.innerHTML = `
    <div class="sayfa">
      <h1 class="sayfa-baslik">Profil</h1>
      <p class="sayfa-alt">Bilgilerini ve hedeflerini buradan yönet.</p>

      <div class="kart" style="margin-bottom:20px">
        <div class="profil-ust">
          <div class="avatar">${bas}</div>
          <div>
            <h2>${ayar.ad}</h2>
            <p>${ayar.yas} yaş · ${ayar.boy} cm · ${ayar.kilo} kg</p>
          </div>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom:20px">
        <div class="kart">
          <div class="kart-baslik">Hedeflerim</div>
          <form id="hedefForm">
            <div class="alan">
              <label for="gunlukHedef">Günlük kalori hedefi (kcal)</label>
              <input type="number" id="gunlukHedef" value="${ayar.gunlukHedef}" min="1000" max="5000" step="50">
            </div>
            <div class="alan">
              <label for="kilo">Mevcut kilo (kg)</label>
              <input type="number" id="kilo" value="${ayar.kilo}" min="30" max="250" step="0.5">
            </div>
            <div class="alan">
              <label for="hedefKilo">Hedef kilo (kg)</label>
              <input type="number" id="hedefKilo" value="${ayar.hedefKilo}" min="30" max="250" step="0.5">
            </div>
            <div class="alan">
              <label for="aktivite">Aktivite seviyesi</label>
              <select id="aktivite">
                <option value="dusuk" ${ayar.aktivite === 'dusuk' ? 'selected' : ''}>Düşük — masa başı</option>
                <option value="orta" ${ayar.aktivite === 'orta' ? 'selected' : ''}>Orta — haftada 3 gün spor</option>
                <option value="yuksek" ${ayar.aktivite === 'yuksek' ? 'selected' : ''}>Yüksek — her gün aktif</option>
              </select>
            </div>
            <button type="submit" class="btn btn-dolu btn-blok" style="margin-top:6px">Kaydet</button>
          </form>
        </div>

        <div class="yigin">
          <div class="kart">
            <div class="kart-baslik">Kilo İlerlemesi</div>
            <div class="kilo-ust">
              <span>${ayar.baslangicKilo} kg</span>
              <span>${ayar.hedefKilo} kg</span>
            </div>
            <div class="kilo-ray"><div class="kilo-dolu" style="width:${ilerleme}%"></div></div>
            <div class="kilo-not">
              ${kalanKilo > 0 ? `Hedefine <strong>${kalanKilo.toFixed(1)} kg</strong> kaldı` : '<strong>Hedefine ulaştın! 🎉</strong>'}
            </div>
          </div>

          <div class="kart">
            <div class="kart-baslik">Makro Hedefleri</div>
            ${makroBar('Protein', (ayar.gunlukHedef * ayar.makroHedef.protein) / 100 / 4, ayar.makroHedef.protein, 'var(--protein)')}
            ${makroBar('Karbonhidrat', (ayar.gunlukHedef * ayar.makroHedef.karbonhidrat) / 100 / 4, ayar.makroHedef.karbonhidrat, 'var(--karbonhidrat)')}
            ${makroBar('Yağ', (ayar.gunlukHedef * ayar.makroHedef.yag) / 100 / 9, ayar.makroHedef.yag, 'var(--yag)')}
          </div>
        </div>
      </div>

      <div class="grid-3">
        <div class="istatistik-kart">
          <div class="deger">${sayi(MOCK.istatistik.toplamOgun)}</div>
          <div class="etiket">Kaydedilen öğün</div>
        </div>
        <div class="istatistik-kart">
          <div class="deger">${sayi(MOCK.istatistik.ortalamaKalori)}</div>
          <div class="etiket">Ortalama günlük kcal</div>
        </div>
        <div class="istatistik-kart">
          <div class="deger">${MOCK.istatistik.seri} gün</div>
          <div class="etiket">En uzun seri 🔥</div>
        </div>
      </div>
    </div>`;

  document.getElementById('hedefForm').onsubmit = (e) => {
    e.preventDefault();
    const yeni = {
      ...ayar,
      gunlukHedef: Number(document.getElementById('gunlukHedef').value),
      kilo: Number(document.getElementById('kilo').value),
      hedefKilo: Number(document.getElementById('hedefKilo').value),
      aktivite: document.getElementById('aktivite').value
    };
    ayarlariYaz(yeni);
    bildir('Hedeflerin kaydedildi ✓');
    profilSayfasi();
  };
}

/* ---------------- Router ---------------- */

function yonlendir() {
  if (yukleniyorSayfasi.temizle) {
    yukleniyorSayfasi.temizle();
    yukleniyorSayfasi.temizle = null;
  }

  const rota = ROTALAR[location.hash] ? location.hash : '#/home';
  if (!ROTALAR[location.hash]) {
    location.replace('#/home');
    return;
  }

  menu.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('aktif', a.getAttribute('href') === rota);
  });

  ROTALAR[rota]();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', yonlendir);
window.addEventListener('DOMContentLoaded', () => {
  if (!location.hash) location.replace('#/home');
  yonlendir();
});
