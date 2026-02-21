import { useState } from "react"
import "./App.css"
import { Form } from "./components/Form"
import { type IUser } from "./types"
import { User } from "./components/User"

export default function App() {
    const [users, setUsers] = useState<IUser[]>([])
    return (
        <div className="app">
            <header className="header">
                <h1>TypeScript Fetch Demo</h1>
            </header>

            <main className="main">
                <Form />

                <section className="users-section">
                    <div className="section-header">
                        <h2>Users</h2>
                        <button className="btn btn-secondary">Refresh</button>
                    </div>

                    <div className="users-list">
                        {users.map((el) => <User {...el} />)}
                    </div>
                </section>
            </main>
        </div>
    )
}
