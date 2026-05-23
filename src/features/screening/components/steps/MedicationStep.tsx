import { FormInput } from "../FormInput";
import { PrimaryButton } from "../PrimaryButton";
import type { MedicationForm } from "../../types/screeningStepper.types";

type MedicationStepProps = {
  medication: MedicationForm;
  setMedication: React.Dispatch<React.SetStateAction<MedicationForm>>;
  loading: boolean;
  onSubmit: () => void;
};

export function MedicationStep({
  medication,
  setMedication,
  loading,
  onSubmit,
}: MedicationStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Konsumsi Obat</h2>

      <FormInput
        label="Obat hipertensi"
        placeholder="Obat hipertensi"
        value={medication.hypertensionDrugName}
        onChange={(value) =>
          setMedication((current) => ({
            ...current,
            hypertensionDrugName: value,
          }))
        }
      />

      <FormInput
        label="Obat diabetes"
        placeholder="Obat diabetes"
        value={medication.antidiabeticDrugName}
        onChange={(value) =>
          setMedication((current) => ({
            ...current,
            antidiabeticDrugName: value,
          }))
        }
      />

      <textarea
        placeholder="Catatan obat"
        value={medication.medicationNotes}
        onChange={(event) =>
          setMedication((current) => ({
            ...current,
            medicationNotes: event.target.value,
          }))
        }
        className="w-full rounded-xl border p-3"
      />

      <PrimaryButton loading={loading} onClick={onSubmit}>
        Save and Continue
      </PrimaryButton>
    </div>
  );
}
