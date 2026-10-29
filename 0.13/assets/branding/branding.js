// Branding page (docs/14-branding.md): draws logo B8 and the "full set" viewer.
// Runs only on pages that contain [data-brand] elements; does nothing elsewhere.
// Palettes: d = dark, l = light, n = neutral, a = accent. Keep in sync with the palette table on the branding page.
(function () {
  const PALETTES = [
    { name: "Pine & Copper", d: "#2F4A3F", l: "#E9EEEA", n: "#D8C6A6", a: "#B07A4E",
      en: "Alpine forest, warm wood. Calm, natural, very Swiss.",
      ru: "Альпийский лес и тёплое дерево. Спокойно, натурально, очень по-швейцарски." },
    { name: "Glacier", d: "#2C4656", l: "#EAF0F2", n: "#C9C6BD", a: "#B9876A",
      en: "Cool lake and glacier blue with stone. Fresh, clean, a bit clinical.",
      ru: "Холодный голубой цвет озера и ледника с камнем. Свежо и чисто, немного клинически." },
    { name: "Nude & Clay", d: "#3E2F28", l: "#F5EEE7", n: "#E2CBB9", a: "#B5694B",
      en: "Warm skin tones and terracotta. The most “beauty salon”; feminine and cosy.",
      ru: "Тёплые телесные оттенки и терракота. Больше всего похоже на бьюти-салон: женственно и уютно." },
    { name: "Sage & Blush", d: "#46564A", l: "#F6F2EC", n: "#E6CFC5", a: "#A9875A",
      en: "Soft herb green and powder pink. Gentle, natural, wellness.",
      ru: "Мягкий травяной зелёный и пудрово-розовый. Нежно, натурально, велнес." },
    { name: "Alpine Night", d: "#1F2B3A", l: "#F5F3EF", n: "#E2C2BA", a: "#C4A37A",
      en: "Night-blue sky with rose and champagne. Elegant and premium, fits Gstaad.",
      ru: "Ночное синее небо с розовым и цветом шампанского. Элегантно и премиально, подходит для Gstaad." },
    { name: "Stone & Lavender", d: "#3D3E4C", l: "#F1EFF3", n: "#CFC7DC", a: "#8E7BA6",
      en: "Slate grey with lavender. Quiet, relaxing, a little unusual.",
      ru: "Сланцево-серый с лавандой. Тихо, расслабляюще, немного необычно." },
    { name: "Chalet Wood", d: "#4A3628", l: "#F4EFE7", n: "#DCCDB5", a: "#5E7A55",
      en: "Walnut, linen and a touch of forest green. Warm, cosy, like an Alpine chalet.",
      ru: "Орех, лён и немного лесного зелёного. Тепло и уютно, как в альпийском шале." },
    { name: "Mineral Spa", d: "#1F4D4F", l: "#EDF4F2", n: "#BFD6D2", a: "#C98E66",
      en: "Deep teal, mineral water and warm sand. Fresh, wellness, thermal-bath feeling.",
      ru: "Глубокий бирюзовый, минеральная вода и тёплый песок. Свежо, велнес, ощущение термальных ванн." },
    { name: "Rosé", d: "#5B3B45", l: "#F8F1F1", n: "#E9CFD2", a: "#B98B5E",
      en: "Berry, dusty rose and gold. The most feminine palette; soft and caring.",
      ru: "Ягодный, пыльная роза и золото. Самая женственная палитра: мягко и заботливо." },
    { name: "Snow & Charcoal", d: "#262626", l: "#FAFAF8", n: "#DEDCD7", a: "#9C8B74",
      en: "Almost black and white with a warm taupe. Minimal, luxury, timeless.",
      ru: "Почти чёрно-белая с тёплым серо-бежевым. Минимализм, люкс, вне времени." },
    { name: "Edelweiss", d: "#4B5132", l: "#F7F4EA", n: "#DAD8CC", a: "#C49A3C",
      en: "Olive, cream and mountain-flower yellow. Natural, local, a bit rustic.",
      ru: "Оливковый, кремовый и жёлтый, как горные цветы. Натурально, по-местному, немного по-деревенски." },
    { name: "Gentian", d: "#23356B", l: "#F5F6FA", n: "#CBD3E8", a: "#C9A55C",
      en: "Deep gentian blue with powder blue and gold. Crisp, Swiss, confident.",
      ru: "Глубокий синий цвет горечавки с пудрово-голубым и золотом. Чётко, по-швейцарски, уверенно." },
  ];

  // The palette chosen on 2026-10-29: the logo preview uses it and the viewer opens on it.
  const CHOSEN = PALETTES.findIndex(p => p.name === "Mineral Spa");

  const T = {
    en: { prev: "Previous palette", next: "Next palette", contrast: "Text contrast", low: "too low for body text",
      logo: "Logo on light and dark", site: "Website", ig: "Instagram", gbp: "Google Business Profile",
      voucher: "Gift voucher (front and back)", card: "Business card (front and back)",
      keys: "Tip: the ← and → keys also switch the palette.", chosen: "✓ chosen",
      note: "Address, phone, prices, ratings and follower numbers are placeholders. Instagram and Google keep their own white app design; only the logo, photos and posts carry the palette." },
    ru: { prev: "Предыдущая палитра", next: "Следующая палитра", contrast: "Контраст текста", low: "слишком низкий для основного текста",
      logo: "Логотип на светлом и тёмном фоне", site: "Сайт", ig: "Instagram", gbp: "Google Business Profile",
      voucher: "Подарочный сертификат (лицевая и обратная сторона)", card: "Визитка (лицевая и обратная сторона)",
      keys: "Подсказка: клавиши ← и → тоже переключают палитру.", chosen: "✓ выбрана",
      note: "Адрес, телефон, цены, оценки и число подписчиков — заглушки. Instagram и Google сохраняют свой белый дизайн приложения; цвета палитры видны только в логотипе, фото и публикациях." },
  };

  // Logo B8: a woman lying on the massage table, mountains behind her, the table below.
  const B8 = '<svg class="bmk" viewBox="0 0 200 96" aria-hidden="true">' +
    '<path d="M70 40 L92 14 L104 28 L112 20 L134 42" fill="none" stroke="var(--flow, currentColor)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="22" cy="54" r="9" fill="none" stroke="currentColor" stroke-width="4.5"/>' +
    '<path d="M36 64 C42 54 52 50 64 52 C78 54 84 66 98 66 C112 66 120 48 136 48 C152 48 160 60 174 64 C184 67 190 68 196 70" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M8 84 L194 84" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
  const LOCKUP = '<span class="blk">' + B8 + '<span class="blk-t"><span class="blk-a">Alpform <i>&amp; Flow</i></span><span class="blk-b">Massage · Saanen</span></span></span>';

  function lum(hex) {
    const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  const contrast = (x, y) => { const [a, b] = [lum(x), lum(y)].sort((p, q) => q - p); return (a + 0.05) / (b + 0.05); };
  const textOn = hex => lum(hex) > 0.35 ? "#1D1D1D" : "#FFFFFF";
  const vars = p => `--d:${p.d};--l:${p.l};--n:${p.n};--a:${p.a}`;

  function setHTML(p, t) {
    const aInk = textOn(p.a);
    return `
    <div class="bs-item bs-wide"><div class="bs-lbl">${t.logo}</div>
      <div class="bs-duo"><div class="on-l">${LOCKUP}</div><div class="on-d">${LOCKUP}</div></div></div>
    <div class="bs-item bs-wide"><div class="bs-lbl">${t.site}</div><div class="bs-frame bs-site">
      <div class="bs-chrome"><i></i><i></i><i></i><span>alpformflow.ch</span></div>
      <div class="bs-head">${LOCKUP}<span class="bs-nav"><span>Treatments</span><span>Prices</span><span>About</span><span>Contact</span></span><span class="bs-bt d">Book</span></div>
      <div class="bs-hero"><div><div class="bs-ey">Saanen · Gstaad</div><div class="bs-h">Anti-cellulite massage in Saanen</div>
        <div class="bs-txt">Firmer, smoother-looking skin with a manual massage in a calm studio. Sessions in German, English, French and Italian.</div>
        <div class="bs-row"><span class="bs-bt d">Book a session</span><span class="bs-bt o">WhatsApp</span></div></div>
        <div class="bs-img">${B8}</div></div>
      <div class="bs-prices"><div><b>Trial session</b><span>45 min</span><em>CHF 90</em></div><div><b>Anti-cellulite massage</b><span>60 min</span><em>CHF 130</em></div><div><b>Package of 5</b><span>5 × 60 min</span><em>CHF 600</em></div></div>
    </div></div>
    <div class="bs-item"><div class="bs-lbl">${t.ig}</div><div class="bs-frame bs-app"><div class="bs-ig">
      <div class="bs-ig-top">alpformflow</div>
      <div class="bs-ig-head"><div class="bs-av">${B8}</div><div class="bs-stats"><div><b>24</b>posts</div><div><b>310</b>followers</div><div><b>85</b>following</div></div></div>
      <div class="bs-bio"><b>Alpform &amp; Flow Massage</b><span class="c">Massage service</span><span>Anti-cellulite massage in Saanen 🏔</span><span>DE · EN · FR · IT · Book online ↓</span><span class="lnk">alpformflow.ch</span></div>
      <div class="bs-btns"><span class="f">Follow</span><span>Message</span><span>Contact</span></div>
      <div class="bs-hl">${["Prices", "Studio", "How it works", "Vouchers"].map(x => `<div><i>${B8}</i>${x}</div>`).join("")}</div>
      <div class="bs-grid">
        <div style="background:var(--d);color:var(--l)" class="q">Where form meets flow.</div>
        <div style="background:var(--n);color:var(--d);--flow:var(--a)">${B8}</div>
        <div style="background:var(--a);color:${aInk}">CHF 130<br>60 MIN</div>
        <div style="background:var(--l);color:var(--d);--flow:var(--a)">${B8}</div>
        <div style="background:var(--d);color:var(--n)">BOOK<br>ONLINE</div>
        <div style="background:var(--n);color:var(--d)" class="q">Alpine care for your skin.</div>
      </div></div></div></div>
    <div class="bs-item"><div class="bs-lbl">${t.gbp}</div><div class="bs-frame bs-app bs-gbp">
      <div class="bs-photos"><div class="p1">${B8}</div><div class="side"><div></div><div></div></div></div>
      <div class="bs-gbody"><div class="nm">Alpform &amp; Flow Massage</div>
        <div class="sub">5.0 ★★★★★ (12) · Massage spa in Saanen</div>
        <div class="acts"><div class="bk"><i>📅</i>Book</div><div><i>➤</i>Directions</div><div><i>🌐</i>Website</div><div><i>✆</i>Call</div></div>
        <div class="r"><span>⌖</span><span>Dorfstrasse 6, 3792 Saanen</span></div>
        <div class="r"><span>◷</span><span><span class="g">Open</span> · Closes 19:00</span></div>
        <div class="r"><span>🌐</span><span>alpformflow.ch</span></div>
        <div class="r"><span>✆</span><span>033 000 00 00</span></div></div></div></div>
    <div class="bs-item bs-wide"><div class="bs-lbl">${t.voucher}</div><div class="bs-two">
      <div class="bs-vch f">${LOCKUP}<div class="gv">Gift voucher<small>Geschenkgutschein · Bon cadeau · Buono regalo</small></div><div class="amt"><span>Anti-cellulite massage · 60 min</span><b>CHF 130</b></div></div>
      <div class="bs-vch b"><div class="ln"><div>For</div><div>From</div><div>Valid until</div></div><div class="ft"><span>Dorfstrasse 6 · 3792 Saanen</span><span>alpformflow.ch</span><span>No. 0001</span></div></div>
    </div></div>
    <div class="bs-item bs-wide"><div class="bs-lbl">${t.card}</div><div class="bs-two">
      <div class="bs-bc f">${LOCKUP}</div>
      <div class="bs-bc b"><b>[Therapist name]</b><span class="role">Massage therapist</span><span>+41 79 000 00 00</span><span>hello@alpformflow.ch</span><span>alpformflow.ch</span><span>Dorfstrasse 6 · 3792 Saanen</span></div>
    </div></div>
    <div class="bs-note">${t.note}</div>`;
  }

  function initLogo(el) {
    el.innerHTML = `<div class="bs-duo" style="${vars(PALETTES[CHOSEN])}"><div class="on-l">${LOCKUP}</div><div class="on-d">${LOCKUP}</div></div>
      <div class="bs-uses" style="${vars(PALETTES[CHOSEN])}"><div><span class="bs-u-av">${B8}</span>Profile picture</div><div><span class="bs-u-fav">${B8}</span>Browser icon</div><div><span class="bs-u-st">${B8}</span>Voucher stamp</div></div>`;
  }

  function initSet(el) {
    const lang = (document.documentElement.lang || "en").slice(0, 2) === "ru" ? "ru" : "en";
    const t = T[lang];
    let cur = 0;
    el.innerHTML = `<div class="bs-bar">
        <button type="button" class="bs-step" data-step="-1" aria-label="${t.prev}">←</button>
        <div class="bs-title"><b class="bs-name"></b><span class="bs-chosen"></span><span class="bs-count"></span><span class="bs-mood"></span><span class="bs-cr"></span></div>
        <button type="button" class="bs-step" data-step="1" aria-label="${t.next}">→</button>
      </div>
      <div class="bs-pick" role="group">${PALETTES.map((p, i) => `<button type="button" data-i="${i}" title="${p.name}" aria-label="${p.name}" style="${vars(p)}"><i></i><i></i><i></i><i></i></button>`).join("")}</div>
      <div class="bs-keys">${t.keys}</div>
      <div class="bs-body"></div>`;
    const body = el.querySelector(".bs-body");
    function show(i) {
      cur = (i + PALETTES.length) % PALETTES.length;
      const p = PALETTES[cur], cr = contrast(p.d, p.l);
      el.querySelector(".bs-name").textContent = p.name;
      el.querySelector(".bs-chosen").textContent = cur === CHOSEN ? ` ${t.chosen}` : "";
      el.querySelector(".bs-count").textContent = ` ${cur + 1} / ${PALETTES.length}`;
      el.querySelector(".bs-mood").textContent = p[lang];
      el.querySelector(".bs-cr").textContent = `${t.contrast} ${cr.toFixed(1)}:1 ${cr >= 4.5 ? "✓" : "– " + t.low} · ${[p.d, p.l, p.n, p.a].join(" ")}`;
      el.querySelectorAll(".bs-pick button").forEach((b, j) => b.setAttribute("aria-pressed", j === cur));
      body.setAttribute("style", vars(p));
      body.innerHTML = setHTML(p, t);
    }
    el.addEventListener("click", e => {
      const st = e.target.closest("[data-step]"), pk = e.target.closest("[data-i]");
      if (st) show(cur + Number(st.dataset.step));
      if (pk) show(Number(pk.dataset.i));
    });
    document.addEventListener("keydown", e => {
      const tg = e.target instanceof Element ? e.target : null;
      if ((tg && tg.closest("input, textarea, select, [contenteditable]")) || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowRight") show(cur + 1);
      if (e.key === "ArrowLeft") show(cur - 1);
    });
    show(CHOSEN);
  }

  function init() {
    document.querySelectorAll('[data-brand="logo"]').forEach(initLogo);
    document.querySelectorAll('[data-brand="set"]').forEach(initSet);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
