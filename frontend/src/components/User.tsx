import type { IUser } from "../types"

interface IUserProps extends IUser {}

export const User = ({name, id, createdAt, email}: IUserProps) => {
    return (
<div className="user-card">
    <div className="user-info">
        <h3>{name}</h3>
        <p className="user-email">{email}</p>
        <p className="user-meta">ID: {id}</p>
        <p className="user-meta">Created: {createdAt}</p>
    </div>
    <button className="btn btn-danger">Delete</button>
</div>    
    )
}