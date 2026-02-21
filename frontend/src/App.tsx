import { useEffect, useState, type FormEvent } from "react"
import "./App.css"
import { Form, type IFormData } from "./components/Form"
import { type IUser } from "./types"
import { User } from "./components/User"
import { apiClient, ApiError } from "./api/client"

export default function App() {
    const [formData, setFormData] = useState<IFormData>({
        name: "",
        email: ""
    })
    const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const response = await apiClient.getUsers()

            if (response.success && response.data) {
                setUsers(response.data)
            } else {
                setError(response.error || "Failed to fetch users")
            }
        } catch (error) {
            if (error instanceof ApiError) {
                setError(`Error ${error.status}: ${error.message}`)
            } else {
                setError("Unexpected error")
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!formData.name.trim() && !formData.email.trim()) {
            setError("Name and email are required")
            return
        }
        try {
            await apiClient.createUser(formData)
            await fetchUsers()
        } catch (error) {
            
        }
    }

    return (
        <div className="app">
            <header className="header">
                <h1>TypeScript Fetch Demo</h1>
            </header>

            <main className="main">
                {error && <div className="error-banner">
                    {error}
                    <button onClick={() => setError(null)} className="error-close">x</button>
                </div>}

                <Form handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />

                <section className="users-section">
                    <div className="section-header">
                        <h2>Users</h2>
                        <button onClick={() => fetchUsers()} className="btn btn-secondary">Refresh</button>
                    </div>

                    {isLoading && users.length === 0 ?
                        (
                            <div className="loading">Loading users...</div>
                        ) :
                        (<div className="users-list">
                            {users.map((el, i) => <User key={i} {...el} />)}
                        </div>)}
                </section>
            </main>
        </div>
    )
}
