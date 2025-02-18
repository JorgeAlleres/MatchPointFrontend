import User from "../models/User";
import { FetchAPI } from "../utils/FetchAPI"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export class UserService {
    static async getUsers() {
        try {
            return await FetchAPI(API_BASE_URL + '/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error desconocido al obtener usuarios';
            console.error(msg);
            throw new Error(msg);
        }

    }

    static async getById(id: number) {
        return await FetchAPI(API_BASE_URL + '/user/' + id,
            {
                method: 'GET',
                credentials: 'include'
            }
        )
    }

    static async updateUser(userId: number, userData: Partial<User>): Promise<User> {
        const response = await FetchAPI(API_BASE_URL + `/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el usuario');
        }

        return response.json();
    }
    static async deleteUser(userId: number) {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
        }

        return response.json();
    }
}