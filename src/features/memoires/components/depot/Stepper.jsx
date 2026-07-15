const STEP_LABELS = ["Informations", "Documents", "Récapitulatif"];

export default function Stepper({ currentStep }) {
  return (
    <>
      {/* Desktop */}
      <div className="relative mb-10 hidden items-center justify-between md:flex">
        <div className="absolute left-0 top-1/2 -z-10 h-[2px] w-full -translate-y-1/2 bg-gray-200" />
        {STEP_LABELS.map((label, index) => {
          const stepNumber = index + 1;
          const isCurrentOrDone = stepNumber <= currentStep;
          return (
            <div key={label} className="flex flex-col items-center gap-2 bg-[var(--color-bg)] px-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-colors duration-300 ${
                  isCurrentOrDone ? "bg-[var(--color-primary)] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {stepNumber}
              </div>
              <span
                className={`text-sm font-medium ${
                  stepNumber === currentStep ? "text-[var(--color-primary)]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="mb-8 md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--color-primary)]">
            Étape {currentStep}/3
          </span>
          <span className="text-sm text-gray-400">{STEP_LABELS[currentStep - 1]}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-[var(--color-primary)] transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}