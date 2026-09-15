export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  hidden = false,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        disabled = {disabled}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        hidden={hidden}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />
    </div>
  );
}
