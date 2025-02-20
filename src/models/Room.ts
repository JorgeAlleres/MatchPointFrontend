export default interface Room {
    id: number,
    roomName: string
    description?: string
    capacity: number
    code: string
    private: boolean
    published: Date
    expired?: Date
    idGame: number
}