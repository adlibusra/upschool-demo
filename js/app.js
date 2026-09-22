const uygulama = document.getElementById('uygulama');
const menu = document.getElementById('menu');

const ROTALAR = {
  '#/home': anaSayfa,
  '#/plan': planSayfasi,
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

const durum = {
  fotoUrl: null,
  yemek: null,
  adetler: {},
  seciliTarih: null,
  planGun: 0,
  hazirSecim: null
};

/* ---------------- Tarih yardımcıları ---------------- */

function gunKaydir(offset) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d;
}

function anahtarla(tarih) {
  const ay = String(tarih.getMonth() + 1).padStart(2, '0');
  const gun = String(tarih.getDate()).padStart(2, '0');
  return `${tarih.getFullYear()}-${ay}-${gun}`;
}

function planGunIndeksi(tarih) {
  return (tarih.getDay() + 6) % 7;
}

function sonYediGun() {
  return [-6, -5, -4, -3, -2, -1, 0].map(gunKaydir);
}

function tarihEtiketi(anahtar) {
  if (anahtar === anahtarla(gunKaydir(0))) return 'Bugün';
  if (anahtar === anahtarla(gunKaydir(-1))) return 'Dün';
  const [y, a, g] = anahtar.split('-').map(Number);
  const tarih = new Date(y, a - 1, g);
  return `${g} ${['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][a - 1]} ${GUN_ADLARI[planGunIndeksi(tarih)]}`;
}

function saatSimdi() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/* ---------------- Depolama ---------------- */

function oku(anahtar, varsayilan) {
  try {
    const kayit = localStorage.getItem(anahtar);
    return kayit ? JSON.parse(kayit) : varsayilan;
  } catch {
    return varsayilan;
  }
}

function yaz(anahtar, deger) {
  try {
    localStorage.setItem(anahtar, JSON.stringify(deger));
  } catch {
    /* depolama kapalıysa sessizce geç */
  }
}

function ayarlariOku() {
  return { ...MOCK.kullanici, ...oku('kalorilens-profil', {}) };
}

function gunlukOku() {
  return oku('kalorilens-gunluk', null);
}

function tohumla() {
  if (gunlukOku()) return;
  const veri = {};
  sonYediGun()
    .slice(0, 6)
    .forEach((tarih, sira) => {
      const plan = MOCK.plan[planGunIndeksi(tarih)];
      const ogunler = sira % 3 === 0 ? plan.ogunler.slice(0, 4) : plan.ogunler;
      veri[anahtarla(tarih)] = ogunler.map((o, i) => ({ ...o, id: `tohum-${sira}-${i}` }));
    });
  yaz('kalorilens-gunluk', veri);
  yaz('kalorilens-su', { [anahtarla(gunKaydir(-1))]: 7, [anahtarla(gunKaydir(-2))]: 8 });
}

function gununKayitlari(anahtar) {
  return (gunlukOku() || {})[anahtar] || [];
}

function kayitEkle(anahtar, kayit) {
  const veri = gunlukOku() || {};
  veri[anahtar] = [...(veri[anahtar] || []), { ...kayit, id: `k-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }];
  yaz('kalorilens-gunluk', veri);
}

function kayitSil(anahtar, id) {
  const veri = gunlukOku() || {};
  veri[anahtar] = (veri[anahtar] || []).filter((k) => k.id !== id);
  yaz('kalorilens-gunluk', veri);
}

function suOku(anahtar) {
  return oku('kalorilens-su', {})[anahtar] || 0;
}

function suYaz(anahtar, adet) {
  const veri = oku('kalorilens-su', {});
  veri[anahtar] = adet;
  yaz('kalorilens-su', veri);
}

/* ---------------- Ortak parçalar ---------------- */

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
      <div class="makro-ray"><div class="makro-dolu" style="width:${Math.min(100, yuzde)}%;background:${renk}"></div></div>
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

function halka(yuzde, ustYazi, altYazi) {
  return `
    <div class="halka" style="--yuzde:${Math.min(100, yuzde)}">
      <div class="halka-ic"><div><strong>${ustYazi}</strong><span>${altYazi}</span></div></div>
    </div>`;
}

/* ---------------- Ana sayfa ---------------- */

function anaSayfa() {
  const ayar = ayarlariOku();
  const bugunKey = anahtarla(gunKaydir(0));
  const toplam = besinToplami(gununKayitlari(bugunKey));
  const yuzde = Math.round((toplam.kalori / ayar.gunlukHedef) * 100);
  const kalan = ayar.gunlukHedef - toplam.kalori;

  const plan = MOCK.plan[planGunIndeksi(gunKaydir(0))];
  const yenenAdlar = gununKayitlari(bugunKey).map((k) => k.ad);
  const siradaki = plan.ogunler.find((o) => !yenenAdlar.includes(o.ad));

  uygulama.innerHTML = `
    <div class="sayfa">
      <section class="hero">
        <span class="rozet-ust">✨ Yapay zeka destekli</span>
        <h1>Yemeğini çek,<br><em>kalorini öğren</em></h1>
        <p>Tabağının fotoğrafını yükle, saniyeler içinde besinleri, kalorileri ve makro değerlerini gör.</p>
      </section>

      <div class="kart" style="margin-bottom:22px">
        <div class="ozet-serit">
          <div style="display:flex;align-items:center;gap:20px">
            ${halka(yuzde, '%' + yuzde, 'hedef')}
            <div>
              <div style="font-size:13px;color:var(--gri)">Bugün alınan</div>
              <div style="font-size:30px;font-weight:700;line-height:1.2">${sayi(toplam.kalori)} <span style="font-size:15px;font-weight:500;color:var(--gri-acik)">/ ${sayi(ayar.gunlukHedef)} kcal</span></div>
              <div style="font-size:14px;color:var(--gri)">
                <strong style="color:${kalan >= 0 ? 'var(--yesil-koyu)' : '#dc2626'}">
                  ${kalan >= 0 ? sayi(kalan) + ' kcal kaldı' : sayi(-kalan) + ' kcal aşıldı'}
                </strong>
              </div>
            </div>
          </div>
          <a class="btn btn-cerceve" href="#/diary">Günlüğü Aç</a>
        </div>
      </div>

      ${
        siradaki
          ? `
      <div class="kart siradaki-kart" style="margin-bottom:22px">
        <div>
          <div class="etiket-kucuk">Planında sırada</div>
          <div style="display:flex;align-items:center;gap:12px;margin-top:8px">
            <div class="ogun-gorsel" style="background:var(--yesil-soluk)">${siradaki.emoji}</div>
            <div>
              <div style="font-weight:650">${siradaki.ad}</div>
              <div style="font-size:13px;color:var(--gri)">${siradaki.ogun} · ${siradaki.saat} · ${sayi(siradaki.kalori)} kcal</div>
            </div>
          </div>
        </div>
        <button class="btn btn-dolu" id="siradakiEkle">Yedim</button>
      </div>`
          : `
      <div class="kart" style="margin-bottom:22px;text-align:center">
        <div style="font-size:30px">🎉</div>
        <div style="font-weight:650;margin-top:6px">Bugünün planını tamamladın</div>
        <div style="color:var(--gri);font-size:14px">Tüm öğünleri günlüğüne kaydettin.</div>
      </div>`
      }

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

      <h3 style="margin:36px 0 16px;font-size:18px">Nasıl çalışır?</h3>
      <div class="grid-3">
        <div class="adim-kart">
          <div class="adim-no">1</div>
          <h4>Planı Aç</h4>
          <p>Günün diyet listesini gör, yediğin öğünü tek dokunuşla işaretle.</p>
        </div>
        <div class="adim-kart">
          <div class="adim-no">2</div>
          <h4>Fotoğraf Çek</h4>
          <p>Plan dışı bir şey yediysen fotoğrafını çek, analiz etsin.</p>
        </div>
        <div class="adim-kart">
          <div class="adim-no">3</div>
          <h4>Takip Et</h4>
          <p>Günlükte kalorini, makrolarını ve su tüketimini izle.</p>
        </div>
      </div>
    </div>`;

  const ekleBtn = document.getElementById('siradakiEkle');
  if (ekleBtn) {
    ekleBtn.onclick = () => {
      kayitEkle(bugunKey, { ...siradaki, saat: saatSimdi() });
      bildir(`${siradaki.ad} günlüğüne eklendi ✓`);
      anaSayfa();
    };
  }

  kurYukleme();
}

function kurYukleme() {
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

/* ---------------- Diyet planı ---------------- */

function planSayfasi() {
  const ayar = ayarlariOku();
  const bugunKey = anahtarla(gunKaydir(0));
  const gun = MOCK.plan[durum.planGun];
  const toplam = besinToplami(gun.ogunler);
  const yenenAdlar = gununKayitlari(bugunKey).map((k) => k.ad);
  const bugunMu = durum.planGun === planGunIndeksi(gunKaydir(0));
  const ipucu = MOCK.ipuclari[durum.planGun % MOCK.ipuclari.length];

  uygulama.innerHTML = `
    <div class="sayfa">
      <h1 class="sayfa-baslik">Diyet Planı</h1>
      <p class="sayfa-alt">Günde 5 öğün, ortalama ${sayi(1580)} kcal. Yediğin öğünü işaretle, günlüğüne düşsün.</p>

      <div class="gun-serit" style="margin-bottom:20px">
        ${MOCK.plan
          .map((p, i) => {
            const t = besinToplami(p.ogunler);
            return `
          <button class="gun-btn ${i === durum.planGun ? 'aktif' : ''}" data-plangun="${i}">
            <span class="gun-ad">${GUN_ADLARI[i]}</span>
            <span class="gun-no">${sayi(t.kalori)}</span>
          </button>`;
          })
          .join('')}
      </div>

      <div class="grid-2" style="margin-bottom:20px">
        <div class="kart">
          <div style="display:flex;align-items:center;gap:20px">
            ${halka(Math.round((toplam.kalori / ayar.gunlukHedef) * 100), sayi(toplam.kalori), 'kcal')}
            <div>
              <div style="font-size:19px;font-weight:700">${gun.gun}${bugunMu ? ' · Bugün' : ''}</div>
              <div style="color:var(--gri);font-size:14px;margin-bottom:8px">${gun.not}</div>
              <div style="font-size:13px;color:var(--gri)">Hedefin ${sayi(ayar.gunlukHedef)} kcal</div>
            </div>
          </div>
        </div>
        ${makroKart(toplam)}
      </div>

      <div class="kart" style="margin-bottom:20px">
        <div class="kart-baslik" style="display:flex;justify-content:space-between;align-items:center">
          <span>Günün Öğünleri</span>
          <button class="btn btn-cerceve" id="tumunuEkle" style="padding:7px 14px;font-size:13px">Tümünü Günlüğe Ekle</button>
        </div>
        ${gun.ogunler
          .map((o, i) => {
            const eklendi = yenenAdlar.includes(o.ad);
            return `
          <div class="plan-satir">
            <div class="ogun-gorsel" style="background:var(--yesil-soluk)">${o.emoji}</div>
            <div class="plan-bilgi">
              <div class="plan-ust">
                <span class="plan-etiket">${o.ogun} · ${o.saat}</span>
              </div>
              <div class="ad">${o.ad}</div>
              <div class="porsiyon">${o.porsiyon}</div>
              <div class="plan-makro">
                <span>P ${o.protein}g</span><span>K ${o.karbonhidrat}g</span><span>Y ${o.yag}g</span>
              </div>
            </div>
            <div class="plan-sag">
              <div class="besin-kalori">${sayi(o.kalori)}<small>kcal</small></div>
              <button class="btn ${eklendi ? 'btn-cerceve' : 'btn-dolu'}" data-planekle="${i}" ${eklendi ? 'disabled' : ''} style="padding:8px 16px;font-size:13px">
                ${eklendi ? 'Eklendi ✓' : 'Yedim'}
              </button>
            </div>
          </div>`;
          })
          .join('')}
      </div>

      <div class="kart ipucu-kart">
        <span class="ipucu-ikon">💡</span>
        <div><strong>Günün ipucu</strong><div style="color:var(--gri);font-size:14px">${ipucu}</div></div>
      </div>
    </div>`;

  uygulama.querySelectorAll('[data-plangun]').forEach((btn) => {
    btn.onclick = () => {
      durum.planGun = Number(btn.dataset.plangun);
      planSayfasi();
    };
  });

  uygulama.querySelectorAll('[data-planekle]').forEach((btn) => {
    btn.onclick = () => {
      const ogun = gun.ogunler[Number(btn.dataset.planekle)];
      kayitEkle(bugunKey, { ...ogun, saat: saatSimdi() });
      bildir(`${ogun.ad} günlüğüne eklendi ✓`);
      planSayfasi();
    };
  });

  document.getElementById('tumunuEkle').onclick = () => {
    const eklenecek = gun.ogunler.filter((o) => !yenenAdlar.includes(o.ad));
    if (!eklenecek.length) {
      bildir('Bu günün tüm öğünleri zaten eklendi.');
      return;
    }
    eklenecek.forEach((o) => kayitEkle(bugunKey, o));
    bildir(`${eklenecek.length} öğün günlüğüne eklendi ✓`);
    planSayfasi();
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
  const toplam = besinToplami(besinler);

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

          <div class="kart">
            <div class="alan" style="margin-bottom:0">
              <label for="analizOgun">Hangi öğün?</label>
              <select id="analizOgun">
                ${OGUN_SIRASI.map((o) => `<option value="${o}">${o}</option>`).join('')}
              </select>
            </div>
          </div>

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
    kayitEkle(anahtarla(gunKaydir(0)), {
      ad: yemek.ad,
      porsiyon: besinler.map((b) => `${b.adet}× ${b.ad}`).join(', '),
      ogun: document.getElementById('analizOgun').value,
      saat: saatSimdi(),
      emoji: yemek.emoji,
      kalori: toplam.kalori,
      protein: toplam.protein,
      karbonhidrat: toplam.karbonhidrat,
      yag: toplam.yag
    });
    bildir('Öğün günlüğüne kaydedildi ✓');
    durum.seciliTarih = anahtarla(gunKaydir(0));
    setTimeout(() => {
      location.hash = '#/diary';
    }, 700);
  };
}

/* ---------------- Günlük ---------------- */

function gunlukSayfasi() {
  const ayar = ayarlariOku();
  const gunler = sonYediGun();
  const secili = durum.seciliTarih || anahtarla(gunKaydir(0));
  durum.seciliTarih = secili;

  const kayitlar = gununKayitlari(secili);
  const toplam = besinToplami(kayitlar);
  const yuzde = Math.round((toplam.kalori / ayar.gunlukHedef) * 100);
  const kalan = ayar.gunlukHedef - toplam.kalori;
  const su = suOku(secili);

  const gruplar = OGUN_SIRASI.map((ogunAd) => {
    const satirlar = kayitlar.filter((k) => k.ogun === ogunAd).sort((a, b) => a.saat.localeCompare(b.saat));
    if (!satirlar.length) return '';
    const ogunKalori = satirlar.reduce((s, k) => s + k.kalori, 0);
    return `
      <div class="ogun-grup">
        <div class="ogun-baslik"><span>${ogunAd}</span><span>${sayi(ogunKalori)} kcal</span></div>
        ${satirlar
          .map(
            (k) => `
          <div class="ogun-kart">
            <div class="ogun-gorsel" style="background:var(--yesil-soluk)">${k.emoji || '🍽️'}</div>
            <div class="ogun-bilgi">
              <div class="ad">${k.ad}</div>
              <div class="saat">${k.saat}${k.porsiyon ? ' · ' + k.porsiyon : ''}</div>
            </div>
            <div class="ogun-kalori">${sayi(k.kalori)} kcal</div>
            <button class="sil-btn" data-sil="${k.id}" aria-label="${k.ad} kaydını sil">×</button>
          </div>`
          )
          .join('')}
      </div>`;
  }).join('');

  const haftalik = gunler.map((t) => besinToplami(gununKayitlari(anahtarla(t))).kalori);
  const enYuksek = Math.max(...haftalik, ayar.gunlukHedef);

  uygulama.innerHTML = `
    <div class="sayfa">
      <h1 class="sayfa-baslik">Günlük</h1>
      <p class="sayfa-alt">${tarihEtiketi(secili)} · ${kayitlar.length} öğün kayıtlı</p>

      <div class="gun-serit" style="margin-bottom:20px">
        ${gunler
          .map((t) => {
            const k = anahtarla(t);
            return `
          <button class="gun-btn ${k === secili ? 'aktif' : ''}" data-tarih="${k}">
            <span class="gun-ad">${GUN_ADLARI[planGunIndeksi(t)]}</span>
            <span class="gun-no">${t.getDate()}</span>
          </button>`;
          })
          .join('')}
      </div>

      <div class="grid-2" style="margin-bottom:20px">
        <div class="kart">
          <div style="display:flex;align-items:center;gap:22px">
            ${halka(yuzde, '%' + yuzde, 'hedef')}
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
        <div class="kart-baslik" style="display:flex;justify-content:space-between;align-items:center">
          <span>Su Takibi</span>
          <span style="font-size:14px;color:var(--gri);font-weight:500">${su} / ${ayar.suHedef} bardak</span>
        </div>
        <div class="su-serit">
          ${Array.from({ length: ayar.suHedef }, (_, i) => `<button class="su-bardak ${i < su ? 'dolu' : ''}" data-su="${i + 1}" aria-label="${i + 1}. bardak">💧</button>`).join('')}
        </div>
      </div>

      <div class="kart" style="margin-bottom:20px">
        <div class="kart-baslik">Öğün Ekle</div>
        <div class="chip-liste">
          ${MOCK.kutuphane.map((b, i) => `<button class="chip" data-hazir="${i}">${b.emoji} ${b.ad}</button>`).join('')}
        </div>
        <form class="ekle-form" id="ekleForm">
          <input id="ekleAd" placeholder="Besin adı" required aria-label="Besin adı">
          <input id="ekleKalori" type="number" placeholder="kcal" required min="1" max="5000" aria-label="Kalori">
          <select id="ekleOgun" aria-label="Öğün">
            ${OGUN_SIRASI.map((o) => `<option value="${o}">${o}</option>`).join('')}
          </select>
          <button type="submit" class="btn btn-dolu">Ekle</button>
        </form>
      </div>

      <div class="kart" style="margin-bottom:20px">
        <div class="kart-baslik">Öğünler</div>
        ${
          gruplar ||
          `<div class="bos-durum">
             <div class="ikon">🍽️</div>
             Bu gün için kayıt yok.
             <div style="margin-top:14px"><a class="btn btn-dolu" href="#/plan">Diyet Planını Aç</a></div>
           </div>`
        }
      </div>

      <div class="kart">
        <div class="kart-baslik">Haftalık Kalori</div>
        <div class="grafik">
          ${haftalik
            .map(
              (kcal, i) => `
            <div class="grafik-sutun ${anahtarla(gunler[i]) === secili ? 'aktif' : ''}">
              <div class="grafik-deger">${sayi(kcal)}</div>
              <div class="grafik-bar" style="height:${Math.max(2, (kcal / enYuksek) * 100)}%"></div>
              <div class="grafik-etiket">${GUN_ADLARI[planGunIndeksi(gunler[i])]}</div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </div>`;

  uygulama.querySelectorAll('[data-tarih]').forEach((btn) => {
    btn.onclick = () => {
      durum.seciliTarih = btn.dataset.tarih;
      gunlukSayfasi();
    };
  });

  uygulama.querySelectorAll('[data-sil]').forEach((btn) => {
    btn.onclick = () => {
      kayitSil(secili, btn.dataset.sil);
      bildir('Öğün silindi');
      gunlukSayfasi();
    };
  });

  uygulama.querySelectorAll('[data-su]').forEach((btn) => {
    btn.onclick = () => {
      const tiklanan = Number(btn.dataset.su);
      suYaz(secili, tiklanan === su ? tiklanan - 1 : tiklanan);
      gunlukSayfasi();
    };
  });

  uygulama.querySelectorAll('[data-hazir]').forEach((btn) => {
    btn.onclick = () => {
      const b = MOCK.kutuphane[Number(btn.dataset.hazir)];
      durum.hazirSecim = b;
      document.getElementById('ekleAd').value = b.ad;
      document.getElementById('ekleKalori').value = b.kalori;
    };
  });

  document.getElementById('ekleForm').onsubmit = (e) => {
    e.preventDefault();
    const ad = document.getElementById('ekleAd').value.trim();
    const kalori = Number(document.getElementById('ekleKalori').value);
    if (!ad || !kalori) return;

    const hazir = durum.hazirSecim && durum.hazirSecim.ad === ad ? durum.hazirSecim : null;
    const oran = hazir ? kalori / hazir.kalori : 0;

    kayitEkle(secili, {
      ad,
      porsiyon: hazir ? hazir.porsiyon : '',
      ogun: document.getElementById('ekleOgun').value,
      saat: saatSimdi(),
      emoji: hazir ? hazir.emoji : '🍽️',
      kalori,
      protein: hazir ? Math.round(hazir.protein * oran) : 0,
      karbonhidrat: hazir ? Math.round(hazir.karbonhidrat * oran) : 0,
      yag: hazir ? Math.round(hazir.yag * oran) : 0
    });

    durum.hazirSecim = null;
    bildir(`${ad} eklendi ✓`);
    gunlukSayfasi();
  };
}

/* ---------------- Profil ---------------- */

function profilSayfasi() {
  const ayar = ayarlariOku();
  const toplamFark = ayar.baslangicKilo - ayar.hedefKilo;
  const gelinen = ayar.baslangicKilo - ayar.kilo;
  const ilerleme = Math.max(0, Math.min(100, (gelinen / toplamFark) * 100));
  const kalanKilo = Math.max(0, ayar.kilo - ayar.hedefKilo);
  const bas = ayar.ad.trim().charAt(0).toUpperCase();

  const gunler = sonYediGun();
  const gunlukler = gunler.map((t) => besinToplami(gununKayitlari(anahtarla(t))).kalori);
  const doluGunler = gunlukler.filter((k) => k > 0);
  const ortalama = doluGunler.length ? doluGunler.reduce((a, b) => a + b, 0) / doluGunler.length : 0;
  const toplamOgun = gunler.reduce((s, t) => s + gununKayitlari(anahtarla(t)).length, 0);

  let seri = 0;
  for (let i = gunlukler.length - 1; i >= 0; i--) {
    if (gunlukler[i] > 0) seri++;
    else break;
  }

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
              <label for="suHedef">Günlük su hedefi (bardak)</label>
              <input type="number" id="suHedef" value="${ayar.suHedef}" min="4" max="16" step="1">
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

      <div class="grid-3" style="margin-bottom:20px">
        <div class="istatistik-kart">
          <div class="deger">${sayi(toplamOgun)}</div>
          <div class="etiket">Son 7 günde öğün</div>
        </div>
        <div class="istatistik-kart">
          <div class="deger">${sayi(ortalama)}</div>
          <div class="etiket">Ortalama günlük kcal</div>
        </div>
        <div class="istatistik-kart">
          <div class="deger">${seri} gün</div>
          <div class="etiket">Kesintisiz takip 🔥</div>
        </div>
      </div>

      <div class="kart">
        <div class="kart-baslik">Veriler</div>
        <p style="color:var(--gri);font-size:14px;margin-bottom:14px">
          Tüm kayıtların yalnızca bu tarayıcıda saklanır. Sıfırlarsan örnek veriler yeniden yüklenir.
        </p>
        <button class="btn btn-cerceve" id="sifirlaBtn">Günlüğü Sıfırla</button>
      </div>
    </div>`;

  document.getElementById('hedefForm').onsubmit = (e) => {
    e.preventDefault();
    ayarlariYaz({
      ...ayar,
      gunlukHedef: Number(document.getElementById('gunlukHedef').value),
      suHedef: Number(document.getElementById('suHedef').value),
      kilo: Number(document.getElementById('kilo').value),
      hedefKilo: Number(document.getElementById('hedefKilo').value),
      aktivite: document.getElementById('aktivite').value
    });
    bildir('Hedeflerin kaydedildi ✓');
    profilSayfasi();
  };

  document.getElementById('sifirlaBtn').onclick = () => {
    localStorage.removeItem('kalorilens-gunluk');
    localStorage.removeItem('kalorilens-su');
    tohumla();
    bildir('Günlük sıfırlandı');
    profilSayfasi();
  };
}

function ayarlariYaz(ayar) {
  yaz('kalorilens-profil', ayar);
}

/* ---------------- Router ---------------- */

function yonlendir() {
  if (yukleniyorSayfasi.temizle) {
    yukleniyorSayfasi.temizle();
    yukleniyorSayfasi.temizle = null;
  }

  if (!ROTALAR[location.hash]) {
    location.replace('#/home');
    return;
  }

  const rota = location.hash;
  menu.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('aktif', a.getAttribute('href') === rota);
  });

  ROTALAR[rota]();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', yonlendir);
window.addEventListener('DOMContentLoaded', () => {
  tohumla();
  durum.planGun = planGunIndeksi(gunKaydir(0));
  durum.seciliTarih = anahtarla(gunKaydir(0));
  if (!location.hash) location.replace('#/home');
  yonlendir();
});
