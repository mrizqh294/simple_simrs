export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">
      <div>
        <p className="text-sm text-gray-400">Selamat datang,</p>
        <h2 className="text-lg font-semibold text-gray-900">
          Admin Pendaftaran
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-gray-700">
            Rabu, 09 September 2026
          </p>
          <p className="text-xs text-gray-400">Loket Pendaftaran</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
          AP
        </div>
      </div>
    </header>
  );
}
