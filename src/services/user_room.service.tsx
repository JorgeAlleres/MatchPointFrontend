import { FetchAPI } from "../utils/FetchAPI";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export class UserRoomService {
  static async joinRoom(idUser: number, idRoom: number, roleInRoom: string) {
    return await FetchAPI(`${API_BASE_URL}/user-room/join`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ idUser, idRoom, roleInRoom }),
      });
  }

  static async leaveRoom(idUser: number, idRoom: number) {
    return await FetchAPI(`${API_BASE_URL}/user-room/leave`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ idUser, idRoom }),
      });
  }

  static async getRoomUsers(idRoom: number) {
    return await FetchAPI(`${API_BASE_URL}/user-room/room/${idRoom}/users`);
  }

  static async getRoomUserCount(idRoom: number) {
    return await FetchAPI(`${API_BASE_URL}/user-room/room/${idRoom}/count`);
  }
}
