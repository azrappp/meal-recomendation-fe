import { apiClient } from "./apiClient";

export type StartWeeklyScreeningResponse = {
  message: string;
  data: {
    screeningId: number;
    clientId: number;
    screeningDate: string;
    screeningStatus: string;
  };
};

export async function startWeeklyScreening(clientId: number) {
  const response = await apiClient.post<StartWeeklyScreeningResponse>(
    `/screening/${clientId}/start-weekly`,
  );

  return response.data;
}

export async function saveWeeklyAnthropometry(
  screeningId: number,
  payload: {
    weightKg: number;
    heightCm: number;
    waistCircumferenceCm?: number;
  },
) {
  const response = await apiClient.post(
    `/screening/${screeningId}/anthropometry-weekly`,
    payload,
  );

  return response.data;
}

export async function saveBiochemical(
  screeningId: number,
  payload: {
    fastingGlucoseMgDl?: number;
    postprandialGlucoseMgDl?: number;
    randomGlucoseMgDl?: number;
    hba1cPercent?: number;
  },
) {
  const response = await apiClient.post(
    `/screening/${screeningId}/biochemical`,
    payload,
  );

  return response.data;
}

export async function saveClinical(
  screeningId: number,
  payload: {
    systolicBp: number;
    diastolicBp: number;
    headache?: boolean;
    chestPain?: boolean;
    visualDisturbance?: boolean;
    frequentUrinationNight?: boolean;
    shortnessOfBreath?: boolean;
    polyphagia?: boolean;
    dizziness?: boolean;
    polydipsia?: boolean;
  },
) {
  const response = await apiClient.post(
    `/screening/${screeningId}/clinical`,
    payload,
  );

  return response.data;
}

export async function savePhysicalActivity(
  screeningId: number,
  payload: {
    activityLevel: string;
  },
) {
  const response = await apiClient.post(
    `/screening/${screeningId}/physical-activity`,
    payload,
  );

  return response.data;
}

export async function getScreeningHistory(clientId: number) {
  const response = await apiClient.get(
    `/screening/clients/${clientId}/history`,
  );

  return response.data;
}

export async function getNutritionStatus(screeningId: number) {
  const response = await apiClient.get(
    `/screening/${screeningId}/nutrition-status`,
  );
  return response.data;
}

export async function getBloodGlucoseStatus(screeningId: number) {
  const response = await apiClient.get(
    `/screening/${screeningId}/blood-glucose-status`,
  );
  return response.data;
}

export async function getClinicalAnalysis(screeningId: number) {
  const response = await apiClient.get(
    `/screening/${screeningId}/clinical-analysis`,
  );
  return response.data;
}

export async function saveMedication(
  screeningId: number,
  payload: {
    hypertensionDrugName?: string;
    antidiabeticDrugName?: string;
    medicationNotes?: string;
  },
) {
  const response = await apiClient.post(
    `/screening/${screeningId}/medication`,
    payload,
  );
  return response.data;
}

export async function getEnergyRequirement(screeningId: number) {
  const response = await apiClient.get(
    `/screening/${screeningId}/energy-requirement`,
  );
  return response.data;
}
