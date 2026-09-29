/* QuadretI — REFONTE DE L ACCUEIL (28/09 soir). Construit les sections de la maquette v4 dans #refonte, sur la grille du site.
   Voir refonte-accueil.css pour les règles. Données : SECTIONS ci-dessous (textes réécrits, PROPOSITION à relire par le fondateur ; faits
   inchangés). Placement en cases de 25 mm : x, w dans une zone de 12 colonnes ; y (rangée) ou apres:k (sous le bloc k) + ecart (0,5 ou 1) ;
   h fixe (photos, boutons) ou automatique (cartes, arrondie à la demi-case) ; rangee:'id' = hauteurs égalisées.
   Les anciennes sections restent dans la page, masquées (classe .blk-ancien) ; leurs identifiants (#faq, #livraison…) passent aux nouvelles
   pour que les liens du menu et du pied tombent juste. Retour arrière : retirer la classe qz-refonte de <html> dans index.html. */
(function () {
  'use strict';
  var I = '/img/';
  var sa = function (t) { return t.normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  var SECTIONS = [
    { id: 'styles', ton: 'sombre', eyebrow: 'Le concept', titre: 'Qu’est-ce que Quadreti ?', blocs: [
      { t: 'texte', x: 0, y: 2, w: 7, html: '<p>Quadreti est un cadre mural modulaire. Une grille se fixe au mur ; chacune de ses cases reçoit une tesselle de 2,6 cm qui porte un visuel imprimé.</p><p>Une photo par case, ou une seule image répartie sur tout le carreau : vous composez, vous clipsez, et vous changez quand vous voulez.</p>' },
      { t: 'texte', x: 0, apres: 0, ecart: .5, w: 7, html: '<p class="accroche">De pres, des carres. De loin, une image.</p>' },
      { t: 'photo', x: 8, y: 2, w: 4, h: 3, src: I + 'bandeau-5-tesselle.jpg', alt: 'Une tesselle tenue entre deux doigts' } ] },
    { id: 'comment', ton: 'clair', eyebrow: 'Comment ça marche', titre: 'Trois gestes, sans colle ni outil.', blocs: [
      { t: 'photo', x: 0, y: 2, w: 3.5, h: 2.5, src: I + 'bandeau-1-impression.jpg', alt: 'Impression de la feuille prédécoupée' },
      { t: 'photo', x: 4, y: 2, w: 3.5, h: 2.5, src: I + 'bandeau-3-clip.jpg', alt: 'Un visuel glissé dans son étui' },
      { t: 'photo', x: 8, y: 2, w: 3.5, h: 2.5, src: I + 'bandeau-4-clipsage.jpg', alt: 'Une tesselle clipsée dans la grille' },
      { t: 'texte', x: 0, apres: 0, ecart: .5, w: 3.5, rangee: 'g', html: '<h3>1 · Imprimez</h3><p class="petit">Composez votre visuel dans Quadreti Designer, puis imprimez-le chez vous sur la feuille prédécoupée. Aucune découpe.</p>' },
      { t: 'texte', x: 4, apres: 1, ecart: .5, w: 3.5, rangee: 'g', html: '<h3>2 · Glissez</h3><p class="petit">Chaque visuel se glisse dans son étui, plié une fois et sans colle. Il reste parfaitement à plat.</p>' },
      { t: 'texte', x: 8, apres: 2, ecart: .5, w: 3.5, rangee: 'g', html: '<h3>3 · Clipsez</h3><p class="petit">La tesselle se clipse dans la grille. Pour changer, on la déclipse : quelques secondes.</p>' } ] },
    { id: 'app', ton: 'sombre', eyebrow: 'L’écosystème', titre: 'Cinq outils, un seul mur.', blocs: [
      { t: 'texte', x: 0, y: 2, w: 8, html: '<p>Le visuel se prépare à l’écran, chez vous, gratuitement. Chaque outil fait une chose et la fait bien — et tout finit sur la même grille.</p>' },
      { t: 'app', x: 0, apres: 0, ecart: 1, w: 2, rangee: 'a', lettre: 'Q', nom: 'Quadreti Designer', lien: 'https://designer.quadreti.fr', html: 'Composez photo, motif ou mosaïque, prévisualisez le mur, imprimez.' },
      { t: 'app', x: 2.5, apres: 0, ecart: 1, w: 2, rangee: 'a', lettre: 'C', nom: 'Éditeur Créatif', lien: '/editeur-creatif/', html: 'Photos, textes, formes et stickers, avec le repère des tesselles.' },
      { t: 'app', x: 5, apres: 0, ecart: 1, w: 2, rangee: 'a', lettre: 'M', nom: 'Mosaïque Créative', lien: '/mosaique-creative/', html: 'Des pièces qui se découpent, des scènes à colorier.' },
      { t: 'app', x: 7.5, apres: 0, ecart: 1, w: 2, rangee: 'a', lettre: 'QR', nom: 'QR Quadreti', lien: 'https://qr.quadreti.fr', html: 'Des QR codes qui sont de vraies créations.' },
      { t: 'app', x: 10, apres: 0, ecart: 1, w: 2, rangee: 'a', lettre: 'P', nom: 'Photo Quadreti', lien: '/photo-quadreti/', html: 'Détourez, redressez, recadrez, restaurez vos photos.' },
      { t: 'bouton', x: 0, apres: 1, ecart: 1, w: 3, texte: 'Voir le Studio', lien: '/outils.html' } ] },
    { id: 'designer', ton: 'clair', eyebrow: 'Quadreti Designer', titre: 'De la photo au mur.', blocs: [
      { t: 'photo', x: 0, y: 2, w: 4.5, h: 3, src: I + 'bandeau-app-03-composition.jpg', alt: 'Une composition dans Quadreti Designer' },
      { t: 'texte', x: 5, y: 2, w: 7, html: '<p>Quadreti Designer transforme vos photos en composition prête à imprimer : photo entière, motif, pixel ou mosaïque à double lecture.</p><p>Vous choisissez, il calcule, et l’aperçu vous montre le mur avant l’impression. Aucun talent requis.</p>' },
      { t: 'bouton', x: 5, apres: 1, ecart: 1, w: 3, texte: 'Ouvrir Designer', lien: 'https://designer.quadreti.fr', externe: true } ] },
    { id: 'resultat', ton: 'sombre', eyebrow: 'Le résultat', titre: 'Le même mur, transformé.', blocs: [
      { t: 'avantapres', x: 0, y: 2, w: 5, h: 5, avant: I + 'comparateur-avant.jpg', imgApres: I + 'comparateur-apres.jpg' },
      { t: 'texte', x: 6, y: 2, w: 6, html: '<p>La grille reste au mur. Seules les images changent — en quelques minutes, autant de fois que vous le voulez.</p><p class="petit">Faites glisser le curseur : même grille, même place au mur, autre visuel.</p>' } ] },
    { id: 'pourqui', ton: 'clair', eyebrow: 'Pour qui', titre: 'D’abord pour vous.', blocs: [
      { t: 'texte', x: 0, y: 2, w: 12, html: '<p>Un souvenir personnel qui prend forme sur votre mur, sans compétence créative particulière. Pour offrir, ou pour vous offrir. Les créateurs y trouvent aussi un terrain de jeu : ce sont nos premiers ambassadeurs.</p>' },
      { t: 'texte', x: 0, apres: 0, ecart: 1, w: 5.5, rangee: 'p', html: '<h3>Changez l’image, pas le mur</h3><p class="petit">Une tesselle se déclipse et se remplace en quelques secondes. Le mur entier change d’image pour le prix d’une feuille imprimée.</p>' },
      { t: 'texte', x: 6.5, apres: 0, ecart: 1, w: 5.5, rangee: 'p', html: '<h3>Tout se réutilise</h3><p class="petit">Le support, la tesselle, le visuel. Achetez le support une fois ; vos compositions se gardent et se reclipsent quand vous voulez.</p>' } ] },
    { id: 'grandir', ton: 'sombre', eyebrow: 'Commencez petit', titre: 'Le mur suivra.', blocs: [
      { t: 'texte', x: 0, y: 2, w: 7, html: '<p>Un carreau aujourd’hui, un mur entier quand vous voudrez : les carreaux s’accolent sans rupture visible, de 20 × 20 cm à 100 × 100 cm et au-delà.</p>' },
      { t: 'format', x: 0, apres: 0, ecart: .5, w: 2, rangee: 'f', html: '<b>×1</b><span>20 × 20 cm</span>' },
      { t: 'format', x: 2.5, apres: 0, ecart: .5, w: 2, rangee: 'f', html: '<b>×4</b><span>40 × 40 cm</span>' },
      { t: 'format', x: 5, apres: 0, ecart: .5, w: 2, rangee: 'f', html: '<b>×9</b><span>60 × 60 cm</span>' },
      { t: 'photo', x: 7.5, y: 2, w: 4.5, h: 3, src: I + 'mur-etape-10.jpg', alt: 'Un grand mur composé de plusieurs carreaux' } ] },
    { id: 'gamme', ton: 'clair', eyebrow: 'La gamme', titre: 'Choisissez votre taille.', blocs: [
      { t: 'texte', x: 0, y: 2, w: 5, html: '<p>Chaque kit contient la grille, les tesselles, les étuis et la feuille prédécoupée à imprimer.</p><p class="petit">Livraison en point relais offerte dès le format ×4. Au-delà du ×9 ou sur mesure : chaque carreau supplémentaire à 12,50 €.</p>' },
      { t: 'bouton', x: 0, apres: 0, ecart: 1, w: 3, texte: 'Commander', lien: '/boutique/' },
      { t: 'bouton', x: 3.5, apres: 0, ecart: 1, w: 1.5, texte: 'Galerie', lien: '/boutique/', classe: 'light' },
      { t: 'photo', x: 5.5, y: 2, w: 6.5, h: 3.5, src: I + 'bandeau-7-mur.jpg', alt: 'Un mur Quadreti de plusieurs carreaux' } ] },
    { id: 'cadeau', ton: 'sombre', eyebrow: 'À offrir', titre: 'Un cadeau qui continue.', blocs: [
      { t: 'photo', x: 0, y: 2, w: 5.5, h: 3, src: I + 'bandeau-6-pose.jpg', alt: 'Des tesselles posées au mur' },
      { t: 'texte', x: 6, y: 2, w: 6, html: '<p>Anniversaire, fête des mères, Noël, crémaillère : offrez une expérience à créer, ou une création déjà prête.</p>' },
      { t: 'texte', x: 6, apres: 1, ecart: .5, w: 2.75, rangee: 'o', html: '<h3>Offrez le kit</h3><p class="petit">Le destinataire compose lui-même. Le cadeau, c’est le geste.</p>' },
      { t: 'texte', x: 9.25, apres: 1, ecart: .5, w: 2.75, rangee: 'o', html: '<h3>Offrez le résultat</h3><p class="petit">Une création composée et imprimée par Quadreti, prête à clipser.</p>' } ] },
    { id: 'faq', ton: 'clair', eyebrow: 'Questions fréquentes', titre: 'Tout ce que vous vous demandez.', faq: [
      ['Je n’ai pas d’imprimante, je fais comment ?', 'Le service impression s’en charge : Quadreti imprime votre création et vous l’envoie prête à clipser. Sinon, toute imprimante jet d’encre domestique convient.'],
      ['Ça tient au mur ? Et si je suis locataire ?', 'La grille se fixe par une punaise à chaque coin : des trous minimes, invisibles à l’état des lieux. Les tesselles d’angle recouvrent les points de fixation.'],
      ['Et si je me trompe en montant ?', 'Chaque tesselle se déclipse et se replace en quelques secondes. Son code de position au dos (B2 · D5) indique exactement sa place.'],
      ['Ça marche avec quelles photos ?', 'Toutes les photos de votre téléphone. Quadreti Designer vous guide et l’aperçu montre le résultat avant l’impression.'],
      ['Faut-il être doué de ses mains ?', 'Non. Imprimer, glisser, clipser : trois gestes sans colle, sans outil, sans temps de séchage.'] ] },
    { id: 'livraison', ton: 'sombre', eyebrow: 'Livraison et paiement', titre: 'Commandez en confiance.', blocs: [
      { t: 'texte', x: 0, y: 2, w: 5.5, rangee: 'l', html: '<h3>Livraison en point relais</h3><p class="petit">Expédiée en point relais ou en locker, via Mondial Relay ou Chronopost, partout en France métropolitaine. Suivi par e-mail à chaque étape, emballage soigné.</p>' },
      { t: 'texte', x: 6.5, y: 2, w: 5.5, rangee: 'l', html: '<h3>Paiement sécurisé</h3><p class="petit">Règlement via PayPal, par carte bancaire sans créer de compte ou avec votre compte PayPal. Vos données bancaires ne nous sont jamais transmises.</p>' } ] },
    { id: 'commander', ton: 'clair', eyebrow: 'Commandez', titre: 'Votre mur commence ici.', blocs: [
      { t: 'texte', x: 3, y: 2, w: 6, html: '<p>Un carreau, quarante-neuf tesselles, une feuille à imprimer. Tout commence par un carré.</p>' },
      { t: 'bouton', x: 3, apres: 0, ecart: 1, w: 3, texte: 'Commander mon kit', lien: '/boutique/' } ] }
  ];
  var ANCIENS = ['styles', 'comment', 'app', 'designer', 'resultat', 'pourqui', 'grandir', 'gamme', 'cadeau', 'faq', 'livraison'];
  var mm = function (v) { return v * 96 / 25.4; }, CASE = mm(25), ouverts = {};
  var demi = function (px) { return Math.ceil(px / (CASE / 2) - 0.02) / 2; };
  var root = document.getElementById('refonte'); if (!root) return;
  document.documentElement.classList.add('qz-refonte');
  /* les anciennes sections : masquées, identifiants cédés aux nouvelles */
  ANCIENS.forEach(function (id) { var e = document.getElementById(id); if (e) { e.classList.add('blk-ancien'); e.id = id + '-ancien'; } });
  Array.prototype.forEach.call(document.querySelectorAll('section.finale'), function (e) { e.classList.add('blk-ancien'); });
  function contenuBloc(b) {
    if (b.t === 'texte') return '<div class="r-carte">' + b.html + '</div>';
    if (b.t === 'app') return '<div class="r-carte r-app"><a href="' + b.lien + '"' + (/^https?:/.test(b.lien) ? ' target="_blank" rel="noopener"' : '') + '><span class="ini">' + b.lettre + '</span><h3>' + b.nom + '</h3></a><p class="petit">' + b.html + '</p></div>';
    if (b.t === 'format') return '<div class="r-carte r-format">' + b.html + '</div>';
    return '';
  }
  var mesure = document.createElement('div'); mesure.className = 'r-mesure'; mesure.setAttribute('aria-hidden', 'true');
  function mesurer(html, w, ton) { if (!mesure.parentNode) root.appendChild(mesure); mesure.className = 'r-mesure ' + ton; mesure.innerHTML = '<div class="r-bloc" style="position:static;height:auto;width:' + (w * CASE) + 'px">' + html + '</div>'; var c = mesure.firstChild.firstChild; c.style.height = 'auto'; return c.getBoundingClientRect().height; }
  /* le tracé de l onglet du menu, et son échelle réelle (l emboîtement en dépend) */
  function onglet() { var svg = document.querySelector('.qz-header svg.qz-onglet'), trait = svg && svg.querySelector('.qz-onglet-trait');
    if (!svg || !trait) return null; var vb = (svg.getAttribute('viewBox') || '').split(/\s+/).map(Number); var h = svg.getBoundingClientRect().height;
    var pxu = (h > 0 && vb[3] > 0) ? h / vb[3] : 98 / 35; /* en-tete pas encore dessine (ecran de mot de passe, chargement) : echelle par defaut de l onglet, 98 px pour 35 unites -- mesure du 28/09 : sinon viewBox « Infinity » */
    return { d: trait.getAttribute('d'), x0: vb[0] || 18, w: vb[2] || 480, pxu: pxu }; }
  function construire() {
    var W = document.documentElement.clientWidth, full = Math.floor(W / CASE), mobile = W < 700, off = Math.max(0, Math.floor((full - 12) / 2));
    var O = onglet(); if (!O) return;
    /* le haut de #refonte tombe sur une ligne de la grille du site */
    root.style.marginTop = '0px'; var top = root.getBoundingClientRect().top + window.scrollY; root.style.marginTop = (Math.ceil(top / CASE - 0.001) * CASE - top) + 'px';
    root.innerHTML = ''; var ligne = 0;
    var hU = CASE / O.pxu; /* hauteur de la bande en unités du tracé : une case, à l échelle de l onglet */
    SECTIONS.forEach(function (s, k) {
      var ton = s.ton, y0 = ligne, sec = document.createElement('section'); sec.className = ton; sec.id = s.id; sec.setAttribute('aria-labelledby', 'r-t-' + s.id); root.appendChild(sec);
      var blocs = s.faq ? s.faq.map(function (q, i) { return { t: 'faq', x: 0, w: 12, q: q[0], r: q[1], i: i, apres: i ? i - 1 : undefined, ecart: .5, y: i ? undefined : 2 }; }) : s.blocs.map(function (b) { return Object.assign({}, b); });
      if (mobile) { var larg = (W - CASE) / CASE; blocs.forEach(function (b, i) { b.x = 0.5 - off; if (b.t === 'photo' || b.t === 'avantapres') { var r = b.h / b.w; b.w = larg; b.h = Math.round(larg * r * 2) / 2; } else b.w = larg; b.rangee = null; if (i === 0) { b.y = 2; b.apres = undefined; } else { b.apres = i - 1; b.ecart = .5; b.y = undefined; } }); }
      blocs.forEach(function (b) {
        if (b.t === 'bouton') b.h = .5;
        else if (b.t === 'faq') { var ouv = ouverts[s.id + ':' + b.i]; b.htmlFaq = '<div class="r-faq"><button type="button" aria-expanded="' + (ouv ? 'true' : 'false') + '">' + b.q + '<span aria-hidden="true">' + (ouv ? '−' : '+') + '</span></button>' + (ouv ? '<p>' + b.r + '</p>' : '') + '</div>'; b.h = Math.max(1, demi(mesurer(b.htmlFaq, b.w, ton) + CASE * .5)); }
        else if (!b.h) b.h = Math.max(1, demi(mesurer(contenuBloc(b), b.w, ton) + CASE * .25));
      });
      var rg = {}; blocs.forEach(function (b) { if (b.rangee) rg[b.rangee] = Math.max(rg[b.rangee] || 0, b.h); }); blocs.forEach(function (b) { if (b.rangee) b.h = rg[b.rangee]; });
      blocs.forEach(function (b) { if (b.y === undefined) { var p = blocs[b.apres]; b.y = p.y + p.h + (b.ecart || .5); } });
      var dep = {}; blocs.forEach(function (b) { if (b.rangee) dep[b.rangee] = Math.max(dep[b.rangee] || 0, b.y); }); blocs.forEach(function (b) { if (b.rangee) b.y = dep[b.rangee]; });
      var fin = 0; blocs.forEach(function (b) { fin = Math.max(fin, b.y + b.h); }); var hauteur = Math.ceil(fin - 1e-6) + 1;
      if (ton === 'clair') { var f = document.createElement('div'); f.className = 'sec-clair'; var hautClair = 1; /* 30/09 soir : la bande de titre couvre de nouveau une case pleine -- le gris commence sous elle, le creux reste à la section du dessus */ /* 30/09 : bandes de titre plus courtes qu une case (barre fine) -- le gris et sa grille remontent jusque sous la bande, qui les couvre ; décalage d une case entière, la grille reste calée */ f.style.top = 'calc(' + (y0 + hautClair) + ' * var(--qzr-case))'; f.style.height = 'calc(' + (hauteur - hautClair) + ' * var(--qzr-case))'; sec.appendChild(f); }
      blocs.forEach(function (b) { var d;
        if (b.t === 'photo') { d = document.createElement('figure'); d.className = 'r-bloc r-photo'; d.innerHTML = '<img src="' + b.src + '" alt="' + b.alt + '" loading="lazy">'; }
        else if (b.t === 'avantapres') { d = document.createElement('figure'); d.className = 'r-bloc r-photo r-avantapres'; d.innerHTML = '<img src="' + b.avant + '" alt="Le mur avant" loading="lazy"><img class="apres" src="' + b.imgApres + '" alt="Le même mur, après" loading="lazy"><span class="lib" style="left:10px">Avant</span><span class="lib" style="right:10px">Après</span><span class="ligne"></span><input type="range" min="0" max="100" value="50" aria-label="Comparer avant et après">'; d.querySelector('input').addEventListener('input', function () { d.style.setProperty('--cur', this.value + '%'); }); }
        else if (b.t === 'bouton') { d = document.createElement('div'); d.className = 'r-bloc r-bouton'; d.innerHTML = '<a class="cta ' + (b.classe || '') + '" href="' + b.lien + '"' + (b.externe ? ' target="_blank" rel="noopener"' : '') + '>' + b.texte + '</a>'; }
        else if (b.t === 'faq') { d = document.createElement('div'); d.className = 'r-bloc'; d.innerHTML = b.htmlFaq; d.querySelector('button').addEventListener('click', function () { var c = s.id + ':' + b.i; ouverts[c] = !ouverts[c]; var yy = window.scrollY; construire(); window.scrollTo(0, yy); var nb = document.querySelectorAll('#' + s.id + ' .r-faq button')[b.i]; if (nb) nb.focus({ preventScroll: true }); }); }
        else { d = document.createElement('div'); d.className = 'r-bloc'; d.innerHTML = contenuBloc(b); }
        d.style.setProperty('--x', off + b.x); d.style.setProperty('--y', y0 + b.y); d.style.setProperty('--w', b.w); d.style.setProperty('--h', b.h); sec.appendChild(d); });
      var pente = ((182 - O.x0) / O.w * 100).toFixed(2) + '%';
      var QD = window.qzDecroche, BO = QD && QD.actif() ? QD.bordOnglet() : null; /* 30/09 : barre fine (index.html) — décroché harmonisé, version A */
      var t = document.createElement('div'); t.className = 'r-bande ' + ton; t.style.top = 'calc(' + y0 + ' * var(--qzr-case))';
      if (BO) { /* 30/09 : emboîtement parfait sous l onglet — même marche (bas de l onglet - bande du haut), mêmes arrondis ; bande de 1,5 case */
        var BW = document.documentElement.clientWidth, x0b = BO.x0 + BO.gauche - root.getBoundingClientRect().left, mb = Math.max(QD.marche, BO.yBas - QD.haut), hB = CASE, /* 30/09 soir, fondateur : la bande de titre reprend une case pleine, jusqu à la ligne de grille, en aplat (comme les anciens onglets) ; seule la marche (mb) suit l onglet du menu */ cb = QD.courbe(x0b, mb, mb / QD.marche), trb = 'M0 ' + mb.toFixed(2) + ' H' + cb.xDebut.toFixed(2) + ' ' + cb.aller + ' H' + BW; pente = (cb.xFin / BW * 100).toFixed(2) + '%'; t.style.height = CASE.toFixed(2) + 'px';
        t.innerHTML = '<svg viewBox="0 0 ' + BW + ' ' + hB.toFixed(3) + '" preserveAspectRatio="none" aria-hidden="true"><path class="r-fond" d="' + trb + ' L' + BW + ' ' + hB.toFixed(3) + ' L0 ' + hB.toFixed(3) + ' Z"/><path class="r-trait" d="' + trb + '"/></svg>' +
        '<div class="contenu en-ligne" style="left:calc(' + pente + ' + var(--qzr-case) * .5);top:0;bottom:auto;height:' + (2 * Math.max(10, BO.cy - QD.haut)).toFixed(2) + 'px"><p class="eyebrow">' + s.eyebrow + '</p><h2 id="r-t-' + s.id + '">' + sa(s.titre) + '</h2></div>'; } else /* 30/09 : chapo et titre sur UNE ligne, centrés sur la ligne du logo quand la bande est sous le menu */
      t.innerHTML = '<svg viewBox="' + O.x0 + ' 170.19 ' + O.w + ' ' + hU.toFixed(3) + '" preserveAspectRatio="none" aria-hidden="true"><path class="r-fond" d="' + O.d + ' L498 ' + (170.19 + hU).toFixed(3) + ' L18 ' + (170.19 + hU).toFixed(3) + ' Z"/><path class="r-trait" d="' + O.d + '"/></svg>' +
        '<div class="contenu" style="left:calc(' + pente + ' + var(--qzr-case) * .5)"><p class="eyebrow">' + s.eyebrow + '</p><h2 id="r-t-' + s.id + '">' + sa(s.titre) + '</h2></div>';
      /* 30/09 soir, fondateur (« voile non ») : PAS de boîte dans le creux — il montre la suite de ce qui est au-dessus (photo, ou section précédente) ; les cases coupées sont rebouchées par decroches.js. Voir SITE/DESIGN SYSTEME/REGLES-ONGLETS-BANDES.md */
      sec.appendChild(t); ligne += hauteur;
    });
    root.style.height = (ligne * CASE) + 'px';
    if (window._qzrIO) window._qzrIO.disconnect();
    if (!('IntersectionObserver' in window)) { Array.prototype.forEach.call(root.querySelectorAll('.r-photo'), function (p) { p.classList.add('clip'); }); return; }
    window._qzrIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('clip'); window._qzrIO.unobserve(e.target); } }); }, { threshold: .25 });
    Array.prototype.forEach.call(root.querySelectorAll('.r-photo'), function (p) { window._qzrIO.observe(p); });
    if (window.qzQuadrillageReposer) setTimeout(window.qzQuadrillageReposer, 60);
  }
  /* ÉTAPE 4 : le pied de l accueil — réseaux en haut de la première colonne, logo en bas */
  function pied() { var col = document.querySelector('footer.qz-footer .qz-basdepage'), res = document.querySelector('footer.qz-footer .qz-reseaux');
    if (!col || !res || col.contains(res)) return; col.insertBefore(res, col.firstChild); col.classList.add('r-pied-col'); }
  var att = null; var relancer = function () { clearTimeout(att); att = setTimeout(construire, 150); };
  var lancer = function () { construire(); pied(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', lancer); else lancer();
  window.addEventListener('load', construire);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(construire);
  window.addEventListener('resize', relancer);
  /* la bannière au-dessus change de hauteur après coup (séquence, photos) : on suit la position de #refonte */
  var haut0 = 0; setInterval(function () { var t = root.getBoundingClientRect().top + window.scrollY - (parseFloat(root.style.marginTop) || 0); if (Math.abs(t - haut0) > 1) { haut0 = t; construire(); } }, 1000);
  window.qzRefonteConstruire = construire;
})();
