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
      '<svg class="qz-wordmark-img qz-logo5" viewBox="0 0 1500 1500" aria-hidden="true"><rect class="qz-carre" x="0" y="0" width="1500" height="1500"/><rect class="qz-tuile" x="152.6" y="505" width="158.8" height="163.7" style="--i:50"/><rect class="qz-tuile" x="353.4" y="586.7" width="120.1" height="124.8" style="--i:27"/><rect class="qz-tuile" x="353.4" y="477.1" width="60.1" height="55.8" style="--i:18"/><rect class="qz-tuile" x="251.3" y="298.6" width="120.1" height="124.8" style="--i:39"/><rect class="qz-tuile" x="251.3" y="711.7" width="60.1" height="55.8" style="--i:28"/><rect class="qz-tuile" x="224.7" y="810.8" width="158.8" height="163.7" style="--i:17"/><rect class="qz-tuile" x="323.4" y="1027.9" width="120.1" height="124.8" style="--i:12"/><rect class="qz-tuile" x="224.7" y="1027.9" width="60.1" height="55.8" style="--i:13"/><rect class="qz-tuile" x="383.4" y="1206.4" width="60.1" height="55.8" style="--i:2"/><rect class="qz-tuile" x="473.5" y="1152.5" width="158.8" height="163.7" style="--i:53"/><rect class="qz-tuile" x="662.2" y="1100.7" width="100.8" height="105.6" style="--i:24"/><rect class="qz-tuile" x="413.5" y="216.8" width="158.8" height="163.7" style="--i:22"/><rect class="qz-tuile" x="953.7" y="298.6" width="120.1" height="124.8" style="--i:10"/><rect class="qz-tuile" x="464.9" y="132.5" width="54.6" height="55.9" style="--i:1"/><rect class="qz-tuile" x="621.4" y="154.3" width="120.1" height="124.8" style="--i:54"/><rect class="qz-tuile" x="814.7" y="1171.8" width="120.1" height="124.8" style="--i:9"/><rect class="qz-tuile" x="934.4" y="548.1" width="158.8" height="163.7" style="--i:0"/><rect class="qz-tuile" x="1113.7" y="767.5" width="158.8" height="163.7" style="--i:32"/><rect class="qz-tuile qz-orange" x="994.4" y="1124.6" width="158.8" height="163.7" style="--i:19"/><rect class="qz-tuile qz-orange" x="1193" y="1316.1" width="79.3" height="77.5" style="--i:29"/><rect class="qz-tuile qz-orange" x="904.3" y="1027.9" width="60.1" height="55.8" style="--i:21"/><rect class="qz-tuile" x="1133" y="423.2" width="81.8" height="81.8" style="--i:41"/><rect class="qz-tuile" x="1051.2" y="974" width="88.4" height="92.9" style="--i:38"/><rect class="qz-tuile" x="793" y="257.7" width="81.8" height="81.8" style="--i:3"/><rect class="qz-tuile" x="833.5" y="91.8" width="120.1" height="124.8" style="--i:5"/><rect class="qz-tuile" x="1032" y="181.7" width="60.1" height="62.9" style="--i:33"/><rect class="qz-tuile" x="1133" y="598.2" width="60.1" height="55.8" style="--i:7"/><rect class="qz-tuile" x="1013.7" y="746.2" width="60.1" height="55.8" style="--i:55"/><rect class="qz-tuile" x="655.3" y="298.6" width="40.8" height="40.8" style="--i:37"/><rect class="qz-tuile" x="1013.7" y="465.4" width="40.8" height="40.8" style="--i:20"/><rect class="qz-tuile" x="1051.2" y="836.6" width="40.8" height="40.8" style="--i:11"/><rect class="qz-tuile" x="975.3" y="892.6" width="58.9" height="58.9" style="--i:4"/><rect class="qz-tuile" x="1172.6" y="974" width="27.6" height="25.5" style="--i:14"/><rect class="qz-tuile" x="850.2" y="1027.9" width="27.6" height="27.8" style="--i:16"/><rect class="qz-tuile qz-orange" x="887" y="974" width="27.6" height="29.5" style="--i:51"/><rect class="qz-tuile" x="376.8" y="753.5" width="27.6" height="27.8" style="--i:25"/><rect class="qz-tuile" x="698.8" y="1240.9" width="27.6" height="27.8" style="--i:30"/><rect class="qz-tuile" x="833.5" y="1115.9" width="33.4" height="36.6" style="--i:52"/><rect class="qz-tuile" x="1105.5" y="324.8" width="40.8" height="40.8" style="--i:43"/><rect class="qz-tuile" x="342.6" y="236.2" width="28.8" height="28.9" style="--i:56"/><rect class="qz-tuile" x="255.9" y="449.8" width="28.8" height="28.9" style="--i:31"/><rect class="qz-tuile" x="773.1" y="173.8" width="28.8" height="28.9" style="--i:6"/><rect class="qz-tuile" x="939.2" y="244.6" width="28.8" height="28.9" style="--i:26"/><rect class="qz-tuile" x="1117.5" y="537.2" width="28.8" height="28.9" style="--i:23"/><rect class="qz-tuile" x="1157.6" y="697.3" width="28.8" height="28.9" style="--i:15"/><rect class="qz-tuile" x="492.9" y="1095.7" width="28.8" height="28.9" style="--i:8"/><rect class="qz-tuile" x="568.6" y="1066" width="46.7" height="48.7" style="--i:48"/><rect class="qz-tuile qz-orange" x="934.4" y="1106.3" width="27.6" height="27.8" style="--i:44"/><rect class="qz-tuile" x="986.1" y="1054.1" width="27.6" height="29.5" style="--i:49"/><rect class="qz-tuile qz-orange" x="790.1" y="960.9" width="60.1" height="55.8" style="--i:36"/><rect class="qz-tuile" x="1113.7" y="1320.5" width="27.6" height="27.8" style="--i:46"/><rect class="qz-tuile qz-orange" x="1186.4" y="1206.4" width="48.3" height="54" style="--i:47"/><rect class="qz-tuile" x="124.5" y="767.5" width="60.1" height="55.8" style="--i:45"/><rect class="qz-tuile" x="1272.4" y="1260.3" width="27.6" height="27.8" style="--i:34"/><rect class="qz-tuile" x="741.5" y="1288.2" width="46.7" height="48.7" style="--i:35"/><rect class="qz-tuile" x="170.1" y="892.6" width="28.8" height="28.9" style="--i:40"/><rect class="qz-tuile" x="556" y="159.4" width="28.8" height="28.9" style="--i:42"/></svg>' +
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
