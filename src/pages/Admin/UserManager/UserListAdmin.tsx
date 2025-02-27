import toast from "react-hot-toast";
import User from "../../../models/User";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../../services/user.service";

function UserList() {
    const [users, setUsers] = useState<User[]>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        UserService.getAll()
            .then(setUsers)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro que quieres borrar este user?")) return;
        try {
            await UserService.delete(id);
            setUsers((prevUsers) => prevUsers?.filter((user) => user.id !== id));
            toast.success("User succesfully deleted");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
        }
    };

    return (
        <div className="relative overflow-x-auto gap-4 pt-20">
            {loading && <div className="text-black font-bold mb-4">{loading}</div>}
            {error && <div className="text-red-500 font-bold mb-4">{error}</div>}
            <div className="flex justify-between items-center w-full text-white">
                <h1 className="text-2xl font-bold mb-4">Listado de Users</h1>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Active</th>
                        <th className="px-4 py-2">Accept Notifications</th>
                        <th className="px-4 py-2">Gestionar</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user.id} className="border-b">
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.userName}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2">{user.active?<p>✅</p>:<p>❌</p>}</td>
                            <td className="px-4 py-2">{user.acceptNotifications?<p>✅</p>:<p>❌</p>}</td>
                            <td className="px-4 py-2">
                                <div className="p-1">
                                    <Link
                                        className="text-yellow-500 font-bold m-2"
                                        to={`./edit/${user.id}`}>
                                            Editar
                                    </Link>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-500 font-bold">
                                        Borrar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default UserList;
