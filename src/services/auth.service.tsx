import User from "../models/User"
import { FetchAPI } from "../utils/FetchAPI"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export class AuthService {
    static async registerUser(user: Partial<User>) {
        return await FetchAPI(API_BASE_URL + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include'
        })
    }

    static async loginUser(email: string, password: string) {
        return await FetchAPI(API_BASE_URL + '/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            }
        )
    }
}