type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  variant?: "primary" | "success";
};

export function PrimaryButton({
  children,
  onClick,
  loading = false,
  variant = "primary",
}: PrimaryButtonProps) {
  const colorClass = variant === "success" ? "bg-green-600" : "bg-indigo-600";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`w-full rounded-xl ${colorClass} px-5 py-3 font-semibold text-white disabled:opacity-50`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
