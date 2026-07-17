export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">{title}</h2>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}
