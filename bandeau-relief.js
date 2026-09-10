/* QuadretI — bandeau d'accueil "carreaux 7x7 en relief" (10/09/2026). Construit le mur dans #qbBandeau, calcule la
   découpe des visuels et les keyframes des cycles, puis lance la séquence (CSS pur). Réglages = ceux validés dans
   SITE\POLICE PROPRIETAIRE\bandeau-relief-outil.html (réglages par défaut). Pour changer un réglage : REGLAGES ci-dessous. */
(function () {
  'use strict';
  var REGLAGES = {
    cx: 3, cy: 2, ecart: 1, /* carreaux en largeur / hauteur, écart entre carreaux (cqw) */
    visuels: ['/img/bandeau-changez-oeil.jpg', '/img/bandeau-changez-aurore.jpg'], ancrage: 'centre',
    couleurs: { fond: '#1e2b35', cadre: '#1e2f45', creux: '#2b3e54', couleur1: '#f4f1ea', couleur2: '#d9822f' },
    lum: .28, ombre: .6, grain: .08, relief: 4, txtRelief: 1,
    depart: 1.5, dg: .8, pause: .5, ordre: 'quatre', pace: .12, A: .9, H: 2, Rt: 1.3, E: 1.5, lat: 45,
    zoom: { actif: true, x: 44.2, y: 49.7, facteur: 2.4, aller: 1.8, tenue: 1.3 },
    textes: { l1: 'Composez.', l2: 'Imprimez.', l3: 'Clipsez.', l4: 'Changez à volonté.', dispo: 'ligne', police1: 'Poppins', taille1: 3.2, police2: 'Poppins', taille2: 4, ecartT: 1.2, position: 'haut-bas', mode: 'aucun', ln: .05, dn: .6 }
  };
  var CASES = 7;
  var root = document.getElementById('qbBandeau'); if (!root) return;
  var R = root.style; var cx = REGLAGES.cx, cy = REGLAGES.cy, tiles = [], dureeVague = 0, dims = {};
  var mesurer = function (src) { return new Promise(function (ok) { if (dims[src]) return ok(); var im = new Image(); im.onload = function () { dims[src] = { w: im.naturalWidth, h: im.naturalHeight }; ok(); }; im.onerror = function () { dims[src] = { w: 1, h: 1 }; ok(); }; im.src = src; }); };
  var visuels = REGLAGES.visuels;
  function construire() {
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
    var loin = 'transform:translate(calc(var(--sx) * var(--lat)),calc(var(--sy) * var(--lat)));opacity:0', loinV = loin.replace('opacity:0', 'opacity:1'), chez = 'transform:none;opacity:1';
    var css = '';
    for (var k = 0; k < N; k++) {
      var s = debut[k], Hk = k === 0 ? H + zoomDur : H;
      css += '@keyframes qb-cycle-' + k + '{0%{' + loin + '}' + pc(s) + '{' + loin + '}' + pc(s + .05) + '{' + loinV + ';animation-timing-function:cubic-bezier(.2,.8,.3,1)}' + pc(s + A) + '{' + chez + '}' + pc(s + A + vague + Hk) + '{' + chez + ';animation-timing-function:cubic-bezier(.5,0,.8,.4)}' + pc(s + A + vague + Hk + Rt) + '{' + loinV + '}' + pc(s + A + vague + Hk + Rt + .05) + '{' + loin + '}100%{' + loin + '}}\n';
      css += '@keyframes qb-flash-' + k + '{0%{opacity:0}' + pc(s + A) + '{opacity:0}' + pc(s + A + .04) + '{opacity:.55}' + pc(s + A + .35) + '{opacity:0}100%{opacity:0}}\n';
    }
    var z0 = A + vague + .6;
    css += '@keyframes qb-zoomer{0%{transform:scale(1)}' + pc(z0) + '{transform:scale(1);animation-timing-function:cubic-bezier(.65,0,.35,1)}' + pc(z0 + z.aller) + '{transform:scale(var(--zoom))}' + pc(z0 + z.aller + z.tenue) + '{transform:scale(var(--zoom));animation-timing-function:cubic-bezier(.65,0,.35,1)}' + pc(z0 + 2 * z.aller + z.tenue) + '{transform:scale(1)}100%{transform:scale(1)}}\n';
    style.textContent = css;
  }
  function lettres(el, txt) { el.innerHTML = Array.prototype.map.call(txt, function (ch, i) { return '<span class="qb-l" style="--i:' + i + '">' + (ch === ' ' ? '&nbsp;' : ch.replace('<', '&lt;')) + '</span>'; }).join(''); }
  /* squelette */
  var T = REGLAGES.textes;
  root.className = 'qb qb-pos-' + T.position + ' qb-mode-t-' + T.mode + (T.dispo === 'ligne' ? ' qb-dispo-ligne' : '') + (REGLAGES.zoom.actif ? ' qb-zoome' : '');
  root.innerHTML = '<div class="qb-textes qb-b1"><p class="qb-li qb-l1"></p><p class="qb-li qb-l2"></p><p class="qb-li qb-l3"></p></div><div class="qb-mur"></div><p class="qb-textes qb-li qb-l4 qb-b2"></p>';
  var mur = root.querySelector('.qb-mur'); var style = document.createElement('style'); document.head.appendChild(style);
  lettres(root.querySelector('.qb-l1'), T.dispo === 'ligne' ? [T.l1, T.l2, T.l3].filter(Boolean).join(' ') : T.l1); lettres(root.querySelector('.qb-l2'), T.l2); lettres(root.querySelector('.qb-l3'), T.l3); lettres(root.querySelector('.qb-l4'), T.l4);
  /* variables */
  var C = REGLAGES.couleurs; Object.keys(C).forEach(function (k) { R.setProperty('--' + k, C[k]); });
  R.setProperty('--cases', CASES); R.setProperty('--cx', cx); R.setProperty('--cy', cy); R.setProperty('--ecart', REGLAGES.ecart + 'cqw');
  R.setProperty('--lum', REGLAGES.lum); R.setProperty('--ombre', REGLAGES.ombre); R.setProperty('--grain', REGLAGES.grain); R.setProperty('--relief', REGLAGES.relief + 'px'); R.setProperty('--txt-relief', REGLAGES.txtRelief);
  ['depart', 'dg', 'pause', 'A', 'H', 'Rt', 'E'].forEach(function (k) { R.setProperty('--' + k, REGLAGES[k] + 's'); }); R.setProperty('--lat', REGLAGES.lat + 'cqw');
  R.setProperty('--zx', REGLAGES.zoom.x + '%'); R.setProperty('--zy', REGLAGES.zoom.y + '%'); R.setProperty('--zoom', REGLAGES.zoom.facteur);
  R.setProperty('--police1', "'" + T.police1 + "',sans-serif"); R.setProperty('--police2', "'" + T.police2 + "',sans-serif"); R.setProperty('--taille1', 'min(' + T.taille1 + 'cqw,40px)'); R.setProperty('--taille2', 'min(' + T.taille2 + 'cqw,52px)'); R.setProperty('--ecart-t', T.ecartT + 'cqw'); R.setProperty('--ln', T.ln + 's'); R.setProperty('--dn', T.dn + 's');
  /* le hero passe sous le menu (index.html) : on garde la baseline 1 sous le menu, pas dessous */
  function caler() { var menu = document.querySelector('.qz-header'); R.paddingTop = (menu ? menu.offsetHeight : 0) + Math.round(root.offsetWidth * .03) + 'px'; }
  caler(); window.addEventListener('resize', caler);
  var preparer = function () {
    construire();
    var p = REGLAGES.pause; var t0 = REGLAGES.depart + REGLAGES.dg + p; R.setProperty('--tc', t0.toFixed(2) + 's');
    dyn();
    var complet = t0 + REGLAGES.A + dureeVague; var tl1 = complet + .3; R.setProperty('--tl1', tl1.toFixed(2) + 's'); R.setProperty('--tl2', tl1.toFixed(2) + 's'); R.setProperty('--tl3', tl1.toFixed(2) + 's'); R.setProperty('--tl4', (complet + REGLAGES.H).toFixed(2) + 's');
  };
  var lancer = function () { root.classList.add('qb-joue'); };
  Promise.all(visuels.map(mesurer)).then(function () {
    preparer(); /* le mur (vide) est construit tout de suite, meme onglet cache ou ecran de mot de passe */
    /* l'animation ne demarre que quand on peut la voir (ecran de mot de passe, onglet cache) */
    var go = function () { if (document.hidden || document.getElementById('qdtFormAcces')) return; if (root.classList.contains('qb-joue')) return; lancer(); };
    go(); if (!root.classList.contains('qb-joue')) { document.addEventListener('visibilitychange', go); if (window.MutationObserver) new MutationObserver(go).observe(document.body, { childList: true }); }
  });
})();
