const fs = require('fs');
const path = require('path');

// Chemins des répertoires
const appDir = path.join(__dirname, '..', 'app');
const appExampleDir = path.join(__dirname, '..', 'app-example');

// Fonction principale
function resetProject() {
  try {
    console.log('🔄 Début du reset du projet...\n');

    // Vérifier si le répertoire app existe
    if (!fs.existsSync(appDir)) {
      console.log('⚠️  Le répertoire app n\'existe pas. Création d\'un nouveau répertoire app...');
    } else {
      // Supprimer app-example s'il existe déjà
      if (fs.existsSync(appExampleDir)) {
        console.log('🗑️  Suppression de l\'ancien répertoire app-example...');
        fs.rmSync(appExampleDir, { recursive: true, force: true });
      }

      // Déplacer app vers app-example
      console.log('📦 Déplacement de app vers app-example...');
      fs.renameSync(appDir, appExampleDir);
      console.log('✅ Répertoire app déplacé vers app-example\n');
    }

    // Créer un nouveau répertoire app
    console.log('📁 Création du nouveau répertoire app...');
    fs.mkdirSync(appDir, { recursive: true });

    // Créer le fichier index.tsx
    const indexTsxPath = path.join(appDir, 'index.tsx');
    const indexTsxContent = `export default function Home() {
  return (
    <div>
      <h1>Welcome to your new app!</h1>
      <p>Start building your application here.</p>
    </div>
  );
}
`;

    console.log('📝 Création du fichier index.tsx...');
    fs.writeFileSync(indexTsxPath, indexTsxContent, 'utf8');

    console.log('✅ Fichier index.tsx créé\n');
    console.log('🎉 Reset du projet terminé avec succès!');
    console.log('\n📌 Prochaines étapes:');
    console.log('   - Votre ancien code est disponible dans app-example/');
    console.log('   - Commencez à coder dans app/index.tsx');

  } catch (error) {
    console.error('❌ Erreur lors du reset du projet:', error.message);
    process.exit(1);
  }
}

// Exécuter le script
resetProject();
