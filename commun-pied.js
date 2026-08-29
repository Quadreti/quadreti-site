/* QuadretI — pied de page commun (28/08)
   Source UNIQUE du footer, meme principe que commun-bandeau.js (chemins
   absolus, document.write ecrit exactement a l'endroit du <script>, jamais
   defer/async). A inclure via :
     <script src="/commun-pied.js"></script>
   a l'endroit ou le pied de page doit apparaitre (juste avant les scripts de
   page). Journal : JOURNAL.md, entree du 28/08 "Bandeau commun". */
/* 29/08 : disposition "Trois colonnes" (variante A validee par le fondateur
   sur maquette — artifact "Bas de Page Quadreti") : identite a gauche,
   informations au centre en liens sobres (les cartouches kraft disparaissent),
   reseaux a droite, copyright en barre du bas. Toutes les couleurs restent
   pilotees par la palette (reglages-site.js), aucune valeur figee ici. */
document.write(
  '<footer class="qz-footer">' +
    '<div class="qz-pied3">' +

    '<div class="qz-col qz-basdepage">' +
      '<div class="qz-logorow">' +
        '<div class="qz-qlogo" aria-hidden="true"><i class="t"></i><i class="t"></i><i class="t"></i><i></i><i class="t"></i><i></i><i class="t"></i><i></i><i class="t"></i><i></i><i class="t"></i><i></i><i class="t"></i><i class="t"></i><i class="t"></i><i class="a"></i></div>' +
        '<span class="qz-wordmark"><b>Q</b><b>u</b><b>a</b><b>d</b><b>r</b><b>e</b><b>t</b><b class="qz-doti">ı<span class="qz-dot"></span></b></span>' +
      '</div>' +
      '<div class="qz-baseline">Composez, imprimez, clipsez, changez à volonté.</div>' +
    '</div>' +

    '<nav class="qz-col qz-pied-infos" aria-label="Informations">' +
      '<h4 class="qz-coltitre">Informations</h4>' +
      '<ul>' +
        '<li><a href="/mentions-legales.html">Mentions légales</a></li>' +
        '<li><a href="/cgv.html">CGV</a></li>' +
        '<li><a href="/cgu.html">CGU &amp; RGPD</a></li>' +
        '<li><a href="/index.html#livraison">Livraison &amp; paiement</a></li>' +
        '<li><a href="/contact.html">Contact</a></li>' +
      '</ul>' +
    '</nav>' +

    '<div class="qz-col qz-reseaux">' +
      '<h4 class="qz-coltitre">Nos réseaux, à leur tour clipsés</h4>' +
      '<p class="qz-sub">Facebook · Snapchat · TikTok · YouTube · WhatsApp</p>' +
      '<div class="qz-grid">' +
        '<a href="#" aria-label="Facebook" target="_blank" rel="noopener"><svg class="qz-ico" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z"/></svg></a>' +
        '<a href="#" aria-label="Snapchat" target="_blank" rel="noopener"><svg class="qz-ico" viewBox="0 0 24 24"><path d="M12.031.002c-.947 0-4.298.259-5.977 3.583-.783 1.55-.632 4.315-.51 6.532.006.104.011.204.011.3-.114.058-.319.129-.665.129-.386-.007-.848-.096-1.361-.267a1.06 1.06 0 0 0-.336-.058c-.361 0-.653.214-.756.535-.09.286-.048.828.652 1.28.13.083.32.184.55.293.6.283 1.397.652 1.397 1.3 0 .12-.024.31-.146.61-.02.05-.048.11-.08.174-.08.166-.17.35-.24.548-.16.44-.164.87.106 1.24.35.483 1.06.727 2.11.727.176 0 .366-.011.567-.031.036.316.12.665.31.976.393.638 1.14.958 2.216.958.176 0 .35-.008.51-.024.056.106.116.212.18.316.554.9 1.507 1.393 2.68 1.393h.007c1.173 0 2.126-.493 2.68-1.393.064-.104.124-.21.18-.316.16.016.334.024.51.024 1.077 0 1.823-.244 2.216-.958.19-.311.274-.66.31-.976.201.02.391.031.567.031 1.05 0 1.76-.244 2.11-.727.27-.37.266-.8.106-1.24-.07-.198-.16-.382-.24-.548-.032-.064-.06-.124-.08-.174-.122-.3-.146-.49-.146-.61 0-.648.797-1.017 1.397-1.3.23-.109.42-.21.55-.293.7-.452.742-.994.652-1.28-.103-.321-.395-.535-.756-.535a1.06 1.06 0 0 0-.336.058c-.513.171-.975.26-1.361.267-.346 0-.551-.071-.665-.129 0-.096.005-.196.011-.3.122-2.217.273-4.982-.51-6.532C16.298.261 12.978.002 12.031.002z"/></svg></a>' +
        '<a href="#" aria-label="TikTok" target="_blank" rel="noopener"><svg class="qz-ico" viewBox="0 0 24 24"><path d="M16.6 5.82c-.9-.98-1.45-2.24-1.5-3.62h-3.2v13.63c0 1.7-1.38 3.08-3.08 3.08a3.08 3.08 0 0 1-1.15-5.94A3.08 3.08 0 0 1 9 12.7V9.44c-.3-.04-.6-.06-.9-.06-3.5 0-6.34 2.84-6.34 6.34S4.6 22.06 8.1 22.06s6.34-2.84 6.34-6.34V8.85a8.3 8.3 0 0 0 4.85 1.55V7.2a5.28 5.28 0 0 1-2.69-1.38z"/></svg></a>' +
        '<a href="#" aria-label="YouTube" target="_blank" rel="noopener"><svg class="qz-ico" viewBox="0 0 24 24"><path d="M23.5 6.19a2.97 2.97 0 0 0-2.09-2.09C19.65 3.5 12 3.5 12 3.5s-7.65 0-9.41.6A2.97 2.97 0 0 0 .5 6.19 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.81 2.97 2.97 0 0 0 2.09 2.09c1.76.6 9.41.6 9.41.6s7.65 0 9.41-.6a2.97 2.97 0 0 0 2.09-2.09A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg></a>' +
        '<a href="https://wa.me/" aria-label="WhatsApp" target="_blank" rel="noopener"><svg class="qz-ico" viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z M12.05 0C5.49 0 .16 5.34.15 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.9-11.89A11.82 11.82 0 0 0 20.53 3.47 11.82 11.82 0 0 0 12.05 0z"/></svg></a>' +
      '</div>' +
    '</div>' +

    '</div>' +
    '<div class="qz-pied-barre">' +
      '<div class="qz-copy">© 2026 Quadreti — Tous droits réservés · Brevet déposé · Conçu et fabriqué en France</div>' +
    '</div>' +
  '</footer>' +

  '<a class="qz-fab" href="#qz-top" aria-label="Retour en haut de page" title="Retour en haut de page">' +
    '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>' +
  '</a>'
);
