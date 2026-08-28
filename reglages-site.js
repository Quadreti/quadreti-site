/* QuadretI — chargeur des réglages du site (panneau fondateur)
   Lit la table publique `reglages_site` (projet Supabase dédié, séparé des comptes app)
   et applique les réglages au chargement. Si la base ne répond pas en 3 s, ne fait
   RIEN : la page garde ses valeurs écrites en dur (aucun risque de page cassée).
   Intégration : <script src="reglages-site.js" defer></script> sur chaque page. */
(function () {
  'use strict';
  var SB_URL = 'https://dxpwkdzofwcxzolwdggp.supabase.co';
  var SB_KEY = 'sb_publishable_EKu_a0eDzPrlkf5W6CuBzg_cxZtSlab'; /* clé publique, sans risque côté client */

  var DEFAUTS = {
    couleurs: { theme: 'actuel', fond: '#F5F5F5', texte: '#2b353e', accent: '#e2725b', survol: '#cf6450' },
    couleursJeux: { fondJeu: '#2B353E', carteJeu: '#FFFFFF', accentJeu: '#E2725B', texteJeu: '#F2EEDF' },
    polices: { titres: 'Quicksand', texte: 'Karla' }
  };

  /* Sections de la page d'accueil, dans leur ordre du code — sert de liste de
     référence pour la visibilité et le réordonnancement (panneau V2). */
  var SECTIONS_ACCUEIL_IDS = ['histoire', 'comment', 'app', 'styles', 'grandir', 'changer', 'gamme', 'cadeau', 'faq', 'livraison'];

  function injecterStyle(id, css) {
    var el = document.getElementById(id);
    if (!el) { el = document.createElement('style'); el.id = id; document.head.appendChild(el); }
    el.textContent = css;
  }

  /* Luminance approximative (0-255) — deja utilisee plus bas par les fonctions
     de menu, remontee ici pour servir aussi au calcul de contraste des
     couleurs generales. Declaration de fonction => hissee, l'ordre dans le
     fichier n'a pas d'importance. */
  function luminance(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return 0.2126 * (n >> 16 & 255) + 0.7152 * (n >> 8 & 255) + 0.0722 * (n & 255);
  }

  /* Palette maitresse (28/08) — remplace les ~15 couleurs eparpillees de
     l'ancienne section Identite par 6 roles clairs (+Accent/Survol inchanges,
     +fond du menu de navigation qui reste volontairement a part, voir
     appliquerMenuNav) :
       Titre (h2/h3), Sous-titre (eyebrow), Texte (corps de texte)
       General (fond de page), Bouton (.cta), Arriere-plan texte (cartes/encarts)
     "Texte" ne se contente plus d'etre pose tel quel partout (c'est ce qui
     rendait du texte blanc invisible sur des cartes restees blanches, ex.
     .gift/.premium/.trust-card qui n'avaient meme pas de champ de fond dedie
     avant ce remaniement) : sur les zones d'arriere-plan-texte, la couleur
     reellement appliquee est verifiee par contraste contre CE fond precis,
     jamais supposee lisible juste parce qu'elle l'est ailleurs.
     L'ancien prereglage "Magazine" (bloc de couleurs crème fige, reinjecte a
     chaque chargement independamment du reste) est retire : Général doit
     vraiment tout gouverner, plus de valeurs figees qui ignorent le reste de
     la palette choisie. */
  function couleurLisibleSur(fondHex, texteSouhaite) {
    if (Math.abs(luminance(fondHex) - luminance(texteSouhaite)) > 80) return texteSouhaite;
    return luminance(fondHex) > 128 ? '#2b353e' : '#ffffff';
  }

  function appliquerCouleurs(c) {
    if (!c) return DEFAUTS.couleurs;
    var v = {};
    /* les couleurs individuelles priment toujours */
    ['fond', 'texte', 'accent', 'survol'].forEach(function (k) {
      if (c[k] && c[k] !== DEFAUTS.couleurs[k]) v[k] = c[k];
    });
    var fond = v.fond || DEFAUTS.couleurs.fond;
    var texte = v.texte || DEFAUTS.couleurs.texte;
    var accent = v.accent || DEFAUTS.couleurs.accent;
    var survol = v.survol || DEFAUTS.couleurs.survol;
    var palette = { fond: fond, texte: texte, accent: accent, survol: survol };
    var titre = c.titres || c.titre; /* "titres" = nom historique du champ, meme role */
    var sousTitre = c.sousTitre;
    var arrierePlanTexte = c.arrierePlanTexte || c.carte || c.encartFond; /* migration douce depuis les anciens champs */
    /* c.logo/c.mentionsKraft/c.boutiqueFond ajoutes a cette garde (28/08) :
       sans ca, un reglage fin personnalise seul (aucun autre champ de la
       palette maitresse touche) faisait sortir la fonction avant meme
       d'atteindre le CSS qui les applique plus bas -- exactement le genre
       de silence qui a fait perdre le reglage "Logo" avant ce correctif. */
    if (!Object.keys(v).length && !titre && !sousTitre && !arrierePlanTexte && !c.logo && !c.mentionsKraft && !c.boutiqueFond) return palette;
    /* --charbon / --qz-charbon (28/08, correctif racine) : ces deux variables
       ETAIENT reinjectees ici avec la valeur de "Texte" -- pratique tant que
       Texte restait sombre (les deux se confondaient), mais des qu'un theme
       choisit un Texte clair (ex. palette "Quadreti", Texte=blanc), ca
       detourne TOUTE la variable partout sur le site : les ~90 endroits qui
       posent color:var(--charbon) pour du texte en gras dans des encarts
       (.how-foot a, .app-reassure b, .trust-card li b, .gamme-notes b...) --
       et qui attendaient un charbon fixe, pas la couleur de Texte choisie --
       deviennent blancs sur blanc, invisibles. Meme chose pour les fonds
       (.carte-pont, .onglet-mode.actif, .face-dos des jeux) qui viraient
       blancs eux aussi. Retire : --charbon/--qz-charbon redeviennent ce
       qu'ils ont toujours ete pour le reste du site, une couleur charbon FIXE
       -- jamais pilotee par Texte. Les endroits qui avaient deja besoin de
       suivre Texte dynamiquement (bouton, .cta, footer, h2/h3...) le font
       deja via leurs propres regles plus bas, independantes de --charbon. */
    var css = ':root{' +
      '--fond:' + fond + ';--terracotta:' + accent + ';' +
      '--qz-clair:' + fond + ';--qz-terracotta:' + accent + ';' +
      '}\nbody{background:' + fond + ';color:' + texte + '}' +
      '\na:hover .qz-picto{color:inherit}' +
      '\n.cta:hover,.qz-cta:hover{background:' + survol + '!important}';

    /* Logo du bandeau du haut (tesselles + "Quadretı") : jamais couvert par
       appliquerMenuNav (qui ne pose que le burger/le panneau) -- restait
       fige sur var(--qz-charbon), pense a l'origine pour un bandeau clair.
       Des que General (fond du bandeau, --qz-clair juste au-dessus) devient
       sombre, logo fonce sur fond fonce = invisible.
       28/08 (suite) : un reglage "fin" existait DEJA dans le panneau pour
       ceci (carte Palette maitresse > Reglages fins > "Logo", repli sur
       Texte) -- le fondateur l'avait meme deja bascule et enregistre en
       blanc (#ffffff, verifie en base) mais RIEN ne le lisait jamais ici,
       d'ou le "j'ai beau essayer, je n'y arrive pas". Corrige : c.logo est
       maintenant lu s'il est personnalise (interrupteur "fin" desactive),
       sinon repli sur Texte (comme declare dans ZONES_FINES du panneau) --
       Texte est deja pense pour rester lisible sur General, pas une
       coincidence a esperer comme les bugs precedents. */
    var couleurLogo = c.logo || texte;
    css += '\n.qz-header .qz-qlogo i.t{background:' + couleurLogo + '!important}' +
      '\n.qz-header .qz-wordmark{color:' + couleurLogo + '!important}';

    /* Mentions legales (cartouches "Mentions legales/CGV/CGU & RGPD/
       Livraison & paiement/Contact", bas de page) : fond fixe dans
       commun.css, jamais relie au panneau -- demande fondateur (28/08) de
       pouvoir le regler. Nouveau reglage fin dans le panneau (ZONES_FINES,
       cle "mentionsKraft", repli sur le kraft actuel -- zero changement
       visuel tant que personne n'y touche).
       28/08 (suite) : precise par le fondateur -- c'est bien le FOND du
       cartouche qui doit rester kraft (pas l'icone comme suppose au premier
       jet), texte et icone repasses en noir/charbon fixe (pas un reglage,
       choix de design assume) directement dans commun.css. */
    var couleurMentions = c.mentionsKraft || '#CBBD93';
    css += '\n.qz-legal a.qz-leg{background:' + couleurMentions + '!important}';

    /* Arriere-plan boutique (28/08) : meme bug que Logo ci-dessus, trouve en
       corrigeant celui-ci -- 3e reglage fin du panneau (ZONES_FINES,
       "boutiqueFond", repli "fond") jamais applique nulle part. Repli =
       "fond" = suivre General comme aujourd'hui (deja le cas via le body{
       background:fond} generique juste au-dessus) : rien a injecter tant
       que non personnalise. Seul un choix personnalise a besoin d'une regle
       a part, et seulement sur la page Boutique elle-meme -- jamais sur le
       reste du site, comme le nom du reglage le precise dans le panneau. */
    if (c.boutiqueFond && /\/boutique\/(index\.html)?$/.test(location.pathname)) {
      css += '\nbody{background:' + c.boutiqueFond + '!important}';
    }

    /* Pied de page (28/08) : contrairement au bandeau du haut (deja bien
       gere par appliquerMenuNav, qui pose ses propres couleurs calculees
       PAR-DESSUS la variable --qz-charbon), le pied de page (.qz-basdepage/
       .qz-reseaux/.qz-legal) n'a jamais eu de calque equivalent -- il
       affichait donc directement var(--qz-charbon), qui vaut ici la couleur
       de TEXTE (pensee a l'origine pour un theme clair ou --charbon et le
       texte fonce coincident, jamais mis a jour pour un theme sombre custom).
       Corrige en lui donnant enfin son propre calque, aligne sur la vraie
       palette plutot que sur une variable partagee mal reliee -- c'est ce
       qui restait fige en creme via l'ancien theme "Magazine", retire. */
    var texteSurFooter = couleurLisibleSur(fond, texte);
    css += '\n.qz-basdepage,.qz-reseaux,.qz-legal{background:' + fond + '}' +
      '\n.qz-basdepage .qz-wordmark,.qz-baseline,.qz-reseaux .qz-accroche{color:' + texteSurFooter + '}' +
      '\n.qz-basdepage .qz-qlogo i.t{background:' + texteSurFooter + '}' +
      /* .qz-legal a.qz-leg span et .qz-legal .qz-picto retires de ces deux
         listes (28/08, suite) : ils suivaient a tort la meme logique de
         contraste que le reste du pied de page (texte clair sur fond
         SOMBRE), alors que leur cartouche a desormais son PROPRE fond kraft
         clair (voir plus haut, .qz-legal a.qz-leg) -- texte/icone noir fixe
         geres dans commun.css, plus rien a calculer ici pour ces deux-la. */
      '\n.qz-reseaux .qz-sub,.qz-copy{color:' + couleurLisibleSur(fond, '#9aa2a9') + '}' +
      '\n.qz-reseaux .qz-grid a{background:' + accent + '!important;color:' + couleurLisibleSur(accent, texte) + '!important}' +
      '\n.qz-reseaux .qz-grid a:hover,.qz-reseaux .qz-grid a:focus-visible{background:' + survol + '!important}' +
      '\n.qz-legal a.qz-leg:hover,.qz-legal a.qz-leg:focus-visible{background:' + accent + ';border-color:' + accent + '}' +
      '\n.qz-legal a.qz-leg:hover span,.qz-legal a.qz-leg:hover .qz-picto{color:' + couleurLisibleSur(accent, texte) + '}';

    /* Bouton (28/08, correctif majeur) : la base CSS du site pose le fond
       de PLUSIEURS elements (bouton principal .cta, pastilles numerotees
       .step .num, badge "Le plus choisi" .offer .flag, puces .chip) sur
       var(--charbon) -- une variable qui, dans ce fichier, tient la couleur
       de TEXTE choisie (--charbon:texte, ligne plus haut), jamais mise a jour
       pour un theme sombre custom. Resultat concret trouve en testant : sur
       le theme marine/blanc actuel, le bouton "Composer mon mur", les
       pastilles 1/2/3 et le badge "Le plus choisi" deviennent blanc sur
       blanc, invisibles. Avant, cette regle etait CONDITIONNELLE (seulement
       si c.bouton etait rempli a la main) -- desormais TOUJOURS appliquee
       (avec un repli sur Accent si rien n'est personnalise), pour que ces
       elements ne dependent plus jamais de --charbon. */
    var bouton = c.bouton || accent;
    css += '\n.cta,.step .num,.offer .flag,.chip{background:' + bouton + '!important;color:' + couleurLisibleSur(bouton, texte) + '!important}';
    if (titre) css += '\nh2,h3{color:' + titre + '}';
    if (sousTitre) css += '\n.eyebrow{color:' + sousTitre + '}';

    /* Meme famille de bug, deux autres cas trouves en testant (28/08) :
       - .finale (bandeau de cloture, juste avant le pied de page) pose
         aussi son fond sur var(--charbon) -- suit General desormais.
       - .color-note (encart "Palette infinie") a un fond FIXE (kraft clair,
         jamais pilote par la palette) mais un texte qui suivait quand meme
         --charbon -- corrige avec une couleur calculee contre CE fond fixe
         precis, jamais suppose lisible juste parce qu'il l'est ailleurs. */
    css += '\n.finale{background:' + fond + '!important}';
    var couleurNote = couleurLisibleSur('#E9EDDD', texte);
    css += '\n.color-note b{color:' + couleurNote + '!important}';

    /* .offer (cartes de tarifs) : meme oubli que .gift/.premium/.trust-card
       avant ce remaniement -- fond blanc code en dur, aucun champ dedie. */
    if (arrierePlanTexte) {
      css += '\n.offer{background:' + arrierePlanTexte + '!important}';
      css += '\n.offer .fmt,.offer .prix{color:' + couleurLisibleSur(arrierePlanTexte, texte) + '}';
    }

    /* Arriere-plan texte : couvre maintenant TOUTES les cartes contenant du
       texte, y compris .gift/.premium/.trust-card qui n'avaient avant aucun
       champ de fond dedie (elles gardaient le blanc code en dur du site,
       incompatible avec un texte qui se voulait blanc ailleurs). Le texte
       pose dessus passe systematiquement par couleurLisibleSur -- jamais
       colle tel quel. NE TOUCHE PLUS --olive/--olive-soft (erreur corrigee) :
       ce sont les couleurs d'un systeme de badges/encarts distinct
       (.badge, .step .hint, .premium .ic...), pas un alias du texte/fond
       des cartes -- les detourner cassait a son tour .premium .ic (icone
       blanche sur fond blanc, meme famille de bug). */
    /* 28/08 (correctif de fond, suite aux captures du fondateur) : cette
       liste melangeait a tort deux fonds DIFFERENTS sous une seule couleur
       calculee (texteSurCarte, contre arrierePlanTexte) :
       - les vraies cartes arriere-plan-texte (.step,.premium,.gift,
         .trust-card...), qui RECOIVENT ce fond juste au-dessus -- correct.
       - du texte pose directement sur le fond GENERAL de la page
         (.story .txt, .how-foot, .app-reassure, .scal-foot, .change li,
         .gamme-notes, .blk p.lead) -- ca "marchait" uniquement parce que
         arrierePlanTexte == General dans la palette Quadreti actuelle,
         coincidence qui casse des que les deux different.
       - .mode p, sur un fond BLANC FIXE (#fff, jamais pilote par la
         palette) -- ici la coincidence ne tenait plus du tout : texte
         calcule pour un fond charbon, colle sur une carte restee blanche,
         invisible (capture d'ecran du fondateur, "Mode Couleur" etc).
       Separe en 3 groupes, chacun calcule contre son VRAI fond -- plus
       aucune coincidence a esperer, correct meme si les couleurs divergent
       un jour. */
    if (arrierePlanTexte) {
      css += '\n.step,.reason,.c-form-compact,.gift,.premium,.trust-card,.qz-legal a.qz-leg{background:' + arrierePlanTexte + '!important}';
      var texteSurCarte = couleurLisibleSur(arrierePlanTexte, texte);
      css += '\n.step p,.premium p,.gift p,.trust-card>p,.trust-card li,.qa .a p{color:' + texteSurCarte + '}';
      css += '\n.trust-card li b{color:' + texteSurCarte + '!important}';
    }

    /* Texte pose directement sur le fond general de la page (pas une carte
       a part) : calcule contre "fond", jamais contre arrierePlanTexte. */
    var texteSurFond = couleurLisibleSur(fond, texte);
    css += '\n.blk p.lead,.story .txt p,.how-foot,.app-reassure,' +
      '.scal-foot,.change li,.gamme-notes{color:' + texteSurFond + '}';
    css += '\n.story .txt p b,.story .txt .reinvente,.app-reassure b,.scal-foot b,' +
      '.change li b,.gamme-notes b,.how-foot a' +
      '{color:' + texteSurFond + '!important}';

    /* Questions du FAQ : meme fond general, jamais couvertes avant -- restaient
       sur var(--charbon) fige, invisibles des que "Texte" devient clair. */
    css += '\n.qa button.q{color:' + texteSurFond + '!important}';

    /* .mode (cartes "Mode Couleur"/"Mode Photo"...) : fond BLANC FIXE, jamais
       pilote par la palette -- calcule contre blanc, jamais contre fond ni
       arrierePlanTexte (c'est exactement le melange qui rendait ce texte
       invisible). */
    css += '\n.mode p{color:' + couleurLisibleSur('#ffffff', texte) + '!important}';

    injecterStyle('qz-reglages-couleurs', css);
    return palette;
  }

  /* Palette Jeux (28/08) : les mini-jeux (Memo, Taquin, Mandala, Pixel Number,
     Set, Mosaique Revelee) ont deliberement leurs propres couleurs, distinctes
     de l'identite du site (memoire projet-quadreti-... "couleurs vives pour le
     gameplay, pas la palette de marque"). Avant ce correctif, ces couleurs
     etaient codees en dur, identiques mot pour mot, dans les 6 pages -- toute
     retouche demandait de modifier 6 fichiers a la main. Meme mecanique que
     appliquerCouleurs, mais sur les variables partagees par ces 6 pages
     (--charbon/--surface/--terracotta/--creme) et seulement sur ces pages :
     jamais applique ailleurs, pour ne pas recreer la confusion du matin. */
  var PAGES_JEUX = ['/memo/', '/taquin/', '/mandala/', '/pixel-number/', '/set/', '/mosaique-revelee/'];
  function estPageJeu() {
    return PAGES_JEUX.some(function (p) { return location.pathname.indexOf(p) !== -1; });
  }
  function appliquerCouleursJeux(cj) {
    if (!estPageJeu()) return;
    var d = DEFAUTS.couleursJeux;
    var fondJeu = (cj && cj.fondJeu) || d.fondJeu;
    var carteJeu = (cj && cj.carteJeu) || d.carteJeu;
    var accentJeu = (cj && cj.accentJeu) || d.accentJeu;
    var texteJeu = (cj && cj.texteJeu) || d.texteJeu;
    var css = ':root{--charbon:' + fondJeu + ';--surface:' + carteJeu + ';--terracotta:' + accentJeu + ';--creme:' + texteJeu + ';}';
    injecterStyle('qz-reglages-couleurs-jeux', css);
  }

  function appliquerSeo(s) {
    if (!s) return;
    if (s.titre) document.title = s.titre;
    if (s.description) {
      var m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
      m.content = s.description;
    }
    if (s.favicon) {
      var liens = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
      if (!liens.length) {
        var l = document.createElement('link'); l.rel = 'icon'; document.head.appendChild(l); liens = [l];
      }
      liens.forEach(function (l) { l.href = s.favicon; });
    }
  }

  function appliquerDisposition(d) {
    if (!d || !d.heroCta || d.heroCta === 'centre') return;
    var css = d.heroCta === 'gauche'
      ? '.hero-cta{left:26px;transform:none}'
      : '.hero-cta{left:auto;right:26px;transform:none}';
    injecterStyle('qz-reglages-disposition', css);
  }

  /* Charge une police Google Fonts si besoin (pas déjà présente, pas une des deux
     polices d'origine déjà chargées dans le <head> de chaque page). Partagé entre
     appliquerPolices (site entier) et appliquerStylesSections (une section). */
  function chargerPoliceGoogle(famille) {
    if (!famille || famille === 'Quicksand' || famille === 'Karla') return;
    var href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(famille) + ':wght@400;500;600;700&display=swap';
    if (!document.querySelector('link[href="' + href + '"]')) {
      var l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = href;
      document.head.appendChild(l);
    }
  }

  function appliquerPolices(p) {
    if (!p) return;
    var titres = p.titres || DEFAUTS.polices.titres;
    var texte = p.texte || DEFAUTS.polices.texte;
    if (titres === DEFAUTS.polices.titres && texte === DEFAUTS.polices.texte) return;
    chargerPoliceGoogle(titres); chargerPoliceGoogle(texte);
    injecterStyle('qz-reglages-polices',
      'body,p,li,a,input,button,textarea{font-family:\'' + texte + '\',sans-serif}' +
      'h1,h2,h3,h4,.qz-wordmark,.qz-cat,.cta,.qz-cta{font-family:\'' + titres + '\',sans-serif}');
  }

  /* Style dédié à UNE section de l'accueil (police/taille/couleur/fond) : CSS ciblé
     sur son identifiant, qui l'emporte naturellement sur les règles générales du site
     (spécificité #id > body/h2 génériques) — pas de bidouille de priorité nécessaire.
     Absent/vide = la section garde le style du thème global. */
  function appliquerStylesSections(styles) {
    var css = '';
    if (styles) {
      Object.keys(styles).forEach(function (id) {
        var s = styles[id];
        if (!s || SECTIONS_ACCUEIL_IDS.indexOf(id) === -1) return;
        var sel = '#' + id;
        if (s.fond) css += sel + '{background:' + s.fond + '!important}\n';
        if (s.couleur) css += sel + ' h2,' + sel + ' h3,' + sel + ' p,' + sel + ' li,' + sel + ' b{color:' + s.couleur + '!important}\n';
        if (s.police) { chargerPoliceGoogle(s.police); css += sel + '{font-family:\'' + s.police + '\',sans-serif}\n'; }
        if (s.taille) css += sel + ' p{font-size:' + s.taille + 'px}\n';
      });
    }
    /* Toujours appele, meme avec css vide (28/08, vrai bug trouve en testant) :
       avant, injecterStyle n'etait appele QUE si css avait du contenu -- une
       fois qu'un reglage etait supprime cote panneau/base, l'ancien style
       injecte restait fige pour toujours (rien ne venait jamais le vider),
       y compris apres un rechargement complet une fois le cache anti-flash
       repopule avec l'ancienne valeur. injecterStyle avec une chaine vide
       vide correctement le <style> existant. */
    injecterStyle('qz-styles-sections', css);
  }

  function texte(sel, val) {
    if (!val) return;
    var el = document.querySelector(sel);
    if (el) el.textContent = val;
  }

  function appliquerBaselines(b) {
    if (!b) return;
    texte('.qz-baseline', b.produit);
    texte('.qz-cat', b.categorie);
  }

  /* Reconstruit entièrement les liens du menu (#qzNavPanel > ul) à partir d'une liste
     réglable — absent ou vide = le menu codé en dur de la page (22 pages, chemins
     relatifs à chacune) reste inchangé, comportement identique à aujourd'hui.
     Les liens du réglage sont volontairement à la racine (commencent par /) : un seul
     réglage marche pareil sur les 22 pages, pas besoin de connaître leur profondeur. */
  function echapper(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function appliquerMenuLiens(liens) {
    if (!liens || !liens.length) return;
    var panel = document.getElementById('qzNavPanel');
    var ul = panel && panel.querySelector('ul');
    if (!ul) return;
    ul.innerHTML = liens.map(function (item) {
      if (item.sousMenu && item.sousMenu.length) {
        return '<li class="qz-hassub"><button class="qz-subtoggle" aria-expanded="false">' + echapper(item.texte) +
          ' <span class="qz-chev">▾</span></button><ul class="qz-sublist">' +
          item.sousMenu.map(function (s) { return '<li><a href="' + echapper(s.lien) + '">' + echapper(s.texte) + '</a></li>'; }).join('') +
          '</ul></li>';
      }
      return '<li><a href="' + echapper(item.lien) + '">' + echapper(item.texte) + '</a></li>';
    }).join('');
    /* Delegation du sous-menu retiree d'ici (28/08) : commun-bandeau.js gere
       desormais TOUS les clics .qz-subtoggle via une delegation sur document
       (voir son commentaire -- corrige un vrai bug du bouton burger en
       production). Garder les deux aurait double-bascule le sous-menu
       (ouvre puis referme aussitot, les deux delegations reagissant au
       meme clic qui remonte jusqu'a document). */
  }

  function appliquerReseaux(r) {
    if (!r) return;
    ['Facebook', 'Snapchat', 'TikTok', 'YouTube', 'WhatsApp'].forEach(function (nom) {
      var url = r[nom.toLowerCase()];
      if (!url) return;
      var a = document.querySelector('.qz-reseaux .qz-grid a[aria-label="' + nom + '"]');
      if (a) a.setAttribute('href', url);
    });
  }

  /* Icônes vérifiées visuellement (mêmes tracés que le footer d'origine) — liste
     volontairement fermée : pas d'upload d'icône libre (risque de SVG cassé ou piégé),
     un tracé de plus s'ajoute ici une fois vérifié, plutôt que laissé à la main de
     n'importe qui. */
  var ICONES_RESEAUX = {
    facebook: { nom: 'Facebook', svg: '<path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z"/>' },
    snapchat: { nom: 'Snapchat', svg: '<path d="M12.031.002c-.947 0-4.298.259-5.977 3.583-.783 1.55-.632 4.315-.51 6.532.006.104.011.204.011.3-.114.058-.319.129-.665.129-.386-.007-.848-.096-1.361-.267a1.06 1.06 0 0 0-.336-.058c-.361 0-.653.214-.756.535-.09.286-.048.828.652 1.28.13.083.32.184.55.293.6.283 1.397.652 1.397 1.3 0 .12-.024.31-.146.61-.02.05-.048.11-.08.174-.08.166-.17.35-.24.548-.16.44-.164.87.106 1.24.35.483 1.06.727 2.11.727.176 0 .366-.011.567-.031.036.316.12.665.31.976.393.638 1.14.958 2.216.958.176 0 .35-.008.51-.024.056.106.116.212.18.316.554.9 1.507 1.393 2.68 1.393h.007c1.173 0 2.126-.493 2.68-1.393.064-.104.124-.21.18-.316.16.016.334.024.51.024 1.077 0 1.823-.244 2.216-.958.19-.311.274-.66.31-.976.201.02.391.031.567.031 1.05 0 1.76-.244 2.11-.727.27-.37.266-.8.106-1.24-.07-.198-.16-.382-.24-.548-.032-.064-.06-.124-.08-.174-.122-.3-.146-.49-.146-.61 0-.648.797-1.017 1.397-1.3.23-.109.42-.21.55-.293.7-.452.742-.994.652-1.28-.103-.321-.395-.535-.756-.535a1.06 1.06 0 0 0-.336.058c-.513.171-.975.26-1.361.267-.346 0-.551-.071-.665-.129 0-.096.005-.196.011-.3.122-2.217.273-4.982-.51-6.532C16.298.261 12.978.002 12.031.002z"/>' },
    tiktok: { nom: 'TikTok', svg: '<path d="M16.6 5.82c-.9-.98-1.45-2.24-1.5-3.62h-3.2v13.63c0 1.7-1.38 3.08-3.08 3.08a3.08 3.08 0 0 1-1.15-5.94A3.08 3.08 0 0 1 9 12.7V9.44c-.3-.04-.6-.06-.9-.06-3.5 0-6.34 2.84-6.34 6.34S4.6 22.06 8.1 22.06s6.34-2.84 6.34-6.34V8.85a8.3 8.3 0 0 0 4.85 1.55V7.2a5.28 5.28 0 0 1-2.69-1.38z"/>' },
    youtube: { nom: 'YouTube', svg: '<path d="M23.5 6.19a2.97 2.97 0 0 0-2.09-2.09C19.65 3.5 12 3.5 12 3.5s-7.65 0-9.41.6A2.97 2.97 0 0 0 .5 6.19 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.81 2.97 2.97 0 0 0 2.09 2.09c1.76.6 9.41.6 9.41.6s7.65 0 9.41-.6a2.97 2.97 0 0 0 2.09-2.09A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>' },
    whatsapp: { nom: 'WhatsApp', svg: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z M12.05 0C5.49 0 .16 5.34.15 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.9-11.89A11.82 11.82 0 0 0 20.53 3.47 11.82 11.82 0 0 0 12.05 0z"/>' }
  };
  /* Liste réglable des réseaux (icône + lien + ordre) : absente/vide = les 5 icônes
     codées en dur restent (comportement identique à avant). Non vide = remplace
     entièrement la grille, donc un lien vide n'affiche plus une icône morte. */
  function appliquerReseauxListe(liste) {
    if (!liste || !liste.length) return;
    var grille = document.querySelector('.qz-reseaux .qz-grid');
    if (!grille) return;
    grille.innerHTML = liste.map(function (item) {
      var ic = ICONES_RESEAUX[item.plateforme];
      if (!ic || !item.lien) return '';
      return '<a href="' + echapper(item.lien) + '" aria-label="' + echapper(ic.nom) + '" target="_blank" rel="noopener"><svg class="qz-ico" viewBox="0 0 24 24">' + ic.svg + '</svg></a>';
    }).join('');
    grille.style.gridTemplateColumns = 'repeat(' + liste.length + ', 58px)';
  }

  function appliquerCopyright(c) {
    if (c) texte('.qz-copy', c.texte);
  }

  function appliquerSections(s) {
    if (!s) return;
    Object.keys(s).forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return; /* les autres pages ignorent les sections de l'accueil */
      var d = s[id] || {};
      if (d.titre) { var h = sec.querySelector('h2') || sec.querySelector('h1'); if (h) h.textContent = d.titre; }
      if (d.texte) {
        var p = sec.querySelector('p');
        if (p) {
          /* Lien à l'intérieur du texte : jamais de HTML libre dans un champ texte
             (un tag mal fermé casserait la page) — un mot/phrase précis, retrouvé par
             recherche exacte dans le texte, entouré d'un <a> construit par le DOM. */
          var idx = (d.lien && d.lien.mot && d.lien.url) ? d.texte.indexOf(d.lien.mot) : -1;
          if (idx === -1) {
            p.textContent = d.texte;
          } else {
            p.textContent = '';
            p.appendChild(document.createTextNode(d.texte.slice(0, idx)));
            var a = document.createElement('a');
            a.href = d.lien.url;
            a.textContent = d.lien.mot;
            p.appendChild(a);
            p.appendChild(document.createTextNode(d.texte.slice(idx + d.lien.mot.length)));
          }
        }
      }
    });
  }

  function appliquerVisibiliteSections(vis) {
    if (!vis) return;
    Object.keys(vis).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) sec.style.display = vis[id] === false ? 'none' : '';
    });
  }

  /* Réordonne les sections d'accueil en déplaçant les noeuds existants (aucun contenu
     recréé) puis réaligne la bande alternée claire/foncée (.alt) sur la nouvelle
     position — sinon le motif en rayures suivrait l'ancien ordre. Ids inconnus ignorés
     par sécurité (ex. réglage plus ancien qu'une section renommée). */
  function appliquerOrdreSections(ordre) {
    if (!ordre || !ordre.length) return;
    var parent = null;
    ordre.forEach(function (id) {
      if (SECTIONS_ACCUEIL_IDS.indexOf(id) === -1) return;
      var sec = document.getElementById(id);
      if (!sec) return;
      parent = sec.parentNode;
      parent.appendChild(sec);
    });
    if (!parent) return;
    var i = 0;
    ordre.forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      sec.classList.toggle('alt', i % 2 === 1);
      i++;
    });
  }

  function appliquerPageContact(pc) {
    if (!pc) return;
    if (!/(^|\/)contact\.html$/.test(location.pathname)) return; /* les autres pages ignorent ces textes */
    texte('#contactHeroTitre', pc.titre);
    texte('#contactHeroLead', pc.accroche);
    ['raison1', 'raison2', 'raison3', 'raison4'].forEach(function (cle, i) {
      var d = pc[cle];
      if (!d) return;
      var n = i + 1;
      texte('#reason' + n + ' h3', d.titre);
      texte('#reason' + n + ' p', d.texte);
    });
  }

  function appliquerPageColoriages(pc) {
    if (!pc) return;
    if (!/\/coloriages\/(index\.html)?$/.test(location.pathname)) return; /* seule la page bibliothèque */
    texte('#coloriagesTitre', pc.titre);
    texte('#coloriagesLead', pc.accroche);
  }

  function appliquerBandeauVideo(cfg) {
    cfg = cfg || {};
    var hero = document.getElementById('hero');
    if (hero) {
      hero.classList.toggle('voile-actif', !!cfg.voile);
      var video = hero.querySelector('video.shot');
      if (video && (cfg.video_url || cfg.video_url_mobile)) {
        /* source[0] = variante mobile (media max-width:759px), source[1] = desktop
           (voir index.html) — remplace juste l'attribut src, .load() force le
           navigateur à ressélectionner la bonne source et redéclenche
           loadedmetadata (les écouteurs vitesse/pause déjà posés restent valables,
           ils sont sur l'élément video, pas sur la source). */
        var sources = video.querySelectorAll('source');
        if (cfg.video_url_mobile && sources[0]) sources[0].src = cfg.video_url_mobile;
        if (cfg.video_url && sources[1]) sources[1].src = cfg.video_url;
        video.load();
        video.play().catch(function () {});
      }
      if (window.__reglerBandeauVideo) {
        window.__reglerBandeauVideo(
          typeof cfg.vitesse === 'number' ? cfg.vitesse : undefined,
          typeof cfg.pause_ms === 'number' ? cfg.pause_ms : undefined,
          typeof cfg.actif === 'boolean' ? cfg.actif : undefined,
          typeof cfg.pos_x === 'number' ? cfg.pos_x : undefined,
          typeof cfg.pos_y === 'number' ? cfg.pos_y : undefined
        );
      }
    }
    appliquerPositionTicker(cfg.position_ticker);
  }

  /* Fond anime "tesselles fuyantes" (accueil uniquement) -- la logique vit dans
     le script inline d'index.html (window.__reglerTessellesFond), absente
     sur les autres pages : appel sans effet ailleurs. */
  function appliquerTessellesFond(cfg) {
    if (window.__reglerTessellesFond) window.__reglerTessellesFond(cfg || {});
  }

  function appliquerPositionTicker(position) {
    var ticker = document.querySelector('.ticker');
    if (!ticker || !position) return; /* pages sans bandeau defilant, ou reglage absent = position deja correcte dans le HTML */
    if (position === 'aucun') { ticker.style.display = 'none'; return; }
    ticker.style.display = '';
    if (position === 'haut') {
      document.body.insertBefore(ticker, document.body.firstChild);
    } else { /* sous_bandeau : sous le bandeau anime (#hero / .hero) si la page en a un,
                sinon juste sous le menu (position deja bonne, on ne bouge rien) */
      var banniere = document.querySelector('#hero, .hero');
      if (banniere) banniere.insertAdjacentElement('afterend', ticker);
    }
  }

  /* Mécanisme générique de remplacement d'image, section par section : toute balise
     portant data-image-zone="xxx" prend l'URL g.images.xxx si elle existe, sinon garde
     l'image codée en dur dans le HTML. Additif — aucune zone taguée aujourd'hui à part
     le repli photo du bandeau, on en tague d'autres au fil des besoins (panneau V2). */
  function appliquerImages(images) {
    if (!images) return;
    var noeuds = document.querySelectorAll('[data-image-zone]');
    for (var i = 0; i < noeuds.length; i++) {
      var zone = noeuds[i].getAttribute('data-image-zone');
      if (images[zone]) noeuds[i].src = images[zone];
    }
  }

  /* Même principe que appliquerImages, pour le texte et le lien des boutons :
     data-bouton-zone="xxx" + g.boutons.xxx = {texte, lien}. Additif, un bouton non
     tagué ou non renseigné garde son texte/lien codé en dur dans le HTML. */
  function appliquerBoutons(boutons) {
    if (!boutons) return;
    var noeuds = document.querySelectorAll('[data-bouton-zone]');
    for (var i = 0; i < noeuds.length; i++) {
      var b = boutons[noeuds[i].getAttribute('data-bouton-zone')];
      if (!b) continue;
      if (b.texte) noeuds[i].textContent = b.texte;
      if (b.lien) noeuds[i].setAttribute('href', b.lien);
    }
  }

  function appliquerBandeau(b) {
    if (!b) return;
    var track = document.querySelector('.ticker-track');
    if (!track) return; /* pages sans bandeau défilant */
    if (b.messages && b.messages.length) {
      track.textContent = '';
      /* contenu doublé : nécessaire au défilement sans coupure (translation de -50 %) */
      for (var tour = 0; tour < 2; tour++) {
        b.messages.forEach(function (m) {
          if (!m) return;
          var s = document.createElement('span');
          s.textContent = m;
          track.appendChild(s);
        });
      }
    }
    var css = '';
    if (b.fond) css += '.ticker{background:' + b.fond + '}';
    if (b.texte) css += '.ticker{color:' + b.texte + '}.ticker-track span{border-right-color:' + b.texte + '38}';
    if (b.vitesse) css += '.ticker-track{animation-duration:' + b.vitesse + 's}';
    if (css) injecterStyle('qz-reglages-bandeau', css);
  }

  function appliquerPhotos(ph) {
    if (!ph) return;
    var imgs = document.querySelectorAll('.bg-slides .shot');
    Object.keys(ph).forEach(function (n) {
      var i = parseInt(n, 10) - 1;
      if (!ph[n] || !imgs[i]) return;
      if (imgs[i].hasAttribute('data-src')) imgs[i].setAttribute('data-src', ph[n]);
      else imgs[i].src = ph[n];
    });
  }

  var ICONES_BULLE = {
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z M12.05 0C5.49 0 .16 5.34.15 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.9-11.89A11.82 11.82 0 0 0 20.53 3.47 11.82 11.82 0 0 0 12.05 0z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z"/></svg>'
  };
  var LIBELLES_BULLE = { whatsapp: 'Discuter sur WhatsApp', facebook: 'Nous contacter sur Facebook' };

  function appliquerBulleContact(b, reseaux) {
    if (!b || !b.choix || b.choix === 'aucun') return;
    var url = (reseaux || {})[b.choix];
    if (!url) return; /* pas de lien renseigné dans « Réseaux sociaux » : rien à afficher */
    var couleur = b.couleur || (b.choix === 'whatsapp' ? '#25D366' : '#1877F2');
    injecterStyle('qz-bulle-contact-style', [
      '.qz-bulle-contact{position:fixed;left:18px;bottom:18px;z-index:60;width:52px;height:52px;border-radius:50%;',
      'background:' + couleur + ';display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px #00000040;',
      'text-decoration:none;transition:transform .15s ease}',
      '.qz-bulle-contact:hover{transform:scale(1.06)}',
      '.qz-bulle-contact svg{width:28px;height:28px;fill:#fff}'
    ].join('\n'));
    var a = document.createElement('a');
    a.className = 'qz-bulle-contact';
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', LIBELLES_BULLE[b.choix]);
    a.innerHTML = ICONES_BULLE[b.choix];
    document.body.appendChild(a);
  }

  function hexEnRgba(hex, alpha) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + alpha + ')';
  }

  /* luminance() deja definie plus haut (utilisee par appliquerCouleurs) --
     sert ici a choisir automatiquement, dans la palette, laquelle de
     fond/texte joue le role « clair » et laquelle joue le role « fonce »,
     quel que soit le sens du theme (classique ou inverse clair-sur-fonce). */
  function plusClair(p) { return luminance(p.fond) >= luminance(p.texte) ? p.fond : p.texte; }
  function plusFonce(p) { return luminance(p.fond) < luminance(p.texte) ? p.fond : p.texte; }

  function appliquerMenuNav(m, palette, suit) {
    if (!m) return;
    var css = '';
    var bouton = suit && palette ? plusFonce(palette) : m.bouton;
    var traits = suit && palette ? plusClair(palette) : m.traits;
    var fond = suit && palette ? plusFonce(palette) : m.fond;
    var texte = suit && palette ? plusClair(palette) : m.texte;
    var sousBouton = suit && palette ? plusClair(palette) : m.sousBouton;
    if (bouton) css += '\n.qz-burger{background:' + bouton + '}';
    if (traits) css += '\n.qz-burger span{background:' + traits + '}';
    if (typeof m.transparence === 'number' && m.transparence > 0) {
      var alphaFond = (100 - Math.max(0, Math.min(100, m.transparence))) / 100;
      css += '\n.qz-navpanel{background:' + hexEnRgba(fond || '#2B353E', alphaFond) + '}';
    } else if (fond) css += '\n.qz-navpanel{background:' + fond + '}';
    if (typeof m.voile === 'number') {
      var v = Math.max(0, Math.min(100, m.voile)) / 100;
      css += '\n.qz-nav-voile{background:rgba(0,0,0,' + v + ')}';
    }
    if (texte) css += '\n.qz-navpanel a{color:' + texte + '}';
    if (sousBouton) css += '\n.qz-subtoggle{color:' + sousBouton + '}';
    if (m.overlay) css += '\n.qz-navpanel{position:fixed;left:0;right:0}';
    if (m.position === 'gauche') css += '\n.qz-header{grid-template-columns:auto 1fr}\n.qz-header .qz-burger{order:-1}';
    else if (m.position === 'centre') css += '\n.qz-header{grid-template-columns:1fr auto 1fr}';
    /* Reglages du menu principal — cibles sur .qz-navpanel>ul uniquement, pour ne
       jamais entrainer le sous-menu (qui a ses propres reglages ci-dessous). */
    if (typeof m.espacement === 'number') css += '\n.qz-navpanel>ul{gap:' + m.espacement + 'px}';
    if (m.disposition === 'horizontale') {
      /* Reserve au desktop/tablette (>=760px, meme seuil que le reste du site) :
         8 entrees en ligne sur un ecran mobile de 375px ne peuvent que mal
         s'enrouler (pagaille constatee) -- le mobile garde toujours la liste
         verticale, quel que soit ce reglage. */
      var justif = { gauche: 'flex-start', centre: 'center', droite: 'flex-end', espace: 'space-between' }[m.justifie] || 'center';
      css += '\n@media (min-width:760px){' +
             '\n.qz-navpanel>ul{flex-direction:row;flex-wrap:wrap;justify-content:' + justif + '}' +
             '\n.qz-navpanel>ul>li{width:auto;max-width:none}' +
             /* Sous-menu en volet flottant sous son bouton, plutot que de pousser
                les autres entrees de la ligne quand il s'ouvre. */
             '\n.qz-navpanel li.qz-hassub{position:relative}' +
             '\n.qz-navpanel li.qz-hassub .qz-sublist{position:absolute;top:100%;left:50%;transform:translateX(-50%);width:max-content;z-index:5;box-shadow:0 8px 18px #00000045}' +
             /* Une fois ouvert, le panneau laisse le volet du sous-menu deborder :
                sans ca, overflow:hidden le coupait et la partie coupee tombait
                sous le voile, qui avalait les clics (menu qui se refermait). */
             '\n.qz-navpanel.open{overflow:visible}' +
             '\n}';
    }
    /* Reglages propres au sous-menu (volet « Comment ca marche ») */
    var sousFond = suit && palette ? plusFonce(palette) : m.sousFond;
    var sousTexte = suit && palette ? plusClair(palette) : m.sousTexte;
    if (sousFond) css += '\n.qz-navpanel .qz-sublist{background:' + sousFond + '}';
    if (sousTexte) css += '\n.qz-navpanel .qz-sublist a{color:' + sousTexte + '}';
    if (m.sousDisposition === 'horizontale') {
      css += '\n.qz-navpanel .qz-sublist{flex-direction:row;flex-wrap:wrap;gap:14px;padding-left:16px;padding-right:16px}' +
             '\n.qz-navpanel .qz-sublist li{width:auto}';
    } else if (m.sousDisposition === 'verticale') {
      css += '\n.qz-navpanel .qz-sublist{flex-direction:column;gap:0;padding-left:22px;padding-right:22px}';
    }
    if (m.sousAlignement) {
      var alignFlex = { gauche: 'flex-start', centre: 'center', droite: 'flex-end' }[m.sousAlignement] || 'center';
      var alignTexte = { gauche: 'left', centre: 'center', droite: 'right' }[m.sousAlignement] || 'center';
      css += '\n.qz-navpanel .qz-sublist{justify-content:' + alignFlex + ';align-items:' + alignFlex + ';text-align:' + alignTexte + '}';
    }
    if (!css) return;
    injecterStyle('qz-menu-nav-style', css);
  }

  function zoneVersCss(zone, decalage) {
    var d = (typeof decalage === 'number' ? decalage : 0) + 'px';
    var parts = zone === 'centre' ? ['centre', 'centre'] : zone.split('-');
    var vert = parts[0], horiz = parts[1];
    var left, right, tX;
    if (horiz === 'gauche') { left = d; right = 'auto'; tX = ''; }
    else if (horiz === 'droite') { left = 'auto'; right = d; tX = ''; }
    else { left = '50%'; right = 'auto'; tX = 'translateX(-50%)'; }
    var top, bottom, tY;
    if (vert === 'bas') { top = 'auto'; bottom = d; tY = ''; }
    else if (vert === 'centre') { top = '50%'; bottom = 'auto'; tY = 'translateY(-50%)'; }
    else { top = d; bottom = 'auto'; tY = ''; }
    return {
      left: left, right: right, top: top, bottom: bottom,
      transform: (tX + ' ' + tY).trim() || 'none',
      alignItems: horiz === 'gauche' ? 'flex-start' : horiz === 'droite' ? 'flex-end' : 'center',
      textAlign: horiz === 'gauche' ? 'left' : horiz === 'droite' ? 'right' : 'center'
    };
  }

  function appliquerHeroBaseline(hb, palette, suit) {
    if (!hb) return;
    var css = '';
    var couleur = suit && palette ? plusClair(palette) : hb.couleur;
    if (hb.taille) css += '\n.h-line.l1,.h-line.l2,.h-line.l3{font-size:' + hb.taille + 'px}';
    if (couleur) css += '\n.h-line.l1,.h-line.l2,.h-line.l3{color:' + couleur + '}';
    if (hb.police === 'titres') css += '\n.h-line.l1,.h-line.l2,.h-line.l3{font-family:\'Quicksand\',sans-serif}';
    else if (hb.police === 'texte') css += '\n.h-line.l1,.h-line.l2,.h-line.l3{font-family:\'Karla\',sans-serif}';
    if (hb.zone) {
      var z = zoneVersCss(hb.zone, hb.decalage);
      css += '\n.hero-copy{left:' + z.left + ';right:' + z.right + ';top:' + z.top + ';bottom:' + z.bottom +
        ';transform:' + z.transform + ';align-items:' + z.alignItems + ';text-align:' + z.textAlign + '}';
    }
    [['ligne1', 'l1'], ['ligne2', 'l2'], ['ligne3', 'l3']].forEach(function (paire) {
      if (typeof hb[paire[0]] !== 'string') return;
      var el = document.querySelector('.h-line.' + paire[1]);
      if (!el) return;
      if (hb[paire[0]]) { el.textContent = hb[paire[0]]; el.style.display = ''; }
      else { el.style.display = 'none'; }
    });
    if (!css) return;
    injecterStyle('qz-hero-baseline-style', css);
  }

  function appliquerHeroChangez(hc, palette, suit) {
    if (!hc) return;
    var css = '';
    var couleur = suit && palette ? plusClair(palette) : hc.couleur;
    if (hc.taille) css += '\n.h-line.l4{font-size:' + hc.taille + 'px}';
    if (couleur) css += '\n.h-line.l4{color:' + couleur + '}';
    if (hc.police === 'titres') css += '\n.h-line.l4{font-family:\'Quicksand\',sans-serif}';
    else if (hc.police === 'texte') css += '\n.h-line.l4{font-family:\'Karla\',sans-serif}';
    if (hc.zone) {
      var z = zoneVersCss(hc.zone, hc.decalage);
      css += '\n.h-line.l4{left:' + z.left + ';right:' + z.right + ';top:' + z.top + ';bottom:' + z.bottom +
        ';transform:' + z.transform + ';text-align:' + z.textAlign + '}';
    }
    if (!css) return;
    injecterStyle('qz-hero-changez-style', css);
  }

  function appliquerLogo(cfg) {
    if (!cfg || !cfg.url) return;
    var row = document.getElementById('qzLogoRow');
    var img = document.getElementById('qzLogoPerso');
    if (!row || !img) return;
    img.src = cfg.url;
    if (cfg.hauteur) img.style.maxHeight = cfg.hauteur + 'px';
    if (cfg.largeur) img.style.maxWidth = cfg.largeur + 'px';
    img.classList.remove('qz-logo-anim-fondu', 'qz-logo-anim-glisse');
    var anim = { fondu: 'qz-logo-anim-fondu', glisse: 'qz-logo-anim-glisse' }[cfg.animation];
    if (anim) img.classList.add(anim);
    row.classList.add('perso-actif');
  }

  function appliquerReassurance(r, palette, suit) {
    if (!r || !r.actif) return;
    var items = [r.item1, r.item2, r.item3].filter(Boolean);
    if (!items.length) return;
    var ancre = document.querySelector('.ticker') || document.querySelector('.qz-header');
    if (!ancre) return;
    var fond = suit && palette ? palette.fond : (r.couleur || '#F2EEDF');
    var texte = suit && palette ? palette.texte : (r.texte_couleur || '#2b353e');
    injecterStyle('qz-reassurance-style', [
      '.qz-reassurance{width:100%;background:' + fond + ';color:' + texte + ';padding:10px 16px;',
      'display:flex;flex-wrap:wrap;justify-content:center;gap:8px 28px;font-size:12px;font-weight:700;',
      'letter-spacing:.04em;text-align:center;box-sizing:border-box}',
      '.qz-reassurance span{white-space:nowrap}',
      '@media (max-width:640px){.qz-reassurance{gap:6px 16px;font-size:11px}}'
    ].join('\n'));
    var bar = document.createElement('div');
    bar.className = 'qz-reassurance';
    items.forEach(function (t) {
      var s = document.createElement('span');
      s.textContent = t;
      bar.appendChild(s);
    });
    ancre.insertAdjacentElement('afterend', bar);
  }

  var CLE_POPUP_VUE = 'quadretiPopupVue';

  function appliquerPopup(p, palette, suit) {
    if (!p || !p.actif) return;
    if (!p.titre && !p.texte) return; /* rien à montrer */
    var apercu = /[?&]apercu_popup=1\b/.test(location.search);
    if (!apercu) {
      try { if (localStorage.getItem(CLE_POPUP_VUE)) return; } catch (e) {}
    }

    var fond = suit && palette ? palette.fond : (p.fond || '#F2EEDF');
    var texte = suit && palette ? palette.texte : (p.texte_couleur || '#2b353e');
    var bouton = suit && palette ? palette.accent : (p.bouton || '#e2725b');

    injecterStyle('qz-popup-style', [
      '.qz-popup-fond{position:fixed;inset:0;background:#000000a6;z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .25s ease;pointer-events:none}',
      '.qz-popup-fond.qz-on{opacity:1;pointer-events:auto}',
      '.qz-popup-carte{position:relative;max-width:420px;width:100%;background:' + fond + ';color:' + texte + ';border-radius:16px;padding:28px 26px 26px;box-shadow:0 20px 50px #00000055;transform:translateY(12px);transition:transform .25s ease;font-family:\'Karla\',sans-serif}',
      '.qz-popup-fond.qz-on .qz-popup-carte{transform:translateY(0)}',
      '.qz-popup-fermer{position:absolute;top:6px;right:6px;width:44px;height:44px;border-radius:50%;border:none;background:#00000014;color:' + texte + ';font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center}',
      '.qz-popup-fermer:hover{background:#00000028}',
      '.qz-popup-img{width:100%;max-height:160px;object-fit:cover;border-radius:10px;margin-bottom:14px}',
      '.qz-popup-titre{font-family:\'Quicksand\',sans-serif;font-weight:700;font-size:19px;margin:0 0 8px}',
      '.qz-popup-texte{font-size:13.5px;line-height:1.5;margin:0 0 16px;opacity:.92}',
      '.qz-popup-form{display:flex;gap:8px;flex-wrap:wrap}',
      '.qz-popup-form input[type=email]{flex:1;min-width:160px;padding:10px 12px;border-radius:9px;border:1px solid #00000022;font:inherit;font-size:13.5px}',
      '.qz-popup-form button{background:' + bouton + ';color:#fff;border:none;border-radius:9px;padding:10px 16px;font-weight:700;font-size:13px;cursor:pointer;white-space:nowrap}',
      '.qz-popup-form button:hover{filter:brightness(.92)}',
      '.qz-popup-merci{font-size:13.5px;font-weight:600;display:none}',
      '.qz-popup-fond.qz-envoye .qz-popup-form{display:none}',
      '.qz-popup-fond.qz-envoye .qz-popup-merci{display:block}'
    ].join('\n'));

    var fond_el = document.createElement('div');
    fond_el.className = 'qz-popup-fond';
    fond_el.innerHTML =
      '<div class="qz-popup-carte">' +
        '<button class="qz-popup-fermer" aria-label="Fermer" type="button">&times;</button>' +
        (p.image ? '<img class="qz-popup-img" src="' + p.image + '" alt="">' : '') +
        (p.titre ? '<p class="qz-popup-titre"></p>' : '') +
        (p.texte ? '<p class="qz-popup-texte"></p>' : '') +
        '<form class="qz-popup-form">' +
          '<input type="email" required placeholder="Votre email">' +
          '<button type="submit">' + (p.bouton_texte || 'Je m’inscris') + '</button>' +
        '</form>' +
        '<p class="qz-popup-merci">Merci ! C’est enregistré.</p>' +
      '</div>';
    if (p.titre) fond_el.querySelector('.qz-popup-titre').textContent = p.titre;
    if (p.texte) fond_el.querySelector('.qz-popup-texte').textContent = p.texte;
    document.body.appendChild(fond_el);

    function fermer() {
      fond_el.classList.remove('qz-on');
      try { localStorage.setItem(CLE_POPUP_VUE, '1'); } catch (e) {}
      setTimeout(function () { fond_el.remove(); }, 300);
    }
    fond_el.querySelector('.qz-popup-fermer').addEventListener('click', fermer);
    fond_el.addEventListener('click', function (e) { if (e.target === fond_el) fermer(); });
    fond_el.querySelector('.qz-popup-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var email = fond_el.querySelector('input[type=email]').value.trim();
      var btn = fond_el.querySelector('button[type=submit]');
      btn.disabled = true;
      fetch(SB_URL + '/rest/v1/abonnes_popup', {
        method: 'POST',
        headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ email: email })
      }).then(function () {
        fond_el.classList.add('qz-envoye');
        try { localStorage.setItem(CLE_POPUP_VUE, '1'); } catch (e) {}
        setTimeout(fermer, 2200);
      }).catch(function () { btn.disabled = false; });
    });

    /* Declenchement : au centre de l'ecran (souris) si l'utilisateur y passe avant,
       sinon apres le delai regle au panneau (filet de securite, utile aussi sur
       mobile ou il n'y a pas de souris). */
    var declenche = false;
    function ouvrirPopup() {
      if (declenche) return;
      declenche = true;
      fond_el.classList.add('qz-on');
    }
    var minuteurPopup = setTimeout(ouvrirPopup, apercu ? 300 : (p.delai || 4) * 1000);
    if (!apercu) {
      document.addEventListener('mousemove', function verifCentre(e) {
        var xPct = e.clientX / window.innerWidth;
        var yPct = e.clientY / window.innerHeight;
        if (xPct > 0.35 && xPct < 0.65 && yPct > 0.35 && yPct < 0.65) {
          document.removeEventListener('mousemove', verifCentre);
          clearTimeout(minuteurPopup);
          ouvrirPopup();
        }
      });
    }
  }

  /* Applique tout sauf les widgets qui créent des éléments à chaque appel
     (popup, bulle de contact, réassurance) — ceux-là ne doivent s'exécuter
     qu'une fois, sur la réponse réseau, jamais depuis le cache (sinon doublon
     visuel : deux bulles, deux bandeaux de réassurance...). */
  function appliquerTout(g) {
    var c = g.couleurs || {};
    var sec = c.sections || {};
    var palette = appliquerCouleurs(c);
    appliquerCouleursJeux(g.couleurs_jeux);
    appliquerMenuNav(g.menu_nav, palette, sec.bandeau !== false);
    appliquerMenuLiens(g.menu_liens);
    appliquerHeroBaseline(g.hero_baseline, palette, sec.accueil !== false);
    appliquerHeroChangez(g.hero_changez, palette, sec.accueil !== false);
    appliquerPolices(g.polices);
    appliquerBaselines(g.baselines);
    appliquerReseaux(g.reseaux);
    appliquerReseauxListe(g.reseaux_liste);
    appliquerCopyright(g.copyright);
    appliquerSections(g.sections_accueil);
    appliquerSections(g.sections_guides);
    appliquerOrdreSections(g.sections_ordre);
    appliquerVisibiliteSections(g.sections_visibilite);
    appliquerStylesSections(g.styles_sections);
    appliquerPageContact(g.page_contact);
    appliquerPageColoriages(g.page_coloriages);
    appliquerBandeauVideo(g.bandeau_video);
    appliquerTessellesFond(g.tesselles_fond);
    appliquerImages(g.images);
    appliquerBoutons(g.boutons);
    appliquerPhotos(g.photos_diaporama);
    appliquerBandeau(g.bandeau);
    appliquerDisposition(g.disposition);
    appliquerSeo(g.seo);
    appliquerLogo(g.logo_perso);
    return { palette: palette, suitWidgets: sec.widgets !== false };
  }

  /* Anti-flash : réapplique immédiatement la dernière config connue (cache
     local), avant même la réponse réseau, pour éviter que les couleurs/textes
     d'origine du code apparaissent brièvement le temps du fetch. */
  var CLE_CACHE = 'quadretiReglagesCache';
  try {
    var enCache = localStorage.getItem(CLE_CACHE);
    if (enCache) appliquerTout(JSON.parse(enCache));
  } catch (e) {}

  var ctl = ('AbortController' in window) ? new AbortController() : null;
  var minuteur = setTimeout(function () { if (ctl) ctl.abort(); }, 3000);
  /* Aperçu en direct (panneau V2) : quand cette page tourne dans l'iframe du panneau
     avec ?apercu_panneau=1, elle écoute des correctifs postMessage {cle, valeur} —
     brouillons non enregistrés — les fusionne dans les derniers réglages connus et
     réapplique tout. Aucun effet sur le site public normal (le flag n'y est jamais présent). */
  var estApercuPanneau = false;
  try { estApercuPanneau = window.self !== window.top && /[?&]apercu_panneau=1\b/.test(location.search); } catch (e) {}
  var derniersReglages = null;

  function reappliquerTout() {
    var etat = appliquerTout(derniersReglages);
    appliquerPopup(derniersReglages.popup, etat.palette, etat.suitWidgets);
    appliquerBulleContact(derniersReglages.bulle_contact, derniersReglages.reseaux);
    appliquerReassurance(derniersReglages.reassurance, etat.palette, etat.suitWidgets);
  }

  if (estApercuPanneau) {
    window.addEventListener('message', function (ev) {
      if (ev.origin !== location.origin || !ev.data || ev.data.type !== 'qz-apercu-patch' || !derniersReglages) return;
      derniersReglages = Object.assign({}, derniersReglages);
      derniersReglages[ev.data.cle] = ev.data.valeur;
      reappliquerTout();
    });
  }

  fetch(SB_URL + '/rest/v1/reglages_site?select=cle,valeur', {
    headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY },
    signal: ctl ? ctl.signal : undefined
  }).then(function (r) { return r.ok ? r.json() : []; })
    .then(function (lignes) {
      var g = {};
      (lignes || []).forEach(function (l) { g[l.cle] = l.valeur; });
      derniersReglages = g;
      var etat = appliquerTout(g);
      appliquerPopup(g.popup, etat.palette, etat.suitWidgets);
      appliquerBulleContact(g.bulle_contact, g.reseaux);
      appliquerReassurance(g.reassurance, etat.palette, etat.suitWidgets);
      try { localStorage.setItem(CLE_CACHE, JSON.stringify(g)); } catch (e) {}
      if (estApercuPanneau) { try { window.parent.postMessage({ type: 'qz-apercu-pret' }, location.origin); } catch (e) {} }
    })
    .catch(function () { /* hors ligne ou lent : la page garde ses valeurs en dur (ou celles du cache appliquees juste avant) */ })
    .then(function () { clearTimeout(minuteur); });
})();
