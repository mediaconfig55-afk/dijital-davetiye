# Dijital Davetiye — Tanıtım Sitesi

QR'lı dijital düğün davetiyesi hizmetini anlatan, etkileşimli 3D sahneli tek sayfalık tanıtım sitesi.

Instagram: [@dijital_davetimm](https://www.instagram.com/dijital_davetimm/)

## İçerik

- `index.html` — sayfanın tamamı (hero, özellikler, nasıl çalışır, ortak galeri, örnekler, iletişim)
- `css/style.css` — tüm görsel tasarım
- `js/script.js` — mobil menü, header scroll efekti, 3D sahne mantığı (Three.js kütüphanesi CDN üzerinden `index.html` içinde yükleniyor)
- `assets/favicon.svg` — sekme ikonu

## Yerelde çalıştırma

Herhangi bir build aracı gerekmez, düz statik dosyalardır. Örneğin:

```
python3 -m http.server 8000
```

sonra tarayıcıda `http://localhost:8000` adresini açın.

## GitHub Pages ile yayınlama

1. Bu klasördeki dosyaları GitHub reponuza yükleyin (kök dizine).
2. Repo **Settings → Pages** sayfasından "Deploy from a branch", branch olarak `main` ve klasör olarak `/ (root)` seçin.
3. Birkaç dakika içinde siteniz `https://<kullanici-adiniz>.github.io/<repo-adi>/` adresinde yayında olur.

## İçeriği güncellemek

- Metinleri değiştirmek için `index.html` içindeki ilgili bölümü düzenleyin.
- Renkleri değiştirmek için `css/style.css` dosyasının en üstündeki `:root` değişkenlerini güncelleyin.
- 3D sahnedeki davetiye kartındaki isim/tarih bilgisini değiştirmek için `js/script.js` içindeki `makeInviteTexture()` fonksiyonuna bakın.

