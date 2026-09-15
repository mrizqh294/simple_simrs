export default function StatCard({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}