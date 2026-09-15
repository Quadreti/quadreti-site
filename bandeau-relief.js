/* QuadretI — bandeau d'accueil "carreaux 7x7 en relief" (10/09/2026). Construit le mur dans #qbBandeau, calcule la
   découpe des visuels et les keyframes des cycles, puis lance la séquence (CSS pur). Réglages = ceux exportés par le fondateur le 10/09 (bloc « Code à reprendre ») depuis
   SITE\POLICE PROPRIETAIRE\bandeau-relief-outil.html (réglages par défaut). Pour changer un réglage : REGLAGES ci-dessous. */
(function () {
  'use strict';
  var REGLAGES = {
    cx: 4, cy: 2, ecart: 0, grilleFixe: true, disposition: 'droite', /* 11/09 fondateur : 4x2 pour occuper la largeur a hauteur egale (le mur est plafonne en hauteur pour tenir sur un 14 pouces) */ /* 'droite' = textes + bouton a gauche, mur a droite ; 'colonne' = textes au-dessus/dessous */ mobile: { max: 640, cx: 2, cy: 2 }, /* carreaux en largeur / hauteur, écart entre carreaux (cqw) */
    /* 12/09 soir, fondateur : sequence logique de 13 photos (photo site 1, n° 1 a 13, recadrees en 2:1 = 1200x600) : etuis, feuilles, imprimante, mains (etui, tesselle), grille vide, coeur, clipsage, coeur en biais, salon. */
    visuels: [
      /* 1 a 5 — la moitie NUMERIQUE (13/09, cinq nouvelles photos du fondateur) : on arrive sur le site, on ouvre le Studio, on compose,
         le motif est fini, on regarde le mur complet. */
      '/img/bandeau-app-01-accueil.jpg', '/img/bandeau-app-02-grille.jpg', '/img/bandeau-app-03-composition.jpg',
      '/img/bandeau-app-04-motif.jpg', '/img/bandeau-app-05-apercu.jpg',
      /* 6 a 17 — la moitie PHYSIQUE, sequence du 12/09 : etuis, feuilles, imprimante, mains (etui, tesselle), grille vide, coeur, clipsage. */
      '/img/bandeau-seq-01.jpg', '/img/bandeau-seq-02.jpg', '/img/bandeau-seq-03.jpg', '/img/bandeau-seq-04.jpg',
      '/img/bandeau-seq-05.jpg', '/img/bandeau-seq-06.jpg', '/img/bandeau-seq-07.jpg', '/img/bandeau-seq-08.jpg',
      '/img/bandeau-seq-09.jpg', '/img/bandeau-seq-10.jpg', '/img/bandeau-seq-11.jpg', '/img/bandeau-seq-12.jpg',
      /* 18 — le plan imprime pose a cote du panneau fini : le pont entre l impression et le resultat. Elle ouvrait le diaporama
         jusqu au 13/09, le fondateur l a demandee en avant-derniere. */
      '/img/bandeau-seq-00.jpg',
      /* 19 — le salon. Derniere, et elle tient 60 s avant de reboucler (voir diaporama.tenueFin). */
      '/img/bandeau-seq-13.jpg'
    ], ancrage: 'centre',
    /* 13/09 fondateur : le mur devient un diaporama en fondu des visuels ci-dessus (une photo a la fois, format d origine). duree = tenue de chaque photo (s),
       fondu = duree du fondu (s), tenueFin = tenue supplementaire de la derniere photo avant de reboucler. actif: false = mur en tesselles comme avant. */
    diaporama: { actif: true, duree: 2, fondu: .8, tenueFin: 58,
      /* 13/09 fondateur : duree PAR PHOTO, pour les seules photos qui en ont besoin. Les cinq du parcours numerique sont quasi
         identiques -- meme piece, meme personne, meme bureau ; seul l ecran change, et il est petit dans le cadre. L oeil doit le
         trouver, lire une interface miniature, comprendre l etape : ca ne se fait pas en 2 s. Les photos produit, tres contrastees
         entre elles, se lisent d un coup d oeil et gardent la duree generale ci-dessus. */
      dureeParPhoto: {
        '/img/bandeau-app-01-accueil.jpg': 4, '/img/bandeau-app-02-grille.jpg': 4, '/img/bandeau-app-03-composition.jpg': 4,
        '/img/bandeau-app-04-motif.jpg': 4, '/img/bandeau-app-05-apercu.jpg': 4
      } }, /* 13/09 fondateur : 2 s par photo (divise par 2), fondu .8 s ; la derniere photo (le salon) reste 60 s en tout (2 + 58) avant de reboucler */
    couleurs: { fond: '#1e2b35', cadre: '#1e2f45', creux: '#2b3e54', couleur1: 'var(--qz-terracotta,#d96c2f)', couleur2: '#dedede', titre: '#dedede' /* 12/09 fondateur : textes du bandeau navy en gris clair #dedede (comme la barre) */ },
    lum: .28, ombre: .6, grain: .08, relief: 4, txtRelief: 1,
    depart: 0, dg: .2, pause: .5, ordre: 'quatre', pace: .12, A: .9, H: 2, Rt: 1.3, E: 2.3, lat: 75,
    zoom: { actif: false, x: 0, y: 0, facteur: 1, aller: 1.8, tenue: 1.3 },
    textes: { l1: 'Composez.', l2: 'Imprimez.', l3: 'Clipsez.', l4: 'Changez à volonté.', dispo: 'ligne', police1: 'Jura', taille1: 3, police2: 'Jura', taille2: 3, ecartT: .9, quand: 'ouverture', position: 'haut-bas', mode: 'aucun', /* 12/09 : 'clip' pour retrouver le clipsage lettre par lettre */ ln: .3, dn: .1,
      /* 11/09, disposition 'droite' (reference Pixel Corner) : accroche en capitales (baseline 1), gros titre (baseline 2), paragraphe, deux boutons */
      accroche: 1.15, titre: 4.6, /* tailles en cqw (bornees en px dans le CSS) */
      para: 'Un seul support, mille créations possibles. Imprimez, clipsez, changez de décor quand vous voulez.',
      cta2: { texte: 'Galerie', href: '/boutique/' } /* 11/09 soir : libelle Galerie (fondateur) ; pas encore de page galerie, le lien va a la boutique en attendant */ },
    /* 11/09 soir, fondateur : sequence generale de la page (en secondes) -- logo > naming > categorie > accroche > menu > titre > paragraphe > boutons > mur > icones.
       pas = intervalle entre deux tesselles du Q ; naming / cat / accroche / titre = intervalle entre deux lettres ; menu / icones = intervalle entre deux elements ;
       pause = respiration entre deux etapes ; pauseFin = tenue supplementaire du DERNIER visuel du mur avant de reboucler. */
    /* 12/09 fondateur : essai d une photo en arriere-plan du bandeau (IMAGE.png -> img/bandeau-fond-salon.jpg, 1920 px). Voile navy plus fort a gauche
       (lisibilite des textes) que sur le mur. image: null = fond navy uni. */
    fond: { image: null, voileGauche: .84, voileDroite: .5, position: 'center 38%' }, /* essai abandonne le 12/09 (fondateur : « reviens en arriere ») : navy uni */
    /* 12/09 fondateur : toutes les animations retirees sauf le visuel du mur -> actif: false (logo, textes, menu, icones fixes ; remettre true pour la sequence) */
    /* 12/09 : bords du bandeau dessines par le fondateur (BORD 1-2-3.svg). Lisere le long du bord libre en option : actif, couleur ('accent' = orange du panneau, ou un code), epaisseur en px. */
    bords: { lisere: { actif: true, couleur: 'accent', epaisseur: 3, reflet: { actif: false, mode: 'changement', duree: 7, voyage: 2.2, longueur: 6, decalage: .35, couleur: 'rgba(255,255,255,.75)' }, trace: { actif: false, duree: 1.4, decalage: .35 } } }, /* 12/09 fondateur : lisere fixe, pistes A/B/D testees puis coupees (actif:false), reglages conserves */ /* reflet.mode : 'boucle' (piste B, cycle = duree) ou 'changement' (piste D, un eclat a chaque changement de visuel, voyage en s) ; trace (piste A) : la ligne se dessine au chargement, duree et decalage entre bords en s */ /* reflet (12/09, piste B) : un eclat parcourt la ligne, cycle en s, tiret en % de la ligne, decalage entre bords en s */ /* 12/09 : essai lisere orange (fondateur), epaissi a 3 px */
    sequence: { actif: true, portee: 'logo', /* 'logo' = seules les animations du bloc logo (tesselles, categorie qui sort, naming, accroche) ; 'tout' = sequence complete */ depart: .4, pas: .15, naming: .1, cat: .04, accroche: .07, menu: .12, titre: .07, pause: .25, icones: .25, pauseFin: 60,
      vie: 8, vieDuree: 1.6, vieSouleve: 1.3 /* pendant la pause finale : une tesselle se declipse / reclipse toutes les `vie` s (duree du geste, facteur de soulevement) */ }
  };
  var CASES = 7;
  /* ---- bords dessines par le fondateur (BORD 1-2-3.svg, decoupes par le fil : forme fermee = fond, ligne du bord libre = lisere).
     Unites mm, viewBox etire en largeur et en hauteur ; trait d epaisseur fixe en px (vector-effect), couleur et epaisseur par variables CSS. ---- */
  var BORDS = {"haut":{"vb":[18.00000188403,149.4999095560001,479.99981791596997,34.99999600000001],"fond":"M18 159.5 L498 159.5 L498 170.19 L182.68 170.19 Q181.96 170.19 181.26 170.25 Q180.63 170.3 179.92 170.42 Q179.27 170.53 178.64 170.69 Q177.92 170.88 177.29 171.1 Q176.55 171.36 175.94 171.63 Q175.21 171.97 174.57 172.33 Q173.96 172.68 173.35 173.1 Q172.67 173.58 172.09 174.08 Q171.52 174.56 170.99 175.12 L164.38 181.97 Q164.16 182.21 163.94 182.39 Q163.64 182.64 163.28 182.9 Q162.97 183.11 162.64 183.3 Q162.28 183.5 161.86 183.7 Q161.52 183.85 161.07 184.01 Q160.72 184.13 160.28 184.25 Q159.91 184.34 159.51 184.41 Q159.15 184.47 158.82 184.5 L18 184.5 L18 159.5 L18 159.5 Z","extra":"M18 149.5 H498 V159.7 H18 Z","trait":"M18 184.5 L158.82 184.5 Q159.15 184.47 159.51 184.41 Q159.91 184.34 160.28 184.25 Q160.72 184.13 161.07 184.01 Q161.52 183.85 161.86 183.7 Q162.28 183.5 162.64 183.3 Q162.97 183.11 163.28 182.9 Q163.64 182.64 163.94 182.39 Q164.16 182.21 164.38 181.97 L170.99 175.12 Q171.52 174.56 172.09 174.08 Q172.67 173.58 173.35 173.1 Q173.96 172.68 174.57 172.33 Q175.21 171.97 175.94 171.63 Q176.55 171.36 177.29 171.1 Q177.92 170.88 178.64 170.69 Q179.27 170.53 179.92 170.42 Q180.63 170.3 181.26 170.25 Q181.96 170.19 182.68 170.19 L498 170.19"},"bas":{"vb":[3.5999979999999923,165.16999399999995,479.999,8.33],"fond":"M3.6 159.5 L483.6 159.5 L483.6 173.5 L224.77 173.5 L224.72 173.5 Q224.42 173.48 224.09 173.45 Q223.69 173.42 223.33 173.37 Q222.88 173.31 222.55 173.25 Q222.08 173.17 221.76 173.09 Q221.32 172.99 220.96 172.88 Q220.64 172.79 220.33 172.68 Q219.96 172.55 219.65 172.42 Q219.44 172.33 219.21 172.2 L212.63 168.7 Q212.08 168.41 211.52 168.16 Q210.93 167.91 210.24 167.66 Q209.64 167.45 209.03 167.27 Q208.39 167.08 207.65 166.91 Q207.04 166.77 206.3 166.63 Q205.68 166.52 204.96 166.43 Q204.33 166.35 203.68 166.29 Q202.97 166.23 202.35 166.2 Q201.64 166.17 200.92 166.17 L3.6 166.17 L3.6 159.5 L3.6 159.5 Z","extra":"","trait":"M3.6 166.17 L200.92 166.17 Q201.64 166.17 202.35 166.2 Q202.97 166.23 203.68 166.29 Q204.33 166.35 204.96 166.43 Q205.68 166.52 206.3 166.63 Q207.04 166.77 207.65 166.91 Q208.39 167.08 209.03 167.27 Q209.64 167.45 210.24 167.66 Q210.93 167.91 211.52 168.16 Q212.08 168.41 212.63 168.7 L219.21 172.2 Q219.44 172.33 219.65 172.42 Q219.96 172.55 220.33 172.68 Q220.64 172.79 220.96 172.88 Q221.32 172.99 221.76 173.09 Q222.08 173.17 222.55 173.25 Q222.88 173.31 223.33 173.37 Q223.69 173.42 224.09 173.45 Q224.42 173.48 224.72 173.5 L224.77 173.5 L483.6 173.5"},"defile":{"vb":[9.000000774792966,220.7203897267749,479.9999948669969,6.7],"fond":"M489 222.28 L489 220.72 L487.02 220.72 L102.14 220.72 L102.03 220.73 Q101.71 220.74 101.35 220.76 Q100.91 220.79 100.52 220.83 Q100.01 220.89 99.65 220.94 Q99.13 221.01 98.76 221.08 Q98.26 221.17 97.86 221.26 Q97.49 221.35 97.14 221.44 Q96.69 221.57 96.32 221.69 Q96.05 221.79 95.73 221.92 L89.22 224.63 Q88.74 224.84 88.26 225 Q87.73 225.18 87.11 225.35 Q86.58 225.5 86.03 225.63 Q85.45 225.76 84.76 225.89 Q84.21 225.99 83.52 226.09 Q82.96 226.16 82.28 226.23 Q81.71 226.29 81.1 226.33 Q80.45 226.38 79.88 226.4 Q79.21 226.42 78.54 226.42 L9 226.42 L9 234.72 L489 234.72 L489 222.28 L489 222.28 Z","extra":"","trait":"M9 226.42 L78.54 226.42 Q79.21 226.42 79.88 226.4 Q80.45 226.38 81.1 226.33 Q81.71 226.29 82.28 226.23 Q82.96 226.16 83.52 226.09 Q84.21 225.99 84.76 225.89 Q85.45 225.76 86.03 225.63 Q86.58 225.5 87.11 225.35 Q87.73 225.18 88.26 225 Q88.74 224.84 89.22 224.63 L95.73 221.92 Q96.05 221.79 96.32 221.69 Q96.69 221.57 97.14 221.44 Q97.49 221.35 97.86 221.26 Q98.26 221.17 98.76 221.08 Q99.13 221.01 99.65 220.94 Q100.01 220.89 100.52 220.83 Q100.91 220.79 101.35 220.76 Q101.71 220.74 102.03 220.73 L102.14 220.72 L487.02 220.72 L489 220.72"}};
  var SVGNS = 'http://www.w3.org/2000/svg';
  function bordElement(nom, classe, couleur, seulLigne) { /* seulLigne : calque de la ligne seule, pose au premier plan */
    var s = BORDS[nom]; var svg = document.createElementNS(SVGNS, 'svg'); svg.setAttribute('class', 'qb-bord ' + classe); svg.setAttribute('viewBox', s.vb.join(' ')); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('aria-hidden', 'true');
    if (!seulLigne) { var fond = document.createElementNS(SVGNS, 'path'); fond.setAttribute('class', 'qb-bord-fond'); fond.setAttribute('fill', couleur); fond.setAttribute('d', s.fond + (s.extra ? ' ' + s.extra : '')); svg.appendChild(fond); return svg; }
    svg.setAttribute('overflow', 'visible');
    var LT = (REGLAGES.bords && REGLAGES.bords.lisere && REGLAGES.bords.lisere.trace) || {};
    var trait = document.createElementNS(SVGNS, 'path'); trait.setAttribute('class', 'qb-bord-trait'); trait.setAttribute('fill', 'none'); trait.setAttribute('vector-effect', 'non-scaling-stroke'); trait.setAttribute('stroke-linejoin', 'round'); trait.setAttribute('stroke-linecap', 'round'); trait.setAttribute('d', s.trait); if (LT.actif) { trait.setAttribute('pathLength', '1000'); trait.setAttribute('stroke-dasharray', '1000 1000'); trait.classList.add('qb-bord-trace'); trait.style.setProperty('--trace-duree', (LT.duree || 1.4) + 's'); } svg.appendChild(trait);
    var R = (REGLAGES.bords && REGLAGES.bords.lisere && REGLAGES.bords.lisere.reflet) || {};
    if (R.actif) { var ref = trait.cloneNode(false); ref.setAttribute('class', 'qb-bord-reflet'); ref.setAttribute('pathLength', '1000'); var tiret = Math.round((R.longueur || 6) * 10); ref.setAttribute('stroke-dasharray', tiret + ' 2000'); ref.style.setProperty('--reflet-tiret', tiret); ref.style.setProperty('--reflet-duree', (R.duree || 7) + 's'); ref.style.stroke = R.couleur || 'rgba(255,255,255,.75)'; if (R.mode !== 'changement') ref.classList.add('qb-reflet-boucle'); svg.appendChild(ref); }
    return svg;
  }
  /* 15/09 : les marches entre sections. Une section qui porte `data-marche-haut` / `data-marche-bas` recoit le tracé
     demandé, peint de SA couleur, avec le lisere sur le bord libre. Valeur attendue : « tracé:cote », ou tracé vaut
     haut|bas|defile (marche a ~30 %, ~42 %, ~15 % de la largeur) et cote vaut gauche|droite. */
  function poserMarches() {
    document.querySelectorAll('[data-marche-haut],[data-marche-bas]').forEach(function (sec) {
      var fond = getComputedStyle(sec).backgroundColor;
      ['haut', 'bas'].forEach(function (bord) {
        var v = sec.getAttribute('data-marche-' + bord); if (!v) return;
        if (sec.querySelector('.qz-marche-' + bord)) return;
        var p = v.split(':'), trace = p[0], cote = p[1] || 'gauche';
        if (!BORDS[trace]) return;
        /* Le fond d abord, la ligne ensuite et par-dessus : la ligne doit pouvoir deborder du rognage. */
        [false, true].forEach(function (seulLigne) {
          var svg = bordElement(trace, 'qz-marche qz-marche-' + bord + (seulLigne ? ' qb-bord-ligne' : ''), fond, seulLigne);
          /* 15/09 : SANS le chemin `extra`. Le trace « haut » en porte un — une barre pleine largeur au sommet de sa boite,
             qui sert a peindre le gris de l en-tete au-dessus de l onglet. Peinte ici dans la couleur de la section, elle
             posait un liséré de navy AU-DESSUS de la ligne orange. Constate par le fondateur en haut de la section. */
          /* 15/09 : le remplissage est RECONSTRUIT a partir de la LIGNE, ferme vers le bas de la boite.
             Les chemins d origine portent, en plus de la marche, les bandes pleines de leur usage d origine — le trace
             « haut » contient la barre grise de l en-tete, et un chemin `extra` par-dessus. Peintes dans la couleur de la
             section, elles posaient du navy AU-DESSUS de la ligne orange : c est ce que le fondateur a vu, en bas d abord,
             puis en haut. Fermer la ligne vers le bas ne garde que la matiere qui touche la section. Vrai pour les trois
             traces, sans cas particulier. */
          if (!seulLigne) {
            var vb = BORDS[trace].vb, basY = vb[1] + vb[3], gX = vb[0], dX = vb[0] + vb[2];
            var d = svg.querySelector(".qb-bord-fond");
            /* On ferme BIEN AU-DELA du bas de la boite : le rognage de la viewBox coupe net et la derniere rangee de
               pixels reste pleine. Fermer pile sur le bord laisserait un liseré adouci par l anticrenelage. */
            if (d) d.setAttribute("d", BORDS[trace].trait + " L" + dX + " " + (basY + vb[3]) + " L" + gX + " " + (basY + vb[3]) + " Z");
          }
          /* Miroir : vertical pour la marche du HAUT (le tracé est dessine pour un bord bas), horizontal pour le cote droit. */
          /* 15/09 : le miroir vertical etait a l ENVERS. Le trace porte sa matiere SOUS la ligne — il sert normalement de
             bord HAUT d une bande. Au bas d une section, il faut donc le retourner pour que la couleur se tienne au-dessus
             du lisere ; en haut, il va tel quel. Constate par le fondateur : le navy pendait sous le lisere. */
          var sx = (cote === 'droite') ? -1 : 1, sy = (bord === 'bas') ? -1 : 1;
          if (sx < 0 || sy < 0) svg.style.transform = 'scale(' + sx + ',' + sy + ')';
          sec.appendChild(svg);
        });
      });
    });
  }

  function poserBords() {
    var L = (REGLAGES.bords && REGLAGES.bords.lisere) || {}; var accent = '#d96c2f';
    try { accent = getComputedStyle(document.documentElement).getPropertyValue('--qz-terracotta').trim() || accent; } catch (e) {}
    var couleur = (!L.couleur || L.couleur === 'accent') ? accent : L.couleur; var navy = (REGLAGES.couleurs && REGLAGES.couleurs.fond) || '#1e2b35';
    document.documentElement.style.setProperty('--lisere-couleur', couleur); document.documentElement.style.setProperty('--lisere-ep', (L.actif ? (L.epaisseur || 3) : 0));
    var poser = function (parent, nom, classe, fill) { if (!parent || parent.querySelector('.' + classe)) return; parent.insertBefore(bordElement(nom, classe, fill), parent.firstChild); parent.appendChild(bordElement(nom, classe + ' qb-bord-ligne', fill, true)); };
    /* 12/09 : l onglet du haut (BORD 1) est dessine par l en-tete commune (commun-bandeau.js), plus par le bandeau */
    var bande = document.querySelector('.qb-gestes'), defile = document.querySelector('.qb-defile');
    poser(bande, 'bas', 'qb-bord-bas', navy); poser(bande, 'defile', 'qb-bord-defile-haut', navy); poser(defile, 'defile', 'qb-bord-defile-bas', navy);
    poserMarches();   /* 15/09 : les marches entre sections, memes tracés */
    var dec = (L.reflet && L.reflet.mode !== 'changement' && L.reflet.decalage) || 0; ['qb-bord-haut', 'qb-bord-bas', 'qb-bord-defile-haut', 'qb-bord-defile-bas'].forEach(function (k, i) { var r = document.querySelector('.qb-bord-ligne.' + k + ' .qb-bord-reflet'); if (r) r.style.animationDelay = (i * dec) + 's'; });
  }  var root = document.getElementById('qbBandeau'); if (!root) return;
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
    /* 12/09 piste D : eclat du lisere a chaque changement de visuel (depart des tesselles du visuel k), sur la meme periode que le mur */
    var LR = (REGLAGES.bords && REGLAGES.bords.lisere && REGLAGES.bords.lisere.reflet) || {};
    if (LR.actif && LR.mode === 'changement') {
      var voy = LR.voyage || 2.2, tiret = Math.round((LR.longueur || 6) * 10), kf = '', kfi = '';
      for (var q = 0; q < N; q++) { var tq = debut[q] + A + vague + tenue(q); if (tq + voy >= P) continue;
        kf += pc(tq) + '{stroke-dashoffset:' + tiret + '}' + pc(tq + voy) + '{stroke-dashoffset:-1000}';
        kfi += pc(tq) + '{stroke-dashoffset:-1000}' + pc(tq + voy) + '{stroke-dashoffset:' + tiret + '}'; }
      css += '@keyframes qb-reflet-changement{0%{stroke-dashoffset:-1000}' + kf + '100%{stroke-dashoffset:-1000}}';
      css += '@keyframes qb-reflet-changement-inv{0%{stroke-dashoffset:' + tiret + '}' + kfi + '100%{stroke-dashoffset:' + tiret + '}}';
    }
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
  var FD = REGLAGES.fond; if (FD && FD.image) { root.classList.add('qb-fond-photo'); R.setProperty('--fond-image', 'url("' + FD.image + '")'); R.setProperty('--voile-g', FD.voileGauche); R.setProperty('--voile-d', FD.voileDroite); R.setProperty('--fond-pos', FD.position || 'center'); }
  R.setProperty('--cases', CASES); R.setProperty('--cx', cx); R.setProperty('--cy', cy); R.setProperty('--ecart', REGLAGES.ecart + 'cqw');
  R.setProperty('--lum', REGLAGES.lum); R.setProperty('--ombre', REGLAGES.ombre); R.setProperty('--grain', REGLAGES.grain); R.setProperty('--relief', REGLAGES.relief + 'px'); R.setProperty('--txt-relief', REGLAGES.txtRelief);
  ['depart', 'dg', 'pause', 'A', 'H', 'Rt', 'E'].forEach(function (k) { R.setProperty('--' + k, REGLAGES[k] + 's'); }); R.setProperty('--lat', REGLAGES.lat + 'cqw');
  R.setProperty('--zx', REGLAGES.zoom.x + '%'); R.setProperty('--zy', REGLAGES.zoom.y + '%'); R.setProperty('--zoom', REGLAGES.zoom.facteur);
  R.setProperty('--police1', "'" + T.police1 + "',sans-serif"); R.setProperty('--police2', "'" + T.police2 + "',sans-serif"); if (droite) { R.setProperty('--taille1', 'clamp(11px,' + T.accroche + 'cqw,15px)'); R.setProperty('--taille2', 'clamp(28px,' + T.titre + 'cqw,68px)'); } else { R.setProperty('--taille1', 'clamp(13px,' + T.taille1 + 'cqw,40px)'); R.setProperty('--taille2', 'clamp(13px,' + T.taille2 + 'cqw,52px)'); } R.setProperty('--ecart-t', T.ecartT + 'cqw'); R.setProperty('--ln', T.ln + 's'); R.setProperty('--dn', T.dn + 's');
  /* le hero passe sous le menu (index.html) : on garde la baseline 1 sous le menu, pas dessous */
  /* 11/09 : le menu (liens visibles, voir bandeau-relief.css) passe DANS la barre du haut, et le bord gauche du logo s'aligne sur celui de la colonne de textes */
  var menu = document.querySelector('.qz-header'); var nav = document.getElementById('qzNavPanel');
  if (menu && nav && nav.parentNode !== menu) { menu.appendChild(nav); menu.classList.add('qz-menu-visible'); }
  if (menu && REGLAGES.sequence && REGLAGES.sequence.actif === false) menu.classList.add('qb-sans-anim');
  /* index des liens du menu (delais en cascade) ; le panneau du site (reglages-site.js, menu_liens) reconstruit la liste apres coup -> on re-indexe a chaque changement */
  function indexerMenu() { if (nav) Array.prototype.forEach.call(nav.querySelectorAll(':scope > ul > li'), function (li, i) { li.style.setProperty('--i-menu', String(i)); }); }
  indexerMenu(); if (nav && window.MutationObserver) new MutationObserver(indexerMenu).observe(nav, { childList: true, subtree: true });
  /* 11/09 fondateur (mock-up D3) : sur bureau, l accroche (baseline 1) rejoint le bloc logo de la barre, sous la categorie ; sur mobile elle revient dans la colonne */
  var b1 = root.querySelector('.qb-b1'), colTexte = root.querySelector('.qb-col'), wmCol = menu && menu.querySelector('.qz-wm-col');
  if (b1) b1.style.setProperty('--ln', T.ln + 's');
  function placerAccroche() {
    if (!b1) return; var large = window.matchMedia && window.matchMedia('(min-width:901px)').matches;
    if (droite && large && wmCol) { var catEl = wmCol.querySelector('.qz-cat'); if (b1.parentNode !== wmCol) { if (catEl) wmCol.insertBefore(b1, catEl); else wmCol.appendChild(b1); } } /* 12/09 : accroche en 2e ligne, categorie (orange) en 3e */
    else if (colTexte && b1.parentNode !== colTexte) colTexte.insertBefore(b1, colTexte.firstChild);
    if (menu) menu.classList.toggle('qz-b1-dans-entete', !!(droite && large && wmCol)); /* 12/09 : l accroche statique de l en-tete commune s efface quand l accroche animee est dans le bloc */
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
    var MARGE = 16, BLOC = 66, BARRE = 58, DECROCHE = 22, logoRow = menu.querySelector('.qz-logorow'), naming = menu.querySelector('.qz-naming'); /* BLOC = cote du Q = hauteur des trois lignes ; BARRE = hauteur de la barre sous le menu (12/09, trait rouge du fondateur) ; DECROCHE = profondeur des decroches du bas */
    if (droite && large) {
      menu.style.paddingTop = '0px'; menu.style.paddingBottom = '0px'; menu.style.paddingLeft = MARGE + 'px';
      menu.style.height = BARRE + 'px'; R.setProperty('--onglet', (BLOC + 2 * MARGE) + 'px'); R.setProperty('--decroche-h', DECROCHE + 'px');
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
    R.paddingTop = menu.offsetHeight + Math.round(root.offsetWidth * (droite ? (large ? .012 : .022) : .03) + (droite && large ? DECROCHE : 0)) + 'px';
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
  poserBords(); window.addEventListener('load', poserBords); setTimeout(poserBords, 1500); window.addEventListener('resize', poserBords);
  caler(); if (window.ResizeObserver) new ResizeObserver(caler).observe(root); /* recale logo et menu des que le bloc change de taille (mur plafonne, polices chargees) */
  var dernierMobile = estMobile(); window.addEventListener('resize', function () { caler(); if (estMobile() !== dernierMobile) { dernierMobile = estMobile(); root.classList.remove('qb-joue'); preparer(); void root.offsetWidth; if (lanceDeja) root.classList.add('qb-joue'); } });
  /* 13/09 : diaporama -- une <img> par visuel dans .qb-diapo. Fondu croise en CSS (transition d opacite sur .qb-visible), enchainement par
     minuteur JS. Commandes (fondateur, 13/09) : des points centres sous le cadre, un par photo, l actuel en orange ; clic = aller a la photo ;
     souris posee sur la photo = pause ; fleches gauche / droite au clavier quand le cadre a le focus. Demarre au lancer du mur. */
  var diapo = null;
  function construireDiapo() {
    var D = REGLAGES.diaporama, T = REGLAGES.textes, p = REGLAGES.pause; cx = nbCarreaux().cx; cy = nbCarreaux().cy; R.setProperty('--cx', cx); R.setProperty('--cy', cy);
    var N = visuels.length, dur = D.duree || 4, fondu = Math.min(D.fondu || 1, dur / 2), fin = D.tenueFin || 0;
    /* Une duree par photo : celle de dureeParPhoto si elle y figure, la duree generale sinon. Le fondu, lui, reste le meme partout
       (il se joue PENDANT la tenue, il ne s y ajoute pas) ; il est borne a la moitie de la plus courte pour ne jamais la manger. */
    var durees = visuels.map(function (v) { return (D.dureeParPhoto && D.dureeParPhoto[v]) || dur; });
    var total = durees.reduce(function (a, b) { return a + b; }, 0);
    fondu = Math.min(fondu, Math.min.apply(null, durees) / 2);
    var html = '<div class="qb-diapo" tabindex="0" role="region" aria-roledescription="diaporama" aria-label="Photos du kit Quadreti">' + visuels.map(function (v, k) { var dd = dims[v] || { w: 3, h: 2 }; var carre = Math.abs(dd.w / dd.h - 1) < .08;
      return '<img class="qb-diapo-img' + (carre ? ' qb-carre' : '') + (k === 0 ? ' qb-visible' : '') + '" src="' + v + '" alt="" style="--fondu:' + fondu + 's"' + (k > 1 ? ' loading="lazy"' : '') + '>'; }).join('') + '</div>' +
      '<div class="qb-diapo-points" role="tablist" aria-label="Choisir une photo">' + visuels.map(function (v, k) { return '<button type="button" role="tab" class="qb-diapo-point' + (k === 0 ? ' qb-actif' : '') + '" aria-label="Photo ' + (k + 1) + ' sur ' + N + '" aria-selected="' + (k === 0) + '"></button>'; }).join('') + '</div>';
    mur.innerHTML = html; mur.classList.add('qb-mur-diapo'); style.textContent = '';
    var cadre = mur.querySelector('.qb-diapo'), imgs = cadre.querySelectorAll('.qb-diapo-img'), points = mur.querySelectorAll('.qb-diapo-point');
    var idx = 0, minuteur = null, survol = false, demarre = false, reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    function montrer(n) { var prec = imgs[idx]; idx = (n + N) % N; var cur = imgs[idx]; Array.prototype.forEach.call(points, function (pt, k) { pt.classList.toggle('qb-actif', k === idx); pt.setAttribute('aria-selected', String(k === idx)); }); if (prec === cur) return; cur.style.zIndex = 2; cur.classList.add('qb-visible'); prec.style.zIndex = 1;
      setTimeout(function () { if (prec !== imgs[idx]) { prec.classList.remove('qb-visible'); prec.style.zIndex = 0; } }, fondu * 1000 + 60); }
    function planifier() { clearTimeout(minuteur); if (survol || reduit || !demarre) return; minuteur = setTimeout(function () { montrer(idx + 1); planifier(); }, (durees[idx] + (idx === N - 1 ? fin : 0)) * 1000); }
    Array.prototype.forEach.call(points, function (pt, k) { pt.addEventListener('click', function () { montrer(k); planifier(); }); });
    cadre.addEventListener('mouseenter', function () { survol = true; clearTimeout(minuteur); });
    cadre.addEventListener('mouseleave', function () { survol = false; planifier(); });
    cadre.addEventListener('keydown', function (e) { if (e.target !== cadre) return; if (e.key === 'ArrowLeft') { montrer(idx - 1); planifier(); e.preventDefault(); } else if (e.key === 'ArrowRight') { montrer(idx + 1); planifier(); e.preventDefault(); } });
    diapo = { demarrer: function (delai) { if (demarre) return; setTimeout(function () { demarre = true; planifier(); }, Math.max(0, delai) * 1000); } };
    var t0 = REGLAGES.depart + REGLAGES.dg + p; R.setProperty('--tc', t0.toFixed(2) + 's'); R.setProperty('--P', (total + fin).toFixed(2) + 's'); /* somme reelle des tenues, et non N x duree generale */
    completPose = t0 + fondu; tChangement = t0 + durees[0]; /* le titre apparait au premier changement de photo : donc apres la tenue de la PREMIERE */ R.setProperty('--t-changement', tChangement.toFixed(2) + 's');
    var tl1 = T.quand === 'ouverture' ? REGLAGES.depart + .3 : tChangement; var l1 = document.querySelector('.qb-l1'); var lettresB1 = l1 ? l1.querySelectorAll('.qb-l').length : 0;
    var durB1 = T.mode === 'clip' || T.mode === 'dactylo' ? (lettresB1 - 1) * T.ln + .45 : T.dn; var tl4 = tl1 + durB1 + p;
    R.setProperty('--tl1', tl1.toFixed(2) + 's'); R.setProperty('--tl2', tl1.toFixed(2) + 's'); R.setProperty('--tl3', tl1.toFixed(2) + 's'); R.setProperty('--tl4', tl4.toFixed(2) + 's');
  }
  var preparer = function () {
    if (REGLAGES.diaporama && REGLAGES.diaporama.actif) { construireDiapo(); return; }
    construire();
    var p = REGLAGES.pause; var t0 = REGLAGES.depart + REGLAGES.dg + p; R.setProperty('--tc', t0.toFixed(2) + 's');
    dyn();
    var complet = t0 + REGLAGES.A + dureeVague; completPose = complet; var z = REGLAGES.zoom; var zoomDur = z.actif ? 2 * z.aller + z.tenue + .6 : 0;
    /* 10/09 : les baselines apparaissent quand les tesselles commencent a repartir (fin de la tenue du visuel 1), l'une apres l'autre */
    /* 11/09 : 'ouverture' = les textes se clipsent des l'ouverture de la page (demande fondateur), 'depart' = quand les tesselles repartent, 'pose' = une fois le visuel 1 pose */
    var tl1 = T.quand === 'ouverture' ? REGLAGES.depart + .3 : T.quand === 'depart' ? complet + REGLAGES.H + zoomDur : complet + .3;
    /* 12/09 fondateur : « Changez a volonte. » et le geste Changez apparaissent en fondu quand le mur commence a changer (depart du visuel 1) */
    tChangement = complet + REGLAGES.H + zoomDur; R.setProperty('--t-changement', tChangement.toFixed(2) + 's');
    var lettresB1 = document.querySelector('.qb-l1').querySelectorAll('.qb-l').length; /* l accroche peut vivre dans la barre du haut */ var durB1 = T.mode === 'clip' || T.mode === 'dactylo' ? (lettresB1 - 1) * T.ln + .45 : T.dn;
    var tl4 = tl1 + durB1 + p;
    R.setProperty('--tl1', tl1.toFixed(2) + 's'); R.setProperty('--tl2', tl1.toFixed(2) + 's'); R.setProperty('--tl3', tl1.toFixed(2) + 's'); R.setProperty('--tl4', tl4.toFixed(2) + 's');
  };
  var completPose = 0, vivantes = [], tChangement = 0;
  var lanceDeja = false; var lancer = function () {
    lanceDeja = true; root.classList.add('qb-joue');
    if (diapo) diapo.demarrer(parseFloat(R.getPropertyValue('--tc')) || 0); /* 13/09 : diaporama pilote par minuteur, meme depart que le mur */
    var LR2 = (REGLAGES.bords && REGLAGES.bords.lisere && REGLAGES.bords.lisere.reflet) || {};
    if (LR2.actif && LR2.mode === 'changement') { var P2 = parseFloat(R.getPropertyValue('--P')) || 0, tc2 = parseFloat(R.getPropertyValue('--tc')) || 0, dec2 = LR2.decalage || 0;
      ['qb-bord-haut', 'qb-bord-bas', 'qb-bord-defile-haut', 'qb-bord-defile-bas'].forEach(function (k, i) { var r = document.querySelector('.qb-bord-ligne.' + k + ' .qb-bord-reflet'); if (r) r.style.animation = (k === 'qb-bord-defile-bas' ? 'qb-reflet-changement-inv' : 'qb-reflet-changement') + ' ' + P2.toFixed(2) + 's linear ' + (tc2 + i * dec2).toFixed(2) + 's infinite'; }); }
    /* icones pedagogiques : une par une, des que le premier visuel du mur est entierement pose */
    var bande = document.querySelector('.qb-gestes'); if (bande) { bande.style.setProperty('--t-changement', tChangement.toFixed(2) + 's'); bande.classList.add('qb-changement'); }
    if (bande && droite && !(SEQ && (SEQ.actif === false || SEQ.portee === 'logo'))) { bande.style.setProperty('--t-icones', completPose.toFixed(2) + 's'); bande.style.setProperty('--icones-pas', ((REGLAGES.sequence && REGLAGES.sequence.icones) || .25) + 's'); bande.classList.add('qb-gestes-joue'); }
    document.documentElement.classList.remove('qb-attente-icones'); /* anti-flash (index.html) : les icones sortent de l attente au moment ou leur animation est posee */
  };
  /* 11/09 soir : sequence generale, calee sur le depart de l animation du logo (classe qz-anime posee par commun-bandeau.js).
     Toutes les etapes sont des delais CSS a partir de ce moment ; le mur part par minuteur a la fin des boutons. */
  var SEQ = REGLAGES.sequence, sequenceLancee = false;
  function poserTrace(base) { /* 12/09 piste A : la ligne se dessine a partir de base (s), les 4 bords en cascade */
    var LT = (REGLAGES.bords && REGLAGES.bords.lisere && REGLAGES.bords.lisere.trace) || {}; if (!LT.actif) return; var dec = LT.decalage || 0;
    ['qb-bord-haut', 'qb-bord-bas', 'qb-bord-defile-haut', 'qb-bord-defile-bas'].forEach(function (k, i) { var t = document.querySelector('.qb-bord-ligne.' + k + ' .qb-bord-trace'); if (t) t.style.setProperty('--t-lisere', (base + i * dec).toFixed(2) + 's'); });
  }
  function demarrerSequence() {
    if (sequenceLancee || !SEQ || SEQ.actif === false || !droite || !menu) return false; sequenceLancee = true;
    var large = window.matchMedia && window.matchMedia('(min-width:901px)').matches; if (!large) return false;
    var s = SEQ, M = menu.style;
    var nAcc = document.querySelectorAll('.qb-l1 .qb-l').length || 27, nTitre = document.querySelectorAll('.qb-b2 .qb-l').length || 18, nMenu = nav ? nav.querySelectorAll(':scope > ul > li').length : 8;
    /* 12/09 fondateur : tesselles du Q, puis l accroche qui SORT de la tesselle (glisse depuis le Q), puis la categorie, puis le naming (apparitions simples) */
    /* 12/09 : tesselles > categorie qui sort de la tesselle (ta) > naming (tn) > accroche (tb) */
    var t0 = s.depart + s.pause, t1 = t0 + 10 * s.pas + .55, ta = t1 + s.pause, tn = ta + .6 + s.pause, tb = tn + .5 + s.pause;
    var tm = tb + .5 + s.pause, /* (12/09 : tb = accroche, derniere ligne) */ tt = tm + (nMenu - 1) * s.menu + .4 + s.pause, tp = tt + (nTitre - 1) * s.titre + .45 + .2, tb1 = tp + .5, tb2 = tb1 + .25, tw = tb2 + .5 + .4;
    var sec = function (v) { return v.toFixed(2) + 's'; };
    M.setProperty('--qz-depart', sec(s.depart)); M.setProperty('--qz-dg', '0s'); M.setProperty('--qz-pause', sec(s.pause)); M.setProperty('--qz-pas', sec(s.pas)); M.setProperty('--qz-ln', sec(s.naming)); M.setProperty('--qz-lc', sec(s.cat));
    M.setProperty('--qz-t0', sec(t0)); M.setProperty('--qz-t1', sec(t1)); M.setProperty('--qz-tn', sec(tn)); M.setProperty('--qz-tb', sec(tb)); M.setProperty('--qz-ta', sec(ta)); M.setProperty('--qz-tm', sec(tm)); M.setProperty('--qz-menu-pas', sec(s.menu));
    if (b1) b1.style.setProperty('--ln', sec(s.accroche));
    R.setProperty('--ln', sec(s.titre)); R.setProperty('--tt', sec(tt)); R.setProperty('--tp', sec(tp)); R.setProperty('--tb1', sec(tb1)); R.setProperty('--tb2', sec(tb2));
    poserTrace(tb + .3);
    if (s.portee === 'logo') {
      /* seul le bloc logo s anime ; le reste est visible tout de suite, le mur part 1 s apres la derniere ligne du logo */
      menu.classList.add('qb-seq-logo'); document.documentElement.classList.remove('qb-attente', 'qb-attente-icones');
      setTimeout(lancer, Math.round((tb + .5 + 1) * 1000)); return true;
    }
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
    var partir = function () { if (lance) return; lance = true; poserTrace(.3); document.documentElement.classList.remove('qb-attente', 'qb-attente-icones'); /* pas de sequence : tout visible */ setTimeout(lancer, PAUSE_APRES_LOGO); };
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
