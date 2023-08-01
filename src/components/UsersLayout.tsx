
import { useParams, Navigate, Outlet, useOutletContext } from "react-router-dom";
import { User } from "../App";

type UserLayoutProps = {
    users: User[]
} 




export function UsersLayout({users}: UserLayoutProps ) {

    const { id } = useParams()
    const user = users.find(u => u.id === id)
    if ( user == null) return <Navigate to="/" replace/>

    return <Outlet context={user}/>
}

export function useUsers() {
    return useOutletContext<User>()
}