export const SCREENING_STEPS = [
  "Identitas Diri",
  "Antropometri",
  "Status Gizi",
  "Gula Darah",
  "Status Gula Darah",
  "Data Klinis",
  "Hasil Analisis",
  "Konsumsi Obat",
  "Aktivitas Fisik",
  "Kebutuhan Energi",
  "Generate Menu",
  "Rekomendasi Menu",
] as const;

export const SCREENING_STEP_INDEX = {
  IDENTITY: 0,
  ANTHROPOMETRY: 1,
  NUTRITION_STATUS: 2,
  BLOOD_GLUCOSE: 3,
  BLOOD_GLUCOSE_STATUS: 4,
  CLINICAL: 5,
  CLINICAL_ANALYSIS: 6,
  MEDICATION: 7,
  PHYSICAL_ACTIVITY: 8,
  ENERGY_REQUIREMENT: 9,
  GENERATE_MENU: 10,
  RECOMMENDED_MENU: 11,
} as const;
