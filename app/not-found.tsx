export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading font-bold text-6xl text-secondary mb-4">
          404
        </h1>
        <p className="text-white font-body text-lg mb-2">
          Page non trouvée
        </p>
        <p className="text-white/60 font-body mb-8">
          La page que tu cherches n'existe pas.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-primary hover:bg-primary-hover text-white font-heading rounded-lg transition-all"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
