import { Table, Th, Td, EmptyRow } from "./../Table";

export default function UserTable({ users, openEditModal, handleDelete }) {
  const confirmDelete = (user) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus user "${user.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    handleDelete(user.id);
  };

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nama</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th className="text-center">Aksi</Th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <Td>{user.name}</Td>

              <Td>{user.email}</Td>

              <Td>{user.role}</Td>

              <Td className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(user)}
                    className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => confirmDelete(user)}
                    className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-100"
                  >
                    Hapus
                  </button>
                </div>
              </Td>
            </tr>
          ))
        ) : (
          <EmptyRow colSpan={4} />
        )}
      </tbody>
    </Table>
  );
}
