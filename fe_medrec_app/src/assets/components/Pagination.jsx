export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 text-xs border border-gray-200 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Sebelumnya
      </button>

      <span className="text-xs text-gray-500">
        Halaman {page} dari {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1.5 text-xs border border-gray-200 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Berikutnya
      </button>
    </div>
  );
}
