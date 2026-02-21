import { type IApiResponse, type ICreateUserRequest, type IUser } from "../types"

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

    private buildUrl(endpoint: string, params?: Record<string, any>) {
        const url = new URL(`${this.baseUrl}${endpoint}`)
        // {
        //     a: 1,
        //     b: 2
        // }
        // /myendpoint?a=1&b=2
        // [["a", 1], ["b", 2]]
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && key !== undefined) {
                    url.searchParams.append(key, String(value))
                }
            })
        }

        return url.toString()
    }

    private async request<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
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

            return await response.json()
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw new ApiError(0, `Network error: 
                ${error instanceof Error ? error.message : "Unknown error"}`)
        }
    }

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const url = params ? this.buildUrl(endpoint, params) : endpoint
        return this.request<T>(url.replaceAll(
            this.baseUrl, ""),
            {
                method: "GET"
            })
    }

    async post<TRequest, TResponse>(
        endpoint: string,
        data: TRequest
    ): Promise<TResponse> {
        return this.request<TResponse>(endpoint,
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        )
    }

    async getUsers() {
        return this.get<IApiResponse<IUser[]>>("/users")
    }

    async createUser(data: ICreateUserRequest):
        Promise<IApiResponse<IUser>> {
        return this.post<ICreateUserRequest,
            IApiResponse<IUser>>(`/users`, data)
    }
}

export const apiClient = new ApiClient(
    `${import.meta.env.VITE_URL}/api`
)