export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-container py-20 px-margin-mobile md:px-0">
      <div className="max-w-container-max mx-auto text-center">
        <h1 className="text-white font-display-lg text-display-lg mb-4">
          Archive de mémoires
        </h1>
        <div className="w-24 h-1 bg-gold-action mx-auto rounded-full"></div>
        <p className="text-primary-fixed mt-6 font-body-lg max-w-2xl mx-auto opacity-80">
          Accédez à la base de données centrale des travaux académiques de l'ENEAM. Recherchez, filtrez et consultez les mémoires validés.
        </p>
      </div>
    </section>
  );
}