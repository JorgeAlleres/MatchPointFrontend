import Game from "../models/Game"
import { FetchAPI } from "../utils/FetchAPI"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export class GameService {
    static async getAll() {
        return await FetchAPI(API_BASE_URL+'/game/',
            {
                method: 'GET',
                credentials: 'include'
            }
        )
    }

    static async getById(id: number) {
        return await FetchAPI(API_BASE_URL+'/game/'+id,
            {
                method: 'GET',
                credentials: 'include'
            })
    }

    static async create(game: Partial<Game>) {
        return await FetchAPI(API_BASE_URL+'/game',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game),
                credentials: 'include'
            }
        )
    }

    static async update(id:number,game: Partial<Game>) {
        return await FetchAPI(API_BASE_URL+'/game/'+id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game),
                credentials: 'include'
            }
        )
    }

    static async delete(id: number) {
        return await FetchAPI(API_BASE_URL+'/game/'+id,
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