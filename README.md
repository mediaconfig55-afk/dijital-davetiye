# Diji Davetim — Satış ve Tanıtım Sitesi

Dijital davetiye, katılım bildirimi ve QR kodlu anı havuzu hizmetini satan tek
sayfalık site. Build aracı, paket yöneticisi ve harici JS kütüphanesi yok — düz
statik dosyalar.

Instagram: [@diji_davetim](https://www.instagram.com/diji_davetim/)

## Konumlandırma

Sitenin tek argümanı var ve her bölüm onu taşıyor: piyasada **davetiye hazırlayan
ayrı, düğün fotoğrafı toplayan ayrı** hizmetler var; üçünü (davet + katılım + anı
havuzu) aynı linkte birleştiren taraf bu. "Üç ayrı iş, tek platform" bölümü sitenin
omurgası, çıkarılmamalı.

Yazım kuralı: **her bölüm tek fikir anlatır.** Metin kısa, görsel iş yapar. Bir
bölüme ikinci bir fikir eklemek gerekiyorsa yeni bölüm açılmalı.

## Tasarım dili

| | |
|---|---|
| Zemin | Krem `#f7f3ea`, koyu bölümlerde yıkık yeşil `#2f4237` |
| Aksan | Altın `#b08a3e` — tek aksan, başka renk eklenmemeli |
| Başlık | Cormorant Garamond 600 |
| Gövde | Jost 300/400/500 |
| Etiket | IBM Plex Mono, harf aralığı açık, büyük harf |

Tüm değerler `css/style.css` başındaki `:root` bloğunda. Renk değiştirmek için
orası yeterli; koyu ve krem bölümler aynı değişkenlerden besleniyor.

## Görseller

| Klasör | Ne | Kaynak |
|---|---|---|
| `assets/shots/` | Ürün ekranları: davetiye, program, katılım, galeri | **Kendi canlı davetiyenizden** çekildi (diji-davetim.vercel.app) |
| `assets/img/` | Atmosfer fotoğrafları | Unsplash — ticari kullanıma açık, atıf zorunlu değil |

Ürün ekranlarını yenilemek için canlı davetiyeyi telefon genişliğinde açıp ilgili
bölümün ekran görüntüsünü alıp aynı dosya adıyla değiştirmek yeterli.

## Canlı örnek bağlantısı — dikkat

Hero'daki **"Canlı örneği aç"** düğmesi ve alt bilgideki bağlantı
`https://diji-davetim.vercel.app/` adresine gidiyor; orada Dilara & Özkan örnek
davetiyesi yayında. **Tanıtım sitesini aynı adrese kurarsanız bu bağlantı kendine
döner.** O durumda örnek davetiyeyi ayrı bir alt alan adına (örn.
`ornek.diji-davetim.com`) taşıyıp bağlantıyı güncelleyin. Aynı adres
`<link rel="canonical">`, `og:url` ve JSON-LD içinde de geçiyor.

## Yapılacaklar — yayına almadan önce

1. ~~Fiyatlar~~ ✅ 500 / 1.000 / 1.500 ₺ girildi.
2. ~~WhatsApp numarası~~ ✅ `905424582012` girildi; hem HTML'e hem
   `js/script.js` içindeki `WA_NUMARA` değişkenine yazıldı, hazır mesaj metniyle.
3. **Referanslar.** "Gerçek düğünlerden" bölümündeki üç kart **yer tutucudur**
   (`quote--empty` sınıfı). Teslim ettiğiniz çiftlerden **izinli, gerçek** yorumları
   yazın ve `quote--empty` sınıfını kaldırın. Uydurma yorum yayınlamayın —
   hem yanıltıcı olur hem fark edildiğinde güveni bitirir.
4. **Sosyal paylaşım görseli.** `og:image` şu an `assets/img/hero.jpg` gösteriyor.
   İdeali 1200×630 özel bir kapak hazırlayıp `assets/og.jpg` olarak koymak.

## Yerelde çalıştırma

```
python -m http.server 8000
```

sonra `http://localhost:8000`.

## Yayınlama

Statik olduğu için Vercel, Netlify veya GitHub Pages'e olduğu gibi yüklenir;
build komutu gerekmez. Vercel'de "Other / No framework", output dizini kök.

## Koda dokunurken bilinmesi gerekenler

- **`.rv` sınıfı** "kaydırınca belirsin" demek. Efekt **opaklık değil yalnızca
  kaydırma** kullanıyor. Bilerek böyle: opaklık kullanılsaydı JS aksadığında ya da
  IntersectionObserver geç çalıştığında bölümler tamamen görünmez olurdu. Opaklığa
  çevirmeyin.
- **`[id]{scroll-margin-top:96px}`** sabit başlık içindir. Kaldırılırsa menüden
  atlanan bölümün başlığı başlığın altında kalır.
- **Hero paralaksı** yalnızca hero ekrandayken hesaplanır ve
  `prefers-reduced-motion` açıkken tamamen kapanır.
- **Sayaçlar** (`data-count`) hedef değeri HTML'de de taşır; JS çalışmazsa doğru
  sayı zaten görünür.
- `_yedek-orijinal/` eski siteyi tutuyor, güvenle silinebilir.
