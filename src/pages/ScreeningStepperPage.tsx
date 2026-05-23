import { ScreeningShell } from "../features/screening/components/ScreeningShell";
import { ScreeningStepRenderer } from "../features/screening/components/ScreeningStepRenderer";
import { useScreeningStepper } from "../features/screening/hooks/useScreeningStepper";

export function ScreeningStepperPage() {
  const state = useScreeningStepper();

  return (
    <ScreeningShell
      currentStep={state.currentStep}
      resultMessage={state.resultMessage}
    >
      <ScreeningStepRenderer state={state} />
    </ScreeningShell>
  );
}
