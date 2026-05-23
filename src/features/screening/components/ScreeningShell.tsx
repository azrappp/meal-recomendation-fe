import { StepProgress } from "../../../components/StepProgress";
import { SCREENING_STEPS } from "../constants/screeningSteps";

type ScreeningShellProps = {
  currentStep: number;
  resultMessage: string;
  children: React.ReactNode;
};

export function ScreeningShell({
  currentStep,
  resultMessage,
  children,
}: ScreeningShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Weekly Health Screening
        </h1>

        <p className="mb-6 text-slate-600">
          Monitor anthropometry, blood glucose, blood pressure, activity, and
          meal recommendation.
        </p>

        <StepProgress currentStep={currentStep} steps={[...SCREENING_STEPS]} />

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          {children}

          {resultMessage && (
            <div className="mt-6 rounded-xl bg-slate-100 p-4 text-slate-700">
              {resultMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
