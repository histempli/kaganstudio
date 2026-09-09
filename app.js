// --- AUTH DOM ELEMANLARI ---
const authEkrani = document.getElementById("authEkrani");
const anaUygulamaEkrani = document.getElementById("anaUygulamaEkrani");
const sekmeGiris = document.getElementById("sekmeGiris");
const sekmeKayit = document.getElementById("sekmeKayit");
const authMesaj = document.getElementById("authMesaj");
const authForm = document.getElementById("authForm");
const kullaniciAdi = document.getElementById("kullaniciAdi");
const kullaniciSifre = document.getElementById("kullaniciSifre");
const authGonderBtn = document.getElementById("authGonderBtn");
const profilIsim = document.getElementById("profilIsim");
const cikisYapBtn = document.getElementById("cikisYapBtn");

// --- UYGULAMA DOM ELEMANLARI ---
const etkinlikBaslik = document.getElementById("etkinlikBaslik");
const etkinlikTarih = document.getElementById("etkinlikTarih");
const etkinlikSaat = document.getElementById("etkinlikSaat");
const oncelikSecim = document.getElementById("oncelikSecim");
const kategoriSecim = document.getElementById("kategoriSecim");
const kaydetBtn = document.getElementById("kaydetBtn");

const sekmeButonlari = document.querySelectorAll(".sekme-btn");
const gorunumAlanlari = document.querySelectorAll(".gorunum-alani");

const listeKapsayici = document.getElementById("listeKapsayici");
const haftalikGrid = document.getElementById("haftalikGrid");
const haftalikAralikBaslik = document.getElementById("haftalikAralikBaslik");
const oncekiHaftaBtn = document.getElementById("oncekiHaftaBtn");
const sonrakiHaftaBtn = document.getElementById("sonrakiHaftaBtn");

const aylikGrid = document.getElementById("aylikGrid");
const aylikBaslik = document.getElementById("aylikBaslik");
const oncekiAyBtn = document.getElementById("oncekiAyBtn");
const sonrakiAyBtn = document.getElementById("sonrakiAyBtn");

const ilerlemeBari = document.getElementById("ilerlemeBari");
const yuzdeMetin = document.getElementById("yuzdeMetin");
const kutlamaKarti = document.getElementById("kutlamaKarti");

// Çekmece
const cekmecArkaplan = document.getElementById("cekmecArkaplan");
const detayCekmecesi = document.getElementById("detayCekmecesi");
const cekmecKapatBtn = document.getElementById("cekmecKapatBtn");
const cekmeceBaslik = document.getElementById("cekmeceBaslik");
const cekmeceKategori = document.getElementById("cekmeceKategori");
const cekmeceOncelik = document.getElementById("cekmeceOncelik");
const cekmeceZaman = document.getElementById("cekmeceZaman");
const cekmeceNotlar = document.getElementById("cekmeceNotlar");
const altGorevInput = document.getElementById("altGorevInput");
const altGorevEkleBtn = document.getElementById("altGorevEkleBtn");
const altGorevListesi = document.getElementById("altGorevListesi");
const altGorevSayac = document.getElementById("altGorevSayac");

// Pomodoro
const pomodoroToggleBtn = document.getElementById("pomodoroToggleBtn");
const pomodoroKarti = document.getElementById("pomodoroKarti");
const pomodoroKapat = document.getElementById("pomodoroKapat");
const pomodoroZaman = document.getElementById("pomodoroZaman");
const pomoDkInput = document.getElementById("pomoDkInput");
const pomoSureAyarlaBtn = document.getElementById("pomoSureAyarlaBtn");
const pomoBaslatBtn = document.getElementById("pomoBaslatBtn");
const pomoSifirlaBtn = document.getElementById("pomoSifirlaBtn");

// Topluluk & Farkındalık
const toplulukBtn = document.getElementById("toplulukBtn");
const uyariModali = document.getElementById("uyariModali");
const uyariOnaylaBtn = document.getElementById("uyariOnaylaBtn");
const toplulukModali = document.getElementById("toplulukModali");
const toplulukKapatBtn = document.getElementById("toplulukKapatBtn");
const toplulukListesi = document.getElementById("toplulukListesi");

// Tema & Bildirim
const bildirimIzinBtn = document.getElementById("bildirimIzinBtn");
const alarmKarti = document.getElementById("alarmKarti");
const alarmBaslik = document.getElementById("alarmBaslik");
const alarmZaman = document.getElementById("alarmZaman");
const alarmKapatBtn = document.getElementById("alarmKapatBtn");

const temaBtn = document.getElementById("temaBtn");
const temaIkon = document.getElementById("temaIkon");
const renkNoktalari = document.querySelectorAll(".renk-noktasi");

// Zen & Ortam Sesleri
const zenModuBtn = document.getElementById("zenModuBtn");
const ortamSesiSecim = document.getElementById("ortamSesiSecim");

// --- 1. AUTH SİSTEMİ ---
let authModu = "giris";
let aktifKullanici = null;
let etkinlikler = [];
let aktifSeciliEtkinlikId = null;

function getHesaplar() {
  return JSON.parse(localStorage.getItem("kaganPlanner_hesaplar")) || {};
}
function hesapKaydet(hesaplar) {
  localStorage.setItem("kaganPlanner_hesaplar", JSON.stringify(hesaplar));
}

sekmeGiris.addEventListener("click", () => {
  authModu = "giris";
  sekmeGiris.classList.add("aktif");
  sekmeKayit.classList.remove("aktif");
  authGonderBtn.textContent = "Giriş Yap";
  mesajGoster("", "");
});

sekmeKayit.addEventListener("click", () => {
  authModu = "kayit";
  sekmeKayit.classList.add("aktif");
  sekmeGiris.classList.remove("aktif");
  authGonderBtn.textContent = "Yeni Hesap Oluştur";
  mesajGoster("", "");
});

function mesajGoster(metin, tur) {
  if (!metin) {
    authMesaj.className = "auth-mesaj gizli";
    authMesaj.textContent = "";
    return;
  }
  authMesaj.className = `auth-mesaj ${tur}`;
  authMesaj.textContent = metin;
}

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const ad = kullaniciAdi.value.trim().toLowerCase();
  const sifre = kullaniciSifre.value.trim();

  if (!ad || !sifre) {
    mesajGoster("Lütfen kullanıcı adı ve şifre girin!", "hata");
    return;
  }

  const hesaplar = getHesaplar();

  if (authModu === "kayit") {
    if (hesaplar[ad]) {
      mesajGoster("Bu kullanıcı adı zaten alınmış!", "hata");
      return;
    }
    hesaplar[ad] = { sifre: sifre, calisilanDakika: 0 };
    hesapKaydet(hesaplar);
    mesajGoster("Hesap başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.", "basari");
    setTimeout(() => {
      sekmeGiris.click();
      kullaniciSifre.value = "";
    }, 1200);
  } else {
    if (!hesaplar[ad]) {
      mesajGoster("Kullanıcı bulunamadı! Önce kayıt olun.", "hata");
      return;
    }
    if (hesaplar[ad].sifre !== sifre) {
      mesajGoster("Hatalı şifre girdiniz!", "hata");
      return;
    }
    girisBasarili(ad);
  }
});

function girisBasarili(ad) {
  aktifKullanici = ad;
  localStorage.setItem("kaganPlanner_oturum", ad);

  authEkrani.classList.add("gizli");
  anaUygulamaEkrani.classList.remove("gizli");

  profilIsim.textContent = ad;
  kullaniciVerileriniYukle();
}

cikisYapBtn.addEventListener("click", () => {
  localStorage.removeItem("kaganPlanner_oturum");
  aktifKullanici = null;
  etkinlikler = [];
  cekmeceyiKapat();

  kullaniciAdi.value = "";
  kullaniciSifre.value = "";
  mesajGoster("", "");

  anaUygulamaEkrani.classList.add("gizli");
  authEkrani.classList.remove("gizli");
});

// --- 2. KULLANICI VERİ MOTORU ---
function kullaniciVerileriniYukle() {
  if (!aktifKullanici) return;
  const depoAnahtari = `kaganPlanner_veri_${aktifKullanici}`;
  const kayitliVeri = localStorage.getItem(depoAnahtari);

  if (kayitliVeri) {
    etkinlikler = JSON.parse(kayitliVeri);
  } else {
    etkinlikler = [
      {
        id: 1,
        baslik: `${aktifKullanici} için ilk görev`,
        tarih: gercekBugunStr,
        saat: "12:00",
        oncelik: "orta",
        kategori: "Kişisel",
        tamamlandi: false,
        hatirlatildi: false,
        notlar: "Göreve tıklayarak notlar ve alt görevler ekleyebilirsin.",
        altGorevler: [
          { id: 101, metin: "Alt görevleri dene", tamamlandi: true },
          { id: 102, metin: "Pastel renkleri ve Zen modunu keşfet", tamamlandi: false }
        ]
      }
    ];
    kullaniciVerileriniKaydet();
  }
  herSeyiCiz();
}

function kullaniciVerileriniKaydet() {
  if (!aktifKullanici) return;
  const depoAnahtari = `kaganPlanner_veri_${aktifKullanici}`;
  localStorage.setItem(depoAnahtari, JSON.stringify(etkinlikler));
}

function kullaniciyaDakikaEkle(dk) {
  if (!aktifKullanici) return;
  const hesaplar = getHesaplar();
  if (hesaplar[aktifKullanici]) {
    hesaplar[aktifKullanici].calisilanDakika = (hesaplar[aktifKullanici].calisilanDakika || 0) + dk;
    hesapKaydet(hesaplar);
  }
}

// --- 3. TARİH VE TAKVİM MOTORU ---
let gecerliTarih = new Date();
const gercekBugunStr = `${gecerliTarih.getFullYear()}-${String(gecerliTarih.getMonth() + 1).padStart(2, '0')}-${String(gecerliTarih.getDate()).padStart(2, '0')}`;
if (etkinlikTarih) etkinlikTarih.value = gercekBugunStr;

let seciliHaftaBasi = new Date(gecerliTarih);
const gunFarki = (seciliHaftaBasi.getDay() + 6) % 7;
seciliHaftaBasi.setDate(seciliHaftaBasi.getDate() - gunFarki);

let seciliAy = gecerliTarih.getMonth();
let seciliYil = gecerliTarih.getFullYear();

function herSeyiCiz() {
  listeCiz();
  haftalikCiz();
  aylikCiz();
  ilerlemeGuncelle();
  kullaniciVerileriniKaydet();
}

function altGorevRozetiUret(altlar, mini = false) {
  if (!altlar || altlar.length === 0) return "";
  const biten = altlar.filter(a => a.tamamlandi).length;
  const hepsi = biten === altlar.length;
  return `<span class="alt-gorev-rozet ${hepsi ? 'tamami-bitti' : ''} ${mini ? 'mini' : ''}">☑ ${biten}/${altlar.length}</span>`;
}

// 3A. Liste
function listeCiz() {
  listeKapsayici.innerHTML = "";
  etkinlikler.forEach(e => {
    const satir = document.createElement("div");
    satir.className = `gorev-satir ${e.tamamlandi ? "tamamlandi" : ""}`;

    const rozetHtml = altGorevRozetiUret(e.altGorevler);

    satir.innerHTML = `
      <div class="gorev-satir-sol">
        <input type="checkbox" ${e.tamamlandi ? "checked" : ""}>
        <span class="metin">${e.baslik}</span>
        ${rozetHtml}
        <small style="color:var(--yazi-ikincil); font-size:12px;">📅 ${e.tarih} ${e.saat ? '⏰ ' + e.saat : ''}</small>
      </div>
      <button style="background:transparent;border:none;color:var(--yazi-ikincil);cursor:pointer;" class="sil">✕</button>
    `;

    satir.addEventListener("click", (ev) => {
      if (ev.target.type === "checkbox" || ev.target.classList.contains("sil")) return;
      cekmeceyiAc(e.id);
    });

    satir.querySelector("input").addEventListener("change", (ev) => {
      e.tamamlandi = ev.target.checked;
      
      if (e.altGorevler && e.altGorevler.length > 0) {
        e.altGorevler.forEach(alt => {
          alt.tamamlandi = e.tamamlandi;
        });
      }

      if (e.tamamlandi) konfetiVeKutlama();
      herSeyiCiz();

      if (aktifSeciliEtkinlikId === e.id) {
        altGorevleriCiz(e);
      }
    });

    satir.querySelector(".sil").addEventListener("click", (ev) => {
      ev.stopPropagation();
      etkinlikler = etkinlikler.filter(item => item.id !== e.id);
      if (aktifSeciliEtkinlikId === e.id) cekmeceyiKapat();
      herSeyiCiz();
    });

    listeKapsayici.appendChild(satir);
  });
}

// 3B. Haftalık
const gunAdlari = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
function haftalikCiz() {
  haftalikGrid.innerHTML = "";
  const bitisTarihi = new Date(seciliHaftaBasi);
  bitisTarihi.setDate(bitisTarihi.getDate() + 6);

  haftalikAralikBaslik.textContent = `${seciliHaftaBasi.getDate()} ${seciliHaftaBasi.toLocaleString('tr-TR', {month:'short'})} - ${bitisTarihi.getDate()} ${bitisTarihi.toLocaleString('tr-TR', {month:'short', year:'numeric'})}`;

  for (let i = 0; i < 7; i++) {
    const gTarih = new Date(seciliHaftaBasi);
    gTarih.setDate(gTarih.getDate() + i);
    const kod = `${gTarih.getFullYear()}-${String(gTarih.getMonth() + 1).padStart(2, '0')}-${String(gTarih.getDate()).padStart(2, '0')}`;

    const kutu = document.createElement("div");
    kutu.className = `haftalik-gun-kutu ${kod === gercekBugunStr ? "bugun" : ""}`;
    kutu.innerHTML = `<div class="gun-baslik">${gunAdlari[i]} <br><small>${gTarih.getDate()} ${gTarih.toLocaleString('tr-TR', {month:'short'})}</small></div>`;

    const oGunun = etkinlikler.filter(e => e.tarih === kod);
    oGunun.forEach(e => {
      const hap = document.createElement("div");
      hap.className = `etkinlik-hapi ${e.tamamlandi ? "tamamlandi" : ""}`;
      const rozet = altGorevRozetiUret(e.altGorevler, true);

      hap.innerHTML = `<span>${e.saat ? e.saat + ' ' : ''}${e.baslik}</span> ${rozet}`;
      hap.addEventListener("click", () => cekmeceyiAc(e.id));
      kutu.appendChild(hap);
    });

    haftalikGrid.appendChild(kutu);
  }
}

oncekiHaftaBtn.addEventListener("click", () => {
  seciliHaftaBasi.setDate(seciliHaftaBasi.getDate() - 7);
  haftalikCiz();
});
sonrakiHaftaBtn.addEventListener("click", () => {
  seciliHaftaBasi.setDate(seciliHaftaBasi.getDate() + 7);
  haftalikCiz();
});

// 3C. Aylık
function aylikCiz() {
  aylikGrid.innerHTML = "";
  const ayGosterimTarihi = new Date(seciliYil, seciliAy, 1);
  aylikBaslik.textContent = ayGosterimTarihi.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });

  const ilkGunHaftaNo = (ayGosterimTarihi.getDay() + 6) % 7;
  const toplamGun = new Date(seciliYil, seciliAy + 1, 0).getDate();

  for (let b = 0; b < ilkGunHaftaNo; b++) {
    const bosKutu = document.createElement("div");
    bosKutu.className = "aylik-gun-kutu bos";
    aylikGrid.appendChild(bosKutu);
  }

  for (let g = 1; g <= toplamGun; g++) {
    const kod = `${seciliYil}-${String(seciliAy + 1).padStart(2, '0')}-${String(g).padStart(2, '0')}`;
    const kutu = document.createElement("div");
    kutu.className = `aylik-gun-kutu ${kod === gercekBugunStr ? "bugun" : ""}`;
    kutu.innerHTML = `<span class="ay-gun-no">${g}</span>`;

    const oGunun = etkinlikler.filter(e => e.tarih === kod);
    oGunun.forEach(e => {
      const hap = document.createElement("div");
      hap.className = `etkinlik-hapi ${e.tamamlandi ? "tamamlandi" : ""}`;
      const rozet = altGorevRozetiUret(e.altGorevler, true);

      hap.innerHTML = `<span>${e.baslik}</span> ${rozet}`;
      hap.addEventListener("click", () => cekmeceyiAc(e.id));
      kutu.appendChild(hap);
    });

    aylikGrid.appendChild(kutu);
  }
}

oncekiAyBtn.addEventListener("click", () => {
  seciliAy--;
  if (seciliAy < 0) { seciliAy = 11; seciliYil--; }
  aylikCiz();
});
sonrakiAyBtn.addEventListener("click", () => {
  seciliAy++;
  if (seciliAy > 11) { seciliAy = 0; seciliYil++; }
  aylikCiz();
});

// --- 4. DETAY ÇEKMECESİ & ALT GÖREVLER ---
function cekmeceyiAc(id) {
  const e = etkinlikler.find(item => item.id === id);
  if (!e) return;

  aktifSeciliEtkinlikId = id;
  if (!e.altGorevler) e.altGorevler = [];
  if (e.notlar === undefined) e.notlar = "";

  cekmeceBaslik.textContent = e.baslik;
  cekmeceKategori.textContent = e.kategori;
  cekmeceOncelik.textContent = e.oncelik === "yuksek" ? "🔴 Yüksek" : e.oncelik === "orta" ? "🟡 Orta" : "🟢 Düşük";
  cekmeceZaman.textContent = `📅 ${e.tarih} ${e.saat ? '⏰ ' + e.saat : ''}`;
  cekmeceNotlar.value = e.notlar;

  altGorevleriCiz(e);

  cekmecArkaplan.classList.remove("gizli");
  detayCekmecesi.classList.remove("gizli");
}

function cekmeceyiKapat() {
  cekmecArkaplan.classList.add("gizli");
  detayCekmecesi.classList.add("gizli");
  aktifSeciliEtkinlikId = null;
}

cekmecKapatBtn.addEventListener("click", cekmeceyiKapat);
cekmecArkaplan.addEventListener("click", cekmeceyiKapat);

cekmeceNotlar.addEventListener("input", () => {
  if (!aktifSeciliEtkinlikId) return;
  const e = etkinlikler.find(item => item.id === aktifSeciliEtkinlikId);
  if (e) {
    e.notlar = cekmeceNotlar.value;
    kullaniciVerileriniKaydet();
  }
});

function altGorevleriCiz(e) {
  altGorevListesi.innerHTML = "";
  const toplam = e.altGorevler.length;
  const biten = e.altGorevler.filter(a => a.tamamlandi).length;
  altGorevSayac.textContent = `${biten}/${toplam}`;

  e.altGorevler.forEach(alt => {
    const item = document.createElement("div");
    item.className = `alt-gorev-oge ${alt.tamamlandi ? "tamamlandi" : ""}`;
    item.innerHTML = `
      <div class="alt-gorev-sol">
        <input type="checkbox" ${alt.tamamlandi ? "checked" : ""}>
        <span>${alt.metin}</span>
      </div>
      <button class="alt-sil-btn">✕</button>
    `;

    item.querySelector("input").addEventListener("change", (ev) => {
      alt.tamamlandi = ev.target.checked;

      const tumuBitti = e.altGorevler.every(a => a.tamamlandi);
      if (tumuBitti && !e.tamamlandi) {
        e.tamamlandi = true;
        konfetiVeKutlama();
      } else if (!tumuBitti && e.tamamlandi) {
        e.tamamlandi = false;
      }

      altGorevleriCiz(e);
      herSeyiCiz();
    });

    item.querySelector(".alt-sil-btn").addEventListener("click", () => {
      e.altGorevler = e.altGorevler.filter(a => a.id !== alt.id);
      altGorevleriCiz(e);
      herSeyiCiz();
    });

    altGorevListesi.appendChild(item);
  });
}

function yeniAltGorevEkle() {
  if (!aktifSeciliEtkinlikId) return;
  const metin = altGorevInput.value.trim();
  if (!metin) return;

  const e = etkinlikler.find(item => item.id === aktifSeciliEtkinlikId);
  if (!e) return;

  e.altGorevler.push({
    id: Date.now(),
    metin: metin,
    tamamlandi: false
  });

  if (e.tamamlandi) {
    e.tamamlandi = false;
  }

  altGorevInput.value = "";
  altGorevleriCiz(e);
  herSeyiCiz();
}

altGorevEkleBtn.addEventListener("click", yeniAltGorevEkle);
altGorevInput.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") yeniAltGorevEkle();
});

// --- 5. POMODORO ---
let pomoDakika = 25;
let pomoKalan = pomoDakika * 60;
let pomoZamanlayici = null;
let pomoCalisiyor = false;

function pomoFormat(sn) {
  const m = Math.floor(sn / 60);
  const s = sn % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function pomoGuncelle() {
  const formatli = pomoFormat(pomoKalan);
  pomodoroZaman.textContent = formatli;
  pomodoroToggleBtn.textContent = `🍅 ${formatli}`;
}

pomodoroToggleBtn.addEventListener("click", () => {
  pomodoroKarti.classList.toggle("gizli");
});
pomodoroKapat.addEventListener("click", () => {
  pomodoroKarti.classList.add("gizli");
});

pomoSureAyarlaBtn.addEventListener("click", () => {
  let val = parseInt(pomoDkInput.value);
  if (isNaN(val) || val < 1) val = 1;
  if (val > 180) val = 180;
  pomoDkInput.value = val;
  pomoDakika = val;
  pomoSifirla();
});

function pomoBaslatDurdur() {
  if (pomoCalisiyor) {
    clearInterval(pomoZamanlayici);
    pomoCalisiyor = false;
    pomoBaslatBtn.textContent = "Devam Et";
  } else {
    pomoCalisiyor = true;
    pomoBaslatBtn.textContent = "Duraklat";
    pomoZamanlayici = setInterval(() => {
      pomoKalan--;
      pomoGuncelle();

      if (pomoKalan <= 0) {
        clearInterval(pomoZamanlayici);
        pomoCalisiyor = false;
        pomoBaslatBtn.textContent = "Başlat";

        kullaniciyaDakikaEkle(pomoDakika);

        konfetiVeKutlama();
        alarmTetikle("🍅 Pomodoro Süresi Doldu!", `Tebrikler! ${pomoDakika} dakikalık odak seansını tamamladın.`);
        pomoSifirla();
      }
    }, 1000);
  }
}

function pomoSifirla() {
  clearInterval(pomoZamanlayici);
  pomoCalisiyor = false;
  pomoKalan = pomoDakika * 60;
  pomoBaslatBtn.textContent = "Başlat";
  pomoGuncelle();
}

pomoBaslatBtn.addEventListener("click", pomoBaslatDurdur);
pomoSifirlaBtn.addEventListener("click", pomoSifirla);

// --- 6. TOPLULUK & FARKINDALIK ---
toplulukBtn.addEventListener("click", () => {
  uyariModali.classList.remove("gizli");
});

uyariOnaylaBtn.addEventListener("click", () => {
  uyariModali.classList.add("gizli");
  toplulukTablosunuCiz();
  toplulukModali.classList.remove("gizli");
});

toplulukKapatBtn.addEventListener("click", () => {
  toplulukModali.classList.add("gizli");
});

function toplulukTablosunuCiz() {
  toplulukListesi.innerHTML = "";
  const hesaplar = getHesaplar();
  const liste = [];

  for (let kullanici in hesaplar) {
    liste.push({
      ad: kullanici,
      dakika: hesaplar[kullanici].calisilanDakika || 0
    });
  }

  liste.sort((a, b) => b.dakika - a.dakika);

  if (liste.length === 0) {
    toplulukListesi.innerHTML = `<div style="text-align:center;font-size:12px;color:var(--yazi-ikincil);padding:10px;">Henüz kayıtlı kullanıcı bulunmuyor.</div>`;
    return;
  }

  liste.forEach((kisi, sira) => {
    const saat = (kisi.dakika / 60).toFixed(1);
    const satir = document.createElement("div");
    satir.className = "topluluk-satir";

    const benMiyim = kisi.ad === aktifKullanici ? " (Sen)" : "";

    satir.innerHTML = `
      <div class="topluluk-sol">
        <span>#${sira + 1}</span>
        <span>${kisi.ad}${benMiyim}</span>
      </div>
      <div class="topluluk-sag">
        ⏱️ ${kisi.dakika} dk (${saat} sa)
      </div>
    `;

    toplulukListesi.appendChild(satir);
  });
}

// --- 7. YENİ ETKİNLİK EKLEME ---
function yeniEtkinlikEkle() {
  const baslik = etkinlikBaslik.value.trim();
  if (!baslik) return;

  const yeni = {
    id: Date.now(),
    baslik: baslik,
    tarih: etkinlikTarih.value || gercekBugunStr,
    saat: etkinlikSaat.value || "",
    oncelik: oncelikSecim.value,
    kategori: kategoriSecim.value,
    tamamlandi: false,
    hatirlatildi: false,
    notlar: "",
    altGorevler: []
  };

  etkinlikler.push(yeni);
  etkinlikBaslik.value = "";
  etkinlikSaat.value = "";
  herSeyiCiz();
}

kaydetBtn.addEventListener("click", yeniEtkinlikEkle);
etkinlikBaslik.addEventListener("keydown", (e) => { if (e.key === "Enter") yeniEtkinlikEkle(); });

// Sekmeler
sekmeButonlari.forEach(btn => {
  btn.addEventListener("click", () => {
    sekmeButonlari.forEach(b => b.classList.remove("aktif"));
    gorunumAlanlari.forEach(g => g.classList.remove("aktif"));
    btn.classList.add("aktif");
    document.getElementById(btn.dataset.hedef).classList.add("aktif");
  });
});

// İlerleme & Konfeti
function ilerlemeGuncelle() {
  const toplam = etkinlikler.length;
  const tamamlanan = etkinlikler.filter(e => e.tamamlandi).length;
  const yuzde = toplam === 0 ? 0 : Math.round((tamamlanan / toplam) * 100);
  ilerlemeBari.style.width = `${yuzde}%`;
  yuzdeMetin.textContent = `%${yuzde}`;
}

function konfetiVeKutlama() {
  kutlamaKarti.classList.remove("gizli");
  setTimeout(() => kutlamaKarti.classList.add("gizli"), 2200);

  const canvas = document.getElementById("konfetiTuval");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const parcalar = [];
  const renkler = ["#38bdf8", "#f472b6", "#4ade80", "#c084fc", "#facc15"];

  for (let i = 0; i < 50; i++) {
    parcalar.push({
      x: canvas.width / 2,
      y: canvas.height * 0.7,
      r: Math.random() * 5 + 3,
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 1) * 8 - 4,
      renk: renkler[Math.floor(Math.random() * renkler.length)],
      alpha: 1
    });
  }

  function ciz() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let devam = false;

    parcalar.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.2;
      p.alpha -= 0.015;

      if (p.alpha > 0) {
        devam = true;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.renk;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (devam) requestAnimationFrame(ciz);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  ciz();
}

// Hatırlatıcı Motoru
bildirimIzinBtn.addEventListener("click", () => {
  if ("Notification" in window) {
    Notification.requestPermission().then(izin => {
      if (izin === "granted") {
        bildirimIzinBtn.textContent = "🔔 Açık";
        bildirimIzinBtn.style.color = "var(--basari)";
      }
    });
  }
});

function alarmTetikle(baslik, aciklama) {
  alarmBaslik.textContent = baslik;
  alarmZaman.textContent = aciklama;
  alarmKarti.classList.remove("gizli");

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("KaganStudio ⏰ " + baslik, { body: aciklama });
  }
}

alarmKapatBtn.addEventListener("click", () => alarmKarti.classList.add("gizli"));

setInterval(() => {
  if (!aktifKullanici) return;
  const d = new Date();
  const buTarih = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const buSaat = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  etkinlikler.forEach(e => {
    if (!e.tamamlandi && !e.hatirlatildi && e.tarih === buTarih && e.saat === buSaat) {
      alarmTetikle(e.baslik, `Saat: ${e.saat} | Zamanı geldi!`);
      e.hatirlatildi = true;
      kullaniciVerileriniKaydet();
    }
  });
}, 10000);

// --- 8. TEMA MOTORU ---
function pastelRenkUygula(renk) {
  document.body.setAttribute("data-pastel", renk);
  localStorage.setItem("kaganPlanner_pastelRenk", renk);

  renkNoktalari.forEach(nokta => {
    if (nokta.dataset.renk === renk) {
      nokta.classList.add("aktif");
    } else {
      nokta.classList.remove("aktif");
    }
  });
}

renkNoktalari.forEach(nokta => {
  nokta.addEventListener("click", () => {
    pastelRenkUygula(nokta.dataset.renk);
  });
});

function temaUygula(t) {
  if (t === "dark") {
    document.body.classList.add("dark-mode");
    temaIkon.textContent = "☀️";
  } else {
    document.body.classList.remove("dark-mode");
    temaIkon.textContent = "🌙";
  }
}

temaBtn.addEventListener("click", () => {
  const aktif = document.body.classList.contains("dark-mode") ? "light" : "dark";
  localStorage.setItem("kaganPlannerTema", aktif);
  temaUygula(aktif);
});

// --- 9. ZEN MODU & ORTAM SESLERİ ---
zenModuBtn.addEventListener("click", () => {
  document.body.classList.toggle("zen-aktif");
  const aktifMi = document.body.classList.contains("zen-aktif");
  zenModuBtn.textContent = aktifMi ? "🔔 Çıkış" : "🔕 Zen";
  if (aktifMi && pomodoroKarti.classList.contains("gizli")) {
    pomodoroKarti.classList.remove("gizli");
  }
});

let sesCtx = null;
let sesDugumu = null;

function sesUret(tur) {
  if (sesCtx) {
    sesCtx.close();
    sesCtx = null;
  }
  if (tur === "kapali") return;

  sesCtx = new (window.AudioContext || window.webkitAudioContext)();
  const bufferSize = sesCtx.sampleRate * 2;
  const buffer = sesCtx.createBuffer(1, bufferSize, sesCtx.sampleRate);
  const data = buffer.getChannelData(0);

  let sonDeger = 0;
  for (let i = 0; i < bufferSize; i++) {
    const beyaz = Math.random() * 2 - 1;
    if (tur === "yagmur") {
      sonDeger = (sonDeger + 0.02 * beyaz) / 1.02;
      data[i] = sonDeger * 3.5;
    } else if (tur === "somine") {
      const citirti = Math.random() > 0.992 ? (Math.random() * 2 - 1) * 0.8 : 0;
      sonDeger = (sonDeger + 0.04 * beyaz) / 1.04;
      data[i] = sonDeger * 1.5 + citirti;
    } else {
      sonDeger = (sonDeger + 0.01 * beyaz) / 1.01;
      data[i] = sonDeger * 4.5;
    }
  }

  const kaynak = sesCtx.createBufferSource();
  kaynak.buffer = buffer;
  kaynak.loop = true;

  const kazanc = sesCtx.createGain();
  kazanc.gain.value = 0.15;

  kaynak.connect(kazanc);
  kazanc.connect(sesCtx.destination);
  kaynak.start();
  sesDugumu = kaynak;
}

ortamSesiSecim.addEventListener("change", (e) => {
  sesUret(e.target.value);
});

// Başlangıç Ayarları
const kayitliPastel = localStorage.getItem("kaganPlanner_pastelRenk") || "sade";
pastelRenkUygula(kayitliPastel);
temaUygula(localStorage.getItem("kaganPlannerTema") || "light");

const acikOturum = localStorage.getItem("kaganPlanner_oturum");
if (acikOturum) {
  girisBasarili(acikOturum);
}
