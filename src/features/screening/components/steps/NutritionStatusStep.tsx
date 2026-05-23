import { PrimaryButton } from "../PrimaryButton";
import { StatusMetricCard } from "../StatusMetricCard";
import type { NutritionStatus } from "../../types/screeningStepper.types";

type NutritionStatusStepProps = {
  nutritionStatus: NutritionStatus | null;
  onContinue: () => void;
};

export function NutritionStatusStep({
  nutritionStatus,
  onContinue,
}: NutritionStatusStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Status Gizi</h2>

      <div className="rounded-2xl bg-indigo-50 p-5">
        <p className="text-sm text-slate-500">BMI</p>
        <p className="text-4xl font-bold text-indigo-700">
          {nutritionStatus?.bmi ?? "-"}
        </p>
        <p className="mt-2 font-semibold text-slate-700">
          {nutritionStatus?.bmiStatus ?? "-"}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatusMetricCard label="Weight" value={nutritionStatus?.weightKg} suffix="kg" />
        <StatusMetricCard label="Height" value={nutritionStatus?.heightCm} suffix="cm" />
        <StatusMetricCard label="Waist" value={nutritionStatus?.waistCircumferenceCm} suffix="cm" />
      </div>

      <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
    </div>
  );
}
