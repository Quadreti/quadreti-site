/* QuadretI — bandeau d'accueil "carreaux 7x7 en relief" (10/09/2026). Construit le mur dans #qbBandeau, calcule la
   découpe des visuels et les keyframes des cycles, puis lance la séquence (CSS pur). Réglages = ceux exportés par le fondateur le 10/09 (bloc « Code à reprendre ») depuis
   SITE\POLICE PROPRIETAIRE\bandeau-relief-outil.html (réglages par défaut). Pour changer un réglage : REGLAGES ci-dessous. */
(function () {
  'use strict';
  var REGLAGES = {
    cx: 4, cy: 2, ecart: 0, grilleFixe: true, disposition: 'droite', /* 11/09 fondateur : 4x2 pour occuper la largeur a hauteur egale (le mur est plafonne en hauteur pour tenir sur un 14 pouces) */ /* 'droite' = textes + bouton a gauche, mur a droite ; 'colonne' = textes au-dessus/dessous */ mobile: { max: 640, cx: 2, cy: 2 }, /* carreaux en largeur / hauteur, écart entre carreaux (cqw) */
    visuels: ['/img/bandeau-changez-oeil.jpg', '/img/bandeau-changez-aurore.jpg'], ancrage: 'centre',
    couleurs: { fond: '#1e2b35', cadre: '#1e2f45', creux: '#2b3e54', couleur1: '#e2725b', couleur2: '#f4f1ea' },
    lum: .28, ombre: .6, grain: .08, relief: 4, txtRelief: 1,
    depart: 0, dg: .2, pause: .5, ordre: 'quatre', pace: .12, A: .9, H: 2, Rt: 1.3, E: 2.3, lat: 75,
    zoom: { actif: false, x: 0, y: 0, facteur: 1, aller: 1.8, tenue: 1.3 },
    textes: { l1: 'Composez.', l2: 'Imprimez.', l3: 'Clipsez.', l4: 'Changez à volonté.', dispo: 'ligne', police1: 'Jura', taille1: 3, police2: 'Jura', taille2: 3, ecartT: .9, quand: 'ouverture', position: 'haut-bas', mode: 'clip', ln: .3, dn: .1,
      /* 11/09, disposition 'droite' (reference Pixel Corner) : accroche en capitales (baseline 1), gros titre (baseline 2), paragraphe, deux boutons */
      accroche: 1.15, titre: 4.6, /* tailles en cqw (bornees en px dans le CSS) */
      para: 'Un seul support, mille créations possibles. Imprimez, clipsez, changez de décor quand vous voulez.',
      cta2: { texte: 'Voir la boutique', href: '/boutique/' } }
  };
  var CASES = 7;
  var root = document.getElementById('qbBandeau'); if (!root) return;
  /* navigateurs d'avant 2023 (unites de conteneur ou color-mix absents) : photo fixe du site a la place du mur */
  var moderne = false; try { moderne = window.CSS && CSS.supports('width', '1cqw') && CSS.supports('color', 'color-mix(in srgb, red, blue)'); } catch (e) {}
  if (!moderne) { root.className = 'qb qb-repli'; root.innerHTML = '<img class="qb-repli-img" src="/img/bandeau-1-impression.jpg" alt="">'; return; }
  var estMobile = function () { return window.innerWidth <= REGLAGES.mobile.max; };
  var nbCarreaux = function () { var m = estMobile(); return { cx: m ? REGLAGES.mobile.cx : REGLAGES.cx, cy: m ? REGLAGES.mobile.cy : REGLAGES.cy }; };
  var R = root.style; var cx = nbCarreaux().cx, cy = nbCarreaux().cy, tiles = [], dureeVague = 0, dims = {};
  var mesurer = function (src) { return new Promise(function (ok) { if (dims[src]) return ok(); var im = new Image(); im.onload = function () { dims[src] = { w: im.naturalWidth, h: im.naturalHeight }; ok(); }; im.onerror = function () { dims[src] = { w: 1, h: 1 }; ok(); }; im.src = src; }); };
  var visuels = REGLAGES.visuels;
  function construire() {
    cx = nbCarreaux().cx; cy = nbCarreaux().cy; R.setProperty('--cx', cx); R.setProperty('--cy', cy);
    var TC = cx * CASES, TR = cy * CASES; tiles = [];
    var U = 189, ec = REGLAGES.ecart / 100 * U * cx; var W = cx * U + (cx - 1) * ec, Hh = cy * U + (cy - 1) * ec;
    var html = '';
    for (var Y = 0; Y < cy; Y++) for (var X = 0; X < cx; X++) {
      html += '<div class="qb-carreau">';
      for (var r = 0; r < CASES; r++) for (var c = 0; c < CASES; c++) {
        var gc = X * CASES + c, gr = Y * CASES + r; var angle = (c === 0 || c === CASES - 1) && (r === 0 || r === CASES - 1);
        var xm = X * (U + ec) + .5 + c * 27 + 13, ym = Y * (U + ec) + .5 + r * 27 + 13;
        var sx = xm < W / 2 ? -1 : 1, sy = ym < Hh / 2 ? -1 : 1; var coinX = sx < 0 ? 0 : W, coinY = sy < 0 ? 0 : Hh;
        var dist = Math.hypot(xm - coinX, ym - coinY) / Math.hypot(W / 2, Hh / 2);
        tiles.push({ gc: gc, gr: gr, sx: sx, sy: sy, dist: dist, quad: (sx < 0 ? 0 : 1) + (sy < 0 ? 0 : 2) });
        html += '<div class="qb-case' + (angle ? ' qb-angle' : '') + '">' + visuels.map(function (v, k) { return '<div class="qb-tu qb-k' + k + '"></div>'; }).join('') + '<div class="qb-flash"></div></div>';
      }
      html += '</div>';
    }
    mur.innerHTML = html;
    var pas = REGLAGES.pace; dureeVague = 0;
    [0, 1, 2, 3].forEach(function (q) { var liste = tiles.filter(function (t) { return t.quad === q; }).sort(function (a, b) { return a.dist - b.dist || a.gr - b.gr || a.gc - b.gc; }); liste.forEach(function (t, i) { t.rang = i; }); });
    tiles.forEach(function (t) { t.d = REGLAGES.ordre === 'vague' ? t.dist * pas * 8 : REGLAGES.ordre === 'une' ? (t.rang * 4 + t.quad) * pas : t.rang * pas; if (t.d > dureeVague) dureeVague = t.d; });
    var wallRatio = W / Hh; var cases = mur.querySelectorAll('.qb-case'); var TU = 26;
    tiles.forEach(function (t, n) {
      var el = cases[n]; el.style.setProperty('--d', t.d.toFixed(3) + 's'); el.style.setProperty('--sx', t.sx); el.style.setProperty('--sy', t.sy);
      var X = Math.floor(t.gc / CASES), c = t.gc % CASES, Y = Math.floor(t.gr / CASES), r = t.gr % CASES;
      var xTu = X * (U + ec) + .5 + c * 27, yTu = Y * (U + ec) + .5 + r * 27;
      visuels.forEach(function (v, k) {
        var dd = dims[v] || { w: 1, h: 1 }; var imgRatio = dd.w / dd.h; var iw, ih;
        if (imgRatio > wallRatio) { ih = Hh; iw = Hh * imgRatio; } else { iw = W; ih = W / imgRatio; }
        var ox = (iw - W) / 2, oy = REGLAGES.ancrage === 'bas' ? (ih - Hh) : REGLAGES.ancrage === 'haut' ? 0 : (ih - Hh) / 2;
        var px = iw > TU ? ((xTu + ox) / (iw - TU) * 100) : 50, py = ih > TU ? ((yTu + oy) / (ih - TU) * 100) : 50;
        var tu = el.querySelector('.qb-tu.qb-k' + k); tu.style.backgroundImage = 'url("' + v + '")'; tu.style.backgroundSize = (iw / TU * 100).toFixed(3) + '% ' + (ih / TU * 100).toFixed(3) + '%'; tu.style.backgroundPosition = px.toFixed(3) + '% ' + py.toFixed(3) + '%';
        tu.style.setProperty('--anim', 'qb-cycle-' + k); el.querySelector('.qb-flash').style.setProperty('--flash', 'qb-flash-' + k);
      });
    });
  }
  function dyn() {
    var N = Math.max(1, visuels.length), A = REGLAGES.A, H = REGLAGES.H, Rt = REGLAGES.Rt, E = REGLAGES.E, vague = dureeVague;
    var z = REGLAGES.zoom; var zoomDur = (z.actif && N > 0) ? 2 * z.aller + z.tenue + .6 : 0;
    var fenK = function (k) { return A + vague + (k === 0 ? H + zoomDur : H) + Rt + vague + E; };
    var P = 0, debut = []; for (var k = 0; k < N; k++) { debut.push(P); P += fenK(k); } R.setProperty('--P', P.toFixed(2) + 's');
    var pc = function (s) { return (s / P * 100).toFixed(3) + '%'; };
    var loin = 'transform:translate(calc(var(--sx) * var(--lat)),calc(var(--sy) * var(--lat)));opacity:0;z-index:20', loinV = loin.replace('opacity:0', 'opacity:1'), chez = 'transform:none;opacity:1;z-index:5';
    var css = '';
    for (var k = 0; k < N; k++) {
      var s = debut[k], Hk = k === 0 ? H + zoomDur : H;
      css += '@keyframes qb-cycle-' + k + '{0%{' + loin + '}' + pc(s) + '{' + loin + '}' + pc(s + .05) + '{' + loinV + ';animation-timing-function:cubic-bezier(.2,.8,.3,1)}' + pc(s + A - .01) + '{z-index:20}' + pc(s + A) + '{' + chez + '}' + pc(s + A + vague + Hk) + '{' + chez + ';animation-timing-function:cubic-bezier(.5,0,.8,.4)}' + pc(s + A + vague + Hk + .01) + '{z-index:20}' + pc(s + A + vague + Hk + Rt) + '{' + loinV + '}' + pc(s + A + vague + Hk + Rt + .05) + '{' + loin + '}100%{' + loin + '}}\n';
      css += '@keyframes qb-flash-' + k + '{0%{opacity:0}' + pc(s + A) + '{opacity:0}' + pc(s + A + .04) + '{opacity:.55}' + pc(s + A + .35) + '{opacity:0}100%{opacity:0}}\n';
    }
    var z0 = A + vague + .6;
    css += '@keyframes qb-zoomer{0%{transform:scale(1)}' + pc(z0) + '{transform:scale(1);animation-timing-function:cubic-bezier(.65,0,.35,1)}' + pc(z0 + z.aller) + '{transform:scale(var(--zoom))}' + pc(z0 + z.aller + z.tenue) + '{transform:scale(var(--zoom));animation-timing-function:cubic-bezier(.65,0,.35,1)}' + pc(z0 + 2 * z.aller + z.tenue) + '{transform:scale(1)}100%{transform:scale(1)}}\n';
    style.textContent = css;
  }
  /* une lettre = un span (animation) ; chaque mot est enveloppe (.qb-mot, insecable) pour que le titre passe a la ligne entre les mots, jamais au milieu */
  function lettres(el, txt) { var i = 0; el.innerHTML = txt.split(' ').map(function (mot) { var h = '<span class="qb-mot">' + Array.prototype.map.call(mot, function (ch) { return '<span class="qb-l" style="--i:' + (i++) + '">' + ch.replace('<', '&lt;') + '</span>'; }).join('') + '</span>'; i++; return h; }).join(' '); }
  /* squelette */
  var T = REGLAGES.textes;
  var droite = REGLAGES.disposition === 'droite';
  root.className = 'qb qb-pos-' + T.position + ' qb-mode-t-' + T.mode + (T.dispo === 'ligne' ? ' qb-dispo-ligne' : '') + (REGLAGES.zoom.actif ? ' qb-zoome' : '') + (REGLAGES.grilleFixe ? ' qb-grille-fixe' : '') + (droite ? ' qb-dispo-droite' : '');
  var textes = '<div class="qb-textes qb-b1"><p class="qb-li qb-l1"></p><p class="qb-li qb-l2"></p><p class="qb-li qb-l3"></p></div>', b2 = '<p class="qb-textes qb-li qb-l4 qb-b2"></p>';
  /* le bouton Composer mon mur est recupere AVANT de vider le bloc (il y vit deja apres un premier construire, ex. changement mobile/bureau) */
  var cta = root.querySelector('.hero-cta') || document.querySelector('.hero .hero-cta');
  root.innerHTML = droite ? '<div class="qb-col">' + textes + b2 + '<p class="qb-para"></p><div class="qb-ctas"></div></div><div class="qb-mur" aria-hidden="true"></div>' : textes + '<div class="qb-mur"></div>' + b2;
  /* 11/09, disposition 'droite' (reference Pixel Corner) : accroche, titre, paragraphe, puis les deux boutons cote a cote dans la colonne de gauche
     (le bloc n'est plus aria-hidden, seul le mur l'est) */
  if (droite) {
    root.removeAttribute('aria-hidden'); var ctas = root.querySelector('.qb-ctas');
    if (cta) ctas.appendChild(cta);
    if (T.cta2 && T.cta2.texte) { var a2 = document.createElement('a'); a2.className = 'cta qb-cta2'; a2.href = T.cta2.href; a2.textContent = T.cta2.texte; ctas.appendChild(a2); }
    root.querySelector('.qb-para').textContent = T.para || '';
  }
  var mur = root.querySelector('.qb-mur'); var style = document.createElement('style'); document.head.appendChild(style);
  lettres(root.querySelector('.qb-l1'), T.dispo === 'ligne' ? [T.l1, T.l2, T.l3].filter(Boolean).join(' ') : T.l1); lettres(root.querySelector('.qb-l2'), T.l2); lettres(root.querySelector('.qb-l3'), T.l3); lettres(root.querySelector('.qb-l4'), T.l4);
  /* variables */
  var C = REGLAGES.couleurs; Object.keys(C).forEach(function (k) { R.setProperty('--' + k, C[k]); });
  R.setProperty('--cases', CASES); R.setProperty('--cx', cx); R.setProperty('--cy', cy); R.setProperty('--ecart', REGLAGES.ecart + 'cqw');
  R.setProperty('--lum', REGLAGES.lum); R.setProperty('--ombre', REGLAGES.ombre); R.setProperty('--grain', REGLAGES.grain); R.setProperty('--relief', REGLAGES.relief + 'px'); R.setProperty('--txt-relief', REGLAGES.txtRelief);
  ['depart', 'dg', 'pause', 'A', 'H', 'Rt', 'E'].forEach(function (k) { R.setProperty('--' + k, REGLAGES[k] + 's'); }); R.setProperty('--lat', REGLAGES.lat + 'cqw');
  R.setProperty('--zx', REGLAGES.zoom.x + '%'); R.setProperty('--zy', REGLAGES.zoom.y + '%'); R.setProperty('--zoom', REGLAGES.zoom.facteur);
  R.setProperty('--police1', "'" + T.police1 + "',sans-serif"); R.setProperty('--police2', "'" + T.police2 + "',sans-serif"); if (droite) { R.setProperty('--taille1', 'clamp(11px,' + T.accroche + 'cqw,15px)'); R.setProperty('--taille2', 'clamp(28px,' + T.titre + 'cqw,68px)'); } else { R.setProperty('--taille1', 'clamp(13px,' + T.taille1 + 'cqw,40px)'); R.setProperty('--taille2', 'clamp(13px,' + T.taille2 + 'cqw,52px)'); } R.setProperty('--ecart-t', T.ecartT + 'cqw'); R.setProperty('--ln', T.ln + 's'); R.setProperty('--dn', T.dn + 's');
  /* le hero passe sous le menu (index.html) : on garde la baseline 1 sous le menu, pas dessous */
  /* 11/09 : le menu (liens visibles, voir bandeau-relief.css) passe DANS la barre du haut, et le bord gauche du logo s'aligne sur celui de la colonne de textes */
  var menu = document.querySelector('.qz-header'); var nav = document.getElementById('qzNavPanel');
  if (menu && nav && nav.parentNode !== menu) { menu.appendChild(nav); menu.classList.add('qz-menu-visible'); }
  function caler() {
    if (!menu) { R.paddingTop = Math.round(root.offsetWidth * (droite ? .022 : .03)) + 'px'; return; }
    var col = root.querySelector('.qb-col'); var large = window.matchMedia && window.matchMedia('(min-width:901px)').matches;
    /* bord gauche du logo = bord gauche de la colonne de textes ; bord droit du menu = bord droit du mur (schema fondateur 11/09) */
    menu.style.paddingLeft = (droite && large && col) ? Math.round(col.getBoundingClientRect().left) + 'px' : '';
    menu.style.paddingRight = (droite && large && mur) ? Math.max(0, Math.round(document.documentElement.clientWidth - mur.getBoundingClientRect().right)) + 'px' : '';
    R.paddingTop = menu.offsetHeight + Math.round(root.offsetWidth * (droite ? .022 : .03)) + 'px';
  }
  caler(); if (window.ResizeObserver) new ResizeObserver(caler).observe(root); /* recale logo et menu des que le bloc change de taille (mur plafonne, polices chargees) */
  var dernierMobile = estMobile(); window.addEventListener('resize', function () { caler(); if (estMobile() !== dernierMobile) { dernierMobile = estMobile(); root.classList.remove('qb-joue'); preparer(); void root.offsetWidth; if (lanceDeja) root.classList.add('qb-joue'); } });
  var preparer = function () {
    construire();
    var p = REGLAGES.pause; var t0 = REGLAGES.depart + REGLAGES.dg + p; R.setProperty('--tc', t0.toFixed(2) + 's');
    dyn();
    var complet = t0 + REGLAGES.A + dureeVague; var z = REGLAGES.zoom; var zoomDur = z.actif ? 2 * z.aller + z.tenue + .6 : 0;
    /* 10/09 : les baselines apparaissent quand les tesselles commencent a repartir (fin de la tenue du visuel 1), l'une apres l'autre */
    /* 11/09 : 'ouverture' = les textes se clipsent des l'ouverture de la page (demande fondateur), 'depart' = quand les tesselles repartent, 'pose' = une fois le visuel 1 pose */
    var tl1 = T.quand === 'ouverture' ? REGLAGES.depart + .3 : T.quand === 'depart' ? complet + REGLAGES.H + zoomDur : complet + .3;
    var lettresB1 = root.querySelector('.qb-l1').querySelectorAll('.qb-l').length; var durB1 = T.mode === 'clip' || T.mode === 'dactylo' ? (lettresB1 - 1) * T.ln + .45 : T.dn;
    var tl4 = tl1 + durB1 + p;
    R.setProperty('--tl1', tl1.toFixed(2) + 's'); R.setProperty('--tl2', tl1.toFixed(2) + 's'); R.setProperty('--tl3', tl1.toFixed(2) + 's'); R.setProperty('--tl4', tl4.toFixed(2) + 's');
  };
  var lanceDeja = false; var lancer = function () { lanceDeja = true; root.classList.add('qb-joue'); };
  Promise.all(visuels.map(mesurer)).then(function () {
    preparer(); /* le mur (vide) est construit tout de suite, meme onglet cache ou ecran de mot de passe */
    /* 10/09, demande fondateur : le bandeau demarre quand l'animation du logo (commun-bandeau.js / logo-v5.css) est finie, puis 1 s de pause.
       Sans logo anime sur la page (deja joue dans la session, mouvement reduit...), depart 1 s apres le chargement. */
    var PAUSE_APRES_LOGO = 1000, lance = false;
    var partir = function () { if (lance) return; lance = true; setTimeout(lancer, PAUSE_APRES_LOGO); };
    var row = document.getElementById('qzLogoRow');
    if (!row) { partir(); return; }
    var attendreFin = function () {
      var lettres = row.querySelectorAll('.qz-naming .qz-l'); var dernier = lettres[lettres.length - 1];
      if (!dernier || !window.getComputedStyle || getComputedStyle(dernier).animationName === 'none') { partir(); return; }
      dernier.addEventListener('animationend', partir, { once: true });
      setTimeout(partir, 20000); /* filet de securite */
    };
    if (row.classList.contains('qz-fini')) { partir(); return; }
    if (row.classList.contains('qz-anime')) { attendreFin(); return; }
    /* le logo n'a pas encore demarre (ecran de mot de passe, onglet cache) : on attend qu'il parte */
    if (window.MutationObserver) {
      var obs = new MutationObserver(function () { if (row.classList.contains('qz-fini')) { obs.disconnect(); partir(); } else if (row.classList.contains('qz-anime')) { obs.disconnect(); attendreFin(); } });
      obs.observe(row, { attributes: true, attributeFilter: ['class'] });
    } else setTimeout(partir, 15000);
  });
})();
