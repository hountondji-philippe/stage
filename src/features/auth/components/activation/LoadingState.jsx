import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <section className="flex flex-col items-center text-center py-6">
      <Loader2 className="w-12 h-12 text-[#000e4d] animate-spin mb-6" />
      <h2 className="text-2xl font-semibold text-[#000e4d] mb-2">Activation en cours</h2>
      <p className="text-[#454651]">Merci de patienter quelques instants...</p>
    </section>
  );
}
