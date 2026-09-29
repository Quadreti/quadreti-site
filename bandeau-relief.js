/* QuadretI — bandeau d'accueil "carreaux 7x7 en relief" (10/09/2026). Construit le mur dans #qbBandeau, calcule la
   découpe des visuels et les keyframes des cycles, puis lance la séquence (CSS pur). Réglages = ceux exportés par le fondateur le 10/09 (bloc « Code à reprendre ») depuis
   SITE\POLICE PROPRIETAIRE\bandeau-relief-outil.html (réglages par défaut). Pour changer un réglage : REGLAGES ci-dessous. */
(function () {
  'use strict';
  var REGLAGES = {
    cx: 4, cy: 2, ecart: 0, grilleFixe: true, disposition: 'droite', /* 11/09 fondateur : 4x2 pour occuper la largeur a hauteur egale (le mur est plafonne en hauteur pour tenir sur un 14 pouces) */ /* 'droite' = textes + bouton a gauche, mur a droite ; 'colonne' = textes au-dessus/dessous */ mobile: { max: 640, cx: 2, cy: 2 }, /* carreaux en largeur / hauteur, écart entre carreaux (cqw) */
    /* 12/09 soir, fondateur : sequence logique de 13 photos (photo site 1, n° 1 a 13, recadrees en 2:1 = 1200x600) : etuis, feuilles, imprimante, mains (etui, tesselle), grille vide, coeur, clipsage, coeur en biais, salon. */
    /* 20/09, fondateur : les visuels arrivent DEJA DECOUPES a la forme du bandeau. Il les a
       montes lui-meme dans l outil de masque, a partir de son trace Silhouette (BANDEAU.svg) :
       3075 x 900 px, rapport 3,4167, les deux entailles remplies en navy #1e2b35 — la couleur de
       fond de la page, donc elles s y fondent. Servies en JPEG 2200 px (1,0 Mo pour les treize).
       ⚠️ LE SITE NE DOIT PLUS DESSINER LA MARCHE : voir le bloc de l accueil dans index.html.
       Treize et non dix-sept : les quatre dernieres n ont pas ete montees. */
    visuels: [
      '/img/bandeau-hero-01.webp', '/img/bandeau-hero-02.webp', '/img/bandeau-hero-03.webp',
      '/img/bandeau-hero-04.webp', '/img/bandeau-hero-05.webp', '/img/bandeau-hero-06.webp',
      '/img/bandeau-hero-07.webp', '/img/bandeau-hero-08.webp', '/img/bandeau-hero-09.webp',
      '/img/bandeau-hero-10.webp', '/img/bandeau-hero-11.webp', '/img/bandeau-hero-12.webp',
      '/img/bandeau-hero-13.webp'
    ], ancrage: 'centre',
    /* 13/09 fondateur : le mur devient un diaporama en fondu des visuels ci-dessus (une photo a la fois, format d origine). duree = tenue de chaque photo (s),
       fondu = duree du fondu (s), tenueFin = tenue supplementaire de la derniere photo avant de reboucler. actif: false = mur en tesselles comme avant. */
    /* 28/09, fondateur : LA BANNIERE EST LE MUR. vivant.actif = true remplace le diaporama par un mur 7×7 interactif (maquette
       SITE\DESIGN SYSTEME\mockup-banniere-mur-vivant.html) : au repos il vit tout seul (une case change de teinte, une photo se pose et se
       decoupe), au premier geste il devient celui du visiteur — clic = couleur suivante, photo deposee = decoupee en 2×2 ou 3×3. actif: false = diaporama. */
    vivant: { actif: true, N: 7, pasCouleur: 900, pasPhoto: 6000, tailles: [1, 7],
      /* 28/09 soir, fondateur : SALON, MUR DE CARREAUX (bureau seulement ; téléphone : mur démo inchangé). Au repos, un mur de carreaux JOINTIFS
         au-dessus du canapé, à l échelle, qui porte une image (portrait 21 x 21 cases = mur x9) ; une tesselle se déclipse toutes les « rythme » ms,
         sur un carreau différent. La survoler, ou cliquer un carreau : CE carreau vient au premier plan, à la place du mur démo, avec les mêmes outils.
         « Au mur » (le bouton salon) le remet en place, tesselle par tesselle. Joints du produit : 1 mm entre tesselles, 2 mm entre carreaux,
         dessinés au pixel entier. Repères de la photo mesurés sur salon-navy-3000.webp (3000 x 1700). actif: false = mur démo d avant. */
      salonMur: { actif: true, carreaux: [3, 3], image: '/img/mur-demo-couple.webp', cadrageY: .5, /* 29/09 : couple fictif (IA) en image cible */
        modes: ['pixel', 'photo', 'mosaique'], pasMode: 4200, /* démo fixe : croissance dans le 1er mode, puis les suivants */
        souvenirs: [{ src: '/img/mur-demo-souvenirs.webp?v=3', cote: 64, colonnes: 12, nombre: 174 }], /* planches de petites photos pour la Mosaïque (ajouter des planches ici) */
        mosaique: { teinte: .78, voile: .28, division: 3 },
        loupe: { image: '/img/loupe-main.webp?v=1', l: 870, h: 596, verre: [18.6, 15.6, 252, 238.8], sortieBas: 739.8, bras: true, vitesse: 1.6, rangees: [.32, .5, .68], reprise: 4000, cycles: 1,
          montage: { apres: 1, pas: 1800, fondu: 350, etapes: [ /* 29/09 : RENDUS = 11, 8, 9, 1, 2, 10 (jamais légendés « en vrai ») ; vraies photos du fondateur = 3 à 7 (sources : SITE\\PHOTO\\montage tesselle) */
            ['/img/montage/montage-11.webp', 'On compose son carreau'], ['/img/montage/montage-8.webp', 'Des planches pr\u00e9d\u00e9coup\u00e9es'], ['/img/montage/montage-9.webp', 'On imprime ses visuels'],
            ['/img/montage/montage-1.webp', '3 couches : coque, visuel, support'], ['/img/montage/montage-2.webp', 'La coque se plie'], ['/img/montage/montage-3.webp', 'On glisse son visuel'],
            ['/img/montage/montage-4.webp', 'On ajoute le support'], ['/img/montage/montage-5.webp', 'On referme'], ['/img/montage/montage-6.webp', 'Une tesselle, pr\u00eate'],
            ['/img/montage/montage-10.webp', 'Le carreau re\u00e7oit ses tesselles'], ['/img/montage/montage-7.webp', 'Elle se clipse au mur'] ] }, verrePx: 180, tesselle: .5, fondMur: '#1B2731' }, /* 29/09 : la loupe du fondateur, tenue par une main ; cycles = nombre de tours (montage puis une rangée) joués seuls avant que la loupe se range (0 = sans fin), montage = les étapes montrées dans le verre après « apres » rangées (pas = ms par étape), rangees = hauteurs balayées (part du mur), reprise = ms avant qu elle reprenne après la souris ; verre = la découpe dans l image (px) ; verrePx = largeur du verre à l écran (au moins) ; tesselle = part du verre occupée par la tesselle visée ; bras : le bras sort par le bord droit de l écran, jamais coupé dans le bandeau (sortieBas = où il touche le bas de l image) ; loupe sans main : '/img/loupe-bois.webp?v=2', l 822, h 595, verre [24.6, 28.2, 391.2, 363] */ /* division : souvenirs par tesselle en largeur et en hauteur (1, 2 ou 3) */ /* double lecture : part de la couleur du couple posée sur chaque souvenir (teinte), puis voile pour la luminosité */ croissance: [[1, 1, 'collage'], [2, 2, 'photo'], [3, 3, 'mosaique']], dureeCamera: 1400, /* 29/09 : une 4e valeur (ex. [1, 1, 'collage', 2.6]) donne un zoom de caméra autour du mur à cette étape, avec un recul de dureeCamera ms avant l agrandissement suivant — RETIRÉ le soir même par le fondateur (« trop brutal, ça bouffe du temps »), le mécanisme reste */ pasCroissance: 3000, /* 29/09 : 4,2 -> 3 s, pour que la loupe et son montage arrivent plus tôt */ /* 29/09 : une taille, un usage — [colonnes, rangées, contenu] */
        collage: { mot: 'NOUS', fonds: ['#D96C2F', '#E07A3C', '#E8925A', '#F0AC7C', '#F6C6A1', '#FADCC4'], fondFleche: '#FADCC4', /* 29/09, fondateur : « pas navy, des teintes d oranges » -- fonds des cases d icônes, du orange de marque au pêche clair */ icones: { planche: '/img/mur-demo-icones.webp?v=1', cote: 96, colonnes: 12, fleche: 2, coeur: 36, coeurs: [53, 90], /* 29/09, fondateur : « les cœurs, pas 3 fois les mêmes » -- deux cœurs différents autour du mot, aucun doublon dans la sélection */
          choix: [38, 1, 41, 12, 39, 20, 44, 26, 46, 18, 47, 13, 48, 7, 51, 25, 57, 16, 59, 32, 62, 6, 63, 19, 40, 0, 54, 17, 56, 29, 37, 3] } }, /* icônes du fondateur (3 planches, détourées) : flèche, cœur, et la sélection d amour et de voyage posée entre les souvenirs */ /* 1 carreau : le mot (7 lettres au plus, sans accent) ; icones : { coeur: '/img/…', fleche: '/img/…' } (fondateur, à venir) — vide = icônes provisoires dessinées */ resolution: 2, /* résolution par tesselle (comme le Designer) : chaque tesselle imprimée porte r x r couleurs ; 1 = une couleur unie */ /* 28/09 soir, fondateur : l image remplit tout le mur, recalculée au nombre de tesselles ; à l arrivée le mur grandit (croissance), puis la tesselle qui bouge prend le relais */ rythme: 2000, canapeCm: 220, auDessusCm: 25, zoom: 1.04, /* 29/09, fondateur : « légèrement zoomé pour agrandir » — à 1536 x 704, 1,04 fait passer la tesselle de 12 à 13 px (mur 255 -> 276 px) ; 1,06 donnerait le même mur avec moins de marge */
        photo: { w: 3000, h: 1700, cx0: 567, cx1: 2508, dossier: 918, pied: 1440 } /* repères remesurés sur salon-navy-lampe-3000.webp (28/09 soir) */ } }, /* 28/09 soir, fondateur : une photo = UNE CASE ou LE CARREAU ENTIER, rien entre les deux */
    diaporama: { actif: true, duree: 2, fondu: .8, tenueFin: 58,
      /* 13/09 fondateur : duree PAR PHOTO, pour les seules photos qui en ont besoin. Les cinq du parcours numerique sont quasi
         identiques -- meme piece, meme personne, meme bureau ; seul l ecran change, et il est petit dans le cadre. L oeil doit le
         trouver, lire une interface miniature, comprendre l etape : ca ne se fait pas en 2 s. Les photos produit, tres contrastees
         entre elles, se lisent d un coup d oeil et gardent la duree generale ci-dessus. */
      /* 20/09 : on garde 4 s sur les quatre premieres, les ecrans de l app — elles se ressemblent
         et l oeil doit trouver ce qui a change dans l interface. Les autres gardent la duree generale. */
      dureeParPhoto: {
        '/img/bandeau-hero-01.webp': 4, '/img/bandeau-hero-02.webp': 4,
        '/img/bandeau-hero-03.webp': 4, '/img/bandeau-hero-04.webp': 4
      } }, /* 13/09 fondateur : 2 s par photo (divise par 2), fondu .8 s ; la derniere photo (le salon) reste 60 s en tout (2 + 58) avant de reboucler */
    couleurs: { fond: '#1e2b35', cadre: '#1e2f45', creux: '#2b3e54', couleur1: 'var(--qz-terracotta,#d96c2f)', couleur2: '#dedede', titre: '#dedede' /* 12/09 fondateur : textes du bandeau navy en gris clair #dedede (comme la barre) */ },
    lum: .28, ombre: .6, grain: .08, relief: 4, txtRelief: 1,
    depart: 0, dg: .2, pause: .5, ordre: 'quatre', pace: .12, A: .9, H: 2, Rt: 1.3, E: 2.3, lat: 75,
    zoom: { actif: false, x: 0, y: 0, facteur: 1, aller: 1.8, tenue: 1.3 },
    textes: { l1: 'Composez.', l2: 'Imprimez.', l3: 'Clipsez.', l4: 'Changez a volonte', l4Lu: 'Changez à volonté.', /* 28/09 soir, fondateur : titre en Quadreti Modulaire comme la maquette ; la police n a pas d accents -> texte affiché sans accents, texte lu (lecteurs d écran) avec */ dispo: 'ligne', police1: 'Jura', taille1: 3, police2: 'Jura', taille2: 3, ecartT: .9, quand: 'ouverture', position: 'haut-bas', mode: 'aucun', /* 12/09 : 'clip' pour retrouver le clipsage lettre par lettre */ ln: .3, dn: .1,
      /* 11/09, disposition 'droite' (reference Pixel Corner) : accroche en capitales (baseline 1), gros titre (baseline 2), paragraphe, deux boutons */
      accroche: 1.15, titre: 4.6, /* tailles en cqw (bornees en px dans le CSS) */
      /* 18/09, fondateur : la deuxieme phrase retiree (« Imprimez, clipsez, changez de decor quand vous voulez. »).
         Elle disait ce que les quatre gestes montrent juste en dessous. Ce texte vient du CODE, pas du panneau. */
      para: 'Un seul support, mille créations possibles.',
      cta2: { texte: 'Galerie', href: '/boutique/' } /* 11/09 soir : libelle Galerie (fondateur) ; pas encore de page galerie, le lien va a la boutique en attendant */ },
    /* 11/09 soir, fondateur : sequence generale de la page (en secondes) -- logo > naming > categorie > accroche > menu > titre > paragraphe > boutons > mur > icones.
       pas = intervalle entre deux tesselles du Q ; naming / cat / accroche / titre = intervalle entre deux lettres ; menu / icones = intervalle entre deux elements ;
       pause = respiration entre deux etapes ; pauseFin = tenue supplementaire du DERNIER visuel du mur avant de reboucler. */
    /* 12/09 fondateur : essai d une photo en arriere-plan du bandeau (IMAGE.png -> img/bandeau-fond-salon.jpg, 1920 px). Voile navy plus fort a gauche
       (lisibilite des textes) que sur le mur. image: null = fond navy uni. */
    fond: { image: '/img/salon-navy-lampe-3000.webp', /* 28/09 soir, fondateur : lampe tournée de 10° vers le mur (salon_lampe_plus_10deg_3000x1700) */ voileGauche: 0, voileDroite: 0, position: 'center' }, /* 28/09 soir : salon navy aux coussins orange (fondateur, 3000 px) ; en mode salonMur la taille et la position sont posées par le script */ /* 28/09 soir, fondateur : « nouvelle image salon grand format, cadeau » -- salon au MUR BLEU, mur vide, 1836 x 857 (rapport 2,142, le bandeau fait 2,160 : 1 % de recadrage). Voiles a 0 (retires sur demande). La composition se pose sur le mur, centree au-dessus du canape : centre (50,2 % ; 36,8 %), cote 14,65 % de la largeur (la taille du carreau de l ancienne photo, validee), entre le bas de l onglet (14 %) et le dossier du canape (59,5 %, mesure). */ /* 28/09 soir, fondateur : « recupere image salon sans cadre… celle qui avait les decroches… je l ai faite pour que le salon soit cadre correctement » — c est img/bandeau-hero-13.webp, le salon du diaporama (2000 x 926, LE RAPPORT EXACT DU BANDEAU, aspect-ratio 2000/926 dans index.html), dont le carreau a ete efface dans le navigateur (grain du mur repris a gauche et a droite, luminosite raccordee aux quatre bords). Cover = ajustement pile, decroches compris. La composition se pose a la place exacte de l ancien carreau : centre (49,63 % ; 28,56 %), cote 14,65 % de la largeur. */ /* 12/09 : essai abandonne (navy uni). 28/09 soir, fondateur : LE SALON REVIENT, « en bandeau derriere le mur interactif » — voile fort a gauche (texte), presque nul a droite ; position 55 % pour que le haut du canape reste visible en bas. La position verticale sert aussi au calcul de la place du carreau (poserSalon). */
    /* 12/09 fondateur : toutes les animations retirees sauf le visuel du mur -> actif: false (logo, textes, menu, icones fixes ; remettre true pour la sequence) */
    /* 12/09 : bords du bandeau dessines par le fondateur (BORD 1-2-3.svg). Lisere le long du bord libre en option : actif, couleur ('accent' = orange du panneau, ou un code), epaisseur en px. */
    bords: { lisere: { actif: true, couleur: 'accent', epaisseur: 3, reflet: { actif: false, mode: 'changement', duree: 7, voyage: 2.2, longueur: 6, decalage: .35, couleur: 'rgba(255,255,255,.75)' }, trace: { actif: false, duree: 1.4, decalage: .35 } } }, /* 12/09 fondateur : lisere fixe, pistes A/B/D testees puis coupees (actif:false), reglages conserves */ /* reflet.mode : 'boucle' (piste B, cycle = duree) ou 'changement' (piste D, un eclat a chaque changement de visuel, voyage en s) ; trace (piste A) : la ligne se dessine au chargement, duree et decalage entre bords en s */ /* reflet (12/09, piste B) : un eclat parcourt la ligne, cycle en s, tiret en % de la ligne, decalage entre bords en s */ /* 12/09 : essai lisere orange (fondateur), epaissi a 3 px */
    sequence: { actif: true, portee: 'logo', /* 'logo' = seules les animations du bloc logo (tesselles, categorie qui sort, naming, accroche) ; 'tout' = sequence complete */ depart: .4, pas: .15, naming: .1, cat: .04, accroche: .07, menu: .12, titre: .07, pause: .25, icones: .25, pauseFin: 60,
      vie: 8, vieDuree: 1.6, vieSouleve: 1.3 /* pendant la pause finale : une tesselle se declipse / reclipse toutes les `vie` s (duree du geste, facteur de soulevement) */ }
  };
  var CASES = 7;
  /* ---- bords dessines par le fondateur (BORD 1-2-3.svg, decoupes par le fil : forme fermee = fond, ligne du bord libre = lisere).
     Unites mm, viewBox etire en largeur et en hauteur ; trait d epaisseur fixe en px (vector-effect), couleur et epaisseur par variables CSS. ---- */
  var BORDS = {"haut":{"vb":[18.00000188403,149.4999095560001,479.99981791596997,34.99999600000001],"fond":"M18 159.5 L498 159.5 L498 170.19 L182.68 170.19 Q181.96 170.19 181.26 170.25 Q180.63 170.3 179.92 170.42 Q179.27 170.53 178.64 170.69 Q177.92 170.88 177.29 171.1 Q176.55 171.36 175.94 171.63 Q175.21 171.97 174.57 172.33 Q173.96 172.68 173.35 173.1 Q172.67 173.58 172.09 174.08 Q171.52 174.56 170.99 175.12 L164.38 181.97 Q164.16 182.21 163.94 182.39 Q163.64 182.64 163.28 182.9 Q162.97 183.11 162.64 183.3 Q162.28 183.5 161.86 183.7 Q161.52 183.85 161.07 184.01 Q160.72 184.13 160.28 184.25 Q159.91 184.34 159.51 184.41 Q159.15 184.47 158.82 184.5 L18 184.5 L18 159.5 L18 159.5 Z","extra":"M18 149.5 H498 V159.7 H18 Z","trait":"M18 184.5 L158.82 184.5 Q159.15 184.47 159.51 184.41 Q159.91 184.34 160.28 184.25 Q160.72 184.13 161.07 184.01 Q161.52 183.85 161.86 183.7 Q162.28 183.5 162.64 183.3 Q162.97 183.11 163.28 182.9 Q163.64 182.64 163.94 182.39 Q164.16 182.21 164.38 181.97 L170.99 175.12 Q171.52 174.56 172.09 174.08 Q172.67 173.58 173.35 173.1 Q173.96 172.68 174.57 172.33 Q175.21 171.97 175.94 171.63 Q176.55 171.36 177.29 171.1 Q177.92 170.88 178.64 170.69 Q179.27 170.53 179.92 170.42 Q180.63 170.3 181.26 170.25 Q181.96 170.19 182.68 170.19 L498 170.19"},"bas":{"vb":[3.5999979999999923,165.16999399999995,479.999,8.33],"fond":"M3.6 159.5 L483.6 159.5 L483.6 173.5 L224.77 173.5 L224.72 173.5 Q224.42 173.48 224.09 173.45 Q223.69 173.42 223.33 173.37 Q222.88 173.31 222.55 173.25 Q222.08 173.17 221.76 173.09 Q221.32 172.99 220.96 172.88 Q220.64 172.79 220.33 172.68 Q219.96 172.55 219.65 172.42 Q219.44 172.33 219.21 172.2 L212.63 168.7 Q212.08 168.41 211.52 168.16 Q210.93 167.91 210.24 167.66 Q209.64 167.45 209.03 167.27 Q208.39 167.08 207.65 166.91 Q207.04 166.77 206.3 166.63 Q205.68 166.52 204.96 166.43 Q204.33 166.35 203.68 166.29 Q202.97 166.23 202.35 166.2 Q201.64 166.17 200.92 166.17 L3.6 166.17 L3.6 159.5 L3.6 159.5 Z","extra":"","trait":"M3.6 166.17 L200.92 166.17 Q201.64 166.17 202.35 166.2 Q202.97 166.23 203.68 166.29 Q204.33 166.35 204.96 166.43 Q205.68 166.52 206.3 166.63 Q207.04 166.77 207.65 166.91 Q208.39 167.08 209.03 167.27 Q209.64 167.45 210.24 167.66 Q210.93 167.91 211.52 168.16 Q212.08 168.41 212.63 168.7 L219.21 172.2 Q219.44 172.33 219.65 172.42 Q219.96 172.55 220.33 172.68 Q220.64 172.79 220.96 172.88 Q221.32 172.99 221.76 173.09 Q222.08 173.17 222.55 173.25 Q222.88 173.31 223.33 173.37 Q223.69 173.42 224.09 173.45 Q224.42 173.48 224.72 173.5 L224.77 173.5 L483.6 173.5"},"defile":{"vb":[6.3501,6.3468,259.9963,6.9229],"fond":"M 266.3459 6.346802 L 96.87996 6.346802 C 96.57263 6.346802 96.26831 6.357544 95.96698 6.378815 C 95.69566 6.396179 95.40866 6.426178 95.10597 6.468842 C 94.82664 6.508179 94.55132 6.555817 94.28 6.611816 C 93.97333 6.676453 93.68369 6.747467 93.41101 6.824799 C 93.09769 6.916138 92.80968 7.010193 92.54701 7.106812 C 92.22568 7.226837 91.92804 7.350098 91.65402 7.476807 C 91.39136 7.600098 91.12804 7.73645 90.86404 7.885803 C 90.56738 8.055817 90.2907 8.230164 90.03404 8.408813 C 89.78203 8.583466 89.53737 8.773468 89.30005 8.97879 L 85.4201 12.26773 L 85.3221 12.35477 L 85.22508 12.42175 C 85.12576 12.49179 85.01743 12.56009 84.9001 12.62674 C 84.79878 12.68344 84.69579 12.73642 84.59111 12.78574 C 84.47444 12.84039 84.34178 12.89511 84.19312 12.9498 C 84.09447 12.98578 83.96611 13.02707 83.80812 13.07376 C 83.70012 13.10443 83.57112 13.13574 83.42113 13.16776 C 83.29579 13.19373 83.16714 13.21579 83.03514 13.23373 C 82.9678 13.24313 82.90981 13.25043 82.86115 13.25577 L 82.74513 13.26974 L 6.35006 13.25073 L 266.3464 27.1155 L 6.3501 27.1155 Z","extra":"","trait":"M 266.3459 6.346802 L 96.87996 6.346802 C 96.57263 6.346802 96.26831 6.357544 95.96698 6.378815 C 95.69566 6.396179 95.40866 6.426178 95.10597 6.468842 C 94.82664 6.508179 94.55132 6.555817 94.28 6.611816 C 93.97333 6.676453 93.68369 6.747467 93.41101 6.824799 C 93.09769 6.916138 92.80968 7.010193 92.54701 7.106812 C 92.22568 7.226837 91.92804 7.350098 91.65402 7.476807 C 91.39136 7.600098 91.12804 7.73645 90.86404 7.885803 C 90.56738 8.055817 90.2907 8.230164 90.03404 8.408813 C 89.78203 8.583466 89.53737 8.773468 89.30005 8.97879 L 85.4201 12.26773 L 85.3221 12.35477 L 85.22508 12.42175 C 85.12576 12.49179 85.01743 12.56009 84.9001 12.62674 C 84.79878 12.68344 84.69579 12.73642 84.59111 12.78574 C 84.47444 12.84039 84.34178 12.89511 84.19312 12.9498 C 84.09447 12.98578 83.96611 13.02707 83.80812 13.07376 C 83.70012 13.10443 83.57112 13.13574 83.42113 13.16776 C 83.29579 13.19373 83.16714 13.21579 83.03514 13.23373 C 82.9678 13.24313 82.90981 13.25043 82.86115 13.25577 L 82.74513 13.26974 L 6.35006 13.25073"}};
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
        /* 15/09 : `trace:cote[:inverse]`. Le sens vertical se deduit du bord ; « inverse » le retourne, pour alterner
           l endroit et l envers d une frontiere a l autre (demande du fondateur : « ca creera l effet »). */
        var p = v.split(':'), trace = p[0], cote = p[1] || 'gauche', inverse = p[2] === 'inverse';
        if (!BORDS[trace]) return;
        /* Le fond d abord, la ligne ensuite et par-dessus : la ligne doit pouvoir deborder du rognage. */
        /* 15/09 : fond peint pour les sections SOMBRES uniquement — ailleurs la marche est une ligne, et rien d autre.
           La couleur etait lue avant que reglages-site.js ne rende `.blk.alt` transparent : la marche de « app » avait
           pris un #F5F5F5 qui n existe plus a l ecran. Une couleur lue trop tot est une couleur fausse. */
        var calques = sec.classList.contains('sombre') ? [false, true] : [true];
        calques.forEach(function (seulLigne) {
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
          if (inverse) sy = -sy;   /* sur une section claire il n y a pas de matiere : seule la ligne bascule */
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
    /* 16/09, fondateur : « decroche bas retire ». Le bord BAS de la bande defilante n est plus pose du tout : la bande
       s arrete sur une horizontale franche. Les trois listes de minutage qui citent encore 'qb-bord-defile-bas' plus bas
       cherchent l element avec querySelector et sortent si elles ne le trouvent pas — rien a y toucher. */
    var couleurDefile = document.documentElement.classList.contains('qz-barres-claires') ? '#dedede' : navy; /* 28/09 : bandeau defilant gris sur l accueil aux barres claires */
    poser(bande, 'bas', 'qb-bord-bas', navy); poser(bande, 'defile', 'qb-bord-defile-haut', couleurDefile);
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
  lettres(root.querySelector('.qb-l1'), T.dispo === 'ligne' ? [T.l1, T.l2, T.l3].filter(Boolean).join(' ') : T.l1); lettres(root.querySelector('.qb-l2'), T.l2); lettres(root.querySelector('.qb-l3'), T.l3); lettres(root.querySelector('.qb-l4'), T.l4); (function () { var l4 = root.querySelector('.qb-l4'); if (l4 && T.l4Lu) { Array.prototype.forEach.call(l4.children, function (m) { m.setAttribute('aria-hidden', 'true'); }); var lu = document.createElement('span'); lu.textContent = T.l4Lu; lu.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap'; l4.appendChild(lu); } })();
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
    /* 18/09 : en mode BURGER, le menu n est plus une rangee de rubriques dans la barre. Les deux calages qui le
       visent (bord droit cale sur le mur, centrage sur la ligne du naming) n ont plus d objet — et le premier est
       dangereux : il pose sur la barre un remplissage tire du bord du mur, qui vaut n importe quoi tant que le mur
       n est pas place, et emporte toute la page a fond perdu avec lui. */
    var enBurger = document.documentElement.classList.contains('qz-menu-tiroir');
    /* bord gauche du logo = bord gauche de la colonne de textes ; bord droit du menu = bord droit du mur (schema fondateur 11/09) */
    /* (11/09 soir : la marge gauche du logo n est plus calee sur la colonne mais sur MARGE, voir plus bas) */
    menu.style.paddingRight = (droite && large && mur && !enBurger) ? Math.max(0, Math.round(document.documentElement.clientWidth - mur.getBoundingClientRect().right)) + 'px' : '';
    /* 11/09 fondateur : le bloc logo (Q 88 px + trois lignes) vit DANS le decroche de l onglet, avec la marge minimale utile (MARGE) a gauche,
       en haut et en bas. L onglet fait 1.291 x la barre (dessin ONGLET.svg) : la barre est donc forcee a (88 + 2 MARGE) / 1.291 de haut
       (environ 90 px), le bloc logo deborde de la barre dans la partie basse de l onglet, le menu reste centre dans la barre. */
    var MARGE = 16, BLOC = 66, BARRE = 58, DECROCHE = 22, logoRow = menu.querySelector('.qz-logorow'), naming = menu.querySelector('.qz-naming'); /* BLOC = cote du Q = hauteur des trois lignes ; BARRE = hauteur de la barre sous le menu (12/09, trait rouge du fondateur) ; DECROCHE = profondeur des decroches du bas */
    if (droite && large) {
      var mEg = window.qzMargeLogo ? window.qzMargeLogo(menu) : MARGE; /* 28/09 soir : même marge en haut, en bas et à gauche (commun-bandeau.js) */
      menu.style.paddingTop = '0px'; menu.style.paddingBottom = '0px'; menu.style.paddingLeft = mEg + 'px';
      menu.style.height = BARRE + 'px'; R.setProperty('--onglet', (BLOC + 2 * MARGE) + 'px'); R.setProperty('--decroche-h', DECROCHE + 'px');
      if (logoRow) { logoRow.style.marginTop = mEg + 'px'; logoRow.style.alignSelf = 'flex-start'; }
      /* finition (fondateur) : le menu sur la ligne du naming -> centre du menu = centre de la premiere ligne du bloc */
      if (nav && naming && !enBurger) { nav.style.alignSelf = 'flex-start'; nav.style.marginTop = Math.max(0, Math.round(MARGE + naming.offsetHeight / 2 - nav.offsetHeight / 2)) + 'px'; }
      else if (nav && enBurger) { nav.style.alignSelf = ''; nav.style.marginTop = ''; }
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

  /* 20/09 (soir) : LE LISERE EST REDESSINE SUR `BORD 2 PRIME 85`, la forme qui a servi a decouper les
     visuels. Il venait jusqu ici de `BANDEAU.svg`, le tout PREMIER fichier, dont la marche fait 12,6 mm
     quand celle des images en fait 6,92 : le trait passait 36 px au-dessus du bord de la photo, et les
     36 px de photo coinces entre les deux se lisaient comme un second navy. Defaut signale par le
     fondateur sur une capture. Il etait de surcroit etire de 5 % en hauteur depuis que la bande avait
     grandi (echelle 5,84 en X contre 6,14 en Y).
     Le trace ci-dessous est le BORD LIBRE de cette forme — sa partie basse seule, du coin bas droit au
     coin bas gauche — extrait du fichier du fondateur, pas redessine a la main.
     Ancienne note, conservee :
  /* 20/09, fondateur : « et le lisere inferieur ? ». Il est parti avec le decroche du site, et on ne
     peut pas remettre l ancien : il suivait une AUTRE courbe (22 px de profondeur a 41-46 % de la
     largeur) que celle qui est maintenant dans l image (environ 73 px a 66-70 %) — le trait serait
     tombe en travers de la photo.
     Celui-ci vient du MEME fichier que la decoupe, `BANDEAU.svg`, et partage sa boite : il tombe donc
     exactement sur le bord, a toute largeur. Verifie : l echelle est uniforme (5,842 en X contre 5,840
     en Y a 1521 px de large), la courbe n est donc pas deformee.
     `non-scaling-stroke` garde 2 px a l ecran quelle que soit la taille de la bande. */
  /* ====== 20/09 (soir), fondateur : LA BANDE PEDAGOGIQUE PASSE SUR LA PHOTO (« maquette 2 »),
     ET LE BANDEAU DEFILANT EPOUSE LA MARCHE. Deux changements, une seule fonction.

     1. Les icones quittent leur bande et entrent DANS le bandeau, posees en bas de la photo.
        Le bandeau recupere leur hauteur : 649 px au lieu de 497 sur l ecran du fondateur, soit
        11,09 cm au lieu de 8,50. Mesure qui a motive le choix : les icones n occupaient que
        1,20 cm des 2,60 de leur bande — c est cette respiration qui revient a la photo.
        On garde le parent d origine pour tout remettre en place sous 901 px : c est un simple
        deplacement de noeud, rien n est reconstruit, le retour en arriere est immediat.

     2. Le bandeau defilant remonte de la profondeur de la marche et se decoupe avec le MEME
        trace que les images — plus de creux navy entre la photo et lui, une seule frontiere.
        La marche est a GAUCHE depuis ce soir (« la marche de l autre cote », fondateur) : le
        trace ci-dessous est le miroir de BORD 2 PRIME, retourne autour du milieu de la forme.

     La profondeur n est jamais figee en pixels : elle vaut 6,923 mm sur les 110,940 de la forme,
     soit 6,24 % de la hauteur du bandeau, recalcules a chaque changement de taille. ====== */
  (function gestesSurPhoto() {
    var PROF_MM = 6.923, FORME_MM = 120.34188;   /* la marche, et la hauteur de la forme */
    var X0 = 77.49981584406793, LARG = 260;      /* la boite du trace, en millimetres */
    var Y_HAUT = 477.0646437569147;              /* le niveau haut de la marche */
    var TRACE = "M337.49871584406793,483.96964375691476L261.102915844068,483.9876437569146L260.968415844068,483.9716437569146Q260.906415844068,483.96464375691465 260.80021584406796,483.94964375691467Q260.615815844068,483.9256437569148 260.430715844068,483.8866437569146Q260.204315844068,483.83864375691456 260.063415844068,483.7986437569147Q259.799415844068,483.7216437569146 259.652215844068,483.6666437569148Q259.430415844068,483.58664375691467 259.25331584406797,483.50264375691484Q259.099215844068,483.43064375691466 258.954515844068,483.34864375691467Q258.773515844068,483.2456437569147 258.617415844068,483.13664375691457L258.47411584406797,483.0366437569147L258.401815844068,482.9636437569147L254.562715844068,479.71064375691464Q254.19131584406801,479.3886437569147 253.81871584406798,479.1306437569146Q253.427815844068,478.85864375691483 252.974015844068,478.5986437569147Q252.58771584406804,478.38064375691476 252.18291584406802,478.1906437569147Q251.78161584406797,478.0046437569148 251.290615844068,477.8216437569148Q250.90681584406798,477.6796437569147 250.42401584406798,477.53964375691476Q250.02691584406801,477.42664375691464 249.55921584406804,477.3276437569147Q249.161215844068,477.2456437569148 248.744815844068,477.1876437569146Q248.28631584406799,477.1226437569147 247.89411584406804,477.09764375691475Q247.42831584406798,477.0646437569147 246.96771584406798,477.0646437569147L77.49981584406808,477.0646437569147";
    var DEFILE = 55;                             /* la hauteur propre du bandeau defilant */
    function bureau() { return window.matchMedia("(min-width: 901px)").matches; }
    var bd, g, df, nidOrigine, apres;
    /* `.qb-gestes` est construite par bandeau-gestes.js, charge APRES ce fichier : on patiente
       jusqu a ce que les trois blocs existent, au lieu de sortir en silence. */
    var essais = 0;
    function attendre() {
      bd = document.getElementById("qbBandeau");
      g = document.querySelector(".qb-gestes");
      df = document.querySelector(".qb-defile");
      if (!bd || !g || !df) { if (++essais < 120) setTimeout(attendre, 100); return; }
      nidOrigine = g.parentNode; apres = g.nextSibling;
      caler();
      window.addEventListener("resize", caler);
      if (window.ResizeObserver) new ResizeObserver(caler).observe(bd);
    }

    /* Le masque du bandeau defilant, en coordonnees 0-1 : il suit la bande quelle que soit sa taille. */
    function masque(creux, bande, h) {
      var d = TRACE.replace(/(-?[\d.]+),(-?[\d.]+)/g, function (t, x, y) {
        return ((parseFloat(x) - X0) / LARG).toFixed(5) + "," +
               (((parseFloat(y) - Y_HAUT) / PROF_MM * creux) / bande).toFixed(5);
      });
      var svg = document.getElementById("qzMasqueMarche");
      if (!svg) {
        svg = document.createElementNS(SVGNS, "svg");
        svg.id = "qzMasqueMarche";
        svg.setAttribute("width", "0");
        svg.setAttribute("height", "0");
        svg.setAttribute("aria-hidden", "true");
        svg.style.position = "absolute";
        document.body.appendChild(svg);
      }
      /* Deux masques tires du MEME trace, pris dans deux boites differentes :
         - qzMarche : pour le bandeau defilant, la zone SOUS la marche, dans une boite qui
           commence au bord haut de la marche ;
         - qzPhoto : pour le voile des icones, la zone AU-DESSUS, dans une boite qui commence
           en haut du bloc des icones et descend jusqu au bas de la photo. */
      var hautVoile = g.getBoundingClientRect().top - bd.getBoundingClientRect().top;
      var hVoile = Math.max(1, h - hautVoile);
      var frac = (h - creux - hautVoile) / hVoile;      /* ou tombe le bord haut de la marche */
      /* le meme trace, ramene cette fois dans la boite du BANDEAU ENTIER : c est le masque du
         voile general, qui part du haut de l image et non du haut des icones. */
      var fracImage = (h - creux) / h;
      var dImage = TRACE.replace(/(-?[\d.]+),(-?[\d.]+)/g, function (t, x, y) {
        return ((parseFloat(x) - X0) / LARG).toFixed(5) + "," +
               (fracImage + ((parseFloat(y) - Y_HAUT) / PROF_MM * creux) / h).toFixed(5);
      }).replace(/^M/, "L");
      var dPhoto = TRACE.replace(/(-?[\d.]+),(-?[\d.]+)/g, function (t, x, y) {
        return ((parseFloat(x) - X0) / LARG).toFixed(5) + "," +
               (frac + ((parseFloat(y) - Y_HAUT) / PROF_MM * creux) / hVoile).toFixed(5);
      }).replace(/^M/, "L");
      svg.innerHTML = '<defs><clipPath id="qzMarche" clipPathUnits="objectBoundingBox">' +
        '<path d="' + d + ' L 0,1 L 1,1 Z"/></clipPath>' +
        '<clipPath id="qzImage" clipPathUnits="objectBoundingBox">' +
        '<path d="M 0,0 L 1,0 ' + dImage + ' Z"/></clipPath>' +
        '<clipPath id="qzPhoto" clipPathUnits="objectBoundingBox">' +
        '<path d="M 0,0 L 1,0 ' + dPhoto + ' Z"/></clipPath></defs>';
    }

    function caler() {
      if (!bureau()) {
        if (g.parentNode === bd) { if (apres && apres.parentNode === nidOrigine) nidOrigine.insertBefore(g, apres); else nidOrigine.appendChild(g); } /* 28/09 soir : garde — le voisin capture au depart peut avoir bouge (vu en console : insertBefore sur un noeud qui n est plus enfant) */
        return;
      }
      if (g.parentNode !== bd) bd.appendChild(g);
      /* sortirLesPoints : ils vivent dans .qb-mur, qui porte z-index:0 et cree donc un contexte
         d empilement — leur propre z-index n y vaut que dans ce bloc, et le bandeau defilant
         passait devant. On les remonte d un cran, en enfant direct du bandeau : leur position
         est en pourcentage et en `bottom`, elle ne change pas de repere. */
      var pts = document.querySelector(".qb-diapo-points");
      if (pts && pts.parentNode !== bd) bd.appendChild(pts);
      var h = bd.getBoundingClientRect().height;
      if (!h) return;
      var creux = Math.round(h * PROF_MM / FORME_MM);
      document.documentElement.style.setProperty("--marche-px", creux + "px");
      /* Ce qui reste de fenetre sous la photo. Le bandeau defilant prend exactement ca,
         plus le creux de la marche qu il vient combler. En dessous de 26 px le texte
         toucherait la photo, donc on ne descend jamais sous ce plancher. */
      /* On mesure depuis la HAUTEUR du bandeau, pas depuis sa position : il commence a zero,
         et sa position peut ne pas etre stabilisee quand on calcule. La bande tombait alors sur
         son plancher de 26 px et laissait trois pixels de vide en bas de la fenetre. */
      /* Plancher a zero depuis que la photo occupe toute la fenetre : il ne reste RIEN sous elle,
         la bande ne fait plus que la hauteur de la marche et son texte se centre dedans. Le
         plancher de 26 px servait quand le texte devait tenir sous le bord bas de la photo ;
         il la faisait deborder de 26 px exactement. */
      var reste = Math.max(0, Math.round(window.innerHeight - h));
      document.documentElement.style.setProperty("--defile-h", (creux + reste) + "px");
      masque(creux, creux + reste, h);
      /* LE LISERE EST REMONTE D UN PIXEL. Sa partie droite longe le bord BAS de la forme, et la
         moitie basse de son epaisseur tombait hors du cadre — pas celui du SVG, qu on a ouvert,
         mais celui de `.qb`, qui porte overflow:hidden et coupe a la hauteur du bandeau. Le trait
         y paraissait deux fois plus fin qu en haut, defaut signale deux fois par le fondateur.
         On decale le TRACE d un pixel vers le haut, converti en unites du dessin : sa moitie
         basse rentre dans le cadre. Recalcule a chaque taille, le rapport unites/pixels changeant
         avec elle. */
      var traitL = bd.querySelector(".qb-lisere-image path");
      if (traitL) traitL.setAttribute("transform", "translate(0 " + (-1.1 * FORME_MM / h).toFixed(4) + ")");
    }
    attendre();
    /* construireDiapo() reconstruit le diaporama APRES ce reglage et remet les points dans
       .qb-mur : on repasse derriere lui. Trois passages suffisent, caler() ne fait rien quand
       tout est deja en place. */
    setTimeout(attendre, 400); setTimeout(attendre, 1500); setTimeout(attendre, 3500);
  })();

  (function liserebas() {
    var hote = document.getElementById('qbBandeau');
    if (!hote || hote.querySelector('.qb-lisere-image')) return;
    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'qb-lisere-image');
    svg.setAttribute('viewBox', '77.49981584406793 363.62776341503 260 120.34188');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    var t = document.createElementNS(SVGNS, 'path');
    t.setAttribute('d', "M337.49871584406793,483.96964375691476L261.102915844068,483.9876437569146L260.968415844068,483.9716437569146Q260.906415844068,483.96464375691465 260.80021584406796,483.94964375691467Q260.615815844068,483.9256437569148 260.430715844068,483.8866437569146Q260.204315844068,483.83864375691456 260.063415844068,483.7986437569147Q259.799415844068,483.7216437569146 259.652215844068,483.6666437569148Q259.430415844068,483.58664375691467 259.25331584406797,483.50264375691484Q259.099215844068,483.43064375691466 258.954515844068,483.34864375691467Q258.773515844068,483.2456437569147 258.617415844068,483.13664375691457L258.47411584406797,483.0366437569147L258.401815844068,482.9636437569147L254.562715844068,479.71064375691464Q254.19131584406801,479.3886437569147 253.81871584406798,479.1306437569146Q253.427815844068,478.85864375691483 252.974015844068,478.5986437569147Q252.58771584406804,478.38064375691476 252.18291584406802,478.1906437569147Q251.78161584406797,478.0046437569148 251.290615844068,477.8216437569148Q250.90681584406798,477.6796437569147 250.42401584406798,477.53964375691476Q250.02691584406801,477.42664375691464 249.55921584406804,477.3276437569147Q249.161215844068,477.2456437569148 248.744815844068,477.1876437569146Q248.28631584406799,477.1226437569147 247.89411584406804,477.09764375691475Q247.42831584406798,477.0646437569147 246.96771584406798,477.0646437569147L77.49981584406808,477.0646437569147");
    t.setAttribute('fill', 'none');
    t.setAttribute('vector-effect', 'non-scaling-stroke');
    t.setAttribute('stroke-linejoin', 'round');
    t.setAttribute('stroke-linecap', 'round');
    svg.appendChild(t);
    hote.appendChild(svg);
  })();

  /* 20/09 (soir) : les 13 visuels passent en WebP a couche alpha, 2000 x 615, cadres par le
     fondateur dans l atelier local a partir de BORD 2 PRIME 80. La marche mesure 6,808 mm sur les
     treize, au millieme. Les JPEG precedents la PEIGNAIENT en #1e2b34 ; elle est maintenant un vrai
     vide, donc independante de la couleur de fond. Anciens .jpg gardes dans img/.

  /* 20/09 : poserSilhouette() est RETIREE. Elle decoupait la bande pour dessiner la marche du bas ;
     depuis que les visuels arrivent decoupes, elle couperait une seconde fois, et pas au meme
     endroit — 22 px cote site contre environ 73 px dans l image. La forme vient du fichier.
     L historique garde le code si jamais il fallait revenir a une decoupe cote site. */
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
  function construireVivant() {
    var V = REGLAGES.vivant, N = V.N || 7, T = REGLAGES.textes, p = REGLAGES.pause; cx = nbCarreaux().cx; cy = nbCarreaux().cy; R.setProperty('--cx', cx); R.setProperty('--cy', cy);
    if (mur._vivantStop) mur._vivantStop(); /* le bandeau se reconstruit au redimensionnement : on coupe l instance precedente */
    mur.classList.remove('qb-vif-avous');
    var html = '<div class="qb-vif" role="group" aria-label="Mur Quadreti 7 par 7 : cliquez une tesselle pour changer sa couleur, deposez une photo pour la poser">';
    for (var i = 0; i < N * N; i++) html += '<button type="button" class="qb-vt" data-i="' + i + '" aria-label="tesselle ' + (Math.floor(i / N) + 1) + ',' + (i % N + 1) + '"></button>';
    /* 28/09, fondateur : « le carreau anime manque des fonctionnalites de la maquette » — parite avec mockup-banniere-mur-vivant.html :
       palette (cliquable : choisir une teinte, puis peindre ; sans choix, le clic fait defiler), Photo 3x3 / 2x2, Vider, Telecharger mon mur
       (PNG 1400 px signe), Ouvrir dans Designer (composition gardee dans localStorage, cle quadreti-mur-banniere), toast au premier geste. */
    /* 28/09 (soir), fondateur : « le mur doit occuper plus l espace en hauteur, ses commandes sont inaccessibles » — les commandes passent
       dans un RAIL vertical a droite du mur (tesselles-icones, libelle en info-bulle et pour les lecteurs d ecran ; palette en mini-grille 3x3).
       Le mur prend ainsi toute la hauteur disponible (--mur-max) ; plus rien sous lui que la ligne d etat. */
    var lib = function (t) { return '<span class="qb-vif-lib">' + t + '</span>'; };
    html += '</div><div class="qb-vif-rail"><div class="qb-vif-palette" role="radiogroup" aria-label="Teinte a poser"></div>' +
      '<label class="qb-vif-btn" title="Deposer une photo"><input type="file" accept="image/*" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h11a2 2 0 0 1 2 2v3M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3M2 15l4.5-4.5L12 16M19 9v6M16 12h6"/><circle cx="8" cy="9" r="1.6"/></svg>' + lib('Deposer une photo') + '</label>' +
      '<button type="button" class="qb-vif-btn qb-vif-camera" hidden title="Me prendre en photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/></svg>' + lib('Me prendre en photo') + '</button>' +
      '<button type="button" class="qb-vif-btn qb-vif-taille" title="Une photo = une case ; cliquer pour le carreau entier (7 x 7)"><span class="qb-vif-t">1\u00d71</span>' + lib('Taille des photos') + '</button>' +
      '<button type="button" class="qb-vif-btn qb-vif-melanger" title="Melanger les couleurs"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h4l8 10h6M21 7h-6l-2 2.5M3 17h4l2-2.5M18 4l3 3-3 3M18 14l3 3-3 3"/></svg>' + lib('Melanger') + '</button>' +
      '<button type="button" class="qb-vif-btn qb-vif-vider" title="Vider le mur"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>' + lib('Vider') + '</button>' +
      '<button type="button" class="qb-vif-btn qb-vif-salon" title="Afficher la composition dans un salon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 12a1.5 1.5 0 0 1 3 0v2h12v-2a1.5 1.5 0 0 1 3 0v6H3v-6zM5 18v2M19 18v2"/></svg>' + lib('Afficher dans le salon') + '</button>' +
      '<a class="qb-vif-btn qb-vif-designer" href="https://designer.quadreti.fr" target="_blank" rel="noopener" title="Ouvrir dans Designer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M11 5H5v14h14v-6"/></svg>' + lib('Ouvrir dans Designer') + '</a>' +
      '</div><span class="qb-vif-etat" aria-live="polite"></span><div class="qb-vif-toast" aria-hidden="true">Le mur est \u00e0 vous</div>';
    mur.innerHTML = html;
    /* la grille et le rail sont mis cote a cote dans un cadre */
    (function () { var g = mur.querySelector('.qb-vif'), r = mur.querySelector('.qb-vif-rail'), cadre = document.createElement('div'); cadre.className = 'qb-vif-cadre'; mur.insertBefore(cadre, g); cadre.appendChild(g); cadre.appendChild(r); var et = document.createElement('span'); et.className = 'qb-vif-etiquette'; et.textContent = 'App démo'; cadre.appendChild(et); var inv = document.createElement('p'); inv.className = 'qb-vif-invite'; inv.textContent = 'Le mur est à vous.'; cadre.appendChild(inv); /* 28/09 soir, fondateur : « partons sur Le mur est a vous » -- la formule au-dessus du mur demo, a la place de la baseline en doublon (dite sous le logo et par les icones) ; meme phrase que le message du premier geste */ /* 28/09 soir, fondateur : « placer sur l app la mention app demo » */ })();
    mur.classList.add('qb-mur-vivant'); mur.removeAttribute('aria-hidden'); style.textContent = '';
    var grille = mur.querySelector('.qb-vif'), tuiles = grille.querySelectorAll('.qb-vt'), etat = mur.querySelector('.qb-vif-etat');
    var cs = getComputedStyle(mur), PAL = []; for (var k = 1; k <= 9; k++) { var v = cs.getPropertyValue('--qv-' + k).trim(); if (v) PAL.push(v); }
    var sm = null, cases = [], photos = [], demo = false, tCouleur = null, tPhoto = null, iPhoto = 0, idPhoto = 1, taille = 1, couleurChoisie = null; /* 1 = une case, 7 = le carreau entier */
    var palette = mur.querySelector('.qb-vif-palette'), toast = mur.querySelector('.qb-vif-toast'), tToast = null;
    PAL.forEach(function (c, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'qb-vif-teinte'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false'); b.setAttribute('aria-label', 'teinte ' + (i + 1)); b.style.setProperty('--c', c); b.setAttribute('data-c', c); palette.appendChild(b); });
    palette.addEventListener('click', function (e) { var b = e.target.closest('.qb-vif-teinte'); if (!b) return; stopDemo(); var c = b.getAttribute('data-c'); couleurChoisie = (couleurChoisie === c) ? null : c; Array.prototype.forEach.call(palette.children, function (x) { x.setAttribute('aria-checked', x.getAttribute('data-c') === couleurChoisie ? 'true' : 'false'); }); etat.textContent = couleurChoisie ? 'cliquez une case pour la peindre' : 'a vous : cliquez une case, deposez une photo'; });
    function direToast(txt) { toast.textContent = txt; toast.classList.add('qb-on'); clearTimeout(tToast); tToast = setTimeout(function () { toast.classList.remove('qb-on'); }, 2200); }
    Array.prototype.forEach.call(tuiles, function (b, i) { var c = PAL[Math.floor(Math.random() * 7)]; b.style.setProperty('--c', c); cases.push({ el: b, couleur: c, photo: null }); });
    function peindre(k, c) { var x = cases[k]; x.photo = null; x.sous = null; x.couleur = c; x.el.className = 'qb-vt'; x.el.style.cssText = ''; x.el.style.setProperty('--c', c); }
    function poserPhoto(src, r0, c0, n) { r0 = Math.max(0, Math.min(N - n, r0)); c0 = Math.max(0, Math.min(N - n, c0)); var pid = idPhoto++; photos.push({ id: pid, src: src, r0: r0, c0: c0, n: n });
      for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) { var k = (r0 + r) * N + (c0 + c), x = cases[k]; x.photo = { id: pid, r: r, c: c }; x.el.className = 'qb-vt qb-vt-photo qb-vt-pose'; x.el.style.cssText = ''; x.el.style.backgroundImage = 'url("' + src + '")'; }
      caler(); }
    function caler() { var jt = parseFloat(getComputedStyle(grille).gap) || 3, cw = grille.clientWidth / N; cases.forEach(function (x) { if (!x.photo) return; var ph = null; for (var i = 0; i < photos.length; i++) if (photos[i].id === x.photo.id) ph = photos[i]; if (!ph) return; var px = ph.n * cw + (ph.n - 1) * jt; x.el.style.backgroundSize = px + 'px ' + px + 'px'; x.el.style.backgroundPosition = (-(x.photo.c * (cw + jt))) + 'px ' + (-(x.photo.r * (cw + jt))) + 'px'; }); }
    window.addEventListener('resize', caler);
    function demoPas() { if (!demo) return; var k = Math.floor(Math.random() * N * N); if (cases[k].photo) return; peindre(k, PAL[Math.floor(Math.random() * 7)]); }
    function demoPhoto() { if (!demo) return; photos = []; cases.forEach(function (x, k) { if (x.photo) peindre(k, PAL[Math.floor(Math.random() * 7)]); }); var tailles = V.tailles || [1, 7], nn = tailles[Math.floor(Math.random() * tailles.length)]; poserPhoto(visuels[iPhoto++ % visuels.length], Math.floor(Math.random() * (N - nn + 1)), Math.floor(Math.random() * (N - nn + 1)), nn); }
    function stopDemo() { if (!demo) return; demo = false; clearInterval(tCouleur); clearInterval(tPhoto); etat.textContent = 'a vous : cliquez une case, deposez une photo'; mur.classList.add('qb-vif-avous'); direToast('Le mur est \u00e0 vous'); }
    function demarrerDemo() { if (demo) return; demo = true; tCouleur = setInterval(demoPas, V.pasCouleur || 900); tPhoto = setInterval(demoPhoto, V.pasPhoto || 6000); setTimeout(demoPhoto, 1200); }
    mur._vivantStop = function () { clearInterval(tCouleur); clearInterval(tPhoto); demo = false; window.removeEventListener('resize', caler); if (mur._vivantStopCam) mur._vivantStopCam(); if (mur._vivantStopSalon) mur._vivantStopSalon(); var cs0 = root.querySelector('.qb-salon-carreau'); if (cs0) cs0.remove(); };
    grille.addEventListener('click', function (e) { var b = e.target.closest('.qb-vt'); if (!b) return; stopDemo(); var k = +b.getAttribute('data-i'), x = cases[k]; if (couleurChoisie) { peindre(k, couleurChoisie); return; } var i = PAL.indexOf(x.couleur); peindre(k, PAL[(i + 1) % PAL.length]); });
    function lireFichier(f, r0, c0) { if (!f || !/^image\//.test(f.type)) return; stopDemo(); var u = URL.createObjectURL(f), im = new Image(); im.onload = function () { poserPhoto(u, r0, c0, taille); }; im.src = u; }
    mur.querySelector('input[type=file]').addEventListener('change', function (e) { lireFichier(e.target.files[0], Math.floor((N - taille) / 2), Math.floor((N - taille) / 2)); e.target.value = ''; });
    grille.addEventListener('dragover', function (e) { e.preventDefault(); grille.classList.add('qb-vif-survol'); });
    grille.addEventListener('dragleave', function () { grille.classList.remove('qb-vif-survol'); });
    grille.addEventListener('drop', function (e) { e.preventDefault(); grille.classList.remove('qb-vif-survol'); var r = grille.getBoundingClientRect(), cw = grille.clientWidth / N; lireFichier(e.dataTransfer.files[0], Math.floor((e.clientY - r.top) / cw) - Math.floor(taille / 2), Math.floor((e.clientX - r.left) / cw) - Math.floor(taille / 2)); });
    mur.querySelector('.qb-vif-melanger').addEventListener('click', function () { stopDemo(); cases.forEach(function (x, k) { if (!x.photo) peindre(k, PAL[Math.floor(Math.random() * 7)]); }); });
    mur.querySelector('.qb-vif-taille').addEventListener('click', function () { taille = taille === 1 ? 7 : 1; this.querySelector('.qb-vif-t').textContent = taille + '\u00d7' + taille; this.title = taille === 1 ? 'Une photo = une case ; cliquer pour le carreau entier (7 x 7)' : 'Une photo = le carreau entier ; cliquer pour une case'; });
    mur.querySelector('.qb-vif-vider').addEventListener('click', function () { stopDemo(); photos = []; cases.forEach(function (x, k) { peindre(k, PAL[2]); }); });
    /* 28/09 soir, fondateur : « le salon vu de face en zoom est un espace cadre ; clic sur Affichez la composition » puis « encore mieux :
       clic > le mur s efface > le cadre s anime tesselle par tesselle ». EN PLACE, pas de fenetre : la vue salon (carre, 60 % de la photo
       img/bandeau-fond-salon.jpg, de 20 a 80 % en largeur et de 12 a 72 % en hauteur, le haut du canape visible pour l echelle) prend
       exactement la place de la grille ; le carreau y est pose A L ECHELLE (canape 220 cm -> 189 mm = 8,05 % de la photo = 20,1 % du carre, le carre montrant 40 % de la photo),
       centre a 42 % de la hauteur de la photo, et ses 49 tesselles se clipsent une a une (45 ms d ecart). Le meme bouton ramene au mur.
       Le bouton Telecharger a disparu (fondateur : « aucune utilite »). */
    var btnSalon = mur.querySelector('.qb-vif-salon'), carreauSalon = document.createElement('div'); carreauSalon.className = 'qb-salon-carreau'; carreauSalon.hidden = true;
    carreauSalon.setAttribute('role', 'img'); carreauSalon.setAttribute('aria-label', 'Votre composition sur le mur du salon, un carreau de 19 cm au-dessus du canap\u00e9');
    root.appendChild(carreauSalon);
    /* la place du carreau sur le mur du salon : la photo (carree, 1920) couvre la banniere (background-size cover, centree, position verticale FD.position) ;
       canape 220 cm sur 93,75 % de la photo -> carreau 189 mm = 8,05 % du cote de la photo ; centre a 52 % de sa hauteur (28 cm au-dessus du dossier).
       En largeur : sous le mur interactif sur bureau (c est lui qui s efface), au centre de la photo sur mobile. */
    function poserSalon() { carreauSalon.innerHTML = ''; var FD2 = REGLAGES.fond || {}, pos = (parseFloat(String(FD2.position || 'center 50%').split(' ')[1]) || 50) / 100;
      var rr = root.getBoundingClientRect(), W = rr.width, H = rr.height, IW = 1836, IH = 857, sc = Math.max(W / IW, H / IH), S = IW * sc, SH = IH * sc, offX = (W - S) / 2, offY = (H - SH) * pos; /* cover : sur bureau le bandeau a le rapport de la photo, donc ajustee pile ; sur mobile recadree */
      var cote = S * .1465, jt = Math.max(1, cote * 3 / 520), cw = (cote - jt * (N + 1)) / N; /* la taille de l ancien carreau dans la photo (293 px sur 2000) */
      var cx = offX + S * .502, cy = offY + SH * .368; /* au-dessus du canape, entre le bas de l onglet et le dossier (mesure : 59,5 %) */
      if (W <= 900) { var g = grille.getBoundingClientRect(); cx = g.left - rr.left + g.width / 2; cy = g.top - rr.top + g.height / 2; cote = g.width; jt = Math.max(1, cote * 3 / 520); cw = (cote - jt * (N + 1)) / N; } /* et a la taille du mur efface : la photo recadree en cover rendrait le carreau enorme */ /* petit ecran : la banniere est en colonne, la place du carreau dans la photo tombe sur le texte -> le carreau prend la place du mur efface */
      cy = Math.max(cote / 2 + 8, Math.min(H - cote / 2 - 8, cy));
      carreauSalon.style.width = carreauSalon.style.height = cote + 'px'; carreauSalon.style.left = cx + 'px'; carreauSalon.style.top = cy + 'px';
      cases.forEach(function (x, k) { var i = document.createElement('i'); i.style.setProperty('--i', k); var r = Math.floor(k / N), c = k % N; i.style.left = (jt + c * (cw + jt)) + 'px'; i.style.top = (jt + r * (cw + jt)) + 'px'; i.style.width = i.style.height = cw + 'px';
        if (!x.photo) i.style.background = x.couleur; else { var ph = null; for (var q = 0; q < photos.length; q++) if (photos[q].id === x.photo.id) ph = photos[q]; if (ph) { var px = ph.n * cw + (ph.n - 1) * jt; i.style.backgroundImage = 'url("' + ph.src + '")'; i.style.backgroundSize = px + 'px ' + px + 'px'; i.style.backgroundPosition = (-(x.photo.c * (cw + jt))) + 'px ' + (-(x.photo.r * (cw + jt))) + 'px'; } }
        carreauSalon.appendChild(i); }); }
    function ouvrirSalon() { stopDemo(); poserSalon(); carreauSalon.hidden = false; mur.classList.add('qb-en-salon'); root.classList.add('qb-en-salon'); btnSalon.setAttribute('aria-pressed', 'true'); btnSalon.title = 'Revenir au mur'; btnSalon.querySelector('.qb-vif-lib').textContent = 'Revenir au mur'; direToast('Votre composition, sur le mur du salon'); }
    function fermerSalon() { mur.classList.remove('qb-en-salon'); root.classList.remove('qb-en-salon'); carreauSalon.hidden = true; btnSalon.setAttribute('aria-pressed', 'false'); btnSalon.title = 'Afficher la composition dans un salon'; btnSalon.querySelector('.qb-vif-lib').textContent = 'Afficher dans le salon'; }
    btnSalon.addEventListener('click', function () { if (sm) { sm.auMur(); return; } if (mur.classList.contains('qb-en-salon')) fermerSalon(); else ouvrirSalon(); });
    window.addEventListener('resize', function () { if (mur.classList.contains('qb-en-salon')) poserSalon(); });
    mur._vivantStopSalon = fermerSalon;
    /* ouvrir dans Designer : la composition est gardee dans le navigateur (cle quadreti-mur-banniere) ; Designer ne la lit PAS encore — brief a faire au fil Application (Designer) */
    mur.querySelector('.qb-vif-designer').addEventListener('click', function () { try { localStorage.setItem('quadreti-mur-banniere', JSON.stringify({ n: N, quand: Date.now(), cases: cases.map(function (x) { return x.photo ? { photo: x.photo.id, r: x.photo.r, c: x.photo.c } : { c: x.couleur }; }), photos: photos.map(function (p) { return { id: p.id, r0: p.r0, c0: p.c0, n: p.n }; }) })); } catch (e) {} direToast('Composition gard\u00e9e : Designer la retrouvera'); });
    /* 28/09, fondateur : « se prendre en photo pour tester des le premier moment ». Camera de l appareil, ouverte SEULEMENT apres un clic,
       apercu en miroir dans un cadre carre, la prise est decoupee en 3x3 au centre du mur comme une photo deposee. Tout reste dans le
       navigateur : aucun envoi, aucun stockage — le flux est coupe des que la boite se ferme. Le bouton n existe que si la camera est
       possible (HTTPS ou localhost, API presente). */
    var btnCam = mur.querySelector('.qb-vif-camera');
    if (btnCam && window.isSecureContext && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      btnCam.hidden = false;
      var cam = null, flux = null;
      function fermerCam() { if (flux) { flux.getTracks().forEach(function (t) { t.stop(); }); flux = null; } if (cam) { cam.remove(); cam = null; } document.removeEventListener('keydown', camClavier); btnCam.focus(); }
      function camClavier(e) { if (e.key === 'Escape') fermerCam(); }
      function ouvrirCam() {
        stopDemo();
        cam = document.createElement('div'); cam.className = 'qb-cam'; cam.setAttribute('role', 'dialog'); cam.setAttribute('aria-modal', 'true'); cam.setAttribute('aria-label', 'Me prendre en photo');
        cam.innerHTML = '<div class="qb-cam-carre"><div class="qb-cam-cadre"><video autoplay playsinline muted></video><span class="qb-cam-attente">Ouverture de la caméra…</span></div>' +
          '<p class="qb-cam-note">La photo reste sur votre appareil : rien n’est envoyé, rien n’est enregistré.</p>' +
          '<div class="qb-cam-boutons"><button type="button" class="qb-cam-prendre" disabled>Prendre la photo</button><button type="button" class="qb-cam-annuler">Annuler</button></div></div>';
        document.body.appendChild(cam); document.addEventListener('keydown', camClavier);
        var video = cam.querySelector('video'), prendre = cam.querySelector('.qb-cam-prendre'), attente = cam.querySelector('.qb-cam-attente');
        cam.querySelector('.qb-cam-annuler').addEventListener('click', fermerCam);
        cam.addEventListener('click', function (e) { if (e.target === cam) fermerCam(); });
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 1280 } }, audio: false }).then(function (st) {
          flux = st; video.srcObject = st; video.onloadedmetadata = function () { attente.hidden = true; prendre.disabled = false; prendre.focus(); };
        }).catch(function () { attente.textContent = 'Caméra indisponible ou refusée.'; });
        prendre.addEventListener('click', function () {
          var w = video.videoWidth, h = video.videoHeight; if (!w || !h) return; var c = Math.min(w, h), cv = document.createElement('canvas'); cv.width = cv.height = c; var g = cv.getContext('2d');
          g.translate(c, 0); g.scale(-1, 1); /* miroir, comme l apercu */ g.drawImage(video, (w - c) / 2, (h - c) / 2, c, c, 0, 0, c, c);
          cv.toBlob(function (b) { if (!b) return; var u = URL.createObjectURL(b); fermerCam(); poserPhoto(u, Math.floor((N - taille) / 2), Math.floor((N - taille) / 2), taille); etat.textContent = 'vous voilà sur le mur'; }, 'image/jpeg', .92);
        });
      }
      btnCam.addEventListener('click', ouvrirCam);
      mur._vivantStopCam = fermerCam;
    }
    /* meme prise que le diaporama : lancer() appelle diapo.demarrer(delai) au depart du mur */
    diapo = { demarrer: function (delai) { setTimeout(demarrerDemo, Math.max(0, delai) * 1000); } };
    if (lanceDeja) demarrerDemo(); /* reconstruction (bascule mobile/bureau) alors que le mur a deja ete lance : la demo repart tout de suite */
    if (V.salonMur && V.salonMur.actif && window.innerWidth > 900) salonMur();
    /* ===== 28/09 soir : SALON, MUR DE CARREAUX (voir REGLAGES.vivant.salonMur). Maquette d origine : SITE, DESIGN SYSTEME, generer-mockup-salon-carreaux.js ===== */
    function salonMur() {
      var S = V.salonMur, PH = S.photo, NC = S.carreaux[0], NR = S.carreaux[1], NB = NC * NR;
      var murS = document.createElement('div'), voile = document.createElement('div'), invite = document.createElement('p'), echelle = document.createElement('p');
      murS.className = 'qb-sm-mur'; murS.setAttribute('role', 'group'); murS.setAttribute('aria-label', 'Un mur de ' + NB + ' carreaux Quadreti au-dessus du canap\u00e9 : touchez la tesselle qui bouge, ou un carreau, pour le composer');
      voile.className = 'qb-sm-voile'; invite.className = 'qb-sm-invite'; invite.textContent = 'Le mur est \u00e0 vous.'; echelle.className = 'qb-sm-echelle';
      echelle.textContent = 'Mur de ' + NB + ' carreaux \u00b7 ' + (NC * 18.9).toFixed(1).replace('.', ',') + ' \u00d7 ' + (NR * 18.9).toFixed(1).replace('.', ',') + ' cm';
      var modeLbl = document.createElement('p'); modeLbl.className = 'qb-sm-mode'; modeLbl.setAttribute('aria-live', 'polite');
      var loupe = document.createElement('div'); loupe.className = 'qb-sm-loupe'; loupe.setAttribute('aria-hidden', 'true'); var LP = S.loupe || {}; loupe.innerHTML = '<canvas></canvas>' + (LP.image ? '<img alt="" src="' + LP.image + '">' : '') + '<span class="qb-sm-loupe-lib"></span>';
      [voile, murS, invite, echelle, modeLbl, loupe].forEach(function (e) { root.appendChild(e); });
      root.classList.add('qb-sm', 'qb-sm-repos');
      /* 28/09 soir, fondateur : le bouton fauteuil quitte le rail ; à sa place, « Exposez », cliquable, à cheval au milieu du bord bas du cadre (comme App démo en haut) */
      btnSalon.hidden = true; btnSalon.style.display = 'none'; /* le style du rail bat l attribut hidden */ var cadreSM = mur.querySelector('.qb-vif-cadre'), btnExp = document.createElement('button'); btnExp.type = 'button'; btnExp.className = 'qb-sm-exposer'; btnExp.textContent = 'Exposez'; btnExp.title = 'Remettre le carreau au mur du salon'; if (cadreSM) cadreSM.appendChild(btnExp);
      var etats = [], carr = [], ORIG = null, ouvert = null, actif = -1, tBouge = null, tSurvol = null, G = { pp: 11, j: 1 }, CAM = 1, camFluide = false, rafCam = 0;
      function construireCarreaux() { carr.forEach(function (d) { d.remove(); }); carr = []; etats = [];
        murS.setAttribute('aria-label', 'Un mur de ' + NB + ' carreau' + (NB > 1 ? 'x' : '') + ' Quadreti au-dessus du canap\u00e9 : touchez la tesselle qui bouge, ou un carreau, pour le composer');
        for (var nn = 0; nn < NB; nn++) (function (n) { var d = document.createElement('div'); d.className = 'qb-sm-c'; d.tabIndex = 0; d.setAttribute('role', 'button'); d.setAttribute('aria-label', 'Carreau ' + (n + 1) + ' : le composer');
          for (var k = 0; k < N * N; k++) { var i = document.createElement('i'); i.style.setProperty('--k', k); d.appendChild(i); }
          d.addEventListener('click', function () { ouvrir(n); }); d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ouvrir(n); } });
          murS.appendChild(d); carr.push(d); })(nn); }
      var etapes = (S.croissance && S.croissance.length) ? S.croissance : [[NC, NR]], enCroissance = false;
      NC = etapes[0][0]; NR = etapes[0][1]; NB = NC * NR; CAM = etapes[0][3] || 1; construireCarreaux();
      /* l image du mur : le portrait, relevé au centre de chaque case (moyenne 9 x 9 px) ; un mur plus petit en prend le centre */
      var IMG = null, ORIG = null;
      function echantillonner() { if (!IMG) { ORIG = null; return; } var RES = Math.max(1, S.resolution || 1), W = N * NC * RES, H = N * NR * RES, iw = IMG.naturalWidth, ih = IMG.naturalHeight, r = W / H, sw = iw, sh = iw / r; if (sh > ih) { sh = ih; sw = ih * r; }
        var sx = (iw - sw) / 2, sy = (ih - sh) * (S.cadrageY == null ? .5 : S.cadrageY), src = document.createElement('canvas'), cw = Math.round(sw), ch = Math.round(sh); src.width = cw; src.height = ch; src.getContext('2d').drawImage(IMG, sx, sy, sw, sh, 0, 0, cw, ch);
        while (cw > W * 2 || ch > H * 2) { var nw = Math.max(W, Math.round(cw / 2)), nh = Math.max(H, Math.round(ch / 2)), t = document.createElement('canvas'); t.width = nw; t.height = nh; var tg = t.getContext('2d'); tg.imageSmoothingQuality = 'high'; tg.drawImage(src, 0, 0, cw, ch, 0, 0, nw, nh); src = t; cw = nw; ch = nh; }
        var f = document.createElement('canvas'); f.width = W; f.height = H; var fg = f.getContext('2d'); fg.imageSmoothingQuality = 'high'; fg.drawImage(src, 0, 0, cw, ch, 0, 0, W, H); var dd = fg.getImageData(0, 0, W, H).data; ORIG = [];
        for (var y = 0; y < H; y++) { ORIG.push([]); for (var x = 0; x < W; x++) { var o = (y * W + x) * 4; ORIG[y].push('#' + [dd[o], dd[o + 1], dd[o + 2]].map(function (u) { return u.toString(16).padStart(2, '0'); }).join('')); } } }
      function origine(gx, gy) { var R = Math.max(1, S.resolution || 1); if (!ORIG) return { couleur: PAL[1] }; if (R === 1) return { couleur: (ORIG[gy] && ORIG[gy][gx]) || PAL[1] };
        var sous = [], t = [0, 0, 0]; for (var sy = 0; sy < R; sy++) for (var sx = 0; sx < R; sx++) { var h = (ORIG[gy * R + sy] && ORIG[gy * R + sy][gx * R + sx]) || PAL[1]; sous.push(h); for (var c = 0; c < 3; c++) t[c] += parseInt(h.substr(1 + 2 * c, 2), 16); }
        return { couleur: '#' + t.map(function (v) { return Math.round(v / (R * R)).toString(16).padStart(2, '0'); }).join(''), sous: sous }; }
      /* les r x r couleurs d une tesselle en CSS : un aplat par sous-case (dégradés « pleins » posés côte à côte) */
      function fondSous(sous) { var R = Math.round(Math.sqrt(sous.length)), t = (100 / R) + '%'; return sous.map(function (h, q) { var x = q % R, y = Math.floor(q / R); return 'linear-gradient(' + h + ',' + h + ') ' + (R > 1 ? x * 100 / (R - 1) : 0) + '% ' + (R > 1 ? y * 100 / (R - 1) : 0) + '% / ' + t + ' ' + t + ' no-repeat'; }).join(','); }
      /* LES MODES (29/09) : Pixel = initEtats (aplats) ; Photo et Mosaïque = une image du mur entier (TP px par tesselle), découpée carreau par
         carreau et posée comme une photo 7 x 7 sur chaque carreau — la composition et « Exposez » la gèrent comme une photo déposée. */
      var MODE = (S.croissance && S.croissance[0] && S.croissance[0][2]) || (S.modes && S.modes[0]) || 'pixel', TUILES = null, LOUPE = null, idMode = 50000, NOMS = { pixel: 'Pixel', photo: 'Photo', mosaique: 'Mosa\u00efque', collage: 'Collage' }, DESCR = { pixel: 'pixel couleur', photo: 'une photo en grand', mosaique: 'mosa\u00efque de souvenirs', collage: 'photo-collage' }, ICONES = {}, TP = 48;
      function chargerSouvenirs(fin) { var lots = S.souvenirs || [], reste = lots.length, res = []; if (!reste) { fin(); return; }
        lots.forEach(function (L) { var im2 = new Image(); im2.onload = function () { var p = document.createElement('canvas'); p.width = p.height = 6; var pg = p.getContext('2d');
            for (var k = 0; k < L.nombre; k++) { var sx = (k % L.colonnes) * L.cote, sy = Math.floor(k / L.colonnes) * L.cote; pg.clearRect(0, 0, 6, 6); pg.drawImage(im2, sx, sy, L.cote, L.cote, 0, 0, 6, 6); var d = pg.getImageData(0, 0, 6, 6).data, r = 0, g = 0, b = 0;
              for (var q = 0; q < d.length; q += 4) { r += d[q]; g += d[q + 1]; b += d[q + 2]; } r /= 36; g /= 36; b /= 36; res.push({ img: im2, sx: sx, sy: sy, s: L.cote, lum: .2126 * r + .7152 * g + .0722 * b }); }
            if (--reste === 0) { TUILES = res.sort(function (a, c) { return a.lum - c.lum; }); fin(); } }; im2.onerror = function () { if (--reste === 0) { TUILES = res.length ? res : null; fin(); } }; im2.src = L.src; }); }
      /* LE PHOTO-COLLAGE d un carreau (7 x 7 cases) : des souvenirs partout, la photo du couple au centre sur 3 x 3 cases, un mot écrit une lettre
         par case (encre sur orange, charte), des cœurs et des flèches. Icônes : celles du fondateur si collage.icones les donne, sinon dessinées. */
      function couvrir(g, im, sx, sy, sw, sh, x, y, w, h) { var r = w / h, cw = sw, ch = sw / r; if (ch > sh) { ch = sh; cw = sh * r; } g.drawImage(im, sx + (sw - cw) / 2, sy + (sh - ch) / 2, cw, ch, x, y, w, h); }
      function icone(g, nom, x, y, t, sens) { var CO = S.collage || {}, I = CO.icones || {}, pl = ICONES.planche, k = typeof nom === 'number' ? nom : I[nom], FO = CO.fonds || ['#D96C2F'];
        g.fillStyle = nom === 'fleche' ? (CO.fondFleche || FO[FO.length - 1]) : FO[((typeof k === 'number' ? k : 3) * 7 + Math.round(x / t) + Math.round(y / t) * 3) % FO.length]; g.fillRect(x, y, t, t);
        if (pl && pl.complete && pl.naturalWidth && typeof k === 'number') { var sx = (k % I.colonnes) * I.cote, sy = Math.floor(k / I.colonnes) * I.cote; g.save(); if (sens) { g.translate(x + t, y); g.scale(-1, 1); x = 0; y = 0; } g.drawImage(pl, sx, sy, I.cote, I.cote, x + t * .1, y + t * .1, t * .8, t * .8); g.restore(); return; }
        g.save(); g.translate(x + t / 2, y + t / 2); if (nom === 'coeur') { var k = t * .3; g.fillStyle = '#D96C2F'; g.beginPath(); g.moveTo(0, k * .95); g.bezierCurveTo(-k * 1.6, -k * .1, -k * .9, -k * 1.35, 0, -k * .45); g.bezierCurveTo(k * .9, -k * 1.35, k * 1.6, -k * .1, 0, k * .95); g.fill(); }
        else { g.rotate(sens ? Math.PI : 0); g.strokeStyle = '#DEDEDE'; g.lineWidth = t * .09; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-t * .26, 0); g.lineTo(t * .24, 0); g.moveTo(t * .06, -t * .18); g.lineTo(t * .25, 0); g.lineTo(t * .06, t * .18); g.stroke(); }
        g.restore(); }
      function dessinerCollage(g, ox, oy, t) { var C = S.collage || {}, mot = String(C.mot || 'NOUS').toUpperCase().slice(0, 7), L = mot.length, d0 = Math.floor((N - L) / 2), q = 0;
        var Ic = (S.collage && S.collage.icones) || {}, choixI = Ic.choix || [], qi = 0, reserve = function (r, c) { return r === 0 || (r >= 2 && r <= 4 && c >= 1 && c <= 5); };
        for (var r = 0; r < N; r++) for (var c = 0; c < N; c++) { if (choixI.length && !reserve(r, c) && (r * N + c) % 3 === 1) { icone(g, choixI[qi++ % choixI.length], ox + c * t, oy + r * t, t); continue; } if (TUILES && TUILES.length) { var T = TUILES[(r * 17 + c * 29 + 5) % TUILES.length]; couvrir(g, T.img, T.sx, T.sy, T.s, T.s, ox + c * t, oy + r * t, t, t); } else { g.fillStyle = '#27405C'; g.fillRect(ox + c * t, oy + r * t, t, t); } }
        if (IMG) couvrir(g, IMG, 0, 0, IMG.naturalWidth, IMG.naturalHeight, ox + 2 * t, oy + 2 * t, 3 * t, 3 * t);
        for (var l = 0; l < L; l++) { var x = ox + (d0 + l) * t; g.fillStyle = '#D96C2F'; g.fillRect(x, oy, t, t); g.fillStyle = '#10181F'; g.font = Math.round(t * .72) + "px 'Quadreti Modulaire', Jura, sans-serif"; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(mot[l], x + t / 2, oy + t * .54); }
        var CC = (Ic.coeurs && Ic.coeurs.length) ? Ic.coeurs : ['coeur', 'coeur']; if (d0 > 0) icone(g, CC[0], ox + (d0 - 1) * t, oy, t); if (d0 + L < N) icone(g, CC[1 % CC.length], ox + (d0 + L) * t, oy, t);
        icone(g, 'fleche', ox + 1 * t, oy + 3 * t, t, 0); icone(g, 'fleche', ox + 5 * t, oy + 3 * t, t, 1); if (!choixI.length) { icone(g, 'coeur', ox + 3 * t, oy + 6 * t, t); icone(g, 'coeur', ox + 6 * t, oy + 6 * t, t); icone(g, 'coeur', ox, oy + 6 * t, t); } }
      (function () { var I = (S.collage && S.collage.icones) || {}; if (I.planche) { var im3 = new Image(); im3.onload = function () { if (ouvert === null && !enCroissance && MODE === 'collage') appliquerMode(MODE); }; im3.src = I.planche; ICONES.planche = im3; } if (document.fonts && document.fonts.load) document.fonts.load("40px 'Quadreti Modulaire'"); })();
      function lumHex(h) { return .2126 * parseInt(h.substr(1, 2), 16) + .7152 * parseInt(h.substr(3, 2), 16) + .0722 * parseInt(h.substr(5, 2), 16); }
      /* l image cible réduite à Wc x Hc couleurs (recadrage cover, réductions par moitiés) */
      function grilleImage(Wc, Hc) { var iw = IMG.naturalWidth, ih = IMG.naturalHeight, r = Wc / Hc, sw = iw, sh = iw / r; if (sh > ih) { sh = ih; sw = ih * r; } var src = document.createElement('canvas'), cw = Math.round(sw), ch = Math.round(sh); src.width = cw; src.height = ch;
        src.getContext('2d').drawImage(IMG, (iw - sw) / 2, (ih - sh) * (S.cadrageY == null ? .5 : S.cadrageY), sw, sh, 0, 0, cw, ch);
        while (cw > Wc * 2 || ch > Hc * 2) { var nw = Math.max(Wc, Math.round(cw / 2)), nh = Math.max(Hc, Math.round(ch / 2)), t = document.createElement('canvas'); t.width = nw; t.height = nh; var tg = t.getContext('2d'); tg.imageSmoothingQuality = 'high'; tg.drawImage(src, 0, 0, cw, ch, 0, 0, nw, nh); src = t; cw = nw; ch = nh; }
        var f = document.createElement('canvas'); f.width = Wc; f.height = Hc; var fg = f.getContext('2d'); fg.imageSmoothingQuality = 'high'; fg.drawImage(src, 0, 0, cw, ch, 0, 0, Wc, Hc); var dd = fg.getImageData(0, 0, Wc, Hc).data, out = [];
        for (var q = 0; q < Wc * Hc; q++) out.push('#' + [dd[q * 4], dd[q * 4 + 1], dd[q * 4 + 2]].map(function (u) { return u.toString(16).padStart(2, '0'); }).join('')); return out; }
      function imageMode(mode) { var D = Math.max(1, Math.round((S.mosaique && S.mosaique.division) || 1)), tp = mode === 'mosaique' ? Math.max(TP, D * 20) : TP; /* 29/09, fondateur : « splitter en 2 x 2 voire 3 x 3, ce sera beaucoup plus fin » */
        var W = N * NC * tp, H = N * NR * tp, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var g = cv.getContext('2d'); g.imageSmoothingQuality = 'high';
        if (mode === 'collage') { for (var cr = 0; cr < NR; cr++) for (var cc = 0; cc < NC; cc++) dessinerCollage(g, cc * N * tp, cr * N * tp, tp); return cv; }
        if (mode === 'photo') { var iw = IMG.naturalWidth, ih = IMG.naturalHeight, r = W / H, sw = iw, sh = iw / r; if (sh > ih) { sh = ih; sw = ih * r; } g.drawImage(IMG, (iw - sw) / 2, (ih - sh) * (S.cadrageY == null ? .5 : S.cadrageY), sw, sh, 0, 0, W, H); return cv; }
        /* Mosaïque : pour chaque tesselle, un souvenir de luminosité voisine (6 candidats, jamais le même que le voisin de gauche ou du dessus),
           posé puis teinté vers la couleur du couple à cet endroit ; tirage à graine fixe, le mur est le même à chaque visite */
        /* division D : chaque tesselle porte D x D souvenirs ; la couleur cible de chaque souvenir vient de l image réduite à (7 NC D) x (7 NR D) */
        var M = S.mosaique || {}, graine = 11, alea = function () { graine = (graine * 9301 + 49297) % 233280; return graine / 233280; }, choix = [], GW = N * NC * D, GH = N * NR * D, cibles = grilleImage(GW, GH), ps = tp / D;
        for (var y = 0; y < GH; y++) for (var x = 0; x < GW; x++) { var cible = cibles[y * GW + x], L0 = lumHex(cible), lo = 0, hi = TUILES.length - 1;
          while (lo < hi) { var m = (lo + hi) >> 1; if (TUILES[m].lum < L0) lo = m + 1; else hi = m; }
          var a0 = Math.max(0, lo - 3), a1 = Math.min(TUILES.length, a0 + 6), gauche = x > 0 ? choix[y * GW + x - 1] : -1, haut = y > 0 ? choix[(y - 1) * GW + x] : -1, k2 = a0 + Math.floor(alea() * (a1 - a0));
          for (var essai = 0; essai < 6 && (k2 === gauche || k2 === haut); essai++) k2 = a0 + Math.floor(alea() * (a1 - a0)); choix.push(k2);
          var T = TUILES[k2], px = x * ps, py = y * ps; g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1; g.drawImage(T.img, T.sx, T.sy, T.s, T.s, px, py, ps, ps);
          g.globalCompositeOperation = 'color'; g.globalAlpha = M.teinte == null ? .78 : M.teinte; g.fillStyle = cible; g.fillRect(px, py, ps, ps);
          g.globalCompositeOperation = 'source-over'; g.globalAlpha = M.voile == null ? .28 : M.voile; g.fillRect(px, py, ps, ps); }
        g.globalAlpha = 1; LOUPE = { choix: choix, cibles: cibles, GW: GW, D: D }; stL = null; return cv; }
      function etatsDepuisImage(cv) { var C = cv.width / NC; /* taille d un carreau dans l image, quelle que soit la finesse */ for (var n2 = 0; n2 < NB; n2++) { var c0 = n2 % NC, r0 = Math.floor(n2 / NC), q = document.createElement('canvas'); q.width = q.height = C;
          q.getContext('2d').drawImage(cv, c0 * C, r0 * C, C, C, 0, 0, C, C); var id = idMode++, src = q.toDataURL('image/webp', .86), cs2 = [];
          for (var k = 0; k < N * N; k++) cs2.push({ photo: { id: id, r: Math.floor(k / N), c: k % N } }); etats[n2] = { cases: cs2, photos: [{ id: id, src: src, r0: 0, c0: 0, n: N }] }; } }
      function appliquerMode(mode, vague) { MODE = mode; var m = mode; LOUPE = null; cacherLoupe(); arreterDemo(); try { if (m !== 'pixel' && m !== 'collage' && (!IMG || (m === 'mosaique' && !TUILES))) m = 'pixel';
        if (m === 'pixel') initEtats(); else etatsDepuisImage(imageMode(m)); } finally { if (ctrlL) ctrlL.classList.toggle('qb-sm-lctrl-on', !!LOUPE); } calage(); modeLbl.textContent = NB + ' carreau' + (NB > 1 ? 'x' : '') + ' \u00b7 ' + (DESCR[m] || NOMS[m]); placerCtrl(); if (typeof libMode === 'function' && btnMode) libMode();
        if (vague) { carr.forEach(function (d) { Array.prototype.forEach.call(d.children, function (i) { i.classList.remove('qb-sm-pose'); void i.offsetWidth; i.classList.add('qb-sm-pose'); }); });
          setTimeout(function () { murS.querySelectorAll('.qb-sm-pose').forEach(function (i) { i.classList.remove('qb-sm-pose'); }); }, N * N * 22 + 480); } }
      /* LA LOUPE (29/09, fondateur) : sur la mosaïque, survoler une tesselle la montre en grand, redessinée depuis les souvenirs eux-mêmes (pas un
         agrandissement du mur) : les D x D souvenirs de la tesselle, avec la même teinte ; un carreau retouché n a plus de loupe. */
      var viseur = document.createElement('b'); viseur.className = 'qb-sm-viseur'; viseur.setAttribute('aria-hidden', 'true'); murS.appendChild(viseur);
      function cacherLoupe() { loupe.classList.remove('qb-sm-loupe-on'); viseur.classList.remove('qb-sm-viseur-on'); }
      /* une tesselle du mur (X, Y en tesselles), rendue une fois à la taille tp (px réels) puis gardée : ses D x D souvenirs, teintés comme sur le mur */
      function rendreTesselle(X, Y, tp) { var cle = X + ',' + Y + ',' + tp, C = LOUPE.cache || (LOUPE.cache = {}); if (C[cle]) return C[cle];
        var cv = document.createElement('canvas'); cv.width = cv.height = tp; var g = cv.getContext('2d'), Dv = LOUPE.D, M = S.mosaique || {}, u = tp / Dv; g.imageSmoothingQuality = 'high';
        for (var sy = 0; sy < Dv; sy++) for (var sx = 0; sx < Dv; sx++) { var q = (Y * Dv + sy) * LOUPE.GW + X * Dv + sx, T = TUILES[LOUPE.choix[q]], cible = LOUPE.cibles[q], px = sx * u, py = sy * u; if (!T) continue;
          g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1; g.drawImage(T.img, T.sx, T.sy, T.s, T.s, px, py, u, u);
          g.globalCompositeOperation = 'color'; g.globalAlpha = M.teinte == null ? .78 : M.teinte; g.fillStyle = cible; g.fillRect(px, py, u, u);
          g.globalCompositeOperation = 'source-over'; g.globalAlpha = M.voile == null ? .28 : M.voile; g.fillRect(px, py, u, u); }
        return (C[cle] = cv); }
      /* la loupe regarde le point (fx, fy) du mur, en tesselles, à virgule : le verre se pose à côté du mur à cette hauteur, le viseur sur le mur */
      function regarder(fx, fy) { if (!LOUPE || !TUILES || ouvert !== null || enCroissance) { cacherLoupe(); return; }
        var W7 = N * NC, H7 = N * NR, V = LP.verre || [0, 0, 200, 200], ech = (LP.verrePx || 180) / (V[2] - V[0]), PAS = 7 * G.pp + G.j, tw = G.pp - G.j;
        function surMur(a) { var c = Math.floor(a / N); return G.j + c * PAS + (a - c * N) * G.pp; } /* position (px) d un point du mur, depuis le coin de murS */
        var rr = root.getBoundingClientRect(), mw = murS.getBoundingClientRect(), ec = 22, miroir = false, cyT = mw.top - rr.top + surMur(fy) - G.j / 2;
        var gx = mw.right - rr.left + ec, tete = document.querySelector('.qz-header'), haut = tete ? tete.getBoundingClientRect().bottom - rr.top + 8 : 8;
        if (LP.bras) { var hv = (V[3] - V[1]) * ech, gy0 = Math.max(haut, cyT - hv / 2), eX = (rr.width + 2 - gx) / ((LP.sortieBas || LP.l) - V[0]), eY = (rr.height + 2 - gy0) / (LP.h - V[1]); ech = Math.min(ech * 1.6, Math.max(ech, Math.min(eX, eY))); }
        var L = Math.round((LP.l || 400) * ech), H = Math.round((LP.h || 300) * ech), vx = V[0] * ech, vy = V[1] * ech, vw = (V[2] - V[0]) * ech, vh = (V[3] - V[1]) * ech;
        if (!LP.bras && gx - vx + L > rr.width - 8) { miroir = true; gx = mw.left - rr.left - ec - vw; }
        var gy = LP.bras ? Math.max(haut, cyT - vh / 2) : Math.max(haut, Math.min(rr.height - vh - 40, cyT - vh / 2)), vxE = miroir ? L - vx - vw : vx;
        loupe.style.width = L + 'px'; loupe.style.height = H + 'px'; loupe.style.left = Math.round(gx - vxE) + 'px'; loupe.style.top = Math.round(gy - vy) + 'px'; loupe.classList.toggle('qb-sm-loupe-miroir', miroir);
        /* le viseur : un carré de la taille d une tesselle, centré sur le point regardé */
        viseur.style.width = viseur.style.height = (tw + 2) + 'px'; viseur.style.left = (surMur(fx) - tw / 2) + 'px'; viseur.style.top = (surMur(fy) - tw / 2) + 'px'; viseur.classList.add('qb-sm-viseur-on');
        /* le verre : le mur grossi autour du point, avec ses joints (1 : 26 de la tesselle, double entre deux carreaux) */
        var cv = loupe.firstChild, dpr = Math.min(2, window.devicePixelRatio || 1), m = 4, cw = vw + 2 * m, ch = vh + 2 * m, W2 = Math.round(cw * dpr), H2 = Math.round(ch * dpr);
        cv.style.left = (vxE - m) + 'px'; cv.style.top = (vy - m) + 'px'; cv.style.width = cw + 'px'; cv.style.height = ch + 'px'; if (cv.width !== W2 || cv.height !== H2) { cv.width = W2; cv.height = H2; }
        var g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, cw, ch); g.save(); g.beginPath(); g.ellipse(cw / 2, ch / 2, cw / 2, ch / 2, 0, 0, Math.PI * 2); g.clip();
        g.fillStyle = LP.fondMur || '#1B2731'; g.fillRect(0, 0, cw, ch);
        var t = vw * (LP.tesselle || .5), jt = t / 26, P = t + jt, tp = Math.round(t * dpr);
        function dansVerre(a) { return a * P + Math.floor(a / N) * jt; }
        var cx = cw / 2 - dansVerre(fx), cy = ch / 2 - dansVerre(fy), X0 = Math.floor(fx), Y0 = Math.floor(fy);
        for (var YY = Y0 - 3; YY <= Y0 + 3; YY++) for (var XX = X0 - 3; XX <= X0 + 3; XX++) { if (XX < 0 || YY < 0 || XX >= W7 || YY >= H7) continue; if (modifies[Math.floor(YY / N) * NC + Math.floor(XX / N)]) continue;
          g.drawImage(rendreTesselle(XX, YY, tp), cx + dansVerre(XX), cy + dansVerre(YY), t, t); }
        var rf = g.createRadialGradient(cw * .32, ch * .26, 0, cw * .32, ch * .26, cw * .55); rf.addColorStop(0, 'rgba(255,255,255,.22)'); rf.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rf; g.fillRect(0, 0, cw, ch); g.restore();
        var lib = loupe.lastChild; lib.textContent = '1 tesselle \u00b7 ' + (LOUPE.D * LOUPE.D) + ' souvenirs'; lib.style.left = (vxE + vw / 2) + 'px'; lib.style.top = (vy + vh + 12) + 'px';
        loupe.classList.add('qb-sm-loupe-on'); }
      var ETAPES = ((LP.montage && LP.montage.etapes) || []).map(function (e) { var im = new Image(); im.decoding = 'async'; im.src = e[0]; return { img: im, legende: e[1] }; });
      function peindreEtape(k, a) { var E = ETAPES[k], P0 = ETAPES[k - 1], cv = loupe.firstChild, cw = parseFloat(cv.style.width), ch = parseFloat(cv.style.height); if (!E || !cw) return;
        var g = cv.getContext('2d'); g.save(); g.beginPath(); g.ellipse(cw / 2, ch / 2, cw / 2, ch / 2, 0, 0, Math.PI * 2); g.clip();
        function poser(im, al) { if (!im.complete || !im.naturalWidth) return; var c = Math.max(cw, ch); g.globalAlpha = al; g.drawImage(im, (cw - c) / 2, (ch - c) / 2, c, c); }
        if (a < 1 && P0) poser(P0.img, 1); poser(E.img, a); g.globalAlpha = 1;
        var rf = g.createRadialGradient(cw * .32, ch * .26, 0, cw * .32, ch * .26, cw * .55); rf.addColorStop(0, 'rgba(255,255,255,.18)'); rf.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rf; g.fillRect(0, 0, cw, ch); g.restore();
        loupe.lastChild.textContent = E.legende; viseur.classList.remove('qb-sm-viseur-on'); }
      function figer() { if (!stL) return; regarder(stL.fx, stL.fy); if (stL.m0 != null && stL.mEl != null) peindreEtape(Math.min(ETAPES.length - 1, Math.floor(stL.mEl / ((LP.montage && LP.montage.pas) || 1800))), 1); } /* pause : la loupe reste sur ce qu elle montrait, mur ou étape du montage */
      function montrerLoupe(n, k) { if (modifies[n]) { cacherLoupe(); return; } regarder((n % NC) * N + k % N + .5, Math.floor(n / NC) * N + Math.floor(k / N) + .5); }
      function tesselleSous(e) { var i = e.target; if (!i || i.tagName !== 'I') return null; var d = i.parentNode, n = carr.indexOf(d); if (n < 0) return null; return { n: n, k: Array.prototype.indexOf.call(d.children, i) }; }
      murS.addEventListener('mousemove', function (e) { if (etatL === 'fin') return; arreterDemo(); var t = tesselleSous(e); if (t) montrerLoupe(t.n, t.k); else cacherLoupe(); });
      murS.addEventListener('mouseleave', function () { if (etatL === 'pause' && stL) { figer(); return; } cacherLoupe(); relancerDemo(LP.reprise || 4000); });
      /* LE BALAYAGE : de gauche à droite sur une rangée, puis retour sur la suivante, en continu, tant que rien d autre ne se passe */
      var tDemo = null, rafL = 0, etatL = 'lecture', stL = null, ctrlL = null, geoL = null;
      function placerCtrl() { if (!ctrlL || !geoL) return; var lbw = modeLbl.offsetWidth || 0; ctrlL.style.right = Math.round(geoL.W - (geoL.cx - lbw / 2 - 10)) + 'px'; ctrlL.style.top = Math.round(geoL.y + (modeLbl.offsetHeight || 11) / 2) + 'px'; } /* à gauche de l étiquette, 10 px avant, centrée sur sa ligne ; replacée quand le texte change */
      function arreterDemo() { clearTimeout(tDemo); tDemo = null; cancelAnimationFrame(rafL); rafL = 0; }
      function relancerDemo(delai) { arreterDemo(); if (etatL === 'lecture') tDemo = setTimeout(demoLoupe, delai || 0); }
      function demoLoupe() { arreterDemo(); if (!LOUPE || ouvert !== null || enCroissance || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
        var W7 = N * NC, H7 = N * NR, xa = .1 * W7, xb = .9 * W7, R = (LP.rangees && LP.rangees.length ? LP.rangees : [.5]).map(function (v) { return v * H7; }), v = LP.vitesse || 1.6;
        var st = stL || (stL = { fx: xa, fy: R[0], r: 0, sens: 1, t: 0, passes: 0, m0: ETAPES.length ? -1 : null }); st.t = 0; var MG = LP.montage || {}, PM = MG.pas || 1800, FD = MG.fondu || 350;
        if (st.m0 != null && st.mEl != null) st.m0 = -(st.mEl + 1);
        function image(now) { if (ouvert !== null || !LOUPE || enCroissance) { rafL = 0; cacherLoupe(); return; }
          if (st.m0 != null) { if (st.m0 < 0) st.m0 = now - (-st.m0 - 1); var el = now - st.m0, k = Math.floor(el / PM); /* reprise après une pause : m0 négatif = temps déjà écoulé */
            if (k < ETAPES.length) { st.t = now; regarder(st.fx, st.fy); peindreEtape(k, Math.min(1, (el - k * PM) / FD)); st.mEl = el; rafL = requestAnimationFrame(image); return; }
            st.m0 = null; st.t = 0; }
          var dt = st.t ? Math.min(.1, (now - st.t) / 1000) : 0; st.t = now; st.fx += st.sens * v * dt;
          if (st.fx > xb || st.fx < xa) { st.fx = Math.max(xa, Math.min(xb, st.fx)); st.sens = -st.sens; st.r = (st.r + 1) % R.length; st.passes++;
            if (LP.cycles && st.passes >= LP.cycles) { rafL = 0; stL = null; etatL = 'repos'; if (ctrlL && ctrlL._marquer) ctrlL._marquer(); cacherLoupe(); return; }
            if (ETAPES.length && st.passes % (MG.apres || 1) === 0) st.m0 = now; }
          st.fy += (R[st.r] - st.fy) * Math.min(1, dt * 2.5); regarder(st.fx, st.fy); rafL = requestAnimationFrame(image); }
        rafL = requestAnimationFrame(image); }
      /* LA COMMANDE DE LA LOUPE : une icône loupe discrète ; ouverte, Lecture / Pause / Fin (icônes lucide, trait currentColor) */
      (function () { var ic = function (d) { return '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; };
        ctrlL = document.createElement('div'); ctrlL.className = 'qb-sm-lctrl'; ctrlL.setAttribute('role', 'group'); ctrlL.setAttribute('aria-label', 'Loupe');
        ctrlL.innerHTML = '<span class="qb-sm-lctrl-tir"><button type="button" data-l="lecture" aria-label="Lecture : la loupe balaie le mur" title="Lecture">' + ic('<polygon points="6 3 20 12 6 21 6 3"/>') + '</button>' +
          '<button type="button" data-l="pause" aria-label="Pause : la loupe s arr\u00eate sur place" title="Pause">' + ic('<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>') + '</button>' +
          '<button type="button" data-l="fin" aria-label="Fin : ranger la loupe" title="Fin">' + ic('<rect x="5" y="5" width="14" height="14" rx="1"/>') + '</button></span>' +
          '<button type="button" class="qb-sm-lctrl-loupe" aria-expanded="false" aria-label="Commandes de la loupe" title="Loupe">' + ic('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>') + '</button>';
        root.appendChild(ctrlL); var btnL = ctrlL.querySelector('.qb-sm-lctrl-loupe');
        function marquer() { ctrlL.querySelectorAll('[data-l]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-l') === etatL ? 'true' : 'false'); }); ctrlL.setAttribute('data-etat', etatL); }
        btnL.addEventListener('click', function () { var o = !ctrlL.classList.contains('qb-sm-lctrl-ouvert'); ctrlL.classList.toggle('qb-sm-lctrl-ouvert', o); btnL.setAttribute('aria-expanded', o ? 'true' : 'false'); });
        ctrlL.querySelectorAll('[data-l]').forEach(function (b) { b.addEventListener('click', function () { etatL = b.getAttribute('data-l'); marquer();
          if (etatL === 'lecture') { if (stL && !stL.m0 && stL.passes >= (LP.cycles || Infinity)) stL = null; demoLoupe(); } else if (etatL === 'pause') { arreterDemo(); if (stL) figer(); } else { arreterDemo(); cacherLoupe(); } }); });
        ctrlL._marquer = marquer; marquer(); })();
      function initEtats() { for (var n = 0; n < NB; n++) { var c0 = n % NC, r0 = Math.floor(n / NC), cs2 = []; for (var k = 0; k < N * N; k++) cs2.push(origine(c0 * N + k % N, r0 * N + Math.floor(k / N))); etats[n] = { cases: cs2, photos: [] }; } }
      /* une tesselle du mur : sa couleur, ou son morceau de photo (même découpe que la grille démo, au pas du mur) */
      function habiller(i, x, ph) { var w = G.pp - G.j; if (x.photo && ph) { var px = ph.n * w + (ph.n - 1) * G.j; i.style.backgroundImage = 'url("' + ph.src + '")'; i.style.backgroundSize = px + 'px ' + px + 'px'; i.style.backgroundPosition = (-(x.photo.c * G.pp)) + 'px ' + (-(x.photo.r * G.pp)) + 'px'; i.style.backgroundColor = ''; }
        else if (x.sous) { i.style.background = fondSous(x.sous); i.style.backgroundColor = x.couleur; }
        else { i.style.background = ''; i.style.backgroundImage = ''; i.style.backgroundColor = x.couleur; } }
      function peindreCarreau(n) { var e = etats[n]; Array.prototype.forEach.call(carr[n].children, function (i, k) { var x = e.cases[k], ph = null; if (x.photo) for (var q = 0; q < e.photos.length; q++) if (e.photos[q].id === x.photo.id) ph = e.photos[q]; habiller(i, x, ph); }); }
      /* calage : la photo couvre le bandeau, le canapé au centre ; le mur à l échelle du canapé, AU PIXEL ENTIER */
      function calage() { var rr = root.getBoundingClientRect(), W = rr.width, H = rr.height, sc = Math.max(W / PH.w, H / PH.h) * (S.zoom || 1), dw = PH.w * sc, dh = PH.h * sc;
        var ox = Math.min(0, Math.max(W - dw, W * .6 - (PH.cx0 + PH.cx1) / 2 * sc)), oy = Math.min(0, Math.max(H - dh, H * .97 - PH.pied * sc));
        root.style.backgroundSize = 'auto, ' + dw + 'px ' + dh + 'px'; root.style.backgroundPosition = '0 0, ' + ox + 'px ' + oy + 'px';
        var pxcm = (PH.cx1 - PH.cx0) / (S.canapeCm || 220) * sc, pp = Math.max(2, Math.round(18.9 * pxcm / 7)), j = Math.max(1, Math.round(pp / 27)), j2 = 2 * j, TT = 7 * pp - j, PAS = TT + j2, LW = NC * PAS - j2, LH = NR * PAS - j2;
        var bx = ox + (PH.cx0 + PH.cx1) / 2 * sc;
        /* 28/09 soir, fondateur : « centre verticalement le tableau et le texte » -- le bloc (phrase « Le mur est à vous. », 14 px, le mur) est centré
           entre le bas de la barre du haut et le haut du dossier du canapé (repère de la photo). Remplace l accrochage à 25 cm au-dessus du dossier. */
        var tete = document.querySelector('.qz-header'), hautZone = tete ? Math.max(0, tete.getBoundingClientRect().bottom - rr.top) : 0, basZone = oy + PH.dossier * sc, ih = invite.offsetHeight || 20;
        var lbH = (modeLbl.offsetHeight || 11) + 12, X0 = Math.round(bx - LW / 2), Y0 = Math.round((hautZone + basZone) / 2 - LH / 2 + (14 + ih - lbH) / 2); /* 29/09 : le bloc entier (phrase, mur, étiquette du dessous) centré, marges égales */
        /* 29/09 : la caméra — tout grossit de CAM autour du centre du mur ; au repos le pas reste au pixel entier, pendant le recul il glisse */
        if (CAM !== 1) { var Fx = X0 + LW / 2, Fy = Y0 + LH / 2, ppf = pp * CAM; sc *= CAM; dw *= CAM; dh *= CAM; ox = Fx - (Fx - ox) * CAM; oy = Fy - (Fy - oy) * CAM;
          if (camFluide) { pp = ppf; j = Math.max(1, ppf / 27); } else { pp = Math.max(2, Math.round(ppf)); j = Math.max(1, Math.round(pp / 27)); }
          j2 = 2 * j; TT = 7 * pp - j; PAS = TT + j2; LW = NC * PAS - j2; LH = NR * PAS - j2; X0 = Fx - LW / 2; Y0 = Fy - LH / 2; if (!camFluide) { X0 = Math.round(X0); Y0 = Math.round(Y0); }
          root.style.backgroundSize = 'auto, ' + dw + 'px ' + dh + 'px'; root.style.backgroundPosition = '0 0, ' + ox + 'px ' + oy + 'px'; }
        G = { pp: pp, j: j };
        murS.style.left = (X0 - j) + 'px'; murS.style.top = (Y0 - j) + 'px'; murS.style.width = (LW + 2 * j) + 'px'; murS.style.height = (LH + 2 * j) + 'px';
        carr.forEach(function (d, n) { d.style.left = (j + (n % NC) * PAS) + 'px'; d.style.top = (j + Math.floor(n / NC) * PAS) + 'px'; d.style.width = d.style.height = TT + 'px'; d.style.setProperty('--w', (pp - j) + 'px'); d.style.setProperty('--j', j + 'px'); });
        invite.style.left = echelle.style.left = modeLbl.style.left = (X0 + LW / 2) + 'px'; invite.style.top = Y0 + 'px'; echelle.style.top = modeLbl.style.top = (Y0 + LH + j) + 'px';
        geoL = { W: rr.width, cx: X0 + LW / 2, y: Y0 + LH + j + 12 }; placerCtrl();
        for (var n = 0; n < NB; n++) if (etats[n]) peindreCarreau(n); }
      /* la tesselle qui bouge : toutes les « rythme » ms, sur un autre carreau ; la survoler ouvre CE carreau */
      function bouger() { if (ouvert !== null) return; var libres = []; for (var n = 0; n < NB; n++) if (n !== actif || NB === 1) libres.push(n); actif = libres[Math.floor(Math.random() * libres.length)];
        murS.querySelectorAll('.qb-sm-bouge').forEach(function (x) { x.classList.remove('qb-sm-bouge'); }); var i = carr[actif].children[Math.floor(Math.random() * N * N)]; void i.offsetWidth; i.classList.add('qb-sm-bouge');
        var cible = actif; i.onmouseenter = function () { tSurvol = setTimeout(function () { if (i.classList.contains('qb-sm-bouge')) ouvrir(cible); }, 160); }; i.onmouseleave = function () { clearTimeout(tSurvol); }; }
      function lancerBouge() { clearInterval(tBouge); bouger(); tBouge = setInterval(bouger, S.rythme || 2000); }
      /* charger un carreau dans la grille démo (couleurs ET photos), et l en relire */
      function charger(e) { photos = e.photos.map(function (p) { return { id: p.id, src: p.src, r0: p.r0, c0: p.c0, n: p.n }; }); photos.forEach(function (p) { if (p.id >= idPhoto) idPhoto = p.id + 1; });
        e.cases.forEach(function (x, k) { if (x.photo) { var ph = null; for (var q = 0; q < photos.length; q++) if (photos[q].id === x.photo.id) ph = photos[q]; if (ph) { var c = cases[k]; c.photo = { id: ph.id, r: x.photo.r, c: x.photo.c }; c.el.className = 'qb-vt qb-vt-photo'; c.el.style.cssText = ''; c.el.style.backgroundImage = 'url("' + ph.src + '")'; return; } } peindre(k, x.couleur); if (x.sous) { cases[k].sous = x.sous; cases[k].el.style.background = fondSous(x.sous); } });
        caler(); }
      function relire() { return { cases: cases.map(function (x) { return x.photo ? { photo: { id: x.photo.id, r: x.photo.r, c: x.photo.c } } : (x.sous ? { couleur: x.couleur, sous: x.sous } : { couleur: x.couleur }); }), photos: photos.map(function (p) { return { id: p.id, src: p.src, r0: p.r0, c0: p.c0, n: p.n }; }) }; }
      /* le carreau vient : la grille démo part de la place du carreau au mur et grandit jusqu à sa place (FLIP) */
      function vol(depuis, duree) { var a = depuis.getBoundingClientRect(), b = grille.getBoundingClientRect(), k = a.width / b.width;
        grille.style.transition = 'none'; grille.style.transformOrigin = '0 0'; grille.style.transform = 'translate(' + (a.left - b.left) + 'px,' + (a.top - b.top) + 'px) scale(' + k + ')'; void grille.offsetWidth;
        grille.style.transition = 'transform ' + duree + 'ms cubic-bezier(.2,.8,.2,1)'; grille.style.transform = 'none'; setTimeout(function () { grille.style.transition = ''; }, duree + 30); }
      function ouvrir(n) { if (ouvert !== null || enCroissance) return; clearTimeout(tSurvol); arreterDemo(); cacherLoupe(); ouvert = n; instantane = JSON.stringify(etats[n]); murS.querySelectorAll('.qb-sm-bouge').forEach(function (x) { x.classList.remove('qb-sm-bouge'); });
        charger(etats[n]); root.classList.remove('qb-sm-repos'); root.classList.add('qb-sm-compose'); carr[n].classList.add('qb-sm-parti'); centrerOutil();
        etat.textContent = 'carreau ' + (n + 1) + ' : cliquez une case, d\u00e9posez une photo'; vol(carr[n], 600);
        setTimeout(function () { var b = palette.querySelector('.qb-vif-teinte'); if (b) b.focus({ preventScroll: true }); }, 650); }
      function auMur() { if (ouvert === null) return; var n = ouvert; etats[n] = relire(); if (JSON.stringify(etats[n]) !== instantane) modifies[n] = true; var a = grille.getBoundingClientRect(), b = carr[n].getBoundingClientRect(), k = b.width / a.width;
        grille.style.transformOrigin = '0 0'; grille.style.transition = 'transform 420ms cubic-bezier(.4,0,.2,1)'; grille.style.transform = 'translate(' + (b.left - a.left) + 'px,' + (b.top - a.top) + 'px) scale(' + k + ')';
        setTimeout(function () { root.classList.remove('qb-sm-compose'); root.classList.add('qb-sm-repos'); grille.style.transition = ''; grille.style.transform = ''; mur.style.transform = ''; peindreCarreau(n); carr[n].classList.remove('qb-sm-parti');
          Array.prototype.forEach.call(carr[n].children, function (i) { i.classList.remove('qb-sm-pose'); void i.offsetWidth; i.classList.add('qb-sm-pose'); });
          setTimeout(function () { carr[n].querySelectorAll('.qb-sm-pose').forEach(function (i) { i.classList.remove('qb-sm-pose'); }); ouvert = null; carr[n].focus({ preventScroll: true }); lancerBouge(); relancerDemo(LP.reprise || 4000); }, N * N * 22 + 480); }, 430); }
      function clavier(e) { if (e.key === 'Escape' && ouvert !== null) auMur(); }
      /* 28/09 soir, fondateur : « l outil étant masqué, ne pourrait-on pas plutôt le centrer dans le bandeau ? » -- à l ouverture, le mur démo (la grille
         et sa boîte à outils) est déplacé pour que la GRILLE soit au centre du bandeau : au milieu en largeur, et en hauteur entre la barre du haut et
         la bande des icônes. Au repos, il reste caché à sa place d origine. */
      function centrerOutil() { mur.style.transform = ''; var g = grille.getBoundingClientRect(), rr = root.getBoundingClientRect(), tete = document.querySelector('.qz-header'), gestes = root.querySelector('.qb-gestes');
        var haut = tete ? tete.getBoundingClientRect().bottom : rr.top, bas = gestes && gestes.getBoundingClientRect().height ? gestes.getBoundingClientRect().top : rr.bottom;
        mur.style.transform = 'translate(' + Math.round(rr.left + rr.width / 2 - (g.left + g.width / 2)) + 'px,' + Math.round((haut + bas) / 2 - (g.top + g.height / 2)) + 'px)'; }
      window.addEventListener('resize', function () { if (ouvert !== null) centrerOutil(); });
      /* 29/09, fondateur (« on rajoute les modes pour tester ») : UN bouton « Mode » dans la boîte à outils, qui fait passer tout le mur au mode suivant
         (Pixel, Photo, Mosaïque) ; les carreaux déjà retouchés gardent leurs retouches ; le carreau ouvert est rechargé s il n a pas été touché. */
      var instantane = '', modifies = {}, btnMode = document.createElement('button'); btnMode.type = 'button'; btnMode.className = 'qb-vif-btn qb-vif-mode';
      function libMode() { var nom = NOMS[MODE] || MODE; btnMode.innerHTML = '<span class="qb-vif-t">' + nom.slice(0, 3).toUpperCase() + '</span><span class="qb-vif-lib">Mode : ' + nom + '</span>'; btnMode.title = 'Mode : ' + nom + ' (cliquer pour changer)'; btnMode.setAttribute('aria-label', 'Mode du mur : ' + nom + '. Cliquer pour passer au suivant'); }
      function changerMode() { var modes = S.modes && S.modes.length ? S.modes : ['pixel']; var suivant = modes[(modes.indexOf(MODE) + 1) % modes.length];
        var courant = ouvert !== null ? relire() : null, ouvertTouche = ouvert !== null && JSON.stringify(courant) !== instantane, garde = etats.slice();
        appliquerMode(suivant, false); for (var q = 0; q < NB; q++) if (modifies[q] && garde[q]) etats[q] = garde[q];
        if (ouvert !== null) { if (ouvertTouche) etats[ouvert] = courant; else { charger(etats[ouvert]); instantane = JSON.stringify(etats[ouvert]); } }
        calage(); libMode(); etat.textContent = 'mur en mode ' + (NOMS[MODE] || MODE); }
      libMode(); btnMode.addEventListener('click', changerMode); var railSM = mur.querySelector('.qb-vif-rail'), designerSM = railSM && railSM.querySelector('.qb-vif-designer'); if (railSM) railSM.insertBefore(btnMode, designerSM || null);
      voile.addEventListener('click', auMur); btnExp.addEventListener('click', auMur); document.addEventListener('keydown', clavier); window.addEventListener('resize', calage);
      var stopAvant = mur._vivantStop; mur._vivantStop = function () { stopAvant(); clearInterval(tBouge); clearTimeout(tSurvol); document.removeEventListener('keydown', clavier); window.removeEventListener('resize', calage);
        arreterDemo(); [voile, murS, invite, echelle, modeLbl, btnExp, btnMode, loupe, ctrlL].forEach(function (e) { e.remove(); }); btnSalon.hidden = false; btnSalon.style.display = ''; root.classList.remove('qb-sm', 'qb-sm-repos', 'qb-sm-compose'); root.style.backgroundSize = ''; root.style.backgroundPosition = ''; grille.style.transform = ''; mur.style.transform = ''; };
      /* l image : chargée une fois ; en attendant (ou si elle manque), le mur prend la teinte navy */
      initEtats(); calage();
      var im = new Image(); im.onload = function () { IMG = im; if (ouvert === null && !enCroissance) { echantillonner(); appliquerMode(MODE); } }; im.src = S.image || S.portrait;
      chargerSouvenirs(function () { if (ouvert === null && !enCroissance && (MODE === 'mosaique' || MODE === 'collage')) appliquerMode(MODE); });
      modeLbl.textContent = 'Mode ' + NOMS[MODE];
      /* LA CROISSANCE (28/09 soir, fondateur : « pour le waouh ») : à l arrivée, le mur passe d une étape à la suivante (réglage croissance) toutes les
         pasCroissance ms ; à chaque étape l image est recalculée au nouveau nombre de tesselles et les tesselles se clipsent. Puis la tesselle qui bouge. */
      function etape(nc, nr, mode) { NC = nc; NR = nr; NB = NC * NR; if (mode) MODE = mode; construireCarreaux(); echantillonner(); appliquerMode(MODE);
        carr.forEach(function (d) { Array.prototype.forEach.call(d.children, function (i) { i.classList.add('qb-sm-pose'); }); });
        setTimeout(function () { murS.querySelectorAll('.qb-sm-pose').forEach(function (i) { i.classList.remove('qb-sm-pose'); }); }, N * N * 22 + 480); }
      function camera(k, ms, fin) { cancelAnimationFrame(rafCam); var k0 = CAM, t0 = null; if (!ms || Math.abs(k - k0) < .001) { CAM = k; camFluide = false; calage(); if (fin) fin(); return; } camFluide = true;
        (function f(now) { if (now !== undefined) { if (t0 === null) t0 = now; var u = Math.min(1, (now - t0) / ms), e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; CAM = k0 + (k - k0) * e; calage();
          if (u >= 1) { camFluide = false; calage(); if (fin) fin(); return; } } rafCam = requestAnimationFrame(f); })(); }
      function croissance() { var reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var modes = S.modes && S.modes.length ? S.modes : ['pixel'];
        var parTaille = etapes.some(function (e) { return e[2]; }); /* chaque taille a son contenu : la démo s arrête à la dernière taille */
        if (reduit || etapes.length < 2) { var d0 = etapes[etapes.length - 1]; MODE = d0[2] || modes[modes.length - 1]; CAM = d0[3] || 1; etape(d0[0], d0[1], d0[2]); lancerBouge(); return; }
        /* la démo : croissance dans le premier mode, puis chaque mode suivant, une vague de tesselles à chaque changement ; le mur reste sur le dernier */
        enCroissance = true; MODE = modes[0]; var i = 0, jm = 1;
        function finir() { setTimeout(function () { enCroissance = false; lancerBouge(); relancerDemo(900); }, 1200); }
        (function suite() { var E = etapes[i], der = parTaille && i === etapes.length - 1;
          if (i === 0 && NC === E[0] && NR === E[1]) { /* le premier carreau est déjà au mur : on ne le repose pas une seconde fois */ if (der) finir(); } else if (i > 0 && E[3] !== undefined) { camera(E[3], S.dureeCamera || 1400, function () { etape(E[0], E[1], E[2]); if (der) finir(); }); } else { etape(E[0], E[1], E[2]); if (der) finir(); }
          i++; if (i < etapes.length) { setTimeout(suite, S.pasCroissance || 2600); return; }
          if (parTaille) return; /* la suite (tesselle qui bouge, loupe) part de finir(), une fois le dernier agrandissement posé */
          (function modeSuivant() { setTimeout(function () { if (jm < modes.length) { appliquerMode(modes[jm++], true); modeSuivant(); } else { enCroissance = false; lancerBouge(); } }, jm === 1 ? (S.pasCroissance || 2600) : (S.pasMode || 4200)); })(); })(); }
      diapo = { demarrer: function (delai) { setTimeout(croissance, Math.max(0, delai) * 1000); } };
      if (lanceDeja) { var dF = etapes[etapes.length - 1]; MODE = dF[2] || (S.modes && S.modes[S.modes.length - 1]) || 'pixel'; CAM = dF[3] || 1; etape(dF[0], dF[1], dF[2]); lancerBouge(); } /* reconstruction (bascule bureau/mobile) : directement le mur final */
      sm = { auMur: auMur, ouvrir: ouvrir };
    }
    /* minutage des textes : comme le diaporama, le titre « Changez » arrive au premier changement du mur */
    var t0 = REGLAGES.depart + REGLAGES.dg + p; R.setProperty('--tc', t0.toFixed(2) + 's'); R.setProperty('--P', '60s');
    completPose = t0 + .8; tChangement = t0 + 2; R.setProperty('--t-changement', tChangement.toFixed(2) + 's');
    var tl1 = T.quand === 'ouverture' ? REGLAGES.depart + .3 : tChangement; var l1 = document.querySelector('.qb-l1'); var lettresB1 = l1 ? l1.querySelectorAll('.qb-l').length : 0;
    var durB1 = T.mode === 'clip' || T.mode === 'dactylo' ? (lettresB1 - 1) * T.ln + .45 : T.dn; var tl4 = tl1 + durB1 + p;
    R.setProperty('--tl1', tl1.toFixed(2) + 's'); R.setProperty('--tl2', tl1.toFixed(2) + 's'); R.setProperty('--tl3', tl1.toFixed(2) + 's'); R.setProperty('--tl4', tl4.toFixed(2) + 's');
  }
  var preparer = function () {
    if (REGLAGES.vivant && REGLAGES.vivant.actif) { construireVivant(); return; }
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
      /* 26/09 : avec le LOGO 14, le mur attend la fin de son deroule (window.QZ14_FIN) au lieu de la derniere ligne de l ancien logo */
      var finLogo = (window.QZ14_FIN && document.querySelector('#qzLogoRow.qz-l14')) ? window.QZ14_FIN : tb + .5;
      setTimeout(lancer, Math.round((finLogo + 1) * 1000)); return true;
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
    var partir = function () { if (lance) return; if (document.documentElement.classList.contains('qz-entree')) { window.addEventListener('qz-entree-fin', function () { setTimeout(partir, 80); }, { once: true }); return; } /* 28/09 : page d entree, le mur attend la fin du voile */ lance = true; poserTrace(.3); document.documentElement.classList.remove('qb-attente', 'qb-attente-icones'); /* pas de sequence : tout visible */ setTimeout(lancer, PAUSE_APRES_LOGO); };
    var row = document.getElementById('qzLogoRow');
    if (!row) { partir(); return; }
    var attendreFin = function () {
      if (demarrerSequence()) return; /* sequence generale : le mur part par minuteur a la fin des boutons */
      var lettres = row.querySelectorAll('.qz-naming .qz-l'); var dernier = lettres[lettres.length - 1];
      /* 26/09 : LOGO 14 -- plus de lettres de naming ; la fin du logo est celle de la categorie (ou du point du i si la categorie est masquee) */
      if (row.classList.contains('qz-l14')) { var c14 = row.querySelector('.qz-wm14 > .qz-cat'); dernier = (c14 && c14.getClientRects().length) ? c14 : row.querySelector('.qz14-pt'); }
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

/* 15/09 — la vraie largeur VISIBLE de la page, publiee en variable CSS.
   `100vw` inclut la barre de defilement : tout element qu on veut poser pile au bord gauche de la page en partant du
   centre (marge negative calculee depuis 100vw) atterrit une demi-barre trop a gauche — mesure a -7,5 px sur un 1600.
   Invisible tant que l element SORT du cadre ; visible des qu il a un bord dessine, comme la carte de titre. */
(function () {
  var r = document.documentElement;
  var poser = function () { r.style.setProperty('--qz-larg-ecran', r.clientWidth + 'px'); };
  poser();
  addEventListener('resize', poser);
})();
