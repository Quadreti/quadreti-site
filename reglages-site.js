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

    /* Zones fines (facultatives) : absentes = suivent le thème global.
       Ajoutées EN DERNIER pour primer sur le préréglage Magazine. */
    if (c.cartouches) css += '\n.qz-legal a.qz-leg{background:' + c.cartouches + '}';
    if (c.bouton) css += '\n.cta,.qz-cta{background:' + c.bouton + '!important}';
    if (c.menu) css += '\n.qz-header{background:' + c.menu + '}';
    if (c.logo) css += '\n.qz-header .qz-qlogo i.t{background:' + c.logo + '}\n.qz-header .qz-wordmark{color:' + c.logo + '}';
    if (c.boutiqueFond && /\/boutique\//.test(location.pathname)) css += '\nbody{background:' + c.boutiqueFond + '}';
    if (c.carte) css += '\n.step{background:' + c.carte + '!important}';
    if (c.encartFond) css += '\n:root{--olive-soft:' + c.encartFond + '}';
    if (c.encartTexte) css += '\n:root{--olive:' + c.encartTexte + '}';
    if (c.enumeration) css += '\n.step .num{background:' + c.enumeration + '}';
    if (c.titres) css += '\nh2,h3{color:' + c.titres + '}';
    if (c.texteDoux) css += '\n.blk p.lead,.story .txt p,.step p,.how-foot,.mode p,.app-reassure,' +
      '.scal-foot,.change li,.gamme-notes,.premium p,.gift p,.trust-card>p,.trust-card li,.qa .a p{color:' + c.texteDoux + '}';
    injecterStyle('qz-reglages-couleurs', css);
  }

  function appliquerSeo(s) {
    if (!s) return;
    if (s.titre) document.title = s.titre;
    if (s.description) {
      var m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
      m.content = s.description;
    }
    if (s.favicon) {
      var liens = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
      if (!liens.length) {
        var l = document.createElement('link'); l.rel = 'icon'; document.head.appendChild(l); liens = [l];
      }
      liens.forEach(function (l) { l.href = s.favicon; });
    }
  }

  function appliquerDisposition(d) {
    if (!d || !d.heroCta || d.heroCta === 'centre') return;
    var css = d.heroCta === 'gauche'
      ? '.hero-cta{left:26px;transform:none}'
      : '.hero-cta{left:auto;right:26px;transform:none}';
    injecterStyle('qz-reglages-disposition', css);
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

  function appliquerBandeau(b) {
    if (!b) return;
    var track = document.querySelector('.ticker-track');
    if (!track) return; /* pages sans bandeau défilant */
    if (b.messages && b.messages.length) {
      track.textContent = '';
      /* contenu doublé : nécessaire au défilement sans coupure (translation de -50 %) */
      for (var tour = 0; tour < 2; tour++) {
        b.messages.forEach(function (m) {
          if (!m) return;
          var s = document.createElement('span');
          s.textContent = m;
          track.appendChild(s);
        });
      }
    }
    var css = '';
    if (b.fond) css += '.ticker{background:' + b.fond + '}';
    if (b.texte) css += '.ticker{color:' + b.texte + '}.ticker-track span{border-right-color:' + b.texte + '38}';
    if (b.vitesse) css += '.ticker-track{animation-duration:' + b.vitesse + 's}';
    if (css) injecterStyle('qz-reglages-bandeau', css);
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

  var CLE_POPUP_VUE = 'quadretiPopupVue';

  function appliquerPopup(p) {
    if (!p || !p.actif) return;
    if (!p.titre && !p.texte) return; /* rien à montrer */
    try { if (localStorage.getItem(CLE_POPUP_VUE)) return; } catch (e) {}

    var fond = p.fond || '#F2EEDF';
    var texte = p.texte_couleur || '#2b353e';
    var bouton = p.bouton || '#e2725b';

    injecterStyle('qz-popup-style', [
      '.qz-popup-fond{position:fixed;inset:0;background:#000000a6;z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .25s ease;pointer-events:none}',
      '.qz-popup-fond.qz-on{opacity:1;pointer-events:auto}',
      '.qz-popup-carte{position:relative;max-width:420px;width:100%;background:' + fond + ';color:' + texte + ';border-radius:16px;padding:28px 26px 26px;box-shadow:0 20px 50px #00000055;transform:translateY(12px);transition:transform .25s ease;font-family:\'Karla\',sans-serif}',
      '.qz-popup-fond.qz-on .qz-popup-carte{transform:translateY(0)}',
      '.qz-popup-fermer{position:absolute;top:10px;right:10px;width:30px;height:30px;border-radius:50%;border:none;background:#00000014;color:' + texte + ';font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center}',
      '.qz-popup-fermer:hover{background:#00000028}',
      '.qz-popup-img{width:100%;max-height:160px;object-fit:cover;border-radius:10px;margin-bottom:14px}',
      '.qz-popup-titre{font-family:\'Quicksand\',sans-serif;font-weight:700;font-size:19px;margin:0 0 8px}',
      '.qz-popup-texte{font-size:13.5px;line-height:1.5;margin:0 0 16px;opacity:.92}',
      '.qz-popup-form{display:flex;gap:8px;flex-wrap:wrap}',
      '.qz-popup-form input[type=email]{flex:1;min-width:160px;padding:10px 12px;border-radius:9px;border:1px solid #00000022;font:inherit;font-size:13.5px}',
      '.qz-popup-form button{background:' + bouton + ';color:#fff;border:none;border-radius:9px;padding:10px 16px;font-weight:700;font-size:13px;cursor:pointer;white-space:nowrap}',
      '.qz-popup-form button:hover{filter:brightness(.92)}',
      '.qz-popup-merci{font-size:13.5px;font-weight:600;display:none}',
      '.qz-popup-fond.qz-envoye .qz-popup-form{display:none}',
      '.qz-popup-fond.qz-envoye .qz-popup-merci{display:block}'
    ].join('\n'));

    var fond_el = document.createElement('div');
    fond_el.className = 'qz-popup-fond';
    fond_el.innerHTML =
      '<div class="qz-popup-carte">' +
        '<button class="qz-popup-fermer" aria-label="Fermer" type="button">&times;</button>' +
        (p.image ? '<img class="qz-popup-img" src="' + p.image + '" alt="">' : '') +
        (p.titre ? '<p class="qz-popup-titre"></p>' : '') +
        (p.texte ? '<p class="qz-popup-texte"></p>' : '') +
        '<form class="qz-popup-form">' +
          '<input type="email" required placeholder="Votre email">' +
          '<button type="submit">' + (p.bouton_texte || 'Je m’inscris') + '</button>' +
        '</form>' +
        '<p class="qz-popup-merci">Merci ! C’est enregistré.</p>' +
      '</div>';
    if (p.titre) fond_el.querySelector('.qz-popup-titre').textContent = p.titre;
    if (p.texte) fond_el.querySelector('.qz-popup-texte').textContent = p.texte;
    document.body.appendChild(fond_el);

    function fermer() {
      fond_el.classList.remove('qz-on');
      try { localStorage.setItem(CLE_POPUP_VUE, '1'); } catch (e) {}
      setTimeout(function () { fond_el.remove(); }, 300);
    }
    fond_el.querySelector('.qz-popup-fermer').addEventListener('click', fermer);
    fond_el.addEventListener('click', function (e) { if (e.target === fond_el) fermer(); });
    fond_el.querySelector('.qz-popup-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var email = fond_el.querySelector('input[type=email]').value.trim();
      var btn = fond_el.querySelector('button[type=submit]');
      btn.disabled = true;
      fetch(SB_URL + '/rest/v1/abonnes_popup', {
        method: 'POST',
        headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ email: email })
      }).then(function () {
        fond_el.classList.add('qz-envoye');
        try { localStorage.setItem(CLE_POPUP_VUE, '1'); } catch (e) {}
        setTimeout(fermer, 2200);
      }).catch(function () { btn.disabled = false; });
    });

    setTimeout(function () { fond_el.classList.add('qz-on'); }, (p.delai || 4) * 1000);
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
      appliquerBandeau(g.bandeau);
      appliquerDisposition(g.disposition);
      appliquerSeo(g.seo);
      appliquerPopup(g.popup);
    })
    .catch(function () { /* hors ligne ou lent : la page garde ses valeurs en dur */ })
    .then(function () { clearTimeout(minuteur); });
})();
