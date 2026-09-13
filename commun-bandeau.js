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
document.write('<link rel="stylesheet" href="/logo-v5.css">');
document.write('<link rel="stylesheet" href="/entete-commun.css">'); /* 12/09 : en-tete commune (barre, onglet, bloc logo, menu visible) */

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
  R: ['##o', '#..', '#..', '#..']  /* QR Quadreti, variante du fondateur (13/09) -- hampe et chapeau, l orange au bout du chapeau */
};
var qzApp = (window.qzApp && QZ_ALPHABET[window.qzApp.lettre]) ? window.qzApp : null;
if (qzApp) document.write('<link rel="stylesheet" href="/entete-app.css">');
function qzPlaqueLettre(lettre){
  var g = QZ_ALPHABET[lettre], n = g[0].length, h = '', i = 0, y, x, c;
  /* on rogne les colonnes de droite entierement vides : le C et le P sont dessines dans une boite de quatre colonnes dont la
     derniere ne sert pas, et ce vide se verrait comme un blanc entre la lettre et le nom. */
  while (n > 1 && g.every(function(r){ return r.charAt(n - 1) === '.'; })) n--;
  for (y = 0; y < 4; y++) for (x = 0; x < n; x++){
    c = g[y].charAt(x);
    h += '<span class="qz-case ' + (c === 'o' ? 'qz-o' : (c === '#' ? 'qz-b' : 'qz-g')) + '" style="--i:' + (i++) + '"><span class="qz-tuile"></span></span>';
  }
  return '<span class="qz-wordmark-img qz-logo5 qz-plaque qz-plaque-lettre" style="--cols:' + n + '" aria-hidden="true">' + h + '</span>';
}
document.write(
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
          '<li><a href="/quadreti-guide-interactif.html">Guide de l\'app</a></li>' +
          '<li><a href="/quadreti-guide-codification.html">Guide de montage</a></li>' +
          /* 13/09 fondateur : menu reduit de 8 a 6 rubriques -- FAQ et Livraison rejoignent le sous-menu (a synchroniser avec menu_liens en base) */
          '<li><a href="/index.html#faq">FAQ</a></li>' +
          '<li><a href="/index.html#livraison">Livraison &amp; paiement</a></li>' +
        '</ul>' +
      '</li>' +
      '<li><a href="/boutique/">Boutique</a></li>' +
      '<li><a href="/outils.html">Nos outils</a></li>' +
      '<li><a href="/blog/">Blog</a></li>' +
      '<li><a href="/contact.html">Contact</a></li>' +
    '</ul>' +
  '</nav>' +
  '<div class="qz-nav-voile" id="qzNavVoile"></div>'
);

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
    hd.style.setProperty('--qz-ncase', row.querySelectorAll('.qz-plaque-lettre .qz-case').length);
  } catch (e) {} }
  if (cat && window.MutationObserver){ new MutationObserver(function(){ decouper(cat); aligner(); }).observe(cat, { childList: true }); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(aligner);
  window.addEventListener('load', aligner);
  /* 10/09 : l'animation ne doit demarrer que quand on peut la VOIR -- pas derriere l'ecran de mot de passe
     (garde-acces : voile plein ecran avec le formulaire #qdtFormAcces, retire a la validation), pas dans un
     onglet en arriere-plan. Elle rejoue a chaque arrivee sur l'accueil, une seule fois par session ailleurs. */
  var accueil = /^\/(index\.html)?$/.test(location.pathname);
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
  var MARGE = 16, BLOC = 66, BARRE = 58;
  function caler(){
    var large = window.matchMedia && window.matchMedia('(min-width:901px)').matches;
    var logoRow = menu.querySelector('.qz-logorow'), naming = menu.querySelector('.qz-naming, .qz-app-nom');
    menu.style.setProperty('--qz-onglet', (BLOC + 2 * MARGE) + 'px');
    if (large) {
      menu.style.height = BARRE + 'px'; menu.style.paddingTop = '0px'; menu.style.paddingBottom = '0px'; menu.style.paddingLeft = MARGE + 'px';
      if (logoRow) { logoRow.style.marginTop = MARGE + 'px'; logoRow.style.alignSelf = 'flex-start'; }
      if (nav && naming) { nav.style.alignSelf = 'flex-start'; nav.style.marginTop = Math.max(0, Math.round(MARGE + naming.offsetHeight / 2 - nav.offsetHeight / 2)) + 'px'; }
    } else {
      menu.style.height = ''; menu.style.paddingTop = ''; menu.style.paddingBottom = ''; menu.style.paddingLeft = '';
      if (logoRow) { logoRow.style.marginTop = ''; logoRow.style.alignSelf = ''; }
      if (nav) { nav.style.alignSelf = ''; nav.style.marginTop = ''; }
    }
  }
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
