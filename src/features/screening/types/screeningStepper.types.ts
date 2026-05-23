export type ClientForm = {
  fullName: string;
  age: number;
  gender: string;
  occupation: string;
};

export type AnthropometryForm = {
  weightKg: number;
  heightCm: number;
  waistCircumferenceCm: number;
};

export type BiochemicalForm = {
  fastingGlucoseMgDl: number;
  randomGlucoseMgDl: number;
  hba1cPercent: number;
};

export type ClinicalForm = {
  systolicBp: number;
  diastolicBp: number;
};

export type MedicationForm = {
  hypertensionDrugName: string;
  antidiabeticDrugName: string;
  medicationNotes: string;
};

export type NutritionStatus = {
  bmi: number | null;
  bmiStatus: string | null;
  heightCm: number | null;
  weightKg: number | null;
  waistCircumferenceCm: number | null;
  waistStatus: string | null;
};

export type BloodGlucoseStatus = {
  diagnosis: string | null;
  glucoseStatus: string | null;
  hba1cStatus: string | null;
  fastingGlucoseMgDl: number | null;
  postprandialGlucoseMgDl: number | null;
  randomGlucoseMgDl: number | null;
  hba1cPercent: number | null;
};

export type ClinicalAnalysis = {
  hypertension: {
    diagnosis: string | null;
    bloodPressureStatus: string | null;
    systolicBp: number | null;
    diastolicBp: number | null;
  };
  diabetesMellitus: {
    diagnosis: string | null;
    glucoseStatus: string | null;
    hba1cStatus: string | null;
  };
};

export type EnergyRequirement = {
  dailyEnergyKcal: number | null;
  carbohydrateGram: number | null;
  proteinGram: number | null;
  fatGram: number | null;
};
