import { PrimaryButton } from "../PrimaryButton";
import { StatusMetricCard } from "../StatusMetricCard";
import type { BloodGlucoseStatus } from "../../types/screeningStepper.types";

type BloodGlucoseStatusStepProps = {
  bloodGlucoseStatus: BloodGlucoseStatus | null;
  onContinue: () => void;
};

export function BloodGlucoseStatusStep({
  bloodGlucoseStatus,
  onContinue,
}: BloodGlucoseStatusStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Status Gula Darah</h2>

      <div className="rounded-2xl bg-indigo-50 p-5">
        <p className="text-sm text-slate-500">Diagnosis</p>
        <p className="text-3xl font-bold text-indigo-700">
          {bloodGlucoseStatus?.diagnosis ?? "-"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatusMetricCard label="Fasting" value={bloodGlucoseStatus?.fastingGlucoseMgDl} suffix="mg/dL" />
        <StatusMetricCard label="Random" value={bloodGlucoseStatus?.randomGlucoseMgDl} suffix="mg/dL" />
        <StatusMetricCard label="HbA1c" value={bloodGlucoseStatus?.hba1cPercent} suffix="%" />
      </div>

      <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
    </div>
  );
}
