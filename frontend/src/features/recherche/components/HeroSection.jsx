export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] px-4 py-20 md:px-0">
      <div className="mx-auto max-w-[1280px] text-center">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Archive de mémoires
        </h1>
        <div className="mx-auto h-1 w-24 rounded-full bg-[var(--color-accent)]" />
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          Accédez à la base de données centrale des travaux académiques de l'ENEAM. Recherchez, filtrez et
          consultez les mémoires validés.
        </p>
      </div>
    </section>
  );
}