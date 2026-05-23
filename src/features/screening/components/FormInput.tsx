type FormInputProps = {
  label?: string;
  type?: "text" | "number";
  placeholder: string;
  value: string | number;
  onChange: (value: string) => void;
};

export function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: FormInputProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border p-3"
      />
    </label>
  );
}
