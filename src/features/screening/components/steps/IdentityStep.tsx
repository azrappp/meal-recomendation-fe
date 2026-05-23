import { FormInput } from "../FormInput";
import { PrimaryButton } from "../PrimaryButton";
import type { ClientForm } from "../../types/screeningStepper.types";

type IdentityStepProps = {
  clientForm: ClientForm;
  setClientForm: React.Dispatch<React.SetStateAction<ClientForm>>;
  loading: boolean;
  onSubmit: () => void;
};

export function IdentityStep({
  clientForm,
  setClientForm,
  loading,
  onSubmit,
}: IdentityStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Identitas Diri</h2>

      <FormInput
        placeholder="Nama lengkap"
        label="Nama lengkap"
        value={clientForm.fullName}
        onChange={(value) =>
          setClientForm((current) => ({ ...current, fullName: value }))
        }
      />

      <FormInput
        label="Usia"
        type="number"
        placeholder="Usia"
        value={clientForm.age}
        onChange={(value) =>
          setClientForm((current) => ({ ...current, age: Number(value) }))
        }
      />

      <select
        value={clientForm.gender}
        onChange={(event) =>
          setClientForm((current) => ({
            ...current,
            gender: event.target.value,
          }))
        }
        className="w-full rounded-xl border p-3"
      >
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>

      <FormInput
        label="Pekerjaan"
        placeholder="Pekerjaan"
        value={clientForm.occupation}
        onChange={(value) =>
          setClientForm((current) => ({ ...current, occupation: value }))
        }
      />

      <PrimaryButton loading={loading} onClick={onSubmit}>
        Simpan Identitas dan Mulai Screening
      </PrimaryButton>
    </div>
  );
}
