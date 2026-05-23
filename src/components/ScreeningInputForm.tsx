import { useState } from "react";

type ScreeningInputFormProps = {
  selectedClientId: number;
  loading?: boolean;
  onSubmitScreening: (payload: CreateScreeningPayload) => void;
};

export type CreateScreeningPayload = {
  screeningDate: string;
  anthropometry: {
    weightKg: number;
    heightCm: number;
    waistCircumferenceCm: number | null;
  };
  biochemical: {
    fastingGlucoseMgDl: number | null;
    postprandialGlucoseMgDl: number | null;
    randomGlucoseMgDl: number | null;
    hba1cPercent: number | null;
  };
  clinical: {
    systolicBp: number | null;
    diastolicBp: number | null;
  };
};

export function ScreeningInputForm({
  loading = false,
  onSubmitScreening,
}: ScreeningInputFormProps) {
  const [form, setForm] = useState({
    screeningDate: getTodayDate(),

    weightKg: "",
    heightCm: "",
    waistCircumferenceCm: "",

    fastingGlucoseMgDl: "",
    postprandialGlucoseMgDl: "",
    randomGlucoseMgDl: "",
    hba1cPercent: "",

    systolicBp: "",
    diastolicBp: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSubmitScreening({
      screeningDate: form.screeningDate,
      anthropometry: {
        weightKg: Number(form.weightKg),
        heightCm: Number(form.heightCm),
        waistCircumferenceCm: toNullableNumber(form.waistCircumferenceCm),
      },
      biochemical: {
        fastingGlucoseMgDl: toNullableNumber(form.fastingGlucoseMgDl),
        postprandialGlucoseMgDl: toNullableNumber(form.postprandialGlucoseMgDl),
        randomGlucoseMgDl: toNullableNumber(form.randomGlucoseMgDl),
        hba1cPercent: toNullableNumber(form.hba1cPercent),
      },
      clinical: {
        systolicBp: toNullableNumber(form.systolicBp),
        diastolicBp: toNullableNumber(form.diastolicBp),
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Input Screening Ulang
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Isi data screening terbaru client untuk memperbarui grafik.
        </p>
      </div>

      <div className="mb-5">
        <InputField
          label="Tanggal Screening"
          type="date"
          value={form.screeningDate}
          onChange={(value) => updateField("screeningDate", value)}
          required
        />
      </div>

      <SectionTitle title="Antropometri" />

      <div className="grid gap-3 md:grid-cols-3">
        <InputField
          label="Berat Badan (kg)"
          value={form.weightKg}
          onChange={(value) => updateField("weightKg", value)}
          required
        />

        <InputField
          label="Tinggi Badan (cm)"
          value={form.heightCm}
          onChange={(value) => updateField("heightCm", value)}
          required
        />

        <InputField
          label="Lingkar Perut (cm)"
          value={form.waistCircumferenceCm}
          onChange={(value) => updateField("waistCircumferenceCm", value)}
        />
      </div>

      <SectionTitle title="Gula Darah" />

      <div className="grid gap-3 md:grid-cols-4">
        <InputField
          label="GDP / Puasa"
          value={form.fastingGlucoseMgDl}
          onChange={(value) => updateField("fastingGlucoseMgDl", value)}
        />

        <InputField
          label="GD 2 Jam PP"
          value={form.postprandialGlucoseMgDl}
          onChange={(value) => updateField("postprandialGlucoseMgDl", value)}
        />

        <InputField
          label="GDS"
          value={form.randomGlucoseMgDl}
          onChange={(value) => updateField("randomGlucoseMgDl", value)}
        />

        <InputField
          label="HbA1c (%)"
          value={form.hba1cPercent}
          onChange={(value) => updateField("hba1cPercent", value)}
        />
      </div>

      <SectionTitle title="Tekanan Darah" />

      <div className="grid gap-3 md:grid-cols-2">
        <InputField
          label="Sistolik"
          value={form.systolicBp}
          onChange={(value) => updateField("systolicBp", value)}
        />

        <InputField
          label="Diastolik"
          value={form.diastolicBp}
          onChange={(value) => updateField("diastolicBp", value)}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Saving..." : "Simpan Screening"}
        </button>
      </div>
    </form>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "number",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <input
        type={type}
        value={value}
        required={required}
        step={type === "number" ? "0.01" : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-3 mt-5">
      <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
    </div>
  );
}

function toNullableNumber(value: string) {
  if (value.trim() === "") return null;
  return Number(value);
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}
