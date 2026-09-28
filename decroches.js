/* QuadretI — DÉCROCHÉS ET GRILLE (28/09 soir, fondateur : « rectifie les défauts inhérents à mon décroché »).
   Là où le bord d une bande (son décroché, sa courbe) coupe des cases de la grille du fond, on ne laisse pas de case rognée :
   la case coupée prend la couleur de l élément du dessus, jusqu au décroché : la zone est UNIFORME (fondateur, 28/09 soir : « DEDEDE
   pour uniformiser cette zone, ce sera comme ça pour les prochaines »). Une paire peut demander couleur: 'bas' si un cas l exige. Les cases entières restent. Les aplats sont posés SOUS les bandes (le décroché et son
   liseré restent dessinés par la bande) et AU-DESSUS de la grille.
   Chaque « paire » = un élément du dessus (bord bas droit) + le SVG d une bande du dessous (bord haut en décroché, lu dans son tracé).
   Première paire seulement pour l instant (fondateur : « fais déjà la première ») : la bande qui défile / la bande « Le concept ».
   POUR RETIRER : enlever la balise <script src="/decroches.js"> de index.html. */
(function () {
  'use strict';
  var PAIRES = [
    { haut: '.qb-defile', bas: function () { return document.querySelector('#refonte .r-bande svg'); }, etirer: null /* 28/09 soir : allongement retiré (fondateur : « le texte n est pas remonté ») — le texte reste centré dans la bande d origine */ }
    /* les autres bandes (dont le décroché n°2, « Cinq outils ») : voir toutesLesPaires() */
  ];
  /* ÉTIRER l élément du dessus jusqu au PALIER HAUT du décroché (28/09 soir, fondateur : « le texte du bandeau défilant doit vivre centré
     dans la hauteur restante du décroché, comme avant »). La bande défilante est découpée par une forme en unités relatives (#qzMarche) :
     l allonger telle quelle étirerait sa courbe. On recopie donc la forme en gardant la courbe à sa hauteur d origine (en px) et on prolonge
     le bas ; la bande garde sa place dans la page (marge basse négative) et son texte, centré dans la bande, se recentre tout seul. */
  function etirer(P, h, bords) {
    var cle = window.innerWidth + 'x' + window.innerHeight;
    if (P._cle !== cle) { h.style.height = ''; h.style.marginBottom = ''; h.style.clipPath = ''; P._h0 = h.getBoundingClientRect().height; P._cle = cle; }
    var h0 = P._h0, haut = h.getBoundingClientRect().top + window.scrollY, palier = Infinity; bords.forEach(function (b) { if (b != null) palier = Math.min(palier, b); });
    var H1 = Math.round(palier - haut); if (!(h0 > 0) || !(H1 > h0 + 1)) return;
    var src = document.getElementById(P.etirer.forme), p0 = src && src.querySelector('path'); if (!p0) return;
    var k = h0 / H1, d = p0.getAttribute('d'), i = d.indexOf(' L 0,1'), tete = i > 0 ? d.slice(0, i) : d, queue = i > 0 ? d.slice(i) : '';
    var nd = tete.replace(/(-?[\d.]+),(-?[\d.]+)/g, function (t, x, y) { return x + ',' + (parseFloat(y) * k).toFixed(5); }) + queue;
    var id = P.etirer.forme + 'Etire', cp = document.getElementById(id);
    if (!cp) { cp = src.cloneNode(true); cp.id = id; src.parentNode.appendChild(cp); }
    if (cp.querySelector('path').getAttribute('d') !== nd) cp.querySelector('path').setAttribute('d', nd);
    h.style.height = H1 + 'px'; h.style.marginBottom = (h0 - H1) + 'px'; h.style.clipPath = 'url(#' + id + ')';
  }
  /* 28/09 soir, fondateur : « si celui-ci tu le réussis, tu enchaîneras tous les autres » -- toutes les bandes de la refonte (#refonte), de haut en bas.
     Au-dessus de chaque bande : le fond gris de la section claire précédente s il existe (.sec-clair), sinon la grille du fond de page (« page »).
     La première bande garde sa paire à part (la bande défilante au-dessus). */
  function toutesLesPaires() {
    var out = PAIRES.slice(), secs = Array.prototype.slice.call(document.querySelectorAll('#refonte section'));
    secs.forEach(function (sec, i) { if (i === 0) return; var svg = sec.querySelector('.r-bande svg'); if (!svg) return;
      var prec = secs[i - 1].querySelector('.sec-clair');
      out.push({ haut: prec ? '#' + secs[i - 1].id + ' .sec-clair' : 'page', bas: (function (s) { return function () { return s; }; })(svg) }); });
    return out;
  }
  var calque = null, dernier = '';
  function mm(v) { return v * 96 / 25.4; }
  function lire(nom) { return getComputedStyle(document.documentElement).getPropertyValue(nom).trim(); }
  /* le bord haut de la bande à l abscisse x (px de page) : on cherche, dans le tracé, le premier point rempli en descendant */
  function bordHaut(svg, path, x) {
    var r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal, kx = vb.width / r.width, ky = vb.height / r.height;
    var ux = vb.x + (x - r.left - window.scrollX) * kx, pt = svg.createSVGPoint(); pt.x = ux;
    var lo = vb.y, hi = vb.y + vb.height; pt.y = hi - .01; if (!path.isPointInFill(pt)) return null;
    for (var i = 0; i < 22; i++) { var m = (lo + hi) / 2; pt.y = m; if (path.isPointInFill(pt)) hi = m; else lo = m; }
    return r.top + window.scrollY + (hi - vb.y) / ky;
  }
  function poser() {
    if (!document.body.classList.contains('qz-quadrille')) return;
    var cas = mm(parseFloat(lire('--qzq-case')) || 25), bord = mm(0.25 + (parseFloat(lire('--qzq-nervure')) || .8) + 0.6);
    var W = document.documentElement.clientWidth, cols = Math.ceil(W / cas), rects = [];
    toutesLesPaires().forEach(function (P) {
      var h = P.haut === 'page' ? null : document.querySelector(P.haut), svg = P.bas(), path = svg && svg.querySelector('path'); if ((!h && P.haut !== 'page') || !svg || !path) return;
      /* le bord de la bande, échantillonné tous les 2 px */
      var bords = []; for (var x = 0; x <= W; x += 2) bords.push(bordHaut(svg, path, x));
      if (P.etirer && h) etirer(P, h, bords);
      /* au-dessus : un élément (son bord bas, sa couleur) ; ou « page » : la grille du fond — le bord est le haut de la bande (sur une ligne de la grille),
         la couleur celle du fond de page, unie : les cases coupées disparaissent */
      var hr = h ? h.getBoundingClientRect() : null; if (h && !hr.height) return;
      var yH = h ? hr.bottom + window.scrollY : svg.getBoundingClientRect().top + window.scrollY, couleurH = h ? getComputedStyle(h).backgroundColor : getComputedStyle(document.body).backgroundColor, couleurB = getComputedStyle(path).fill;
      var bordEntre = function (x0, x1) { var mn = Infinity, mx = -Infinity; for (var i = Math.max(0, Math.floor(x0 / 2)); i <= Math.min(bords.length - 1, Math.ceil(x1 / 2)); i++) { var b = bords[i]; if (b == null) continue; mn = Math.min(mn, b); mx = Math.max(mx, b); } return [mn, mx]; };
      var yBasMax = -Infinity; bords.forEach(function (b) { if (b != null) yBasMax = Math.max(yBasMax, b); });
      if (!(yBasMax > yH)) return;
      for (var row = Math.floor(yH / cas); row * cas < yBasMax; row++) for (var c = 0; c < cols; c++) {
        var x0 = c * cas, x1 = (c + 1) * cas, cy0 = row * cas + bord, cy1 = (row + 1) * cas, eb = bordEntre(x0, x1);
        if (cy1 <= yH + .5 || cy0 >= eb[1] - .5) continue; /* tolérance d un demi-pixel : une case qui finit à 0,01 px du bord n est pas coupée */                 /* entièrement sous la bande du dessus ou sous celle du dessous */
        var coupeHaut = cy0 < yH - .5, coupeBas = cy1 > eb[0] + .5;
        if (!coupeHaut && !coupeBas) continue;                    /* case entière : elle reste */
        if (coupeHaut) rects.push({ x: x0, y: yH - 2, w: cas, h: cy1 - yH + bord + 2, c: couleurH }); /* 2 px glissés SOUS l élément du dessus : pas de jointure (fondateur : « retire le trait de démarcation qui longe le bandeau défilant ») */        /* touche le dessus : sa couleur, depuis le bord du dessus */
        else { var yh0 = row * cas, colle = (h && Math.abs(yh0 - yH) < 1.5) ? 2 : 0; /* la case touche le bord de l élément du dessus : 2 px glissés dessous, pas de jointure */ rects.push({ x: x0, y: yh0 - colle, w: cas, h: eb[1] - yh0 + colle, c: (P.couleur === 'bas' ? couleurB : couleurH) }); } /* touche le dessous : jusqu au décroché (la bande recouvre le reste) ; couleur du DESSUS par défaut — fondateur : « DEDEDE pour uniformiser la zone, ce sera comme ça pour les prochaines » ; couleur: 'bas' pour l autre cas */
      }
    });
    /* aplats voisins de même hauteur et de même couleur : UN seul rectangle, au pixel entier (sinon l écran laisse une jointure visible entre eux) */
    rects.sort(function (p, q) { return (p.c + p.y + p.h).localeCompare(q.c + q.y + q.h) || p.x - q.x; });
    var fus = []; rects.forEach(function (r) { var d = fus[fus.length - 1]; if (d && d.c === r.c && Math.abs(d.y - r.y) < .01 && Math.abs(d.h - r.h) < .01 && r.x <= d.x + d.w + .01) { d.w = Math.max(d.w, r.x + r.w - d.x); } else fus.push({ x: r.x, y: r.y, w: r.w, h: r.h, c: r.c }); });
    rects = fus.map(function (r) { var x0 = Math.floor(r.x), y0 = Math.floor(r.y); return { x: x0, y: y0, w: Math.min(W, Math.ceil(r.x + r.w)) - x0, /* jamais au-delà du bord droit */ h: Math.ceil(r.y + r.h) - y0, c: r.c }; });
    var cle = JSON.stringify(rects.map(function (r) { return [Math.round(r.x), Math.round(r.y), Math.round(r.h), r.c]; }));
    if (cle === dernier) return; dernier = cle;
    if (!calque) { calque = document.createElement('div'); calque.className = 'qz-decroches'; calque.setAttribute('aria-hidden', 'true'); calque.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;pointer-events:none';
      var ref = document.getElementById('refonte'); (ref && ref.parentNode ? ref.parentNode : document.body).insertBefore(calque, ref || document.body.firstChild); }
    var o = calque.getBoundingClientRect(), ox = o.left + window.scrollX, oy = o.top + window.scrollY; /* l origine du calque dans la page */
    calque.innerHTML = rects.map(function (r) { return '<i style="position:absolute;display:block;left:' + (r.x - ox).toFixed(2) + 'px;top:' + (r.y - oy).toFixed(2) + 'px;width:' + r.w + 'px;height:' + r.h + 'px;background:' + r.c + '"></i>'; }).join('');
  }
  function planifier() { clearTimeout(planifier.t); planifier.t = setTimeout(poser, 80); }
  window.addEventListener('load', poser); window.addEventListener('resize', planifier);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(poser);
  setInterval(poser, 1000); /* la page se recale après coup (refonte-accueil.js, bandeau) : on suit ses positions */
})();
