import { useEffect, useState } from "react"
import "./App.css"
import { Form } from "./components/Form"
import { type IUser } from "./types"
import { User } from "./components/User"
import { apiClient } from "./api/client"

export default function App() {
    const [users, setUsers] = useState<IUser[]>([])
    const [error, setError] = useState<null | string>("asd")

    const fetchUsers = async () => {
        const fetchedUsers = (await apiClient.getUsers()).data
        fetchedUsers && setUsers(fetchedUsers)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="app">
            <header className="header">
                <h1>TypeScript Fetch Demo</h1>
            </header>

            <main className="main">
                {error && <div className="error-banner">
                    {error}
                    <button className="error-close">x</button>
                </div>} 

                <Form />

                <section className="users-section">
                    <div className="section-header">
                        <h2>Users</h2>
                        <button onClick={() => setError(null)} className="btn btn-secondary">Refresh</button>
                    </div>

                    <div className="users-list">
                        {users.map((el, i) => <User key={i} {...el} />)}
                    </div>
                </section>
            </main>
        </div>
    )
}
