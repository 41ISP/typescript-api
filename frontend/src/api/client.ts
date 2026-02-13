export class ApiError extends Error {
    status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status
        this.name = "ApiError"
    }
}

class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private async request(
        endpoint: string,
        options?: RequestInit
    ) {
        const url = `${this.baseUrl}${endpoint}`
        const config: RequestInit = {
            ...options,
            headers: {
                "Content-type": "application/json",
                ...options?.headers
            }
        }
        try {
            const response = await fetch(url, config)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new ApiError(
                    response.status,
                    errorData.error || `HTTP ${response.status}: ${response.statusText}`
                )

            }
        } catch (error) {
            
        }
    }
}

export const apiClient = new ApiClient(
    `${import.meta.env.VITE_URL}/api`
)