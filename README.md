# Diji Davetim — Satış ve Tanıtım Sitesi

Dijital davetiye, katılım bildirimi ve QR kodlu anı havuzu hizmetini satan site.
Build aracı, paket yöneticisi ve harici JS kütüphanesi yok — düz statik dosyalar.

- **Tanıtım sitesi:** <https://dijital-davetiye-web-site.vercel.app/> (bu depo)
- **Canlı örnek davetiye:** `diji-davetim.vercel.app` (ayrı proje)
- **Instagram:** [@diji_davetim](https://www.instagram.com/diji_davetim/)
- **WhatsApp:** 0542 458 20 12

## Konumlandırma

Sitenin tek argümanı var: piyasada **davetiye hazırlayan ayrı, düğün fotoğrafı
toplayan ayrı** hizmetler var; üçünü (davet + katılım + anı havuzu) aynı linkte
birleştiren taraf bu. "Üç ayrı iş, tek platform" bölümü omurga, çıkarılmamalı.

Yazım kuralı: **her bölüm tek fikir anlatır.** Metin kısa, görsel iş yapar.

## Sayfa yapısı

| # | Bölüm | Zemin |
|---|---|---|
| 1 | Hero — değer önerisi + canlı örnek | koyu |
| 2 | Üç acı ("Kaç kişi geliyor?") | krem |
| 3 | Üç iş / ürün ekranları | ton |
| 4 | Nasıl çalışır — 3 adım | koyu |
| 5 | Özellikler — 6 hücre | krem |
| 6 | **Temalar — 5 hazır tasarım** | koyu |
| 7 | Etkinlik türleri | ton |
| 8 | Söz veriyoruz (taahhüt kartları) | krem |
| 9 | Fiyatlar — 3 paket | ton |
| 10 | SSS | koyu |
| 11 | Kapanış + iletişim | koyu |

Ayrıca `kvkk.html` — KVKK aydınlatma metni ve gizlilik politikası.

## Tasarım dili

| | |
|---|---|
| Zemin | Krem `#f7f3ea`, koyu bölümlerde yıkık yeşil `#2f4237` |
| Aksan | Altın `#b08a3e` — tek aksan, başka renk eklenmemeli |
| Başlık | Cormorant Garamond 600 |
| Gövde | Jost 300/400/500 |
| Etiket | IBM Plex Mono, harf aralığı açık, büyük harf |

Tüm değerler `css/style.css` başındaki `:root` bloğunda.

## Görseller

| Klasör | Ne | Kaynak |
|---|---|---|
| `assets/shots/` | Ürün ekranları | **Kendi canlı davetiyenizden** çekildi |
| `assets/temalar/` | 5 tema önizlemesi | Üretildi |
| `assets/img/` | Atmosfer fotoğrafları | Unsplash — ticari kullanıma açık |
| `assets/og.jpg` | Sosyal paylaşım kartı 1200×630 | Üretildi |

## Vercel'e alma

1. [vercel.com/new](https://vercel.com/new) → GitHub hesabını bağla →
   `mediaconfig55-afk/dijital-davetiye` deposunu içe aktar.
2. **Framework Preset: Other**, Build Command **boş**, Output Directory **boş**
   (kök dizin). Statik site olduğu için build adımı yok.
3. Deploy. Site **https://dijital-davetiye-web-site.vercel.app/** adresinde yayında.
4. **Adres farklı çıkarsa** şu dört yeri güncelle: `index.html` içindeki
   `canonical`, `og:url`, `og:image` ve JSON-LD'deki iki `url` alanı; bir de
   `kvkk.html` içindeki `canonical`.
5. Kendi alan adını bağlayacaksan Vercel → Settings → Domains.

`vercel.json` önbellek ve güvenlik başlıklarını ayarlıyor; dokunmaya gerek yok.

## Yapılacaklar

1. ~~KVKK metnini tamamla~~ ✅ Tamamlandı. Veri sorumlusu Diji Davetim olarak
   tanımlandı, başvuru kanalı WhatsApp ve Instagram, altyapı sağlayıcıları
   (Vercel ve Supabase, ikisi de ABD) ve yurt dışına aktarım açıkça yazıldı,
   saklama süreleri bağlayıcı hâle getirildi.
   **Şirket kurarsanız** 1. bölüme ticari unvanı eklemek gerekir. Metin bir
   taban metindir; bir hukukçuya okutmanız hâlâ önerilir.
2. **Gerçek müşteri yorumları.** "Söz veriyoruz" bölümündeki üç kart taahhüt
   kartıdır, müşteri yorumu değildir. Gerçek yorumlar gelince `index.html` içinde
   yorum satırına alınmış hazır blok var; onu açıp taahhüt kartlarını kaldırın.
   **Uydurma yorum yayınlamayın** — Ticari Reklam Yönetmeliği kapsamında yaptırımı var.
3. **Gerçek düğün fotoğrafları.** `assets/img/` içindeki stok kareleri kendi
   işlerinizle değiştirin; aynı dosya adlarını kullanın, kod değişikliği gerekmez.
4. **Google İşletme Profili.** Henüz açılmadı.

## Koda dokunurken

- **`.rv` sınıfı** "kaydırınca belirsin" demek. Efekt **opaklık değil yalnızca
  kaydırma** kullanıyor — JS aksadığında bölümler kaybolmasın diye. Opaklığa çevirmeyin.
- **`[id]{scroll-margin-top:96px}`** sabit başlık içindir.
- **Hero paralaksı** yalnızca hero ekrandayken hesaplanır, `prefers-reduced-motion`
  açıkken kapanır.
- **Sayaçlar** (`data-count`) hedef değeri HTML'de de taşır; JS çalışmazsa doğru
  sayı zaten görünür.
- **Temalar** dar ekranda ızgara yerine kendi kabında kayan şerit olur; sayfa
  gövdesi asla yatay kaymaz.
- Tema görsellerini yeniden üretmek için Instagram projesindeki
  `scripts/11_temalar.py`, paylaşım kartı için `scripts/10_og.py`.
- `_yedek-orijinal/` eski siteyi tutuyor, `.gitignore`'da, güvenle silinebilir.
