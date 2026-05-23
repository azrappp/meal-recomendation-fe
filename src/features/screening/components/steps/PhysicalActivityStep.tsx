import { PrimaryButton } from "../PrimaryButton";

type PhysicalActivityStepProps = {
  activityLevel: string;
  setActivityLevel: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  onSubmit: () => void;
};

export function PhysicalActivityStep({
  activityLevel,
  setActivityLevel,
  loading,
  onSubmit,
}: PhysicalActivityStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Aktivitas Fisik</h2>

      <select
        value={activityLevel}
        onChange={(event) => setActivityLevel(event.target.value)}
        className="w-full rounded-xl border p-3"
      >
        <option value="sedentary">Sedentary</option>
        <option value="light">Light</option>
        <option value="moderate">Moderate</option>
        <option value="heavy">Heavy</option>
      </select>

      <PrimaryButton loading={loading} onClick={onSubmit}>
        Save and Continue
      </PrimaryButton>
    </div>
  );
}
