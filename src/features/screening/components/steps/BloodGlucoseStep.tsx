import { FormInput } from "../FormInput";
import { PrimaryButton } from "../PrimaryButton";
import type { BiochemicalForm } from "../../types/screeningStepper.types";

type BloodGlucoseStepProps = {
  biochemical: BiochemicalForm;
  setBiochemical: React.Dispatch<React.SetStateAction<BiochemicalForm>>;
  loading: boolean;
  onSubmit: () => void;
};

export function BloodGlucoseStep({
  biochemical,
  setBiochemical,
  loading,
  onSubmit,
}: BloodGlucoseStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Gula Darah</h2>

      <FormInput
        label="GDP / fasting glucose (mg/dL)"
        type="number"
        placeholder="GDP / fasting glucose (mg/dL)"
        value={biochemical.fastingGlucoseMgDl}
        onChange={(value) =>
          setBiochemical((current) => ({
            ...current,
            fastingGlucoseMgDl: Number(value),
          }))
        }
      />

      <FormInput
        label="GDS / random glucose (mg/dL)"
        type="number"
        placeholder="GDS / random glucose (mg/dL)"
        value={biochemical.randomGlucoseMgDl}
        onChange={(value) =>
          setBiochemical((current) => ({
            ...current,
            randomGlucoseMgDl: Number(value),
          }))
        }
      />

      <FormInput
        label="HbA1c (%)"
        type="number"
        placeholder="HbA1c (%)"
        value={biochemical.hba1cPercent}
        onChange={(value) =>
          setBiochemical((current) => ({
            ...current,
            hba1cPercent: Number(value),
          }))
        }
      />

      <PrimaryButton loading={loading} onClick={onSubmit}>
        Save and Continue
      </PrimaryButton>
    </div>
  );
}
