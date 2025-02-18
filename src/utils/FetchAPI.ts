export const FetchAPI = async (endPoint: string, options = {}) => {
    try {
        const response = await fetch(endPoint, options)

        if(response.status == 401) {
            window.location.href = '/login'
            throw new Error('Session expired. Login again')
        }
        if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            throw new Error(errorData?.message || 'Unknown Error')
        }
        return await response.json()
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown Error'
        throw new Error(msg)
    }
}