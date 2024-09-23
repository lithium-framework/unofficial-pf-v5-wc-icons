const fs = require('fs');
const path = require('path');

let globalPath = process.cwd ? process.cwd() : process.env.PWD;

// Chemin vers le dossier des icônes PatternFly
const iconsPath = path.resolve(globalPath, 'node_modules/@patternfly/react-icons/dist/esm/icons');

// Fichier de sortie
const outputPath = path.resolve(globalPath, 'src/icons/index.ts');

// Fonction pour convertir le nom du fichier en nom de classe et de balise HTML
const formatIconName = (fileName) => {
  const name = fileName.replace('-icon.js', '').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()).replace(/ /g, '');
  return name;
};

// Fonction pour générer le nom du customElement
const formatElementName = (fileName) => {
  return `pf-icons-${fileName.replace('-icon.js', '')}`;
};

// Lire tous les fichiers dans le dossier d'icônes
fs.readdir(iconsPath, (err, files) => {
  if (err) {
    return console.error('Erreur lors de la lecture du dossier des icônes :', err);
  }

  // Filtrer uniquement les fichiers d'icônes (qui se terminent par -icon.js)
  const iconFiles = files.filter(file => file.endsWith('-icon.js'));

  // Générer les imports, les customElement et les classes
  const imports = [];
  const classDefinitions = [];

  iconFiles.forEach(file => {
    const iconName = formatIconName(file);
    const elementName = formatElementName(file);

    // Générer l'import pour l'icône
    imports.push(`import react${iconName} from '@patternfly/react-icons/dist/esm/icons/${file}';`);

    // Générer la classe avec customElement
    classDefinitions.push(`
@customElement({ name: '${elementName}' })
export class Pf${iconName} extends CreateIconWebComponent(react${iconName}) {}
    `);
  });

  // Combiner le tout pour créer le fichier final
  const outputContent = `import { customElement } from '@lithium-framework/core';
import { CreateIconWebComponent } from '../functions/create-icon-web-component';

${imports.join('\n')}

${classDefinitions.join('\n')}
`;

  // Écrire le contenu dans le fichier de sortie
  fs.writeFile(outputPath, outputContent, (err) => {
    if (err) {
      return console.error('Erreur lors de l\'écriture du fichier :', err);
    }
    console.log('Fichier d\'icônes généré avec succès:', outputPath);
  });
});