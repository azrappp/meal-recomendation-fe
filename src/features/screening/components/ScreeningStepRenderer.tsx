import { SCREENING_STEP_INDEX } from "../constants/screeningSteps";
import { IdentityStep } from "./steps/IdentityStep";
import { AnthropometryStep } from "./steps/AnthropometryStep";
import { NutritionStatusStep } from "./steps/NutritionStatusStep";
import { BloodGlucoseStep } from "./steps/BloodGlucoseStep";
import { BloodGlucoseStatusStep } from "./steps/BloodGlucoseStatusStep";
import { ClinicalStep } from "./steps/ClinicalStep";
import { ClinicalAnalysisStep } from "./steps/ClinicalAnalysisStep";
import { MedicationStep } from "./steps/MedicationStep";
import { PhysicalActivityStep } from "./steps/PhysicalActivityStep";
import { EnergyRequirementStep } from "./steps/EnergyRequirementStep";
import { GenerateMenuStep } from "./steps/GenerateMenuStep";
import { GeneratedMenuStep } from "./steps/GeneratedMenuStep";
import type { useScreeningStepper } from "../hooks/useScreeningStepper";

type ScreeningStepperState = ReturnType<typeof useScreeningStepper>;

type ScreeningStepRendererProps = {
  state: ScreeningStepperState;
};

export function ScreeningStepRenderer({ state }: ScreeningStepRendererProps) {
  switch (state.currentStep) {
    case SCREENING_STEP_INDEX.IDENTITY:
      return (
        <IdentityStep
          clientForm={state.clientForm}
          setClientForm={state.setClientForm}
          loading={state.loading}
          onSubmit={state.handleCreateClientAndStartWeekly}
        />
      );

    case SCREENING_STEP_INDEX.ANTHROPOMETRY:
      return (
        <AnthropometryStep
          anthropometry={state.anthropometry}
          setAnthropometry={state.setAnthropometry}
          loading={state.loading}
          onSubmit={state.handleSaveAnthropometry}
        />
      );

    case SCREENING_STEP_INDEX.NUTRITION_STATUS:
      return (
        <NutritionStatusStep
          nutritionStatus={state.nutritionStatus}
          onContinue={() =>
            state.setCurrentStep(SCREENING_STEP_INDEX.BLOOD_GLUCOSE)
          }
        />
      );

    case SCREENING_STEP_INDEX.BLOOD_GLUCOSE:
      return (
        <BloodGlucoseStep
          biochemical={state.biochemical}
          setBiochemical={state.setBiochemical}
          loading={state.loading}
          onSubmit={state.handleSaveBiochemical}
        />
      );

    case SCREENING_STEP_INDEX.BLOOD_GLUCOSE_STATUS:
      return (
        <BloodGlucoseStatusStep
          bloodGlucoseStatus={state.bloodGlucoseStatus}
          onContinue={() => state.setCurrentStep(SCREENING_STEP_INDEX.CLINICAL)}
        />
      );

    case SCREENING_STEP_INDEX.CLINICAL:
      return (
        <ClinicalStep
          clinical={state.clinical}
          setClinical={state.setClinical}
          loading={state.loading}
          onSubmit={state.handleSaveClinical}
        />
      );

    case SCREENING_STEP_INDEX.CLINICAL_ANALYSIS:
      return (
        <ClinicalAnalysisStep
          clinicalAnalysis={state.clinicalAnalysis}
          onContinue={() =>
            state.setCurrentStep(SCREENING_STEP_INDEX.MEDICATION)
          }
        />
      );

    case SCREENING_STEP_INDEX.MEDICATION:
      return (
        <MedicationStep
          medication={state.medication}
          setMedication={state.setMedication}
          loading={state.loading}
          onSubmit={state.handleSaveMedication}
        />
      );

    case SCREENING_STEP_INDEX.PHYSICAL_ACTIVITY:
      return (
        <PhysicalActivityStep
          activityLevel={state.activityLevel}
          setActivityLevel={state.setActivityLevel}
          loading={state.loading}
          onSubmit={state.handleSaveActivity}
        />
      );

    case SCREENING_STEP_INDEX.ENERGY_REQUIREMENT:
      return (
        <EnergyRequirementStep
          energyRequirement={state.energyRequirement}
          onContinue={() =>
            state.setCurrentStep(SCREENING_STEP_INDEX.GENERATE_MENU)
          }
        />
      );

    case SCREENING_STEP_INDEX.GENERATE_MENU:
      return (
        <GenerateMenuStep
          loading={state.loading}
          onGenerate={state.handleGenerateMenu}
        />
      );

    case SCREENING_STEP_INDEX.RECOMMENDED_MENU:
      return <GeneratedMenuStep generatedMenu={state.generatedMenu} />;
    default:
      return null;
  }
}
