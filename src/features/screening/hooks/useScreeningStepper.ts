import { useState } from "react";
import {
  startWeeklyScreening,
  saveWeeklyAnthropometry,
  saveBiochemical,
  saveClinical,
  savePhysicalActivity,
  getNutritionStatus,
  getBloodGlucoseStatus,
  getClinicalAnalysis,
  saveMedication,
  getEnergyRequirement,
} from "../../../api/screeningApi";
import { createClient } from "../../../api/clientApi";
import { generateWeeklyMenu } from "../../../api/mealRecomendationApi";
import { SCREENING_STEP_INDEX } from "../constants/screeningSteps";
import type {
  AnthropometryForm,
  BiochemicalForm,
  BloodGlucoseStatus,
  ClientForm,
  ClinicalAnalysis,
  ClinicalForm,
  EnergyRequirement,
  MedicationForm,
  NutritionStatus,
} from "../types/screeningStepper.types";

export function useScreeningStepper() {
  const [clientId, setClientId] = useState<number | null>(null);
  const [screeningId, setScreeningId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const [clientForm, setClientForm] = useState<ClientForm>({
    fullName: "",
    age: 23,
    gender: "Laki-laki",
    occupation: "",
  });

  const [anthropometry, setAnthropometry] = useState<AnthropometryForm>({
    weightKg: 68,
    heightCm: 160,
    waistCircumferenceCm: 84,
  });

  const [biochemical, setBiochemical] = useState<BiochemicalForm>({
    fastingGlucoseMgDl: 110,
    randomGlucoseMgDl: 120,
    hba1cPercent: 5.8,
  });

  const [clinical, setClinical] = useState<ClinicalForm>({
    systolicBp: 135,
    diastolicBp: 85,
  });

  const [medication, setMedication] = useState<MedicationForm>({
    hypertensionDrugName: "",
    antidiabeticDrugName: "",
    medicationNotes: "",
  });

  const [activityLevel, setActivityLevel] = useState("moderate");

  const [nutritionStatus, setNutritionStatus] =
    useState<NutritionStatus | null>(null);
  const [bloodGlucoseStatus, setBloodGlucoseStatus] =
    useState<BloodGlucoseStatus | null>(null);
  const [clinicalAnalysis, setClinicalAnalysis] =
    useState<ClinicalAnalysis | null>(null);
  const [energyRequirement, setEnergyRequirement] =
    useState<EnergyRequirement | null>(null);
  const [generatedMenu, setGeneratedMenu] = useState<any>(null);
  async function handleCreateClientAndStartWeekly() {
    setLoading(true);
    setResultMessage("");

    try {
      const createdClient = await createClient(clientForm);
      const newClientId = createdClient.data.clientId;
      setClientId(newClientId);

      const weeklyResponse = await startWeeklyScreening(newClientId);
      setScreeningId(weeklyResponse.data.screeningId);

      setResultMessage(
        `Client created and weekly screening started. Screening ID: ${weeklyResponse.data.screeningId}`,
      );
      setCurrentStep(SCREENING_STEP_INDEX.ANTHROPOMETRY);
    } catch {
      setResultMessage("Failed to create client or start weekly screening.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveAnthropometry() {
    if (!screeningId) return;

    setLoading(true);

    try {
      await saveWeeklyAnthropometry(screeningId, anthropometry);
      const nutrition = await getNutritionStatus(screeningId);
      setNutritionStatus(nutrition.data);

      setResultMessage("Anthropometry saved.");
      setCurrentStep(SCREENING_STEP_INDEX.NUTRITION_STATUS);
    } catch {
      setResultMessage("Failed to save anthropometry.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveBiochemical() {
    if (!screeningId) return;

    setLoading(true);

    try {
      await saveBiochemical(screeningId, biochemical);
      const glucose = await getBloodGlucoseStatus(screeningId);
      setBloodGlucoseStatus(glucose.data);

      setResultMessage("Blood glucose data saved.");
      setCurrentStep(SCREENING_STEP_INDEX.BLOOD_GLUCOSE_STATUS);
    } catch {
      setResultMessage("Failed to save blood glucose data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveClinical() {
    if (!screeningId) return;

    setLoading(true);

    try {
      await saveClinical(screeningId, clinical);
      const analysis = await getClinicalAnalysis(screeningId);
      setClinicalAnalysis(analysis.data);

      setResultMessage("Clinical data saved.");
      setCurrentStep(SCREENING_STEP_INDEX.CLINICAL_ANALYSIS);
    } catch {
      setResultMessage("Failed to save clinical data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveMedication() {
    if (!screeningId) return;

    setLoading(true);

    try {
      await saveMedication(screeningId, medication);
      setResultMessage("Medication data saved.");
      setCurrentStep(SCREENING_STEP_INDEX.PHYSICAL_ACTIVITY);
    } catch {
      setResultMessage("Failed to save medication data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveActivity() {
    if (!screeningId) return;

    setLoading(true);

    try {
      await savePhysicalActivity(screeningId, { activityLevel });
      const energy = await getEnergyRequirement(screeningId);
      setEnergyRequirement(energy.data);

      setResultMessage("Physical activity and energy requirement saved.");
      setCurrentStep(SCREENING_STEP_INDEX.ENERGY_REQUIREMENT);
    } catch {
      setResultMessage("Failed to save physical activity.");
    } finally {
      setLoading(false);
    }
  }
  async function handleGenerateMenu() {
    if (!screeningId) return;

    setLoading(true);
    setResultMessage("");

    try {
      const response = await generateWeeklyMenu(screeningId);

      setGeneratedMenu(response.data);
      setResultMessage("Weekly menu generated successfully.");
      setCurrentStep(11);
    } catch {
      setResultMessage("Failed to generate weekly menu.");
    } finally {
      setLoading(false);
    }
  }
  return {
    clientId,
    screeningId,
    currentStep,
    loading,
    resultMessage,
    clientForm,
    setClientForm,
    anthropometry,
    setAnthropometry,
    biochemical,
    setBiochemical,
    clinical,
    setClinical,
    medication,
    setMedication,
    activityLevel,
    setActivityLevel,
    nutritionStatus,
    bloodGlucoseStatus,
    clinicalAnalysis,
    energyRequirement,
    setCurrentStep,
    handleCreateClientAndStartWeekly,
    handleSaveAnthropometry,
    handleSaveBiochemical,
    handleSaveClinical,
    handleSaveMedication,
    handleSaveActivity,
    handleGenerateMenu,
    generatedMenu,
  };
}
