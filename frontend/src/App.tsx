import "./App.css"
import { Form } from "./components/Form"

export default function App() {
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

                    <div className="users-list"></div>
                </section>
            </main>
        </div>
    )
}
