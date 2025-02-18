import { useEffect, useState } from 'react';
import User from '../../models/User';
import { UserService } from '../../services/user.service';
import { toast } from 'react-hot-toast';

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editableUser, setEditableUser] = useState<Partial<User>>({});

  // TODO El editar funciona pero salta el error

  // Obtener usuarios
  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await UserService.getUsers();
        setUsers(userList);
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido';
        setMessage(msg);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Modo edición
  const handleEdit = (user: User) => {
    setEditUserId(user.id);
    setEditableUser(user);
  };

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      const updatedUser = await UserService.updateUser(editableUser.id!, editableUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setEditUserId(null);
      toast.success('Usuario actualizado correctamente');
    } catch (error) {
      toast.error('Error al actualizar usuario');
    }
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditUserId(null);
    setEditableUser({});
  };

  // Eliminar usuario
  const handleDelete = async (userId: number) => {
    try {
      // Llamada a la API para eliminar el usuario
      await UserService.deleteUser(userId);
      // Actualiza el estado eliminando el usuario de la lista
      setUsers(users.filter(user => user.id !== userId));
      toast.success('Usuario eliminado correctamente');
    } catch (error) {
      toast.error('Error al eliminar usuario');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative overflow-x-auto">
      {message && <div className="text-red-500 font-bold mb-4">{message}</div>}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Rol</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Notifications</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    name="userName"
                    value={editableUser.userName || ''}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  user.userName
                )}
              </td>
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    name="email"
                    value={editableUser.email || ''}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    name="role"
                    value={editableUser.role || ''}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    type="checkbox"
                    name="active"
                    checked={editableUser.active ?? false}
                    onChange={handleChange}
                  />
                ) : (
                  user.active ? '✅' : '❌'
                )}
              </td>
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    type="checkbox"
                    name="acceptNotifications"
                    checked={editableUser.acceptNotifications ?? false}
                    onChange={handleChange}
                  />
                ) : (
                  user.acceptNotifications ? '✅' : '❌'
                )}
              </td>
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <>
                    <button onClick={handleSave} className="text-green-500 font-bold mr-2">
                      Guardar
                    </button>
                    <button onClick={handleCancel} className="text-red-500 font-bold">
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} className="text-blue-500 font-bold mr-2">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 font-bold">
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
