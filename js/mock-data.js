const MOCK = {
  kullanici: {
    ad: 'Büşra Çalışkan',
    yas: 27,
    boy: 168,
    kilo: 64,
    hedefKilo: 58,
    baslangicKilo: 70,
    gunlukHedef: 1600,
    suHedef: 8,
    aktivite: 'orta',
    makroHedef: { protein: 30, karbonhidrat: 45, yag: 25 }
  },

  yemekler: [
    {
      id: 'tavuk-pilav',
      ad: 'Izgara Tavuk, Pilav ve Salata',
      emoji: '🍗',
      renk: '#fef3c7',
      guven: 94,
      besinler: [
        { ad: 'Izgara tavuk göğsü', porsiyon: '1 parça, ~150g', kalori: 248, protein: 46, karbonhidrat: 0, yag: 5 },
        { ad: 'Pirinç pilavı', porsiyon: '1 kepçe, ~120g', kalori: 156, protein: 3, karbonhidrat: 33, yag: 2 },
        { ad: 'Çoban salata', porsiyon: '1 tabak, ~100g', kalori: 45, protein: 1, karbonhidrat: 6, yag: 2 },
        { ad: 'Zeytinyağı', porsiyon: '1 yemek kaşığı', kalori: 119, protein: 0, karbonhidrat: 0, yag: 14 }
      ]
    },
    {
      id: 'menemen',
      ad: 'Menemen ve Ekmek',
      emoji: '🍳',
      renk: '#fee2e2',
      guven: 91,
      besinler: [
        { ad: 'Menemen', porsiyon: '1 porsiyon, ~200g', kalori: 210, protein: 12, karbonhidrat: 9, yag: 15 },
        { ad: 'Tam buğday ekmeği', porsiyon: '2 dilim, ~60g', kalori: 138, protein: 6, karbonhidrat: 24, yag: 2 },
        { ad: 'Beyaz peynir', porsiyon: '1 dilim, ~30g', kalori: 78, protein: 5, karbonhidrat: 1, yag: 6 },
        { ad: 'Siyah zeytin', porsiyon: '5 adet, ~20g', kalori: 35, protein: 0, karbonhidrat: 1, yag: 3 }
      ]
    },
    {
      id: 'mercimek',
      ad: 'Mercimek Çorbası',
      emoji: '🍲',
      renk: '#ffedd5',
      guven: 96,
      besinler: [
        { ad: 'Kırmızı mercimek çorbası', porsiyon: '1 kase, ~300ml', kalori: 190, protein: 11, karbonhidrat: 28, yag: 4 },
        { ad: 'Kıtır ekmek', porsiyon: '2 parça, ~30g', kalori: 82, protein: 3, karbonhidrat: 15, yag: 1 },
        { ad: 'Limon', porsiyon: '1 dilim', kalori: 3, protein: 0, karbonhidrat: 1, yag: 0 }
      ]
    },
    {
      id: 'burger',
      ad: 'Cheeseburger ve Patates',
      emoji: '🍔',
      renk: '#fde68a',
      guven: 89,
      besinler: [
        { ad: 'Cheeseburger', porsiyon: '1 adet, ~220g', kalori: 540, protein: 28, karbonhidrat: 42, yag: 28 },
        { ad: 'Patates kızartması', porsiyon: '1 orta boy, ~115g', kalori: 365, protein: 4, karbonhidrat: 48, yag: 17 },
        { ad: 'Ketçap', porsiyon: '2 yemek kaşığı', kalori: 36, protein: 0, karbonhidrat: 9, yag: 0 },
        { ad: 'Kola', porsiyon: '1 bardak, ~250ml', kalori: 105, protein: 0, karbonhidrat: 27, yag: 0 }
      ]
    },
    {
      id: 'yulaf',
      ad: 'Yulaf Ezmesi ve Meyve',
      emoji: '🥣',
      renk: '#dbeafe',
      guven: 93,
      besinler: [
        { ad: 'Yulaf ezmesi', porsiyon: '1 kase, ~60g', kalori: 228, protein: 8, karbonhidrat: 39, yag: 4 },
        { ad: 'Süt (yarım yağlı)', porsiyon: '1 bardak, ~200ml', kalori: 96, protein: 7, karbonhidrat: 10, yag: 3 },
        { ad: 'Muz', porsiyon: '1 orta boy, ~120g', kalori: 107, protein: 1, karbonhidrat: 27, yag: 0 },
        { ad: 'Yaban mersini', porsiyon: '1 avuç, ~50g', kalori: 29, protein: 0, karbonhidrat: 7, yag: 0 },
        { ad: 'Bal', porsiyon: '1 tatlı kaşığı', kalori: 43, protein: 0, karbonhidrat: 12, yag: 0 }
      ]
    },
    {
      id: 'somon',
      ad: 'Fırın Somon ve Sebze',
      emoji: '🐟',
      renk: '#fce7f3',
      guven: 92,
      besinler: [
        { ad: 'Fırınlanmış somon', porsiyon: '1 fileto, ~170g', kalori: 354, protein: 39, karbonhidrat: 0, yag: 21 },
        { ad: 'Buharda brokoli', porsiyon: '1 porsiyon, ~150g', kalori: 51, protein: 4, karbonhidrat: 10, yag: 1 },
        { ad: 'Kinoa', porsiyon: '1 kepçe, ~100g', kalori: 120, protein: 4, karbonhidrat: 21, yag: 2 }
      ]
    }
  ],

  plan: [
    {
      gun: 'Pazartesi',
      not: 'Haftaya protein ağırlıklı ve hafif başla.',
      ogunler: [
        { ogun: 'Kahvaltı', saat: '08:00', emoji: '🍳', ad: 'Haşlanmış yumurta tabağı', porsiyon: '2 yumurta, 1 dilim tam buğday ekmeği, 30 g beyaz peynir, domates-salatalık, 5 zeytin', kalori: 360, protein: 22, karbonhidrat: 24, yag: 19 },
        { ogun: 'Ara Öğün', saat: '10:30', emoji: '🍎', ad: 'Elma ve badem', porsiyon: '1 orta boy elma, 10 adet badem', kalori: 165, protein: 3, karbonhidrat: 22, yag: 7 },
        { ogun: 'Öğle', saat: '13:00', emoji: '🍗', ad: 'Izgara tavuk ve bulgur pilavı', porsiyon: '120 g tavuk göğsü, 4 yemek kaşığı bulgur pilavı, 1 kase yoğurt, mevsim salata', kalori: 520, protein: 48, karbonhidrat: 45, yag: 14 },
        { ogun: 'Ara Öğün', saat: '16:00', emoji: '🥛', ad: 'Tarçınlı yoğurt', porsiyon: '200 g yoğurt, 1 çay kaşığı tarçın', kalori: 125, protein: 11, karbonhidrat: 12, yag: 4 },
        { ogun: 'Akşam', saat: '19:30', emoji: '🍲', ad: 'Mercimek çorbası ve fırın sebze', porsiyon: '1 kase mercimek çorbası, 1 porsiyon fırında sebze, 1 dilim ekmek', kalori: 430, protein: 17, karbonhidrat: 62, yag: 12 }
      ]
    },
    {
      gun: 'Salı',
      not: 'Omega-3 günü — balığı atlamamaya çalış.',
      ogunler: [
        { ogun: 'Kahvaltı', saat: '08:00', emoji: '🥣', ad: 'Yulaf ezmesi ve muz', porsiyon: '5 yemek kaşığı yulaf, 1 su bardağı süt, 1 muz, 1 tatlı kaşığı bal', kalori: 390, protein: 15, karbonhidrat: 66, yag: 7 },
        { ogun: 'Ara Öğün', saat: '10:30', emoji: '🥜', ad: 'Ceviz ve kuru kayısı', porsiyon: '3 adet ceviz içi, 3 adet kuru kayısı', kalori: 155, protein: 3, karbonhidrat: 15, yag: 10 },
        { ogun: 'Öğle', saat: '13:00', emoji: '🐟', ad: 'Fırında somon ve kinoa', porsiyon: '150 g somon, 4 yemek kaşığı kinoa, buharda brokoli', kalori: 540, protein: 42, karbonhidrat: 30, yag: 27 },
        { ogun: 'Ara Öğün', saat: '16:00', emoji: '🍵', ad: 'Yeşil çay ve grissini', porsiyon: '1 bardak yeşil çay, 3 adet kepekli grissini', kalori: 90, protein: 3, karbonhidrat: 16, yag: 2 },
        { ogun: 'Akşam', saat: '19:30', emoji: '🥗', ad: 'Zeytinyağlı taze fasulye', porsiyon: '1 porsiyon taze fasulye, 1 kase yoğurt, 1 dilim ekmek', kalori: 400, protein: 14, karbonhidrat: 48, yag: 16 }
      ]
    },
    {
      gun: 'Çarşamba',
      not: 'Baklagil günü — tok tutar, lif yüksek.',
      ogunler: [
        { ogun: 'Kahvaltı', saat: '08:00', emoji: '🍳', ad: 'Menemen', porsiyon: '2 yumurtalı menemen, 1 dilim tam buğday ekmeği', kalori: 340, protein: 17, karbonhidrat: 26, yag: 19 },
        { ogun: 'Ara Öğün', saat: '10:30', emoji: '🍊', ad: 'Portakal ve fındık', porsiyon: '1 orta boy portakal, 10 adet fındık', kalori: 160, protein: 3, karbonhidrat: 18, yag: 9 },
        { ogun: 'Öğle', saat: '13:00', emoji: '🥙', ad: 'Etli nohut ve pilav', porsiyon: '1 porsiyon etli nohut, 3 yemek kaşığı pilav, cacık', kalori: 560, protein: 30, karbonhidrat: 62, yag: 20 },
        { ogun: 'Ara Öğün', saat: '16:00', emoji: '🍏', ad: 'Yeşil elma', porsiyon: '1 orta boy', kalori: 80, protein: 0, karbonhidrat: 21, yag: 0 },
        { ogun: 'Akşam', saat: '19:30', emoji: '🍲', ad: 'Ezogelin çorbası ve ızgara köfte', porsiyon: '1 kase ezogelin çorbası, 3 adet ızgara köfte, yeşil salata', kalori: 470, protein: 33, karbonhidrat: 32, yag: 22 }
      ]
    },
    {
      gun: 'Perşembe',
      not: 'Yoğun gün için pratik ve hazırlaması kolay öğünler.',
      ogunler: [
        { ogun: 'Kahvaltı', saat: '08:00', emoji: '🧀', ad: 'Peynirli tam tahıllı tost', porsiyon: '2 dilim tam tahıllı ekmek, 40 g peynir, domates', kalori: 355, protein: 18, karbonhidrat: 38, yag: 14 },
        { ogun: 'Ara Öğün', saat: '10:30', emoji: '🥛', ad: 'Ayran', porsiyon: '1 bardak, 250 ml', kalori: 95, protein: 7, karbonhidrat: 8, yag: 4 },
        { ogun: 'Öğle', saat: '13:00', emoji: '🍛', ad: 'Sebzeli tavuk sote ve bulgur', porsiyon: '150 g tavuk sote, 4 yemek kaşığı bulgur pilavı, salata', kalori: 520, protein: 45, karbonhidrat: 48, yag: 15 },
        { ogun: 'Ara Öğün', saat: '16:00', emoji: '🍓', ad: 'Çilekli yoğurt', porsiyon: '1 kase çilek, 150 g yoğurt', kalori: 140, protein: 9, karbonhidrat: 18, yag: 4 },
        { ogun: 'Akşam', saat: '19:30', emoji: '🍆', ad: 'İmambayıldı ve yoğurt', porsiyon: '1 porsiyon imambayıldı, 1 kase yoğurt, 1 dilim ekmek', kalori: 440, protein: 13, karbonhidrat: 50, yag: 20 }
      ]
    },
    {
      gun: 'Cuma',
      not: 'Hafif akşam — hafta sonuna dengeli gir.',
      ogunler: [
        { ogun: 'Kahvaltı', saat: '08:00', emoji: '🥚', ad: 'Sebzeli omlet', porsiyon: '2 yumurtalı sebzeli omlet, 1 dilim ekmek, yeşillik', kalori: 330, protein: 20, karbonhidrat: 22, yag: 17 },
        { ogun: 'Ara Öğün', saat: '10:30', emoji: '🍌', ad: 'Muz ve fıstık ezmesi', porsiyon: '1 muz, 1 tatlı kaşığı fıstık ezmesi', kalori: 175, protein: 4, karbonhidrat: 28, yag: 6 },
        { ogun: 'Öğle', saat: '13:00', emoji: '🐟', ad: 'Izgara levrek ve salata', porsiyon: '180 g levrek, bol yeşil salata, 1 dilim ekmek', kalori: 480, protein: 40, karbonhidrat: 30, yag: 22 },
        { ogun: 'Ara Öğün', saat: '16:00', emoji: '🥕', ad: 'Havuç çubukları ve humus', porsiyon: '1 havuç, 2 yemek kaşığı humus', kalori: 130, protein: 4, karbonhidrat: 15, yag: 6 },
        { ogun: 'Akşam', saat: '19:30', emoji: '🍝', ad: 'Tam buğday makarna', porsiyon: '1 porsiyon makarna, domates-sebze sos, 1 yemek kaşığı rendelenmiş peynir', kalori: 480, protein: 18, karbonhidrat: 70, yag: 14 }
      ]
    },
    {
      gun: 'Cumartesi',
      not: 'Serpme kahvaltıya yer açtık — akşam hafif tut.',
      ogunler: [
        { ogun: 'Kahvaltı', saat: '09:00', emoji: '🫓', ad: 'Serpme kahvaltı tabağı', porsiyon: '1 yumurta, 2 çeşit peynir, zeytin, domates, 2 dilim ekmek', kalori: 430, protein: 20, karbonhidrat: 40, yag: 22 },
        { ogun: 'Ara Öğün', saat: '11:30', emoji: '🍇', ad: 'Üzüm', porsiyon: '1 küçük salkım, ~100 g', kalori: 70, protein: 1, karbonhidrat: 18, yag: 0 },
        { ogun: 'Öğle', saat: '14:00', emoji: '🍲', ad: 'Kuru fasulye ve pilav', porsiyon: '1 porsiyon kuru fasulye, 3 yemek kaşığı pilav, turşu', kalori: 550, protein: 22, karbonhidrat: 78, yag: 16 },
        { ogun: 'Ara Öğün', saat: '17:00', emoji: '🥛', ad: 'Kefir', porsiyon: '1 bardak, 250 ml', kalori: 110, protein: 9, karbonhidrat: 10, yag: 4 },
        { ogun: 'Akşam', saat: '20:00', emoji: '🥗', ad: 'Ton balıklı salata', porsiyon: '1 konserve ton balığı, bol salata, 1 dilim ekmek', kalori: 390, protein: 34, karbonhidrat: 28, yag: 16 }
      ]
    },
    {
      gun: 'Pazar',
      not: 'Haftayı kapat, gelecek haftanın alışverişini planla.',
      ogunler: [
        { ogun: 'Kahvaltı', saat: '09:00', emoji: '🥞', ad: 'Yulaflı pankek', porsiyon: '2 adet yulaflı pankek, 1 tatlı kaşığı bal, mevsim meyve', kalori: 400, protein: 14, karbonhidrat: 58, yag: 12 },
        { ogun: 'Ara Öğün', saat: '11:30', emoji: '🌰', ad: 'Karışık kuruyemiş', porsiyon: '1 avuç, ~25 g', kalori: 160, protein: 5, karbonhidrat: 7, yag: 14 },
        { ogun: 'Öğle', saat: '14:00', emoji: '🍗', ad: 'Fırın tavuk ve sebze', porsiyon: '150 g fırın tavuk but, fırın sebze, 1 kase yoğurt', kalori: 540, protein: 44, karbonhidrat: 32, yag: 24 },
        { ogun: 'Ara Öğün', saat: '17:00', emoji: '🍐', ad: 'Armut', porsiyon: '1 orta boy', kalori: 95, protein: 1, karbonhidrat: 25, yag: 0 },
        { ogun: 'Akşam', saat: '19:30', emoji: '🍜', ad: 'Yayla çorbası ve zeytinyağlı pırasa', porsiyon: '1 kase yayla çorbası, 1 porsiyon zeytinyağlı pırasa, 1 dilim ekmek', kalori: 410, protein: 14, karbonhidrat: 54, yag: 15 }
      ]
    }
  ],

  kutuphane: [
    { emoji: '🥚', ad: 'Haşlanmış yumurta', porsiyon: '1 adet', kalori: 78, protein: 6, karbonhidrat: 1, yag: 5 },
    { emoji: '🍞', ad: 'Tam buğday ekmeği', porsiyon: '1 dilim', kalori: 69, protein: 3, karbonhidrat: 12, yag: 1 },
    { emoji: '🧀', ad: 'Beyaz peynir', porsiyon: '1 dilim, 30 g', kalori: 78, protein: 5, karbonhidrat: 1, yag: 6 },
    { emoji: '🥛', ad: 'Yoğurt', porsiyon: '1 kase, 200 g', kalori: 122, protein: 11, karbonhidrat: 12, yag: 4 },
    { emoji: '🍎', ad: 'Elma', porsiyon: '1 orta boy', kalori: 80, protein: 0, karbonhidrat: 21, yag: 0 },
    { emoji: '🍌', ad: 'Muz', porsiyon: '1 orta boy', kalori: 107, protein: 1, karbonhidrat: 27, yag: 0 },
    { emoji: '🍗', ad: 'Izgara tavuk göğsü', porsiyon: '100 g', kalori: 165, protein: 31, karbonhidrat: 0, yag: 4 },
    { emoji: '🍚', ad: 'Bulgur pilavı', porsiyon: '4 yemek kaşığı', kalori: 150, protein: 5, karbonhidrat: 31, yag: 2 },
    { emoji: '🥗', ad: 'Mevsim salata', porsiyon: '1 tabak', kalori: 45, protein: 1, karbonhidrat: 6, yag: 2 },
    { emoji: '🍲', ad: 'Mercimek çorbası', porsiyon: '1 kase', kalori: 190, protein: 11, karbonhidrat: 28, yag: 4 },
    { emoji: '☕', ad: 'Sade Türk kahvesi', porsiyon: '1 fincan', kalori: 5, protein: 0, karbonhidrat: 1, yag: 0 },
    { emoji: '🌰', ad: 'Karışık kuruyemiş', porsiyon: '1 avuç, 25 g', kalori: 160, protein: 5, karbonhidrat: 7, yag: 14 }
  ],

  ipuclari: [
    'Her öğünde bir avuç protein kaynağı bulundur — tokluk süresini uzatır.',
    'Su hedefini sabah bir bardakla başlatmak günün geri kalanını kolaylaştırır.',
    'Ara öğünleri atlamak akşam aşırı yemeye yol açar; küçük ama düzenli tut.',
    'Tabağının yarısını sebze ile doldur, kalori otomatik olarak dengelenir.',
    'Akşam yemeğini uyumadan en az 3 saat önce bitirmeye çalış.'
  ]
};

const GUN_ADLARI = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const OGUN_SIRASI = ['Kahvaltı', 'Ara Öğün', 'Öğle', 'Akşam'];

function yemekBul(id) {
  return MOCK.yemekler.find((y) => y.id === id);
}

function besinToplami(besinler) {
  return besinler.reduce(
    (acc, b) => ({
      kalori: acc.kalori + b.kalori * (b.adet ?? 1),
      protein: acc.protein + b.protein * (b.adet ?? 1),
      karbonhidrat: acc.karbonhidrat + b.karbonhidrat * (b.adet ?? 1),
      yag: acc.yag + b.yag * (b.adet ?? 1)
    }),
    { kalori: 0, protein: 0, karbonhidrat: 0, yag: 0 }
  );
}
