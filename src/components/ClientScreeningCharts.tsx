import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type ActiveTab = "screening" | "menu";
type ScreeningChartData = {
  screeningDate: string;

  weightKg: number | null;
  bmi: number | null;
  waistCircumferenceCm: number | null;

  fastingGlucoseMgDl: number | null;
  postprandialGlucoseMgDl: number | null;
  randomGlucoseMgDl: number | null;
  hba1cPercent: number | null;

  systolicBp: number | null;
  diastolicBp: number | null;
};

type ClientScreeningChartsProps = {
  data: ScreeningChartData[];
};

export function ClientScreeningCharts({ data }: ClientScreeningChartsProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <h3 className="font-semibold text-slate-900">
          Belum ada data screening
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Grafik akan muncul setelah client memiliki minimal satu data
          screening.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <ChartCard title="Grafik Antropometri">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="screeningDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="weightKg"
              name="Berat Badan (kg)"
              stroke="#2563eb"
              strokeWidth={2}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="bmi"
              name="BMI"
              stroke="#16a34a"
              strokeWidth={2}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="waistCircumferenceCm"
              name="Lingkar Perut (cm)"
              stroke="#f97316"
              strokeWidth={2}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Grafik Gula Darah">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="screeningDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="fastingGlucoseMgDl"
              name="GDP / Puasa"
              stroke="#dc2626"
              strokeWidth={2}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="postprandialGlucoseMgDl"
              name="GD 2 Jam PP"
              stroke="#9333ea"
              strokeWidth={2}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="randomGlucoseMgDl"
              name="Gula Darah Sewaktu"
              stroke="#0891b2"
              strokeWidth={2}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="hba1cPercent"
              name="HbA1c (%)"
              stroke="#ea580c"
              strokeWidth={2}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Grafik Tekanan Darah">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="screeningDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="systolicBp"
              name="Sistolik"
              stroke="#ef4444"
              strokeWidth={2}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="diastolicBp"
              name="Diastolik"
              stroke="#0f766e"
              strokeWidth={2}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">{title}</h3>
      {children}
    </div>
  );
}
