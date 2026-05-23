import { FormInput } from "../FormInput";
import { PrimaryButton } from "../PrimaryButton";
import type { ClinicalForm } from "../../types/screeningStepper.types";

type ClinicalStepProps = {
  clinical: ClinicalForm;
  setClinical: React.Dispatch<React.SetStateAction<ClinicalForm>>;
  loading: boolean;
  onSubmit: () => void;
};

export function ClinicalStep({
  clinical,
  setClinical,
  loading,
  onSubmit,
}: ClinicalStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Data Klinis</h2>

      <FormInput
        type="number"
        label="Systolic BP"
        placeholder="Systolic BP"
        value={clinical.systolicBp}
        onChange={(value) =>
          setClinical((current) => ({ ...current, systolicBp: Number(value) }))
        }
      />

      <FormInput
        type="number"
        label="Diastolic BP"
        placeholder="Diastolic BP"
        value={clinical.diastolicBp}
        onChange={(value) =>
          setClinical((current) => ({ ...current, diastolicBp: Number(value) }))
        }
      />

      <PrimaryButton loading={loading} onClick={onSubmit}>
        Save and Continue
      </PrimaryButton>
    </div>
  );
}
