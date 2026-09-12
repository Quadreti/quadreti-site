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
      cta2: { texte: 'Galerie', href: '/boutique/' } /* 11/09 soir : libelle Galerie (fondateur) ; pas encore de page galerie, le lien va a la boutique en attendant */ },
    /* 11/09 soir, fondateur : sequence generale de la page (en secondes) -- logo > naming > categorie > accroche > menu > titre > paragraphe > boutons > mur > icones.
       pas = intervalle entre deux tesselles du Q ; naming / cat / accroche / titre = intervalle entre deux lettres ; menu / icones = intervalle entre deux elements ;
       pause = respiration entre deux etapes ; pauseFin = tenue supplementaire du DERNIER visuel du mur avant de reboucler. */
    sequence: { depart: .4, pas: .15, naming: .1, cat: .04, accroche: .07, menu: .12, titre: .07, pause: .25, icones: .25, pauseFin: 60,
      vie: 8, vieDuree: 1.6, vieSouleve: 1.3 /* pendant la pause finale : une tesselle se declipse / reclipse toutes les `vie` s (duree du geste, facteur de soulevement) */ }
  };
  var CASES = 7;
  var root = document.getElementById('qbBandeau'); if (!root) return;
  /* 12/09 fondateur : au rafraichissement, le navigateur remettait la page a l ancienne position de defilement (milieu de page) ;
     l accueil s ouvre toujours en haut, sur le bandeau, pour voir la sequence depuis le debut */
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  if (!location.hash) { window.scrollTo(0, 0); window.addEventListener('load', function () { window.scrollTo(0, 0); }); }
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
    /* tesselles qui « vivent » pendant la pause finale : une par evenement, tirees au sort (graine fixe : meme choix a chaque chargement), jamais deux fois la meme */
    vivantes = []; var S = REGLAGES.sequence || {}; var nbVie = S.pauseFin && S.vie ? Math.max(0, Math.floor((S.pauseFin - 4) / S.vie)) : 0;
    var graine = 7; var alea = function () { graine = (graine * 9301 + 49297) % 233280; return graine / 233280; };
    while (vivantes.length < nbVie && vivantes.length < cases.length) { var n0 = Math.floor(alea() * cases.length); if (vivantes.indexOf(n0) < 0) vivantes.push(n0); }
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
        /* calques de vie : copie du DERNIER visuel (celui qui reste pose pendant la pause) */
        if (k === visuels.length - 1 && vivantes.indexOf(n) >= 0) {
          var iv = vivantes.indexOf(n); var creux = document.createElement('div'); creux.className = 'qb-vie-creux'; creux.style.setProperty('--vie', 'qb-vie-creux-' + iv);
          var copie = document.createElement('div'); copie.className = 'qb-vie-tu'; copie.style.backgroundImage = tu.style.backgroundImage; copie.style.backgroundSize = tu.style.backgroundSize; copie.style.backgroundPosition = tu.style.backgroundPosition; copie.style.setProperty('--vie', 'qb-vie-tu-' + iv);
          el.appendChild(creux); el.appendChild(copie);
        }
      });
    });
  }
  function dyn() {
    var N = Math.max(1, visuels.length), A = REGLAGES.A, H = REGLAGES.H, Rt = REGLAGES.Rt, E = REGLAGES.E, vague = dureeVague;
    var z = REGLAGES.zoom; var zoomDur = (z.actif && N > 0) ? 2 * z.aller + z.tenue + .6 : 0;
    var fin = (REGLAGES.sequence && REGLAGES.sequence.pauseFin) || 0; /* tenue supplementaire du dernier visuel (fondateur : 60 s) */
    var tenue = function (k) { return H + (k === 0 ? zoomDur : 0) + (k === N - 1 ? fin : 0); };
    var fenK = function (k) { return A + vague + tenue(k) + Rt + vague + E; };
    var P = 0, debut = []; for (var k = 0; k < N; k++) { debut.push(P); P += fenK(k); } R.setProperty('--P', P.toFixed(2) + 's');
    var pc = function (s) { return (s / P * 100).toFixed(3) + '%'; };
    var loin = 'transform:translate(calc(var(--sx) * var(--lat)),calc(var(--sy) * var(--lat)));opacity:0;z-index:20', loinV = loin.replace('opacity:0', 'opacity:1'), chez = 'transform:none;opacity:1;z-index:5';
    var css = '';
    for (var k = 0; k < N; k++) {
      var s = debut[k], Hk = tenue(k);
      css += '@keyframes qb-cycle-' + k + '{0%{' + loin + '}' + pc(s) + '{' + loin + '}' + pc(s + .05) + '{' + loinV + ';animation-timing-function:cubic-bezier(.2,.8,.3,1)}' + pc(s + A - .01) + '{z-index:20}' + pc(s + A) + '{' + chez + '}' + pc(s + A + vague + Hk) + '{' + chez + ';animation-timing-function:cubic-bezier(.5,0,.8,.4)}' + pc(s + A + vague + Hk + .01) + '{z-index:20}' + pc(s + A + vague + Hk + Rt) + '{' + loinV + '}' + pc(s + A + vague + Hk + Rt + .05) + '{' + loin + '}100%{' + loin + '}}\n';
      css += '@keyframes qb-flash-' + k + '{0%{opacity:0}' + pc(s + A) + '{opacity:0}' + pc(s + A + .04) + '{opacity:.55}' + pc(s + A + .35) + '{opacity:0}100%{opacity:0}}\n';
    }
    /* vie pendant la pause finale : evenement i a e_i = pose du dernier visuel + H + 2 s + i * vie ; sortie (creux visible + copie soulevee) puis retour */
    var S2 = REGLAGES.sequence || {}; if (fin > 0 && S2.vie) {
      var sD = debut[N - 1], eBase = sD + A + vague + H + 2, dV = S2.vieDuree || 1.6, sv = S2.vieSouleve || 1.3;
      for (var i = 0; i < vivantes.length; i++) {
        var e = eBase + i * S2.vie; if (e + dV > sD + A + vague + tenue(N - 1)) break;
        css += '@keyframes qb-vie-creux-' + i + '{0%{opacity:0}' + pc(e) + '{opacity:0}' + pc(e + .02) + '{opacity:1}' + pc(e + dV - .02) + '{opacity:1}' + pc(e + dV) + '{opacity:0}100%{opacity:0}}\n';
        css += '@keyframes qb-vie-tu-' + i + '{0%{opacity:0;transform:none}' + pc(e) + '{opacity:0;transform:none}' + pc(e + .02) + '{opacity:1;transform:none;animation-timing-function:cubic-bezier(.3,1.4,.5,1)}' + pc(e + dV * .3) + '{opacity:1;transform:translate(9%,-12%) scale(' + sv + ');filter:drop-shadow(calc(var(--relief) * 1.5) calc(var(--relief) * 2) calc(var(--relief) * 2) rgba(0,0,0,.6))}' + pc(e + dV * .6) + '{opacity:1;transform:translate(9%,-12%) scale(' + sv + ');filter:drop-shadow(calc(var(--relief) * 1.5) calc(var(--relief) * 2) calc(var(--relief) * 2) rgba(0,0,0,.6));animation-timing-function:cubic-bezier(.5,0,.8,.4)}' + pc(e + dV - .02) + '{opacity:1;transform:none;filter:drop-shadow(0 0 0 rgba(0,0,0,0))}' + pc(e + dV) + '{opacity:0;transform:none}100%{opacity:0;transform:none}}\n';
      }
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
    /* 12/09 fondateur : une phrase par ligne, chaque phrase insecable (la taille est ajustee dans caler pour tenir dans la colonne) */
    root.querySelector('.qb-para').innerHTML = (T.para || '').split(/(?<=\.)\s+/).map(function (ph) { return '<span class="qb-phrase">' + ph.replace(/</g, '&lt;') + '</span>'; }).join('');
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
  /* index des liens du menu (delais en cascade) ; le panneau du site (reglages-site.js, menu_liens) reconstruit la liste apres coup -> on re-indexe a chaque changement */
  function indexerMenu() { if (nav) Array.prototype.forEach.call(nav.querySelectorAll(':scope > ul > li'), function (li, i) { li.style.setProperty('--i-menu', String(i)); }); }
  indexerMenu(); if (nav && window.MutationObserver) new MutationObserver(indexerMenu).observe(nav, { childList: true, subtree: true });
  /* 11/09 fondateur (mock-up D3) : sur bureau, l accroche (baseline 1) rejoint le bloc logo de la barre, sous la categorie ; sur mobile elle revient dans la colonne */
  var b1 = root.querySelector('.qb-b1'), colTexte = root.querySelector('.qb-col'), wmCol = menu && menu.querySelector('.qz-wm-col');
  if (b1) b1.style.setProperty('--ln', T.ln + 's');
  function placerAccroche() {
    if (!b1) return; var large = window.matchMedia && window.matchMedia('(min-width:901px)').matches;
    if (droite && large && wmCol) { if (b1.parentNode !== wmCol) wmCol.appendChild(b1); }
    else if (colTexte && b1.parentNode !== colTexte) colTexte.insertBefore(b1, colTexte.firstChild);
  }
  function caler() {
    placerAccroche();
    if (!menu) { R.paddingTop = Math.round(root.offsetWidth * (droite ? .022 : .03)) + 'px'; return; }
    var col = root.querySelector('.qb-col'); var large = window.matchMedia && window.matchMedia('(min-width:901px)').matches;
    /* bord gauche du logo = bord gauche de la colonne de textes ; bord droit du menu = bord droit du mur (schema fondateur 11/09) */
    /* (11/09 soir : la marge gauche du logo n est plus calee sur la colonne mais sur MARGE, voir plus bas) */
    menu.style.paddingRight = (droite && large && mur) ? Math.max(0, Math.round(document.documentElement.clientWidth - mur.getBoundingClientRect().right)) + 'px' : '';
    /* 11/09 fondateur : le bloc logo (Q 88 px + trois lignes) vit DANS le decroche de l onglet, avec la marge minimale utile (MARGE) a gauche,
       en haut et en bas. L onglet fait 1.291 x la barre (dessin ONGLET.svg) : la barre est donc forcee a (88 + 2 MARGE) / 1.291 de haut
       (environ 90 px), le bloc logo deborde de la barre dans la partie basse de l onglet, le menu reste centre dans la barre. */
    var MARGE = 16, BLOC = 66, logoRow = menu.querySelector('.qz-logorow'), naming = menu.querySelector('.qz-naming'); /* BLOC = cote du Q = hauteur des trois lignes */
    if (droite && large) {
      menu.style.paddingTop = '0px'; menu.style.paddingBottom = '0px'; menu.style.paddingLeft = MARGE + 'px';
      menu.style.height = Math.round((BLOC + 2 * MARGE) / 1.291) + 'px';
      if (logoRow) { logoRow.style.marginTop = MARGE + 'px'; logoRow.style.alignSelf = 'flex-start'; }
      /* finition (fondateur) : le menu sur la ligne du naming -> centre du menu = centre de la premiere ligne du bloc */
      if (nav && naming) { nav.style.alignSelf = 'flex-start'; nav.style.marginTop = Math.max(0, Math.round(MARGE + naming.offsetHeight / 2 - nav.offsetHeight / 2)) + 'px'; }
    } else {
      menu.style.paddingTop = ''; menu.style.paddingBottom = ''; menu.style.paddingLeft = ''; menu.style.height = '';
      if (logoRow) { logoRow.style.marginTop = ''; logoRow.style.alignSelf = ''; }
      if (nav) { nav.style.alignSelf = ''; nav.style.marginTop = ''; }
    }
    /* onglet (11/09) : hauteur de la barre -> hauteur de l onglet ; le titre commence dessous */
    R.setProperty('--entete', menu.offsetHeight + 'px');
    /* 11/09 fondateur : bloc centre dans la zone navy -- meme air au-dessus (sous la barre) qu en dessous, en comptant le decroche du bas
       qui prolonge le navy sous le mur de 29 % de la hauteur de la barre (bandeau-gestes / .qb-gestes::before). Bas du bloc = 2.4 % en CSS. */
    R.paddingTop = menu.offsetHeight + Math.round(root.offsetWidth * (droite ? (large ? .012 : .022) : .03) + (droite && large ? menu.offsetHeight * .291 : 0)) + 'px';
    /* 11/09 soir (fondateur) : le bloc titre + texte + boutons s aligne sur le naming du logo (bord gauche) */
    R.paddingLeft = (droite && large && naming) ? Math.round(naming.getBoundingClientRect().left) + 'px' : '';
    /* et « Changez a volonte. » tient sur une ligne : taille du titre reduite si la colonne est trop etroite */
    var b2 = document.querySelector('.qb-b2');
    if (droite && large && b2 && colTexte) { b2.style.fontSize = '100px'; var w100 = b2.scrollWidth; b2.style.fontSize = ''; var base = Math.min(68, Math.max(28, root.offsetWidth * T.titre / 100)); var fit = Math.min(base, colTexte.clientWidth * 100 / Math.max(1, w100) * .985); R.setProperty('--taille2', fit.toFixed(1) + 'px'); }
    /* paragraphe : la plus longue phrase tient sur sa ligne */
    var para = root.querySelector('.qb-para');
    if (droite && large && para && colTexte) { para.style.fontSize = '100px'; var wp = 0; Array.prototype.forEach.call(para.querySelectorAll('.qb-phrase'), function (ph) { wp = Math.max(wp, ph.scrollWidth); }); para.style.fontSize = ''; var baseP = Math.min(18, Math.max(14, root.offsetWidth * .013)); var fitP = Math.min(baseP, colTexte.clientWidth * 100 / Math.max(1, wp) * .985); para.style.fontSize = fitP.toFixed(1) + 'px'; }
    /* 11/09 soir (fondateur) : le mur prend toute la hauteur restante a l ecran, entre les marges -- barre, marges, bande des gestes et bandeau defilant deduits */
    if (droite && large) { var bande = document.querySelector('.qb-gestes'), defile = document.querySelector('.qb-defile'); var dispo = window.innerHeight - parseFloat(R.paddingTop) - Math.round(root.offsetWidth * .012) - (bande ? bande.offsetHeight : 0) - (defile ? defile.offsetHeight : 0) - 2; R.setProperty('--mur-max', Math.max(180, dispo) + 'px'); } else R.removeProperty('--mur-max');
  }
  caler(); if (window.ResizeObserver) new ResizeObserver(caler).observe(root); /* recale logo et menu des que le bloc change de taille (mur plafonne, polices chargees) */
  var dernierMobile = estMobile(); window.addEventListener('resize', function () { caler(); if (estMobile() !== dernierMobile) { dernierMobile = estMobile(); root.classList.remove('qb-joue'); preparer(); void root.offsetWidth; if (lanceDeja) root.classList.add('qb-joue'); } });
  var preparer = function () {
    construire();
    var p = REGLAGES.pause; var t0 = REGLAGES.depart + REGLAGES.dg + p; R.setProperty('--tc', t0.toFixed(2) + 's');
    dyn();
    var complet = t0 + REGLAGES.A + dureeVague; completPose = complet; var z = REGLAGES.zoom; var zoomDur = z.actif ? 2 * z.aller + z.tenue + .6 : 0;
    /* 10/09 : les baselines apparaissent quand les tesselles commencent a repartir (fin de la tenue du visuel 1), l'une apres l'autre */
    /* 11/09 : 'ouverture' = les textes se clipsent des l'ouverture de la page (demande fondateur), 'depart' = quand les tesselles repartent, 'pose' = une fois le visuel 1 pose */
    var tl1 = T.quand === 'ouverture' ? REGLAGES.depart + .3 : T.quand === 'depart' ? complet + REGLAGES.H + zoomDur : complet + .3;
    var lettresB1 = document.querySelector('.qb-l1').querySelectorAll('.qb-l').length; /* l accroche peut vivre dans la barre du haut */ var durB1 = T.mode === 'clip' || T.mode === 'dactylo' ? (lettresB1 - 1) * T.ln + .45 : T.dn;
    var tl4 = tl1 + durB1 + p;
    R.setProperty('--tl1', tl1.toFixed(2) + 's'); R.setProperty('--tl2', tl1.toFixed(2) + 's'); R.setProperty('--tl3', tl1.toFixed(2) + 's'); R.setProperty('--tl4', tl4.toFixed(2) + 's');
  };
  var completPose = 0, vivantes = [];
  var lanceDeja = false; var lancer = function () {
    lanceDeja = true; root.classList.add('qb-joue');
    /* icones pedagogiques : une par une, des que le premier visuel du mur est entierement pose */
    var bande = document.querySelector('.qb-gestes'); if (bande && droite) { bande.style.setProperty('--t-icones', completPose.toFixed(2) + 's'); bande.style.setProperty('--icones-pas', ((REGLAGES.sequence && REGLAGES.sequence.icones) || .25) + 's'); bande.classList.add('qb-gestes-joue'); }
    document.documentElement.classList.remove('qb-attente-icones'); /* anti-flash (index.html) : les icones sortent de l attente au moment ou leur animation est posee */
  };
  /* 11/09 soir : sequence generale, calee sur le depart de l animation du logo (classe qz-anime posee par commun-bandeau.js).
     Toutes les etapes sont des delais CSS a partir de ce moment ; le mur part par minuteur a la fin des boutons. */
  var SEQ = REGLAGES.sequence, sequenceLancee = false;
  function demarrerSequence() {
    if (sequenceLancee || !SEQ || !droite || !menu) return false; sequenceLancee = true;
    var large = window.matchMedia && window.matchMedia('(min-width:901px)').matches; if (!large) return false;
    var s = SEQ, M = menu.style;
    var nAcc = document.querySelectorAll('.qb-l1 .qb-l').length || 27, nTitre = document.querySelectorAll('.qb-b2 .qb-l').length || 18, nMenu = nav ? nav.querySelectorAll(':scope > ul > li').length : 8;
    /* 12/09 fondateur : tesselles du Q, puis l accroche qui SORT de la tesselle (glisse depuis le Q), puis la categorie, puis le naming (apparitions simples) */
    var t0 = s.depart + s.pause, t1 = t0 + 10 * s.pas + .55, ta = t1 + s.pause, tb = ta + .6 + s.pause, tn = tb + .5 + s.pause;
    var tm = tn + .5 + s.pause, tt = tm + (nMenu - 1) * s.menu + .4 + s.pause, tp = tt + (nTitre - 1) * s.titre + .45 + .2, tb1 = tp + .5, tb2 = tb1 + .25, tw = tb2 + .5 + .4;
    var sec = function (v) { return v.toFixed(2) + 's'; };
    M.setProperty('--qz-depart', sec(s.depart)); M.setProperty('--qz-dg', '0s'); M.setProperty('--qz-pause', sec(s.pause)); M.setProperty('--qz-pas', sec(s.pas)); M.setProperty('--qz-ln', sec(s.naming)); M.setProperty('--qz-lc', sec(s.cat));
    M.setProperty('--qz-t0', sec(t0)); M.setProperty('--qz-t1', sec(t1)); M.setProperty('--qz-tn', sec(tn)); M.setProperty('--qz-tb', sec(tb)); M.setProperty('--qz-ta', sec(ta)); M.setProperty('--qz-tm', sec(tm)); M.setProperty('--qz-menu-pas', sec(s.menu));
    if (b1) b1.style.setProperty('--ln', sec(s.accroche));
    R.setProperty('--ln', sec(s.titre)); R.setProperty('--tt', sec(tt)); R.setProperty('--tp', sec(tp)); R.setProperty('--tb1', sec(tb1)); R.setProperty('--tb2', sec(tb2));
    menu.classList.add('qb-seq'); root.classList.add('qb-seq');
    document.documentElement.classList.remove('qb-attente'); /* anti-flash (index.html) : les animations qb-seq partent de l opacite 0, pas de saut */
    setTimeout(lancer, Math.round(tw * 1000));
    return true;
  }
  Promise.all(visuels.map(mesurer)).then(function () {
    preparer(); /* le mur (vide) est construit tout de suite, meme onglet cache ou ecran de mot de passe */
    /* 10/09, demande fondateur : le bandeau demarre quand l'animation du logo (commun-bandeau.js / logo-v5.css) est finie, puis 1 s de pause.
       Sans logo anime sur la page (deja joue dans la session, mouvement reduit...), depart 1 s apres le chargement. */
    var PAUSE_APRES_LOGO = 1000, lance = false;
    var partir = function () { if (lance) return; lance = true; document.documentElement.classList.remove('qb-attente', 'qb-attente-icones'); /* pas de sequence : tout visible */ setTimeout(lancer, PAUSE_APRES_LOGO); };
    var row = document.getElementById('qzLogoRow');
    if (!row) { partir(); return; }
    var attendreFin = function () {
      if (demarrerSequence()) return; /* sequence generale : le mur part par minuteur a la fin des boutons */
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
