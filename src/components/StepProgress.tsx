type StepProgressProps = {
  currentStep: number;
  steps: string[];
};

export function StepProgress({ currentStep, steps }: StepProgressProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4">
      {steps.map((step, index) => {
        const active = index === currentStep;
        const completed = index < currentStep;

        return (
          <div
            key={step}
            className={`min-w-32 rounded-2xl border px-4 py-3 text-sm ${
              active
                ? "border-indigo-600 bg-indigo-100 text-indigo-900"
                : completed
                  ? "border-green-500 bg-green-50 text-green-800"
                  : "border-gray-200 bg-white text-gray-500"
            }`}
          >
            <div className="font-semibold">Step {index + 1}</div>
            <div>{step}</div>
          </div>
        );
      })}
    </div>
  );
}
