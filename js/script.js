/* ==========================================================================
   Diji Davetim — arayüz davranışları
   Bağımlılık yok. Her davranış ilerlemeli: JS çalışmazsa sayfa okunur kalır.
   ========================================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobil menü ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Menüyü aç");
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- başlık: hero'dan çıkınca katılaşsın ---------- */
  var hdr = document.getElementById("hdr");
  var heroImg = document.getElementById("heroImg");

  function onScroll() {
    var y = window.scrollY;
    if (hdr) hdr.classList.toggle("stuck", y > 60);
    // hero görselinde hafif paralaks — yalnızca hero ekrandayken hesaplanır
    if (heroImg && !reduce && y < window.innerHeight) {
      heroImg.style.transform = "scale(1.08) translateY(" + (y * 0.16) + "px)";
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- SSS akordiyonu ---------- */
  var faq = document.getElementById("faq");
  if (faq) {
    faq.addEventListener("click", function (e) {
      var btn = e.target.closest(".faq__q");
      if (!btn) return;
      var item = btn.parentElement;
      // aynı anda tek soru açık kalsın
      if (!item.classList.contains("on")) {
        faq.querySelectorAll(".faq__i.on").forEach(function (o) {
          o.classList.remove("on");
          o.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        });
      }
      var open = item.classList.toggle("on");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- görünüme girince belirme ---------- */
  var reveals = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window) || reduce) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  }

  /* ---------- sayaç animasyonu ----------
     data-count taşıyan öğeler ekrana girince 0'dan hedefe sayar.
     Hedef değer HTML'de de yazılı; JS çalışmazsa doğru sayı zaten görünür. */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        cio.unobserve(el);
        var hedef = parseInt(el.getAttribute("data-count"), 10);
        if (isNaN(hedef)) return;
        var sure = 1400, bas = performance.now();
        var adim = function (t) {
          var p = Math.min((t - bas) / sure, 1);
          var e = 1 - Math.pow(1 - p, 3);           // yumuşak yavaşlama
          el.textContent = Math.round(hedef * e);
          if (p < 1) requestAnimationFrame(adim);
        };
        el.textContent = "0";
        requestAnimationFrame(adim);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  }

  /* ---------- yıl ---------- */
  var yil = document.getElementById("yil");
  if (yil) yil.textContent = new Date().getFullYear();

  /* ---------- WhatsApp ----------
     WA_NUMARA'yı ülke koduyla, + ve boşluk olmadan yaz: "905XXXXXXXXX".
     Boş kaldığı sürece düğmeler Instagram'a gider; kırık bağlantı oluşmaz. */
  var WA_NUMARA = "905424582012";
  var WA_MESAJ = "Merhaba, dijital davetiye hakkında bilgi almak istiyorum. " +
                 "Etkinlik türü: ... Tarih: ...";

  if (WA_NUMARA) {
    var href = "https://wa.me/" + WA_NUMARA + "?text=" + encodeURIComponent(WA_MESAJ);
    [document.getElementById("waBtn"), document.getElementById("waCard")]
      .forEach(function (el) { if (el) el.href = href; });
  } else {
    var b = document.getElementById("waBtn");
    if (b) b.querySelector("span").textContent = "Instagram'dan yaz";
    var c = document.getElementById("waCard");
    if (c) {
      c.querySelector("b").textContent = "Instagram";
      c.querySelector("strong").textContent = "@diji_davetim";
    }
  }
})();
