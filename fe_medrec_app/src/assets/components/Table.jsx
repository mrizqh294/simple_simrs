export const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-275 text-left text-sm">{children}</table>
    </div>
  );
};

export const Th = ({ children, className = "" }) => {
  return (
    <th
      className={`bg-gray-50 px-6 py-4 font-semibold text-gray-600 ${className}`}
    >
      {children}
    </th>
  );
};

export const Td = ({ children, className = "" }) => {
  return (
    <td className={`px-6 py-4 text-gray-700 ${className}`}> {children} </td>
  );
};

export const EmptyRow = ({ colSpan, message = "Belum ada data." }) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-10 text-center text-sm text-gray-500"
      >
        {message}
      </td>
    </tr>
  );
};
