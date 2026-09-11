// --- SUPABASE REST & AUTH MOTORU ---
const SUPABASE_URL = "https://fgporvouqslgiluuvruw.supabase.co";
const SUPABASE_REST_URL = `${SUPABASE_URL}/rest/v1`;
const SUPABASE_AUTH_URL = `${SUPABASE_URL}/auth/v1`;
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncG9ydm91cXNsZ2lsdXV2cnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjI5NTAsImV4cCI6MjEwNDUzODk1MH0.OA30InLbNsC5hwbXy43EO7LK7FRsdNYQUj2uueQ0j0o";

let aktifToken = localStorage.getItem("kaganPlanner_token") || null;
let aktifUserId = localStorage.getItem("kaganPlanner_uid") || null;

const bulutIstek = async (tablo, metod = "GET", govde = null, params = "") => {
  const basliklar = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${aktifToken || SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  };

  const ayarlar = { method: metod, headers: basliklar };
  if (govde) ayarlar.body = JSON.stringify(govde);

  const yanit = await fetch(`${SUPABASE_REST_URL}/${tablo}${params ? '?' + params : ''}`, ayarlar);
  if (!yanit.ok) {
    const hataMetni = await yanit.text();
    throw new Error(`[${yanit.status}] ${hataMetni}`);
  }
  const text = await yanit.text();
  return text ? JSON.parse(text) : null;
};

// --- DOM ELEMANLARI ---
const authEkrani = document.getElementById("authEkrani");
const anaUygulamaEkrani = document.getElementById("anaUygulamaEkrani");
const authMesaj = document.getElementById("authMesaj");
const kullaniciAdi = document.getElementById("kullaniciAdi");
const kullaniciEmail = document.getElementById("kullaniciEmail");
const kullaniciSifre = document.getElementById("kullaniciSifre");
const authGonderBtn = document.getElementById("authGonderBtn");
const profilIsim = document.getElementById("profilIsim");
const sifreDegistirBtn = document.getElementById("sifreDegistirBtn");
const cikisYapBtn = document.getElementById("cikisYapBtn");
const sifremiUnuttumBtn = document.getElementById("sifremiUnuttumBtn");
const emailGrup = document.getElementById("emailGrup");
const sekmeGiris = document.getElementById("sekmeGiris");
const sekmeKayit = document.getElementById("sekmeKayit");

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

const pomodoroToggleBtn = document.getElementById("pomodoroToggleBtn");
const pomodoroKarti = document.getElementById("pomodoroKarti");
const pomodoroKapat = document.getElementById("pomodoroKapat");
const pomodoroZaman = document.getElementById("pomodoroZaman");
const pomoDkInput = document.getElementById("pomoDkInput");
const pomoSureAyarlaBtn = document.getElementById("pomoSureAyarlaBtn");
const pomoBaslatBtn = document.getElementById("pomoBaslatBtn");
const pomoSifirlaBtn = document.getElementById("pomoSifirlaBtn");

const toplulukBtn = document.getElementById("toplulukBtn");
const uyariModali = document.getElementById("uyariModali");
const uyariOnaylaBtn = document.getElementById("uyariOnaylaBtn");
const toplulukModali = document.getElementById("toplulukModali");
const toplulukKapatBtn = document.getElementById("toplulukKapatBtn");
const toplulukListesi = document.getElementById("toplulukListesi");

const yedekIndirBtn = document.getElementById("yedekIndirBtn");
const yedekModalAcBtn = document.getElementById("yedekModalAcBtn");
const yedekModali = document.getElementById("yedekModali");
const yedekModalKapatBtn = document.getElementById("yedekModalKapatBtn");
const yedekDosyaSec = document.getElementById("yedekDosyaSec");
const yedekMetinAlani = document.getElementById("yedekMetinAlani");
const yedegiUygulaBtn = document.getElementById("yedegiUygulaBtn");

const alarmKarti = document.getElementById("alarmKarti");
const alarmBaslik = document.getElementById("alarmBaslik");
const alarmZaman = document.getElementById("alarmZaman");
const alarmKapatBtn = document.getElementById("alarmKapatBtn");
const temaBtn = document.getElementById("temaBtn");
const temaIkon = document.getElementById("temaIkon");
const renkNoktalari = document.querySelectorAll(".renk-noktasi");
const zenModuBtn = document.getElementById("zenModuBtn");
const ortamSesiSecim = document.getElementById("ortamSesiSecim");

let authModu = "giris";
let aktifKullanici = null;
let etkinlikler = [];
let aktifSeciliEtkinlikId = null;

// Şifre Güvenlik Kuralı (En az 8 karakter, 1 büyük harf, 1 rakam)
function sifreGuvenliMi(sifre) {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(sifre);
}

// --- 1. AUTH İŞLEMLERİ ---
if (sekmeGiris && sekmeKayit) {
  sekmeGiris.addEventListener("click", () => {
    authModu = "giris";
    sekmeGiris.classList.add("aktif");
    sekmeKayit.classList.remove("aktif");
    if (emailGrup) emailGrup.classList.add("gizli");
    if (sifremiUnuttumBtn) sifremiUnuttumBtn.classList.remove("gizli");
    authGonderBtn.textContent = "Giriş Yap";
    mesajGoster("", "");
  });

  sekmeKayit.addEventListener("click", () => {
    authModu = "kayit";
    sekmeKayit.classList.add("aktif");
    sekmeGiris.classList.remove("aktif");
    if (emailGrup) emailGrup.classList.remove("gizli");
    if (sifremiUnuttumBtn) sifremiUnuttumBtn.classList.add("gizli");
    authGonderBtn.textContent = "Yeni Hesap Oluştur";
    mesajGoster("", "");
  });
}

function mesajGoster(metin, tur) {
  if (!metin) {
    authMesaj.className = "auth-mesaj gizli";
    authMesaj.textContent = "";
    return;
  }
  authMesaj.className = `auth-mesaj ${tur}`;
  authMesaj.textContent = metin;
}

const authIslemiYap = async () => {
  const ad = kullaniciAdi.value.trim().toLowerCase();
  const sifre = kullaniciSifre.value.trim();

  if (!ad || !sifre) {
    mesajGoster("Lütfen kullanıcı adı ve şifre girin!", "hata");
    return;
  }

  authGonderBtn.disabled = true;
  authGonderBtn.textContent = "İşleniyor...";

  try {
    if (authModu === "kayit") {
      const epostaDegeri = kullaniciEmail ? kullaniciEmail.value.trim() : "";
      if (!epostaDegeri) {
        throw new Error("Lütfen geçerli bir e-posta adresi girin.");
      }

      if (!sifreGuvenliMi(sifre)) {
        throw new Error("Şifre en az 8 karakter olmalı, en az 1 büyük harf ve 1 rakam içermelidir!");
      }

      // Supabase Auth SignUp
      const res = await fetch(`${SUPABASE_AUTH_URL}/signup`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ email: epostaDegeri, password: sifre })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error_description || "Kayıt başarısız.");

      aktifToken = data.access_token;
      aktifUserId = data.user.id;

      // Profiller tablosuna kaydet
      await bulutIstek("kullanici_profiller", "POST", { id: aktifUserId, kullanici_adi: ad, calisilan_dakika: 0 });

      mesajGoster("Hesap başarıyla açıldı! Giriş yapılıyor...", "basari");
      setTimeout(() => girisBasarili(ad, aktifToken, aktifUserId), 1000);
    } else {
      const sahteEmail = `${ad}@kaganstudio.local`;
      // Supabase Auth SignIn
      const res = await fetch(`${SUPABASE_AUTH_URL}/token?grant_type=password`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ email: sahteEmail, password: sifre })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error_description || data.msg || "Kullanıcı adı veya şifre hatalı.");

      aktifToken = data.access_token;
      aktifUserId = data.user.id;

      girisBasarili(ad, aktifToken, aktifUserId);
    }
  } catch (err) {
    mesajGoster("Hata: " + err.message, "hata");
  } finally {
    authGonderBtn.disabled = false;
    authGonderBtn.textContent = authModu === "giris" ? "Giriş Yap" : "Yeni Hesap Oluştur";
  }
};

authGonderBtn.addEventListener("click", authIslemiYap);
kullaniciSifre.addEventListener("keydown", (e) => { if (e.key === "Enter") authIslemiYap(); });

function girisBasarili(ad, token, uid) {
  aktifKullanici = ad;
  localStorage.setItem("kaganPlanner_oturum", ad);
  localStorage.setItem("kaganPlanner_token", token);
  localStorage.setItem("kaganPlanner_uid", uid);

  authEkrani.classList.add("gizli");
  anaUygulamaEkrani.classList.remove("gizli");

  profilIsim.textContent = ad;
  buluttanGorevleriYukle();
}

// Şifre Değiştirme
if (sifreDegistirBtn) {
  sifreDegistirBtn.addEventListener("click", async () => {
    const yeniSifre = prompt("Yeni şifrenizi girin (En az 8 karakter, 1 büyük harf, 1 rakam):");
    if (!yeniSifre) return;

    if (!sifreGuvenliMi(yeniSifre)) {
      alert("⚠️ Yeni şifre kurallara uymuyor: En az 8 karakter, 1 büyük harf ve 1 rakam içermelidir!");
      return;
    }

    try {
      const res = await fetch(`${SUPABASE_AUTH_URL}/user`, {
        method: "PUT",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${aktifToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ password: yeniSifre })
      });
      if (!res.ok) throw new Error("Şifre güncellenemedi.");
      alert("✅ Şifreniz başarıyla değiştirildi!");
    } catch (err) {
      alert("Hata: " + err.message);
    }
  });
}

cikisYapBtn.addEventListener("click", () => {
  localStorage.removeItem("kaganPlanner_oturum");
  localStorage.removeItem("kaganPlanner_token");
  localStorage.removeItem("kaganPlanner_uid");
  aktifKullanici = null;
  aktifToken = null;
  aktifUserId = null;
  etkinlikler = [];
  cekmeceyiKapat();

  kullaniciAdi.value = "";
  if (kullaniciEmail) kullaniciEmail.value = "";
  kullaniciSifre.value = "";
  mesajGoster("", "");

  anaUygulamaEkrani.classList.add("gizli");
  authEkrani.classList.remove("gizli");
});

// --- ŞİFREMİ UNUTTUM İŞLEVİ ---
if (sifremiUnuttumBtn) {
  sifremiUnuttumBtn.addEventListener("click", async () => {
    const ad = kullaniciAdi.value.trim().toLowerCase();
    if (!ad) {
      mesajGoster("Lütfen önce yukarıdaki kutuya kullanıcı adını yaz!", "hata");
      return;
    }

    const sahteEmail = `${ad}@kaganstudio.local`;
    sifremiUnuttumBtn.disabled = true;
    sifremiUnuttumBtn.textContent = "Gönderiliyor...";

    try {
      const res = await fetch(`${SUPABASE_AUTH_URL}/recover`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ email: sahteEmail })
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error_description || data.msg || "Şifre sıfırlama isteği gönderilemedi.");
      }

      mesajGoster("✅ Şifre sıfırlama talebi alındı.", "basari");
    } catch (err) {
      mesajGoster("Hata: " + err.message, "hata");
    } finally {
      sifremiUnuttumBtn.disabled = false;
      sifremiUnuttumBtn.textContent = "Şifremi Unuttum?";
    }
  });
}

// --- 2. GÖREV VE BULUT İŞLEMLERİ ---
async function buluttanGorevleriYukle() {
  if (!aktifKullanici || !aktifUserId) return;

  try {
    const data = await bulutIstek("gorevler_auth", "GET", null, `user_id=eq.${aktifUserId}&order=olusturuldu.desc`);
    etkinlikler = (data || []).map(g => ({
      id: g.id,
      baslik: g.baslik,
      tarih: g.tarih,
      saat: g.saat || "",
      oncelik: g.oncelik || "orta",
      kategori: g.kategori || "Genel",
      tamamlandi: g.tamamlandi || false,
      notlar: g.notlar || "",
      altGorevler: g.alt_gorevler || []
    }));
    herSeyiCiz();
  } catch (err) {
    console.error("Görev yükleme hatası:", err);
  }
}

async function bulutaGorevEkle(gorev) {
  try {
    await bulutIstek("gorevler_auth", "POST", {
      id: gorev.id,
      user_id: aktifUserId,
      kullanici_adi: aktifKullanici,
      baslik: gorev.baslik,
      tarih: gorev.tarih,
      saat: gorev.saat,
      oncelik: gorev.oncelik,
      kategori: gorev.kategori,
      tamamlandi: gorev.tamamlandi,
      notlar: gorev.notlar,
      alt_gorevler: gorev.altGorevler
    });
  } catch (err) {
    console.error("Görev ekleme hatası:", err);
  }
}

async function buluttaGorevGuncelle(id, veriler) {
  try {
    const guncelle = {};
    if (veriler.tamamlandi !== undefined) guncelle.tamamlandi = veriler.tamamlandi;
    if (veriler.notlar !== undefined) guncelle.notlar = veriler.notlar;
    if (veriler.altGorevler !== undefined) guncelle.alt_gorevler = veriler.altGorevler;

    await bulutIstek("gorevler_auth", "PATCH", guncelle, `id=eq.${id}&user_id=eq.${aktifUserId}`);
  } catch (err) {
    console.error("Görev güncelleme hatası:", err);
  }
}

async function buluttanGorevSil(id) {
  try {
    await bulutIstek("gorevler_auth", "DELETE", null, `id=eq.${id}&user_id=eq.${aktifUserId}`);
  } catch (err) {
    console.error("Görev silme hatası:", err);
  }
}

async function bulutaDakikaEkle(dk) {
  if (!aktifKullanici || !aktifUserId) return;
  try {
    const profiller = await bulutIstek("kullanici_profiller", "GET", null, `id=eq.${aktifUserId}&select=calisilan_dakika`);
    const eski = (profiller && profiller[0] && profiller[0].calisilan_dakika) || 0;
    await bulutIstek("kullanici_profiller", "PATCH", { calisilan_dakika: eski + dk }, `id=eq.${aktifUserId}`);
  } catch (err) {
    console.error("Dakika güncelleme hatası:", err);
  }
}

// --- 3. ÇİZİM & GÖREV MOTORU ---
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
}

function altGorevRozetiUret(altlar, mini = false) {
  if (!altlar || altlar.length === 0) return "";
  const biten = altlar.filter(a => a.tamamlandi).length;
  const hepsi = biten === altlar.length;
  return `<span class="alt-gorev-rozet ${hepsi ? 'tamami-bitti' : ''} ${mini ? 'mini' : ''}">☑ ${biten}/${altlar.length}</span>`;
}

function listeCiz() {
  listeKapsayici.innerHTML = "";
  if (etkinlikler.length === 0) {
    listeKapsayici.innerHTML = `<div style="text-align:center;padding:24px;color:var(--yazi-ikincil);font-size:14px;">Henüz bulutta kayıtlı görev bulunmuyor.</div>`;
    return;
  }

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

    satir.querySelector("input").addEventListener("change", async (ev) => {
      e.tamamlandi = ev.target.checked;
      if (e.altGorevler && e.altGorevler.length > 0) {
        e.altGorevler.forEach(alt => { alt.tamamlandi = e.tamamlandi; });
      }
      if (e.tamamlandi) konfetiVeKutlama();
      herSeyiCiz();

      await buluttaGorevGuncelle(e.id, { tamamlandi: e.tamamlandi, altGorevler: e.altGorevler });
      if (aktifSeciliEtkinlikId === e.id) altGorevleriCiz(e);
    });

    satir.querySelector(".sil").addEventListener("click", async (ev) => {
      ev.stopPropagation();
      etkinlikler = etkinlikler.filter(item => item.id !== e.id);
      if (aktifSeciliEtkinlikId === e.id) cekmeceyiKapat();
      herSeyiCiz();
      await buluttanGorevSil(e.id);
    });

    listeKapsayici.appendChild(satir);
  });
}

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

// --- 4. DETAY ÇEKMECESİ ---
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

cekmeceNotlar.addEventListener("change", async () => {
  if (!aktifSeciliEtkinlikId) return;
  const e = etkinlikler.find(item => item.id === aktifSeciliEtkinlikId);
  if (e) {
    e.notlar = cekmeceNotlar.value;
    await buluttaGorevGuncelle(e.id, { notlar: e.notlar });
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

    item.querySelector("input").addEventListener("change", async (ev) => {
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
      await buluttaGorevGuncelle(e.id, { tamamlandi: e.tamamlandi, altGorevler: e.altGorevler });
    });

    item.querySelector(".alt-sil-btn").addEventListener("click", async () => {
      e.altGorevler = e.altGorevler.filter(a => a.id !== alt.id);
      altGorevleriCiz(e);
      herSeyiCiz();
      await buluttaGorevGuncelle(e.id, { altGorevler: e.altGorevler });
    });

    altGorevListesi.appendChild(item);
  });
}

async function yeniAltGorevEkle() {
  if (!aktifSeciliEtkinlikId) return;
  const metin = altGorevInput.value.trim();
  if (!metin) return;

  const e = etkinlikler.find(item => item.id === aktifSeciliEtkinlikId);
  if (!e) return;

  e.altGorevler.push({ id: Date.now(), metin: metin, tamamlandi: false });
  altGorevInput.value = "";
  altGorevleriCiz(e);
  herSeyiCiz();
  await buluttaGorevGuncelle(e.id, { altGorevler: e.altGorevler });
}

altGorevEkleBtn.addEventListener("click", yeniAltGorevEkle);
altGorevInput.addEventListener("keydown", (ev) => { if (ev.key === "Enter") yeniAltGorevEkle(); });

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
    pomoZamanlayici = setInterval(async () => {
      pomoKalan--;
      pomoGuncelle();

      if (pomoKalan <= 0) {
        clearInterval(pomoZamanlayici);
        pomoCalisiyor = false;
        pomoBaslatBtn.textContent = "Başlat";
        await bulutaDakikaEkle(pomoDakika);
        konfetiVeKutlama();
        alarmTetikle("🍅 Pomodoro Tamamlandı!", `Tebrikler! ${pomoDakika} dakikalık odak seansını tamamladın.`);
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

// --- 6. CANLI TOPLULUK ODASI ---
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

async function toplulukTablosunuCiz() {
  toplulukListesi.innerHTML = `<div style="text-align:center;font-size:12px;color:var(--yazi-ikincil);padding:10px;">Buluttan yükleniyor...</div>`;

  try {
    const profiller = await bulutIstek("kullanici_profiller", "GET", null, "select=kullanici_adi,calisilan_dakika&order=calisilan_dakika.desc");
    toplulukListesi.innerHTML = "";
    profiller.forEach((kisi, sira) => {
      const saat = ((kisi.calisilan_dakika || 0) / 60).toFixed(1);
      const satir = document.createElement("div");
      satir.className = "topluluk-satir";
      const benMiyim = kisi.kullanici_adi === aktifKullanici ? " (Sen)" : "";

      satir.innerHTML = `
        <div class="topluluk-sol">
          <span>#${sira + 1}</span>
          <span>${kisi.kullanici_adi}${benMiyim}</span>
        </div>
        <div class="topluluk-sag">
          ⏱️ ${kisi.calisilan_dakika || 0} dk (${saat} sa)
        </div>
      `;

      toplulukListesi.appendChild(satir);
    });
  } catch (err) {
    toplulukListesi.innerHTML = `<div style="text-align:center;font-size:12px;color:var(--silme-hover);padding:10px;">Liste alınamadı: ${err.message}</div>`;
  }
}

// --- 7. YENİ ETKİNLİK EKLEME ---
async function yeniEtkinlikEkle() {
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
    notlar: "",
    altGorevler: []
  };

  etkinlikler.unshift(yeni);
  etkinlikBaslik.value = "";
  etkinlikSaat.value = "";
  herSeyiCiz();

  await bulutaGorevEkle(yeni);
}

kaydetBtn.addEventListener("click", yeniEtkinlikEkle);
etkinlikBaslik.addEventListener("keydown", (e) => { if (e.key === "Enter") yeniEtkinlikEkle(); });

sekmeButonlari.forEach(btn => {
  btn.addEventListener("click", () => {
    sekmeButonlari.forEach(b => b.classList.remove("aktif"));
    gorunumAlanlari.forEach(g => g.classList.remove("aktif"));
    btn.classList.add("aktif");
    document.getElementById(btn.dataset.hedef).classList.add("aktif");
  });
});

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

  for (let i = 0; i < 45; i++) {
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

function alarmTetikle(baslik, aciklama) {
  alarmBaslik.textContent = baslik;
  alarmZaman.textContent = aciklama;
  alarmKarti.classList.remove("gizli");
}
alarmKapatBtn.addEventListener("click", () => alarmKarti.classList.add("gizli"));

// --- 8. TEMA MOTORU ---
function pastelRenkUygula(renk) {
  document.body.setAttribute("data-pastel", renk);
  localStorage.setItem("kaganPlanner_pastelRenk", renk);

  renkNoktalari.forEach(nokta => {
    nokta.classList.toggle("aktif", nokta.dataset.renk === renk);
  });
}

renkNoktalari.forEach(nokta => {
  nokta.addEventListener("click", () => pastelRenkUygula(nokta.dataset.renk));
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

// --- 9. ZEN MODU & GERÇEK HD ORTAM SESLERİ ---
zenModuBtn.addEventListener("click", () => {
  document.body.classList.toggle("zen-aktif");
  const aktifMi = document.body.classList.contains("zen-aktif");
  zenModuBtn.textContent = aktifMi ? "🔔 Çıkış" : "🔕 Zen";
  if (aktifMi && pomodoroKarti.classList.contains("gizli")) {
    pomodoroKarti.classList.remove("gizli");
  }
});

const sesDosyalari = {
  yagmur: "https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg",
  somine: "https://actions.google.com/sounds/v1/ambiences/fire.ogg",
  kafe: "https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"
};

let aktifAudio = null;

function ortamSesiCal(tur) {
  if (aktifAudio) {
    aktifAudio.pause();
    aktifAudio.currentTime = 0;
    aktifAudio = null;
  }
  if (tur === "kapali" || !sesDosyalari[tur]) return;

  aktifAudio = new Audio(sesDosyalari[tur]);
  aktifAudio.loop = true;
  aktifAudio.volume = 0.45;
  aktifAudio.play().catch(e => console.log("Ses oynatılamadı:", e));
}

ortamSesiSecim.addEventListener("change", (e) => ortamSesiCal(e.target.value));

// --- 10. YEDEKLEME VE GERİ YÜKLEME ---
if (yedekIndirBtn) {
  yedekIndirBtn.addEventListener("click", () => {
    if (!aktifKullanici) return;

    const veri = {
      kullanici: aktifKullanici,
      tarih: new Date().toISOString(),
      etkinlikler: etkinlikler
    };

    const metin = JSON.stringify(veri, null, 2);
    const blob = new Blob([metin], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kaganstudio_yedek_${aktifKullanici}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

if (yedekModalAcBtn) {
  yedekModalAcBtn.addEventListener("click", () => {
    yedekModali.classList.remove("gizli");
    yedekMetinAlani.value = "";
    if (yedekDosyaSec) yedekDosyaSec.value = "";
  });
}

if (yedekModalKapatBtn) {
  yedekModalKapatBtn.addEventListener("click", () => {
    yedekModali.classList.add("gizli");
  });
}

if (yedekDosyaSec) {
  yedekDosyaSec.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      yedekMetinAlani.value = ev.target.result;
    };
    reader.readAsText(file);
  });
}

if (yedegiUygulaBtn) {
  yedegiUygulaBtn.addEventListener("click", async () => {
    const icerik = yedekMetinAlani.value.trim();
    if (!icerik) {
      alert("Lütfen bir dosya seçin veya kutuya JSON verisini yapıştırın.");
      return;
    }

    try {
      const parseEdilen = JSON.parse(icerik);

      if (parseEdilen && Array.isArray(parseEdilen.etkinlikler)) {
        yedegiUygulaBtn.disabled = true;
        yedegiUygulaBtn.textContent = "Buluta Yazılıyor...";

        for (const g of parseEdilen.etkinlikler) {
          await bulutaGorevEkle(g);
        }

        await buluttanGorevleriYukle();
        konfetiVeKutlama();
        yedekModali.classList.add("gizli");
        alert("✨ Verilerin başarıyla buluta yüklendi ve senkronize edildi!");
      } else {
        alert("Geçersiz yedek formatı: 'etkinlikler' dizisi bulunamadı.");
      }
    } catch (hata) {
      alert("JSON ayrıştırma hatası: " + hata.message);
    } finally {
      yedegiUygulaBtn.disabled = false;
      yedegiUygulaBtn.textContent = "Verileri İçeri Aktar ve Eşitle";
    }
  });
}

// Başlangıç Ayarları
pastelRenkUygula(localStorage.getItem("kaganPlanner_pastelRenk") || "sade");
temaUygula(localStorage.getItem("kaganPlannerTema") || "light");

const acikOturum = localStorage.getItem("kaganPlanner_oturum");
const acikToken = localStorage.getItem("kaganPlanner_token");
const acikUid = localStorage.getItem("kaganPlanner_uid");
if (acikOturum && acikToken && acikUid) {
  aktifKullanici = acikOturum;
  aktifToken = acikToken;
  aktifUserId = acikUid;

  authEkrani.classList.add("gizli");
  anaUygulamaEkrani.classList.remove("gizli");
  profilIsim.textContent = acikOturum;
  buluttanGorevleriYukle();
}

// --- AYARLAR MENÜSÜ İŞLEVİ ---
const ayarMenuAcBtn = document.getElementById("ayarMenuAcBtn");
const ayarMenusu = document.getElementById("ayarMenusu");

if (ayarMenuAcBtn && ayarMenusu) {
  ayarMenuAcBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    ayarMenusu.classList.toggle("gizli");
  });

  document.addEventListener("click", (e) => {
    if (!ayarMenusu.contains(e.target) && e.target !== ayarMenuAcBtn) {
      ayarMenusu.classList.add("gizli");
    }
  });
}
