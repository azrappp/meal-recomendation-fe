import { PrimaryButton } from "../PrimaryButton";
import { StatusMetricCard } from "../StatusMetricCard";
import type { EnergyRequirement } from "../../types/screeningStepper.types";

type EnergyRequirementStepProps = {
  energyRequirement: EnergyRequirement | null;
  onContinue: () => void;
};

export function EnergyRequirementStep({
  energyRequirement,
  onContinue,
}: EnergyRequirementStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Kebutuhan Energi</h2>

      <div className="rounded-2xl bg-indigo-50 p-5 text-center">
        <p className="text-sm text-slate-500">Kalori Harian</p>
        <p className="text-5xl font-bold text-indigo-700">
          {energyRequirement?.dailyEnergyKcal ?? "-"}
        </p>
        <p className="text-sm text-slate-500">kkal</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatusMetricCard label="Karbo" value={energyRequirement?.carbohydrateGram} suffix="g" />
        <StatusMetricCard label="Protein" value={energyRequirement?.proteinGram} suffix="g" />
        <StatusMetricCard label="Fat" value={energyRequirement?.fatGram} suffix="g" />
      </div>

      <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
    </div>
  );
}
