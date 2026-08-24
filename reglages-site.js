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
    '.cta{background:var(--terracotta,#c95a44)!important;color:#F8F4E9!important}',
    '.cta:hover{background:#b04a36!important}',
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
    if (c.bouton) css += '\n.cta{background:' + c.bouton + '!important}';
    if (c.menu) css += '\n.qz-header{background:' + c.menu + '}';
    if (c.logo) css += '\n.qz-header .qz-qlogo i.t{background:' + c.logo + '}\n.qz-header .qz-wordmark{color:' + c.logo + '}';
    if (c.boutiqueFond && /\/boutique\//.test(location.pathname)) css += '\nbody{background:' + c.boutiqueFond + '}';
    if (c.carte) css += '\n.step,.reason,.c-form-compact{background:' + c.carte + '!important}';
    if (c.encartFond) css += '\n:root{--olive-soft:' + c.encartFond + '}';
    if (c.encartTexte) css += '\n:root{--olive:' + c.encartTexte + '}';
    if (c.enumeration) css += '\n.step .num,.reason .ic{background:' + c.enumeration + '}';
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
      var href = 'https://fonts.googleapis.com/css2?' + familles.map(function (f) {
        return 'family=' + encodeURIComponent(f) + ':wght@400;500;600;700';
      }).join('&') + '&display=swap';
      if (!document.querySelector('link[href="' + href + '"]')) {
        var l = document.createElement('link');
        l.rel = 'stylesheet'; l.href = href;
        document.head.appendChild(l);
      }
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
      if (d.titre) { var h = sec.querySelector('h2') || sec.querySelector('h1'); if (h) h.textContent = d.titre; }
      if (d.texte) { var p = sec.querySelector('p'); if (p) p.textContent = d.texte; }
    });
  }

  function appliquerPageContact(pc) {
    if (!pc) return;
    if (!/(^|\/)contact\.html$/.test(location.pathname)) return; /* les autres pages ignorent ces textes */
    texte('#contactHeroTitre', pc.titre);
    texte('#contactHeroLead', pc.accroche);
    ['raison1', 'raison2', 'raison3', 'raison4'].forEach(function (cle, i) {
      var d = pc[cle];
      if (!d) return;
      var n = i + 1;
      texte('#reason' + n + ' h3', d.titre);
      texte('#reason' + n + ' p', d.texte);
    });
  }

  function appliquerPageColoriages(pc) {
    if (!pc) return;
    if (!/\/coloriages\/(index\.html)?$/.test(location.pathname)) return; /* seule la page bibliothèque */
    texte('#coloriagesTitre', pc.titre);
    texte('#coloriagesLead', pc.accroche);
  }

  function appliquerBandeauVideo(cfg) {
    cfg = cfg || {};
    var hero = document.getElementById('hero');
    if (hero) {
      hero.classList.toggle('voile-actif', !!cfg.voile);
      if (window.__reglerBandeauVideo) {
        window.__reglerBandeauVideo(
          typeof cfg.vitesse === 'number' ? cfg.vitesse : undefined,
          typeof cfg.pause_ms === 'number' ? cfg.pause_ms : undefined,
          typeof cfg.actif === 'boolean' ? cfg.actif : undefined,
          typeof cfg.pos_x === 'number' ? cfg.pos_x : undefined,
          typeof cfg.pos_y === 'number' ? cfg.pos_y : undefined
        );
      }
    }
    appliquerPositionTicker(cfg.position_ticker);
  }

  function appliquerPositionTicker(position) {
    var ticker = document.querySelector('.ticker');
    if (!ticker || !position) return; /* pages sans bandeau defilant, ou reglage absent = position deja correcte dans le HTML */
    if (position === 'aucun') { ticker.style.display = 'none'; return; }
    ticker.style.display = '';
    if (position === 'haut') {
      document.body.insertBefore(ticker, document.body.firstChild);
    } else { /* sous_bandeau : sous le bandeau anime (#hero / .hero) si la page en a un,
                sinon juste sous le menu (position deja bonne, on ne bouge rien) */
      var banniere = document.querySelector('#hero, .hero');
      if (banniere) banniere.insertAdjacentElement('afterend', ticker);
    }
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

  var ICONES_BULLE = {
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z M12.05 0C5.49 0 .16 5.34.15 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.9-11.89A11.82 11.82 0 0 0 20.53 3.47 11.82 11.82 0 0 0 12.05 0z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z"/></svg>'
  };
  var LIBELLES_BULLE = { whatsapp: 'Discuter sur WhatsApp', facebook: 'Nous contacter sur Facebook' };

  function appliquerBulleContact(b, reseaux) {
    if (!b || !b.choix || b.choix === 'aucun') return;
    var url = (reseaux || {})[b.choix];
    if (!url) return; /* pas de lien renseigné dans « Réseaux sociaux » : rien à afficher */
    var couleur = b.couleur || (b.choix === 'whatsapp' ? '#25D366' : '#1877F2');
    injecterStyle('qz-bulle-contact-style', [
      '.qz-bulle-contact{position:fixed;left:18px;bottom:18px;z-index:60;width:52px;height:52px;border-radius:50%;',
      'background:' + couleur + ';display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px #00000040;',
      'text-decoration:none;transition:transform .15s ease}',
      '.qz-bulle-contact:hover{transform:scale(1.06)}',
      '.qz-bulle-contact svg{width:28px;height:28px;fill:#fff}'
    ].join('\n'));
    var a = document.createElement('a');
    a.className = 'qz-bulle-contact';
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', LIBELLES_BULLE[b.choix]);
    a.innerHTML = ICONES_BULLE[b.choix];
    document.body.appendChild(a);
  }

  function hexEnRgba(hex, alpha) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + alpha + ')';
  }

  function appliquerMenuNav(m) {
    if (!m) return;
    var css = '';
    if (m.bouton) css += '\n.qz-burger{background:' + m.bouton + '}';
    if (m.traits) css += '\n.qz-burger span{background:' + m.traits + '}';
    if (typeof m.transparence === 'number' && m.transparence > 0) {
      var alphaFond = (100 - Math.max(0, Math.min(100, m.transparence))) / 100;
      css += '\n.qz-navpanel{background:' + hexEnRgba(m.fond || '#2B353E', alphaFond) + '}';
    } else if (m.fond) css += '\n.qz-navpanel{background:' + m.fond + '}';
    if (typeof m.voile === 'number') {
      var v = Math.max(0, Math.min(100, m.voile)) / 100;
      css += '\n.qz-nav-voile{background:rgba(0,0,0,' + v + ')}';
    }
    if (m.texte) css += '\n.qz-navpanel a{color:' + m.texte + '}';
    if (m.sousBouton) css += '\n.qz-subtoggle{color:' + m.sousBouton + '}';
    if (m.overlay) css += '\n.qz-navpanel{position:fixed;left:0;right:0}';
    if (m.position === 'gauche') css += '\n.qz-header{grid-template-columns:auto 1fr}\n.qz-header .qz-burger{order:-1}';
    else if (m.position === 'centre') css += '\n.qz-header{grid-template-columns:1fr auto 1fr}';
    /* Reglages du menu principal — cibles sur .qz-navpanel>ul uniquement, pour ne
       jamais entrainer le sous-menu (qui a ses propres reglages ci-dessous). */
    if (typeof m.espacement === 'number') css += '\n.qz-navpanel>ul{gap:' + m.espacement + 'px}';
    if (m.disposition === 'horizontale') {
      var justif = { gauche: 'flex-start', centre: 'center', droite: 'flex-end', espace: 'space-between' }[m.justifie] || 'center';
      css += '\n.qz-navpanel>ul{flex-direction:row;flex-wrap:wrap;justify-content:' + justif + '}' +
             '\n.qz-navpanel>ul>li{width:auto;max-width:none}' +
             /* Sous-menu en volet flottant sous son bouton, plutot que de pousser
                les autres entrees de la ligne quand il s'ouvre. */
             '\n.qz-navpanel li.qz-hassub{position:relative}' +
             '\n.qz-navpanel li.qz-hassub .qz-sublist{position:absolute;top:100%;left:50%;transform:translateX(-50%);width:max-content;z-index:5;box-shadow:0 8px 18px #00000045}' +
             /* Une fois ouvert, le panneau laisse le volet du sous-menu deborder :
                sans ca, overflow:hidden le coupait et la partie coupee tombait
                sous le voile, qui avalait les clics (menu qui se refermait). */
             '\n.qz-navpanel.open{overflow:visible}';
    }
    /* Reglages propres au sous-menu (volet « Comment ca marche ») */
    if (m.sousFond) css += '\n.qz-navpanel .qz-sublist{background:' + m.sousFond + '}';
    if (m.sousTexte) css += '\n.qz-navpanel .qz-sublist a{color:' + m.sousTexte + '}';
    if (m.sousDisposition === 'horizontale') {
      css += '\n.qz-navpanel .qz-sublist{flex-direction:row;flex-wrap:wrap;gap:14px;padding-left:16px;padding-right:16px}' +
             '\n.qz-navpanel .qz-sublist li{width:auto}';
    } else if (m.sousDisposition === 'verticale') {
      css += '\n.qz-navpanel .qz-sublist{flex-direction:column;gap:0;padding-left:22px;padding-right:22px}';
    }
    if (m.sousAlignement) {
      var alignFlex = { gauche: 'flex-start', centre: 'center', droite: 'flex-end' }[m.sousAlignement] || 'center';
      var alignTexte = { gauche: 'left', centre: 'center', droite: 'right' }[m.sousAlignement] || 'center';
      css += '\n.qz-navpanel .qz-sublist{justify-content:' + alignFlex + ';align-items:' + alignFlex + ';text-align:' + alignTexte + '}';
    }
    if (!css) return;
    injecterStyle('qz-menu-nav-style', css);
  }

  function appliquerHeroBaseline(hb) {
    if (!hb) return;
    var css = '';
    if (hb.taille) css += '\n.h-line.l1,.h-line.l2,.h-line.l3{font-size:' + hb.taille + 'px}';
    if (hb.couleur) css += '\n.h-line.l1,.h-line.l2,.h-line.l3{color:' + hb.couleur + '}';
    if (hb.police === 'titres') css += '\n.h-line.l1,.h-line.l2,.h-line.l3{font-family:\'Quicksand\',sans-serif}';
    else if (hb.police === 'texte') css += '\n.h-line.l1,.h-line.l2,.h-line.l3{font-family:\'Karla\',sans-serif}';
    if (hb.alignement || hb.position) {
      var align = hb.alignement || 'centre';
      var pos = hb.position || 'haut';
      var left, right, tX;
      if (align === 'gauche') { left = '0'; right = 'auto'; tX = ''; }
      else if (align === 'droite') { left = 'auto'; right = '0'; tX = ''; }
      else { left = '50%'; right = 'auto'; tX = 'translateX(-50%)'; }
      var top, bottom, tY;
      if (pos === 'bas') { top = 'auto'; bottom = '0'; tY = ''; }
      else if (pos === 'centre') { top = '50%'; bottom = 'auto'; tY = 'translateY(-50%)'; }
      else { top = '0'; bottom = 'auto'; tY = ''; }
      var alignItems = align === 'gauche' ? 'flex-start' : align === 'droite' ? 'flex-end' : 'center';
      var textAlign = align === 'gauche' ? 'left' : align === 'droite' ? 'right' : 'center';
      css += '\n.hero-copy{left:' + left + ';right:' + right + ';top:' + top + ';bottom:' + bottom +
        ';transform:' + ((tX + ' ' + tY).trim() || 'none') +
        ';align-items:' + alignItems + ';text-align:' + textAlign + '}';
    }
    if (!css) return;
    injecterStyle('qz-hero-baseline-style', css);
  }

  function appliquerLogo(cfg) {
    if (!cfg || !cfg.url) return;
    var row = document.getElementById('qzLogoRow');
    var img = document.getElementById('qzLogoPerso');
    if (!row || !img) return;
    img.src = cfg.url;
    if (cfg.hauteur) img.style.maxHeight = cfg.hauteur + 'px';
    if (cfg.largeur) img.style.maxWidth = cfg.largeur + 'px';
    var anim = { fondu: 'qz-logo-anim-fondu', glisse: 'qz-logo-anim-glisse' }[cfg.animation];
    if (anim) img.classList.add(anim);
    row.classList.add('perso-actif');
  }

  function appliquerReassurance(r) {
    if (!r || !r.actif) return;
    var items = [r.item1, r.item2, r.item3].filter(Boolean);
    if (!items.length) return;
    var ancre = document.querySelector('.ticker') || document.querySelector('.qz-header');
    if (!ancre) return;
    var fond = r.couleur || '#F2EEDF';
    var texte = r.texte_couleur || '#2b353e';
    injecterStyle('qz-reassurance-style', [
      '.qz-reassurance{width:100%;background:' + fond + ';color:' + texte + ';padding:10px 16px;',
      'display:flex;flex-wrap:wrap;justify-content:center;gap:8px 28px;font-size:12px;font-weight:700;',
      'letter-spacing:.04em;text-align:center;box-sizing:border-box}',
      '.qz-reassurance span{white-space:nowrap}',
      '@media (max-width:640px){.qz-reassurance{gap:6px 16px;font-size:11px}}'
    ].join('\n'));
    var bar = document.createElement('div');
    bar.className = 'qz-reassurance';
    items.forEach(function (t) {
      var s = document.createElement('span');
      s.textContent = t;
      bar.appendChild(s);
    });
    ancre.insertAdjacentElement('afterend', bar);
  }

  var CLE_POPUP_VUE = 'quadretiPopupVue';

  function appliquerPopup(p) {
    if (!p || !p.actif) return;
    if (!p.titre && !p.texte) return; /* rien à montrer */
    var apercu = /[?&]apercu_popup=1\b/.test(location.search);
    if (!apercu) {
      try { if (localStorage.getItem(CLE_POPUP_VUE)) return; } catch (e) {}
    }

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

    setTimeout(function () { fond_el.classList.add('qz-on'); }, apercu ? 300 : (p.delai || 4) * 1000);
  }

  /* Applique tout sauf les widgets qui créent des éléments à chaque appel
     (popup, bulle de contact, réassurance) — ceux-là ne doivent s'exécuter
     qu'une fois, sur la réponse réseau, jamais depuis le cache (sinon doublon
     visuel : deux bulles, deux bandeaux de réassurance...). */
  function appliquerTout(g) {
    appliquerCouleurs(g.couleurs);
    appliquerPolices(g.polices);
    appliquerBaselines(g.baselines);
    appliquerReseaux(g.reseaux);
    appliquerCopyright(g.copyright);
    appliquerSections(g.sections_accueil);
    appliquerSections(g.sections_guides);
    appliquerPageContact(g.page_contact);
    appliquerPageColoriages(g.page_coloriages);
    appliquerBandeauVideo(g.bandeau_video);
    appliquerPhotos(g.photos_diaporama);
    appliquerBandeau(g.bandeau);
    appliquerDisposition(g.disposition);
    appliquerSeo(g.seo);
    appliquerMenuNav(g.menu_nav);
    appliquerHeroBaseline(g.hero_baseline);
    appliquerLogo(g.logo_perso);
  }

  /* Anti-flash : réapplique immédiatement la dernière config connue (cache
     local), avant même la réponse réseau, pour éviter que les couleurs/textes
     d'origine du code apparaissent brièvement le temps du fetch. */
  var CLE_CACHE = 'quadretiReglagesCache';
  try {
    var enCache = localStorage.getItem(CLE_CACHE);
    if (enCache) appliquerTout(JSON.parse(enCache));
  } catch (e) {}

  var ctl = ('AbortController' in window) ? new AbortController() : null;
  var minuteur = setTimeout(function () { if (ctl) ctl.abort(); }, 3000);
  fetch(SB_URL + '/rest/v1/reglages_site?select=cle,valeur', {
    headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY },
    signal: ctl ? ctl.signal : undefined
  }).then(function (r) { return r.ok ? r.json() : []; })
    .then(function (lignes) {
      var g = {};
      (lignes || []).forEach(function (l) { g[l.cle] = l.valeur; });
      appliquerTout(g);
      appliquerPopup(g.popup);
      appliquerBulleContact(g.bulle_contact, g.reseaux);
      appliquerReassurance(g.reassurance);
      try { localStorage.setItem(CLE_CACHE, JSON.stringify(g)); } catch (e) {}
    })
    .catch(function () { /* hors ligne ou lent : la page garde ses valeurs en dur (ou celles du cache appliquees juste avant) */ })
    .then(function () { clearTimeout(minuteur); });
})();
