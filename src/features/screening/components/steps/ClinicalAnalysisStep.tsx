import { PrimaryButton } from "../PrimaryButton";
import type { ClinicalAnalysis } from "../../types/screeningStepper.types";

type ClinicalAnalysisStepProps = {
  clinicalAnalysis: ClinicalAnalysis | null;
  onContinue: () => void;
};

export function ClinicalAnalysisStep({
  clinicalAnalysis,
  onContinue,
}: ClinicalAnalysisStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hasil Analisis Data Klinis</h2>

      <div className="rounded-2xl bg-indigo-50 p-5">
        <p className="text-sm text-slate-500">Hypertension</p>
        <p className="text-2xl font-bold text-indigo-700">
          {clinicalAnalysis?.hypertension?.diagnosis ?? "-"}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          {clinicalAnalysis?.hypertension?.bloodPressureStatus ?? "-"}
        </p>
      </div>

      <div className="rounded-2xl bg-slate-100 p-5">
        <p className="text-sm text-slate-500">Diabetes Mellitus</p>
        <p className="text-2xl font-bold text-slate-800">
          {clinicalAnalysis?.diabetesMellitus?.diagnosis ?? "-"}
        </p>
      </div>

      <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
    </div>
  );
}
