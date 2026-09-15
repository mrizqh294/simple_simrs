export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 3,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />
    </div>
  );
}
