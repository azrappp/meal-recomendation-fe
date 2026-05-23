import { FormInput } from "../FormInput";
import { PrimaryButton } from "../PrimaryButton";
import type { AnthropometryForm } from "../../types/screeningStepper.types";

type AnthropometryStepProps = {
  anthropometry: AnthropometryForm;
  setAnthropometry: React.Dispatch<React.SetStateAction<AnthropometryForm>>;
  loading: boolean;
  onSubmit: () => void;
};

export function AnthropometryStep({
  anthropometry,
  setAnthropometry,
  loading,
  onSubmit,
}: AnthropometryStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Antropometri</h2>

      <FormInput
        label="Berat badan (kg)"
        type="number"
        placeholder="Berat badan (kg)"
        value={anthropometry.weightKg}
        onChange={(value) =>
          setAnthropometry((current) => ({
            ...current,
            weightKg: Number(value),
          }))
        }
      />

      <FormInput
        label="Tinggi badan (cm)"
        type="number"
        placeholder="Tinggi badan (cm)"
        value={anthropometry.heightCm}
        onChange={(value) =>
          setAnthropometry((current) => ({
            ...current,
            heightCm: Number(value),
          }))
        }
      />

      <FormInput
        label="Lingkar perut (cm)"
        type="number"
        placeholder="Lingkar perut (cm)"
        value={anthropometry.waistCircumferenceCm}
        onChange={(value) =>
          setAnthropometry((current) => ({
            ...current,
            waistCircumferenceCm: Number(value),
          }))
        }
      />

      <PrimaryButton loading={loading} onClick={onSubmit}>
        Save and Continue
      </PrimaryButton>
    </div>
  );
}
