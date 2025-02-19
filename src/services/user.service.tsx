import User from "../models/User";
import { FetchAPI } from "../utils/FetchAPI"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export class UserService {
    static async getAll() {
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

    static async update(userId: number, userData: Partial<User>): Promise<User> {
        return await FetchAPI(API_BASE_URL + `/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });
    }
    static async delete(userId: number) {
        return await fetch(`${API_BASE_URL}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    }
}