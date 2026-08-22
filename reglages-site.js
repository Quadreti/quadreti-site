/* QuadretI — chargeur des réglages du site (panneau fondateur)
   Lit la table publique `reglages_site` (projet Supabase dédié, séparé des comptes app)
   et applique les réglages au chargement. Si la base ne répond pas en 3 s, ne fait
   RIEN : la page garde ses valeurs écrites en dur (aucun risque de page cassée).
   Intégration : <script src="reglages-site.js" defer></script> sur chaque page. */
(function () {
  'use strict';
  var SB_URL = 'https://dxpwkdzofwcxzolwdggp.supabase.co';
  var SB_KEY = 'sb_publishable_EKu_a0eDzPrlkf5W6CuBzg_cxZtSlab'; /* clé publique, sans risque côté client */

  var DEFAUTS = {
    couleurs: { theme: 'actuel', fond: '#F5F5F5', texte: '#2b353e', accent: '#e2725b', survol: '#cf6450' },
    polices: { titres: 'Quicksand', texte: 'Karla' }
  };

  /* Préréglage « Magazine Déco » : mêmes valeurs que le test validé visuellement,
     y compris le footer clair assorti au bandeau (demande fondateur). */
  var MAGAZINE = { fond: '#EFE8D8', texte: '#33302a', accent: '#c95a44', survol: '#b04a36' };
  var MAGAZINE_EXTRAS = [
    '.cta,.qz-cta{background:var(--terracotta,#c95a44)!important;color:#F8F4E9!important}',
    '.cta:hover,.qz-cta:hover{background:#b04a36!important}',
    '.qz-burger{background:#33302a}.qz-burger:hover{background:#141210}',
    '.qz-basdepage,.qz-reseaux,.qz-legal{background:#EFE8D8}',
    '.qz-basdepage{border-top:1px solid #33302a33}',
    '.qz-basdepage .qz-qlogo i.t{background:#33302a}',
    '.qz-basdepage .qz-wordmark{color:#33302a}',
    '.qz-baseline,.qz-reseaux .qz-sub,.qz-copy{color:#6b654f}',
    '.qz-reseaux .qz-accroche{color:#33302a}',
    '.qz-reseaux .qz-grid a{background:#c95a44;color:#F8F4E9}',
    '.qz-reseaux .qz-grid a:hover,.qz-reseaux .qz-grid a:focus-visible{background:#b04a36;color:#F8F4E9}',
    '.qz-legal a.qz-leg{background:#F0EADA;border:1px solid #33302a33}',
    '.qz-legal a.qz-leg span{color:#33302a}',
    '.qz-legal .qz-picto{color:#6b654f}',
    '.qz-legal a.qz-leg:hover,.qz-legal a.qz-leg:focus-visible{background:#b04a36;border-color:#b04a36}',
    '.qz-legal a.qz-leg:hover span,.qz-legal a.qz-leg:hover .qz-picto{color:#F8F4E9}',
    '.qz-fab{background:#33302a;border-color:#33302a40}.qz-fab svg{stroke:#EFE8D8}',
    '.qz-fab:hover,.qz-fab:focus-visible{background:#b04a36;border-color:#b04a36}'
  ].join('\n');

  function injecterStyle(id, css) {
    var el = document.getElementById(id);
    if (!el) { el = document.createElement('style'); el.id = id; document.head.appendChild(el); }
    el.textContent = css;
  }

  function appliquerCouleurs(c) {
    if (!c) return;
    var v = {};
    if (c.theme === 'magazine') {
      v = { fond: MAGAZINE.fond, texte: MAGAZINE.texte, accent: MAGAZINE.accent, survol: MAGAZINE.survol };
    }
    /* les couleurs individuelles priment sur le préréglage */
    ['fond', 'texte', 'accent', 'survol'].forEach(function (k) {
      if (c[k] && c[k] !== DEFAUTS.couleurs[k]) v[k] = c[k];
    });
    if (!Object.keys(v).length && c.theme !== 'magazine') return;
    var fond = v.fond || DEFAUTS.couleurs.fond;
    var texte = v.texte || DEFAUTS.couleurs.texte;
    var accent = v.accent || DEFAUTS.couleurs.accent;
    var survol = v.survol || DEFAUTS.couleurs.survol;
    var css = ':root{' +
      '--fond:' + fond + ';--charbon:' + texte + ';--terracotta:' + accent + ';' +
      '--qz-clair:' + fond + ';--qz-charbon:' + texte + ';--qz-terracotta:' + accent + ';' +
      '}\nbody{background:' + fond + ';color:' + texte + '}' +
      '\na:hover .qz-picto{color:inherit}';
    if (c.theme === 'magazine') css += '\n' + MAGAZINE_EXTRAS;
    else css += '\n.cta:hover,.qz-cta:hover{background:' + survol + '!important}';
    injecterStyle('qz-reglages-couleurs', css);
  }

  function appliquerPolices(p) {
    if (!p) return;
    var titres = p.titres || DEFAUTS.polices.titres;
    var texte = p.texte || DEFAUTS.polices.texte;
    if (titres === DEFAUTS.polices.titres && texte === DEFAUTS.polices.texte) return;
    var familles = [];
    [titres, texte].forEach(function (f) {
      if (f !== 'Quicksand' && f !== 'Karla' && familles.indexOf(f) < 0) familles.push(f);
    });
    if (familles.length) {
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?' + familles.map(function (f) {
        return 'family=' + encodeURIComponent(f) + ':wght@400;500;600;700';
      }).join('&') + '&display=swap';
      document.head.appendChild(l);
    }
    injecterStyle('qz-reglages-polices',
      'body,p,li,a,input,button,textarea{font-family:\'' + texte + '\',sans-serif}' +
      'h1,h2,h3,h4,.qz-wordmark,.qz-cat,.cta,.qz-cta{font-family:\'' + titres + '\',sans-serif}');
  }

  function texte(sel, val) {
    if (!val) return;
    var el = document.querySelector(sel);
    if (el) el.textContent = val;
  }

  function appliquerBaselines(b) {
    if (!b) return;
    texte('.qz-baseline', b.produit);
    texte('.qz-cat', b.categorie);
  }

  function appliquerReseaux(r) {
    if (!r) return;
    ['Facebook', 'Snapchat', 'TikTok', 'YouTube', 'WhatsApp'].forEach(function (nom) {
      var url = r[nom.toLowerCase()];
      if (!url) return;
      var a = document.querySelector('.qz-reseaux .qz-grid a[aria-label="' + nom + '"]');
      if (a) a.setAttribute('href', url);
    });
  }

  function appliquerCopyright(c) {
    if (c) texte('.qz-copy', c.texte);
  }

  function appliquerSections(s) {
    if (!s) return;
    Object.keys(s).forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return; /* les autres pages ignorent les sections de l'accueil */
      var d = s[id] || {};
      if (d.titre) { var h = sec.querySelector('h2'); if (h) h.textContent = d.titre; }
      if (d.texte) { var p = sec.querySelector('p'); if (p) p.textContent = d.texte; }
    });
  }

  function appliquerPhotos(ph) {
    if (!ph) return;
    var imgs = document.querySelectorAll('.bg-slides .shot');
    Object.keys(ph).forEach(function (n) {
      var i = parseInt(n, 10) - 1;
      if (!ph[n] || !imgs[i]) return;
      if (imgs[i].hasAttribute('data-src')) imgs[i].setAttribute('data-src', ph[n]);
      else imgs[i].src = ph[n];
    });
  }

  var ctl = ('AbortController' in window) ? new AbortController() : null;
  var minuteur = setTimeout(function () { if (ctl) ctl.abort(); }, 3000);
  fetch(SB_URL + '/rest/v1/reglages_site?select=cle,valeur', {
    headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY },
    signal: ctl ? ctl.signal : undefined
  }).then(function (r) { return r.ok ? r.json() : []; })
    .then(function (lignes) {
      var g = {};
      (lignes || []).forEach(function (l) { g[l.cle] = l.valeur; });
      appliquerCouleurs(g.couleurs);
      appliquerPolices(g.polices);
      appliquerBaselines(g.baselines);
      appliquerReseaux(g.reseaux);
      appliquerCopyright(g.copyright);
      appliquerSections(g.sections_accueil);
      appliquerPhotos(g.photos_diaporama);
    })
    .catch(function () { /* hors ligne ou lent : la page garde ses valeurs en dur */ })
    .then(function () { clearTimeout(minuteur); });
})();
