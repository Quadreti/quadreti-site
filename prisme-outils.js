/* QuadretI — le prisme des outils (14/09).
   Cinq outils sur les cinq faces d un prisme pentagonal. Extrait de outils.html quand le fondateur a demande que « le prisme
   remplace la presentation ancienne » sur l accueil : deux pages s en servent, il ne peut pas exister en deux exemplaires.
   A inclure la ou le prisme doit apparaitre :  <script src="/prisme-outils.js"></script>  — jamais en defer ni async, il ecrit
   au fil de la lecture, comme commun-bandeau.js.
   LES CINQ OUTILS SONT DECLARES ICI, UNE FOIS. Le jour ou QR ou Photo passent en ligne : ajouter leur lien dans la liste
   ci-dessous, et le « bientot » disparait tout seul, sur les deux pages a la fois. */
var QZ_PRISME_OUTILS = [
  { lettre:"Q",  nom:"Quadreti Designer", teinte:"#1e2b35", statut:"ligne",
    visuel:"/img/bandeau-app-03-composition.jpg", alt:"Une composition en cours dans Quadreti Designer",
    texte:"Le cœur de QuadretI : composez ce que vous voulez afficher — photo, motif, mosaïque à double lecture —, prévisualisez le mur, imprimez vos planches.",
    lien:"https://designer.quadreti.fr", cta:"Composer mon visuel", externe:true },   /* 14/09 : « ma mosaique » retrecissait l outil trois lignes apres que la page a explique qu il affiche bien plus */
  { lettre:"C",  nom:"Éditeur Créatif", teinte:"#2f4150", statut:"ligne",
    texte:"Composez librement : photos, textes, formes, stickers — avec le repère des tuiles physiques pour voir votre découpe en direct.",
    lien:"/editeur-creatif/", cta:"Créer" },
  { lettre:"M",  nom:"Mosaïque Créative", teinte:"#d96c2f", statut:"ligne",
    texte:"La vraie mosaïque décorative : des pièces qui se découpent entre elles, des scènes à colorier, des motifs géométriques.",
    lien:"/mosaique-creative/", cta:"Explorer" },
  { lettre:"QR", nom:"QR Quadreti", teinte:"#3c4a55", statut:"bientot",
    texte:"Des QR codes qui sont de vraies créations : styles, couleurs, logo — et bientôt des œuvres générées autour de votre propre silhouette.",
    attente:"En cours de mise en ligne" },
  /* 14/09 : Photo Quadreti est deployee en dossier du site (quadreti.fr/photo-quadreti/), sur decision du fondateur — pas de
     sous-domaine. Elle passe donc de « bientot » a « en ligne », sur le prisme du Studio ET sur le bandeau de l accueil a la fois. */
  { lettre:"P",  nom:"Photo Quadreti", teinte:"#5a4a3f", statut:"ligne",
    texte:"Préparez vos photos avant de les afficher : détourage, redressement, recadrage, réglages, restauration de photos anciennes.",
    lien:"/photo-quadreti/", cta:"Préparer mes photos" }
];

/* Le prefixe des liens internes, pour une page servie ailleurs qu a la racine — meme mecanique que commun-bandeau.js. */
(function () {
  var sc = document.currentScript, base = (sc && sc.getAttribute("data-base")) || "";
  /* 14/09 : deux mises en scene pour les memes cartes. « bandeau » = un defilement lent (accueil), sinon le prisme (Studio). */
  var mode = (sc && sc.getAttribute("data-mode")) || "prisme";
  if (base && base.charAt(base.length - 1) === "/") base = base.slice(0, -1);
  var ech = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var url = function (u) { return (u && u.charAt(0) === "/") ? base + u : u; };

  var faces = QZ_PRISME_OUTILS.map(function (o, i) {
    /* L espace image demande par le fondateur : une vraie photo quand elle existe, sinon le motif de tesselles teinte par outil. */
    var visuel = o.visuel
      ? '<img src="' + url(o.visuel) + '" alt="' + ech(o.alt) + '" loading="lazy">'
      : '<div class="tesselles" aria-hidden="true"></div><div class="initiale" aria-hidden="true">' + ech(o.lettre) + '</div>';
    var bas = o.lien
      ? '<a class="face-lien" href="' + url(o.lien) + '"' + (o.externe ? ' target="_blank" rel="noopener"' : '') +
        ' tabindex="' + (i === 0 ? 0 : -1) + '">' + ech(o.cta) + ' →</a>'
      : '<p class="face-attente">' + ech(o.attente) + '</p>';
    return '<article class="face' + (i === 0 ? ' devant' : '') + '" style="--teinte:' + o.teinte + '"' +
           (i === 0 ? '' : ' aria-hidden="true"') + '>' +
             '<div class="face-visuel">' + visuel + '</div>' +
             '<div class="face-corps">' +
               '<span class="statut s-' + o.statut + '">' + (o.statut === "ligne" ? "En ligne" : "Bientôt") + '</span>' +
               '<h2>' + ech(o.nom) + '</h2>' +
               '<p>' + ech(o.texte) + '</p>' +
               bas +
             '</div>' +
           '</article>';
  }).join("");

  if (mode === "bandeau") {
    /* La liste est ecrite DEUX FOIS et la piste glisse de la moitie de sa largeur : au moment ou l animation reboucle, le second
       exemplaire occupe exactement la place du premier, la jointure ne se voit pas. Le second est masque aux lecteurs d ecran et
       sorti du parcours clavier — il n existe que pour l oeil. */
    /* Les cartes arrivent balisees POUR LE PRISME : seule celle de devant est lisible, les quatre autres sont masquees aux lecteurs
       d ecran et sorties du parcours clavier. A plat, elles sont toutes a l ecran — il faut donc leur rendre leur statut normal. */
    var visibles = faces.replace(/ aria-hidden="true"/g, '').replace(/tabindex="-1"/g, 'tabindex="0"');
    /* La copie, elle, n existe que pour l oeil : masquee et hors du parcours, sinon on tabule dix fois pour cinq outils. */
    var copie = visibles.replace(/tabindex="0"/g, 'tabindex="-1"').replace(/<article class="face/g, '<article aria-hidden="true" class="face');
    document.write(
      '<div class="bandeau-outils" id="bandeauOutils">' +
        '<div class="bandeau-piste">' + visibles + copie + '</div>' +
      '</div>'
    );
    return;
  }

  document.write(
    '<div class="prisme-zone">' +
      '<div class="prisme-scene">' +
        '<div class="prisme" id="prisme" style="--face:0">' + faces + '</div>' +
      '</div>' +
      '<div class="prisme-barre">' +
        '<button class="prisme-fleche" id="prismePrec" type="button" aria-label="Outil précédent">' +
          '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>' +
        '</button>' +
        '<div class="prisme-puces" id="prismePuces" role="tablist" aria-label="Choisir un outil"></div>' +
        '<button class="prisme-fleche" id="prismeSuiv" type="button" aria-label="Outil suivant">' +
          '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>'
  );
})();

/* Le pilotage ne peut pas s executer au fil de la lecture : le HTML ci-dessus vient tout juste d etre ecrit, mais la page n a pas
   fini d etre construite. On attend qu elle le soit. */
(function () {
  function demarrer() {
  /* ===== Le prisme des outils (13/09) =====
     Il tourne d un cinquieme de tour par outil. Tout passe par une seule fonction, poser() : elle ecrit l angle, dit quelle face est
     devant, et remet l accessibilite d aplomb — les faces de dos sont masquees aux lecteurs d ecran et leur lien sort du parcours au
     clavier, sinon on tabule vers un lien qu on ne voit pas.
     Quatre commandes pour le meme geste : fleches, pastilles nommees, touches gauche/droite, et glisser. Regle du fondateur : jamais
     de fonction au clavier sans son equivalent a la souris. */
  (function(){
    var prisme = document.getElementById('prisme');
    if (!prisme) return;   /* en mode bandeau il n y a pas de prisme : rien a piloter */
    var faces = [].slice.call(prisme.querySelectorAll('.face'));
    var puces = document.getElementById('prismePuces');
    var N = faces.length;
    var courant = 0;
    /* La MEME condition que le repli du CSS. Sous 900 px, ou si le visiteur demande moins d animation, les cinq cartes sont
       affichees en liste : aucune n est alors "de dos", et masquer les quatre autres rendrait trois outils inatteignables au
       clavier et invisibles pour un lecteur d ecran. */
    var enListe = window.matchMedia('(max-width:900px), (prefers-reduced-motion:reduce)');

    /* Une pastille par outil, et elle le NOMME : un point anonyme ne dit pas ou l on va. */
    faces.forEach(function(face, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = face.querySelector('h2').textContent;
      b.setAttribute('role', 'tab');
      b.addEventListener('click', function(){ poser(i); });
      puces.appendChild(b);
    });
    var boutons = [].slice.call(puces.children);

    function poser(i){
      courant = ((i % N) + N) % N;              /* on tourne en rond dans les deux sens */
      prisme.style.setProperty('--face', courant);
      var liste = enListe.matches;
      faces.forEach(function(face, k){
        var devant = k === courant;
        face.classList.toggle('devant', devant);
        /* En prisme, une face de dos ne doit etre ni lue ni atteinte au clavier : sinon on tabule vers un lien invisible.
           En liste, tout est visible — donc tout reste lisible et atteignable. */
        if (devant || liste) face.removeAttribute('aria-hidden'); else face.setAttribute('aria-hidden', 'true');
        var lien = face.querySelector('.face-lien');
        if (lien) lien.tabIndex = (devant || liste) ? 0 : -1;
      });
      boutons.forEach(function(b, k){ b.setAttribute('aria-current', k === courant ? 'true' : 'false'); });
    }

    document.getElementById('prismePrec').addEventListener('click', function(){ poser(courant - 1); });
    document.getElementById('prismeSuiv').addEventListener('click', function(){ poser(courant + 1); });

    /* Les fleches du clavier, mais seulement quand on est DANS le prisme — sinon on vole les fleches au reste de la page. */
    var zone = prisme.closest('.prisme-zone');
    zone.addEventListener('keydown', function(e){
      if (e.key === 'ArrowLeft'){ poser(courant - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight'){ poser(courant + 1); e.preventDefault(); }
    });

    /* Le glisser, souris et doigt confondus (pointeur unifie). 60 px suffisent a faire tourner d un cran. */
    var depart = null, deplace = 0;
    var scene = prisme.parentNode;
    scene.addEventListener('pointerdown', function(e){
      if (e.target.closest('a, button')) return;   /* on ne vole pas un clic destine a un lien */
      depart = e.clientX; deplace = 0;
      prisme.classList.add('saisi');
      scene.setPointerCapture(e.pointerId);
    });
    scene.addEventListener('pointermove', function(e){
      if (depart === null) return;
      deplace = e.clientX - depart;
      /* pendant le glisser, le prisme suit le doigt : 110 px de course = un cinquieme de tour */
      prisme.style.setProperty('--face', courant - deplace / 110);
    });
    function lacher(e){
      if (depart === null) return;
      prisme.classList.remove('saisi');
      if (Math.abs(deplace) > 60) poser(courant - (deplace > 0 ? 1 : -1)); else poser(courant);
      depart = null;
      if (e && e.pointerId != null && scene.hasPointerCapture(e.pointerId)) scene.releasePointerCapture(e.pointerId);
    }
    scene.addEventListener('pointerup', lacher);
    scene.addEventListener('pointercancel', lacher);

    /* Si la mise en page change en cours de route — telephone tourne, fenetre redimensionnee, reglage d animation modifie —,
       on rejoue poser() : sans ca, on reste bloque dans les reglages de l autre mise en page. */
    if (enListe.addEventListener) enListe.addEventListener('change', function(){ poser(courant); });

    poser(0);
  })();

  /* 13/09, demande du fondateur : « il faut remonter le carrousel afin que tout tienne sans defilement ».
     On MESURE la place qui reste sous le titre au lieu de deviner une hauteur : la barre du site, le titre et le chapo n ont pas la
     meme hauteur d un ecran a l autre. Le prisme se met alors a l echelle de cette place. En dessous de 0,62 on arreterait de le
     reduire : un ecran trop court garde son defilement plutot qu un prisme illisible. */
  (function(){
    var scene = document.querySelector('.prisme-scene');
    var prisme = document.getElementById('prisme');
    if (!scene || !prisme) return;
    var enListe = window.matchMedia('(max-width:900px), (prefers-reduced-motion:reduce)');
    var MIN = 396, MAX = 560;   /* sous 396 px une carte ne tient plus son texte ; au-dela de 560 elle s etire pour rien */
    var POSEE = 470;            /* la taille quand le prisme est une section parmi d autres, et non le sujet de la page */
    var BARRE = 92;             /* la barre de pilotage et sa marge */

    /* On donne au prisme une HAUTEUR REELLE, jamais une mise a l echelle : le texte doit etre dessine a sa taille finale, sinon il
       est etire et flou. La face de devant etant posee dans le plan de l ecran (voir le recul du CSS), ce qu on calcule ici est
       exactement ce qu on verra. */
    function caler(){
      if (enListe.matches){ scene.style.height = ''; prisme.style.removeProperty('--h'); return; }
      /* On mesure la distance depuis le HAUT DU DOCUMENT, pas depuis le haut de l ecran : au rechargement le navigateur peut
         restaurer la position de defilement, et une mesure relative a l ecran donnerait alors une place fausse. */
      var haut = scene.getBoundingClientRect().top + window.scrollY;
      /* DEUX SITUATIONS. Sur le Studio, le prisme EST la page : il prend toute la place qui reste sous le titre, pour tenir sans
         defilement. Sur l accueil il est une section parmi dix, au milieu du document : il n y a pas de « place restante » a
         remplir, il prend une taille posee. Le test porte sur sa position reelle, pas sur le nom de la page — une section qui
         commence au-dela d un ecran n est jamais le sujet principal. */
      var enTete = haut < window.innerHeight;
      var h = enTete ? Math.min(MAX, Math.max(MIN, window.innerHeight - haut - BARRE - 12)) : POSEE;
      prisme.style.setProperty('--h', h + 'px');
      scene.style.height = h + 'px';
    }
    caler();
    window.addEventListener('resize', caler);
    if (enListe.addEventListener) enListe.addEventListener('change', caler);
  })();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
