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
/* 09/09 : logo V5 anime (deux pieces + naming en police proprietaire + categorie dactylo), demande fondateur.
   Styles et police dans /logo-v5.css (charge ici pour ne pas toucher aux 32 pages). Joue une fois par session. */
document.write('<link rel="stylesheet" href="/logo-v5.css">');
document.write(
  '<header class="qz-header">' +
    '<a class="qz-logorow" href="/index.html" aria-label="Quadreti — accueil" id="qzLogoRow">' +
      '<svg class="qz-wordmark-img qz-logo5" viewBox="-20 -20 540 540" aria-hidden="true"><defs><clipPath id="qzh-t"><rect x="0" y="0" width="500" height="500" rx="16"/></clipPath><mask id="qzh-v" maskUnits="userSpaceOnUse" x="-100" y="-100" width="720" height="720"><rect x="-40" y="-40" width="580" height="580" fill="#fff"/><rect x="100" y="100" width="298" height="298" rx="29" fill="#000"/><line x1="250" y1="250" x2="600" y2="600" stroke="#000" stroke-width="128"/></mask><mask id="qzh-d" maskUnits="userSpaceOnUse" x="-100" y="-100" width="720" height="720"><g class="qz-balayage"><rect x="250" y="-600" width="1600" height="1700" fill="#fff" transform="rotate(45 250 250)"/></g></mask></defs><g clip-path="url(#qzh-t)" mask="url(#qzh-v)"><path class="qz-bande" pathLength="1" d="M450 450 V50 H50 V450 Z"/></g><g mask="url(#qzh-d)"><rect class="qz-piece" x="113" y="113" width="272" height="272" rx="16"/><line class="qz-piece-q" x1="250" y1="250" x2="449" y2="449" stroke-width="102" stroke-linecap="round"/></g></svg>' +
      '<span class="qz-wm-col">' +
        '<span class="qz-wordmark-img qz-naming" aria-label="quadreti"><span class="qz-l" style="--i:0">q</span><span class="qz-l" style="--i:1">u</span><span class="qz-l" style="--i:2">a</span><span class="qz-l" style="--i:3">d</span><span class="qz-l" style="--i:4">r</span><span class="qz-l" style="--i:5">e</span><span class="qz-l" style="--i:6">t</span><span class="qz-l dernier" style="--i:7">ı<span class="qz-l qz-point" style="--i:8" aria-hidden="true"></span></span></span>' +
        '<span class="qz-cat">Support Créatif Modulaire</span>' +
      '</span>' +
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
        '</ul>' +
      '</li>' +
      '<li><a href="/boutique/">Boutique</a></li>' +
      '<li><a href="/blog/">Blog</a></li>' +
      '<li><a href="/outils.html">Nos outils</a></li>' +
      '<li><a href="/index.html#livraison">Livraison &amp; paiement</a></li>' +
      '<li><a href="/index.html#faq">FAQ</a></li>' +
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
  /* 10/09 : l'animation ne doit demarrer que quand on peut la VOIR -- pas derriere l'ecran de mot de passe
     (garde-acces : voile plein ecran avec le formulaire #qdtFormAcces, retire a la validation), pas dans un
     onglet en arriere-plan. Elle rejoue a chaque arrivee sur l'accueil, une seule fois par session ailleurs. */
  var accueil = /^\/(index\.html)?$/.test(location.pathname);
  var deja = false;
  try { deja = sessionStorage.getItem('qzLogoJoue') === '1'; } catch (e) {}
  if (deja && !accueil) { row.classList.add('qz-fini'); return; }
  var lancer = function(){
    if (row.classList.contains('qz-anime')) return;
    if (document.hidden) return;
    if (document.getElementById('qdtFormAcces')) return;
    row.classList.add('qz-anime');
    try { sessionStorage.setItem('qzLogoJoue', '1'); } catch (e) {}
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
  /* la categorie tapee lettre par lettre : on decoupe le texte en spans ; reglages-site.js peut reecrire
     ce texte plus tard (baselines du panneau), on redecoupe alors. */
  function decouper(el){
    if (!el || el.querySelector('.qz-l')) return;
    var txt = el.textContent; var html = '';
    for (var i = 0; i < txt.length; i++){ var ch = txt.charAt(i); html += '<span class="qz-l' + (i === txt.length - 1 ? ' dernier' : '') + '" style="--i:' + i + '">' + (ch === ' ' ? '&nbsp;' : ch.replace('<', '&lt;').replace('&', '&amp;')) + '</span>'; }
    el.innerHTML = html;
  }
  var cat = document.querySelector('.qz-header .qz-cat');
  decouper(cat);
  if (cat && window.MutationObserver){ new MutationObserver(function(){ decouper(cat); }).observe(cat, { childList: true }); }
};
document.write('<script>window.qzLogoV5Init && window.qzLogoV5Init();</script>');

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
