const MOCK = {
  kullanici: {
    ad: 'Büşra Çalışkan',
    yas: 27,
    boy: 168,
    kilo: 64,
    hedefKilo: 58,
    baslangicKilo: 70,
    gunlukHedef: 2000,
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

  gunluk: {
    0: [
      { yemekId: 'yulaf', ogun: 'Kahvaltı', saat: '08:15' },
      { yemekId: 'mercimek', ogun: 'Öğle', saat: '13:00' },
      { yemekId: 'tavuk-pilav', ogun: 'Akşam', saat: '19:30' }
    ],
    1: [
      { yemekId: 'menemen', ogun: 'Kahvaltı', saat: '09:00' },
      { yemekId: 'burger', ogun: 'Öğle', saat: '13:45' },
      { yemekId: 'somon', ogun: 'Akşam', saat: '20:00' }
    ],
    2: [
      { yemekId: 'yulaf', ogun: 'Kahvaltı', saat: '07:50' },
      { yemekId: 'tavuk-pilav', ogun: 'Öğle', saat: '12:30' },
      { yemekId: 'mercimek', ogun: 'Akşam', saat: '19:00' },
      { yemekId: 'yulaf', ogun: 'Atıştırmalık', saat: '16:20' }
    ],
    3: [
      { yemekId: 'menemen', ogun: 'Kahvaltı', saat: '08:30' },
      { yemekId: 'somon', ogun: 'Akşam', saat: '19:45' }
    ],
    4: [
      { yemekId: 'yulaf', ogun: 'Kahvaltı', saat: '08:00' },
      { yemekId: 'burger', ogun: 'Öğle', saat: '14:00' },
      { yemekId: 'mercimek', ogun: 'Akşam', saat: '20:15' }
    ],
    5: [
      { yemekId: 'menemen', ogun: 'Kahvaltı', saat: '09:30' },
      { yemekId: 'tavuk-pilav', ogun: 'Öğle', saat: '13:15' },
      { yemekId: 'somon', ogun: 'Akşam', saat: '19:20' }
    ],
    6: [
      { yemekId: 'yulaf', ogun: 'Kahvaltı', saat: '08:10' },
      { yemekId: 'somon', ogun: 'Öğle', saat: '12:50' },
      { yemekId: 'tavuk-pilav', ogun: 'Akşam', saat: '19:40' },
      { yemekId: 'mercimek', ogun: 'Atıştırmalık', saat: '16:00' }
    ]
  },

  istatistik: {
    toplamOgun: 128,
    ortalamaKalori: 1890,
    seri: 12
  }
};

const GUN_ADLARI = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

function yemekBul(id) {
  return MOCK.yemekler.find((y) => y.id === id);
}

function besinToplami(besinler) {
  return besinler.reduce(
    (acc, b) => ({
      kalori: acc.kalori + b.kalori,
      protein: acc.protein + b.protein,
      karbonhidrat: acc.karbonhidrat + b.karbonhidrat,
      yag: acc.yag + b.yag
    }),
    { kalori: 0, protein: 0, karbonhidrat: 0, yag: 0 }
  );
}

function gunToplami(gunIndex) {
  const kayitlar = MOCK.gunluk[gunIndex] || [];
  return kayitlar.reduce(
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
}
