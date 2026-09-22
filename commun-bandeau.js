/* QuadretI — bandeau + menu communs (28/08)
   Source UNIQUE du header/nav, remplace le HTML copie-colle sur chaque page.
   Chemins ABSOLUS (/index.html, /contact.html...) : marchent identiquement
   quelle que soit la profondeur du dossier de la page qui charge ce script,
   plus besoin d'ajuster les "../" par page (source du bug qui a laisse
   Editeur Creatif deriver du reste du site). A inclure via :
     <script src="/commun-bandeau.js"></script>
   exactement a l'endroit ou le bandeau doit apparaitre (document.write ecrit
   au fil de la lecture de la page -- ce script ne doit donc JAMAIS avoir
   l'attribut defer/async, sinon rien ne s'affiche).
   Le HTML brut ci-dessous n'est qu'un repli avant que reglages-site.js ne
   charge menu_liens depuis Supabase (source reelle du menu en prod, voir
   appliquerMenuLiens) -- le garder synchronise avec la vraie valeur en base
   reste la responsabilite de qui edite le menu, comme avant ce fichier.
   Journal : JOURNAL.md, entree du 28/08 "Bandeau commun". */
/* 09/09 : logo V5 anime, puis 10/09 : logo "Q grille" en relief (grille 4x4, tesselles clipsees, naming + baseline en relief),
   demande fondateur. Styles et police dans /logo-v5.css (charge ici pour ne pas toucher aux 32 pages). */
/* 13/09 : base facultative (data-base) pour les apps servies hors du site. Vide = comportement d origine. */
var QZ_BASE = (function () {
  var sc = document.currentScript, b = (sc && sc.getAttribute('data-base')) || '';
  return b.charAt(b.length - 1) === '/' ? b.slice(0, -1) : b;
})();
/* Les feuilles de style vivent A COTE du script (le site les sert a la racine, une app hors site en garde une copie voisine). */
var QZ_CSS = QZ_BASE ? './' : '/';
/* 18/09 : numero de version sur les feuilles communes. GitHub Pages les sert en max-age=600 — dix minutes pendant
   lesquelles un depot reste invisible, et pendant lesquelles on croit qu il n a pas eu lieu. A BUMPER a chaque fois
   qu une feuille commune change : c est le prix d un rechargement fiable. */
var QZ_VER = '?v=2026-09-22e';
document.write('<link rel="stylesheet" href="' + QZ_CSS + 'logo-v5.css' + QZ_VER + '">');
document.write('<link rel="stylesheet" href="' + QZ_CSS + 'entete-commun.css' + QZ_VER + '">'); /* 12/09 : en-tete commune (barre, onglet, bloc logo, menu visible) */

/* 13/09, demande fondateur : chaque app porte SON logo dans la barre -- l initiale de son nom en tesselles, une orange integree a la
   lettre, barre navy et lettre grise (l inverse du site), sans accroche ni categorie. Une page d app le declare AVANT ce script :
     <script>window.qzApp = { lettre: 'N', nom: 'Number Pixel Quadreti', baseline: 'Chargez. Repérez. Coloriez.' };</script>
     <script src="/commun-bandeau.js"></script>
   Declaration apres coup = sans effet : ce script ecrit au fil de la lecture de la page (document.write), il lit qzApp a cet instant.
   Alphabet : 4 rangees toujours (la hauteur du Q), largeur naturelle de la lettre, '#' tesselle, '.' vide, 'o' tesselle orange.
   Source et arbitrages : planche « L alphabet Quadreti », et JOURNAL.md (entree du 13/09). */
var QZ_ALPHABET = {
  C: ['###.', '#...', '#...', '##o.'], /* Canevas Quadreti -- l orange au bout de la barre basse, la ou le C s ouvre */
  D: ['###.', '#..#', '#..#', 'o##.'], /* Designer Quadreti -- l orange au coin bas gauche */
  M: ['#...#', '##.##', '#.#.#', '#...o'], /* Mosaique Quadreti -- seule lettre a cinq colonnes, son V l exige */
  N: ['#..#', '##.#', '#.##', 'o..#'], /* Number Pixel Quadreti -- l orange au pied de la jambe gauche */
  P: ['###.', '#.#.', '###.', 'o...'], /* Photo Quadreti -- l orange au pied de la hampe, ce qui fait un P et pas un D */
  Q: ['###.', '#.#.', '#.#.', '###o'], /* la marque -- la queue, sous l anneau */
  R: ['#o', '#.', '#.', '#.']  /* QR Quadreti — variante du fondateur, alignee le 13/09 sur le dessin valide dans l app QR : une tesselle de moins a la hampe superieure, l orange au bout du chapeau */
};
/* --- Trace de chaque lettre : l ordre dans lequel une main la dessine (13/09, demande du fondateur). --------------------------
   Coordonnees "x,y", origine en haut a gauche. La derniere case de chaque liste est la tesselle ORANGE : elle signe la fin du geste.
   C : on part en haut a droite, on file a gauche, on descend, on repart a droite -- le C s ouvre la ou l orange se pose.
   D : la panse d abord, la hampe ensuite, qui descend jusqu a l orange du pied.
   M : jambe gauche vers le bas, le V remonte et redescend, jambe droite jusqu a l orange.
   N : jambe droite vers le bas, la diagonale remonte, jambe gauche jusqu a l orange du pied.
   P : la panse se ferme, la hampe la complete, puis descend a l orange -- le trace dessine par le fondateur.
   Q : l anneau fait le tour et finit au coin bas droit, d ou part la queue orange.
   R : la hampe monte, le chapeau part a droite et se termine sur l orange (variante du fondateur, deux colonnes).
   --------------------------------------------------------------------------------------------------------------------------- */
var QZ_TRACE = {
  C: ['2,0','1,0','0,0','0,1','0,2','0,3','1,3','2,3'],
  D: ['0,0','1,0','2,0','3,1','3,2','2,3','1,3','0,1','0,2','0,3'],
  M: ['0,0','0,1','0,2','0,3','1,1','2,2','3,1','4,0','4,1','4,2','4,3'],
  N: ['3,0','3,1','3,2','3,3','2,2','1,1','0,0','0,1','0,2','0,3'],
  P: ['0,0','1,0','2,0','2,1','2,2','1,2','0,2','0,1','0,3'],
  Q: ['2,2','2,1','2,0','1,0','0,0','0,1','0,2','0,3','1,3','2,3','3,3'],
  R: ['0,3','0,2','0,1','0,0','1,0']
};
var qzApp = (window.qzApp && QZ_ALPHABET[window.qzApp.lettre]) ? window.qzApp : null;
/* 18/09 : cette feuille etait la SEULE des trois a etre ecrite SANS numero de version. Les cinq apps
   servaient donc un entete-app.css fige en cache, et un correctif pose ici n arrivait jamais en ligne. */
if (qzApp) document.write('<link rel="stylesheet" href="' + QZ_CSS + 'entete-app.css' + QZ_VER + '">');
function qzPlaqueLettre(lettre){
  var g = QZ_ALPHABET[lettre], n = g[0].length, h = '', y, x, c;
  /* on rogne les colonnes de droite entierement vides : le C et le P sont dessines dans une boite de quatre colonnes dont la
     derniere ne sert pas, et ce vide se verrait comme un blanc entre la lettre et le nom. */
  while (n > 1 && g.every(function(r){ return r.charAt(n - 1) === '.'; })) n--;
  /* 13/09 : l index d animation suit le TRACE de la lettre, pas la grille. L ordre du DOM, lui, reste celui de la grille --
     c est lui qui place les cases. Une case absente du trace (il ne devrait pas y en avoir) passe en fin de geste. */
  var trace = QZ_TRACE[lettre] || [], rang = {};
  for (var k = 0; k < trace.length; k++) rang[trace[k]] = k;
  for (y = 0; y < 4; y++) for (x = 0; x < n; x++){
    c = g[y].charAt(x);
    var i = rang[x + ',' + y];
    if (i === undefined) i = trace.length;
    h += '<span class="qz-case ' + (c === 'o' ? 'qz-o' : (c === '#' ? 'qz-b' : 'qz-g')) + '" style="--i:' + i + '"><span class="qz-tuile"></span></span>';
  }
  return '<span class="qz-wordmark-img qz-logo5 qz-plaque qz-plaque-lettre" style="--cols:' + n + '" aria-hidden="true">' + h + '</span>';
}
var QZ_BANDEAU_HTML = (
  '<header class="qz-header' + (qzApp ? ' qz-app' : '') + '">' +
    /* 12/09 : onglet de l en-tete = BORD 1 du fondateur (!BAZAR A MORAD\\ONGLET, + 10 mm de gris au-dessus), forme + ligne du bord libre en lisere */
    '<svg class="qz-onglet" viewBox="18.00000188403 149.4999095560001 479.99981791596997 34.99999600000001" preserveAspectRatio="none" aria-hidden="true"><path class="qz-onglet-fond" d="M18 159.5 L498 159.5 L498 170.19 L182.68 170.19 Q181.96 170.19 181.26 170.25 Q180.63 170.3 179.92 170.42 Q179.27 170.53 178.64 170.69 Q177.92 170.88 177.29 171.1 Q176.55 171.36 175.94 171.63 Q175.21 171.97 174.57 172.33 Q173.96 172.68 173.35 173.1 Q172.67 173.58 172.09 174.08 Q171.52 174.56 170.99 175.12 L164.38 181.97 Q164.16 182.21 163.94 182.39 Q163.64 182.64 163.28 182.9 Q162.97 183.11 162.64 183.3 Q162.28 183.5 161.86 183.7 Q161.52 183.85 161.07 184.01 Q160.72 184.13 160.28 184.25 Q159.91 184.34 159.51 184.41 Q159.15 184.47 158.82 184.5 L18 184.5 L18 159.5 L18 159.5 Z M18 149.5 H498 V159.7 H18 Z"/><path class="qz-onglet-trait" vector-effect="non-scaling-stroke" d="M18 184.5 L158.82 184.5 Q159.15 184.47 159.51 184.41 Q159.91 184.34 160.28 184.25 Q160.72 184.13 161.07 184.01 Q161.52 183.85 161.86 183.7 Q162.28 183.5 162.64 183.3 Q162.97 183.11 163.28 182.9 Q163.64 182.64 163.94 182.39 Q164.16 182.21 164.38 181.97 L170.99 175.12 Q171.52 174.56 172.09 174.08 Q172.67 173.58 173.35 173.1 Q173.96 172.68 174.57 172.33 Q175.21 171.97 175.94 171.63 Q176.55 171.36 177.29 171.1 Q177.92 170.88 178.64 170.69 Q179.27 170.53 179.92 170.42 Q180.63 170.3 181.26 170.25 Q181.96 170.19 182.68 170.19 L498 170.19"/></svg>' +
    '<a class="qz-logorow" href="/index.html" aria-label="' + (qzApp ? qzApp.nom + ' — retour à quadreti.fr' : 'Quadreti — accueil') + '" id="qzLogoRow">' +
    (qzApp ? qzPlaqueLettre(qzApp.lettre) + '<span class="qz-wm-col"><span class="qz-app-nom">' + qzApp.nom + '</span>'
      /* 13/09 : la baseline de l app, trois verbes comme l accroche de la marque. Facultative : une app qui n en declare pas n en affiche pas. */
      + (qzApp.baseline ? '<span class="qz-app-baseline">' + qzApp.baseline + '</span>' : '') + '</span>' : '') +
    (qzApp ? '' :
      '<span class="qz-wordmark-img qz-logo5 qz-plaque" aria-hidden="true"><span class="qz-case qz-b" style="--i:4"><span class="qz-tuile"></span></span><span class="qz-case qz-b" style="--i:3"><span class="qz-tuile"></span></span><span class="qz-case qz-b" style="--i:2"><span class="qz-tuile"></span></span><span class="qz-case qz-g" style="--i:0"><span class="qz-tuile"></span></span><span class="qz-case qz-b" style="--i:5"><span class="qz-tuile"></span></span><span class="qz-case qz-g" style="--i:1"><span class="qz-tuile"></span></span><span class="qz-case qz-b" style="--i:1"><span class="qz-tuile"></span></span><span class="qz-case qz-g" style="--i:2"><span class="qz-tuile"></span></span><span class="qz-case qz-b" style="--i:6"><span class="qz-tuile"></span></span><span class="qz-case qz-g" style="--i:3"><span class="qz-tuile"></span></span><span class="qz-case qz-b" style="--i:0"><span class="qz-tuile"></span></span><span class="qz-case qz-g" style="--i:4"><span class="qz-tuile"></span></span><span class="qz-case qz-b" style="--i:7"><span class="qz-tuile"></span></span><span class="qz-case qz-b" style="--i:8"><span class="qz-tuile"></span></span><span class="qz-case qz-b" style="--i:9"><span class="qz-tuile"></span></span><span class="qz-case qz-o" style="--i:10"><span class="qz-tuile"></span></span></span>' +
      '<span class="qz-wm-col">' +
        '<span class="qz-wordmark-img qz-naming" aria-label="quadreti"><span class="qz-l" style="--i:0">q</span><span class="qz-l" style="--i:1">u</span><span class="qz-l" style="--i:2">a</span><span class="qz-l" style="--i:3">d</span><span class="qz-l" style="--i:4">r</span><span class="qz-l" style="--i:5">e</span><span class="qz-l" style="--i:6">t</span><span class="qz-l dernier" style="--i:7">ı<span class="qz-l qz-point" style="--i:8" aria-hidden="true"></span></span></span>' +
        '<span class="qz-accroche">Composez. Imprimez. Clipsez.</span>' + /* 12/09 : accroche du bloc logo (2e ligne) ; sur l accueil, bandeau-relief.js la remplace par l accroche animee */
        '<span class="qz-cat">Support Créatif Modulaire</span>' +
      '</span>') +
      '<img class="qz-logo-perso" id="qzLogoPerso" alt="Quadreti">' +
    '</a>' +
    /* 14/09 : un bouton « Mon Espace » avait ete pose ici, en dur, pour les apps. 15/09 : RETIRE. « Mon Espace » est
       devenu une rubrique du menu, que les apps affichent aussi — il y en avait donc deux cote a cote. Un objet, une
       definition : la rubrique, qui vit dans la base et s inverse selon la barre qui la porte. */
    '<button class="qz-burger" id="qzMenuBtn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="qzNavPanel">' +
      '<span></span><span></span><span></span>' +
    '</button>' +
  '</header>' +

  '<nav class="qz-navpanel" id="qzNavPanel" aria-label="Menu principal">' +
    /* 30/08 : menu simplifie, choix fondateur (brief BRIEF-PORTAIL-ESPACE-CLIENT.md).
       Ex-entrees "Editeur Creatif", "Mosaique Creative" et le sous-menu "Jeux &
       Creativite" fusionnees dans /outils.html (portail des apps), seul point
       d'entree desormais. Ce repli statique doit rester synchronise avec la
       vraie valeur en base (menu_liens, table reglages_site, projet Supabase
       quadreti-site) -- mise a jour faite en meme temps que ce fichier. */
    '<ul>' +
      '<li><a href="/index.html">Accueil</a></li>' +
      '<li class="qz-hassub" id="qzCcmItem">' +
        '<button class="qz-subtoggle" id="qzCcmToggle" aria-expanded="false">Comment ça marche <span class="qz-chev">▾</span></button>' +
        '<ul class="qz-sublist">' +
          '<li><a href="/quadreti-guide-interactif.html">Guide du Designer</a></li>' +
          '<li><a href="/quadreti-guide-codification.html">Guide de montage</a></li>' +
          /* 13/09 fondateur : menu reduit de 8 a 6 rubriques -- FAQ et Livraison rejoignent le sous-menu (a synchroniser avec menu_liens en base) */
          '<li><a href="/index.html#faq">FAQ</a></li>' +
          '<li><a href="/index.html#livraison">Livraison &amp; paiement</a></li>' +
          /* 15/09, fondateur : Contact quitte la ligne du haut et rejoint ce volet — le groupe exact de la colonne « Aide »
             du pied de page. Quelqu un qui hesite avant d acheter cherche la, pas dans la barre. */
          '<li><a href="/contact.html">Contact</a></li>' +
        '</ul>' +
      '</li>' +
      '<li><a href="/boutique/">Boutique</a></li>' +
      /* 13/09, fondateur : la rubrique s appelle « Studio », plus « Nos outils ». L adresse ne change pas — renommer le fichier
         casserait les liens deja publies ; c est le libelle qui change, pas la porte.
         15/09 : le volet des cinq apps, ouvert la veille, est REFERME. Il venait d une analogie fausse avec « Detente ».
         Detente a un sous-menu parce qu aucune page ne reunit les jeux ; Studio A sa page, et le prisme y montre les cinq
         outils avec image, phrase et statut. Le volet la dupliquait en moins bien et imposait une entree « Tous les outils »
         qui n existait que pour contourner un detail technique — un item a sous-menu perd son href. */
      '<li><a href="/outils.html">Studio</a></li>' +
      /* 13/09, demande du fondateur : les jeux et les coloriages quittent la page des outils (« elle n a pas sa place ici ») et
         deviennent une rubrique a part. Ce ne sont pas des outils — ils ne doivent donc pas vivre sous « Studio ».
         Un sous-menu plutot qu un lien : il n existe pas de page qui les reunisse, ils sont chacun a leur adresse. Et un libelle
         court, « Jeux » : la ligne du menu est deja juste, elle a deja casse ailleurs. */
      '<li class="qz-hassub">' +
        '<button class="qz-subtoggle" aria-expanded="false">Détente <span class="qz-chev">▾</span></button>' +
          '<ul class="qz-sublist">' +
            '<li><a href="/taquin/">Taquin</a></li>' +
            '<li><a href="/mosaique-revelee/">Mosaïque Révélée</a></li>' +
            '<li><a href="/mandala/">Mandala</a></li>' +
            '<li><a href="/memo/">Mémo</a></li>' +
            '<li><a href="/set/">SET</a></li>' +
            '<li><a href="/pixel-number/">Pixel Number</a></li>' +
            '<li><a href="/coloriages/">Coloriages</a></li>' +
          '</ul>' +
      '</li>' +
      '<li><a href="/blog/">Blog</a></li>' +
      /* 15/09, fondateur : l espace du client en derniere rubrique — la place ou on le cherche. La page existait depuis la
         veille mais aucun lien du site n y menait : on n y entrait que par le bouton pose dans les apps. */
      '<li><a href="/mon-espace/">Mon Espace</a></li>' +
    '</ul>' +
  '</nav>' +
  '<div class="qz-nav-voile" id="qzNavVoile"></div>'
);
/* 13/09 : seuls les liens internes sont prefixes ; les ancres (#) et les liens externes ne sont pas touches. */
document.write(QZ_BASE ? QZ_BANDEAU_HTML.split('href="/').join('href="' + QZ_BASE + '/') : QZ_BANDEAU_HTML);

/* Logo V5 anime (09/09) : une seule fois par session, ensuite etat final direct.
   Appele par un <script> ecrit APRES le bandeau : le HTML pousse par document.write n'existe pas
   encore pendant l'execution de ce fichier (le parseur ne le lit qu'apres). */
window.qzLogoV5Init = function(){
  var row = document.getElementById('qzLogoRow');
  if (!row) return;
  /* 13/09, arbitrage du fondateur : le logo d une app joue la MEME sequence que celui de l accueil. (La note precedente disait
     l inverse -- « sur une app, le logo est pose, pas joue » -- c etait mon choix, pas le sien.) Rien de specifique a ajouter pour la
     plaque : qzPlaqueLettre() pose deja les memes .qz-case / .qz-tuile avec leur index, donc les regles .qz-anime de logo-v5.css
     s appliquent telles quelles. Seuls le nom et la baseline demandent d etre decoupes en lettres, plus bas. */
  /* 10/09 : ce bloc est place AVANT la logique de demarrage, qui peut sortir de la fonction (return) des que
     l acces est deverrouille -- sinon la baseline n etait jamais decoupee en lettres sur les pages deverrouillees. */
  /* la categorie tapee lettre par lettre : on decoupe le texte en spans ; reglages-site.js peut reecrire
     ce texte plus tard (baselines du panneau), on redecoupe alors. */
  function decouper(el){
    if (!el || el.querySelector('.qz-l')) return;
    var txt = el.textContent; var html = '';
    for (var i = 0; i < txt.length; i++){ var ch = txt.charAt(i); html += '<span class="qz-l' + (i === txt.length - 1 ? ' dernier' : '') + '" style="--i:' + i + '">' + (ch === ' ' ? '&nbsp;' : ch.replace('<', '&lt;').replace('&', '&amp;')) + '</span>'; }
    el.innerHTML = html;
  }
  var cat = document.querySelector('.qz-header .qz-cat');
  /* Sur une app, le nom et la baseline remplacent le naming et la categorie : memes spans, meme mecanique de clipsage. */
  var appNom = document.querySelector('.qz-header.qz-app .qz-app-nom');
  var appBase = document.querySelector('.qz-header.qz-app .qz-app-baseline');
  /* 10/09 : la baseline commence et finit aux memes bords que le naming -- letter-spacing calcule une fois les polices chargees */
  function aligner(){
    var n = document.querySelector('.qz-header .qz-naming'); if (!n || !cat) return;
    var lettres = cat.querySelectorAll('.qz-l'); if (lettres.length < 2) return;
    try { document.querySelector('.qz-header').style.setProperty('--qz-ncat', lettres.length); } catch (e) {}
    cat.style.letterSpacing = '0';
    var W = n.getBoundingClientRect().width, w0 = cat.getBoundingClientRect().width;
    if (W > 0 && w0 > 0) cat.style.letterSpacing = ((W - w0) / (lettres.length - 1)).toFixed(2) + 'px';
  }
  decouper(cat); aligner();
  decouper(appNom); decouper(appBase);
  /* La cascade des retards se cale sur la longueur reelle du nom : la baseline part quand la derniere lettre du nom est posee. */
  if (appNom) { try {
    var hd = document.querySelector('.qz-header');
    hd.style.setProperty('--qz-nnom', appNom.querySelectorAll('.qz-l').length);
    hd.style.setProperty('--qz-ncase', row.querySelectorAll('.qz-plaque-lettre .qz-case:not(.qz-g)').length); /* 13/09 : les cases vides ne comptent plus, le geste est continu */
  } catch (e) {} }
  if (cat && window.MutationObserver){ new MutationObserver(function(){ decouper(cat); aligner(); }).observe(cat, { childList: true }); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(aligner);
  window.addEventListener('load', aligner);
  /* 10/09 : l'animation ne doit demarrer que quand on peut la VOIR -- pas derriere l'ecran de mot de passe
     (garde-acces : voile plein ecran avec le formulaire #qdtFormAcces, retire a la validation), pas dans un
     onglet en arriere-plan. Elle rejoue a chaque arrivee sur l'accueil, une seule fois par session ailleurs. */
  /* 13/09 : une APP n est jamais l accueil. Le test ne regardait que le chemin — une app servie a la racine (localhost:8750/, ou
     un dossier dont l index est l app) se faisait passer pour la page d accueil et rejouait son logo a chaque chargement, au lieu
     d une fois par session. La declaration qzApp tranche sans ambiguite. */
  var accueil = !window.qzApp && /^\/(index\.html)?$/.test(location.pathname);
  /* Une cle par app : sinon un client qui passe par l accueil (animation jouee) puis ouvre une app n y verrait jamais la sienne. */
  var cle = window.qzApp ? 'qzLogoJoue:' + window.qzApp.lettre : 'qzLogoJoue';
  var deja = false;
  try { deja = sessionStorage.getItem(cle) === '1'; } catch (e) {}
  if (deja && !accueil) { row.classList.add('qz-fini'); return; }
  var lancer = function(){
    if (row.classList.contains('qz-anime')) return;
    if (document.hidden) return;
    if (document.getElementById('qdtFormAcces')) return;
    row.classList.add('qz-anime');
    try { sessionStorage.setItem(cle, '1'); } catch (e) {}
  };
  var garde = false;
  try { garde = localStorage.getItem('quadretiAccesPreview') !== '1'; } catch (e) {}
  if (!garde && !document.hidden) { lancer(); return; }
  document.addEventListener('visibilitychange', lancer);
  document.addEventListener('DOMContentLoaded', function(){
    if (!garde) { lancer(); return; }
    /* le voile n'existe qu'apres DOMContentLoaded : on attend son retrait */
    if (!document.getElementById('qdtFormAcces')) { lancer(); return; }
    if (window.MutationObserver) new MutationObserver(lancer).observe(document.body, { childList: true });
  });
};
/* 12/09 : en-tete commune -- le menu vit dans la barre (classe qz-menu-visible), barre de 58 px, bloc logo a 16 px du haut, menu centre sur
   la ligne du naming. Meme calage que l accueil (bandeau-relief.js, caler), qui garde en plus l alignement du menu sur le bord du mur. */
window.qzEnteteInit = function(){
  var menu = document.querySelector('.qz-header'), nav = document.getElementById('qzNavPanel'); if (!menu) return;
  if (/^\/(index\.html)?$/.test(location.pathname)) document.documentElement.classList.add('qz-accueil');
  if (nav && nav.parentNode !== menu) menu.appendChild(nav);
  menu.classList.add('qz-menu-visible');
  /* 18/09, fondateur : le menu passe en BURGER sur tout le site. La classe suffit — entete-commun.css porte le mode,
     et le tiroir lui-meme existe deja dans commun.css, sans media query. Retirer cette ligne ramene le menu en ligne. */
  /* 18/09 : le menu en BURGER sur tout le site. Un premier essai avait eclate la mise en page (toute la page a fond
     perdu deployee a 3250 px) ; la cause est cherchee ci-dessous, mesure de la largeur de page a l appui. */
  /* 18/09 : le menu en BURGER. Le mode est ECRIT et sa cause d eclatement corrigee (trois calculs du JS mesuraient le
     menu pour dimensionner la barre et le bandeau ; ils sont debranches a la source). Mais il reste ETEINT POUR LES
     VISITEURS, et pour une raison qui n est pas technique : mon volet de verification ne rend pas cette page
     correctement — il m a donne un `position:fixed; inset:0` quatre fois trop large et un body plus etroit que la
     fenetre. J ai deja casse le site en production deux fois en me fiant a lui.
     LE FONDATEUR L ALLUME DONC LUI-MEME, dans SON navigateur :
        quadreti.fr/?burger=1   -> essai, memorise pour la session
        quadreti.fr/?burger=0   -> retour au menu en ligne
     Quand il aura confirme que c est propre chez lui, cette condition disparait et la classe se pose pour tout le
     monde. Tant qu il n a pas confirme, un visiteur ne voit RIEN changer. */
  try {
    var demande = new URLSearchParams(location.search).get('burger');
    if (demande === '1') sessionStorage.removeItem('qzBurger');
    if (demande === '0') sessionStorage.setItem('qzBurger', '0');
    /* 18/09, fondateur : « le menu burger a unifier ». Il sort de l essai : il est pose POUR TOUT LE MONDE.
       La cause des deux pannes est comprise et corrigee — la classe de mode portait le nom de la classe du BOUTON, et
       <html> heritait de son style (flex, 42 px de large). Elle s appelle qz-menu-tiroir, et les regles du bouton sont
       bornees a button.qz-burger : la collision ne peut plus se reproduire.
       ?burger=0 reste, comme issue de secours pour revenir au menu en ligne sans deployer. */
    if (sessionStorage.getItem('qzBurger') !== '0') document.documentElement.classList.add('qz-menu-tiroir');
  } catch (e) { /* navigation privee stricte : pas d essai, pas de casse */ }
  var MARGE = 16, BLOC = 66, BARRE = 58;
  function caler(){
    var large = window.matchMedia && window.matchMedia('(min-width:901px)').matches;
    var logoRow = menu.querySelector('.qz-logorow'), naming = menu.querySelector('.qz-naming, .qz-app-nom');
    menu.style.setProperty('--qz-onglet', (BLOC + 2 * MARGE) + 'px');
    if (large) {
      menu.style.height = BARRE + 'px'; menu.style.paddingTop = '0px'; menu.style.paddingBottom = '0px'; menu.style.paddingLeft = MARGE + 'px';
      if (logoRow) { logoRow.style.marginTop = MARGE + 'px'; logoRow.style.alignSelf = 'flex-start'; }
      /* 18/09 : pas de centrage du menu sur la ligne du naming en mode burger — le panneau n occupe plus de place,
         la mesure ne veut plus rien dire. */
      if (nav && naming && !document.documentElement.classList.contains('qz-menu-tiroir')) { nav.style.alignSelf = 'flex-start'; nav.style.marginTop = Math.max(0, Math.round(MARGE + naming.offsetHeight / 2 - nav.offsetHeight / 2)) + 'px'; }
      else if (nav) { nav.style.alignSelf = ''; nav.style.marginTop = ''; }
    } else {
      menu.style.height = ''; menu.style.paddingTop = ''; menu.style.paddingBottom = ''; menu.style.paddingLeft = '';
      if (logoRow) { logoRow.style.marginTop = ''; logoRow.style.alignSelf = ''; }
      if (nav) { nav.style.alignSelf = ''; nav.style.marginTop = ''; }
    }
  }
  /* 18/09, fondateur : en mode tiroir, « Mon Espace » reste DANS LA BARRE, a cote du burger. C est une porte, pas une
     rubrique. Impossible en CSS — le tiroir est en display:none ferme, ses enfants ne peuvent pas ressortir — donc on
     sort le lien du DOM du tiroir.
     L extraction se rejoue a chaque changement de la liste : reglages-site.js reconstruit `#qzNavPanel > ul` par
     innerHTML depuis la base, et le lien reviendrait dans le tiroir sans cela. Les doublons sont supprimes. */
  function sortirMonEspace(){
    if (!document.documentElement.classList.contains('qz-menu-tiroir')) return;
    var barre = menu.querySelector('.qz-burger'); if (!barre) return;
    var dehors = menu.querySelector('a.qz-espace-barre');
    var dedans = menu.querySelectorAll('.qz-navpanel a[href$="/mon-espace/"]');
    for (var i = 0; i < dedans.length; i++){
      var a = dedans[i], li = a.closest('li');
      if (dehors) { if (li) li.remove(); else a.remove(); continue; }   /* deja sorti : on retire le doublon */
      a.className = (a.className ? a.className + ' ' : '') + 'qz-espace-barre';
      menu.insertBefore(a, barre);
      if (li) li.remove();
      dehors = a;
    }
  }
  sortirMonEspace();
  var liste = nav && nav.querySelector('ul');
  if (liste && window.MutationObserver) new MutationObserver(sortirMonEspace).observe(liste, { childList: true });

  caler(); window.addEventListener('resize', caler); window.addEventListener('load', caler); setTimeout(caler, 1500);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(caler);
};
document.write('<script>window.qzEnteteInit && window.qzEnteteInit();window.qzLogoV5Init && window.qzLogoV5Init();</script>');

(function(){
  /* Delegation sur document pour le burger ET le sous-menu (28/08), meme
     principe que appliquerMenuLiens dans reglages-site.js.
     Vrai bug trouve en prod ce jour-la, cause reelle identifiee : 22 pages
     (index.html, coloriages/*, boutique, blog, 404, guides...) gardaient un
     VIEUX script "FOOTER COMMUN" (source quadreti-bloc-commun_1.html)
     attachant DEJA un addEventListener direct sur #qzMenuBtn -- jamais
     retire quand ce fichier a ete introduit. Sur ces pages, DEUX listeners
     repondaient au meme clic : l'ancien (direct, target phase) ouvrait le
     panneau, puis celui-ci (delegue sur document, bubble phase) le revoyait
     deja ouvert et le refermait aussitot dans le meme clic -- net visible :
     rien ne semblait se passer. Le vieux script a ete supprime de ces 22
     pages ; la delegation ici est conservee car saine et deja alignee sur
     le sous-menu. */
  function basculerMenu(willOpen){
    var btn = document.getElementById('qzMenuBtn');
    var panel = document.getElementById('qzNavPanel');
    var voile = document.getElementById('qzNavVoile');
    if (!btn || !panel) return;
    if (willOpen && getComputedStyle(panel).position === 'fixed'){
      var hdr = document.querySelector('.qz-header');
      if (hdr) panel.style.top = hdr.getBoundingClientRect().bottom + 'px';
    }
    panel.classList.toggle('open', willOpen);
    btn.classList.toggle('active', willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
    btn.setAttribute('aria-label', willOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    if (voile) voile.classList.toggle('open', willOpen);
    if (!willOpen){
      document.querySelectorAll('.qz-hassub.open').forEach(function(it){
        it.classList.remove('open');
        var tog = it.querySelector('.qz-subtoggle');
        if (tog) tog.setAttribute('aria-expanded', 'false');
      });
    }
  }
  document.addEventListener('click', function(e){
    if (!e.target.closest) return;
    if (e.target.closest('#qzMenuBtn')){
      var panel = document.getElementById('qzNavPanel');
      basculerMenu(!(panel && panel.classList.contains('open')));
      return;
    }
    if (e.target.closest('#qzNavVoile')){ basculerMenu(false); return; }
    var toggle = e.target.closest('.qz-subtoggle');
    if (toggle){
      var item = toggle.closest('.qz-hassub');
      if (!item) return;
      var open = !item.classList.contains('open');
      item.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }
  });
})();

/* ================= 21/09, fondateur : LE MENU EN VITRINE =================
   Le burger ouvre un calque plein ecran ou chaque rubrique est une carte avec son image.
   Forme choisie apres trois propositions (maquette : SITE\maquette-menu-plein-ecran.html).
   Les regles de dessin sont dans entete-commun.css, bloc « LE MENU EN VITRINE ».

   ALLUME POUR TOUT LE MONDE depuis le 22/09 (demande du fondateur). Porte de secours :
      quadreti.fr/?vitrine=0   -> retour au tiroir, memorise pour la session
      quadreti.fr/?vitrine=1   -> annule la porte de secours

   CE FICHIER NE FABRIQUE PAS LA LISTE. Les rubriques viennent de la base (`menu_liens`), et
   reglages-site.js reconstruit `#qzNavPanel > ul` par innerHTML. On DECORE donc ce qui est la,
   et on rejoue a chaque reconstruction — exactement comme sortirMonEspace plus haut. Ajouter
   une rubrique dans le panneau suffit : elle devient une carte sans toucher a ce fichier. */
(function () {
  'use strict';

  /* ---- les images de chaque rubrique, par son adresse ----
     UNE image, ou PLUSIEURS : dans ce cas la carte porte des pastilles et le visiteur passe de
     l une a l autre EN CLIQUANT. Rien ne tourne tout seul — decision du fondateur, 21/09 :
     dans un menu, ce qui bouge pendant qu on choisit gene au lieu d aider. La grammaire est
     celle du diaporama d accueil (pastilles role=tab, fleches), reprise plutot que reinventee.
     Provisoire ICI, et c est un defaut a corriger : ces images devraient venir du panneau,
     comme les libelles. Tant qu elles sont dans le code, en changer une demande un depot. */
  var IMAGES = {
    '/index.html': [
      ['/img/mur-salon.jpg',        'Le mur dans un salon'],
      ['/img/mur-apres.jpg',        'Un mur terminé'],
      ['/img/comparateur-apres.jpg','Avant / après']
    ],
    '/boutique/': [
      ['/img/mur-apres.jpg',         'Le mur fini'],
      ['/img/etui-3.jpg',            'L’étui à tesselles'],
      ['/img/kit-tesselle-etui.jpg', 'Le kit complet']
    ],
    '/outils.html': [
      ['/img/bandeau-app-02-grille.jpg', 'La grille'],
      ['/img/bandeau-app-04-motif.jpg',  'Le motif'],
      ['/img/bandeau-app-05-apercu.jpg', 'L’aperçu']
    ],
    '/blog/': [
      ['/img/kit-feuille.jpg',   'Les feuilles pré-découpées'],
      ['/img/kit-grille.jpg',    'La grille vide'],
      ['/img/mur-etape-07.jpg',  'Le montage, étape par étape']
    ],
    '/mon-espace/': [
      ['/img/bandeau-app-05-apercu.jpg', 'Vos créations']
    ],
    /* les trois gestes, dans l ordre : c est la rubrique ou plusieurs images disent vraiment
       quelque chose que l on ne dirait pas avec une seule */
    'Comment ça marche': [
      ['/img/geste-imprimez.jpg', 'Imprimez'],
      ['/img/geste-clipsez.jpg',  'Clipsez'],
      ['/img/geste-glissez.jpg',  'Glissez']
    ],
    'Détente': [
      ['/img/comparateur-apres.jpg', 'Mosaïque révélée'],
      ['/img/mur-x4.jpg',            'Quatre carreaux'],
      ['/img/mur-x9.jpg',            'Neuf carreaux']
    ]
  };

  var COUPE = 'qzVitrineCoupe';   /* prefixe : chaque carte a cheval a le sien, COUPE + son rang */
  var html = document.documentElement;

  /* ---------- l interrupteur ---------- */
  try {
    var v = new URLSearchParams(location.search).get('vitrine');
    /* 22/09, fondateur : la vitrine devient LE menu du site, pour tout le monde. ?vitrine=0
       reste comme porte de secours (retour au tiroir, memorise pour la session) ; ?vitrine=1
       annule cette porte. */
    if (v === '1') sessionStorage.removeItem('qzVitrineOff');
    if (v === '0') sessionStorage.setItem('qzVitrineOff', '1');
    if (sessionStorage.getItem('qzVitrineOff') !== '1') html.classList.add('qz-menu-vitrine');
    /* ?anim=1|2|3 : les trois arrivees a comparer (voir entete-commun.css, bloc « TROIS
       ARRIVEES »). ?anim=0 revient a l arrivee actuelle. Memorise pour la session, comme le
       reste — refermer et rouvrir le menu rejoue l animation. */
    var an = new URLSearchParams(location.search).get('anim');
    if (an !== null) {
      if (/^[123]$/.test(an)) sessionStorage.setItem('qzAnim', an);
      else sessionStorage.setItem('qzAnim', '');   /* ?anim=0 : aucune, le fondu d origine */
    }
    /* LE DEROULE EST L ARRIVEE DU MENU (choix du fondateur, 21/09, apres comparaison des
       trois) : c est le defaut quand la vitrine est allumee, sans parametre a taper. ?anim=1
       ou ?anim=3 restent la pour recomparer, ?anim=0 revient au fondu d origine. */
    var anc = sessionStorage.getItem('qzAnim');
    if (anc === null) anc = '2';
    if (anc && html.classList.contains('qz-menu-vitrine')) html.classList.add('qz-anim-' + anc);
    /* ?vit=NNN : la duree du deroule en millisecondes, pour la regler a l oeil. Memorisee
       comme le reste ; ?vit=0 revient au defaut de la feuille de style. */
    var vt = new URLSearchParams(location.search).get('vit');
    if (vt !== null) {
      if (/^[1-9][0-9]{1,4}$/.test(vt)) sessionStorage.setItem('qzVit', vt);
      else sessionStorage.removeItem('qzVit');
    }
    var vtc = sessionStorage.getItem('qzVit');
    if (vtc) html.style.setProperty('--qz-deroule-duree', vtc + 'ms');
  } catch (e) { /* navigation privee stricte : pas d essai, pas de casse */ }

  function actif() { return html.classList.contains('qz-menu-vitrine'); }
  function bureau() { return window.matchMedia('(min-width:901px)').matches; }

  /* ---------- la vignette ---------- */
  function cle(li) {
    var a = li.querySelector(':scope > a[href]');
    if (a) {
      var h = a.getAttribute('href') || '';
      h = h.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
      if (IMAGES[h]) return h;
      /* les pages du depot peuvent etre servies sous un prefixe : on retombe sur la fin */
      for (var k in IMAGES) if (k.charAt(0) === '/' && h.slice(-k.length) === k) return k;
      return null;
    }
    var b = li.querySelector(':scope > .qz-subtoggle');
    if (!b) return null;
    var t = (b.textContent || '').replace(/[▾▴]/g, '').trim();
    return IMAGES[t] ? t : null;
  }

  function poserVignette(li) {
    if (li.querySelector(':scope > .qz-vitrine-vue')) return;   /* deja fait */
    var k = cle(li); if (!k) return;
    var liste = IMAGES[k]; if (!liste) return;
    if (typeof liste === 'string') liste = [[liste, '']];
    liste = liste.map(function (e) { return typeof e === 'string' ? [e, ''] : e; });

    var vue = document.createElement('span');
    vue.className = 'qz-vitrine-vue';
    liste.forEach(function (e, i) {
      var src = e[0];
      var img = document.createElement('img');
      img.src = src;
      img.alt = '';                     /* decorative : le titre de la carte porte deja le sens */
      img.loading = 'lazy';
      if (i === 0) img.className = 'qz-actif';
      vue.appendChild(img);
    });

    /* DEUX FLECHES, et non N pastilles (fondateur, 21/09) : deux boutons, c est la meme carte
       qu il y ait trois images ou six. Des pastilles rendaient les cartes inegales entre elles.
       Elles vivent DANS la vignette et au-dessus du lien etire de la carte : sans cela un clic
       dessus suivrait le lien et on atterrirait sur la Boutique en voulant regarder une photo.
       Le compteur qui suit n est pas affiche — il est la pour les lecteurs d ecran, qui sinon
       n auraient aucun moyen de savoir ou ils en sont. */
    if (liste.length > 1) {
      var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
                 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                 '<path d="M15 5 8 12l7 7"/></svg>';
      ['prec', 'suiv'].forEach(function (sens) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'qz-vitrine-fleche qz-' + sens;
        b.setAttribute('aria-label', sens === 'prec' ? 'Image précédente' : 'Image suivante');
        b.innerHTML = CHEV;
        vue.appendChild(b);
      });
      var cpt = document.createElement('span');
      cpt.className = 'qz-vitrine-compte';
      cpt.setAttribute('aria-live', 'polite');
      cpt.textContent = 'Image 1 sur ' + liste.length;
      vue.appendChild(cpt);
    }

    /* LA LEGENDE, qui change a chaque clic. Elle nomme ce qu on regarde — sans elle, trois
       photos d une meme rubrique ne disent pas ce qui les distingue. Les titres sont ranges
       avec les images, un tableau par rubrique : une image sans son nom n existe pas. */
    var leg = document.createElement('span');
    leg.className = 'qz-vitrine-legende';
    leg.textContent = liste[0][1] || '';

    /* TITRE EN HAUT, PHOTO, LEGENDE (fondateur, 21/09). Le titre de la rubrique est le premier
       enfant de la carte : on pose donc la vignette APRES lui, et non en tete comme avant. */
    var titre = li.querySelector(':scope > a, :scope > .qz-subtoggle');
    if (titre && titre.nextSibling) { li.insertBefore(vue, titre.nextSibling); li.insertBefore(leg, vue.nextSibling); }
    else if (titre) { li.appendChild(vue); li.appendChild(leg); }
    else { li.insertBefore(vue, li.firstChild); li.insertBefore(leg, vue.nextSibling); }
    /* les sous-rubriques, si la carte en a, repassent apres la legende */
    var sous = li.querySelector(':scope > .qz-sublist');
    if (sous) li.appendChild(sous);
    /* la table des titres reste accessible pour les changements d image */
    vue.qzTitres = liste.map(function (x) { return x[1] || ''; });
  }

  /* ---- passer d une image a l autre ----
     Aucun defilement automatique : on ne bouge que sur un clic ou une fleche. */
  function montrer(vue, k) {
    var imgs = vue.querySelectorAll(':scope > img');
    if (!imgs.length) return;
    k = (k + imgs.length) % imgs.length;
    for (var i = 0; i < imgs.length; i++) imgs[i].classList.toggle('qz-actif', i === k);
    var cpt = vue.querySelector('.qz-vitrine-compte');
    if (cpt) cpt.textContent = 'Image ' + (k + 1) + ' sur ' + imgs.length;
    var leg = vue.parentElement && vue.parentElement.querySelector(':scope > .qz-vitrine-legende');
    if (leg && vue.qzTitres) leg.textContent = vue.qzTitres[k] || '';
  }

  function courant(vue) {
    var imgs = [].slice.call(vue.querySelectorAll(':scope > img'));
    var k = imgs.findIndex ? imgs.findIndex(function (i) { return i.classList.contains('qz-actif'); })
                           : -1;
    return k < 0 ? 0 : k;
  }

  /* delegation sur le document : reglages-site.js reconstruit la liste depuis la base, des
     ecouteurs poses sur chaque pastille disparaitraient avec elle */
  document.addEventListener('click', function (e) {
    var fl = e.target.closest && e.target.closest('.qz-vitrine-fleche');
    if (!fl) return;
    e.preventDefault(); e.stopPropagation();      /* surtout pas le lien de la carte */
    var vue = fl.closest('.qz-vitrine-vue');
    montrer(vue, courant(vue) + (fl.classList.contains('qz-suiv') ? 1 : -1));
  }, true);

  /* ECHAP FERME LE MENU. Sur un calque qui couvre toute la page, c est la premiere sortie que
     tout le monde essaie — et il n y en avait aucune, ni pour la vitrine ni pour le tiroir.
     On ne ferme pas a la main : on clique le burger, pour passer par la meme bascule que le
     clic (aria-expanded, libelle, voile, verrou de defilement). Puis le focus revient sur le
     burger, sinon il reste sur une carte devenue invisible. Borne a la vitrine : sans le
     parametre, un visiteur ne voit rien changer. */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !actif()) return;
    var panneau = document.getElementById('qzNavPanel');
    var btn = document.getElementById('qzMenuBtn');
    if (!panneau || !btn || !panneau.classList.contains('open')) return;
    e.preventDefault();
    btn.click();
    btn.focus();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var fl = e.target.closest && e.target.closest('.qz-vitrine-fleche');
    if (!fl) return;
    e.preventDefault();
    var vue = fl.closest('.qz-vitrine-vue');
    montrer(vue, courant(vue) + (e.key === 'ArrowRight' ? 1 : -1));
  });

  /* ---------- ou tombe la marche du decroche ----------
     On ne redessine rien : on lit le trace deja pose dans la page (le lisere de l onglet) et on
     en deduit ou la marche commence et finit. Le jour ou le decroche change de dessin, ceci
     suit sans etre retouche. */
  function morceaux(d) {            /* M / L / Q absolus — tout ce que le trace utilise */
    var j = d.match(/[MLQ]|-?[\d.]+/g) || [], out = [], i = 0, c = 'M';
    while (i < j.length) {
      if (/[MLQ]/.test(j[i])) { c = j[i++]; continue; }
      var n = c === 'Q' ? 4 : 2, v = [];
      for (var k = 0; k < n; k++) v.push(parseFloat(j[i++]));
      out.push({ c: c, v: v });
    }
    return out;
  }

  function geometrie() {
    var trait = document.querySelector('.qz-onglet-trait');
    var svg = trait && trait.closest('svg');
    if (!trait || !svg) return null;
    var vb = (svg.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
    if (vb.length !== 4) return null;
    var pts = morceaux(trait.getAttribute('d') || '');
    var xs = [], ys = [];
    pts.forEach(function (p) {
      for (var i = 0; i < p.v.length; i += 2) { xs.push(p.v[i]); ys.push(p.v[i + 1]); }
    });
    if (!ys.length) return null;
    var creux = Math.max.apply(null, ys), plat = Math.min.apply(null, ys);
    var debut = -Infinity, fin = Infinity;
    for (var i = 0; i < ys.length; i++) {
      if (Math.abs(ys[i] - creux) < .01) debut = Math.max(debut, xs[i]);   /* dernier point bas */
      if (Math.abs(ys[i] - plat) < .01) fin = Math.min(fin, xs[i]);        /* premier point haut */
    }
    if (!isFinite(debut) || !isFinite(fin) || fin <= debut) return null;
    /* la boite reelle du SVG, et non une largeur reconstituee : l onglet fait 1536 px quand
       clientWidth en rend 1521 (barre de defilement), et la marche tombait 15 px a cote */
    var rs = svg.getBoundingClientRect();
    if (!rs.width || !rs.height) return null;
    return {
      trait: trait, vb: vb, rs: rs,
      X: function (x) { return rs.left + (x - vb[0]) / vb[2] * rs.width; },
      Y: function (y) { return rs.top + (y - vb[1]) / vb[3] * rs.height; },
      debut: rs.left + (debut - vb[0]) / vb[2] * rs.width,
      fin: rs.left + (fin - vb[0]) / vb[2] * rs.width
    };
  }

  /* ---------- la decoupe de la carte a cheval ---------- */
  function defs(id) {
    var d = document.getElementById(id);
    if (d) return d;
    var hote = document.getElementById('qzVitrineDefs');
    if (!hote) {
      hote = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      hote.id = 'qzVitrineDefs';
      hote.setAttribute('width', '0'); hote.setAttribute('height', '0');
      hote.setAttribute('aria-hidden', 'true'); hote.style.position = 'absolute';
      hote.innerHTML = '<defs></defs>';
      document.body.appendChild(hote);
    }
    var cp = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    cp.id = id;
    cp.setAttribute('clipPathUnits', 'objectBoundingBox');
    cp.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
    hote.querySelector('defs').appendChild(cp);
    return cp;
  }

  function decouper(li, g, panneau, rang, b) {
    if (!b || !b.width || !b.height) return;
    /* le calque glisse de 8 px a l ouverture : on retranche la translation en cours, sinon la
       decoupe tombe 8 px trop haut pendant toute l animation */
    var m = getComputedStyle(panneau).transform, ty = 0;
    if (m && m !== 'none') { var n = m.match(/-?[0-9.]+/g); ty = (n && parseFloat(n[n.length - 1])) || 0; }
    var haut = b.top - ty;
    var jeu = parseFloat(getComputedStyle(html).getPropertyValue('--qz-vitrine-jeu')) || 10;

    /* on ramene le trace de l onglet dans la boite de la carte, decale du jeu vers le bas —
       le meme jeu que partout, sans lui la carte se lit comme rognee et non comme une forme */
    function u(vx) { return (g.X(vx) - b.left) / b.width; }
    function w(vy) { return (g.Y(vy) + jeu - haut) / b.height; }

    var d = '';
    morceaux(g.trait.getAttribute('d')).forEach(function (p, i) {
      var c = p.c, t = p.v;
      if (c === 'Q') d += ' Q ' + u(t[0]).toFixed(5) + ',' + w(t[1]).toFixed(5) + ' ' +
                              u(t[2]).toFixed(5) + ',' + w(t[3]).toFixed(5);
      else d += (i === 0 ? 'M ' : ' L ') + u(t[0]).toFixed(5) + ',' + w(t[1]).toFixed(5);
    });
    d += ' L 2,2 L -1,2 Z';          /* on ferme SOUS la courbe, large */

    var id = COUPE + rang;
    defs(id).firstChild.setAttribute('d', d);
    li.style.clipPath = 'url(#' + id + ')';
    li.style.webkitClipPath = 'url(#' + id + ')';
    var courbe = li.querySelector(':scope > .qz-vitrine-courbe');
    if (!courbe) {
      courbe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      courbe.setAttribute('class', 'qz-vitrine-courbe');
      courbe.setAttribute('viewBox', '0 0 1 1');
      courbe.setAttribute('preserveAspectRatio', 'none');
      courbe.setAttribute('aria-hidden', 'true');
      /* sans vector-effect, une epaisseur de 2 est lue dans le repere 0..1 : elle vaudrait deux
         fois la largeur de la carte, et le filet serait invisible */
      courbe.innerHTML = '<path vector-effect="non-scaling-stroke"/>';
      li.appendChild(courbe);
    }
    courbe.firstChild.setAttribute('d', d);
  }

  /* ---------- placer les cartes de la premiere rangee ---------- */
  /* La boite d une carte, prise sur la MISE EN PAGE et non sur le rendu.
     getBoundingClientRect() inclut les transformations : pendant l animation d arrivee, les
     cartes sont encore decalees et la mesure ment — une carte se retrouvait exclue de la
     premiere rangee et restait sans decroche. offsetTop/offsetLeft ignorent les
     transformations ; l ul, lui, n est jamais anime, il sert donc d origine. */
  function boite(li, ru) {
    return { left: ru.left + li.offsetLeft, top: ru.top + li.offsetTop,
             width: li.offsetWidth, height: li.offsetHeight,
             right: ru.left + li.offsetLeft + li.offsetWidth };
  }

  function placer() {
    var panneau = document.getElementById('qzNavPanel');
    var ul = panneau && panneau.querySelector('ul');
    if (!ul) return;
    var lis = [].slice.call(ul.children);
    lis.forEach(function (li) {
      li.classList.remove('qz-vitrine-remonte', 'qz-vitrine-decoupee');
      li.style.clipPath = ''; li.style.webkitClipPath = '';
      var c = li.querySelector(':scope > .qz-vitrine-courbe'); if (c) c.remove();
    });
    if (!bureau()) return;
    var g = geometrie(); if (!g) return;

    /* la premiere rangee, mesuree APRES avoir retire les marges : sinon on la cherche sur une
       mise en page qu on vient soi-meme de deformer */
    var ru = ul.getBoundingClientRect();
    var haut = Infinity;
    lis.forEach(function (li) { haut = Math.min(haut, Math.round(boite(li, ru).top)); });
    var premiere = lis.filter(function (li) {
      return Math.round(boite(li, ru).top) <= haut + 2;
    });

    /* TROIS CAS, ET IL FAUT LES TROIS. Une premiere version en posait deux avec un seuil de
       8 px, et une carte qui ne mordait la marche que de 4 px tombait entre les deux : ni
       remontee ni decoupee, elle restait en bas toute seule pendant que ses voisines montaient.
       La tolerance doit donc jouer dans les DEUX sens, pas seulement pour refuser la decoupe. */
    var TOL = 8;
    premiere.forEach(function (li) {
      var r = boite(li, ru);
      if (r.left >= g.fin - TOL) {                 /* 1. passe la marche : elle remonte, nette */
        li.classList.add('qz-vitrine-remonte'); return;
      }
      if (r.right <= g.debut + TOL) return;        /* 2. entierement dans le creux : elle reste */
      /* 3. vraiment a cheval : elle remonte ET porte la courbe. La laisser passer sous l onglet
         opaque donnerait une carte sans jeu, qui se lit comme rognee et non comme une forme. */
      li.classList.add('qz-vitrine-remonte', 'qz-vitrine-decoupee');
    });
    /* la decoupe se calcule une fois les marges posees */
    premiere.forEach(function (li) {
      if (li.classList.contains('qz-vitrine-decoupee'))
        decouper(li, g, panneau, lis.indexOf(li), boite(li, ul.getBoundingClientRect()));
    });
  }

  /* la page ne defile plus derriere le calque. On lit l etat du panneau plutot que de compter
     les clics : le menu se ferme aussi par le voile, par Echap et par un lien. */
  var minuterieVerrou = null;
  function verrou() {
    var p = document.getElementById('qzNavPanel');
    var ouvert = !!(p && p.classList.contains('open'));
    clearTimeout(minuterieVerrou);
    if (ouvert) { html.classList.add('qz-vitrine-ouverte'); return; }
    /* A LA FERMETURE, ON ATTEND LA FIN DE L ENROULEMENT. Sinon la barre de defilement de la
       page revient des le premier instant, pendant que le menu est encore la : la page se
       retrecit d un coup sous un calque encore visible. Invisible a 200 ms, franc a 2 s. */
    var d = parseFloat(getComputedStyle(html).getPropertyValue('--qz-deroule-duree')) || 0;
    if (/mss*$/.test(getComputedStyle(html).getPropertyValue('--qz-deroule-duree')) === false) d *= 1000;
    if (!d || !html.classList.contains('qz-anim-2')) { html.classList.remove('qz-vitrine-ouverte'); return; }
    minuterieVerrou = setTimeout(function () { html.classList.remove('qz-vitrine-ouverte'); }, d);
  }

  function vitrine() {
    if (!actif()) return;
    var ul = document.querySelector('#qzNavPanel ul');
    if (!ul) return;
    [].slice.call(ul.children).forEach(poserVignette);
    placer();
  }

  /* ---------- quand rejouer ----------
     Au chargement la boite des cartes n est pas toujours etablie (polices, images), et
     reglages-site.js reconstruit la liste depuis la base apres coup. On rejoue donc a chaque
     occasion plutot que de parier sur un seul moment. */
  function brancher() {
    if (!actif()) return;
    vitrine();
    var ul = document.querySelector('#qzNavPanel ul');
    if (ul && window.MutationObserver) new MutationObserver(vitrine).observe(ul, { childList: true });
    var btn = document.getElementById('qzMenuBtn');
    if (btn) btn.addEventListener('click', function () { setTimeout(vitrine, 0); setTimeout(verrou, 0); });
    window.addEventListener('resize', vitrine);
    window.addEventListener('load', vitrine);
    var p = document.getElementById('qzNavPanel');
    if (p) p.addEventListener('transitionend', placer);
    /* l arrivee des cartes decale leur rendu : on remesure quand elle est finie */
    if (p) p.addEventListener('animationend', placer, true);
    if (p && window.MutationObserver) new MutationObserver(verrou)
      .observe(p, { attributes: true, attributeFilter: ['class'] });
    verrou();
    [200, 800, 2000].forEach(function (t) { setTimeout(vitrine, t); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', brancher);
  else brancher();
})();
