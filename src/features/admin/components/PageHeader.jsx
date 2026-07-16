export default function PageHeader({ title, subtitle }) {
  return (
    <header className="mb-10">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-2">{title}</h1>
      <p className="text-body-lg font-body-lg text-on-surface-variant">{subtitle}</p>
    </header>
  );
}