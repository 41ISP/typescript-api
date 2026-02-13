export const Form = () => {
    return (
        <section className="form-section">
                    <h2>Add New User</h2>
                    <form className="user-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="john@example.com"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Create User
                        </button>
                    </form>
                </section>
    )
}