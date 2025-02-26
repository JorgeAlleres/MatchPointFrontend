import Room from "../models/Room"
import { FetchAPI } from "../utils/FetchAPI"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export class RoomService {
    static async getAll() {
        try {
            const response = await fetch(API_BASE_URL + '/room',
                {
                    method: 'GET',
                    credentials: 'include'
                }
            )
            if (!response.ok) {
                const errorData = await response.json().catch(() => null)
                throw new Error(errorData?.message || 'Unknown Error')
            }
            const data = await response.json()
            return data
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error desconocido'
            throw new Error(msg)
        }
    }
    static async search(newParams: URLSearchParams) {
        const url = `${API_BASE_URL}/room?${newParams.toString()}`;
    
        console.log(url);
    
        return await FetchAPI(url, {
            method: 'GET',
            credentials: 'include'
        });
    }
    

    static async getById(id: number) {
        return await FetchAPI(API_BASE_URL + '/room/' + id,
            {
                method: 'GET',
                credentials: 'include'
            }
        )
    }

    static async create(room: Partial<Room>) {
        return await FetchAPI(API_BASE_URL + '/room/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(room),
                credentials: 'include'
            }
        )
    }

    static async update(id: number, room: Partial<Room>) {
        return await FetchAPI(API_BASE_URL + '/room/' + id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(room),
                credentials: 'include'
            }
        )
    }

    static async delete(id: number) {
        return await FetchAPI(API_BASE_URL + '/room/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
    }
}