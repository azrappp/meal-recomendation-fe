import { PrimaryButton } from "../PrimaryButton";

type GenerateMenuStepProps = {
  loading: boolean;
  onGenerate: () => void;
};

export function GenerateMenuStep({
  loading,
  onGenerate,
}: GenerateMenuStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Generate Weekly Menu</h2>

      <PrimaryButton loading={loading} onClick={onGenerate} variant="success">
        Generate Weekly Menu
      </PrimaryButton>
    </div>
  );
}
