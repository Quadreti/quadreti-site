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
document.write(
  '<header class="qz-header">' +
    '<a class="qz-logorow" href="/index.html" aria-label="Quadreti — accueil" id="qzLogoRow">' +
      '<div class="qz-qlogo" aria-hidden="true"><i class="t"></i><i class="t"></i><i class="t"></i><i></i><i class="t"></i><i></i><i class="t"></i><i></i><i class="t"></i><i></i><i class="t"></i><i></i><i class="t"></i><i class="t"></i><i class="t"></i><i class="a"></i></div>' +
      '<span class="qz-wm-col">' +
        '<span class="qz-wordmark" aria-label="Quadreti"><b>Q</b><b>u</b><b>a</b><b>d</b><b>r</b><b>e</b><b>t</b><b class="qz-doti">ı<span class="qz-dot"></span></b></span>' +
        '<span class="qz-cat">Support créatif modulaire</span>' +
      '</span>' +
      '<img class="qz-logo-perso" id="qzLogoPerso" alt="Quadreti">' +
    '</a>' +
    '<button class="qz-burger" id="qzMenuBtn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="qzNavPanel">' +
      '<span></span><span></span><span></span>' +
    '</button>' +
  '</header>' +

  '<nav class="qz-navpanel" id="qzNavPanel" aria-label="Menu principal">' +
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
      '<li><a href="/editeur-creatif/">Éditeur Créatif</a></li>' +
      '<li><a href="/mosaique-creative/">Mosaïque Créative</a></li>' +
      '<li class="qz-hassub">' +
        '<button class="qz-subtoggle" aria-expanded="false">Jeux &amp; Créativité <span class="qz-chev">▾</span></button>' +
        '<ul class="qz-sublist">' +
          '<li><a href="/pixel-number/">Pixel Number App</a></li>' +
          '<li><a href="/mosaique-revelee/">Mosaïque Révélée</a></li>' +
          '<li><a href="/mandala/">Mandala</a></li>' +
          '<li><a href="/memo/">Mémo</a></li>' +
          '<li><a href="/taquin/">Taquin</a></li>' +
          '<li><a href="/set/">SET</a></li>' +
        '</ul>' +
      '</li>' +
      '<li><a href="/index.html#livraison">Livraison &amp; paiement</a></li>' +
      '<li><a href="/index.html#faq">FAQ</a></li>' +
      '<li><a href="/contact.html">Contact</a></li>' +
    '</ul>' +
  '</nav>' +
  '<div class="qz-nav-voile" id="qzNavVoile"></div>'
);

(function(){
  var btn = document.getElementById('qzMenuBtn');
  var panel = document.getElementById('qzNavPanel');
  var voile = document.getElementById('qzNavVoile');
  if (btn && panel){
    btn.addEventListener('click', function(){
      var willOpen = !panel.classList.contains('open');
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
    });
  }
  if (voile){ voile.addEventListener('click', function(){ if (btn) btn.click(); }); }
  document.querySelectorAll('.qz-hassub').forEach(function(item){
    var toggle = item.querySelector('.qz-subtoggle');
    if (!toggle) return;
    toggle.addEventListener('click', function(){
      var open = !item.classList.contains('open');
      item.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  });
})();
