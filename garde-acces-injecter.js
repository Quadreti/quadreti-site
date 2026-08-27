// Script ponctuel pour appliquer/retirer l'ecran de mot de passe sur toutes
// les pages du site (usage interne Claude Code -- pas un fichier deploye).
// Usage : node garde-acces-injecter.js appliquer|retirer
'use strict';
const fs = require('fs');
const path = require('path');

const MARQUEUR_DEBUT = '<!-- GARDE-ACCES-DEBUT -->';
const MARQUEUR_FIN = '<!-- GARDE-ACCES-FIN -->';
const MDP = 'qua=dre22TI2008proJet+';

const BLOC = MARQUEUR_DEBUT + '\n<script>\n' +
"(function(){\n" +
"  var MDP = '" + MDP.replace(/'/g, "\\'") + "';\n" +
"  var CLE = 'quadretiAccesPreview';\n" +
"  if (localStorage.getItem(CLE) === '1') return;\n" +
"  document.documentElement.style.visibility = 'hidden';\n" +
"  document.addEventListener('DOMContentLoaded', function(){\n" +
"    var voile = document.createElement('div');\n" +
"    voile.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#2B353E;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;font-family:sans-serif;color:#fff;padding:20px;text-align:center;';\n" +
"    voile.innerHTML = '<div style=\"font-size:15px;\">Site en pr\\u00e9paration \\u2014 acc\\u00e8s r\\u00e9serv\\u00e9</div>' +\n" +
"      '<form id=\"qdtFormAcces\" style=\"display:flex;gap:8px;flex-wrap:wrap;justify-content:center;\"><input type=\"password\" id=\"qdtMdp\" placeholder=\"Mot de passe\" autocomplete=\"off\" style=\"padding:10px 14px;border-radius:8px;border:none;font-size:14px;min-width:200px;\"><button type=\"submit\" style=\"padding:10px 18px;border-radius:8px;border:none;background:#E2725B;color:#fff;font-weight:700;cursor:pointer;\">Entrer</button></form>' +\n" +
"      '<div id=\"qdtErreur\" style=\"color:#ffb4a6;font-size:12px;display:none;\">Mot de passe incorrect.</div>';\n" +
"    document.body.appendChild(voile);\n" +
"    document.documentElement.style.visibility = 'visible';\n" +
"    document.getElementById('qdtMdp').focus();\n" +
"    document.getElementById('qdtFormAcces').addEventListener('submit', function(e){\n" +
"      e.preventDefault();\n" +
"      if (document.getElementById('qdtMdp').value === MDP){\n" +
"        try { localStorage.setItem(CLE, '1'); } catch(err){}\n" +
"        voile.remove();\n" +
"      } else {\n" +
"        document.getElementById('qdtErreur').style.display = 'block';\n" +
"        document.getElementById('qdtMdp').value = '';\n" +
"        document.getElementById('qdtMdp').focus();\n" +
"      }\n" +
"    });\n" +
"  });\n" +
"})();\n" +
'</script>\n' + MARQUEUR_FIN;

function listerHtml(dossier, resultat){
  resultat = resultat || [];
  fs.readdirSync(dossier, { withFileTypes: true }).forEach(function(entree){
    const chemin = path.join(dossier, entree.name);
    if (entree.isDirectory()) listerHtml(chemin, resultat);
    else if (entree.name.endsWith('.html')) resultat.push(chemin);
  });
  return resultat;
}

const mode = process.argv[2];
if (mode !== 'appliquer' && mode !== 'retirer'){
  console.error('Usage : node garde-acces-injecter.js appliquer|retirer');
  process.exit(1);
}

const fichiers = listerHtml(__dirname);
let modifies = 0;
fichiers.forEach(function(fichier){
  let contenu = fs.readFileSync(fichier, 'utf8');
  const dejaPresent = contenu.indexOf(MARQUEUR_DEBUT) !== -1;

  if (mode === 'appliquer'){
    if (dejaPresent) return;
    const cible = '<meta charset="UTF-8">';
    if (contenu.indexOf(cible) === -1){ console.warn('Pas de balise charset trouvee, ignore : ' + fichier); return; }
    contenu = contenu.replace(cible, cible + '\n' + BLOC);
    fs.writeFileSync(fichier, contenu, 'utf8');
    modifies++;
  } else {
    if (!dejaPresent) return;
    const debut = contenu.indexOf(MARQUEUR_DEBUT);
    const fin = contenu.indexOf(MARQUEUR_FIN) + MARQUEUR_FIN.length;
    contenu = contenu.slice(0, debut) + contenu.slice(fin);
    contenu = contenu.replace(/\n\n\n+/g, '\n\n'); // nettoie les lignes vides laissees par le retrait
    fs.writeFileSync(fichier, contenu, 'utf8');
    modifies++;
  }
});

console.log(mode + ' : ' + modifies + ' fichier(s) modifie(s) sur ' + fichiers.length + ' trouve(s).');
