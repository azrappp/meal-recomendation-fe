type StatusMetricCardProps = {
  label: string;
  value: string | number | null | undefined;
  suffix?: string;
};

export function StatusMetricCard({
  label,
  value,
  suffix = "",
}: StatusMetricCardProps) {
  return (
    <div className="rounded-xl bg-slate-100 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-bold">
        {value ?? "-"} {value !== null && value !== undefined ? suffix : ""}
      </p>
    </div>
  );
}
