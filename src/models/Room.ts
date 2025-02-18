export default interface Room {
    id: number,
    roomName: string
    description?: string
    capacity: number
    password?: string
    private: boolean
    published: Date
    expired?: Date
    idGame: number
}