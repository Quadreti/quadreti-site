/* QuadretI — FOND QUADRILLAGE, pose des cases (28/09). Voir fond-quadrillage.css pour le principe et les réglages.
   Une case = un <i> : « creux » (vide, en profondeur) ou « plein » (une teinte de bleu, bombée, reflet). Les cases sous un texte, un bouton
   ou une carte restent en creux pour ne pas gêner la lecture. Tout est recalculé quand la page change de taille. Tirage rejouable (graine fixe)
   pour que l accueil ait le même semis à chaque visite. À inclure avec defer, après commun-bandeau.js. */
(function () {
  'use strict';
  var PART = 0.10;      /* part de cases colorées (fondateur : 10 %) */
  var GRAINE = 7;
  var body = document.body;
  if (!body || body.classList.contains('qz-sans-quadrillage')) return;
  body.classList.add('qz-quadrille');
  var couche = document.createElement('div'); couche.className = 'qz-quadrillage'; couche.setAttribute('aria-hidden', 'true');
  body.insertBefore(couche, body.firstChild);
  var mm = function (v) { return v * 96 / 25.4; };
  var lire = function (nom) { return getComputedStyle(document.documentElement).getPropertyValue(nom).trim(); };
  function bleus() { var out = []; for (var i = 1; i <= 7; i++) { var v = lire('--qzq-b' + i); if (v) out.push(v); } return out; }
  function poser() {
    var g = GRAINE; var alea = function () { g = (g * 9301 + 49297) % 233280; return g / 233280; };
    var cas = parseFloat(lire('--qzq-case')) || 25;
    var H = document.documentElement.scrollHeight, W = document.documentElement.clientWidth;
    var cols = Math.ceil(W / mm(cas)), rows = Math.ceil(H / mm(cas));
    var pal = bleus(); if (!pal.length) return;
    /* zones à laisser en creux : tout ce qui se lit ou se clique, avec 8 px de marge */
    var zones = [];
    var els = document.querySelectorAll('h1,h2,h3,h4,p,li,a,button,img,video,svg,input,textarea,select,.titre-carte,.qb-mur,.qb-defile,header,footer');
    for (var k = 0; k < els.length; k++) { var r = els[k].getBoundingClientRect(); if (!r.width || !r.height) continue; zones.push([r.left - 8, r.top + window.scrollY - 8, r.right + 8, r.bottom + window.scrollY + 8]); }
    var frag = document.createDocumentFragment(), nb = 0, pleins = 0;
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
      var cx = (x + .5) * mm(cas), cy = (y + .5) * mm(cas);
      var i = document.createElement('i');
      i.style.left = 'calc(' + x + ' * var(--qzq-case) + var(--qzq-bord))';
      i.style.top = 'calc(' + y + ' * var(--qzq-case) + var(--qzq-bord))';
      i.style.width = i.style.height = 'calc(var(--qzq-case) - var(--qzq-bord))';
      var tire = alea(), teinte = pal[Math.floor(alea() * pal.length)], u = (5 + alea() * 7).toFixed(1), d = (alea() * 9).toFixed(1);
      var sousTexte = false;
      for (var z = 0; z < zones.length; z++) { var q = zones[z]; if (cx > q[0] && cx < q[2] && cy > q[1] && cy < q[3]) { sousTexte = true; break; } }
      if (!sousTexte && tire < PART) { i.className = 'plein'; i.style.setProperty('--t', teinte); i.style.setProperty('--u', u + 's'); i.style.setProperty('--d', d + 's'); pleins++; }
      else i.className = 'creux';
      frag.appendChild(i); nb++;
    }
    couche.innerHTML = ''; couche.appendChild(frag);
    couche.setAttribute('data-cases', nb); couche.setAttribute('data-pleines', pleins);
  }
  var att = null; var replanifier = function () { clearTimeout(att); att = setTimeout(poser, 120); };
  if (document.readyState === 'complete') poser(); else window.addEventListener('load', poser);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(replanifier);
  window.addEventListener('resize', replanifier);
  /* la page grandit après coup (bandeau, panneau, images) : on suit la hauteur du document */
  var h0 = 0; setInterval(function () { var h = document.documentElement.scrollHeight; if (Math.abs(h - h0) > 40) { h0 = h; replanifier(); } }, 1500);
  window.qzQuadrillageReposer = poser;
})();
